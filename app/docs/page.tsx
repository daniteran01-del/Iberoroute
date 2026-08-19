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
            Roadmap
          </h2>
          <ul className="text-sm text-ink/70 space-y-2 list-disc list-inside">
            <li>
              <span className="font-medium text-ink">Week 0 — Builder Infrastructure:</span>{" "}
              GitHub repo, Next.js + Tailwind app, Supabase project,
              deployment on Vercel, homepage/navbar/footer/docs page.
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
