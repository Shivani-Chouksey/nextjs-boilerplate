import PostModel from "@/modal/postModal";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId;
    const postDetail = await PostModel.findById(postId);
    if (!postDetail) {
      return Response.json(
        { success: false, message: "Post Detail Not Found " },
        { status: 404 }
      );
    }
    return Response.json({ success: true, data: postDetail });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error While Getting Post Detail";
    return Response.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
