"use client";
import useFetchList from "@/hooks/crud/use-fetch-list";
import { usePostStore } from "@/state/zustand-state/slices/post-slice";
import React, { useEffect, useState } from "react";
import PostView from "../product/[detail]/(components)/post-view";
import { Button } from "@/components/ui/button";
// import { useStore } from "zustand";

function page() {
  // const { posts, addPost, deletePost } = usePostStore();
  const { data, isLoading, error } = useFetchList<any>({
    endpoint: "/posts",
    token: "your-token",
  });
  const [allPost, setAllPost] = useState([]);

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

export default page;
