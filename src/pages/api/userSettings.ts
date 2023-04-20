import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === "POST") {
        try {
            const userSettings = JSON.parse(req.body);
            const client = await clientPromise;
            const db = client.db("canBeFresh")
            const response = await db.collection("userSettings").updateOne({name: "userSettings"}, {$set: {userSettings: userSettings}});
            console.log(response);
            res.status(200).json({"test": "tset"});
        } catch (error) {
            res.json({"error": "Error saving new settings."});
            console.warn("Error posting data: ", error);
        }

    } else if(req.method === "GET") {
        try {
            const client = await clientPromise;
            const db = client.db("canBeFresh");
            const userSettings = await db.collection("userSettings").find({name: "userSettings"}).toArray();
            res.json(userSettings);
    
        } catch (error) {
            res.json({"error": "Error getting settings data."});
            console.warn("Error getting data: ", error);
        }
    }
}