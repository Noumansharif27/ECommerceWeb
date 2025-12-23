const validateAndCleanSizes = (sizes) => {
  if (!sizes) return [];

  let parsedSizes = [];

  // sizes will arrive as string in multipart/form-data
  if (typeof sizes === "string") {
    parsedSizes = JSON.parse(sizes);
  } else if (Array.isArray(sizes)) {
    parsedSizes = sizes;
  }

  const cleanedSizes = parsedSizes.filter(
    (size) => typeof size === "string" && size.trim() !== ""
  );

  return cleanedSizes;
};

export default validateAndCleanSizes;
