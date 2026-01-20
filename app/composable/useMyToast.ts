export default function useMyToast(){
   
  const toast = useToast()

  return {
   success(title:string,description?:string)
   {
      toast.add({ 
        title,
        description,
        icon:'i-heroicons-check-circle-solid',
        color: 'success',
        timeout:5000
      })
   },
   error(title:string,description?:string ){
     toast.add({
       title,
       description,
       icon:'i-heroicons-exclamation-circle-solid',
       color:'error',
       timeout: 5000
     })
   },
   info(title:string,description?:string){
     toast.add({
       title,
       description,
       icon:'i-heroicons-information-circle-solid',
       color: 'info',
       timeout: 5000
     })
   }
  }
}