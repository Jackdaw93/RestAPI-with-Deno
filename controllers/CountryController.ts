import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import db from "../databaseMongo.ts";

const countryCollections = db.collection("country");

export const getAllCountry = async (ctx: RouterContext) => {
    const getAllData = await countryCollections.find({});

    const responseData = {
        message: "Success get all Data",
        data: getAllData,
    };

    ctx.response.status = 200;
    ctx.response.body = responseData;
};

export const addCountry = async (ctx: RouterContext) => {
    const { request, response } = ctx;
    const body = await request.body();
    const data = await body.value;

    await countryCollections.insertOne(data);

    response.status = 201;
    response.body = {
        message: "Success add data country",
        data: data,
    };
};

export const getSingleCountry = async (ctx: RouterContext) => {
    const id = ctx.params.id;
    const getOneData = await countryCollections.findOne({ _id: { $oid: id } });

    ctx.response.status = 200;
    ctx.response.body = {
        message: "Success get single country",
        data: getOneData,
    };
};

export const updateCountry = async (ctx: RouterContext) => {
    const { request, response } = ctx;
    const id = ctx.params.id;
    const { value } = request.body({ type: "json" });
    const {
        active,
        confirmed,
        name,
        deaths,
        lat,
        long,
        recovered,
    } = await value;

    await countryCollections.updateOne(
        {
            _id: { $oid: id },
        },
        {
            $set: { active, confirmed, name, deaths, lat, long, recovered },
        }
    );

    const result = await countryCollections.findOne({ _id: { $oid: id } });

    response.status = 200;
    response.body = {
        message: "Success updates data country",
        data: result,
    };
};

export const deleteCountry = async (ctx: RouterContext) => {
    const { response } = ctx;
    const id = ctx.params.id;

    await countryCollections.deleteOne({ _id: { $oid: id } });

    response.status = 200;
    response.body = {
        message: "Success deleted data country",
        data: null,
    };
};
