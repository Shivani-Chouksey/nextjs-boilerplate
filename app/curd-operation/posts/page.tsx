"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Post {
  id: string;
  title: string;
  description: string;
  summary: string;
  categories: string[];
  createdAt: string;
  isVerified: boolean;
}

interface PageInfo {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}

function Page() {
  const [postList, setPostList] = useState<Post[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEditablePostData, setSelectedEditablePostData] =
    useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    summary: z.string().min(5, "Summary must be at least 5 characters"),
    categories: z.array(z.string()).min(1, "At least one category is required"),
    isVerified: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      summary: "",
      categories: [],
      isVerified: false,
    },
  });

  const getAllPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const responseData = await axios.get("/api/post");
      setPostList(responseData.data.data);
      setPageInfo(responseData?.data.pageInfo);
    } catch (error) {
      setError("Failed to load posts. Please try again later.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // Reset form with selected post data when editing
  useEffect(() => {
    if (selectedEditablePostData) {
      form.reset({
        title: selectedEditablePostData.title,
        description: selectedEditablePostData.description,
        summary: selectedEditablePostData.summary,
        categories: selectedEditablePostData.categories,
        isVerified: selectedEditablePostData.isVerified,
      });
    }
  }, [selectedEditablePostData, form]);

  const onSubmitEdit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (!selectedEditablePostData?._id) return;

      const response = await axios.patch(
        `/api/post/${selectedEditablePostData._id}`,
        data
      );

      if (response.data.success) {
        toast({ title: "Post updated successfully" });
        getAllPosts();
        setSelectedEditablePostData(null);
      } else {
        toast({ title: response.data.message || "Failed to update post" });
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast({ title: "Error updating post" });
    }
  };

  const onclickDeleteHandler = async (postId: string) => {
    try {
      const responseData = await axios.delete(`/api/post/${postId}`);
      if (responseData.data.success) {
        toast({ title: responseData.data.message });
        getAllPosts();
      } else {
        toast({ title: responseData.data.message });
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error deleting post" });
    }
  };

  const onclickEditHandler = (post: Post) => {
    setSelectedEditablePostData(post);
  };

  const removeCategory = (
    categoryToRemove: string,
    field: { onChange: (value: string[]) => void; value: string[] }
  ) => {
    field.onChange(
      field.value.filter((category) => category !== categoryToRemove)
    );
  };

  const handleCategoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: { onChange: (value: string[]) => void; value: string[] }
  ) => {
    const value = e.target.value;
    if (value.endsWith(",") || value.endsWith(" ")) {
      const newCategory = value.slice(0, -1).trim();
      if (newCategory && !field.value.includes(newCategory)) {
        field.onChange([...field.value, newCategory]);
      }
      e.target.value = "";
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-700">Error</CardTitle>
              <CardDescription className="text-red-600">
                {error}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Posts</h1>
          {pageInfo && (
            <p className="text-gray-500">
              Showing {postList.length} of {pageInfo.totalPosts} posts
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader>
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-4 w-1/3" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postList.map((post, index) => (
              <Card
                key={post.id || index}
                className="flex flex-col hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {post.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {post.summary}
                  </p>
                </CardContent>
                <div className="flex px-5">
                  <Button
                    variant="destructive"
                    onClick={() => onclickDeleteHandler(post.id)}
                  >
                    Delete
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger
                      className="bg-green-700 text-white px-4 rounded-lg ms-2"
                      onClick={() => onclickEditHandler(post)}
                    >
                      Edit
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Edit Post</AlertDialogTitle>
                      </AlertDialogHeader>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmitEdit)}
                          className="space-y-6"
                        >
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Post Title</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                  Write a specific and unique title that
                                  describes your post.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="summary"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Summary</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="isVerified"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                  <FormLabel>
                                    Verification Status -{field.value}
                                  </FormLabel>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-readonly
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="categories"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Categories</FormLabel>
                                <FormControl>
                                  <Input
                                    // value={field.value.join(", ")}
                                    onChange={(e) =>
                                      handleCategoryInputChange(e, field)
                                    }
                                    placeholder="Enter categories separated by commas"
                                  />
                                </FormControl>
                                <TooltipProvider>
                                  {field.value.map((category, index) => (
                                    <Tooltip key={index}>
                                      <TooltipTrigger asChild>
                                        <div className="inline-flex items-center gap-1 bg-gray-300 text-black px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors">
                                          {category}
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="h-4 w-4 p-0 hover:bg-blue-200"
                                            onClick={() =>
                                              removeCategory(category, field)
                                            }
                                          >
                                            <X className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Click × to remove {category}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  ))}
                                </TooltipProvider>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <AlertDialogFooter>
                            <Button
                              type="submit"
                              className=" bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Update Post
                            </Button>
                            <AlertDialogCancel
                              className="text-black"
                              onClick={() => setSelectedEditablePostData(null)}
                            >
                              Cancel
                            </AlertDialogCancel>
                          </AlertDialogFooter>
                        </form>
                      </Form>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <CardFooter className="flex flex-col items-start gap-3">
                  <div className="w-full h-px bg-gray-100" />
                  <ScrollArea className="w-full max-h-20">
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((category, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </ScrollArea>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && postList.length === 0 && (
          <Card className="text-center p-8">
            <CardHeader>
              <CardTitle>No Posts Found</CardTitle>
              <CardDescription>
                There are no blog posts available at the moment.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Page;
