import { DuplicateResourceError, NotFoundError } from '../errors/customErrors';
import { Company } from '../models/company.model';
import { companySchema } from '../schemas/company.schema';
import { Pagination } from '../types';
import { validId } from '../utils';

export const createCompanyService = async (data: any) => {
  companySchema.omit({ role: true, employees: true }).parse(data);
  const companyExists = await Company.findOne({ name: data.name });
  if (companyExists) {
    throw new DuplicateResourceError('Company is already registered');
  }
  return await Company.create(data);
};

export const updateCompanyService = async (data: any, companyId: string) => {
  companySchema.parse(data);
  validId('companyId').parse(companyId);
  const updatedCompany = await Company.findByIdAndUpdate(
    companyId,
    { $set: data },
    { new: true }
  );
  if (!updatedCompany) {
    throw new NotFoundError('Company is not found');
  }
  return updatedCompany;
};
export const deleteCompanyService = async (companyId: string) => {
  validId('companyId').parse(companyId);
  const deletedCompany = await Company.findByIdAndDelete(companyId);
  if (!deletedCompany) {
    throw new NotFoundError('Company is not found');
  }
  return deletedCompany;
};
export const getCompanyListService = async (
  page: number = 1,
  limit: number = 10
) => {
  const skip = (page - 1) * limit;
  const companies = await Company.find().skip(skip).limit(limit).lean();
  const total = await Company.countDocuments();
  const pagination: Pagination = {
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  };

  return { data: companies, pagination };
};
export const getCompanyService = async (companyId: string) => {
  validId('companyId').parse(companyId);
  const company = await Company.findById(companyId);
  if (!company) {
    throw new NotFoundError('Company is not found');
  }
  return company;
};
