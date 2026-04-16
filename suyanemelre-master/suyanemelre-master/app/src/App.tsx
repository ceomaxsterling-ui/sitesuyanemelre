import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Sobre } from './pages/Sobre';
import { Consultoria } from './pages/Consultoria';
import { Blog } from './pages/Blog';
import { Post } from './pages/Post';
import { Servico } from './pages/Servico';
import { Case } from './pages/Case';
import { Diagnostico } from './pages/Diagnostico';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow"> {/* mobile pb removed — bottom nav replaced by top hamburger */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/consultoria" element={<Consultoria />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/post" element={<Post />} />
            <Route path="/servico/:id" element={<Servico />} />
            <Route path="/case/:id" element={<Case />} />
            <Route path="/diagnostico" element={<Diagnostico />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
