import Link from "next/link";
import { LessonCard, type Lesson } from "@/components/cards/LessonCard";
import { fetchDato, loadQuery } from "@/lib/datocms/datocms";

async function getHomeData() {
  try {
    const [knots, techniques] = await Promise.all([
      fetchDato<{ allKnots: Lesson[] }>(loadQuery("allKnots")),
      fetchDato<{ allTechniques: Lesson[] }>(loadQuery("allTechniques")),
    ]);
    return { knots: knots.allKnots || [], techniques: techniques.allTechniques || [] };
  } catch { return { knots: [], techniques: [] }; }
}

export default async function Home() {
  const { knots, techniques } = await getHomeData();
  return <main>
    <section className="hero"><div className="hero-content"><div className="eyebrow eyebrow-on-dark">Interactive Alpine Education</div><h1>Master the Mountains, One Knot at a Time</h1><p>Structured alpine skills training — from first knot to summit guide certification. Study high-fidelity interactive guides anywhere, even offline.</p><Link className="primary-button" href="/knots">Start Learning</Link></div></section>
    <section className="content-section"><div className="section-heading"><div><div className="eyebrow">Foundations</div><h2>Featured Knots</h2></div><Link href="/knots">View Library →</Link></div><div className="featured-grid">{knots.slice(0, 3).map((lesson) => <LessonCard key={lesson.id} lesson={lesson} />)}</div>{!knots.length && <p className="empty-state">Connect DatoCMS to show featured knot lessons.</p>}</section>
    <section className="content-section techniques-section"><div className="section-heading"><div><div className="eyebrow">Rigging &amp; Anchor Systems</div><h2>Popular Techniques</h2></div><Link href="/techniques">View Library →</Link></div><div className="technique-grid">{techniques.slice(0, 2).map((lesson) => <LessonCard key={lesson.id} lesson={lesson} kind="technique" featured />)}</div>{!techniques.length && <p className="empty-state">Connect DatoCMS to show popular technique lessons.</p>}</section>
  </main>;
}
