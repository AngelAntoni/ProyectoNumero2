import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://gjikiqpyffcaembdroon.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaWtpcXB5ZmZjYWVtYmRyb29uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxODUyODcsImV4cCI6MjA1Mzc2MTI4N30.SrMfxEtvKkPEQKuKRnhTHJ6GqPOpTfmUwjkE5hA-8RQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);