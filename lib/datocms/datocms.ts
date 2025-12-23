import { readFileSync } from "fs";
import { join } from "path";

const DATO_API_URL = "https://graphql.datocms.com/";
const API_TOKEN = process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN;

export async function fetchDato<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const res = await fetch(DATO_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // ISR support
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(JSON.stringify(json.errors, null, 2));
  }

  return json.data;
}

export function loadQuery(name: string) {
  return readFileSync(join(process.cwd(), "lib/datocms/queries", `${name}.gql`), "utf8");
}
