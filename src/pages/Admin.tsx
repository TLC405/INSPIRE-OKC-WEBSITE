import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Users, 
  Image, 
  Activity, 
  Settings, 
  UserPlus, 
  Trash2,
  RefreshCw,
  Shield,
  Fingerprint,
  MapPin
} from "lucide-react";

interface Session {
  id: string;
  session_uuid: string;
  created_at: string;
  last_activity: string;
  fingerprint_hash: string | null;
  device: string | null;
  country: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  platform: string | null;
  is_tlc_friend: boolean;
  is_admin: boolean;
}

interface TlcFriend {
  id: string;
  email: string;
  name: string | null;
  daily_limit: number;
  created_at: string;
}

interface Generation {
  id: string;
  session_id: string;
  style_id: string;
  image_url: string;
  success: boolean;
  generation_duration_ms: number | null;
  created_at: string;
}

interface Stats {
  totalSessions: number;
  totalGenerations: number;
  generationsToday: number;
  uniqueDevices: number;
  tlcFriends: number;
}

const Admin = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [sessions, setSessions] = useState<Session[]>([]);
  const [friends, setFriends] = useState<TlcFriend[]>([]);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalSessions: 0,
    totalGenerations: 0,
    generationsToday: 0,
    uniqueDevices: 0,
    tlcFriends: 0
  });
  const [loading, setLoading] = useState(true);
  const [newFriendEmail, setNewFriendEmail] = useState("");
  const [newFriendName, setNewFriendName] = useState("");

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      toast.error("Access denied. Admin only.");
      navigate("/");
    }
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load sessions
      const { data: sessionsData } = await supabase
        .from('user_sessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      setSessions(sessionsData || []);

      // Load TLC friends
      const { data: friendsData } = await supabase
        .from('tlc_friends')
        .select('*')
        .order('created_at', { ascending: false });
      setFriends(friendsData || []);

      // Load generations
      const { data: generationsData } = await supabase
        .from('generated_cartoons')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      setGenerations(generationsData || []);

      // Calculate stats
      const today = new Date().toISOString().split('T')[0];
      const generationsToday = generationsData?.filter(g => 
        g.created_at.startsWith(today)
      ).length || 0;

      const uniqueFingerprints = new Set(
        sessionsData?.map(s => s.fingerprint_hash).filter(Boolean)
      );

      setStats({
        totalSessions: sessionsData?.length || 0,
        totalGenerations: generationsData?.length || 0,
        generationsToday,
        uniqueDevices: uniqueFingerprints.size,
        tlcFriends: friendsData?.length || 0
      });
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load data');
    }
    setLoading(false);
  };

  const addFriend = async () => {
    if (!newFriendEmail.trim()) {
      toast.error('Please enter an email');
      return;
    }

    try {
      const { error } = await supabase
        .from('tlc_friends')
        .insert({
          email: newFriendEmail.toLowerCase().trim(),
          name: newFriendName.trim() || null,
          added_by: user?.id
        });

      if (error) throw error;

      toast.success(`Added ${newFriendEmail} to TLC Friends`);
      setNewFriendEmail("");
      setNewFriendName("");
      loadData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to add friend');
    }
  };

  const removeFriend = async (id: string, email: string) => {
    if (!confirm(`Remove ${email} from TLC Friends?`)) return;

    try {
      const { error } = await supabase
        .from('tlc_friends')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success(`Removed ${email}`);
      loadData();
    } catch (error) {
      toast.error('Failed to remove friend');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">TeeFeeMe-5000 Admin</h1>
              <p className="text-muted-foreground">Control Tower</p>
            </div>
          </div>
          <Button onClick={loadData} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-2xl font-bold">{stats.totalSessions}</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Sessions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Image className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold">{stats.totalGenerations}</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Generations</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-yellow-500" />
                <span className="text-2xl font-bold">{stats.generationsToday}</span>
              </div>
              <p className="text-sm text-muted-foreground">Today</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-purple-500" />
                <span className="text-2xl font-bold">{stats.uniqueDevices}</span>
              </div>
              <p className="text-sm text-muted-foreground">Unique Devices</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-pink-500" />
                <span className="text-2xl font-bold">{stats.tlcFriends}</span>
              </div>
              <p className="text-sm text-muted-foreground">TLC Friends</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="friends" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="friends" className="gap-2">
              <UserPlus className="w-4 h-4" />
              TLC Friends
            </TabsTrigger>
            <TabsTrigger value="sessions" className="gap-2">
              <Users className="w-4 h-4" />
              Sessions
            </TabsTrigger>
            <TabsTrigger value="generations" className="gap-2">
              <Image className="w-4 h-4" />
              Generations
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* TLC Friends Tab */}
          <TabsContent value="friends">
            <Card>
              <CardHeader>
                <CardTitle>TLC Friends Whitelist</CardTitle>
                <CardDescription>Friends get 10 generations/day (public gets 1/day)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Friend Form */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Email address"
                    value={newFriendEmail}
                    onChange={(e) => setNewFriendEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Name (optional)"
                    value={newFriendName}
                    onChange={(e) => setNewFriendName(e.target.value)}
                    className="w-40"
                  />
                  <Button onClick={addFriend} className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    Add
                  </Button>
                </div>

                {/* Friends List */}
                <div className="space-y-2">
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{friend.email}</p>
                        {friend.name && <p className="text-sm text-muted-foreground">{friend.name}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{friend.daily_limit}/day</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFriend(friend.id, friend.email)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {friends.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No TLC friends yet. Add some above!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle>User Sessions</CardTitle>
                <CardDescription>All tracked sessions with device fingerprints and locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {sessions.map((session) => (
                    <div key={session.id} className="p-3 bg-muted/50 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Fingerprint className="w-4 h-4 text-muted-foreground" />
                          <code className="text-xs">{session.fingerprint_hash || 'No fingerprint'}</code>
                        </div>
                        <div className="flex gap-1">
                          {session.is_admin && <Badge variant="destructive">Admin</Badge>}
                          {session.is_tlc_friend && <Badge variant="secondary">TLC Friend</Badge>}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Device:</span>
                          <span className="ml-1">{session.device || session.platform || 'Unknown'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span>{session.city || session.country || 'Unknown'}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Created:</span>
                          <span className="ml-1">{new Date(session.created_at).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last:</span>
                          <span className="ml-1">{new Date(session.last_activity).toLocaleTimeString()}</span>
                        </div>
                      </div>
                      {session.latitude && session.longitude && (
                        <div className="text-xs text-muted-foreground">
                          📍 {session.latitude.toFixed(4)}, {session.longitude.toFixed(4)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Generations Tab */}
          <TabsContent value="generations">
            <Card>
              <CardHeader>
                <CardTitle>Generation History</CardTitle>
                <CardDescription>All cartoon generations with details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
                  {generations.map((gen) => (
                    <div key={gen.id} className="space-y-2">
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                        {gen.image_url.startsWith('data:') ? (
                          <img src={gen.image_url} alt="Generated" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Image className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                      <div className="text-sm">
                        <Badge variant={gen.success ? "default" : "destructive"} className="mb-1">
                          {gen.style_id}
                        </Badge>
                        <p className="text-muted-foreground text-xs">
                          {gen.generation_duration_ms ? `${(gen.generation_duration_ms / 1000).toFixed(1)}s` : ''} • 
                          {new Date(gen.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>Configure TeeFeeMe-5000</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">Default Limits</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Public users: 1 generation/day</li>
                    <li>• TLC Friends: 10 generations/day</li>
                    <li>• Admins: Unlimited</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">Your Status</h3>
                  <div className="flex gap-2">
                    <Badge variant="destructive">Admin</Badge>
                    <Badge variant="outline">Unlimited Generations</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
