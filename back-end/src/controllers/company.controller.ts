import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import {
  createCompanyService,
  deleteCompanyService,
  getCompanyListService,
  getCompanyService,
  updateCompanyService,
} from '../service/company.service';
import { ApiResponse } from '../utils/ApiResponse';
import { statusCodes } from '../constants';

export const createCompany = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await createCompanyService(req.body);
    res
      .status(201)
      .json(new ApiResponse(201, data, 'Company is created successfully'));
  }
);

export const updateCompany = asyncHandler(
  async (req: Request, res: Response) => {
    const { companyId } = req.params;
    const data = await updateCompanyService(req.body, companyId);
    res
      .status(200)
      .json(
        new ApiResponse(
          statusCodes.OK,
          data,
          'Company data is updated successfully'
        )
      );
  }
);
export const deleteCompany = asyncHandler(
  async (req: Request, res: Response) => {
    const { companyId } = req.params;
    await deleteCompanyService(companyId);
    res
      .status(200)
      .json(
        new ApiResponse(
          statusCodes.OK,
          {},
          `Company with id ${companyId} is deleted successfully`
        )
      );
  }
);
export const getCompanyList = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit } = req.query;
    const data = await getCompanyListService(Number(page), Number(limit));
    res
      .status(200)
      .json(
        new ApiResponse(200, data, 'Company list has been fetched successfully')
      );
  }
);
export const getCompany = asyncHandler(async (req: Request, res: Response) => {
  const { companyId } = req.params;
  const data = await getCompanyService(companyId);
  res
    .status(200)
    .json(new ApiResponse(200, data, 'company with id is fetched'));
});
