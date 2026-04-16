import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Consultoria from "./pages/Consultoria";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
import Servico from "./pages/Servico";
import Case from "./pages/Case";
import NotFound from "./pages/NotFound";
import { ExportLeads } from "./pages/ExportLeads";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/consultoria" element={<Consultoria />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/post" element={<Post />} />
              <Route path="/servico/:id" element={<Servico />} />
              <Route path="/case/:id" element={<Case />} />
              <Route path="/export-leads" element={<ExportLeads />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
