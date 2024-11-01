import { Router } from "express";
import { getCountryList, getCityList } from "../controllers/records.controller";

const router = Router()

router.route("/countries").get(getCountryList)
router.route('/countries/:countryId/cities').get(getCityList)

export default router