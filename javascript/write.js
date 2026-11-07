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

export async function WriteTypeValuesToJSON(type) {
    const response = await fetch("/api/types", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(type)
    });

    if (!response.ok) {
        throw new Error(`Could not save project values (${response.status})`);
    }
}