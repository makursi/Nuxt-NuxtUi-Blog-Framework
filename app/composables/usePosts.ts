import type { Post, PostFormInput, PostListResponse, PostResponse, PostCountResponse } from '~/types';
import { postFormSchema } from '../../schemas/post.schema';
import { generateSlug } from '../utils/slug';

export const usePosts = () => {
  const { $csrfFetch } = useNuxtApp();
  const postsStore = usePostsStore();
  const toast = useToast();

  const handleError = (error: any, context?: string) => {
    console.error(`[${context}]`, error);

    let message = 'An unexpected error occurred';

    if (error.response) {
      const status = error.response.status;
      const data = error.response._data;

      switch (status) {
        case 400:
          message = data.message || 'Invalid request';
          break;
        case 401:
          message = 'Please login to continue';
          break;
        case 403:
          message = 'You do not have permission';
          break;
        case 404:
          message = 'Post not found';
          break;
        case 500:
          message = 'Server error, please try again later';
          break;
        default:
          message = data.message || 'Request failed';
      }
    } else if (error.message) {
      message = error.message;
    }

    toast.add({
      title: 'Error',
      description: message,
      color: 'error',
      icon: 'i-heroicons-exclamation-circle',
    });

    return message;
  };

  const getAll = async (): Promise<Post[] | null> => {
    try {
      postsStore.setLoading(true);
      postsStore.clearError();

      const response = await $csrfFetch<PostListResponse>('/api/posts');
      const posts = response.data || [];
      postsStore.setPosts(posts);
      return posts;
    } catch (error: any) {
      const message = handleError(error, 'getAll');
      postsStore.setError(message);
      return null;
    } finally {
      postsStore.setLoading(false);
    }
  };

  const getBySlug = async (slug: string): Promise<PostResponse | null> => {
    try {
      postsStore.setLoading(true);
      postsStore.clearError();

      const response = await $csrfFetch<PostResponse>(`/api/posts/${slug}`);
      postsStore.setCurrentPost(response as unknown as Post);
      return response;
    } catch (error: any) {
      const message = handleError(error, 'getBySlug');
      postsStore.setError(message);
      return null;
    } finally {
      postsStore.setLoading(false);
    }
  };

  const getCount = async (): Promise<number> => {
    try {
      const response = await $csrfFetch<PostCountResponse>('/api/posts/count/post');
      return response.data || 0;
    } catch (error: any) {
      handleError(error, 'getCount');
      return 0;
    }
  };

  const create = async (data: PostFormInput): Promise<{ message: string } | null> => {
    try {
      // Validate input
      const validated = postFormSchema.parse(data);
      
      postsStore.setLoading(true);
      postsStore.clearError();

      const response = await $csrfFetch<{ message: string }>('/api/posts', {
        method: 'POST',
        body: {
          ...validated,
          slug: generateSlug(validated.title),
        },
      });

      toast.add({
        title: 'Success',
        description: 'Post created successfully',
        color: 'success',
      });

      return response;
    } catch (error: any) {
      const message = handleError(error, 'create');
      postsStore.setError(message);
      return null;
    } finally {
      postsStore.setLoading(false);
    }
  };

  const update = async (id: string, data: Partial<PostFormInput>): Promise<{ message: string } | null> => {
    try {
      postsStore.setLoading(true);
      postsStore.clearError();

      const response = await $csrfFetch<{ message: string }>(`/api/posts/${id}`, {
        method: 'PUT',
        body: data,
      });

      toast.add({
        title: 'Success',
        description: 'Post updated successfully',
        color: 'success',
      });

      return response;
    } catch (error: any) {
      const message = handleError(error, 'update');
      postsStore.setError(message);
      return null;
    } finally {
      postsStore.setLoading(false);
    }
  };

  const deletePost = async (id: string): Promise<{ message: string } | null> => {
    try {
      postsStore.setLoading(true);
      postsStore.clearError();

      const response = await $csrfFetch<{ message: string }>(`/api/posts/${id}`, { 
        method: 'DELETE' 
      });

      postsStore.removePost(id);

      toast.add({
        title: 'Success',
        description: 'Post deleted successfully',
        color: 'success',
      });

      return response;
    } catch (error: any) {
      const message = handleError(error, 'deletePost');
      postsStore.setError(message);
      return null;
    } finally {
      postsStore.setLoading(false);
    }
  };

  const uploadImage = async (file: File, postId: string): Promise<{ message: string } | null> => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('postId', postId);

      const response = await $csrfFetch<{ message: string }>('/api/posts/upload-image', {
        method: 'POST',
        body: formData,
      });

      toast.add({
        title: 'Success',
        description: 'Image uploaded successfully',
        color: 'success',
      });

      return response;
    } catch (error: any) {
      const message = handleError(error, 'uploadImage');
      return null;
    }
  };

  return {
    getAll,
    getBySlug,
    getCount,
    create,
    update,
    deletePost,
    uploadImage,
    handleError,
  };
};
