import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("https://graphql.datocms.com/", {
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

export async function gql<T>(query: string, variables?: any): Promise<T> {
  return client.request(query, variables);
}
