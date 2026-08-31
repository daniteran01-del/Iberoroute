"use client";

import { CoreExtraction } from "@/lib/coreExtract";

type Props = {
  data: CoreExtraction;
  onSave?: () => void;
  saved?: boolean;
  savedAt?: string;
};

export default function CoreOutputCard({ data, onSave, saved, savedAt }: Props) {
  return (
    <div className="rounded-md border border-line bg-panel p-5">
      <p className="text-xs font-mono text-accent2 mb-3">
        Simulated extraction — rule-based, no external AI API used.
      </p>

      <dl className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div>
          <dt className="text-ink/50 text-xs uppercase">Origin</dt>
          <dd className="text-ink font-medium">{data.origin}</dd>
        </div>
        <div>
          <dt className="text-ink/50 text-xs uppercase">Destination</dt>
          <dd className="text-ink font-medium">{data.destination}</dd>
        </div>
        <div>
          <dt className="text-ink/50 text-xs uppercase">Day</dt>
          <dd className="text-ink font-medium">{data.day}</dd>
        </div>
        <div>
          <dt className="text-ink/50 text-xs uppercase">Time</dt>
          <dd className="text-ink font-medium">{data.time}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-ink/50 text-xs uppercase">Notes</dt>
          <dd className="text-ink font-medium">{data.notes}</dd>
        </div>
      </dl>

      {onSave && !saved && (
        <button
          onClick={onSave}
          className="px-4 py-1.5 rounded-sm bg-ink text-paper text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Save
        </button>
      )}
      {saved && (
        <p className="text-xs text-accent">
          Saved{savedAt ? ` at ${savedAt}` : ""}.
        </p>
      )}
    </div>
  );
}
