import { Router } from "express";
import { getCountryList, getCityList } from "../controllers/records.controller.js";

const router = Router()

router.route("/countries").get(getCountryList)
router.route('/countries/:countryId/cities').get(getCityList)

export default router