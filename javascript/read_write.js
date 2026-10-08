export async function WriteNewTypeToJSON(newType) {
    const response = await fetch("/api/types", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newType)
    });

    if (!response.ok) {
        throw new Error(`Could not save project type (${response.status})`);
    }
}