import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oentoxhgeswjbfltssry.supabase.co';
const supabaseAnonKey = 'sb_publishable_Smqtg9OPesDPTPeyCdao_Q_CpFFqsW_';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
