import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import db from "../databaseMongo.ts";

const statistikCollection = db.collection("statistik");

export const getAllStatistik = async (ctx: RouterContext) => {
    const getAllData = await statistikCollection.find({});

    const responseData = {
        message: "Success get all data",
        data: getAllData,
    };

    ctx.response.status = 200;
    ctx.response.body = responseData;
};

export const addStatistik = async (ctx: RouterContext) => {
    const { request, response } = ctx;
    const body = await request.body();
    const data = await body.value;

    await statistikCollection.insertOne(data);

    response.status = 201;
    response.body = {
        message: "Success add data statistik",
        data: data,
    };
};

export const getSingleStatistik = async (ctx: RouterContext) => {
    const id = ctx.params.id;
    const getOneData = await statistikCollection.findOne({ _id: { $oid: id } });

    ctx.response.status = 200;
    ctx.response.body = {
        message: "Success get single province",
        data: getOneData,
    };
};

export const updateStatistik = async (ctx: RouterContext) => {
    const { request, response } = ctx;
    const id = ctx.params.id;
    const { value } = request.body({ type: "json" });
    const { active, confirmed, country, deaths, recovered, date } = await value;

    await statistikCollection.updateOne(
        {
            _id: { $oid: id },
        },
        {
            $set: { active, confirmed, country, deaths, recovered, date },
        }
    );

    const result = await statistikCollection.findOne({ _id: { $oid: id } });

    response.status = 200;
    response.body = {
        message: "Success updates data statistik",
        data: result,
    };
};

export const deleteStatistik = async (ctx: RouterContext) => {
    const { response } = ctx;
    const id = ctx.params.id;

    await statistikCollection.deleteOne({ _id: { $oid: id } });

    response.status = 200;
    response.body = {
        message: "Success deleted data statistik",
        data: null,
    };
};
