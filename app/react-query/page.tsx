"use client";
import useFetchList from "@/hooks/crud/use-fetch-list";
import React, { useEffect, useState } from "react";
import PostView from "../product/[detail]/(components)/post-view";
import { Button } from "@/components/ui/button";
// import { useStore } from "zustand";

// Define the type for PostDetail
type PostDetail = {
  id: string;
  title: string;
  body: string;
  views: number;
  reactions?: {
    likes: number;
    dislikes: number;
  };
  tags?: string[];
};

type FetchListResponse = {
  posts: PostDetail[];
};

function Page() {
  const [allPost, setAllPost] = useState<PostDetail[]>([]);

  // const { posts, addPost, deletePost } = usePostStore();
  const { data, isLoading, error } = useFetchList<FetchListResponse>({
    endpoint: "/posts",
    token: "your-token",
  });

  useEffect(() => {
    // Only add posts if data exists and has a posts property
    if (data?.posts) {
      setAllPost(data.posts);
      // addPost(data.posts);
    }
  }, [data]);

  console.log("all post", data);

  if (isLoading) return <p>Loading.......</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <Button variant="default" className="m-4 ">
        Create Post
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data?.posts && data.posts.length > 0
          ? allPost.map((post, i) => <PostView key={i} postdetail={post} />)
          : "Data Not Found"}
      </div>
    </>
  );
}

export default Page;
