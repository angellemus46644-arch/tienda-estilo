import React, { useState } from 'react';

// Catálogo ampliado
const PRODUCTOS = [
  { id: 1, nombre: "Chamarra Biker Leather", precio: 1299, categoria: "Ropa", dest: "Bestseller", imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600" },
  { id: 2, nombre: "Sneakers Phantom Black", precio: 1899, categoria: "Zapatos", dest: "Nuevo", imagen: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600" },
  { id: 3, nombre: "Reloj Obsidian Minimal", precio: 899, categoria: "Accesorios", dest: "Popular", imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600" },
  { id: 4, nombre: "Hoodie Heavyweight Gray", precio: 650, categoria: "Ropa", dest: "Trending", imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600" },
  { id: 5, nombre: "Botas Chelsea Dark", precio: 1400, categoria: "Zapatos", dest: "Top Tier", imagen: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=600" },
  { id: 6, nombre: "Gafas Matrix Tinted", precio: 399, categoria: "Accesorios", dest: "Oferta", imagen: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600" },
  { id: 7, nombre: "Trench Coat Oversized", precio: 2100, categoria: "Ropa", dest: "Exclusivo", imagen: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=600" },
  { id: 8, nombre: "Tenis High-Top Cyber", precio: 1650, categoria: "Zapatos", dest: "Nuevo", imagen: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600" },
  { id: 9, nombre: "Mochila Tech Tactical", precio: 950, categoria: "Accesorios", dest: "Bestseller", imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600" },
  { id: 10, nombre: "Playera Boxy Fit Pure", precio: 420, categoria: "Ropa", dest: "Esencial", imagen: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600" },
  { id: 11, nombre: "Mocasines Suede Premium", precio: 1250, categoria: "Zapatos", dest: "Elegante", imagen: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=600" },
  { id: 12, nombre: "Cadena de Plata Cubana", precio: 580, categoria: "Accesorios", dest: "Trending", imagen: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600" }
];

export default function App() {
  const [categoria, setCategoria] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [menuCarrito, setMenuCarrito] = useState(false);
  const [menuMovil, setMenuMovil] = useState(false);
  const [productoVistaRapida, setProductoVistaRapida] = useState(null);
  const [notificacion, setNotificacion] = useState('');

  // Filtrado compuesto (Categoría + Búsqueda)
  const filtrados = PRODUCTOS.filter(p => {
    const coincideCat = categoria === 'Todos' || p.categoria === categoria;
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCat && coincideBusqueda;
  });

  // Funciones del Carrito
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    lanzarNotificacion(`¡${producto.nombre} agregado! 🛍️`);
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  const lanzarNotificacion = (msg) => {
    setNotificacion(msg);
    setTimeout(() => setNotificacion(''), 3000);
  };

  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  return (
    <div className="min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white pb-20 md:pb-0">
      
      {/* NOTIFICACIÓN TOAST SLIDE-IN */}
      {notificacion && (
        <div className="fixed bottom-20 md:bottom-8 right-4 z-[120] bg-indigo-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-2xl border border-indigo-400/30 flex items-center gap-3 animate-bounce">
          <span>✨</span>
          <p className="text-sm">{notificacion}</p>
        </div>
      )}

      {/* NAVBAR RESPONSIVO */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            {/* Botón Menú Hamburguesa en Celular */}
            <button 
              onClick={() => setMenuMovil(true)} 
              className="md:hidden p-2 text-slate-400 hover:text-white text-2xl focus:outline-none"
            >
              ☰
            </button>
            <h1 className="text-xl sm:text-2xl font-black tracking-tighter bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-300 bg-clip-text text-transparent uppercase">
              VØID <span className="text-white">STORE</span>
            </h1>
          </div>

          {/* Categorías Desktop */}
          <div className="hidden md:flex gap-8 text-xs font-black uppercase tracking-widest text-slate-400">
            {['Todos', 'Ropa', 'Zapatos', 'Accesorios'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategoria(cat)}
                className={`hover:text-white transition-all py-1 ${categoria === cat ? 'text-indigo-400 border-b-2 border-indigo-500' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Buscador + Carrito */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Buscar prendas..." 
                value={busqueda} 
                onChange={(e) => setBusqueda(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-full px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 w-40 lg:w-56 transition-all"
              />
              {busqueda && (
                <button onClick={() => setBusqueda('')} className="absolute right-3 top-2 text-xs text-slate-500 hover:text-white">✕</button>
              )}
            </div>

            <button 
              onClick={() => setMenuCarrito(true)} 
              className="relative p-3 bg-slate-900 hover:bg-slate-800 rounded-full border border-slate-800 transition-all active:scale-95"
            >
              🛒
              {carrito.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center animate-pulse">
                  {carrito.length}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Buscador Integrado en Móvil */}
        <div className="px-4 pb-3 sm:hidden">
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            value={busqueda} 
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </nav>

      {/* MENÚ MÓVIL DESLIZANTE */}
      {menuMovil && (
        <div className="fixed inset-0 z-[110] bg-slate-950/90 backdrop-blur-md md:hidden">
          <div className="p-6 flex flex-col h-full space-y-8">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="font-black text-lg tracking-widest uppercase text-indigo-400">Navegación</h3>
              <button onClick={() => setMenuMovil(false)} className="text-slate-400 text-3xl">&times;</button>
            </div>
            <div className="flex flex-col space-y-6 text-lg font-black uppercase tracking-wider">
              {['Todos', 'Ropa', 'Zapatos', 'Accesorios'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => { setCategoria(cat); setMenuMovil(false); }}
                  className={`text-left py-2 border-b border-slate-900 ${categoria === cat ? 'text-indigo-400' : 'text-slate-400'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="mt-auto p-4 bg-slate-900/50 rounded-2xl border border-slate-800 text-center">
              <p className="text-xs text-slate-400 font-semibold">Envío Gratis a todo México 🇲🇽</p>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION CON DEGRADADO Y NEÓN */}
      <div className="pt-36 sm:pt-40 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none"></div>
        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-black uppercase tracking-widest mb-6">
          Universidad Edition 2026 🔥
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
          Define Tu <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-200 bg-clip-text text-transparent">Estilo</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto px-4 font-medium">
          Ropa, calzado y accesorios seleccionados para destacar. Diseños vanguardistas con la más alta calidad urbana.
        </p>
      </div>

      {/* GRID DE PRODUCTOS DINÁMICO */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Barra de Filtro Rápido Móvil */}
        <div className="flex md:hidden overflow-x-auto gap-2 pb-4 mb-6 scrollbar-none">
          {['Todos', 'Ropa', 'Zapatos', 'Accesorios'].map(cat => (
            <button 
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase whitespace-nowrap border transition-all ${categoria === cat ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-8 border-b border-slate-800/80 pb-4">
          <h3 className="text-xl font-black uppercase tracking-wider text-slate-200">
            {categoria} <span className="text-indigo-400 text-xs font-semibold">({filtrados.length})</span>
          </h3>
          {busqueda && <span className="text-xs text-slate-400">Buscando: "{busqueda}"</span>}
        </div>

        {filtrados.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800">
            <span className="text-5xl block mb-4">🔍</span>
            <p className="text-slate-400 font-bold">No encontramos artículos con esa búsqueda.</p>
            <button onClick={() => { setCategoria('Todos'); setBusqueda(''); }} className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase">
              Ver Todo el Catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtrados.map((item) => (
              <div 
                key={item.id} 
                className="group bg-slate-900/80 rounded-3xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col"
              >
                <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-950">
                  <img 
                    src={item.imagen} 
                    alt={item.nombre} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                  />
                  
                  {/* Badge Destacado */}
                  <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-800 text-indigo-400">
                    {item.dest}
                  </span>

                  {/* Botón Vista Rápida en Imagen */}
                  <button 
                    onClick={() => setProductoVistaRapida(item)}
                    className="absolute bottom-4 right-4 bg-slate-950/80 hover:bg-indigo-600 text-white p-3 rounded-2xl backdrop-blur-md border border-slate-700 transition-all opacity-100 sm:opacity-0 group-hover:opacity-100"
                    title="Vista Rápida"
                  >
                    👁️
                  </button>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{item.categoria}</span>
                  <h4 className="font-bold text-lg text-white mb-2 leading-tight">{item.nombre}</h4>
                  <p className="text-indigo-400 font-black text-xl mb-6">${item.precio.toLocaleString()} MXN</p>
                  
                  <button 
                    onClick={() => agregarAlCarrito(item)} 
                    className="mt-auto w-full bg-slate-800 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-2xl transition-all duration-300 active:scale-95 text-xs uppercase tracking-widest shadow-lg shadow-black/40"
                  >
                    + Añadir a la Bolsa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* MODAL VISTA RÁPIDA (QUICK VIEW) */}
      {productoVistaRapida && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setProductoVistaRapida(null)} 
              className="absolute top-4 right-4 z-10 bg-slate-950/80 text-white w-10 h-10 rounded-full flex items-center justify-center border border-slate-800 text-xl"
            >
              &times;
            </button>
            <div className="h-64 sm:h-80 overflow-hidden relative">
              <img src={productoVistaRapida.imagen} alt={productoVistaRapida.nombre} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 sm:p-8 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                {productoVistaRapida.categoria}
              </span>
              <h3 className="text-2xl font-black text-white">{productoVistaRapida.nombre}</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Prenda confeccionada con materiales seleccionados para máxima resistencia y confort diario. Edición limitada de la temporada 2026.
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <span className="text-2xl font-black text-white">${productoVistaRapida.precio.toLocaleString()} MXN</span>
                <button 
                  onClick={() => { agregarAlCarrito(productoVistaRapida); setProductoVistaRapida(null); }} 
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-6 py-3.5 rounded-2xl text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/30"
                >
                  Comprar Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CARRITO SIDEBAR SLIDE-IN */}
      {menuCarrito && (
        <div className="fixed inset-0 z-[120] flex justify-end bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 h-full flex flex-col border-l border-slate-800 shadow-2xl animate-fade-in-right">
            
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
              <h2 className="text-lg font-black uppercase tracking-widest text-white">Tu Bolsa ({carrito.length})</h2>
              <button onClick={() => setMenuCarrito(false)} className="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 flex-grow overflow-y-auto space-y-4">
              {carrito.length === 0 ? (
                <div className="text-center text-slate-500 my-20">
                  <span className="text-5xl block mb-4">🛍️</span>
                  <p className="font-bold text-sm">Tu bolsa de compras está vacía.</p>
                </div>
              ) : (
                carrito.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                    <img src={item.imagen} className="w-16 h-16 object-cover rounded-xl border border-slate-800" alt={item.nombre} />
                    <div className="flex-grow">
                      <h4 className="font-bold text-sm text-white">{item.nombre}</h4>
                      <p className="text-indigo-400 font-bold text-sm mt-0.5">${item.precio.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => eliminarDelCarrito(i)} 
                      className="text-slate-500 hover:text-rose-500 p-2 text-lg transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Total</span>
                <span className="text-2xl font-black text-white">${total.toLocaleString()} MXN</span>
              </div>
              <button 
                disabled={carrito.length === 0} 
                onClick={() => alert('¡Simulación de pago exitosa para la Universidad! 💳🎓')} 
                className="w-full bg-indigo-600 disabled:bg-slate-800 disabled:text-slate-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-500 transition-all uppercase tracking-widest text-xs shadow-lg shadow-indigo-600/20"
              >
                Procesar Pago 💳
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-center text-xs text-slate-500">
        <p className="font-black uppercase tracking-widest text-slate-400 mb-2">VØID Store • Proyecto Académico 2026</p>
        <p>Desarrollado con React, Vite & Tailwind CSS</p>
      </footer>

    </div>
  );
}