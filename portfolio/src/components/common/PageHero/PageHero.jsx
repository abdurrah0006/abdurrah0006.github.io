import { RevealHeading } from "../Motion/Motion";

// Opening block shared by every inner page: index row, huge title, lead text,
// an optional key/value strip and an actions row (passed as children).
function PageHero({ index, label, note, title, kicker, lead, meta = [], children }) {
  return (
    <section className="ui-hero" data-reveal-skip>
      <div className="container">
        <div className="ui-hero-top">
          <span className="ui-label">
            {index} / {label}
          </span>
          {note ? <span className="ui-label">{note}</span> : null}
        </div>

        <RevealHeading as="h1" className="ui-hero-title" text={title} />

        <div className="ui-hero-foot">
          <div>
            {kicker ? <p className="ui-kicker">{kicker}</p> : null}
            {lead ? <p className="ui-lead">{lead}</p> : null}
            {children ? <div className="ui-actions">{children}</div> : null}
          </div>

          {meta.length ? (
            <dl className="ui-meta">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default PageHero;
