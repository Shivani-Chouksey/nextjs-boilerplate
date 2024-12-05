import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function PostView({ postdetail }: any) {
  console.log("post detail from view", postdetail);

  const router = useRouter();
  return (
    <Card className="  bg-gray-900 text-white rounded-lg shadow-lg ">
      <CardHeader className=" p-4 rounded-t-lg ">
        <CardTitle className="text-xl font-semibold">
          {postdetail.title}
        </CardTitle>
        {/* <CardDescription className="text-sm text-gray-400">Card Description</CardDescription> */}
      </CardHeader>
      <CardContent className="p-4 text-gray-400">
        <p className="">{postdetail.body.slice(0,200)}</p>
        <p className="font-semibold">
          <span className="text-white">View - </span>
          {postdetail.views}
        </p>
      </CardContent>
      <CardFooter className=" p-4 rounded-b-lg">
        <Button
          variant="outline"
          onClick={() => router.push(`react-query/${postdetail.id}`)}
        >
          View Detail
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PostView;