// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gzwdnjmgcokkagxahazu.supabase.co';// Reemplaza con tu URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6d2Ruam1nY29ra2FneGFoYXp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzOTAzMjksImV4cCI6MjA2NTk2NjMyOX0.cBquM9aRw_XyBKBsTEvpH6Ka_Bf0C64BgmIB6tNOOec';// Reemplaza con tu public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
