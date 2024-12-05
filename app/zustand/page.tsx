import React from 'react'
import { useStore } from 'zustand'

function page() {
  const { posts, addPost, deletePost } = useStore((state: any) => state);
  return (
    <div className='p-4'>
      Zustand
    </div>
  )
}

export default page
