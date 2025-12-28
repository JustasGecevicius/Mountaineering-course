export function mapSteps(stepsData: any[]): { type: "span"; value: string }[] {
  const { value } = stepsData;
  const { document } = value || {};
  const { children } = document || {};
  const [firstChild] = children || [];
  const { children: x } = firstChild || [];

  return x.map((child: any) => {
    return getDeepSpan(child.children);
  });
}

export function getDeepSpan(children: {}): any[] {
  return children[0].children[0].value;
}
