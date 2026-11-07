import express from "express";
import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { readFileSync, writeFileSync } from "node:fs";
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

app.put("/api/types", async (request, response, next) => {
    try {
        const updatedType = request.body;

        if (
            !updatedType ||
            typeof updatedType.name !== "string" ||
            !updatedType.name.trim() ||
            !Array.isArray(updatedType.stages) ||
            updatedType.stages.some(stage =>
                !stage ||
                typeof stage.name !== "string" ||
                !Number.isFinite(stage.hours) ||
                !Number.isFinite(stage.minutes)
            )
        ) {
            response.status(400).json({ error: "Invalid project type values." });
            return;
        }

        const fileContents = await readFile(jsonPath, "utf8");
        const data = JSON.parse(fileContents);
        const projectIndex = data.projects.findIndex(
            project => project.name === updatedType.name
        );

        if (projectIndex === -1) {
            response.status(404).json({ error: "Project type not found." });
            return;
        }

        data.projects[projectIndex] = updatedType;
        await writeFile(jsonPath, JSON.stringify(data, null, 2));

        response.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

app.delete("/api/delete", (request, response) => {
    const { name } = request.body;

    if (!name) {
        return response.status(400).json({
            message: "Project name is required"
        });
    }

    try {
        const data = JSON.parse(readFileSync(jsonPath, "utf8"));

        const projectExists = data.projects.some(
            project => project.name === name
        );

        if (!projectExists) {
            return response.status(404).json({
                message: "Project not found"
            });
        }

        data.projects = data.projects.filter(
            project => project.name !== name
        );

        writeFileSync(
            jsonPath,
            JSON.stringify(data, null, 2)
        );

        response.json({
            message: "Project deleted successfully",
            projects: data.projects
        });

    } catch (error) {
        console.error(error);
        response.status(500).json({
            message: "Error deleting project"
        });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});