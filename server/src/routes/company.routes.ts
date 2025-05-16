import { Router } from 'express';
import {
  createCompany,
  deleteCompany,
  getCompany,
  getCompanyList,
  updateCompany,
} from '../controllers/company.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const companyRouter = Router();

// companyRouter.use(authenticateUser);

companyRouter.route('/').get(getCompanyList).post(createCompany);

companyRouter
  .route('/:companyId')
  .put(updateCompany)
  .get(getCompany)
  .delete(deleteCompany);
export default companyRouter;
