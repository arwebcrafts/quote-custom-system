import React from 'react';
import { ClinicProvider, useClinic } from './context/ClinicContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuotationEngine } from './components/QuotationEngine/QuotationEngine';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { SignatureTreatments } from './components/SignatureTreatments';
import { DoctorProfile } from './components/DoctorProfile';
import { SocialProof } from './components/SocialProof';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { ToastContainer } from './components/Toast';

const AppContent: React.FC = () => {
  const { viewMode } = useClinic();

  if (viewMode === 'admin') {
    return (
      <div className="min-h-screen bg-obsidian-deep animate-in fade-in duration-300">
        <AdminDashboard />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pearl-50 text-obsidian flex flex-col selection:bg-gold selection:text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <QuotationEngine />
        <BeforeAfterSlider />
        <SignatureTreatments />
        <DoctorProfile />
        <SocialProof />
        <FAQ />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ClinicProvider>
      <AppContent />
    </ClinicProvider>
  );
};

export default App;
