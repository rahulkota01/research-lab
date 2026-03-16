import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import IngredientLibrary from './pages/IngredientLibrary';
import LabBench from './pages/LabBench';
import SimulationResults from './pages/SimulationResults';
import ResearchNotebook from './pages/ResearchNotebook';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import Company from './pages/Company';
import Platform from './pages/Platform';
import Solutions from './pages/Solutions';
import Resources from './pages/Resources';
import AboutUs from './pages/about/AboutUs';
import Team from './pages/about/Team';
import Careers from './pages/about/Careers';
import Investors from './pages/about/Investors';
import Press from './pages/about/Press';

// App Layout wrapper for portal routes
function AppLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/company" element={<Company />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/team" element={<Team />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/carrers" element={<Navigate to="/careers" replace />} />
        <Route path="/investors" element={<Investors />} />
        <Route path="/press-releases" element={<Press />} />

        {/* App/Portal Routes */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="library" element={<IngredientLibrary />} />
          <Route path="bench" element={<LabBench />} />
          <Route path="results" element={<SimulationResults />} />
          <Route path="notebook" element={<ResearchNotebook />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Redirect old routes to new app routes */}
        <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="/library" element={<Navigate to="/app/library" replace />} />
        <Route path="/bench" element={<Navigate to="/app/bench" replace />} />
        <Route path="/results" element={<Navigate to="/app/results" replace />} />
        <Route path="/notebook" element={<Navigate to="/app/notebook" replace />} />
        <Route path="/settings" element={<Navigate to="/app/settings" replace />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
