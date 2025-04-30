import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const usePostStore = create((set, get) => ({
  posts: [],
  hasMore: true,
  page: 1,
  isGetPostsloading: false,

  createPost: async (formData) => {
    try {
      const data = await axiosInstance.post("/uploadfile", { file: formData.image });
      if (data.data.status === "success") {
        formData = { ...formData, image: data.data.data };
        const response = await axiosInstance.post("/create-post", formData);
        if (response.data.status === "success") {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error(data.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  },

  getPosts: async ({ page = 1, limit = 10 } = {}) => {
    set({ isGetPostsloading: true });

    try {
      const response = await axiosInstance.get(`/get-post?page=${page}&limit=${limit}`);

      if (response.data.status === "success") {
        const newPosts = response.data.data;
        set((state) => ({
          posts: page === 1 ? newPosts : [...state.posts, ...newPosts],
          hasMore: response.data.hasMore,
          page,
        }));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isGetPostsloading: false });
    }
  },

  getPostById: async (id) => {
    try {
      const response = await axiosInstance.get(`/post/${id}`);
  
      if (response.data.status === "success") {
        return response.data.data; // return the post data to the caller
      } else {
        toast.error(response.data.message);
        return null;
      }
    } catch (error) {
      toast.error(error.message);
      return null;
    }
  },

  getRandomPosts: async (limit = 5) => {
    try {
      const response = await axiosInstance.get(`/random-posts?limit=${limit}`);
      if (response.data.status === "success") {
        return response.data.data; // return array of random posts
      } else {
        toast.error(response.data.message);
        return [];
      }
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  },
}));

export default usePostStore;
