import { motion } from 'motion/react';
import logoImage from '../assets/images/aura_logo_no_text_1782131662884.jpg';

interface AgeGateProps {
  onVerify: () => void;
  onReject: () => void;
}

export function AgeGate({ onVerify, onReject }: AgeGateProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0808] bg-opacity-95 backdrop-blur-sm p-4">
      {/* Rustic background overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, transparent 0%, #000 100%), url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.15\'/%3E%3C/svg%3E")',
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center p-6 md:p-8 border border-[#2a2422] rounded-lg shadow-2xl bg-[#0f0c0b] relative"
      >
        {/* Subtle gold glow at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#c47d57] to-transparent opacity-30"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mb-4 relative"
        >
          <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto mb-4 isolate">
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

        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="uppercase tracking-[0.3em] text-[#c47d57] text-[10px] md:text-xs font-semibold mb-2 w-full opacity-80"
        >
          Acceso Exclusivo
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-2xl md:text-3xl font-serif text-[#ebd8b7] mb-2 md:mb-3 font-normal tracking-widest"
        >
          AURA
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="text-[#9a8c88] text-xs md:text-sm font-light font-sans max-w-sm mb-6 md:mb-8 leading-relaxed"
        >
          Este espacio contiene material adulto, discreto y reservado. Para ingresar a nuestra colección privada, debes confirmar tu mayoría de edad.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="w-full flex flex-col gap-3 md:gap-4"
        >
          <button 
            onClick={onVerify}
            className="group relative w-full py-3 md:py-4 px-6 bg-transparent overflow-hidden border border-[#c47d57]/30 hover:border-[#c47d57]/60 transition-all duration-500 rounded-sm"
          >
            <div className="absolute inset-0 bg-[#c47d57]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <span className="relative z-10 text-[#ebd8b7] font-serif uppercase tracking-widest text-xs md:text-sm group-hover:text-[#fff] transition-colors duration-300">
              Sí, soy mayor de 18 años
            </span>
          </button>

          <button 
            onClick={onReject}
            className="w-full py-2.5 md:py-3 px-6 bg-transparent border border-[#2a2422]/60 hover:border-[#2a2422] text-[#ebd8b7] opacity-80 hover:opacity-100 hover:bg-[#1a1514] transition-all duration-300 font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase mt-1 md:mt-2 rounded-sm"
          >
            No, deseo salir
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
