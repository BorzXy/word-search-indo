import fs from "fs";
import path from "path";

let cachedWords = null;

function loadWords() {
    if (cachedWords) return cachedWords;

    const filePath = path.join(process.cwd(), "words.txt");
    const fileContent = fs.readFileSync(filePath, "utf8");

    cachedWords = fileContent
        .split("\n")
        .map(w => w.trim())
        .filter(Boolean);

    return cachedWords;
}

export default function handler(req, res) {
    const { prefix = "" } = req.query;

    if (!prefix) {
        return res.status(200).json([]);
    }

    const words = loadWords();

    const results = words
        .filter(w => w.startsWith(prefix.toLowerCase()))
        .slice(0, 200);

    res.status(200).json(results);
}
