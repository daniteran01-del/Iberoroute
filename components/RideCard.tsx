"use client";

import { Ride } from "@/lib/supabase";

type Props = {
  ride: Ride;
  onJoin: (id: string) => void;
};

export default function RideCard({ ride, onJoin }: Props) {
  const seatsLeft = ride.seats_total - ride.seats_taken;
  const full = seatsLeft <= 0;

  const time = new Date(ride.departure_time).toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded-md border border-line bg-panel p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            {ride.origin} <span className="text-ink/40">→</span> {ride.destination}
          </p>
          <p className="text-sm text-ink/60 mt-0.5">{time}</p>
        </div>
        <span
          className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${
            full
              ? "bg-full/10 text-full"
              : "bg-accent/10 text-accent"
          }`}
        >
          {full ? "Full" : `${seatsLeft} seat${seatsLeft === 1 ? "" : "s"} left`}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <p className="text-ink/70">
          Driver: <span className="font-medium text-ink">{ride.driver_name}</span>
        </p>
        <button
          onClick={() => onJoin(ride.id)}
          disabled={full}
          className="px-4 py-1.5 rounded-sm bg-ink text-paper text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          Join ride
        </button>
      </div>
    </div>
  );
}
