"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  summary: z.string().min(5, "Summary must be at least 5 characters"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
});

type FormValues = z.infer<typeof formSchema>;

function Page() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      summary: "",
      categories: [],
    },
  });

  const { reset } = form;

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post("/api/post", data);
      const responseData = response.data;

      if (responseData.success) {
        toast({ title: responseData.message, variant: "default" });
        reset();
      } else {
        toast({ title: responseData.message, variant: "destructive" });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast({ title: errorMessage, variant: "destructive" });
    }
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

  const removeCategory = (
    categoryToRemove: string,
    field: { onChange: (value: string[]) => void; value: string[] }
  ) => {
    field.onChange(
      field.value.filter((category) => category !== categoryToRemove)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <Link
          href="/curd-operation/posts"
          className="text-blue-600 border-b-2 border-blue-600"
        >
          View All Post
        </Link>
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">
          Create Post
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a unique title for your post"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Write a specific and unique title that describes your post.
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
                    <Input
                      placeholder="Provide a detailed description"
                      {...field}
                    />
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
                    <Input
                      placeholder="Summarize your post in a few words"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                      placeholder="Enter categories separated by commas (e.g., tech, coding)"
                      onChange={(e) => handleCategoryInputChange(e, field)}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="mt-2 flex flex-wrap gap-2">
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
                                onClick={() => removeCategory(category, field)}
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
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Page;
