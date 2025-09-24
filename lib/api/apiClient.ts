import { redirect } from "next/navigation";
import { getCookie } from "@/utils/cookieHelper";

class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        if (!baseURL) {
            throw new Error("API_BASE_URL is not defined.");
        }
        this.baseURL = baseURL;
    }

    private async fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const token = await getCookie("token");

        const res = await fetch(`${this.baseURL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
                ...(options.headers as Record<string, string> | undefined),
            },
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: "API request failed." }));
            console.error(`API Error: ${res.status} - ${errorData.message}`);
            if (res.status === 401) {
                redirect("/login");
            }
            throw new Error(errorData.message || "API request failed");
        }

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return res.json() as Promise<T>;
        }

        return {} as T;
    }

    public async get<T>(endpoint: string): Promise<T> {
        return this.fetchApi<T>(endpoint, { method: "GET" });
    }

    public async post<T>(endpoint: string, data: any): Promise<T> {
        return this.fetchApi<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    public async put<T>(endpoint: string, data: any): Promise<T> {
        return this.fetchApi<T>(endpoint, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    }

    public async patch<T>(endpoint: string, data: any): Promise<T> {
        return this.fetchApi<T>(endpoint, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    }

    public async delete<T>(endpoint: string): Promise<T> {
        return this.fetchApi<T>(endpoint, { method: "DELETE" });
    }
}

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000/api";

const apiClient = new ApiClient(API_BASE_URL);

export default apiClient;