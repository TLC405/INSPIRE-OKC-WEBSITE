import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Apply from "./pages/Apply";
import Story from "./pages/Story";
import Podcast from "./pages/Podcast";
import Apps from "./pages/Apps";
import Slides from "./pages/Slides";
import Community from "./pages/Community";
import Adulting from "./pages/Adulting";
import Singles from "./pages/Singles";
import Workout from "./pages/Workout";
import SelfMastery from "./pages/SelfMastery";
import Cartoonizer from "./pages/Cartoonizer";
import Admin from "./pages/Admin";
import Info from "./pages/Info";
import NotFound from "./pages/NotFound";
import { AdminRoute } from "./components/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/story" element={<Story />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/slides" element={<Slides />} />
          <Route path="/community" element={<Community />} />
          <Route path="/adulting" element={<Adulting />} />
          <Route path="/singles" element={<Singles />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/self-mastery" element={<SelfMastery />} />
          <Route path="/cartoonizer" element={<Cartoonizer />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
