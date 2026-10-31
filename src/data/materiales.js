import { photos } from './credits.js'

const f = photos.materiales

// Muestras del panel de materiales. Proveedores ficticios.
export const materiales = [
  { codigo: 'M-01', nombre: 'Hormigón visto', proveedor: 'Hormigonera del Litoral', detalle: 'H-30 · encofrado fenólico', foto: f[0] },
  { codigo: 'M-02', nombre: 'Roble', proveedor: 'Aserradero Paraná', detalle: 'Europeo · aceitado natural', foto: f[1] },
  { codigo: 'M-03', nombre: 'Terrazo', proveedor: 'Mosaicos Fénix', detalle: 'Granalla 8/12 · pulido en obra', foto: f[2] },
  { codigo: 'M-04', nombre: 'Lino', proveedor: 'Tejeduría Alfa', detalle: 'Lavado · 280 g/m²', foto: f[3] },
  { codigo: 'M-05', nombre: 'Ladrillo común', proveedor: 'Cortadero Coronda', detalle: 'Recuperado · junta tomada', foto: f[4] },
  { codigo: 'M-06', nombre: 'Latón', proveedor: 'Metalúrgica Echesortu', detalle: 'Cepillado · sin barniz', foto: f[5] },
]
