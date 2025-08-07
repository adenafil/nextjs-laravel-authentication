import { getSession } from "next-auth/react";

interface FetchOptions extends RequestInit {
  headers?: {
    [key: string]: string;
  }
};

export async function fetchClient(endpoint: string, options: FetchOptions = {}): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined in the environment variables.");
  }

  const url = `${baseUrl}${endpoint}`;
  const session = await getSession();

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...options.headers,
  };

  if (session?.accessToken) {
    headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  const config: RequestInit = {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: "include",
    ...options,
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      status: response.status,
      message: errorData.message || "An error occurred while fetching data.",
      data: errorData,
    }
  }

  return response;
}
