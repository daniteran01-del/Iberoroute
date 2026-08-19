"use client";

import { useState } from "react";

type Props = {
  onAdd: (data: {
    driver_name: string;
    origin: string;
    destination: string;
    departure_time: string;
    seats_total: number;
    contact: string;
  }) => void;
};

export default function PostRideForm({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [driverName, setDriverName] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("IBERO Campus");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState(2);
  const [contact, setContact] = useState("");

  const canSubmit = driverName && origin && destination && time && contact;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onAdd({
      driver_name: driverName,
      origin,
      destination,
      departure_time: time,
      seats_total: seats,
      contact,
    });
    setDriverName("");
    setOrigin("");
    setTime("");
    setContact("");
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-md border border-dashed border-line py-4 text-sm font-medium text-ink/60 hover:border-accent hover:text-accent transition-colors"
      >
        + Post a ride
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md border border-line bg-panel p-5 space-y-3"
    >
      <div className="grid grid-cols-2 gap-3">
        <input
          autoFocus
          placeholder="Your name"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
          className="rounded-sm border border-line px-3 py-2 text-sm focus:border-accent"
        />
        <input
          placeholder="Contact (WhatsApp/email)"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="rounded-sm border border-line px-3 py-2 text-sm focus:border-accent"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          placeholder="Origin (e.g. Coyoacán)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="rounded-sm border border-line px-3 py-2 text-sm focus:border-accent"
        />
        <input
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="rounded-sm border border-line px-3 py-2 text-sm focus:border-accent"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="rounded-sm border border-line px-3 py-2 text-sm focus:border-accent"
        />
        <input
          type="number"
          min={1}
          max={6}
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="rounded-sm border border-line px-3 py-2 text-sm focus:border-accent"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-3 py-1.5 text-sm text-ink/60 hover:text-ink"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!canSubmit}
          className="px-4 py-1.5 rounded-sm bg-ink text-paper text-sm font-medium disabled:opacity-40"
        >
          Post
        </button>
      </div>
    </form>
  );
}
