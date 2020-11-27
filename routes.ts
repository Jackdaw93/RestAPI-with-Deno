import { Router } from "https://deno.land/x/oak/mod.ts";
import {
    addCountry,
    getAllCountry,
    getSingleCountry,
    updateCountry,
    deleteCountry,
} from "./controllers/CountryController.ts";

const router = new Router();

//Router Countries
router
    .get("/countries", getAllCountry)
    .post("/countries", addCountry)
    .get("/countries/:id", getSingleCountry)
    .put("/countries/:id", updateCountry)
    .delete("/countries/:id", deleteCountry);

export default router;
