export const errorBadRequestHandler = <T extends string>(
  expectedFields: T[],
  req: Record<string, any>,
) => {
  const missingFields = expectedFields.filter(
    (field) => req[field] === undefined,
  );

  if (missingFields.length === 0) {
    return null;
  }

  return {
    message: `Request is missing required fields: ${missingFields.join(", ")}`,
  };
};
