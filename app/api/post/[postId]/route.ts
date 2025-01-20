import dbConnect from "@/connection/dbconnect";
import PostModel from "@/modal/postModal";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  await dbConnect();
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

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } }
) {
  await dbConnect();
  try {
    const postId = params.postId;
    const { isVerified } = await req.json();

    const updatedPostDetails = await PostModel.findByIdAndUpdate(
      { _id: postId },
      { isVerified },
      { new: true }
    );
    if (!updatedPostDetails) {
      return Response.json(
        { success: false, message: "Error While Updating Post" },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true, message: "Post Updated!", data: updatedPostDetails },
      { status: 200 }
    );
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

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  await dbConnect();
  try {
    const postId = params.postId;
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      return Response.json(
        { success: false, message: "Post not found or already deleted." },
        { status: 404 } // Not Found
      );
    }

    return Response.json(
      { success: true, message: "Post successfully deleted." },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return Response.json(
      { success: false, message: errorMessage },
      { status: 500 } // Internal Server Error
    );
  }
}
