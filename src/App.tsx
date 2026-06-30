/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';
import localforage from 'localforage';
import { AgeGate } from './components/AgeGate';
import { HomeContent } from './components/HomeContent';
import { Gallery } from './components/Gallery';
import { ProfileDetail } from './components/ProfileDetail';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanel } from './components/AdminPanel';
import { Profile } from './types';
import { PROFILES as initialProfiles } from './data';

export default function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'gallery' | 'profile' | 'admin_login' | 'admin'>('home');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const [isRandomMode, setIsRandomMode] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      localforage.getItem<Profile[]>('aura_profiles_v3'),
      localforage.getItem<boolean>('aura_random_mode')
    ]).then(([savedProfiles, savedRandomMode]) => {
      if (savedProfiles) {
        setProfiles(savedProfiles);
      } else {
        setProfiles(initialProfiles);
      }
      if (savedRandomMode !== null) {
        setIsRandomMode(savedRandomMode);
      }
      setIsLoaded(true);
    }).catch((e) => {
      console.error(e);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localforage.setItem('aura_profiles_v3', profiles).catch(console.error);
      localforage.setItem('aura_random_mode', isRandomMode).catch(console.error);
    }
  }, [profiles, isRandomMode, isLoaded]);

  useEffect(() => {
    // Basic anti-screenshot measures (prevent PrintScreen, right click, etc globally outside input)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'S'))) {
        e.preventDefault();
        try { navigator.clipboard.writeText(''); } catch(e){}
        alert('Por razones de privacidad, las capturas de pantalla están deshabilitadas.');
      }
    };
    
    const handleContextMenu = (e: MouseEvent) => {
      // Allow context menu only inside the admin view or inputs
      if (currentView !== 'admin' && currentView !== 'admin_login') {
         e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [currentView]);

  const handleVerify = () => {
    setIsVerified(true);
  };

  const handleReject = () => {
    // Usually redirects somewhere else, let's just go to Google or show a message.
    window.location.href = "https://www.google.com.ar";
  };

  const handleSelectProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setCurrentView('profile');
  };

  return (
    <>
      {!isVerified ? (
        <AgeGate onVerify={handleVerify} onReject={handleReject} />
      ) : currentView === 'admin_login' ? (
        <AdminLogin onLogin={() => setCurrentView('admin')} onBack={() => setCurrentView('home')} />
      ) : currentView === 'admin' ? (
        <AdminPanel 
          profiles={profiles} 
          setProfiles={setProfiles} 
          onLogout={() => setCurrentView('home')} 
          isRandomMode={isRandomMode}
          setIsRandomMode={setIsRandomMode}
        />
      ) : currentView === 'home' ? (
        <HomeContent 
          onEnterGallery={() => setCurrentView('gallery')} 
          onAdminAccess={() => setCurrentView('admin_login')}
        />
      ) : currentView === 'gallery' ? (
        <Gallery profiles={profiles} onBack={() => setCurrentView('home')} onSelectProfile={handleSelectProfile} isRandomMode={isRandomMode} />
      ) : selectedProfile ? (
        <ProfileDetail profile={selectedProfile} onBack={() => setCurrentView('gallery')} />
      ) : null}
    </>
  );
}
