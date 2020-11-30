import { Router } from "https://deno.land/x/oak/mod.ts";
import {
    addCountry,
    getAllCountry,
    getSingleCountry,
    updateCountry,
    deleteCountry,
} from "./controllers/CountryController.ts";

import {
    getAllProvince,
    addProvince,
    getSingleProvince,
    updateProvince,
    deleteProvince,
} from "./controllers/ProvinceController.ts";

import {
    getAllStatistik,
    addStatistik,
    getSingleStatistik,
    updateStatistik,
    deleteStatistik,
} from "./controllers/StatistikController.ts";

const router = new Router();

//Router Countries
router
    .get("/countries", getAllCountry)
    .post("/countries", addCountry)
    .get("/countries/:id", getSingleCountry)
    .put("/countries/:id", updateCountry)
    .delete("/countries/:id", deleteCountry);

//Router Province
router
    .get("/provinces", getAllProvince)
    .post("/provinces", addProvince)
    .get("/provinces/:id", getSingleProvince)
    .put("/provinces/:id", updateProvince)
    .delete("/provinces/:id", deleteProvince);

//Router Statistik
router
    .get("/statistics", getAllStatistik)
    .post("/statistics", addStatistik)
    .get("/statistics/:id", getSingleStatistik)
    .put("/statistics/:id", updateStatistik)
    .delete("/statistics/:id", deleteStatistik);

export default router;
