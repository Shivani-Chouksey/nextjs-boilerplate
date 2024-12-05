import { create } from 'zustand';
import { StateCreator } from 'zustand';

type ReactionType = {
  likes: number | null;
  dislikes: number | null;
};

export type PostType = {
  id: number | null;
  title: string | null;
  body: string | null;
  views: string | null;
  userId: string | null;
  tags: string[] | [];
  reactions: ReactionType[] | [];
};

// Define the state interface
interface PostState {
  posts: PostType[];
  addPost: (posts: PostType) => void;
  deletePost: (postId: number) => void;
}

// Create the PostSlice as part of Zustand store
export const usePostStore = create<PostState>((set) => ({
  posts: [],
  addPost: (post: PostType) => {
    set((state) => ({
      posts: [post, ...state.posts],
    }));
  },
  deletePost: (postId: number) => {
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    }));
  },
}));
