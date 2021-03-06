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

export const addProvince = async (ctx: RouterContext) => {
    const { request, response } = ctx;
    const body = await request.body();
    const data = await body.value;

    await provinceCollection.insertOne(data);

    response.status = 201;
    response.body = {
        message: "Success add data province",
        data: data,
    };
};

export const getSingleProvince = async (ctx: RouterContext) => {
    const id = ctx.params.id;
    const getOneData = await provinceCollection.findOne({ _id: { $oid: id } });

    ctx.response.status = 200;
    ctx.response.body = {
        message: "Success get single province",
        data: getOneData,
    };
};

export const updateProvince = async (ctx: RouterContext) => {
    const { request, response } = ctx;
    const id = ctx.params.id;
    const { value } = request.body({ type: "json" });
    const { confirmed, recovered, deaths, name } = await value;

    await provinceCollection.updateOne(
        {
            _id: { $oid: id },
        },
        {
            $set: { confirmed, recovered, deaths, name },
        }
    );

    const result = await provinceCollection.findOne({ _id: { $oid: id } });

    response.status = 200;
    response.body = {
        message: "Success updates data province",
        data: result,
    };
};

export const deleteProvince = async (ctx: RouterContext) => {
    const { response } = ctx;
    const id = ctx.params.id;

    await provinceCollection.deleteOne({ _id: { $oid: id } });

    response.status = 200;
    response.body = {
        message: "Success deleted data statistik",
        data: null,
    };
};
