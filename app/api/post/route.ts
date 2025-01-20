import dbConnect from "@/connection/dbconnect";
import PostModel from "@/modal/postModal";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { title, description, summary, author, categories } =
      await request.json();

    const existingPost = await PostModel.findOne({
      title,
    });

    if (existingPost) {
      return Response.json(
        { success: false, message: "With That Title Post is already Exist" },
        { status: 400 }
      );
    }

    const newPost = new PostModel({
      title,
      description,
      summary,
      author,
      categories,
      isVerified: false,
    });
    await newPost.save();
    return Response.json(
      {
        success: true,
        message: "Post Created Successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error While Adding New Poat", error);

    return Response.json(
      { success: false, message: "Error Adding Post" },
      { status: 400 }
    );
  }
}

export async function GET(req: Request) {
  dbConnect();
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    const totalItems = await PostModel.countDocuments(); // Count all posts
    const totalPages = Math.ceil(totalItems / limit);
    const allPostData = await PostModel.find()
      .skip((page - 1) * limit) // Skip items for previous pages
      .limit(limit);

    return Response.json(
      {
        success: true,
        message: "Posts retrieved successfully",
        data: allPostData,
        pageInfo: {
          totalPages,
          currentPage: page,
          totalItems,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error retrieving posts:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return Response.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
