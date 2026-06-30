import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Profile } from '../types';
import { ArrowLeft, Plus, Trash2, Edit2, Save, X, Image as ImageIcon, Video, LogOut, Eye, EyeOff, Search } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminPanelProps {
  profiles: Profile[];
  setProfiles: (profiles: Profile[]) => void;
  onLogout: () => void;
  isRandomMode: boolean;
  setIsRandomMode: (value: boolean) => void;
}

export function AdminPanel({ profiles, setProfiles, onLogout, isRandomMode, setIsRandomMode }: AdminPanelProps) {
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [profileToDelete, setProfileToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (profile: Profile) => {
    setEditingProfile({ ...profile });
  };

  const handleCreate = () => {
    const newId = profiles.length > 0 ? Math.max(...profiles.map(p => p.id)) + 1 : 1;
    setEditingProfile({
      id: newId,
      name: '',
      age: 20,
      height: '',
      measurements: '',
      eyeColor: '',
      zone: '',
      schedule: '',
      description: '',
      phone: '',
      acceptsWhatsapp: true,
      images: [],
      videos: [],
      isActive: true,
      category: 'CLASSIC',
      isNew: false
    });
  };

  const handleDelete = (id: number) => {
    setProfileToDelete(id);
  };
  
  const confirmDelete = () => {
    if (profileToDelete !== null) {
      setProfiles(profiles.filter(p => p.id !== profileToDelete));
      setProfileToDelete(null);
    }
  };

  const moveToPosition = (profileId: number, newPosition: number) => {
    const currentIndex = profiles.findIndex(p => p.id === profileId);
    if (currentIndex === -1) return;
    
    let targetIndex = newPosition - 1;
    if (targetIndex < 0) targetIndex = 0;
    if (targetIndex >= profiles.length) targetIndex = profiles.length - 1;
    
    if (currentIndex === targetIndex) return;

    const newProfiles = [...profiles];
    const [movedItem] = newProfiles.splice(currentIndex, 1);
    newProfiles.splice(targetIndex, 0, movedItem);
    
    setProfiles(newProfiles);
  };

  const toggleActive = (profile: Profile) => {
    const newProfiles = profiles.map(p => {
      if (p.id === profile.id) {
        return { ...p, isActive: p.isActive === false ? true : false };
      }
      return p;
    });
    setProfiles(newProfiles);
  };

  const handleSave = () => {
    if (!editingProfile) return;
    
    if (!editingProfile.name || !editingProfile.phone) {
      alert("El nombre y el teléfono son obligatorios");
      return;
    }

    const exists = profiles.some(p => p.id === editingProfile.id);
    if (exists) {
      setProfiles(profiles.map(p => p.id === editingProfile.id ? editingProfile : p));
    } else {
      setProfiles([editingProfile, ...profiles]);
    }
    setEditingProfile(null);
  };

  const handleCancel = () => {
    setEditingProfile(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingProfile) return;
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setEditingProfile({ ...editingProfile, [name]: checked });
    } else if (name === 'age') {
      setEditingProfile({ ...editingProfile, [name]: parseInt(value) || 0 });
    } else {
      setEditingProfile({ ...editingProfile, [name]: value });
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!editingProfile || !e.target.files) return;
    
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && typeof event.target.result === 'string') {
          setEditingProfile(prev => {
            if (!prev) return prev;
            return {
              ...prev,
              images: [...prev.images, event.target!.result as string]
            };
          });
        }
      };
      reader.readAsDataURL(file as unknown as Blob);
    });
  };

  const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!editingProfile || !e.target.files) return;
    
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && typeof event.target.result === 'string') {
          setEditingProfile(prev => {
            if (!prev) return prev;
            return {
              ...prev,
              videos: [...(prev.videos || []), event.target!.result as string]
            };
          });
        }
      };
      reader.readAsDataURL(file as unknown as Blob);
    });
  };

  const removeImage = (index: number) => {
    if (!editingProfile) return;
    const newImages = [...editingProfile.images];
    newImages.splice(index, 1);
    setEditingProfile({ ...editingProfile, images: newImages });
  };

  const removeVideo = (index: number) => {
    if (!editingProfile) return;
    const newVideos = [...(editingProfile.videos || [])];
    newVideos.splice(index, 1);
    setEditingProfile({ ...editingProfile, videos: newVideos });
  };

  const filteredProfiles = profiles.filter(profile => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    
    if (query === 'suspendido' || query === 'suspendidos') return profile.isActive === false;
    if (query === 'publicado' || query === 'publicados' || query === 'activo' || query === 'activos') return profile.isActive !== false;
    
    return (
      profile.name.toLowerCase().includes(query) ||
      profile.phone.toLowerCase().includes(query) ||
      (profile.zone || '').toLowerCase().includes(query) ||
      profile.id.toString() === query
    );
  });

  return (
    <div className="min-h-screen bg-[#0a0808] relative overflow-hidden pb-20 font-sans">
      <div className="fixed top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c47d57]/40 to-transparent z-20"></div>

      <header className="relative z-10 pt-10 pb-10 px-6 sm:px-12 flex items-center justify-between bg-[#0f0c0b] border-b border-[#2a2422]">
        <h2 className="text-xl font-serif text-[#ebd8b7] tracking-[0.2em] uppercase">
          Panel de Administración
        </h2>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-[#c47d57] hover:text-[#ebd8b7] transition-colors text-sm uppercase tracking-widest"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Cerrar Sesión</span>
        </button>
      </header>

      <main className="relative z-10 px-4 sm:px-10 max-w-[1200px] mx-auto mt-8 text-[#ebd8b7]">
        {!editingProfile ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h3 className="text-xl font-serif text-[#c47d57] tracking-widest uppercase">Perfiles</h3>
              <div className="flex w-full sm:w-auto items-center gap-4">
                <div className="flex items-center gap-2 mr-2">
                  <input 
                    type="checkbox" 
                    id="randomMode" 
                    checked={isRandomMode} 
                    onChange={(e) => setIsRandomMode(e.target.checked)} 
                    className="accent-[#c47d57] w-4 h-4 cursor-pointer" 
                  />
                  <label htmlFor="randomMode" className="text-[#ebd8b7] text-xs uppercase tracking-widest cursor-pointer">
                    Orden Aleatorio
                  </label>
                </div>
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Buscar (nombre, zona, 'suspendido'...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0a0808] border border-[#2a2422] text-[#ebd8b7] pl-10 pr-3 py-2 text-sm rounded-sm focus:outline-none focus:border-[#c47d57]/50 placeholder:text-[#6e635f]"
                  />
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6e635f]" />
                </div>
                <button 
                  onClick={handleCreate}
                  className="flex items-center gap-2 bg-[#c47d57]/10 hover:bg-[#c47d57]/20 text-[#c47d57] px-4 py-2 border border-[#c47d57]/30 rounded-sm transition-all text-sm tracking-widest uppercase whitespace-nowrap"
                >
                  <Plus size={16} /> Agregar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.map(profile => (
                <div key={profile.id} className={`bg-[#0f0c0b] border border-[#2a2422] rounded-sm p-4 flex items-center justify-between group hover:border-[#c47d57]/40 transition-colors ${profile.isActive === false ? 'opacity-50' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-[#3a3028]">
                      {profile.images && profile.images.length > 0 ? (
                        <img src={profile.images[0]} alt={profile.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#1a1514]"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-serif text-[#ebd8b7] text-lg">
                        {profile.name} 
                        {profile.isActive === false && <span className="text-xs text-red-500 font-sans ml-2">(Suspendido)</span>}
                        {profile.isNew && <span className="text-xs text-[#c47d57] font-sans ml-2 font-bold tracking-wider">(NUEVA)</span>}
                      </h4>
                      <p className="text-[#6e635f] text-xs font-sans uppercase tracking-widest">{profile.zone} • {profile.category || 'CLASSIC'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1 mr-2 bg-[#0a0808] px-2 py-1 rounded border border-[#2a2422]">
                      <span className="text-[#6e635f] text-[10px] uppercase tracking-widest">Pos:</span>
                      <select 
                        value={profiles.findIndex(p => p.id === profile.id) + 1}
                        onChange={(e) => moveToPosition(profile.id, parseInt(e.target.value))}
                        className="bg-transparent text-[#ebd8b7] text-xs focus:outline-none cursor-pointer"
                        title="Cambiar posición"
                      >
                        {profiles.map((_, idx) => (
                          <option key={idx} value={idx + 1}>{idx + 1}</option>
                        ))}
                      </select>
                    </div>
                    <button onClick={() => toggleActive(profile)} className="p-1.5 text-[#9a8c88] hover:text-[#ebd8b7] transition-colors" title={profile.isActive === false ? 'Activar' : 'Suspender'}>
                      {profile.isActive === false ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button onClick={() => handleEdit(profile)} className="p-1.5 text-[#9a8c88] hover:text-[#c47d57] transition-colors" title="Editar"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(profile.id)} className="p-1.5 text-[#9a8c88] hover:text-red-500 transition-colors" title="Eliminar"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
              {filteredProfiles.length === 0 && (
                <div className="col-span-full text-center py-12 text-[#6e635f]">
                  No se encontraron perfiles.
                </div>
              )}
            </div>

            {profileToDelete !== null && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <div className="bg-[#0f0c0b] border border-[#2a2422] p-6 rounded-sm max-w-sm w-full">
                  <h3 className="text-xl font-serif text-[#ebd8b7] mb-4">¿Eliminar perfil?</h3>
                  <p className="text-[#6e635f] text-sm mb-6">Esta acción no se puede deshacer. El perfil se eliminará permanentemente.</p>
                  <div className="flex justify-end gap-4">
                    <button onClick={() => setProfileToDelete(null)} className="text-[#9a8c88] hover:text-[#ebd8b7] transition-colors text-sm uppercase tracking-widest px-4 py-2">
                       Cancelar
                    </button>
                    <button onClick={confirmDelete} className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-4 py-2 rounded-sm transition-colors text-sm uppercase tracking-widest font-bold">
                       Eliminar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0f0c0b] border border-[#2a2422] p-6 sm:p-8 rounded-sm">
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-[#2a2422]">
              <div className="flex items-center gap-4">
                 <button onClick={handleCancel} className="text-[#9a8c88] hover:text-[#ebd8b7] transition-colors p-2" title="Volver al panel">
                   <ArrowLeft size={20} />
                 </button>
                 <h3 className="text-xl font-serif text-[#c47d57] tracking-widest uppercase truncate max-w-[200px] sm:max-w-md">
                   {editingProfile.id && profiles.some(p => p.id === editingProfile.id) ? `Editar Perfil: ${editingProfile.name}` : 'Nuevo Perfil'}
                 </h3>
              </div>
              <div className="flex gap-4">
                <button onClick={handleSave} className="text-[#c47d57] hover:text-[#d4af37] transition-colors text-sm tracking-widest uppercase flex items-center gap-2"><Save size={16} /> <span className="hidden sm:inline">Guardar</span></button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Col 1 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[#6e635f] text-xs uppercase tracking-widest mb-1">Categoría</label>
                  <select name="category" value={editingProfile.category || 'CLASSIC'} onChange={handleChange as any} className="w-full bg-[#0a0808] border border-[#2a2422] text-[#ebd8b7] px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-[#c47d57]/50">
                    <option value="EXCELLENCE">EXCELLENCE</option>
                    <option value="PLUS">PLUS</option>
                    <option value="CLASSIC">CLASSIC</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <input type="checkbox" id="isNew" name="isNew" checked={!!editingProfile.isNew} onChange={e => setEditingProfile({...editingProfile, isNew: e.target.checked})} className="accent-[#c47d57] w-4 h-4" />
                  <label htmlFor="isNew" className="text-[#ebd8b7] text-sm cursor-pointer">Marcar como "NUEVA"</label>
                </div>
                <div>
                  <label className="block text-[#6e635f] text-xs uppercase tracking-widest mb-1">Nombre</label>
                  <input type="text" name="name" value={editingProfile.name} onChange={handleChange} className="w-full bg-[#0a0808] border border-[#2a2422] text-[#ebd8b7] px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-[#c47d57]/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#6e635f] text-xs uppercase tracking-widest mb-1">Edad</label>
                    <input type="number" name="age" value={editingProfile.age} onChange={handleChange} className="w-full bg-[#0a0808] border border-[#2a2422] text-[#ebd8b7] px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-[#c47d57]/50" />
                  </div>
                  <div>
                    <label className="block text-[#6e635f] text-xs uppercase tracking-widest mb-1">Altura (ej. 1.70m)</label>
                    <input type="text" name="height" value={editingProfile.height} onChange={handleChange} className="w-full bg-[#0a0808] border border-[#2a2422] text-[#ebd8b7] px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-[#c47d57]/50" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#6e635f] text-xs uppercase tracking-widest mb-1">Medidas</label>
                    <input type="text" name="measurements" value={editingProfile.measurements} onChange={handleChange} className="w-full bg-[#0a0808] border border-[#2a2422] text-[#ebd8b7] px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-[#c47d57]/50" />
                  </div>
                  <div>
                    <label className="block text-[#6e635f] text-xs uppercase tracking-widest mb-1">Color de ojos</label>
                    <input type="text" name="eyeColor" value={editingProfile.eyeColor} onChange={handleChange} className="w-full bg-[#0a0808] border border-[#2a2422] text-[#ebd8b7] px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-[#c47d57]/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-[#6e635f] text-xs uppercase tracking-widest mb-1">Zona</label>
                  <input type="text" name="zone" value={editingProfile.zone} onChange={handleChange} className="w-full bg-[#0a0808] border border-[#2a2422] text-[#ebd8b7] px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-[#c47d57]/50" />
                </div>
                <div>
                  <label className="block text-[#6e635f] text-xs uppercase tracking-widest mb-1">Horarios</label>
                  <input type="text" name="schedule" value={editingProfile.schedule} onChange={handleChange} className="w-full bg-[#0a0808] border border-[#2a2422] text-[#ebd8b7] px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-[#c47d57]/50" />
                </div>
                <div>
                  <label className="block text-[#6e635f] text-xs uppercase tracking-widest mb-1">Teléfono</label>
                  <input type="text" name="phone" value={editingProfile.phone} onChange={handleChange} className="w-full bg-[#0a0808] border border-[#2a2422] text-[#ebd8b7] px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-[#c47d57]/50" />
                </div>
                <div className="flex items-center gap-3 mt-2 bg-[#0a0808] border border-[#2a2422] p-3 rounded-sm">
                  <input type="checkbox" name="acceptsWhatsapp" checked={editingProfile.acceptsWhatsapp} onChange={handleChange} className="accent-[#c47d57] w-4 h-4 cursor-pointer" id="wa-check" />
                  <label htmlFor="wa-check" className="text-[#ebd8b7] text-sm uppercase tracking-widest cursor-pointer">Recibe WhatsApp</label>
                </div>
              </div>

              {/* Col 2 */}
              <div className="space-y-6">
                <div>
                  <label className="block text-[#6e635f] text-xs uppercase tracking-widest mb-1">Descripción</label>
                  <textarea name="description" value={editingProfile.description} onChange={handleChange} rows={4} className="w-full bg-[#0a0808] border border-[#2a2422] text-[#ebd8b7] px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-[#c47d57]/50 resize-none"></textarea>
                </div>

                <div className="border-t border-[#2a2422] pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-[#6e635f] text-xs uppercase tracking-widest">Fotos ({(editingProfile.images || []).length})</label>
                    <button onClick={() => fileInputRef.current?.click()} className="text-[#c47d57] text-xs tracking-widest flex items-center gap-1 hover:text-[#ebd8b7] uppercase"><ImageIcon size={14}/> Subir</button>
                    <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                  </div>
                  {(editingProfile.images || []).length > 0 ? (
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {(editingProfile.images || []).map((img, idx) => (
                        <div key={idx} className="relative w-full aspect-[3/4] border border-[#2a2422] rounded-sm group overflow-hidden bg-black flex items-center justify-center">
                          <img src={img} alt="" className="w-full h-full object-contain" />
                          <button onClick={() => removeImage(idx)} className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-500"><Trash2 size={16} /></button>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-[#6e635f] text-xs italic">No hay fotos.</p>}
                </div>

                <div className="border-t border-[#2a2422] pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-[#6e635f] text-xs uppercase tracking-widest">Videos ({(editingProfile.videos || []).length})</label>
                    <button onClick={() => videoInputRef.current?.click()} className="text-[#c47d57] text-xs tracking-widest flex items-center gap-1 hover:text-[#ebd8b7] uppercase"><Video size={14}/> Subir</button>
                    <input type="file" multiple accept="video/*" className="hidden" ref={videoInputRef} onChange={handleVideoUpload} />
                  </div>
                  {(editingProfile.videos || []).length > 0 ? (
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {(editingProfile.videos || []).map((vid, idx) => (
                        <div key={idx} className="relative w-full aspect-[3/4] border border-[#2a2422] rounded-sm group overflow-hidden bg-black flex items-center justify-center">
                           <video src={vid} className="w-full h-full object-contain" />
                          <button onClick={() => removeVideo(idx)} className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-500"><Trash2 size={16} /></button>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-[#6e635f] text-xs italic">No hay videos.</p>}
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
