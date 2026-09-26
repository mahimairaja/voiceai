import { createTimeline, type Timeline } from 'animejs';
import { ArrowRight, AudioLines, Brain, Ear, Layers, Radio, Sparkles, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// The voice pipeline from the README's intro, drawn as one call: in over the transport, cleaned,
// turn-detected, transcribed, answered, and spoken back. Each stop is a README section; picking
// one shows that section's intro, its top-picks table, and its first entries.

export type Stop = {
  key: string;
  icon: keyof typeof ICONS;
  sections: {
    num: number;
    title: string;
    href: string;
    introHtml: string;
    countLabel: string;
    picksHeader: string[] | null;
    picks: { name: string; type: string; bestFor: string }[];
    top: { title: string; url: string; domain: string; level: string | null; levelName: string | null }[];
  }[];
};

const ICONS = { transport: Radio, clean: Sparkles, turn: Ear, stt: AudioLines, llm: Brain, tts: Volume2, frameworks: Layers };

export default function PipelineMap({ stops, band, openLabel }: { stops: Stop[]; band: Stop; openLabel: string }) {
  const all = [...stops, band];
  const [selected, setSelected] = useState(3); // speech-to-text: where most people start
  const picked = useRef(false);
  const rail = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = rail.current;
    const d = dot.current;
    if (!el || !d || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let tl: Timeline | undefined;
    const build = () => {
      tl?.revert();
      const wide = matchMedia('(min-width: 60rem)').matches;
      const n = stops.length;
      const pos = (i: number) => `${((i + 0.5) / n) * 100}%`;
      const prop = wide ? 'left' : 'top';
      d.style.left = wide ? pos(0) : '';
      d.style.top = wide ? '' : pos(0);
      tl = createTimeline({ loop: true, autoplay: false });
      stops.forEach((_, i) => {
        if (i > 0) tl!.add(d, { [prop]: pos(i), duration: 650, ease: 'inOutSine' });
        tl!.call(() => {
          if (!picked.current) setSelected(i);
          el.dataset.at = String(i);
        });
        tl!.add(d, { scale: [1, 1.6, 1], duration: 1500, ease: 'outQuad' });
      });
      // The reply travels back to the caller on the return rail.
      tl.add(d, { opacity: [1, 0], duration: 250 }).set(d, { [prop]: pos(0) }).add(d, { opacity: [0, 1], duration: 250 });
    };
    build();
    const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? tl?.play() : tl?.pause()), { threshold: 0.2 });
    io.observe(el);
    const mq = matchMedia('(min-width: 60rem)');
    const onChange = () => {
      build();
      tl?.play();
    };
    mq.addEventListener('change', onChange);
    return () => {
      io.disconnect();
      mq.removeEventListener('change', onChange);
      tl?.revert();
    };
  }, [stops]);

  const pick = (i: number) => {
    picked.current = true;
    setSelected(i);
  };
  const current = all[selected]!;

  return (
    <div className="pipe">
      <div className="pipe__rail" ref={rail}>
        <span className="pipe__wire" aria-hidden="true" />
        <span className="pipe__return" aria-hidden="true" />
        <span className="pipe__dot" ref={dot} aria-hidden="true" />
        <ol className="pipe__stops">
          {stops.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <li key={s.key}>
                <button type="button" className="pipe__stop" aria-pressed={selected === i} onClick={() => pick(i)}>
                  <span className="pipe__node">
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="pipe__label">
                    {s.sections.map((x) => (
                      <span key={x.num}>
                        <span className="pipe__num mono">{String(x.num).padStart(2, '0')}</span> {x.title}
                      </span>
                    ))}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      <button type="button" className="pipe__band" aria-pressed={selected === all.length - 1} onClick={() => pick(all.length - 1)}>
        <Layers size={16} strokeWidth={1.5} aria-hidden="true" />
        <span className="pipe__num mono">{String(band.sections[0]!.num).padStart(2, '0')}</span>
        {band.sections[0]!.title}
      </button>

      <div className="pipe__panel" aria-live="polite">
        {current.sections.map((s) => (
          <article key={s.num} className="pipe__detail">
            <header>
              <p className="pipe__kicker mono">{String(s.num).padStart(2, '0')}</p>
              <h3>{s.title}</h3>
              <p className="prose pipe__intro" dangerouslySetInnerHTML={{ __html: s.introHtml }} />
            </header>
            {s.picks.length > 0 && s.picksHeader && (
              <table className="picks">
                <thead>
                  <tr>
                    {s.picksHeader.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.picks.map((p) => (
                    <tr key={p.name}>
                      <td>{p.name}</td>
                      <td>{p.type}</td>
                      <td>{p.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {s.picks.length === 0 && (
              <ul className="pipe__top">
                {s.top.map((r) => (
                  <li key={r.url} data-resource data-section={s.num} data-level={r.level ?? undefined}>
                    <a href={r.url} rel="noopener" target="_blank">
                      {r.title}
                    </a>
                    <span className="pipe__meta">
                      {r.levelName && (
                        <span className="level" data-level={r.level}>
                          {r.levelName}
                        </span>
                      )}
                      <span className="mono">{r.domain}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <a className="pipe__open" href={s.href}>
              {openLabel} <span className="mono">· {s.countLabel}</span>
              <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
