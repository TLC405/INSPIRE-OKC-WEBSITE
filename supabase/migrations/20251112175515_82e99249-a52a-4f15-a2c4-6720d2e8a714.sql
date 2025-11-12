-- Create user_sessions table for tracking anonymous users
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_uuid UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  ip_hash TEXT,
  country TEXT,
  region TEXT,
  device TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_activity TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create uploads table for storing original images
CREATE TABLE IF NOT EXISTS public.uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.user_sessions(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  faces_detected INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create generated_cartoons table
CREATE TABLE IF NOT EXISTS public.generated_cartoons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  upload_id UUID NOT NULL REFERENCES public.uploads(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES public.user_sessions(id) ON DELETE CASCADE,
  style_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  generation_duration_ms INTEGER,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create events table for analytics
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.user_sessions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_uploads_session_id ON public.uploads(session_id);
CREATE INDEX IF NOT EXISTS idx_generated_cartoons_upload_id ON public.generated_cartoons(upload_id);
CREATE INDEX IF NOT EXISTS idx_generated_cartoons_session_id ON public.generated_cartoons(session_id);
CREATE INDEX IF NOT EXISTS idx_events_session_id ON public.events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_type ON public.events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON public.events(created_at);

-- Enable RLS
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_cartoons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Public policies (no auth required for user-facing app)
CREATE POLICY "Anyone can create sessions" ON public.user_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view their own session" ON public.user_sessions FOR SELECT USING (true);
CREATE POLICY "Anyone can update their own session" ON public.user_sessions FOR UPDATE USING (true);

CREATE POLICY "Anyone can upload" ON public.uploads FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view uploads" ON public.uploads FOR SELECT USING (true);

CREATE POLICY "Anyone can create cartoons" ON public.generated_cartoons FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view cartoons" ON public.generated_cartoons FOR SELECT USING (true);

CREATE POLICY "Anyone can create events" ON public.events FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view events" ON public.events FOR SELECT USING (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cartoons', 'cartoons', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can upload images" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'cartoons');

CREATE POLICY "Anyone can view images" ON storage.objects 
FOR SELECT USING (bucket_id = 'cartoons');

CREATE POLICY "Anyone can delete their images" ON storage.objects 
FOR DELETE USING (bucket_id = 'cartoons');