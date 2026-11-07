import { currentProjectName } from "./type.js";

export async function deleteProject() {
    if (!currentProjectName) return;

    try {
        const response = await fetch("/api/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: currentProjectName
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        data.projects = result.projects;
        currentProjectName = null;

    } catch (error) {
        console.error("Delete error:", error);
    }
}