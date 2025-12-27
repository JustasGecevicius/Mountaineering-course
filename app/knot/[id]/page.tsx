import GifPlayer from "@/components/gif/player";
import { fetchDato, loadQuery } from "@/lib/datocms/datocms";
import { AccordionComponent } from "./components/accordion/accordion";
import { getAccordionData } from "@/hooks/use-accordion-data";
import { formatAccortionData } from "./components/accordion/utils";

type KnotPageProps = {};

export default async function KnotPage(props: KnotPageProps) {
  try {
    const { id } = await props.params;
    const query = loadQuery("knotById");
    const data = await fetchDato(query, { id });

    const { knot } = data || {};
    const { gif, name, knotData } = knot || {};

    const rawAccordionData = getAccordionData(knotData);
    const accordionData = formatAccortionData(rawAccordionData);

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
