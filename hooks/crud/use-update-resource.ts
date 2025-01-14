import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";

// Define types for the response and parameters
type ApiResponse<T> = {
  data: T;
  message?: string;
  status?: number;
};

type UpdateResourceParams<T> = {
  urlEndpoint: string; // Endpoint path without the base URL
  data: T; // Payload to update the resource
  id: number | string; // ID of the resource to update
  token?: string; // Optional authorization token
  additionalHeaders?: Record<string, string>; // Optional custom headers
};

type UseUpdateResourceReturn<T> = UseMutationResult<
  ApiResponse<T>,
  AxiosError,
  UpdateResourceParams<T>
> & {
  updateResponseMessage: string | null;
  isUpdateError: boolean;
  isUpdateLoading: boolean;
  isUpdateSuccess: boolean;
};

const useUpdateResource = <T>(): UseUpdateResourceReturn<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // React state to manage messages and status
  const [updateResponseMessage, setUpdateResponseMessage] = useState<
    string | null
  >(null);
  const [isUpdateError, setIsUpdateError] = useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState<boolean>(false);

  // Function for updating the resource (API call)
  const updateResource = async ({
    urlEndpoint,
    data,
    id,
    token,
    additionalHeaders = {},
  }: UpdateResourceParams<T>): Promise<ApiResponse<T>> => {
    if (!baseUrl) {
      throw new Error(
        "Base URL is not defined. Please check your environment configuration."
      );
    }

    setIsUpdateLoading(true);
    try {
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...additionalHeaders,
        },
      };

      const response = await axios.patch<ApiResponse<T>>(
        `${baseUrl}/${urlEndpoint}/${id}`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw new Error("An unknown error occurred while updating the resource.");
    } finally {
      setIsUpdateLoading(false);
    }
  };

  // React Query's `useMutation` hook to handle the API call
  const mutation = useMutation<
    ApiResponse<T>,
    AxiosError,
    UpdateResourceParams<T>
  >({
    mutationFn: updateResource,
    onSuccess: (data) => {
      setUpdateResponseMessage(
        data.message || "Resource updated successfully."
      );
      setIsUpdateSuccess(true);
      setIsUpdateError(false);
    },
    onError: (error) => {
      setUpdateResponseMessage(error.message || "Error updating resource.");
      setIsUpdateError(true);
      setIsUpdateSuccess(false);
    },
    onSettled: () => {
      console.log("Update operation completed.");
    },
  });

  return {
    ...mutation,
    updateResponseMessage,
    isUpdateError,
    isUpdateLoading,
    isUpdateSuccess,
  };
};

export default useUpdateResource;
