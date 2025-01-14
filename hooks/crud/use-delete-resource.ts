import axios, { AxiosError } from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";

type ApiResponse = {
  message?: string;
  status?: number;
};

type DeleteResourceParams = {
  urlEndpoint: string; // Endpoint path without the base URL
  id: number | string; // ID of the resource to delete
  token?: string; // Optional authorization token
  baseUrl?: string; // Optional override for the base URL
  additionalHeaders?: Record<string, string>; // Optional custom headers
};

type UseDeleteResourceReturn = UseMutationResult<
  ApiResponse,
  AxiosError,
  DeleteResourceParams
> & {
  deleteResponseMessage: string | null;
};

const useDeleteResource = (): UseDeleteResourceReturn => {
  const [deleteResponseMessage, setDeleteResponseMessage] = useState<
    string | null
  >(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const deleteResource = async ({
    urlEndpoint,
    id,
    token,
    // baseUrl,
    additionalHeaders = {},
  }: DeleteResourceParams): Promise<ApiResponse> => {
    if (!baseUrl) {
      throw new Error(
        "Base URL is not defined. Ensure NEXT_PUBLIC_BASE_URL is set or provide a baseUrl."
      );
    }

    const response = await axios.delete<ApiResponse>(
      `${baseUrl}/${urlEndpoint}/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...additionalHeaders,
        },
      }
    );

    return response.data;
  };

  const mutation = useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    DeleteResourceParams
  >({
    mutationFn: deleteResource,
    onError: (error) => {
      setDeleteResponseMessage(
        error.response?.data?.message ||
          "An error occurred while deleting the resource."
      );
    },
  });

  return {
    ...mutation,
    deleteResponseMessage,
  };
};

export default useDeleteResource;
