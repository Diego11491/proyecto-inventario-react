// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dwvukgtkghpsdlqtwjwe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3dnVrZ3RrZ2hwc2RscXR3andlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjEyNjEsImV4cCI6MjA2MTQzNzI2MX0._fThWYwtmGi8qMltPWi2KZ_I7c6FBKw_817VI0rKgvo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);