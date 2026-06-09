const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export async function fetchGreetings(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/greetings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch greetings from Spring Boot:", error);
    throw error;
  }
}

export async function createGreeting(name: string): Promise<{ id: number; name: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/greetings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to create greeting in Spring Boot:", error);
    throw error;
  }
}
