import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Define the type for postdetail
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

type PostViewProps = {
  postdetail: PostDetail;
};

function PostView({ postdetail }: PostViewProps) {
  console.log("post detail from view", postdetail);

  const router = useRouter();
  return (
    <>
      <Card className="  bg-gray-900 text-white rounded-lg shadow-lg ">
        <CardHeader className=" p-4 rounded-t-lg ">
          <CardTitle className="text-xl font-semibold">
            {postdetail.title}
          </CardTitle>
          {/* <CardDescription className="text-sm text-gray-400">Card Description</CardDescription> */}
        </CardHeader>
        <CardContent className="p-4 text-gray-400">
          <p className="">{postdetail.body.slice(0, 200)}</p>
          <p className="font-semibold">
            <span className="text-white">View - </span>
            {postdetail.views}
          </p>

          {postdetail.reactions && (
            <>
              <p className="font-semibold">
                <span className="text-white">Likes - </span>
                {postdetail.reactions.likes}
              </p>
              <p className="font-semibold">
                <span className="text-white">DisLikes - </span>
                {postdetail.reactions.dislikes}
              </p>
            </>
          )}
        </CardContent>
        {/* <CardFooter className=" p-4 rounded-b-lg"> */}
        {/* {postdetail.tags ? (
            postdetail.tags.map((tag: string, i: string | number) => (
              <p className="p-2 border bg-transparent rounded mx-2" key={i}>
                {tag}
              </p>
            ))
          ) : (
            <Button
              variant="outline"
              onClick={() => router.push(`react-query/${postdetail.id}`)}
            >
              View Detail
            </Button>
          )} */}
        <Button
          variant="outline"
          className="m-2"
          onClick={() => router.push(`react-query/${postdetail.id}`)}
        >
          View Detail
        </Button>
        <Button variant="outline" className="m-2">
          Edit Post
        </Button>
        <Button variant="destructive" className="m-2">
          Delete Post
        </Button>
      </Card>
    </>
  );
}

export default PostView;
