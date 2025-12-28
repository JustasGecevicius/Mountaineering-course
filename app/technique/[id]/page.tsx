import { fetchDato, loadQuery } from "@/lib/datocms/datocms";
import { ClientPage } from "./client-page";
import { mapSteps } from "./utils";

type KnotPageProps = {};

export default async function KnotPage(props: KnotPageProps) {
  try {
    const { id } = await props.params;
    const query = loadQuery("techniqueById");
    const techniqueData = await fetchDato(query, { id });

    const { technique } = techniqueData || {};
    technique.steps = mapSteps(technique.steps);
    const { gif, name, steps } = technique || {};

    return (
      <div className="flex flex-col w-full gap-4 justify-start items-start">
        <h1>{name}</h1>
        <ClientPage gifUrl={gif?.url} steps={steps} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching knot data:", error);
    return <div>Error loading knot data.</div>;
  }
}
