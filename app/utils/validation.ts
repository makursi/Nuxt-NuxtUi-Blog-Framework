import { z } from 'zod'

/**
 * Validation result type
 */
export interface ValidationResult<T> {
  success: boolean
  data?: T
  errors?: Record<string, string>
}

/**
 * Validates form data using a Zod schema
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validation result with success status, data, or errors
 */
export function validateForm<T>(
  schema: z.ZodType<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data)

  if (result.success) {
    return {
      success: true,
      data: result.data,
    }
  }

  return {
    success: false,
    errors: extractValidationErrors(result.error),
  }
}

/**
 * Extracts validation errors from a Zod error
 * @param error - Zod error object
 * @returns Record of field names to error messages
 */
export function extractValidationErrors(
  error: z.ZodError
): Record<string, string> {
  const errors: Record<string, string> = {}

  for (const issue of error.issues) {
    const path = issue.path.join('.')
    const field = path || 'form'

    // Only keep the first error per field
    if (!errors[field]) {
      errors[field] = issue.message
    }
  }

  return errors
}

/**
 * Validates a single field value using a Zod schema
 * @param schema - Zod schema to validate against
 * @param value - Value to validate
 * @returns Error message if invalid, undefined if valid
 */
export function validateField<T>(
  schema: z.ZodType<T>,
  value: unknown
): string | undefined {
  const result = schema.safeParse(value)

  if (result.success) {
    return undefined
  }

  return result.error.issues[0]?.message
}

/**
 * Creates a reactive form validation state
 * @param schema - Zod schema to validate against
 * @param initialData - Initial form data
 * @returns Reactive validation state and methods
 */
export function useFormValidation<T extends Record<string, unknown>>(
  schema: z.ZodType<T>,
  initialData: T
) {
  const formData = reactive({ ...initialData }) as T
  const errors = ref<Record<string, string>>({})
  const touched = ref<Set<string>>(new Set())

  const isValid = computed(() => Object.keys(errors.value).length === 0)

  const validate = (): boolean => {
    const result = validateForm(schema, formData)

    if (result.success) {
      errors.value = {}
      return true
    }

    errors.value = result.errors || {}
    return false
  }

  const validateFieldByKey = (field: keyof T): boolean => {
    const fieldSchema = extractFieldSchema(schema, field as string)

    if (!fieldSchema) {
      return true
    }

    const error = validateField(fieldSchema, formData[field])

    if (error) {
      errors.value[field as string] = error
      return false
    }

    delete errors.value[field as string]
    return true
  }

  const touch = (field: keyof T) => {
    touched.value.add(field as string)
  }

  const reset = () => {
    Object.assign(formData, initialData)
    errors.value = {}
    touched.value = new Set()
  }

  const getError = (field: keyof T): string | undefined => {
    return errors.value[field as string]
  }

  const hasError = (field: keyof T): boolean => {
    return !!errors.value[field as string]
  }

  const isTouched = (field: keyof T): boolean => {
    return touched.value.has(field as string)
  }

  return {
    formData,
    errors,
    touched,
    isValid,
    validate,
    validateField: validateFieldByKey,
    touch,
    reset,
    getError,
    hasError,
    isTouched,
  }
}

/**
 * Extracts a field schema from a Zod object schema
 * @param schema - Zod object schema
 * @param field - Field name to extract
 * @returns Field schema or undefined
 */
function extractFieldSchema<T>(
  schema: z.ZodType<T>,
  field: string
): z.ZodType | undefined {
  // Handle ZodObject (v4 uses z.object().shape)
  if ('shape' in schema && typeof schema.shape === 'object') {
    return (schema.shape as Record<string, z.ZodType>)[field]
  }

  // Handle ZodEffects or similar wrapped schemas (v4 uses ._zod.def.innerType)
  if ('_zod' in schema && schema._zod && typeof schema._zod === 'object') {
    const zodDef = (schema._zod as { def?: { innerType?: z.ZodType } }).def
    if (zodDef?.innerType) {
      return extractFieldSchema(zodDef.innerType, field)
    }
  }

  return undefined
}

/**
 * Type helper to infer the type from a Zod schema
 */
export type InferSchema<T extends z.ZodType> = z.infer<T>
