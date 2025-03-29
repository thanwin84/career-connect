import { Router } from 'express';
import { authenticateUser } from '../middleware/auth.middleware';
import {
  addRole,
  createRole,
  getRoles,
  removeRole,
} from '../controllers/role.controller';
import { authorize } from '../middleware/authorize.middleware';
import { permissions } from '../constants/permissions';

const roleRouter = Router();

roleRouter
  .route('/')
  .post(authenticateUser, createRole)
  .patch(authenticateUser, authorize(permissions.ROle_ASSIGN), removeRole)
  .get(authenticateUser, getRoles);
roleRouter
  .route('/add-role')
  .patch(authenticateUser, authorize(permissions.ROle_ASSIGN), addRole);

export default roleRouter;
