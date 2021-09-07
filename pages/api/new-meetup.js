import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://admin:12345@next-app-project.0q65j.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const result = await db.collection("meetups").insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({
      message: "Meetup Inserted",
    });
  }
};

export default handler;
