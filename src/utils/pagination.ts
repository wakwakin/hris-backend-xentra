export const getPagination = (page: number, limit: number) => {
  const safePage = Math.max(page, 1)
  const safeLimit = Math.max(limit, 1)

  return {
    skip: (safePage - 1) * safeLimit,
    limit: safeLimit,
    page: safePage,
  }
}
