import React, { useState } from 'react';

// Productos individuales y Combos con precios y descuentos
const PRODUCTOS = [
  { id: 1, nombre: "Chamarra Biker Leather", precioOriginal: 1500, precio: 1299, categoria: "Ropa", dest: "-15% OFF", esCombo: false, imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600" },
  { id: 2, nombre: "Sneakers Phantom Black", precioOriginal: 2100, precio: 1899, categoria: "Zapatos", dest: "Nuevo", esCombo: false, imagen: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600" },
  { id: 3, nombre: "Reloj Obsidian Minimal", precioOriginal: 1000, precio: 899, categoria: "Accesorios", dest: "Popular", esCombo: false, imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600" },
  { id: 4, nombre: "Hoodie Heavyweight Gray", precioOriginal: 800, precio: 650, categoria: "Ropa", dest: "-20% OFF", esCombo: false, imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600" },
  
  // COMBOS
  { id: 101, nombre: "Combo Urban Outfit (Hoodie + Sneakers + Reloj)", precioOriginal: 3349, precio: 2699, categoria: "Combos", dest: "🔥 COMBO AHORRO", esCombo: true, imagen: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600" },
  { id: 102, nombre: "Combo Black Tech (Chamarra + Mochila + Gafas)", precioOriginal: 2648, precio: 2099, categoria: "Combos", dest: "⚡ SUPER COMBO", esCombo: true, imagen: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600" },
  
  { id: 5, nombre: "Botas Chelsea Dark", precioOriginal: 1600, precio: 1400, categoria: "Zapatos", dest: "Top Tier", esCombo: false, imagen: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=600" },
  { id: 6, nombre: "Gafas Matrix Tinted", precioOriginal: 500, precio: 399, categoria: "Accesorios", dest: "-20% OFF", esCombo: false, imagen: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600" },
  { id: 7, nombre: "Trench Coat Oversized", precioOriginal: 2500, precio: 2100, categoria: "Ropa", dest: "Exclusivo", esCombo: false, imagen: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=600" },
  { id: 8, nombre: "Mochila Tech Tactical", precioOriginal: 1200, precio: 950, categoria: "Accesorios", dest: "Bestseller", esCombo: false, imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600" }
];

export default function App() {
  const [categoria, setCategoria] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [menuCarrito, setMenuCarrito] = useState(false);
  const [menuMovil, setMenuMovil] = useState(false);
  const [productoVistaRapida, setProductoVistaRapida] = useState(null);
  const [notificacion, setNotificacion] = useState('');
  
  // Sistema de Cupones
  const [cuponInput, setCuponInput] = useState('');
  const [descuentoAplicado, setDescuentoAplicado] = useState(0); // porcentaje

  const filtrados = PRODUCTOS.filter(p => {
    const coincideCat = categoria === 'Todos' || p.categoria === categoria;
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCat && coincideBusqueda;
  });

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    lanzarNotificacion(`¡${producto.nombre} añadido! 🛒`);
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  const aplicarCupon = () => {
    if (cuponInput.trim().toUpperCase() === 'TENORIO10' || cuponInput.trim().toUpperCase() === 'UNI2026') {
      setDescuentoAplicado(10);
      lanzarNotificacion('¡Cupón del 10% aplicado! 🎉');
    } else {
      alert('Cupón no válido. Prueba usando: TENORIO10');
    }
  };

  const lanzarNotificacion = (msg) => {
    setNotificacion(msg);
    setTimeout(() => setNotificacion(''), 3000);
  };

  const subtotal = carrito.reduce((sum, item) => sum + item.precio, 0);
  const montoDescuento = (subtotal * descuentoAplicado) / 100;
  const total = subtotal - montoDescuento;

  return (
    <div className="min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white pb-20 md:pb-0">
      
      {/* BANNER PROMOCIONAL SUPERIOR */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white text-[11px] font-black tracking-widest uppercase py-2 px-4 text-center shadow-lg relative z-50">
        ⚡ OFERTAS EXCLUSIVAS • USA EL CUPÓN <span className="bg-black/30 px-2 py-0.5 rounded border border-white/20">TENORIO10</span> PARA 10% EXTRA ⚡
      </div>

      {/* NOTIFICACIÓN TOAST */}
      {notificacion && (
        <div className="fixed bottom-20 md:bottom-8 right-4 z-[120] bg-indigo-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-2xl border border-indigo-400/30 flex items-center gap-3 animate-bounce">
          <span>✨</span>
          <p className="text-sm">{notificacion}</p>
        </div>
      )}

      {/* NAVBAR RESPONSIVO */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMenuMovil(true)} 
              className="md:hidden p-2 text-slate-400 hover:text-white text-2xl"
            >
              ☰
            </button>
            <h1 className="text-xl sm:text-2xl font-black tracking-tighter bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent uppercase">
              TENORIO <span className="text-white">SHOP</span>
            </h1>
          </div>

          {/* Categorías Desktop */}
          <div className="hidden md:flex gap-8 text-xs font-black uppercase tracking-widest text-slate-400">
            {['Todos', 'Combos', 'Ropa', 'Zapatos', 'Accesorios'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategoria(cat)}
                className={`hover:text-white transition-all py-1 ${categoria === cat ? 'text-indigo-400 border-b-2 border-indigo-500' : ''}`}
              >
                {cat === 'Combos' ? '🔥 Combos' : cat}
              </button>
            ))}
          </div>

          {/* Buscador + Carrito */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Buscar en Tenorio Shop..." 
                value={busqueda} 
                onChange={(e) => setBusqueda(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-full px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 w-44 lg:w-60 transition-all"
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

        {/* Buscador Móvil */}
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
              <h3 className="font-black text-lg tracking-widest uppercase text-indigo-400">Menú Principal</h3>
              <button onClick={() => setMenuMovil(false)} className="text-slate-400 text-3xl">&times;</button>
            </div>
            <div className="flex flex-col space-y-6 text-lg font-black uppercase tracking-wider">
              {['Todos', 'Combos', 'Ropa', 'Zapatos', 'Accesorios'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => { setCategoria(cat); setMenuMovil(false); }}
                  className={`text-left py-2 border-b border-slate-900 ${categoria === cat ? 'text-indigo-400' : 'text-slate-400'}`}
                >
                  {cat === 'Combos' ? '🔥 Combos Especiales' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <div className="pt-20 pb-12 px-4 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none"></div>
        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-black uppercase tracking-widest mb-6">
          Colección Oficial 2026 🔥
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">
          TENORIO <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">SHOP</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto px-4 font-medium">
          La mejor tienda de ropa, zapatos y accesorios con descuentos exclusivos y combos armados para la universidad.
        </p>
      </div>

      {/* GRID DE PRODUCTOS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Filtros en Móvil */}
        <div className="flex md:hidden overflow-x-auto gap-2 pb-4 mb-6 scrollbar-none">
          {['Todos', 'Combos', 'Ropa', 'Zapatos', 'Accesorios'].map(cat => (
            <button 
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase whitespace-nowrap border transition-all ${categoria === cat ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
            >
              {cat === 'Combos' ? '🔥 Combos' : cat}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-8 border-b border-slate-800/80 pb-4">
          <h3 className="text-xl font-black uppercase tracking-wider text-slate-200">
            {categoria} <span className="text-indigo-400 text-xs font-semibold">({filtrados.length})</span>
          </h3>
          {busqueda && <span className="text-xs text-slate-400">Resultados para: "{busqueda}"</span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtrados.map((item) => (
            <div 
              key={item.id} 
              className={`group bg-slate-900/80 rounded-3xl overflow-hidden border ${item.esCombo ? 'border-indigo-500/60 shadow-indigo-500/10' : 'border-slate-800'} hover:border-indigo-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col`}
            >
              <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-950">
                <img 
                  src={item.imagen} 
                  alt={item.nombre} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                />
                
                {/* Insignia de oferta/combo */}
                <span className={`absolute top-4 left-4 px-3.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border shadow-lg ${item.esCombo ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-950/80 backdrop-blur-md border-slate-800 text-indigo-400'}`}>
                  {item.dest}
                </span>

                <button 
                  onClick={() => setProductoVistaRapida(item)}
                  className="absolute bottom-4 right-4 bg-slate-950/80 hover:bg-indigo-600 text-white p-3 rounded-2xl backdrop-blur-md border border-slate-700 transition-all"
                  title="Vista Rápida"
                >
                  👁️
                </button>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{item.categoria}</span>
                <h4 className="font-bold text-lg text-white mb-2 leading-tight">{item.nombre}</h4>
                
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-indigo-400 font-black text-xl">${item.precio.toLocaleString()} MXN</span>
                  <span className="text-slate-500 line-through text-xs font-semibold">${item.precioOriginal.toLocaleString()} MXN</span>
                </div>
                
                <button 
                  onClick={() => agregarAlCarrito(item)} 
                  className="mt-auto w-full bg-slate-800 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-2xl transition-all duration-300 active:scale-95 text-xs uppercase tracking-widest shadow-lg"
                >
                  + Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL VISTA RÁPIDA */}
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
                {productoVistaRapida.esCombo 
                  ? "Aprovecha este combo armado con varios artículos a un precio reducido exclusivo en Tenorio Shop." 
                  : "Prenda y accesorio exclusivo de Tenorio Shop confeccionado con estándares de alta calidad urbana."}
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <div>
                  <span className="text-2xl font-black text-white">${productoVistaRapida.precio.toLocaleString()} MXN</span>
                  <span className="block text-xs text-slate-500 line-through">${productoVistaRapida.precioOriginal.toLocaleString()} MXN</span>
                </div>
                <button 
                  onClick={() => { agregarAlCarrito(productoVistaRapida); setProductoVistaRapida(null); }} 
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-6 py-3.5 rounded-2xl text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/30"
                >
                  Añadir Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CARRITO DE COMPRAS */}
      {menuCarrito && (
        <div className="fixed inset-0 z-[120] flex justify-end bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 h-full flex flex-col border-l border-slate-800 shadow-2xl">
            
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
              <h2 className="text-lg font-black uppercase tracking-widest text-white">Tu Carrito ({carrito.length})</h2>
              <button onClick={() => setMenuCarrito(false)} className="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 flex-grow overflow-y-auto space-y-4">
              {carrito.length === 0 ? (
                <div className="text-center text-slate-500 my-20">
                  <span className="text-5xl block mb-4">🛒</span>
                  <p className="font-bold text-sm">Tu carrito en Tenorio Shop está vacío.</p>
                </div>
              ) : (
                carrito.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                    <img src={item.imagen} className="w-16 h-16 object-cover rounded-xl border border-slate-800" alt={item.nombre} />
                    <div className="flex-grow">
                      <h4 className="font-bold text-sm text-white">{item.nombre}</h4>
                      <p className="text-indigo-400 font-bold text-sm mt-0.5">${item.precio.toLocaleString()} MXN</p>
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

            {/* SECCIÓN DE CUPONES Y TOTAL */}
            <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-4">
              
              {/* Input de Cupón */}
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Código de cupón (ej. TENORIO10)" 
                  value={cuponInput} 
                  onChange={(e) => setCuponInput(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-indigo-500 flex-grow"
                />
                <button 
                  onClick={aplicarCupon} 
                  className="bg-slate-800 hover:bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase"
                >
                  Aplicar
                </button>
              </div>

              {descuentoAplicado > 0 && (
                <div className="flex justify-between text-xs text-emerald-400 font-bold">
                  <span>Descuento ({descuentoAplicado}%):</span>
                  <span>-${montoDescuento.toLocaleString()} MXN</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Total a pagar</span>
                <span className="text-2xl font-black text-white">${total.toLocaleString()} MXN</span>
              </div>

              <button 
                disabled={carrito.length === 0} 
                onClick={() => alert('¡Gracias por tu compra en Tenorio Shop! 💳🎓')} 
                className="w-full bg-indigo-600 disabled:bg-slate-800 disabled:text-slate-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-500 transition-all uppercase tracking-widest text-xs shadow-lg shadow-indigo-600/20"
              >
                Procesar Pago 💳
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER ACTUALIZADO CON TU NOMBRE */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-center text-xs text-slate-500">
        <p className="font-black uppercase tracking-widest text-slate-300 mb-2">
          TENORIO SHOP • CREADO POR TENORIO GARCIA JOSE MANUEL
        </p>
        <p>Proyecto Universitario 2026 • Desarrollado con React, Vite & Tailwind CSS</p>
      </footer>

    </div>
  );
}