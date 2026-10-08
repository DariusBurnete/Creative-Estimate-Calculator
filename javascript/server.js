import express from "express";
import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const app = express();
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const jsonPath = path.join(projectRoot, "json", "default.json");

app.use(express.json());
app.use(express.static(projectRoot));

app.get("/", (_, response) => {
    response.sendFile(path.join(projectRoot, "html", "calculator.html"));
});

app.post("/api/types", async (request, response, next) => {
    try {
        const newType = request.body;

        if (
            !newType ||
            typeof newType.name !== "string" ||
            !newType.name.trim() ||
            !Array.isArray(newType.stages)
        ) {
            response.status(400).json({ error: "Invalid project type." });
            return;
        }

        const fileContents = await readFile(jsonPath, "utf8");
        const data = JSON.parse(fileContents);
        data.projects.push(newType);
        await writeFile(jsonPath, JSON.stringify(data, null, 2));

        response.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});