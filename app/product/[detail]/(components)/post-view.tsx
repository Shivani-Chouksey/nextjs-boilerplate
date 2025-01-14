import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useDeleteResource from "@/hooks/crud/use-delete-resource";
import { useToast } from "@/hooks/use-toast";
import useUpdateResource from "@/hooks/crud/use-update-resource";

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
  const { toast } = useToast();
  const {
    mutate: deleteResource,
    isError,
    isSuccess,
    isPending,
    error,
  } = useDeleteResource();

  const deleteHandler = (postId: string) => {
    console.log("post id ", postId);
    deleteResource({ urlEndpoint: "posts", id: postId });
    if (isSuccess) {
      return toast({
        title: "Post Deleted",
      });
    }
    if (isError) {
      return toast({
        variant: "destructive",
        title: "Error While Deleting Post",
        description: error.message,
      });
    }
  };
  const editableData = { title: "text" };
  const {
    mutate: updateReource,
    isError: isUpdateError,
    isPending: isUpdateLoading,
    isSuccess: isUpdateSuccess,
    error: updateErrorMessage,
  } = useUpdateResource();
  const editHandler = (postId: string | number) => {
    updateReource({ id: postId, urlEndpoint: "posts", data: editableData });
    if (isUpdateSuccess) {
      return toast({
        title: `Post Updated  ${postId} !`,
      });
    }
    if (isUpdateError) {
      return toast({
        variant: "destructive",
        title: "Error While Updating Post",
        description: updateErrorMessage?.message,
      });
    }
  };

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
        <Button
          variant="outline"
          className="m-2"
          onClick={() => editHandler(postdetail.id)}
        >
          {isUpdateLoading ? "updating..." : "Edit Post"}
        </Button>
        <Button
          variant="destructive"
          className="m-2"
          onClick={() => deleteHandler(`${postdetail.id}`)}
        >
          {isPending ? "Deleting..." : "Delete Post"}
        </Button>
      </Card>
    </>
  );
}

export default PostView;
