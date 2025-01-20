import mongoose, { Schema } from "mongoose";

export interface Post extends Document {
  title: string;
  description: string;
  summary: string;
  author: string;
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  pageInfo: object;
}

const PostSchema: Schema<Post> = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  summary: {
    type: String,
    required: [true, "Summary is required"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true,
  },
  categories: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  pageInfo: {
    totalPages: Number, // The total number of pages based on the total number of items and items per page
    currentPage: Number, // The current page number
    totalItems: Number, // Total number of items
    itemsPerPage: Number, // Number of items per page
    hasNextPage: Boolean, // Whether there is a next page
    hasPrevPage: Boolean, // Whether there is a previous page
  },
});

const PostModel =
  (mongoose.models.Post as mongoose.Model<Post>) ||
  mongoose.model<Post>("Post", PostSchema);

export default PostModel;
