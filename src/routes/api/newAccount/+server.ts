// import { MongoClient, ServerApiVersion } from 'mongodb';
// import { json } from '@sveltejs/kit';
// const uri = 'mongodb+srv://morgan-yu:sVom8X0KkrKIBjDtPRISMX-522323ED@deepstoragedemo.a0sw4.mongodb.net/?retryWrites=true&w=majority';
// /** @type {import('./$types').RequestHandler} */
// export async function POST({ request }) {
//     const { hash } = await request.json();
//     const client = new MongoClient(uri, {
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     });
//     let pinged = false;
//     const collection = client.db("DeepStorage-B_demo").collection("ARC");
//     try {
//         await client.connect();
//         await collection.insertOne({ hash: hash });
//         console.log("Deep Storage Linked Established");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }

//     return new Response(String(JSON.stringify({ ran: '', success: true })));
// }