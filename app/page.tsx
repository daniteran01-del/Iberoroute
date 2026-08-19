"use client";

import { useEffect, useState } from "react";
import { supabase, Ride } from "@/lib/supabase";
import RideCard from "@/components/RideCard";
import PostRideForm from "@/components/PostRideForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RidesPage() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRides();
  }, []);

  async function loadRides() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("rides")
      .select("*")
      .order("departure_time");

    if (error) setError(error.message);
    setRides(data ?? []);
    setLoading(false);
  }

  async function handleAdd(input: {
    driver_name: string;
    origin: string;
    destination: string;
    departure_time: string;
    seats_total: number;
    contact: string;
  }) {
    const { data, error } = await supabase
      .from("rides")
      .insert({ ...input, seats_taken: 0 })
      .select()
      .single();

    if (error) {
      setError(error.message);
      return;
    }
    setRides((prev) =>
      [...prev, data].sort((a, b) =>
        a.departure_time.localeCompare(b.departure_time)
      )
    );
  }

  async function handleJoin(id: string) {
    const ride = rides.find((r) => r.id === id);
    if (!ride) return;

    const nextTaken = ride.seats_taken + 1;
    setRides((prev) =>
      prev.map((r) => (r.id === id ? { ...r, seats_taken: nextTaken } : r))
    );

    const { error } = await supabase
      .from("rides")
      .update({ seats_taken: nextTaken })
      .eq("id", id);
    if (error) setError(error.message);
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 pt-8">
        <h1 className="font-display text-3xl font-semibold text-ink">
          Rides to campus
        </h1>
        <p className="text-sm text-ink/60 mt-1">
          Share your ride to campus, split the cost.
        </p>
      </div>

      <main className="max-w-2xl mx-auto px-6 py-8 flex-1 w-full">
        {error && (
          <div className="mb-6 rounded-sm border border-full/30 bg-full/5 px-4 py-3 text-sm text-full">
            {error}
          </div>
        )}

        <div className="mb-6">
          <PostRideForm onAdd={handleAdd} />
        </div>

        {loading ? (
          <p className="text-sm text-ink/50">Loading rides…</p>
        ) : rides.length === 0 ? (
          <p className="text-sm text-ink/50">
            No rides posted yet. Be the first to post one above.
          </p>
        ) : (
          <div className="space-y-3">
            {rides.map((ride) => (
              <RideCard key={ride.id} ride={ride} onJoin={handleJoin} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
