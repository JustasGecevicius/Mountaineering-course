import { LibraryView } from "@/components/library/LibraryView";
import type { Lesson } from "@/components/cards/LessonCard";
import { fetchDato, loadQuery } from "@/lib/datocms/datocms";

export default async function AllKnotsPage() {
  let lessons: Lesson[] = [];
  try { lessons = (await fetchDato<{ allKnots: Lesson[] }>(loadQuery("allKnots"))).allKnots || []; } catch { /* CMS may be unavailable during a local build. */ }
  return <main className="library-page"><div className="library-heading"><div className="eyebrow">Interactive Curriculum</div><h1>Knots Library</h1></div><LibraryView lessons={lessons} kind="knot" />{!lessons.length && <p className="empty-state">Connect DatoCMS to show knot lessons.</p>}</main>;
}
