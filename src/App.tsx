/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';
import localforage from 'localforage';
import { collection, doc, getDocs, setDoc, getDoc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
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
    const loadData = async () => {
      try {
        const [savedLocalProfiles, savedLocalRandomMode, v4Migrated] = await Promise.all([
          localforage.getItem<Profile[]>('aura_profiles_v3'),
          localforage.getItem<boolean>('aura_random_mode'),
          localforage.getItem<boolean>('aura_migrated_v4')
        ]);

        const profilesSnap = await getDocs(collection(db, 'profiles'));
        const settingsDoc = await getDoc(doc(db, 'settings', 'global'));

        let finalProfiles = initialProfiles;
        let finalRandomMode = false;

        if (!v4Migrated || profilesSnap.empty) {
          // FORCE SEED FOR TEST
          const batch = writeBatch(db);
          // delete old ones just in case
          profilesSnap.docs.forEach(d => batch.delete(d.ref));
          
          finalProfiles.forEach((p, index) => {
            const profileRef = doc(db, 'profiles', p.id.toString());
            batch.set(profileRef, { ...p, orderPosition: index });
          });
          const globalRef = doc(db, 'settings', 'global');
          batch.set(globalRef, { isRandomMode: finalRandomMode });
          await batch.commit();
          
          await localforage.setItem('aura_migrated_v4', true);
        } else {
          // Load from Firestore
          finalProfiles = profilesSnap.docs.map(doc => doc.data() as Profile);
          
          // Remove test profiles
          finalProfiles = finalProfiles.filter(p => !p.name.startsWith('Mía ') && !p.name.startsWith('Valeria ') && !p.name.startsWith('Sofía '));

          // Sort by orderPosition to maintain manual order
          finalProfiles.sort((a, b) => (a.orderPosition || 0) - (b.orderPosition || 0));
          
          if (settingsDoc.exists()) {
            finalRandomMode = settingsDoc.data().isRandomMode || false;
          }
        }

        setProfiles(finalProfiles);
        setIsRandomMode(finalRandomMode);
      } catch (e) {
        console.error("Error loading data:", e);
        // Fallback to local
        const [savedLocalProfiles, savedLocalRandomMode] = await Promise.all([
          localforage.getItem<Profile[]>('aura_profiles_v3'),
          localforage.getItem<boolean>('aura_random_mode')
        ]);
        if (savedLocalProfiles) setProfiles(savedLocalProfiles);
        if (savedLocalRandomMode !== null) setIsRandomMode(savedLocalRandomMode);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localforage.setItem('aura_profiles_v3', profiles).catch(console.error);
      localforage.setItem('aura_random_mode', isRandomMode).catch(console.error);
      
      const syncToFirebase = async () => {
        try {
          const profilesSnap = await getDocs(collection(db, 'profiles'));
          const currentDbIds = profilesSnap.docs.map(d => d.id);
          const currentLocalIds = profiles.map(p => p.id.toString());
          
          const batch = writeBatch(db);
          
          // Delete removed profiles
          currentDbIds.forEach(dbId => {
            if (!currentLocalIds.includes(dbId)) {
              batch.delete(doc(db, 'profiles', dbId));
            }
          });

          // Update/Add existing profiles
          profiles.forEach((p, index) => {
            const profileRef = doc(db, 'profiles', p.id.toString());
            batch.set(profileRef, { ...p, orderPosition: index });
          });
          
          const globalRef = doc(db, 'settings', 'global');
          batch.set(globalRef, { isRandomMode }, { merge: true });
          
          await batch.commit();
        } catch (error) {
          console.error("Error saving to Firestore:", error);
        }
      };
      syncToFirebase();
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
