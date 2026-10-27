import React, { useState } from 'react';

const PRODUCTOS = [
  { id: 1, nombre: "Chamarra Biker", precio: 1299, categoria: "Ropa", imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600" },
  { id: 2, nombre: "Sneakers Phantom", precio: 1899, categoria: "Zapatos", imagen: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600" },
  { id: 3, nombre: "Reloj Obsidian", precio: 899, categoria: "Accesorios", imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600" },
  { id: 4, nombre: "Hoodie Essential", precio: 650, categoria: "Ropa", imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600" },
  { id: 5, nombre: "Botas Chelsea", precio: 1400, categoria: "Zapatos", imagen: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=600" },
  { id: 6, nombre: "Gafas Matrix", precio: 399, categoria: "Accesorios", imagen: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600" }
];

export default function App() {
  const [categoria, setCategoria] = useState('Todos');
  const [carrito, setCarrito] = useState([]);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const filtrados = categoria === 'Todos' ? PRODUCTOS : PRODUCTOS.filter(p => p.categoria === categoria);
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  return (
    <div className="min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      
      {/* NAVBAR GLASSMORPHISM */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent uppercase">
            VØID <span className="text-white">STORE</span>
          </h1>
          
          <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-slate-400">
            {['Todos', 'Ropa', 'Zapatos', 'Accesorios'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategoria(cat)}
                className={`hover:text-white transition-all ${categoria === cat ? 'text-indigo-400 border-b-2 border-indigo-500 pb-1' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button onClick={() => setMenuAbierto(true)} className="relative p-3 bg-slate-900 rounded-full hover:bg-slate-800 border border-slate-800 transition-all">
            🛒
            {carrito.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs font-black h-6 w-6 rounded-full flex items-center justify-center animate-pulse">
                {carrito.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO SECTION NEON */}
      <div className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full"></div>
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 relative z-10">
          Define tu <span className="text-indigo-400">Estilo</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto relative z-10">
          La colección definitiva para el campus. Minimalista, agresiva y premium.
        </p>
      </div>

      {/* GRID DE PRODUCTOS */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtrados.map((item) => (
            <div key={item.id} className="group bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
              <div className="relative h-80 overflow-hidden">
                <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-4 py-1 text-xs font-black uppercase tracking-widest rounded-full border border-slate-700">
                  {item.categoria}
                </span>
              </div>
              <div className="p-6">
                <h4 className="font-black text-xl mb-2">{item.nombre}</h4>
                <p className="text-indigo-400 font-bold text-lg mb-6">${item.precio.toLocaleString()} MXN</p>
                <button 
                  onClick={() => setCarrito([...carrito, item])} 
                  className="w-full bg-slate-800 text-white font-bold py-4 rounded-xl hover:bg-indigo-600 transition-colors"
                >
                  Añadir a la bolsa
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* CARRITO SIDEBAR */}
      {menuAbierto && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 h-full flex flex-col border-l border-slate-800 shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-black uppercase tracking-widest">Bolsa ({carrito.length})</h2>
              <button onClick={() => setMenuAbierto(false)} className="text-slate-400 hover:text-white text-3xl">&times;</button>
            </div>
            
            <div className="p-6 flex-grow overflow-y-auto space-y-4">
              {carrito.length === 0 ? (
                <p className="text-slate-500 text-center mt-10 font-medium">Tu bolsa está vacía.</p>
              ) : (
                carrito.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <img src={item.imagen} className="w-16 h-16 object-cover rounded-lg" alt="img" />
                    <div className="flex-grow">
                      <h4 className="font-bold text-sm">{item.nombre}</h4>
                      <p className="text-indigo-400 text-sm">${item.precio.toLocaleString()}</p>
                    </div>
                    <button onClick={() => {
                      const newC = [...carrito]; newC.splice(i,1); setCarrito(newC);
                    }} className="text-slate-500 hover:text-red-400 text-xl p-2">✕</button>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 bg-slate-950 border-t border-slate-800">
              <div className="flex justify-between mb-6">
                <span className="text-slate-400 font-bold uppercase">Total</span>
                <span className="text-2xl font-black">${total.toLocaleString()} MXN</span>
              </div>
              <button disabled={carrito.length===0} onClick={() => alert('¡Compra simulada! 100 seguro.')} className="w-full bg-indigo-600 disabled:bg-slate-800 disabled:text-slate-500 text-white font-black py-4 rounded-xl hover:bg-indigo-500 transition-colors uppercase tracking-widest">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}