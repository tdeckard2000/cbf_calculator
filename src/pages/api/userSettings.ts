import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("canBeFresh");
        const userSettings = await db.collection("userSettings").find({}).toArray();
        console.log("userSettings: ", userSettings);
        res.json(userSettings);

    } catch (error) {
        res.json({"test": "err"});
        console.warn(error);
    }
}