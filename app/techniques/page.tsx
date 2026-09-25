import { LibraryView } from "@/components/library/LibraryView";
import type { Lesson } from "@/components/cards/LessonCard";
import { fetchDato, loadQuery } from "@/lib/datocms/datocms";

export default async function AllTechniquesPage() {
  let lessons: Lesson[] = [];
  try { lessons = (await fetchDato<{ allTechniques: Lesson[] }>(loadQuery("allTechniques"))).allTechniques || []; } catch { /* CMS may be unavailable during a local build. */ }
  return <main className="library-page"><div className="library-heading"><div className="eyebrow">Interactive Curriculum</div><h1>Techniques Library</h1></div><LibraryView lessons={lessons} kind="technique" />{!lessons.length && <p className="empty-state">Connect DatoCMS to show technique lessons.</p>}</main>;
}
