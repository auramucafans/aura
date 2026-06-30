import { motion } from 'motion/react';
import { useMemo } from 'react';
import logoImage from '../assets/images/aura_logo_no_text_1782131662884.jpg';
import { ArrowLeft } from 'lucide-react';
import { Profile } from '../types';

interface GalleryProps {
  profiles: Profile[];
  onBack: () => void;
  onSelectProfile: (profile: Profile) => void;
  isRandomMode?: boolean;
}

export function Gallery({ profiles, onBack, onSelectProfile, isRandomMode }: GalleryProps) {
  const displayProfiles = useMemo(() => {
    if (!isRandomMode) return profiles;
    return [...profiles].sort(() => Math.random() - 0.5);
  }, [profiles, isRandomMode]);
  return (
    <div className="min-h-screen bg-[#0a0808] relative overflow-hidden pb-20">
      {/* Background texture */}
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, transparent 0%, #000 100%), url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.15\'/%3E%3C/svg%3E")',
        }}
      />
      
      <div className="fixed top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c47d57]/40 to-transparent z-20"></div>

      {/* Header */}
      <header className="relative z-10 pt-10 pb-16 px-6 sm:px-12 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-[#9a8c88] hover:text-[#ebd8b7] transition-colors duration-300"
        >
          <div className="p-2 border border-[#9a8c88]/30 rounded-full group-hover:border-[#ebd8b7]/50 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="font-sans text-xs uppercase tracking-widest hidden sm:block">Volver</span>
        </button>
        
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mt-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-[#3a3028] shadow-[0_0_15px_rgba(196,125,87,0.05)] relative group">
            <div className="absolute inset-0 bg-[#c47d57] opacity-10 mix-blend-overlay z-10"></div>
            <img 
              src={logoImage} 
              alt="AURA" 
              className="w-full h-full object-cover sepia-[0.3] brightness-90 contrast-125 relative z-0"
            />
          </div>
          <h2 className="text-xl font-serif text-[#c47d57] font-normal tracking-[0.2em] uppercase">
            Galería
          </h2>
        </div>
        
        <div className="w-10"></div> {/* Spacer for symmetry */}
      </header>

      {/* Gallery Grid */}
      <main className="relative z-10 px-2 sm:px-10 max-w-[1600px] mx-auto mt-4">
        {[
          { id: 'EXCELLENCE', label: 'EXCELLENCE' },
          { id: 'PLUS', label: 'PLUS' },
          { id: 'CLASSIC', label: 'CLASSIC' }
        ].map(category => {
          const categoryProfiles = displayProfiles.filter(p => p.isActive !== false && (p.category === category.id || (!p.category && category.id === 'CLASSIC')));
          if (categoryProfiles.length === 0) return null;

          return (
            <div key={category.id} className="mb-20">
              <div className="relative mb-12 mt-4 sm:mt-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-[#2a2422]/60"></div>
                </div>
                <div className="relative flex justify-center">
                  <div className="bg-[#0a0808] px-8 py-4 border border-[#2a2422] flex flex-col items-center min-w-[240px] sm:min-w-[300px]">
                    <span className="text-[#c47d57] text-[9px] sm:text-[10px] tracking-[0.4em] uppercase mb-2 font-sans opacity-80">Selección</span>
                    <h3 className="font-serif text-lg sm:text-2xl text-[#ebd8b7] tracking-[0.3em] uppercase">
                      {category.label}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-5 lg:grid-cols-7 gap-1 sm:gap-4 md:gap-6 gap-y-6 md:gap-y-10">
                {categoryProfiles.map((profile, index) => (
                  <motion.div
                    key={profile.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}
                    className="group cursor-pointer flex flex-col bg-[#050404] p-1.5 sm:p-2 border border-[#2a2422]/60 hover:border-[#c47d57]/60 transition-colors duration-700 shadow-2xl relative"
                    onClick={() => onSelectProfile(profile)}
                  >
                    <div 
                      className="relative aspect-[3/4] overflow-hidden bg-[#0a0808]"
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <div className="absolute inset-0 bg-[#c47d57] opacity-0 mix-blend-overlay group-hover:opacity-20 transition-opacity duration-700 z-10 pointer-events-none"></div>
                      
                      {/* Image scaling effect on hover */}
                      <div className="absolute inset-0 transform group-hover:scale-105 transition-transform duration-1000 ease-out flex items-center justify-center">
                        {profile.images && profile.images.length > 0 ? (
                           <img 
                            src={profile.images[0]} 
                            alt={profile.name} 
                            className="w-full h-full object-contain brightness-105 pointer-events-none"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-[#6e635f] text-xs font-sans uppercase tracking-widest">
                             <span className="opacity-50">Sin Foto</span>
                          </div>
                        )}
                      </div>

                      {/* Vignette effect & Watermarks */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050404] via-transparent to-transparent opacity-60 z-10 pointer-events-none"></div>
                      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden mix-blend-screen grayscale">
                         <div className="grid grid-cols-2 grid-rows-3 h-full w-full opacity-30">
                           {Array.from({ length: 6 }).map((_, i) => (
                             <div key={i} className="flex flex-col items-center justify-center -rotate-12 transform scale-75">
                               <div className="w-6 h-6 rounded-full overflow-hidden mb-1 hover:border-[#c47d57]/60">
                                 <img src={logoImage} className="w-full h-full object-cover opacity-60" alt="" />
                               </div>
                               <span className="text-[10px] font-sans text-white tracking-[0.2em] uppercase">Aura</span>
                             </div>
                           ))}
                         </div>
                      </div>
                      {profile.isNew && (
                        <div className="absolute top-2 right-2 bg-[#c47d57] text-[#0a0808] text-[8px] md:text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10 shadow-lg shadow-[#c47d57]/20 border border-[#ebd8b7]/30">
                          Nueva
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center pt-3 pb-1 md:pt-4 md:pb-2 px-1 flex flex-col justify-center items-center">
                      <h3 className="font-serif text-[#ebd8b7] text-[9px] sm:text-[10px] md:text-xs lg:text-sm tracking-[0.15em] sm:tracking-widest uppercase md:tracking-[0.2em] group-hover:text-[#fff] transition-colors duration-500 truncate w-full">
                        {profile.name}
                      </h3>
                      <div className="h-[1px] w-0 group-hover:w-6 md:group-hover:w-8 bg-[#c47d57] opacity-0 group-hover:opacity-60 mt-1.5 md:mt-2 transition-all duration-700 ease-out"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
