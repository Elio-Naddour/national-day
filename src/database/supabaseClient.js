import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =  'https://nrkaiwykghpppwkbpyml.supabase.co'
const SUPABASE_ANON_KEY =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ya2Fpd3lrZ2hwcHB3a2JweW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NDUyMDgsImV4cCI6MjA3MjIyMTIwOH0.RFWF6I9PJvt9pva3_tUmaqdMP2ZxTdS88hX-3_S8LYA'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
