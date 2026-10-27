import React, { useState } from 'react';

// Base de datos simulada de nuestros productos
const PRODUCTOS = [
  { id: 1, nombre: "Chamarra de Cuero Vintage", precio: 1299, categoria: "Ropa", imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600" },
  { id: 2, nombre: "Tenis Urbanos Classic", precio: 899, categoria: "Zapatos", imagen: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600" },
  { id: 3, nombre: "Reloj Minimalista Negro", precio: 599, categoria: "Accesorios", imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600" },
  { id: 4, nombre: "Sudadera Oversize Gris", precio: 450, categoria: "Ropa", imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600" },
  { id: 5, nombre: "Botas de Combate", precio: 1100, categoria: "Zapatos", imagen: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=600" },
  { id: 6, nombre: "Gafas de Sol Retro", precio: 299, categoria: "Accesorios", imagen: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600" }
];

export default function App() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [carrito, setCarrito] = useState([]);
  const [isCarritoAbierto, setIsCarritoAbierto] = useState(false);

  // Filtrar productos
  const productosFiltrados = categoriaActiva === 'Todos' 
    ? PRODUCTOS 
    : PRODUCTOS.filter(p => p.categoria === categoriaActiva);

  // Funciones del carrito
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    setIsCarritoAbierto(true);
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  const totalCarrito = carrito.reduce((total, item) => total + item.precio, 0);

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-slate-50 selection:bg-black selection:text-white">
      
      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">✨</span>
            <h1 className="text-2xl font-black tracking-tighter uppercase">Style<span className="text-slate-400">Store</span></h1>
          </div>

          <div className="hidden md:flex space-x-8 font-semibold text-sm text-slate-500 uppercase tracking-widest">
            <button onClick={() => setCategoriaActiva('Todos')} className={`hover:text-black transition-colors ${categoriaActiva === 'Todos' ? 'text-black border-b-2 border-black pb-1' : ''}`}>Todo</button>
            <button onClick={() => setCategoriaActiva('Ropa')} className={`hover:text-black transition-colors ${categoriaActiva === 'Ropa' ? 'text-black border-b-2 border-black pb-1' : ''}`}>Ropa</button>
            <button onClick={() => setCategoriaActiva('Zapatos')} className={`hover:text-black transition-colors ${categoriaActiva === 'Zapatos' ? 'text-black border-b-2 border-black pb-1' : ''}`}>Zapatos</button>
            <button onClick={() => setCategoriaActiva('Accesorios')} className={`hover:text-black transition-colors ${categoriaActiva === 'Accesorios' ? 'text-black border-b-2 border-black pb-1' : ''}`}>Accesorios</button>
          </div>

          <button onClick={() => setIsCarritoAbierto(true)} className="relative p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
            <span className="text-xl">🛍️</span>
            {carrito.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                {carrito.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO BANNER */}
      <div className="bg-slate-900 text-white py-20 px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">Nueva Colección 2026</h2>
        <p className="text-slate-400 max-w-xl mx-auto mb-8">Descubre los estilos más frescos de la temporada. Envío gratis en todas tus compras universitarias.</p>
      </div>

      {/* PRODUCT GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <h3 className="text-2xl font-black uppercase tracking-tight">{categoriaActiva === 'Todos' ? 'Nuestros Productos' : categoriaActiva}</h3>
          <span className="text-sm text-slate-500 font-semibold">{productosFiltrados.length} artículos</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {productosFiltrados.map((producto) => (
            <div key={producto.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="relative h-80 overflow-hidden bg-slate-100">
                <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-black uppercase tracking-widest rounded-full shadow-sm">
                  {producto.categoria}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="font-bold text-lg mb-1 leading-tight">{producto.nombre}</h4>
                <p className="text-slate-500 font-medium mb-6">${producto.precio.toLocaleString('es-MX')} MXN</p>
                <button onClick={() => agregarAlCarrito(producto)} className="mt-auto w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 active:scale-95">
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* CARRITO DE COMPRAS (SIDEBAR) */}
      {isCarritoAbierto && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-fade-in-right">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-black uppercase tracking-tight">Tu Carrito 🛒</h2>
              <button onClick={() => setIsCarritoAbierto(false)} className="text-slate-400 hover:text-black text-2xl leading-none">&times;</button>
            </div>

            <div className="p-6 flex-grow overflow-y-auto space-y-6">
              {carrito.length === 0 ? (
                <div className="text-center text-slate-500 mt-10">
                  <span className="text-5xl block mb-4">💨</span>
                  <p className="font-medium">Tu carrito está vacío.</p>
                </div>
              ) : (
                carrito.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <img src={item.imagen} alt={item.nombre} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                    <div className="flex-grow">
                      <h4 className="font-bold text-sm leading-tight">{item.nombre}</h4>
                      <p className="text-slate-500 text-sm font-medium mt-1">${item.precio.toLocaleString('es-MX')}</p>
                    </div>
                    <button onClick={() => eliminarDelCarrito(index)} className="text-slate-300 hover:text-red-500 p-2 text-xl transition-colors">
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 font-bold uppercase tracking-widest text-sm">Total a pagar</span>
                <span className="text-2xl font-black">${totalCarrito.toLocaleString('es-MX')}</span>
              </div>
              <button 
                disabled={carrito.length === 0} 
                className="w-full bg-black disabled:bg-slate-300 text-white font-black py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                onClick={() => alert('¡Simulación de compra exitosa para la Universidad! 🎓')}
              >
                Proceder al Pago 💳
              </button>
            </div>

          </div>
        </div>
      )}
      
      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center text-sm">
        <p className="font-bold uppercase tracking-widest mb-2">StyleStore • Proyecto Universitario</p>
        <p>Desarrollado con React & Tailwind CSS</p>
      </footer>
    </div>
  );
}