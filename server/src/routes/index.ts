import accountRouter from './accountSetting.route';
import authRouter from './auth.route';
import verificationRouter from './verification.route';
import notificationRouter from './notification.route';
import jobApplicationRouter from './jobApplication.route';
import jobRouter from './job.route';
import recordsRouter from './records.route';
import userRouter from './user.route';
import emailRouter from './email.routes';
import roleRouter from './role.route';
import companyRouter from './company.routes';
import { Express } from 'express';

const configureRoute = (app: Express) => {
  app.use('/api/v1/account-setting', accountRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/verification', verificationRouter);
  app.use('/api/v1/notifications', notificationRouter);
  app.use('/api/v1/job-applications', jobApplicationRouter);
  app.use('/api/v1/jobs', jobRouter);
  app.use('/api/v1/records', recordsRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/verifications', emailRouter);
  app.use('/api/v1/roles', roleRouter);
  app.use('/api/v1/companies', companyRouter);
};

export default configureRoute;
