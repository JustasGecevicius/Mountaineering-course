import Link from "next/link";
import { AlertTriangle, Bookmark } from "lucide-react";
import GifPlayer from "@/components/gif/player";

type DetailSection = { title: string; content?: string; links?: { id: string; name: string }[] };

export function LessonDetail({ kind, name, gifUrl, basic = true, sections, steps = 8 }: { kind: "knot" | "technique"; name: string; gifUrl?: string; basic?: boolean; sections: DetailSection[]; steps?: number }) {
  const related = sections.flatMap((section) => section.links || []);
  const label = kind === "knot" ? "Knots" : "Techniques";
  return <main className="detail-page">
    <div className="breadcrumbs"><Link href={`/${kind}s`}>{label}</Link><span>›</span><strong>{name}</strong></div>
    <div className="detail-title-row"><div className="detail-title"><h1>{name}</h1><span className={`level ${basic ? "" : "level-advanced"}`}>{basic ? "Basic" : "Advanced"}</span></div><div className="detail-meta"><span>{steps} steps · 4 min lesson</span><button><Bookmark size={18} /> Save {kind === "knot" ? "Knot" : "Lesson"}</button></div></div>
    <div className="detail-layout">
      <div className="detail-main">
        {gifUrl ? <GifPlayer src={gifUrl} autoPlay loop frameDelay={1000} /> : <div className="player-placeholder">Interactive guide unavailable</div>}
        <div className="detail-accordions">{sections.filter((section) => !section.links).map((section, index) => <details key={section.title} open={index === 0}><summary>{section.title}<span>⌄</span></summary>{section.content && <p>{section.content}</p>}</details>)}</div>
      </div>
      <aside className="detail-aside">
        {related.length > 0 && <section className="related-card"><h2>Related {label}</h2>{related.map((item) => <Link href={`/${kind}/${item.id}`} key={item.id}><span className="related-thumb" /><span><strong>{item.name}</strong><small>Related lesson · {basic ? "Basic" : "Advanced"}</small></span></Link>)}</section>}
        <section className="safety-card"><h2><AlertTriangle size={18} /> Safety Inspection Rule</h2><p>Always verify every system with your partner before weighting it. Dress, tighten, and inspect every knot and connection before leaving the ground.</p></section>
      </aside>
    </div>
  </main>;
}
