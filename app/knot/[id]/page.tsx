import { fetchDato, loadQuery } from "@/lib/datocms/datocms";
import { getAccordionData } from "@/hooks/use-accordion-data";
import { formatAccortionData } from "./components/accordion/utils";
import { LessonDetail } from "@/components/lesson/LessonDetail";

export default async function KnotPage(props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params;
    const query = loadQuery("knotById");
    const data = await fetchDato<{ knot?: { gif?: { url?: string }; name: string; isbasic?: boolean; knotData?: Record<string, unknown> } }>(query, { id });

    const { knot } = data || {};
    if (!knot) throw new Error("Knot not found");
    const { gif, name, knotData, isbasic } = knot || {};

    const rawAccordionData = getAccordionData(knotData || {});
    const accordionData = formatAccortionData(rawAccordionData);

    const sections = accordionData.map((item: any) => ({ title: item.triggerText === "History" ? "History & Origin" : item.triggerText === "Uses" ? "Primary Uses" : item.triggerText, content: item.contentText, links: item.contentElements }));
    return <LessonDetail kind="knot" name={name} gifUrl={gif?.url} basic={isbasic !== false} sections={sections} />;
  } catch (error) {
    console.error("Error fetching knot data:", error);
    return <main className="error-page">Error loading knot data.</main>;
  }
}
