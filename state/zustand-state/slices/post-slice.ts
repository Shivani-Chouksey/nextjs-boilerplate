import { StateCreator } from "zustand";

type reactionType = {
  likes: number | null;
  dislikes: number | null;
};
export type postType = {
  id: number | null;
  title: string | null;
  body: string | null;
  views: string | null;
  userId: string | null;
  tags: string[] | [];
  reactions: reactionType[] | [];
};

// Define the state interface that includes both the data and actions
interface PostState {
  posts: postType[];
  addPost: (post: postType) => void;
}

export const PostSlice: StateCreator<PostState> = (set) => ({
  posts: [],
  addPost: (task: postType) => {
    set((state) => ({
      posts: [task, ...state.posts],
    }));
  },
  deletePost: (postId: number) => {
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    }));
  },
});
