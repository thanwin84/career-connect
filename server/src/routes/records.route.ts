import { Router } from 'express';
import { getCountryList, getCityList } from '../controllers/records.controller';

const recordsRouter = Router();

recordsRouter.route('/countries').get(getCountryList);
recordsRouter.route('/countries/:countryId/cities').get(getCityList);

export default recordsRouter;
