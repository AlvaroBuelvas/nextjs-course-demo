import { MongoClient, mongoClient } from 'mongodb';

// api/new-meetup
// POST /api/new-meetup


async function handler(req, res) {
    console.log(req)
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://abuelvas:WCMDnDhyf8BdxFjx@cluster0.yrdy19o.mongodb.net/meetups?retryWrites=true&w=majority')

        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result)

        client.close();

        res.status(201).json({message: 'Meetup Inserted'})
    }
}

export default handler;