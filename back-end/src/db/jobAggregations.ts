export const jobAggregationPipeline = [
  {
    $lookup: {
      from: 'users',
      localField: 'createdBy',
      foreignField: '_id',
      as: 'createdBy',
    },
  },
  {
    $addFields: {
      createdBy: { $first: '$createdBy' },
    },
  },

  {
    $lookup: {
      from: 'companies',
      localField: 'companyId',
      foreignField: '_id',
      as: 'company',
    },
  },
  {
    $addFields: {
      company: { $first: '$company' },
    },
  },
  {
    $project: {
      companyId: 0,
    },
  },
];
