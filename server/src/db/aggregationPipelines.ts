export const jobApplicationPipeline = [
  {
    $lookup: {
      from: 'users',
      localField: 'candidateId',
      foreignField: '_id',
      as: 'candidate',
      pipeline: [
        {
          $project: {
            firstName: 1,
            lastName: 1,
            avatar: 1,
          },
        },
      ],
    },
  },
  {
    $lookup: {
      from: 'jobs',
      localField: 'jobId',
      foreignField: '_id',
      as: 'job',
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'job.createdBy',
      foreignField: '_id',
      as: 'recruiter',
      pipeline: [
        {
          $project: {
            firstName: 1,
            lastName: 1,
            avatar: 1,
          },
        },
      ],
    },
  },
  {
    $unwind: {
      path: '$job',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: 'companies',
      localField: 'job.companyId',
      foreignField: '_id',
      as: 'company',
    },
  },
  {
    $addFields: {
      company: '$company.name',
    },
  },
  {
    $unwind: '$statusHistory',
  },
  {
    $lookup: {
      from: 'users',
      localField: 'statusHistory.updatedBy',
      foreignField: '_id',
      as: 'statusHistory.updatedBy',
    },
  },
  {
    $addFields: {
      'statusHistory.updatedBy': { $first: '$statusHistory.updatedBy' },
      recruiter: { $first: '$recruiter' },
      company: { $first: '$company' },
      candidate: { $first: '$candidate' },
    },
  },
  {
    $project: {
      'statusHistory.updatedBy.password': 0,
      'statusHistory.updatedBy.educationRecords': 0,
      'statusHistory.updatedBy.accessStatus': 0,
      'statusHistory.updatedBy.twoStepAuthentication': 0,
      'statusHistory.updatedBy.isEmailVerified': 0,
      'statusHistory.updatedBy.emailVerifyTokenExpiry': 0,
      'statusHistory.updatedBy.location': 0,
      'statusHistory.updatedBy.isDeleted': 0,
      'statusHistory.updatedBy.forgotPasswordTokenExpiry': 0,
      'statusHistory.updatedBy.role': 0,
      'statusHistory.updatedBy.createdAt': 0,
      'statusHistory.updatedBy.updatedAt': 0,
    },
  },
  {
    $group: {
      _id: '$_id',
      status: { $first: '$status' },
      statusHistory: { $push: '$statusHistory' },
      recruiter: { $first: '$recruiter' },
      job: { $first: '$job' },
      company: { $first: '$company' },
      candidate: { $first: '$candidate' },
    },
  },
];

export const jobAggregationPipeline = [
  {
    $lookup: {
      from: 'users',
      localField: 'createdBy',
      foreignField: '_id',
      as: 'createdBy',
      pipeline: [
        {
          $project: {
            firstName: 1,
            lastName: 1,
            avatar: 1,
            email: 1,
          },
        },
      ],
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
      pipeline: [
        {
          $project: {
            role: 0,
            employees: 0,
            adminID: 0,
          },
        },
      ],
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
