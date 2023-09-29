import clientPromise from "../../utils/database";

export default async function handler(req, res) {
    try {
    const client = await clientPromise;
    const db = client.db("admin1");
    let collection = await db.collection("incidentdata");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
    }
    catch (e) {
        console.error(e);
    }
};