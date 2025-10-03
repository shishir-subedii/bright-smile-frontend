class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        if (!baseURL) {
            throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined.");
        }
        this.baseURL = baseURL;
    }

    private async fetchApi(endpoint: string, options: RequestInit = {}) {
        const res = await fetch(`${this.baseURL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers as Record<string, string> | undefined),
            },
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `API Error: ${res.status}`);
        }

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return res.json(); // 🔹 return raw backend JSON
        }
        return res;
    }

    public async get(endpoint: string) {
        return this.fetchApi(endpoint, { method: "GET" });
    }

    public async post(endpoint: string, data?: any) {
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";
export const apiClient = new ApiClient(API_BASE_URL);
