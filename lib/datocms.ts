"use client";
import { executeQuery } from "@datocms/cda-client";
import { cache } from "react";

const dedupedPerformRequest = cache(async (serializedArgs) => {
  return executeQuery(...JSON.parse(serializedArgs));
});

export function performRequest(query, options?: {}) {
  console.log("TOKEN", process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN);
  return dedupedPerformRequest(
    JSON.stringify([
      query,
      {
        ...options,
        token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
        environment: process.env.NEXT_PUBLIC_DATOCMS_ENVIRONMENT,
      },
    ])
  );
}
