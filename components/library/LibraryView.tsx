"use client";

import { useState } from "react";
import { LessonCard, type Lesson } from "@/components/cards/LessonCard";

export function LibraryView({ lessons, kind }: { lessons: Lesson[]; kind: "knot" | "technique" }) {
  const [filter, setFilter] = useState("All");
  const levels = ["All", "Basic", "Advanced", "Guide"];
  const filtered = filter === "All" ? lessons : lessons.filter((lesson) => (lesson.level || (lesson.isbasic === false ? "Advanced" : "Basic")) === filter);
  return <><div className="filter-row" role="group" aria-label="Filter by level">{levels.map((level) => <button key={level} className={filter === level ? "selected" : ""} onClick={() => setFilter(level)}>{level}</button>)}</div><div className="library-grid">{filtered.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} kind={kind} />)}</div></>;
}
