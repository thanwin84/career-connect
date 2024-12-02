export type UserRole = "user" | "admin";

export type Stats = {
  interview: number;
  pending: number;
  declined: number;
};

export type Pagination = {
  totalPages: number;
  currentPage: number;
  totalItems: number;
};
