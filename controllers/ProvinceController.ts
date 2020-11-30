import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import db from "../databaseMongo.ts";

const provinceCollection = db.collection("province");

export const getAllProvince = async (ctx: RouterContext) => {
    const getAllData = await provinceCollection.find({});

    const responseData = {
        message: "Success get all data",
        data: getAllData,
    };

    ctx.response.status = 200;
    ctx.response.body = responseData;
};
