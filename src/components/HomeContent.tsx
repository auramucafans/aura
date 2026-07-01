import { motion } from 'motion/react';
import logoImage from '../assets/images/aura_logo_no_text_1782131662884.jpg';
import { Lock } from 'lucide-react';

interface HomeContentProps {
  onEnterGallery: () => void;
  onAdminAccess: () => void;
}

export function HomeContent({ onEnterGallery, onAdminAccess }: HomeContentProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0808] relative overflow-hidden">
      {/* Background texture */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, transparent 0%, #000 100%), url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.15\'/%3E%3C/svg%3E")',
        }}
      />
      
      <div className="absolute top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c47d57]/40 to-transparent"></div>

      <button 
        onClick={onAdminAccess}
        className="absolute bottom-4 right-4 text-[#2a2422] hover:text-[#c47d57] transition-colors p-2 z-50"
        title="Admin Access"
      >
        <Lock size={16} />
      </button>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="z-10 flex flex-col items-center text-center p-8 max-w-2xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8 relative"
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-12 isolate">
            {/* Cinematic video-like aura effects */}
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_280deg,#c47d57_360deg)] opacity-40 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div 
              animate={{ rotate: [360, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-20%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#ebd8b7_360deg)] opacity-20 rounded-full blur-2xl pointer-events-none"
            />
            
            {/* Orbital rings */}
            <div className="absolute inset-[-10px] rounded-full border border-[#c47d57]/20 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-[-2px] rounded-full border-t border-[#c47d57]/60 animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-[4px] rounded-full border-b border-[#ebd8b7]/40 animate-[spin_12s_linear_infinite_reverse]" />
            
            <div className="w-full h-full rounded-full overflow-hidden border border-[#c47d57]/40 shadow-[0_0_60px_rgba(196,125,87,0.3)] relative group bg-[#0a0808]">
              {/* Scanlines / Video effect */}
              <div className="absolute inset-0 z-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiAvPgo8L3N2Zz4=')] mix-blend-overlay"></div>
              
              <motion.div 
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <img 
                  src={logoImage} 
                  alt="AURA" 
                  className="w-full h-full object-cover sepia-[0.4] brightness-90 contrast-125 mix-blend-luminosity"
                />
              </motion.div>

              {/* Light sweep effect */}
              <motion.div 
                animate={{ 
                  left: ['-100%', '200%'],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 5 }}
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#ebd8b7]/20 to-transparent skew-x-12 z-20 mix-blend-screen pointer-events-none"
              />
            </div>
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="text-3xl md:text-4xl font-serif text-[#c47d57] mb-8 font-light tracking-[0.3em] uppercase drop-shadow-sm"
        >
          Descubre AURA
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.1 }}
          className="text-[#9a8c88] text-base md:text-lg font-light font-sans leading-relaxed tracking-wide max-w-xl mx-auto mb-12"
        >
          Has ingresado a nuestro portal exclusivo. 
          <br className="hidden md:block" /> 
          Ponte cómodo, disfruta de la discreción y el ambiente elegante diseñado para ti.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.4, duration: 0.8 }}
        >
          <button 
            onClick={onEnterGallery}
            className="group relative py-4 px-12 bg-transparent overflow-hidden border border-[#c47d57]/20 hover:border-[#c47d57]/80 hover:shadow-[0_0_20px_rgba(196,125,87,0.1)] transition-all duration-700 rounded-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c47d57]/5 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
            <span className="relative z-10 text-[#ebd8b7]/90 font-serif uppercase tracking-[0.25em] text-xs md:text-sm group-hover:text-[#fff] transition-colors duration-500">
              Ingresar a nuestra galería
            </span>
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.8 }}
          className="mt-16 w-12 h-[1px] bg-[#c47d57] opacity-40 mx-auto"
        />
      </motion.div>
    </div>
  );
}
