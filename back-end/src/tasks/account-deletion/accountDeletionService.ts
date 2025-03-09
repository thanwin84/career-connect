import mongoose from 'mongoose';
import { BadRequestError } from '../../errors/customErrors';
import { Job } from '../../models/job.model';
import { JobApplication } from '../../models/jobApplication.model';
import { User } from '../../models/user.model';

export const deleteAccountTask = async (userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findByIdAndDelete(userId).session(session);
    if (!user) {
      throw new BadRequestError(`User with id ${userId} could not be found`);
    }
    await JobApplication.deleteMany({ candidateId: userId }).session(session);
    await Job.deleteMany({ createdBy: userId }).session(session);
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
