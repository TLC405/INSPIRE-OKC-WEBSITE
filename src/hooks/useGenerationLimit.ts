import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getFingerprint } from '@/lib/fingerprint';

interface GenerationLimitStatus {
  allowed: boolean;
  remaining: number;
  dailyLimit: number;
  isTlcFriend: boolean;
  isAdmin: boolean;
  loading: boolean;
  fingerprint: string | null;
}

export function useGenerationLimit() {
  const [status, setStatus] = useState<GenerationLimitStatus>({
    allowed: false,
    remaining: 0,
    dailyLimit: 1,
    isTlcFriend: false,
    isAdmin: false,
    loading: true,
    fingerprint: null
  });

  useEffect(() => {
    checkLimit();
  }, []);

  const checkLimit = async () => {
    try {
      const fp = await getFingerprint();
      const fingerprintHash = fp.hash;

      // Check if user is admin
      const { data: { user } } = await supabase.auth.getUser();
      let isAdmin = false;
      let isTlcFriend = false;
      let dailyLimit = 1;

      if (user) {
        // Check admin role
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();
        
        isAdmin = !!roleData;

        // Check if TLC friend by email
        const { data: friendData } = await supabase
          .from('tlc_friends')
          .select('daily_limit')
          .eq('email', user.email)
          .maybeSingle();
        
        if (friendData) {
          isTlcFriend = true;
          dailyLimit = friendData.daily_limit || 10;
        }
      }

      // Admin has unlimited
      if (isAdmin) {
        setStatus({
          allowed: true,
          remaining: 999,
          dailyLimit: 999,
          isTlcFriend: false,
          isAdmin: true,
          loading: false,
          fingerprint: fingerprintHash
        });
        return;
      }

      // Check today's generation count for this fingerprint
      const today = new Date().toISOString().split('T')[0];
      const { data: limitData } = await supabase
        .from('generation_limits')
        .select('generation_count')
        .eq('fingerprint_hash', fingerprintHash)
        .eq('generation_date', today)
        .maybeSingle();

      const usedToday = limitData?.generation_count || 0;
      const remaining = Math.max(0, dailyLimit - usedToday);

      setStatus({
        allowed: remaining > 0,
        remaining,
        dailyLimit,
        isTlcFriend,
        isAdmin: false,
        loading: false,
        fingerprint: fingerprintHash
      });
    } catch (error) {
      console.error('Error checking generation limit:', error);
      setStatus(prev => ({ ...prev, loading: false, allowed: false }));
    }
  };

  const incrementUsage = async () => {
    if (!status.fingerprint) return;

    const today = new Date().toISOString().split('T')[0];
    
    // Upsert the generation count
    const { data: existing } = await supabase
      .from('generation_limits')
      .select('id, generation_count')
      .eq('fingerprint_hash', status.fingerprint)
      .eq('generation_date', today)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('generation_limits')
        .update({ generation_count: existing.generation_count + 1 })
        .eq('id', existing.id);
    } else {
      await supabase
        .from('generation_limits')
        .insert({
          fingerprint_hash: status.fingerprint,
          generation_date: today,
          generation_count: 1,
          is_tlc_friend: status.isTlcFriend
        });
    }

    // Refresh status
    await checkLimit();
  };

  return { ...status, incrementUsage, refresh: checkLimit };
}
