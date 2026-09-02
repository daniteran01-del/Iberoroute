"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { extractRideCore, CoreExtraction } from "@/lib/coreExtract";
import CoreOutputCard from "@/components/CoreOutputCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type CoreOutputRow = {
  id: string;
  input_text: string;
  origin: string;
  destination: string;
  day: string;
  time: string;
  notes: string;
  created_at: string;
};

export default function CorePage() {
  const [inputText, setInputText] = useState("");
  const [extraction, setExtraction] = useState<CoreExtraction | null>(null);
  const [saved, setSaved] = useState(false);
  const [recent, setRecent] = useState<CoreOutputRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecent();
  }, []);

  async function loadRecent() {
    const { data, error } = await supabase
      .from("core_outputs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);
    if (error) setError(error.message);
    setRecent(data ?? []);
  }

  function handleExtract() {
    if (!inputText.trim()) return;
    setExtraction(extractRideCore(inputText));
    setSaved(false);
  }

  async function handleSave() {
    if (!extraction) return;
    const { error } = await supabase.from("core_outputs").insert({
      input_text: inputText,
      origin: extraction.origin,
      destination: extraction.destination,
      day: extraction.day,
      time: extraction.time,
      notes: extraction.notes,
    });
    if (error) {
      setError(error.message);
      return;
    }
    setSaved(true);
    loadRecent();
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 py-10 flex-1 w-full">
        <h1 className="font-display text-3xl font-semibold text-ink mb-2">
          Generative Core Agent
        </h1>
        <p className="text-sm text-ink/60 mb-8">
          Type a ride request the way you&apos;d text a friend. We&apos;ll pull out the
          structured details.
        </p>

        {error && (
          <div className="mb-6 rounded-sm border border-full/30 bg-full/5 px-4 py-3 text-sm text-full">
            {error}
          </div>
        )}

        <div className="mb-6">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='e.g. "I need a ride to IBERO on Tuesdays around 8am from Coyoacán, can split gas"'
            rows={4}
            className="w-full rounded-sm border border-line px-3 py-2 text-sm focus:border-accent"
          />
          <button
            onClick={handleExtract}
            className="mt-3 px-4 py-1.5 rounded-sm bg-ink text-paper text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Extract
          </button>
        </div>

        {extraction && (
          <div className="mb-8">
            <CoreOutputCard
              data={extraction}
              onSave={handleSave}
              saved={saved}
            />
          </div>
        )}

        <section>
          <h2 className="font-display text-lg font-semibold text-ink mb-3">
            Recently saved
          </h2>
          {recent.length === 0 ? (
            <p className="text-sm text-ink/50">
              Nothing saved yet. Extract and save one above.
            </p>
          ) : (
            <div className="space-y-2">
              {recent.map((row) => (
                <div
                  key={row.id}
                  className="rounded-sm border border-line bg-panel px-4 py-3 text-sm"
                >
                  <p className="text-ink font-medium">
                    {row.origin} → {row.destination}
                  </p>
                  <p className="text-ink/60 text-xs">
                    {row.day} · {row.time}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
