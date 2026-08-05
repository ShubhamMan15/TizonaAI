const API_BASE = "http://127.0.0.1:8000/api";

export async function getInvestigations() {
    const response = await fetch(`${API_BASE}/investigations`);

    if (!response.ok) {
        throw new Error("Failed to fetch investigations");
    }

    return response.json();
}

export async function getInvestigationEvents(investigationId) {
    const response = await fetch(
        `${API_BASE}/investigations/${investigationId}/events`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch investigation timeline");
    }

    return response.json();
}
