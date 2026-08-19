import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Ride = {
  id: string;
  driver_name: string;
  origin: string;
  destination: string;
  departure_time: string; // ISO datetime
  seats_total: number;
  seats_taken: number;
  contact: string;
  created_at: string;
};
