-- Create community applications table
CREATE TABLE public.community_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  why_join TEXT NOT NULL,
  channel_interest TEXT[] DEFAULT '{}',
  referral_name TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create unique constraint on email
CREATE UNIQUE INDEX community_applications_email_idx ON public.community_applications(email);

-- Create community members table
CREATE TABLE public.community_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  application_id UUID REFERENCES public.community_applications(id),
  channels_access TEXT[] DEFAULT '{"inspire"}',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  UNIQUE(user_id)
);

-- Create posts table for story chapters and blog posts
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT DEFAULT 'blog', -- story, blog, announcement
  chapter_number INTEGER,
  has_content_warning BOOLEAN DEFAULT false,
  content_warning_text TEXT,
  is_published BOOLEAN DEFAULT true,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create podcast episodes table
CREATE TABLE public.podcast_episodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT,
  duration_seconds INTEGER,
  episode_number INTEGER,
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create app gallery table
CREATE TABLE public.app_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  app_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create slide decks table
CREATE TABLE public.slide_decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create community events table
CREATE TABLE public.community_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  channel TEXT DEFAULT 'inspire',
  is_members_only BOOLEAN DEFAULT false,
  max_attendees INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.community_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.podcast_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slide_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for community_applications
CREATE POLICY "Anyone can submit applications" ON public.community_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own application" ON public.community_applications
  FOR SELECT USING (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Admins can view all applications" ON public.community_applications
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update applications" ON public.community_applications
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for community_members
CREATE POLICY "Members can view their own membership" ON public.community_members
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage members" ON public.community_members
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for public content (posts, podcasts, apps, slides)
CREATE POLICY "Anyone can view published posts" ON public.posts
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage posts" ON public.posts
  FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view published episodes" ON public.podcast_episodes
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage episodes" ON public.podcast_episodes
  FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view apps" ON public.app_gallery
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage apps" ON public.app_gallery
  FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view published slides" ON public.slide_decks
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage slides" ON public.slide_decks
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for community_events
CREATE POLICY "Anyone can view public events" ON public.community_events
  FOR SELECT USING (is_members_only = false);

CREATE POLICY "Members can view members-only events" ON public.community_events
  FOR SELECT USING (
    is_members_only = true 
    AND EXISTS (
      SELECT 1 FROM public.community_members 
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Admins can manage events" ON public.community_events
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Insert initial app gallery entry for TeeFeeMe
INSERT INTO public.app_gallery (name, description, app_url, is_featured, display_order)
VALUES ('TeeFeeMe-5000', 'Transform your photos into stunning cartoon art with 30+ styles', '/cartoonizer', true, 1);