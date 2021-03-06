import { MongoClient } from "https://deno.land/x/mongo@v0.13.0/mod.ts";

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");

const databaseMongo = client.database("covid19");

export default databaseMongo;
