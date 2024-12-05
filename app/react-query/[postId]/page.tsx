"use client"
import React, { useEffect, useState } from 'react';

const Page = ({params}:any) => {
    const postID=params.postId
    console.log("post id",params.postId);
    

//   useEffect(() => {
//     if (router.isReady) {
//       const { postId } = router.query;

//       // Ensure the postId is a string and can be converted to a number
//       if (typeof postId === 'string' && !isNaN(Number(postId))) {
//         setPostId(Number(postId));
//       } else {
//         setPostId(null); // Fallback for invalid or undefined postId
//       }
//     }
//   }, [router.isReady, router.query]);
  return (
    <div>
      {/* {postId ? <p>Post ID: {postId}</p> : <p>Loading...</p>} */}
    </div>
  );
};

export default Page;
