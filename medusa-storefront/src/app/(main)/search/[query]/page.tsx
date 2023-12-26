import SearchResultsTemplate from "@modules/search/templates/search-results-template";
import { Metadata } from "next";
import { search } from "../actions";

export const metadata: Metadata = {
  title: "Search",
  description: "Explore all of our products.",
};

export default async function StorePage({
  params,
}: {
  params: { query: string };
}) {
  const { query } = params;
  const hits = await search(query);

  return <SearchResultsTemplate query={query} hits={hits} />;
}
