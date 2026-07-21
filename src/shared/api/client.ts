import { ApiError } from "./errors";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

// ─── Typed API Client ─────────────────────────────────────────────────────────

class ApiClient {
  constructor(private readonly baseUrl: string) {}

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    // Dynamically import to avoid circular dependency at module level
    const { useAuthStore } = await import("@/features/auth/store/useAuthStore");
    const token = useAuthStore.getState().token;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(response.status, response.statusText, await response.text());
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : null,
    });
  }

  put<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  patch<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

// ─── Singleton instance ───────────────────────────────────────────────────────

export const api = new ApiClient(API_BASE_URL);

// ─── Typed API functions (domain-specific) ────────────────────────────────────

export function fetchGreetings(): Promise<string[]> {
  return api.get<string[]>("/greetings");
}

export function createGreeting(name: string): Promise<{ id: number; name: string }> {
  return api.post<{ id: number; name: string }>("/greetings", { name });
}
