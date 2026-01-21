-- ===========================================
-- FIX: Analytics and User Data Tables Exposure
-- Drop public SELECT/UPDATE policies and add admin-only access
-- ===========================================

-- ========================
-- user_sessions table
-- ========================
-- Drop overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view their own session" ON public.user_sessions;

-- Drop overly permissive UPDATE policy
DROP POLICY IF EXISTS "Anyone can update their own session" ON public.user_sessions;

-- Add admin-only SELECT policy
CREATE POLICY "Admins can view sessions" ON public.user_sessions
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Add admin-only UPDATE policy (edge functions use service role)
CREATE POLICY "Admins can update sessions" ON public.user_sessions
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- ========================
-- events table
-- ========================
-- Drop overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view events" ON public.events;

-- Add admin-only SELECT policy
CREATE POLICY "Admins can view events" ON public.events
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- ========================
-- device_fingerprints table
-- ========================
-- Drop overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view fingerprints" ON public.device_fingerprints;

-- Drop overly permissive UPDATE policy
DROP POLICY IF EXISTS "Anyone can update fingerprints" ON public.device_fingerprints;

-- Add admin-only SELECT policy
CREATE POLICY "Admins can view fingerprints" ON public.device_fingerprints
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Add admin-only UPDATE policy (edge functions use service role)
CREATE POLICY "Admins can update fingerprints" ON public.device_fingerprints
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- ========================
-- generation_limits table
-- ========================
-- Drop overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view generation limits" ON public.generation_limits;

-- Drop overly permissive UPDATE policy
DROP POLICY IF EXISTS "Anyone can update generation limits" ON public.generation_limits;

-- Add admin-only SELECT policy
CREATE POLICY "Admins can view generation limits" ON public.generation_limits
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Add admin-only UPDATE policy (edge functions use service role)
CREATE POLICY "Admins can update generation limits" ON public.generation_limits
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- ========================
-- uploads table
-- ========================
-- Drop overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view uploads" ON public.uploads;

-- Add admin-only SELECT policy
CREATE POLICY "Admins can view uploads" ON public.uploads
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- ========================
-- generated_cartoons table
-- ========================
-- Drop overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view cartoons" ON public.generated_cartoons;

-- Add admin-only SELECT policy
CREATE POLICY "Admins can view cartoons" ON public.generated_cartoons
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));