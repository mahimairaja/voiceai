import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { ArrowUpRight, Search } from 'lucide-react';
import { useDeferredValue, useMemo, useState } from 'react';

// Search and filter README entries. On the home page it spans every section; on a section page
// it covers that section and can filter by the README's own ### groups.

export type Item = {
  title: string;
  url: string;
  domain: string;
  html: string; // description, inline Markdown rendered at build time
  text: string; // plain description, for search
  level: string | null;
  levelTo: string | null;
  commercial: boolean;
  group: string | null;
  section: { num: number; title: string; href: string };
};

type Labels = {
  placeholder: string;
  allLevels: string;
  allGroups: string;
  commercial: string;
  noResults: string;
  showMore: string;
  levelNames: Record<string, string>;
  showing: string; // "{n} of {total}", filled in here
  showingAll: string;
  level: string;
};

const PAGE = 24;

export default function ResourceFinder({
  items,
  labels,
  showSection = true,
  groups = [],
}: {
  items: Item[];
  labels: Labels;
  showSection?: boolean;
  groups?: string[];
}) {
  const [q, setQ] = useState('');
  const [level, setLevel] = useState('all');
  const [group, setGroup] = useState('all');
  const [limit, setLimit] = useState(showSection ? PAGE : Infinity);
  const query = useDeferredValue(q.trim().toLowerCase());

  const results = useMemo(() => {
    const words = query.split(/\s+/).filter(Boolean);
    return items.filter((it) => {
      if (level !== 'all' && it.level !== level && it.levelTo !== level) return false;
      if (group !== 'all' && it.group !== group) return false;
      if (!words.length) return true;
      const hay = `${it.title} ${it.text} ${it.domain} ${it.section.title} ${it.group ?? ''}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [items, query, level, group]);

  const hasLevels = items.some((i) => i.level);
  const shown = results.slice(0, limit);
  const count =
    results.length === items.length
      ? labels.showingAll.replace('{total}', String(items.length))
      : labels.showing.replace('{n}', String(results.length)).replace('{total}', String(items.length));

  return (
    <div className="finder">
      <div className="finder__bar">
        <label className="finder__search">
          <Search size={16} strokeWidth={1.75} aria-hidden="true" />
          <span className="sr-only">{labels.placeholder}</span>
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setLimit(showSection ? PAGE : Infinity);
            }}
            placeholder={labels.placeholder}
          />
        </label>
        {hasLevels && (
          <ToggleGroup.Root
            type="single"
            value={level}
            onValueChange={(v) => v && setLevel(v)}
            aria-label={labels.level}
            className="seg finder__levels"
          >
            <ToggleGroup.Item value="all" className="seg__item">
              {labels.allLevels}
            </ToggleGroup.Item>
            {(['beginner', 'intermediate', 'advanced'] as const).map((l) => (
              <ToggleGroup.Item key={l} value={l} className="seg__item" data-level={l}>
                <span className="level" data-level={l}>
                  {labels.levelNames[l]}
                </span>
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
        )}
      </div>
      {groups.length > 1 && (
        <ToggleGroup.Root type="single" value={group} onValueChange={(v) => v && setGroup(v)} className="finder__groups">
          <ToggleGroup.Item value="all" className="chip">
            {labels.allGroups}
          </ToggleGroup.Item>
          {groups.map((g) => (
            <ToggleGroup.Item key={g} value={g} className="chip">
              {g}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      )}
      <p className="finder__count mono" aria-live="polite">
        {count}
      </p>
      {results.length === 0 ? (
        <p className="finder__empty">{labels.noResults}</p>
      ) : (
        <ul className="res">
          {shown.map((it) => (
            <li key={`${it.section.num}-${it.url}`} className="res__item" data-resource data-section={it.section.num} data-level={it.level ?? undefined}>
              <div className="res__head">
                <a className="res__title" href={it.url} rel="noopener" target="_blank">
                  {it.title}
                  <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
                </a>
                <span className="res__domain mono">{it.domain}</span>
              </div>
              <p className="res__desc prose" dangerouslySetInnerHTML={{ __html: it.html }} />
              <div className="res__meta">
                {it.level && (
                  <span className="level" data-level={it.level}>
                    {labels.levelNames[it.level]}
                    {it.levelTo && ` → ${labels.levelNames[it.levelTo]}`}
                  </span>
                )}
                {it.commercial && <span className="tag">{labels.commercial}</span>}
                {showSection && (
                  <a className="res__section" href={it.section.href}>
                    <span className="mono">{String(it.section.num).padStart(2, '0')}</span> {it.section.title}
                  </a>
                )}
                {!showSection && it.group && groups.length > 1 && <span className="res__group">{it.group}</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
      {shown.length < results.length && (
        <button type="button" className="finder__more" onClick={() => setLimit((l) => l + PAGE)}>
          {labels.showMore} <span className="mono">({results.length - shown.length})</span>
        </button>
      )}
    </div>
  );
}
