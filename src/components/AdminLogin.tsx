import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    // Support both the original and a new, stronger password
    if (cleanUser === 'admin' && (cleanPass === 'admin' || cleanPass === 'aura2026')) {
      setError('');
      onLogin();
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0808] relative overflow-hidden">
      <div className="absolute top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c47d57]/40 to-transparent z-20"></div>

      <button 
        onClick={onBack}
        className="absolute top-8 left-8 group flex items-center gap-3 text-[#9a8c88] hover:text-[#ebd8b7] transition-colors duration-300 z-50"
      >
        <div className="p-2 border border-[#9a8c88]/30 rounded-full group-hover:border-[#ebd8b7]/50 transition-colors">
          <ArrowLeft size={16} />
        </div>
        <span className="font-sans text-xs uppercase tracking-widest hidden sm:block">Volver</span>
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0f0c0b] border border-[#2a2422] p-10 rounded-sm shadow-2xl w-full max-w-md relative z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full border border-[#c47d57]/30 flex items-center justify-center text-[#c47d57]">
            <Lock size={24} />
          </div>
        </div>
        
        <h2 className="text-2xl font-serif text-[#ebd8b7] text-center mb-8 tracking-widest uppercase">
          Acceso Administrador
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-[#6e635f] text-xs uppercase tracking-widest mb-2">Usuario</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0a0808] border border-[#2a2422] text-[#ebd8b7] px-4 py-3 rounded-sm focus:outline-none focus:border-[#c47d57]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[#6e635f] text-xs uppercase tracking-widest mb-2">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0808] border border-[#2a2422] text-[#ebd8b7] px-4 py-3 rounded-sm focus:outline-none focus:border-[#c47d57]/50 transition-colors"
            />
          </div>

          {error && <p className="text-red-500/80 text-sm font-sans mt-2">{error}</p>}

          <button 
            type="submit"
            className="group relative w-full py-4 px-6 mt-4 bg-transparent overflow-hidden border border-[#c47d57]/40 hover:border-[#c47d57]/80 transition-all duration-500 rounded-sm flex items-center justify-center gap-3"
          >
            <div className="absolute inset-0 bg-[#c47d57]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <span className="relative z-10 text-[#ebd8b7] font-serif uppercase tracking-widest text-sm transition-colors duration-300">
              Ingresar
            </span>
          </button>
        </form>
      </motion.div>
    </div>
  );
}
