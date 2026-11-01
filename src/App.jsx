import React, { useState, useEffect } from 'react';

// Catálogo de Productos
const PRODUCTOS = [
  { id: 1, nombre: "Chamarra Biker Leather", precioOriginal: 1500, precio: 1299, categoria: "Ropa", dest: "-15% OFF", esCombo: false, imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600" },
  { id: 2, nombre: "Sneakers Phantom Black", precioOriginal: 2100, precio: 1899, categoria: "Zapatos", dest: "Nuevo", esCombo: false, imagen: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600" },
  { id: 3, nombre: "Reloj Obsidian Minimal", precioOriginal: 1000, precio: 899, categoria: "Accesorios", dest: "Popular", esCombo: false, imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600" },
  { id: 101, nombre: "Combo Urban Outfit", precioOriginal: 3349, precio: 2699, categoria: "Combos", dest: "🔥 AHORRO", esCombo: true, imagen: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600" },
  { id: 4, nombre: "Hoodie Heavyweight", precioOriginal: 800, precio: 650, categoria: "Ropa", dest: "-20% OFF", esCombo: false, imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600" },
  { id: 5, nombre: "Mochila Tech Tactical", precioOriginal: 1200, precio: 950, categoria: "Accesorios", dest: "Bestseller", esCombo: false, imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600" }
];

// Datos del Equipo usando los nombres de archivo exactos
const EQUIPO = [
  { id: 1, nombre: "Miembro del Equipo 1", rol: "Desarrollador Web", foto: "/img/1000212456.jpg" },
  { id: 2, nombre: "Miembro del Equipo 2", rol: "Diseñador UI/UX", foto: "/img/1000212459.jpg" },
  { id: 3, nombre: "Miembro del Equipo 3", rol: "Marketing Digital", foto: "/img/1000212457.jpeg" },
  { id: 4, nombre: "Miembro del Equipo 4", rol: "Gestión de Ventas", foto: "/img/1000212458.jpg" }
];

export default function App() {
  const [vistaActual, setVistaActual] = useState('inicio'); 
  const [categoria, setCategoria] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [menuCarrito, setMenuCarrito] = useState(false);
  const [menuMovil, setMenuMovil] = useState(false);
  const [productoVistaRapida, setProductoVistaRapida] = useState(null);
  const [notificacion, setNotificacion] = useState('');
  
  const [cuponInput, setCuponInput] = useState('');
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);

  useEffect(() => {
    if (busqueda.length > 0 && vistaActual !== 'productos') {
      setVistaActual('productos');
    }
  }, [busqueda]);

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
    if (cuponInput.trim().toUpperCase() === 'OFERTA10' || cuponInput.trim().toUpperCase() === 'UNI2026') {
      setDescuentoAplicado(10);
      lanzarNotificacion('¡Cupón del 10% aplicado! 🎉');
    } else {
      alert('Cupón no válido. Prueba usando: OFERTA10');
    }
  };

  const lanzarNotificacion = (msg) => {
    setNotificacion(msg);
    setTimeout(() => setNotificacion(''), 3000);
  };

  const subtotal = carrito.reduce((sum, item) => sum + item.precio, 0);
  const montoDescuento = (subtotal * descuentoAplicado) / 100;
  const total = subtotal - montoDescuento;

  const renderInicio = () => (
    <div className="pt-20 pb-16 px-4 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[600px] h-80 sm:h-[600px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter mb-6 leading-none relative z-10 hover:scale-105 transition-transform duration-500">
        Bienvenido a <br/>
        <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">TIENDA ONLINE</span>
      </h2>
      <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 font-medium relative z-10">
        Tu destino definitivo para moda urbana, calzado exclusivo y accesorios de vanguardia. Ofrecemos calidad premium y combos diseñados especialmente para ti.
      </p>
      <button 
        onClick={() => setVistaActual('productos')}
        className="relative z-10 bg-indigo-600 hover:bg-indigo-500 text-white font-black px-8 py-4 rounded-full text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all hover:scale-110 active:scale-95"
      >
        Explorar Catálogo 🚀
      </button>
    </div>
  );

  const renderConocenos = () => (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-fade-in">
      <h2 className="text-4xl font-black uppercase tracking-tighter mb-12 text-center text-white">Quiénes Somos</h2>
      
      {/* HISTORIA Y MISIÓN */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/50 transition-colors duration-300">
          <h3 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center gap-2">📖 Nuestra Historia</h3>
          <p className="text-slate-300 leading-relaxed">
            Fundada en 2026 por un equipo de estudiantes apasionados por la tecnología y la moda, Tienda Online nació como un proyecto visionario para ofrecer a los jóvenes universitarios y profesionales opciones accesibles, modernas y de alta calidad. Empezamos como un proyecto local y ahora hacemos envíos a todo México.
          </p>
        </div>
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition-colors duration-300">
          <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">🎯 Misión y Visión</h3>
          <ul className="space-y-4 text-slate-300">
            <li><strong className="text-white">Misión:</strong> Empoderar a nuestros clientes a través de prendas y accesorios que reflejen su identidad única, ofreciendo excelencia en cada transacción.</li>
            <li><strong className="text-white">Visión:</strong> Consolidarnos como la plataforma de e-commerce líder en moda urbana a nivel nacional, destacando por nuestra innovación.</li>
          </ul>
        </div>
      </div>

      {/* SECCIÓN DEL EQUIPO (FOTOS INTEGRADAS) */}
      <div className="mb-16">
        <h3 className="text-3xl font-black uppercase tracking-tighter mb-10 text-center text-white">Nuestro Equipo</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {EQUIPO.map((miembro) => (
            <div key={miembro.id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-center group hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:border-indigo-500/50">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-slate-800 group-hover:border-indigo-500 transition-colors duration-300">
                <img src={miembro.foto} alt={miembro.nombre} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-black text-lg text-white mb-1">{miembro.nombre}</h4>
              <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest">{miembro.rol}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 p-8 rounded-3xl border border-indigo-500/30 text-center shadow-2xl">
        <h3 className="text-xl font-black uppercase text-white mb-6">Nuestros Valores Principales</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {['Innovación constante', 'Calidad garantizada', 'Atención personalizada', 'Responsabilidad social'].map((valor, i) => (
            <span key={i} className="px-5 py-2.5 bg-slate-950 rounded-full text-indigo-300 text-sm font-bold border border-slate-800 hover:border-indigo-400 hover:bg-slate-800 transition-all cursor-default">
              ✔️ {valor}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProductos = () => (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      <div className="flex overflow-x-auto gap-2 pb-4 mb-6 scrollbar-none justify-center">
        {['Todos', 'Combos', 'Ropa', 'Zapatos', 'Accesorios'].map(cat => (
          <button 
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase whitespace-nowrap border transition-all ${categoria === cat ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtrados.map((item) => (
          <div key={item.id} className={`group bg-slate-900/80 rounded-3xl overflow-hidden border ${item.esCombo ? 'border-indigo-500/60 shadow-lg shadow-indigo-500/10' : 'border-slate-800'} hover:border-indigo-500 transition-all duration-300 flex flex-col hover:-translate-y-2`}>
            <div className="relative h-72 overflow-hidden flex items-center justify-center bg-slate-950">
              <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
              <span className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 text-[10px] font-black uppercase rounded-full shadow-lg border border-indigo-400">{item.dest}</span>
              <button onClick={() => setProductoVistaRapida(item)} className="absolute bottom-4 right-4 bg-slate-950/80 hover:bg-indigo-500 text-white p-3 rounded-2xl backdrop-blur-md transition-all border border-slate-700">👁️ Vista Rápida</button>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-[10px] font-black uppercase text-slate-500 mb-1 tracking-widest">{item.categoria}</span>
              <h4 className="font-bold text-lg text-white mb-2">{item.nombre}</h4>
              <div className="flex gap-3 mb-6 items-baseline">
                <span className="text-indigo-400 font-black text-xl">${item.precio} MXN</span>
                <span className="text-slate-500 line-through text-xs font-semibold">${item.precioOriginal}</span>
              </div>
              <button onClick={() => agregarAlCarrito(item)} className="mt-auto w-full bg-slate-800 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-xl transition-all text-xs uppercase tracking-widest shadow-lg active:scale-95">+ Añadir al Carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContacto = () => (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-fade-in">
      <h2 className="text-4xl font-black uppercase tracking-tighter mb-12 text-center text-white">Contáctanos</h2>
      
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6">Envíanos un mensaje</h3>
          <form onSubmit={(e) => { e.preventDefault(); alert("¡Mensaje enviado con éxito!"); }} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Nombre Completo</label>
              <input type="text" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Ej. Juan Pérez" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Correo Electrónico</label>
              <input type="email" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="tucorreo@ejemplo.com" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Mensaje</label>
              <textarea required rows="4" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="¿En qué te podemos ayudar?"></textarea>
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest text-xs active:scale-95 shadow-lg shadow-indigo-600/30">Enviar Mensaje ✉️</button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl hover:border-indigo-500/30 transition-colors">
            <h3 className="text-xl font-bold text-white mb-6">Información de Sucursal Matriz</h3>
            <ul className="space-y-5 text-slate-300 text-sm">
              <li className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800"><span className="text-xl">📍</span> <span>Tijuana, Baja California, México</span></li>
              <li className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800"><span className="text-xl">📞</span> <span>+52 555 000 0000</span></li>
              <li className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800"><span className="text-xl">✉️</span> <span>contacto@tiendaonline.com.mx</span></li>
            </ul>
          </div>
          
          <div className="rounded-3xl overflow-hidden border border-slate-800 h-64 bg-slate-900 shadow-xl group">
            <iframe 
              title="Ubicacion Tienda Online"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107693.41405105658!2d-117.07062402242125!3d32.49692487455856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9390226587cbbe%3A0x6bd77e77ba304381!2sTijuana%2C%20B.C.!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="group-hover:opacity-80 transition-opacity"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-950 text-slate-100 selection:bg-indigo-500 pb-20 md:pb-0">
      
      {/* BANNER PROMOCIONAL SUPERIOR */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white text-[11px] font-black tracking-widest uppercase py-2 px-4 text-center shadow-lg relative z-50">
        ⚡ OFERTAS EXCLUSIVAS • USA EL CUPÓN <span className="bg-black/30 px-2 py-0.5 rounded border border-white/20">OFERTA10</span> PARA 10% EXTRA ⚡
      </div>

      {notificacion && (
        <div className="fixed bottom-20 md:bottom-8 right-4 z-[120] bg-indigo-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-up">
          <span>✨</span><p className="text-sm">{notificacion}</p>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setMenuMovil(true)} className="md:hidden text-2xl text-slate-400 hover:text-white transition-colors">☰</button>
            <h1 onClick={() => setVistaActual('inicio')} className="cursor-pointer text-xl sm:text-2xl font-black bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent uppercase hover:scale-105 transition-transform">
              TIENDA <span className="text-white">ONLINE</span>
            </h1>
          </div>

          <nav className="hidden md:flex gap-6 text-xs font-black uppercase tracking-widest text-slate-400">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'conocenos', label: 'Conócenos' },
              { id: 'productos', label: 'Catálogo' },
              { id: 'contacto', label: 'Contacto' }
            ].map(item => (
              <button 
                key={item.id} 
                onClick={() => setVistaActual(item.id)}
                className={`hover:text-white transition-all py-1 ${vistaActual === item.id ? 'text-indigo-400 border-b-2 border-indigo-500' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Buscar productos..." 
                value={busqueda} 
                onChange={(e) => setBusqueda(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-full px-5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 w-56 transition-all"
              />
            </div>
            <button onClick={() => setMenuCarrito(true)} className="relative p-3 bg-slate-900 rounded-full border border-slate-800 hover:bg-slate-800 transition-colors active:scale-95">
              🛒
              {carrito.length > 0 && <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center animate-pulse">{carrito.length}</span>}
            </button>
          </div>
        </div>
      </header>

      {menuMovil && (
        <div className="fixed inset-0 z-[110] bg-slate-950/95 md:hidden p-6 flex flex-col animate-fade-in">
          <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
            <h3 className="font-black text-lg text-indigo-400 uppercase tracking-widest">Navegación</h3>
            <button onClick={() => setMenuMovil(false)} className="text-3xl text-slate-400">&times;</button>
          </div>
          <input type="text" placeholder="Buscar..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-full bg-slate-900 rounded-xl px-4 py-3 mb-8 text-white border border-slate-800" />
          <nav className="flex flex-col space-y-6 text-lg font-black uppercase tracking-wider">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'conocenos', label: 'Conócenos' },
              { id: 'productos', label: 'Productos' },
              { id: 'contacto', label: 'Contacto' }
            ].map(item => (
              <button 
                key={item.id} 
                onClick={() => { setVistaActual(item.id); setMenuMovil(false); }}
                className={`text-left border-b border-slate-900 pb-3 ${vistaActual === item.id ? 'text-indigo-400' : 'text-slate-400'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      <main className="flex-grow">
        {vistaActual === 'inicio' && renderInicio()}
        {vistaActual === 'conocenos' && renderConocenos()}
        {vistaActual === 'productos' && renderProductos()}
        {vistaActual === 'contacto' && renderContacto()}
      </main>

      {productoVistaRapida && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-slate-800">
            <button onClick={() => setProductoVistaRapida(null)} className="absolute top-4 right-4 z-10 bg-slate-950/80 text-white w-10 h-10 rounded-full border border-slate-700 hover:bg-slate-800 transition-colors">&times;</button>
            <img src={productoVistaRapida.imagen} alt={productoVistaRapida.nombre} className="w-full h-72 object-cover" />
            <div className="p-8">
              <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">{productoVistaRapida.categoria}</span>
              <h3 className="text-2xl font-black text-white mt-3 mb-2">{productoVistaRapida.nombre}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">Producto oficial Tienda Online. Calidad premium garantizada con materiales de alta resistencia para el uso diario.</p>
              <div className="flex justify-between items-center pt-6 border-t border-slate-800">
                <span className="text-3xl font-black text-white">${productoVistaRapida.precio} MXN</span>
                <button onClick={() => { agregarAlCarrito(productoVistaRapida); setProductoVistaRapida(null); }} className="bg-indigo-600 hover:bg-indigo-500 transition-colors px-8 py-3.5 rounded-xl text-white font-black text-xs uppercase tracking-widest shadow-lg active:scale-95">Añadir</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {menuCarrito && (
        <div className="fixed inset-0 z-[120] flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 h-full flex flex-col shadow-2xl border-l border-slate-800">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
              <h2 className="text-lg font-black uppercase text-white tracking-widest">Bolsa de Compras ({carrito.length})</h2>
              <button onClick={() => setMenuCarrito(false)} className="text-3xl text-slate-400 hover:text-white transition-colors">&times;</button>
            </div>
            <div className="p-6 flex-grow overflow-y-auto space-y-4">
              {carrito.length === 0 ? (
                <div className="text-center text-slate-500 mt-20">
                  <span className="text-6xl block mb-4">🛍️</span>
                  <p className="font-bold text-sm">Tu carrito está vacío.</p>
                </div>
              ) : 
                carrito.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                    <img src={item.imagen} className="w-16 h-16 object-cover rounded-xl border border-slate-800" alt="" />
                    <div className="flex-grow">
                      <h4 className="font-bold text-sm text-white">{item.nombre}</h4>
                      <p className="text-indigo-400 font-bold text-sm mt-1">${item.precio}</p>
                    </div>
                    <button onClick={() => eliminarDelCarrito(i)} className="text-slate-500 hover:text-rose-500 text-xl transition-colors p-2">✕</button>
                  </div>
                ))
              }
            </div>
            
            <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-5">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Código (ej. OFERTA10)" 
                  value={cuponInput} 
                  onChange={(e) => setCuponInput(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white uppercase focus:outline-none focus:border-indigo-500 flex-grow transition-colors"
                />
                <button 
                  onClick={aplicarCupon} 
                  className="bg-slate-800 hover:bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs uppercase transition-colors"
                >
                  Aplicar
                </button>
              </div>

              {descuentoAplicado > 0 && (
                <div className="flex justify-between text-xs text-emerald-400 font-bold bg-emerald-400/10 p-3 rounded-lg border border-emerald-400/20">
                  <span>Descuento aplicado ({descuentoAplicado}%):</span>
                  <span>-${montoDescuento.toLocaleString()} MXN</span>
                </div>
              )}

              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 uppercase text-xs font-black tracking-widest">Total a pagar</span>
                <span className="text-3xl font-black text-white">${total} MXN</span>
              </div>
              <button disabled={carrito.length === 0} onClick={() => alert('¡Gracias por tu compra en Tienda Online! 💳🎓')} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 transition-all text-white font-black py-4 rounded-xl uppercase tracking-widest text-xs shadow-lg active:scale-95">Finalizar Compra 💳</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 px-4 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 border-b border-slate-800 pb-12">
          
          <div>
            <h4 className="text-white font-black uppercase mb-5 text-sm tracking-widest">Servicios Adicionales</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Rastreo y Seguimiento de Órdenes</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Política de Devolución y Cancelación</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Formas de Pago Múltiples</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Chat de Soporte en Vivo</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase mb-5 text-sm tracking-widest">Acerca de nosotros</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li><a href="#" onClick={(e) => { e.preventDefault(); setVistaActual('conocenos'); }} className="hover:text-indigo-400 transition-colors">Conoce nuestra historia</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Preguntas Frecuentes (FAQ)</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Aviso de Privacidad</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Mapa del sitio</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase mb-5 text-sm tracking-widest">Contacto Directo</h4>
            <div className="space-y-4 text-xs text-slate-400">
              <p className="flex items-center gap-3"><span className="text-lg">📞</span> <span>+52 555 000 0000</span></p>
              <p className="flex items-center gap-3"><span className="text-lg">✉️</span> <span>contacto@tiendaonline.com.mx</span></p>
              <p className="flex items-center gap-3"><span className="text-lg">📍</span> <span>Tijuana, Baja California, México</span></p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase mb-5 text-sm tracking-widest">Síguenos</h4>
            <div className="flex gap-4">
              <button className="bg-slate-900 w-12 h-12 rounded-full flex items-center justify-center border border-slate-800 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white transition-all hover:-translate-y-1 shadow-lg">FB</button>
              <button className="bg-slate-900 w-12 h-12 rounded-full flex items-center justify-center border border-slate-800 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white transition-all hover:-translate-y-1 shadow-lg">IG</button>
              <button className="bg-slate-900 w-12 h-12 rounded-full flex items-center justify-center border border-slate-800 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white transition-all hover:-translate-y-1 shadow-lg">TW</button>
            </div>
          </div>

        </div>

        <div className="text-center text-xs text-slate-500 space-y-2">
          <p className="font-black uppercase tracking-widest text-indigo-400">
            TIENDA ONLINE • PROYECTO UNIVERSITARIO 2026
          </p>
          <p>Diseño de Sitio Web • Todos los derechos reservados</p>
        </div>
      </footer>

      {/* Estilos globales añadidos mediante Tailwind Arbitrary Values o clases directas */}
      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
        .animate-slide-up { animation: slideUp 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}