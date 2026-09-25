type StructuredNode = { value?: string; children?: StructuredNode[] };
type StructuredSteps = { value?: { document?: { children?: StructuredNode[] } } };

export function mapSteps(stepsData?: StructuredSteps): { type: "span"; value: string }[] {
  const roots = stepsData?.value?.document?.children || [];
  const values: string[] = [];
  const visit = (node: StructuredNode) => {
    if (typeof node.value === "string" && node.value.trim()) values.push(node.value.trim());
    node.children?.forEach(visit);
  };
  roots.forEach(visit);
  return values.map((value) => ({ type: "span", value }));
}
