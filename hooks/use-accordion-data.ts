export const getAccordionData = (knotData: Record<string, unknown>) => {
  if (typeof knotData !== "object" || knotData === null) {
    return [];
  }
  const data = Object.entries(knotData).reduce((acc, [key, value]) => {
    if (typeof value === "string") {
      acc.push({ triggerKey: key, contentText: value });
    } else if (typeof value === "object" && value !== null) {
      acc.push({ triggerKey: key, contentElements: value?.links });
    }
    return acc;
  }, [] as any[]);
  return data;
};
