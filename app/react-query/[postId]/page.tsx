"use client"
import PostView from '@/app/product/[detail]/(components)/post-view';
import useFetchByID from '@/hooks/crud/use-fetch-by-id';
import React, { useEffect, useState } from 'react';

const Page = ({params}:any) => {
    const postID=params.postId
    console.log("post id",params.postId);
    

  const { data, isLoading, error } = useFetchByID("posts", postID);
  console.log("data in details page ",data);
 if(isLoading) return <p>Loading.....</p>
  return (
    <div className='p-4'>
      <h1 className="text-3xl font-semibold text-center mb-6">Post Details</h1>

        <PostView  postdetail={data}/>
    </div>
  );
};

export default Page;
