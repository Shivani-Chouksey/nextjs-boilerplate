"use client";
import PostView from "@/app/product/[detail]/(components)/post-view";
import useFetchByID from "@/hooks/crud/use-fetch-by-id";
import React from "react";

type PageProps = {
  params: {
    postId: string;
  };
};

const Page: React.FC<PageProps> = ({ params }) => {
  const postID = params.postId;
  console.log("post id", params.postId);

  const { data, isLoading } = useFetchByID("posts", postID);
  console.log("data in details page ", data);
  if (isLoading) return <p>Loading.....</p>;
  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Post Details</h1>

      {data ? <PostView postdetail={data} /> : <p>Post not found.</p>}
    </div>
  );
};

export default Page;
