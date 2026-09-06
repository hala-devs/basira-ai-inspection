import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Inspections from './pages/Inspections'
import NewInspection from './pages/NewInspection'
import Documentation from './pages/Documentation'
import ReportPage from './pages/Report'
import Assets from './pages/Assets'
import AssetDetails from './pages/AssetDetails'
import Analytics from './pages/Analytics'
import ReviewerDashboard from './pages/ReviewerDashboard'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'
import Help from './pages/Help'
import Reports from './pages/Reports'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inspections" element={<Inspections />} />
        <Route path="/inspections/new" element={<NewInspection />} />
        <Route path="/inspections/:id/documentation" element={<Documentation />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/:id" element={<ReportPage />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/assets/:id" element={<AssetDetails />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reviewer" element={<ReviewerDashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </BrowserRouter>
  )
}
