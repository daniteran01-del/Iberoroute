import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 py-10 flex-1 w-full">
        <h1 className="font-display text-3xl font-semibold text-ink mb-2">
          Docs
        </h1>
        <p className="text-sm text-ink/60 mb-8">
          Project roadmap and technical notes for Iberoute.
        </p>

        <section className="mb-8">
          <h2 className="font-display text-lg font-semibold text-ink mb-2">
            What Iberoute does
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            Iberoute lets IBERO students post a ride to campus (origin,
            destination, time, seats) and lets classmates on the same route
            request to join, splitting the cost.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-lg font-semibold text-ink mb-2">
            Generative Core Agent — extraction method
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed mb-3">
            The /core page lets a student type a ride request in free text,
            the way they'd text a friend (e.g. "I need a ride to IBERO on
            Tuesdays around 8am from Coyoacán, can split gas"). That text is
            parsed by <code className="text-xs bg-ink/5 px-1 py-0.5 rounded">extractRideCore()</code> in{" "}
            <code className="text-xs bg-ink/5 px-1 py-0.5 rounded">lib/coreExtract.ts</code>.
          </p>
          <p className="text-sm text-ink/70 leading-relaxed mb-3">
            This extraction is <span className="font-medium text-ink">rule-based, not AI-powered</span> —
            it uses regular expressions and keyword matching, with no external
            API call. That's labeled directly in the app UI as "Simulated
            extraction — rule-based, no external AI API used" so it's never
            misleading about what it actually does.
          </p>
          <ul className="text-sm text-ink/70 space-y-2 list-disc list-inside mb-3">
            <li>
              <span className="font-medium text-ink">Destination:</span>{" "}
              defaults to "IBERO Campus" if the text mentions "ibero";
              otherwise it looks for a phrase after "to".
            </li>
            <li>
              <span className="font-medium text-ink">Origin:</span>{" "}
              looks for a phrase after "from".
            </li>
            <li>
              <span className="font-medium text-ink">Day:</span>{" "}
              matches against a fixed list of weekday names.
            </li>
            <li>
              <span className="font-medium text-ink">Time:</span>{" "}
              matches a simple time pattern (e.g. 8am, 8:00, 14:00).
            </li>
            <li>
              <span className="font-medium text-ink">Notes:</span>{" "}
              flags mentions of splitting cost or gas.
            </li>
          </ul>
          <p className="text-sm text-ink/70 leading-relaxed">
            The result is saved to the <code className="text-xs bg-ink/5 px-1 py-0.5 rounded">core_outputs</code> table
            in Supabase and shown in a "Recently saved" list on the same page.
            A known limitation: origin detection can fail when the input has
            unusual punctuation right after a place name (e.g. a comma with no
            space) — this was caught and fixed during Week 1 testing.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-lg font-semibold text-ink mb-2">
            Roadmap
          </h2>
          <ul className="text-sm text-ink/70 space-y-2 list-disc list-inside">
            <li>
              <span className="font-medium text-ink">Week 0 — Builder Infrastructure:</span>{" "}
              GitHub repo, Next.js + Tailwind app, Supabase project,
              deployment on Vercel, homepage/navbar/footer/docs page.
            </li>
            <li>
              <span className="font-medium text-ink">Week 1 — Generative Core Agent:</span>{" "}
              /core page with intake form, rule-based extraction, output
              card, and Supabase save (see above).
            </li>
            <li>
              <span className="font-medium text-ink">Next:</span>{" "}
              full ride CRUD connected to Supabase (post a ride, browse rides,
              join a ride).
            </li>
            <li>
              <span className="font-medium text-ink">Later:</span>{" "}
              filters by area/time, basic auth, in-app contact instead of
              raw contact info.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink mb-2">
            Tech stack
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            Next.js (App Router), Tailwind CSS, Supabase (Postgres), Vercel,
            GitHub.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

