import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

class ApiServer {
    private baseURL: string;

    constructor(baseURL: string) {
        if (!baseURL) {
            throw new Error("API_BASE_URL is not defined.");
        }
        this.baseURL = baseURL;
    }

    private async fetchApi(endpoint: string, options: RequestInit = {}) {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        const incomingHeaders = await headers();
        const clientIp =
            incomingHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            incomingHeaders.get("x-real-ip") ||
            "unknown";

        const res = await fetch(`${this.baseURL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
                "x-real-ip": clientIp,
                ...(options.headers as Record<string, string> | undefined),
            },
        });

        if (res.status === 401) {
            redirect("/auth/login");
        }

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return res.json(); // 🔹 return raw backend JSON
        }

        return res; // fallback (could be HTML, plain text, etc.)
    }

    public async get(endpoint: string) {
        return this.fetchApi(endpoint, { method: "GET" });
    }

    public async post(endpoint: string, data: any) {
        return this.fetchApi(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    public async put(endpoint: string, data: any) {
        return this.fetchApi(endpoint, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    }

    public async patch(endpoint: string, data: any) {
        return this.fetchApi(endpoint, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    }

    public async delete(endpoint: string) {
        return this.fetchApi(endpoint, { method: "DELETE" });
    }
}

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3002";
export const apiServer = new ApiServer(API_BASE_URL);
