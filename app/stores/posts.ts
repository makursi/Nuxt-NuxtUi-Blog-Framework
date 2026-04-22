import { defineStore } from 'pinia';
import type { Post, PostState } from '~/types';

export const usePostsStore = defineStore('posts', {
  state: (): PostState => ({
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
  }),

  getters: {
    postCount: (state) => state.posts.length,
  },

  actions: {
    setPosts(posts: Post[]) {
      this.posts = posts;
    },

    setCurrentPost(post: Post) {
      this.currentPost = post;
    },

    clearCurrentPost() {
      this.currentPost = null;
    },

    clearError() {
      this.error = null;
    },

    setLoading(loading: boolean) {
      this.loading = loading;
    },

    setError(error: string | null) {
      this.error = error;
    },

    addPost(post: Post) {
      this.posts.unshift(post);
    },

    updatePostInList(updatedPost: Post) {
      const index = this.posts.findIndex(p => p._id === updatedPost._id);
      if (index !== -1) {
        this.posts[index] = updatedPost;
      }
    },

    removePost(postId: string) {
      this.posts = this.posts.filter(p => p._id !== postId);
    },
  },
});
