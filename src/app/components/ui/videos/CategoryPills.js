"use client";

import {
  LayoutGrid,
  Music2,
  Gamepad2,
  Trophy,
  Tv2,
  FlaskConical,
  Users,
  Laugh,
  Newspaper,
  Scissors,
  GraduationCap,
  Car,
  PawPrint,
  Plane,
} from "lucide-react";

export const CATEGORIES = [
  { id: "", label: "All", Icon: LayoutGrid },
  { id: "10", label: "Music", Icon: Music2 },
  { id: "20", label: "Gaming", Icon: Gamepad2 },
  { id: "17", label: "Sports", Icon: Trophy },
  { id: "24", label: "Entertainment", Icon: Tv2 },
  { id: "28", label: "Science & Tech", Icon: FlaskConical },
  { id: "22", label: "People & Blogs", Icon: Users },
  { id: "23", label: "Comedy", Icon: Laugh },
  { id: "25", label: "News", Icon: Newspaper },
  { id: "26", label: "How-to & Style", Icon: Scissors },
  { id: "27", label: "Education", Icon: GraduationCap },
  { id: "2", label: "Autos", Icon: Car },
  { id: "15", label: "Pets & Animals", Icon: PawPrint },
  { id: "19", label: "Travel", Icon: Plane },
];

export default function CategoryPills({ selected, onSelect }) {
  return (
    <div
      className="flex gap-2 px-4 py-3 overflow-x-auto sticky top-14 z-30 scrollbar-hide"
      style={{
        background: "var(--bg-primary)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {CATEGORIES.map(({ id, label, Icon }) => {
        const isSelected = selected === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150"
            style={{
              background: isSelected
                ? "var(--text-primary)"
                : "var(--bg-surface)",
              color: isSelected ? "var(--bg-primary)" : "var(--text-primary)",
            }}
            onMouseEnter={(e) => {
              if (!isSelected)
                e.currentTarget.style.background = "var(--bg-hover)";
            }}
            onMouseLeave={(e) => {
              if (!isSelected)
                e.currentTarget.style.background = "var(--bg-surface)";
            }}
          >
            <Icon size={14} strokeWidth={isSelected ? 2.5 : 2} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
