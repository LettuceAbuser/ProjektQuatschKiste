import express from "express";
import cors from "cors";
import nano from "nano";
import login from "./couchlog.json" with { type: "json" };
import puppeteer from "puppeteer";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:8080" }));

// CouchDB
const couchURL = `http://${login.dbUser}:${login.dbPass}@127.0.0.1:5984`;
const nanoInstance = nano(couchURL);
const dbName = "hopshistory";
let db;

const initDB = async () => {
    try {
        const dbList = await nanoInstance.db.list();
        if (!dbList.includes(dbName)) {
            await nanoInstance.db.create(dbName);
            console.log(`DB '${dbName}' erstellt`);
        }
        db = nanoInstance.use(dbName);
        console.log(`DB '${dbName}' verbunden`);
    } catch (err) {
        console.error("Fehler bei DB-Initialisierung:", err);
    }
};
initDB();

// Hopsname speichern

app.post("/save", async (req, res) => {
    try {
        const { gamename, name, chance } = req.body;
        if (!name || !chance) return res.status(400).send("Fehlende Daten");
        await db.insert({ gamename, name, chance, timestamp: Date.now() });
        res.sendStatus(201);
    } catch (err) {
        console.error("Fehler beim Speichern:", err);
        res.sendStatus(500);
    }
});

// Hopsnamen abrufen

app.get("/history", async (req, res) => {
    try {
        const body = await db.list({ include_docs: true });
        const history = body.rows.map(row => row.doc);
        res.json(history);
    } catch (err) {
        console.error("Fehler beim Laden der History:", err);
        res.sendStatus(500);
    }
});

// Website Scraper

let bossTimers = [];
let page;

const startScraper = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        page = await browser.newPage();
        await page.goto("https://d4planner.io/trackers/world-bosses", {
            waitUntil: "networkidle2",
            timeout: 60000,
        });

        await page.waitForSelector(".EventTrackers_bossCard__ZwgRz");
        console.log("Scraper gestartet – World Boss Seite geladen.");

        // Timer jede Sekunde neu lesen
        setInterval(async () => {
            try {
                bossTimers = await page.evaluate(() => {
                    return Array.from(
                        document.querySelectorAll(".EventTrackers_bossCard__ZwgRz")
                    ).map(card => {
                        const name = card.querySelector("h3")?.textContent.trim() || "Unknown";
                        const timer = card.querySelector("strong")?.textContent.trim() || "-";
                        return { name, timer };
                    });
                });
            } catch (err) {
                console.error("Fehler beim Lesen der Bossdaten:", err);
            }
        }, 1000);
    } catch (err) {
        console.error("Fehler beim Starten des Scrapers:", err);
        console.log("Neustart in 10 Sekunden...");
        setTimeout(startScraper, 10000);
    }
};
startScraper();

// Scraper Route

app.get("/worldboss", (req, res) => res.json(bossTimers));

const PORT = 8000;
app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));
