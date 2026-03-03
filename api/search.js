import axios from "axios";

const wordindexindo = [
    "https://raw.githubusercontent.com/agulagul/Indonesia-words/refs/heads/master/kata.txt",
    "https://raw.githubusercontent.com/damzaky/kumpulan-kata-bahasa-indonesia-KBBI/refs/heads/master/list_1.0.0.txt",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/a",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/b",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/c",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/d",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/e",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/f",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/g",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/h",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/i",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/j",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/k",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/l",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/m",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/n",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/o",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/p",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/q",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/r",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/s",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/t",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/u",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/v",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/w",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/x",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/y",
    "https://raw.githubusercontent.com/bekicot/indonesian_words/refs/heads/master/words/z",
    "https://raw.githubusercontent.com/BorzXy/wordlist-indo/refs/heads/main/indo",
    "https://raw.githubusercontent.com/BorzXy/wordlist-indo/refs/heads/main/kbbi_words.txt"
];

let cachedWords = null;

async function loadWords() {
    if (cachedWords) return cachedWords;

    let allWords = [];

    for (const url of wordindexindo) {
        try {
            const res = await axios.get(url);
            const words = res.data.split("\n").map(w => w.trim()).filter(Boolean);
            allWords.push(...words);
        } catch (err) {
            console.log("Failed:", url);
        }
    }

    cachedWords = [...new Set(allWords)];
    return cachedWords;
}

export default async function handler(req, res) {
    const { prefix = "" } = req.query;

    if (!prefix) {
        return res.status(200).json([]);
    }

    const words = await loadWords();

    const results = words
        .filter(w => w.toLowerCase().startsWith(prefix.toLowerCase()))
        .slice(0, 200);

    res.status(200).json(results);
}
