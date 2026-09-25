import Link from "next/link";

export type Lesson = { id: string; name: string; thumbnail?: { url?: string }; description?: string; knotData?: { description?: string }; isbasic?: boolean; level?: string; duration?: string };

export function LessonCard({ lesson, kind = "knot", featured = false }: { lesson: Lesson; kind?: "knot" | "technique"; featured?: boolean }) {
  const level = lesson.level || (lesson.isbasic === false ? "Advanced" : "Basic");
  const description = lesson.description || lesson.knotData?.description || (kind === "technique" ? "A practical alpine system explained step by step." : "Essential ropework for secure and efficient mountain travel.");
  return <Link className={`lesson-card${featured ? " lesson-card-wide" : ""}`} href={`/${kind}/${lesson.id}`}>
    <div className="lesson-image">{lesson.thumbnail?.url ? <img src={lesson.thumbnail.url} alt="" /> : <div className="image-fallback" />}</div>
    <div className="lesson-content"><div className="lesson-meta"><span className={`level level-${level.toLowerCase()}`}>{level}</span><span>{lesson.duration || (kind === "technique" ? "8 min" : "4 min")}</span></div><h3>{lesson.name}</h3><p>{description}</p></div>
    <div className="lesson-footer"><span>Start Lesson</span><img src="/alpine/arrow-right.svg" alt="" /></div>
  </Link>;
}
