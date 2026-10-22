import { PageHeader } from "./PageHeader";

export function LegalPage({ title, sections }: { title: string; sections: [string, string][] }) {
  return (
    <>
      <PageHeader title={title} />
      <article className="mx-auto max-w-3xl space-y-6 px-4 py-14">
        <p className="rounded-xl border border-dashed border-earth/50 bg-muted p-4 text-sm text-muted-foreground">
          Bu metin bir taslaktır. [Köşeli parantez] içindeki alanlar işletme bilgileriyle doldurulmalı ve yayın öncesinde bir hukuk danışmanı tarafından gözden geçirilmelidir.
        </p>
        {sections.map(([h, t]) => (
          <section key={h}>
            <h2 className="text-2xl text-primary">{h}</h2>
            <p className="mt-2 text-muted-foreground">{t}</p>
          </section>
        ))}
      </article>
    </>
  );
}
