import GifPlayer from "@/components/gif/player";
import { fetchDato, loadQuery } from "@/lib/datocms/datocms";
import { AccordionComponent } from "./components/accordion";

type KnotPageProps = {};

export default async function KnotPage(props: KnotPageProps) {
  try {
    const { id } = await props.params;
    const query = loadQuery("knotById");
    const knotData = await fetchDato(query, { id });

    const { knot } = knotData || {};
    const { gif, name, description, history, uses, linkedKnots } = knot || {};

    const accordionData = [
      { triggerText: "Description", contentText: description || "" },
      { triggerText: "History", contentText: history || "" },
      { triggerText: "Uses", contentText: uses || "" },
      { triggerText: "Linked", contentElements: linkedKnots?.links || [] },
    ];

    return (
      <div className="flex flex-col w-full gap-4 justify-start items-start">
        <h1>{name}</h1>
        <GifPlayer src={gif?.url} autoPlay loop frameDelay={1000} />
        <AccordionComponent data={accordionData} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching knot data:", error);
    return <div>Error loading knot data.</div>;
  }
}
