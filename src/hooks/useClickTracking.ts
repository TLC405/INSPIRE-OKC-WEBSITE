import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useClickTracking(sessionId: string | null) {
  const trackClick = useCallback(async (event: MouseEvent) => {
    if (!sessionId) return;

    const target = event.target as HTMLElement;
    const elementClicked = target.tagName + 
      (target.id ? `#${target.id}` : '') + 
      (target.className ? `.${target.className.split(' ')[0]}` : '');

    try {
      await supabase.from('events').insert({
        session_id: sessionId,
        event_type: 'CLICK',
        event_data: {
          x: event.clientX,
          y: event.clientY,
          element: elementClicked,
          text: target.textContent?.substring(0, 50)
        },
        click_x: event.clientX,
        click_y: event.clientY,
        element_clicked: elementClicked,
        page_url: window.location.pathname
      });
    } catch (error) {
      // Silent fail for tracking
    }
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) return;

    // Only track clicks on buttons and interactive elements
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isInteractive = target.closest('button, a, [role="button"], input, select');
      if (isInteractive) {
        trackClick(event);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [sessionId, trackClick]);
}
