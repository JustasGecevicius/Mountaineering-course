export const getAccordionData = (knotData: Record<string, unknown>) => {
  if (typeof knotData !== "object" || knotData === null) {
    return [];
  }
  type Link = { id: string; name: string };
  type AccordionDatum = { triggerKey: string; contentText?: string; contentElements?: Link[] };
  const data = Object.entries(knotData).reduce<AccordionDatum[]>((acc, [key, value]) => {
    if (typeof value === "string") {
      acc.push({ triggerKey: key, contentText: value });
    } else if (typeof value === "object" && value !== null) {
      const linked = value as { links?: Link[] };
      acc.push({ triggerKey: key, contentElements: linked.links });
    }
    return acc;
  }, []);
  return data;
};
