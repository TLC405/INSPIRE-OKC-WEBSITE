-- Add new columns to user_sessions for enhanced tracking
ALTER TABLE public.user_sessions 
ADD COLUMN IF NOT EXISTS fingerprint_hash text,
ADD COLUMN IF NOT EXISTS latitude numeric,
ADD COLUMN IF NOT EXISTS longitude numeric,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS screen_resolution text,
ADD COLUMN IF NOT EXISTS timezone text,
ADD COLUMN IF NOT EXISTS language text,
ADD COLUMN IF NOT EXISTS platform text,
ADD COLUMN IF NOT EXISTS is_tlc_friend boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- Add new columns to events for click tracking
ALTER TABLE public.events
ADD COLUMN IF NOT EXISTS click_x integer,
ADD COLUMN IF NOT EXISTS click_y integer,
ADD COLUMN IF NOT EXISTS element_clicked text,
ADD COLUMN IF NOT EXISTS page_url text;

-- Create TLC friends whitelist table
CREATE TABLE IF NOT EXISTS public.tlc_friends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  added_by uuid REFERENCES auth.users(id),
  daily_limit integer DEFAULT 10,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.tlc_friends ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage TLC friends"
ON public.tlc_friends
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can check if email is friend"
ON public.tlc_friends
FOR SELECT
USING (true);

-- Create generation limits tracking table
CREATE TABLE IF NOT EXISTS public.generation_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fingerprint_hash text NOT NULL,
  generation_date date NOT NULL DEFAULT CURRENT_DATE,
  generation_count integer DEFAULT 1,
  is_tlc_friend boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(fingerprint_hash, generation_date)
);

ALTER TABLE public.generation_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view generation limits"
ON public.generation_limits
FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert generation limits"
ON public.generation_limits
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update generation limits"
ON public.generation_limits
FOR UPDATE
USING (true);

-- Create device fingerprints table for tracking
CREATE TABLE IF NOT EXISTS public.device_fingerprints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fingerprint_hash text UNIQUE NOT NULL,
  session_id uuid REFERENCES public.user_sessions(id),
  user_agent text,
  platform text,
  screen_resolution text,
  timezone text,
  language text,
  first_seen_at timestamptz DEFAULT now(),
  last_seen_at timestamptz DEFAULT now(),
  total_generations integer DEFAULT 0
);

ALTER TABLE public.device_fingerprints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view fingerprints"
ON public.device_fingerprints
FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert fingerprints"
ON public.device_fingerprints
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update fingerprints"
ON public.device_fingerprints
FOR UPDATE
USING (true);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_generation_limits_fingerprint_date 
ON public.generation_limits(fingerprint_hash, generation_date);

CREATE INDEX IF NOT EXISTS idx_device_fingerprints_hash 
ON public.device_fingerprints(fingerprint_hash);

CREATE INDEX IF NOT EXISTS idx_user_sessions_fingerprint 
ON public.user_sessions(fingerprint_hash);

CREATE INDEX IF NOT EXISTS idx_tlc_friends_email 
ON public.tlc_friends(email);