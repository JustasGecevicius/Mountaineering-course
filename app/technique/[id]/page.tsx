import { fetchDato, loadQuery } from "@/lib/datocms/datocms";
import { mapSteps } from "./utils";
import { LessonDetail } from "@/components/lesson/LessonDetail";

export default async function KnotPage(props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params;
    const query = loadQuery("techniqueById");
    const techniqueData = await fetchDato<{ technique?: { gif?: { url?: string }; name: string; isbasic?: boolean; steps?: Parameters<typeof mapSteps>[0] } }>(query, { id });

    const { technique } = techniqueData || {};
    if (!technique) throw new Error("Technique not found");
    const { gif, name, isbasic } = technique || {};
    const steps = technique.steps ? mapSteps(technique.steps) : [];

    const stepText = Array.isArray(steps) && steps.length ? steps.map((step, index) => `${index + 1}. ${step.value}`).join("\n") : "Follow the animated sequence and verify each stage before continuing.";
    return <LessonDetail kind="technique" name={name} gifUrl={gif?.url} basic={isbasic !== false} steps={Array.isArray(steps) ? steps.length : 8} sections={[{ title: "Description", content: "Practice this mountaineering technique in a controlled environment before applying it in the field." }, { title: "Step-by-step instructions", content: stepText }, { title: "Primary Uses", content: "Use this system only after assessing terrain, anchors, equipment, and team competence." }]} />;
  } catch (error) {
    console.error("Error fetching knot data:", error);
    return <main className="error-page">Error loading technique data.</main>;
  }
}
