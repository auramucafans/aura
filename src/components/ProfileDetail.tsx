import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MessageSquare, Phone } from 'lucide-react';
import logoImage from '../assets/images/aura_logo_no_text_1782131662884.jpg';
import { Profile } from '../types';

interface ProfileDetailProps {
  profile: Profile;
  onBack: () => void;
}

export function ProfileDetail({ profile, onBack }: ProfileDetailProps) {
  const [activeMedia, setActiveMedia] = useState(0);

  const media = [
    ...profile.images.map(url => ({ type: 'image', url })),
    ...(profile.videos || []).map(url => ({ type: 'video', url }))
  ];
  
  const currentMedia = media[activeMedia];

  const handleWhatsapp = () => {
    const cleanPhone = profile.phone.replace(/[^\d+]/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  const handleCall = () => {
    const cleanPhone = profile.phone.replace(/[^\d+]/g, '');
    window.location.href = `tel:${cleanPhone}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0808] relative overflow-hidden pb-20">
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
        </div>
        
        <div className="w-10"></div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 sm:px-10 max-w-[1200px] mx-auto mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] rounded-sm overflow-hidden border border-[#2a2422] bg-[#0c0908]"
              onContextMenu={(e) => e.preventDefault()}
            >
              {currentMedia?.type === 'image' ? (
                <img 
                  src={currentMedia.url} 
                  alt={`${profile.name} media`}
                  className="w-full h-full object-contain brightness-105 transition-all duration-500 pointer-events-none"
                />
              ) : currentMedia?.type === 'video' ? (
                <video 
                  src={currentMedia.url} 
                  autoPlay 
                  loop 
                  muted 
                  controls
                  controlsList="nodownload"
                  className="w-full h-full object-contain brightness-105 transition-all duration-500"
                />
              ) : null}
              {currentMedia?.type === 'image' && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808]/60 via-transparent to-transparent opacity-50 z-10 pointer-events-none"></div>
              )}
              
              {/* Watermarks */}
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden mix-blend-screen grayscale">
                   <div className="grid grid-cols-3 grid-rows-4 h-full w-full opacity-30">
                     {Array.from({ length: 12 }).map((_, i) => (
                       <div key={i} className="flex flex-col items-center justify-center -rotate-12 transform scale-75">
                         <div className="w-10 h-10 rounded-full overflow-hidden mb-1 text-center flex items-center justify-center">
                           <img src={logoImage} className="w-full h-full object-cover opacity-60" alt="" />
                         </div>
                         <span className="text-xs font-sans text-white tracking-[0.3em] uppercase">Aura</span>
                       </div>
                     ))}
                   </div>
              </div>
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {media.map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveMedia(idx)}
                  className={`relative aspect-[3/4] rounded-sm overflow-hidden border transition-colors duration-300 ${activeMedia === idx ? 'border-[#c47d57]' : 'border-[#2a2422] hover:border-[#c47d57]/50'} bg-[#0a0808] flex items-center justify-center`}
                >
                  {item.type === 'image' ? (
                    <img src={item.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain brightness-100" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#c47d57] opacity-80">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-1">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      <span className="text-[10px] font-sans tracking-widest uppercase">Video</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-7 flex flex-col pt-4 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#0f0c0b] border border-[#2a2422] p-6 sm:p-10 rounded-sm relative shadow-2xl"
            >
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#2a2422]/30 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-10">
                  <span className="text-[#c47d57] font-sans text-[10px] uppercase tracking-[0.4em] mb-4 block opacity-80 flex items-center justify-center gap-3">
                    {profile.category || 'CLASSIC'}
                    {profile.isNew && (
                      <span className="bg-[#c47d57]/20 border border-[#c47d57]/50 text-[#c47d57] px-2 py-0.5 rounded-sm font-bold tracking-widest text-[9px]">
                        <span className="md:hidden">NEW</span>
                        <span className="hidden md:inline">NUEVA</span>
                      </span>
                    )}
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif text-[#ebd8b7] mb-6 font-normal tracking-[0.1em] md:tracking-widest uppercase flex flex-col justify-center items-center w-full overflow-hidden">
                    {profile.name.split(' ').map((word, i) => (
                      <span key={i} className="block leading-tight whitespace-nowrap">{word}</span>
                    ))}
                  </h1>
                  <div className="flex justify-center items-center gap-4">
                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c47d57]/50"></div>
                    <div className="w-1.5 h-1.5 rotate-45 border border-[#c47d57]/50"></div>
                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c47d57]/50"></div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10">
                  {[
                    { label: 'Edad', value: `${profile.age} años` },
                    { label: 'Altura', value: profile.height },
                    { label: 'Medidas', value: profile.measurements },
                    { label: 'Color de ojos', value: profile.eyeColor },
                    { label: 'Zona', value: profile.zone },
                    { label: 'Horarios', value: profile.schedule },
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#0a0808] border border-[#2a2422]/60 p-4 text-center group hover:border-[#c47d57]/30 transition-colors">
                      <span className="text-[#6e635f] font-sans text-[9px] uppercase tracking-[0.2em] block mb-2">{stat.label}</span>
                      <span className="text-[#ebd8b7] font-serif text-sm md:text-base">{stat.value}</span>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="bg-[#0a0808] border border-[#2a2422]/60 p-6 md:p-8 text-center mb-10 relative">
                  <div className="absolute top-0 left-4 w-8 h-[1px] bg-[#c47d57]/40"></div>
                  <div className="absolute bottom-0 right-4 w-8 h-[1px] bg-[#c47d57]/40"></div>
                  <div className="absolute top-4 left-0 w-[1px] h-8 bg-[#c47d57]/40"></div>
                  <div className="absolute bottom-4 right-0 w-[1px] h-8 bg-[#c47d57]/40"></div>

                  <h3 className="flex items-center justify-center gap-3 text-[#c47d57] font-sans text-[10px] uppercase tracking-[0.3em] mb-4">
                    <span className="h-[1px] w-6 bg-[#c47d57]/40"></span>
                    Sobre mí
                    <span className="h-[1px] w-6 bg-[#c47d57]/40"></span>
                  </h3>
                  <p className="text-[#9a8c88] font-sans text-sm md:text-base leading-relaxed font-light italic">
                    "{profile.description}"
                  </p>
                </div>

                {/* Contact / Action Area */}
                <div className="bg-[#0a0808] border border-[#2a2422]/80 p-6 md:p-8 rounded-sm relative overflow-hidden group hover:border-[#c47d57]/40 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#c47d57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <h3 className="text-[#c47d57] font-serif text-sm tracking-[0.3em] uppercase mb-4 text-center relative z-10">
                    Contacto Directo
                  </h3>
                  
                  <p className="text-center text-[#ebd8b7] font-sans tracking-[0.1em] sm:tracking-[0.2em] text-lg sm:text-xl md:text-2xl font-light mb-8 relative z-10 whitespace-nowrap">
                    {profile.phone}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                    <button 
                      onClick={handleCall}
                      className="flex-1 relative py-4 px-6 bg-transparent overflow-hidden border border-[#2a2422] hover:border-[#c47d57]/80 transition-all duration-500 rounded-sm flex items-center justify-center gap-3 group/btn"
                    >
                      <div className="absolute inset-0 bg-[#c47d57]/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out"></div>
                      <Phone size={16} className="text-[#c47d57] relative z-10" />
                      <span className="relative z-10 text-[#ebd8b7] font-sans uppercase tracking-[0.2em] text-[10px] transition-colors duration-300">
                        Llamar
                      </span>
                    </button>

                    {profile.acceptsWhatsapp ? (
                      <button 
                        onClick={handleWhatsapp}
                        className="flex-1 relative py-4 px-6 bg-[#c47d57]/10 overflow-hidden border border-[#c47d57]/40 hover:border-[#c47d57] transition-all duration-500 rounded-sm flex items-center justify-center gap-3 group/btn"
                      >
                        <div className="absolute inset-0 bg-[#c47d57]/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out"></div>
                        <MessageSquare size={16} className="text-[#ebd8b7] relative z-10" />
                        <span className="relative z-10 text-[#ebd8b7] font-sans uppercase tracking-[0.2em] text-[10px] transition-colors duration-300">
                          WhatsApp
                        </span>
                      </button>
                    ) : null}
                  </div>
                  {!profile.acceptsWhatsapp && (
                    <p className="text-center text-[#6e635f] font-sans text-[9px] uppercase tracking-[0.2em] mt-4 relative z-10">
                      * Solo llamadas, no recibe mensajes
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
