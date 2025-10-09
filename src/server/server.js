import express from "express";
import cors from "cors";
import nano from "nano";
import login from './couchlog.json' with {type: "json"};

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:8080" })); // Vue Dev Server erlaubt

const couchURL = `http://${login.dbUser}:${login.dbPass}@127.0.0.1:5984`;
const nanoInstance = nano(couchURL);
const dbName = "hopshistory";

    let db;

async function initDB() {
    const dbList = await nanoInstance.db.list();
    if (!dbList.includes(dbName)) {
        await nanoInstance.db.create(dbName);
        console.log(`DB '${dbName}' erstellt`);
    }
    db = nanoInstance.use(dbName);
    console.log(`DB '${dbName}' verbunden`);
}
initDB().catch(err => console.error(err));

app.post("/save", async (req, res) => {
    try {
        const { gamename, name, chance } = req.body;
        if (!name || !chance) return res.status(400).send("Fehlende Daten");
        await db.insert({ gamename, name, chance, timestamp: Date.now() });
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

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

app.listen(8000, () => console.log("Server läuft auf http://localhost:8000"));
