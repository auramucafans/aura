import { motion } from 'motion/react';
import { useMemo } from 'react';
import logoImage from '../assets/images/aura_logo_no_text_1782131662884.jpg';
import bannerImage from '../assets/images/sensual_pole_dance_banner_1782859847645.jpg';
import { ArrowLeft, Video } from 'lucide-react';
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
      <header className="relative z-10 w-full mb-4 sm:mb-10">
        <div className="relative w-full h-[280px] md:h-[400px] overflow-hidden border-b border-[#c47d57]/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          {/* Background image for the banner */}
          <div 
            className="absolute inset-0 bg-[#0a0808]"
            style={{
              backgroundImage: `url(${bannerImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%',
              filter: 'sepia(0.5) brightness(0.4) contrast(1.2)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0808]/90 via-[#0a0808]/30 to-[#0a0808] z-0 pointer-events-none"></div>
          
          <button 
            onClick={onBack}
            className="absolute top-6 md:top-10 left-6 md:left-12 z-20 group flex items-center gap-3 text-[#ebd8b7]/50 hover:text-[#ebd8b7] transition-all duration-500 bg-[#0a0808]/40 p-2 md:px-5 md:py-2.5 border border-[#c47d57]/20 hover:border-[#c47d57]/60 rounded-full backdrop-blur-md hover:shadow-[0_0_20px_rgba(196,125,87,0.15)]"
          >
            <ArrowLeft size={16} className="opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.25em] hidden md:block opacity-80 group-hover:opacity-100 transition-opacity duration-500">Volver al inicio</span>
          </button>

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 mt-4 md:mt-8">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-[3px] border-[#c47d57]/40 shadow-[0_0_50px_rgba(196,125,87,0.2)] relative mb-6 md:mb-8"
            >
              <div className="absolute inset-0 bg-[#c47d57] opacity-20 mix-blend-overlay z-10 pointer-events-none"></div>
              <img 
                src={logoImage} 
                alt="AURA" 
                className="w-full h-full object-cover sepia-[0.3] brightness-90 contrast-125 relative z-0"
              />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="text-center px-4"
            >
              <div className="flex items-center justify-center gap-4 mb-3 md:mb-4">
                <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-[#c47d57]/80"></div>
                <span className="text-[#c47d57] text-[8px] sm:text-[9px] md:text-xs tracking-[0.4em] sm:tracking-[0.5em] md:tracking-[0.6em] uppercase font-sans opacity-90 font-bold whitespace-nowrap">
                  Erotismo de Alto Nivel
                </span>
                <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-[#c47d57]/80"></div>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif text-[#ebd8b7] font-normal tracking-[0.25em] uppercase drop-shadow-[0_2px_15px_rgba(0,0,0,1)]">
                Galería Selecta
              </h1>
            </motion.div>
          </div>
          
          {/* Decorative bottom lines */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c47d57]/60 to-transparent"></div>
          <div className="absolute bottom-[4px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ebd8b7]/20 to-transparent"></div>
        </div>
      </header>

      {/* Gallery Grid */}
      <main className="relative z-10 px-2 sm:px-10 max-w-[1600px] mx-auto mt-4">
        {[
          { id: 'NUEVAS', label: 'NUEVAS' },
          { id: 'EXCELLENCE', label: 'EXCELLENCE' },
          { id: 'PLUS', label: 'PLUS' },
          { id: 'CLASSIC', label: 'CLASSIC' }
        ].map(category => {
          const categoryProfiles = category.id === 'NUEVAS'
            ? displayProfiles.filter(p => p.isActive !== false && p.isNew)
            : displayProfiles.filter(p => p.isActive !== false && (p.category === category.id || (!p.category && category.id === 'CLASSIC')));
          if (categoryProfiles.length === 0) return null;

          return (
            <div key={category.id} className="mb-20">
              <div className="relative mb-12 mt-4 sm:mt-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-[#2a2422]/30"></div>
                </div>
                <div className="relative flex justify-center">
                  <div className="bg-[#0a0808] px-8 py-4 border border-[#2a2422]/60 flex flex-col items-center min-w-[240px] sm:min-w-[300px]">
                    <span className="text-[#c47d57] text-[8px] sm:text-[9px] tracking-[0.5em] uppercase mb-2 font-sans opacity-70">Selección</span>
                    <h3 className="font-serif text-lg sm:text-2xl text-[#ebd8b7] tracking-[0.4em] uppercase font-light">
                      {category.label}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-4 md:gap-6 gap-y-6 md:gap-y-10">
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
                      <div className="absolute inset-0 bg-[#c47d57] opacity-0 mix-blend-overlay group-hover:opacity-10 transition-opacity duration-1000 z-10 pointer-events-none"></div>
                      
                      {/* Image scaling effect on hover */}
                      <div className="absolute inset-0 transform group-hover:scale-110 transition-transform duration-[1500ms] ease-out flex items-center justify-center">
                        {profile.images && profile.images.length > 0 ? (
                           <img 
                            src={profile.images[0]} 
                            alt={profile.name} 
                            className="w-full h-full object-contain brightness-90 group-hover:brightness-110 transition-all duration-1000 pointer-events-none"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-[#6e635f] text-xs font-sans uppercase tracking-widest">
                             <span className="opacity-50">Sin Foto</span>
                          </div>
                        )}
                      </div>

                      {/* Vignette effect & Watermarks */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050404] via-transparent to-transparent opacity-80 z-10 pointer-events-none"></div>
                      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden mix-blend-screen grayscale">
                         <div className="grid grid-cols-2 grid-rows-3 h-full w-full opacity-15 group-hover:opacity-10 transition-opacity duration-1000">
                           {Array.from({ length: 6 }).map((_, i) => (
                             <div key={i} className="flex flex-col items-center justify-center -rotate-12 transform scale-75">
                               <div className="w-6 h-6 rounded-full overflow-hidden mb-1">
                                 <img src={logoImage} className="w-full h-full object-cover opacity-50" alt="" />
                               </div>
                               <span className="text-[9px] font-sans text-white tracking-[0.25em] uppercase opacity-80">Aura</span>
                             </div>
                           ))}
                         </div>
                      </div>
                      
                      {/* Status Badges moved below */}
                    </div>
                    
                    <div className="text-center p-2 sm:p-3 md:p-4 flex flex-col justify-center items-center bg-[#0a0808]/40 border-t border-[#ebd8b7]/5 group-hover:bg-[#0a0808]/60 transition-colors duration-500 w-full overflow-hidden">
                      <h3 className="font-serif text-[#ebd8b7]/90 text-[7.5px] min-[360px]:text-[8.5px] sm:text-xs md:text-sm tracking-tighter min-[400px]:tracking-tight sm:tracking-widest md:tracking-[0.2em] uppercase group-hover:text-[#fff] transition-colors duration-700 w-full px-0.5 mb-1.5 md:mb-2.5 min-h-[1.5rem] sm:min-h-[2.5rem] flex flex-col justify-center items-center">
                        {profile.name.split(' ').map((word, i) => (
                          <span key={i} className="block w-full text-center leading-[1.2] whitespace-nowrap">{word}</span>
                        ))}
                      </h3>
                      
                      <div className="flex items-center justify-center gap-2 h-4 md:h-5">
                        {profile.isNew && (
                          <span className="text-[#c47d57] font-sans font-bold text-[8px] md:text-[9px] uppercase tracking-widest border border-[#c47d57]/30 px-1.5 py-0.5 rounded-sm flex items-center leading-none">
                            NEW
                          </span>
                        )}
                        {profile.videos && profile.videos.length > 0 && (
                          <div className="text-red-500 border border-red-500/40 p-0.5 rounded-sm flex items-center justify-center" title="Incluye Video">
                            <Video size={12} className="md:w-3.5 md:h-3.5" />
                          </div>
                        )}
                      </div>
                      
                      <div className="h-[1px] w-0 group-hover:w-8 md:group-hover:w-12 bg-[#c47d57] opacity-0 group-hover:opacity-50 mt-2 transition-all duration-[1000ms] ease-out"></div>
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
