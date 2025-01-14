import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

// Generic error type
export type FetchError = Error & { status?: number };

// Generic type for API response
type ApiResponse<T> = T;

// Params for the custom hook
type UseFetchListParams<T> = {
  endpoint: string;
  token?: string;
  enabled?: boolean;
  axiosConfig?: AxiosRequestConfig;
  queryOptions?: Omit<
    UseQueryOptions<ApiResponse<T>, FetchError>,
    "queryKey" | "queryFn" | "enabled"
  >;
};

const useFetchList = <T>({
  endpoint,
  token,
  enabled = true,
  axiosConfig = {},
  queryOptions = {},
}: UseFetchListParams<T>) => {
  console.log("process.env.BASE_URL hook", process.env.NEXT_PUBLIC_BASE_URL);

  const fetchData = async () => {
    try {
      console.log("process.env.BASE_URL try", process.env.NEXT_PUBLIC_BASE_URL);

      const response = await axios.get<ApiResponse<T>>(
        `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
        {
          ...axiosConfig,
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...axiosConfig.headers,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const fetchError: FetchError = new Error(
          error.response.data?.message ||
            error.message ||
            "Failed to fetch data"
        );
        fetchError.status = error.response.status;
        throw fetchError;
      }

      const unknownError: FetchError = new Error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      throw unknownError;
    }
  };

  return useQuery<ApiResponse<T>, FetchError>({
    queryKey: [endpoint],
    queryFn: fetchData,
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    ...queryOptions,
  });
};

export default useFetchList;
