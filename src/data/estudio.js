import { photos } from './credits.js'

export const estudio = {
  nombre: 'Estudio Lindero',
  ciudad: 'Rosario',
  desde: 2016,
  bajada:
    'Arquitectura, reformas e interiorismo en Rosario. Trabajamos con lo que el lugar ya tiene: el muro, la luz, el árbol del vecino.',
}

// Los tres principios se muestran como llamadas de detalle del plano.
export const manifiesto = [
  {
    ref: '1',
    lamina: 'A-01',
    titulo: 'Lo que está, se queda',
    texto:
      'Antes de demoler, relevamos. Un muro de ladrillo de cien años no se reemplaza: se limpia, se consolida y se deja ver. Reciclar es la decisión más barata y la más honesta.',
  },
  {
    ref: '2',
    lamina: 'A-02',
    titulo: 'Materiales sin disfraz',
    texto:
      'Hormigón que muestra el encofrado, madera que se aceita y no se laquea, terrazo pulido en obra. Elegimos materiales que envejecen bien y que se pueden reparar.',
  },
  {
    ref: '3',
    lamina: 'A-03',
    titulo: 'La luz se dibuja primero',
    texto:
      'Cada proyecto empieza en el sol: de dónde entra, a qué hora, sobre qué cae. Las aberturas se ubican antes que los muebles.',
  },
]

export const socias = [
  {
    nombre: 'Carla Mansilla',
    rol: 'Arquitecta · dirección de obra',
    formacion: 'FAPyD, UNR, 2009',
    texto: 'Pasa la mitad de la semana en obra. Se ocupa de estructura, costos y de que lo dibujado se construya como se dibujó.',
    foto: { ...photos.estudio[0], alt: 'Carla Mansilla de espaldas, con casco de obra, mirando un plano contra el cielo' },
  },
  {
    nombre: 'Julieta Roldán',
    rol: 'Arquitecta · proyecto e interiores',
    formacion: 'FAPyD, UNR, 2011',
    texto: 'Lleva el proyecto desde el primer croquis hasta el último herraje. Arma los paneles de materiales con cada cliente.',
    foto: { ...photos.estudio[1], alt: 'Julieta Roldán revisando una planta impresa al pie de una escalera' },
  },
]

// Proceso: cadena de cotas con la duración de cada etapa en semanas.
export const proceso = [
  { etapa: 'Relevamiento', semanas: 2, texto: 'Medimos todo, fotografiamos, abrimos catas en muros y pisos.' },
  { etapa: 'Anteproyecto', semanas: 4, texto: 'Plantas, cortes y maqueta. Definimos qué se queda y qué se va.' },
  { etapa: 'Proyecto ejecutivo', semanas: 6, texto: 'Planos de detalle, pliego, cómputo y presupuestos comparados.' },
  { etapa: 'Dirección de obra', semanas: 24, texto: 'Visitas semanales, actas y certificados hasta la entrega de llaves.' },
]

export const contacto = {
  email: 'hola@estudiolindero.com.ar',
  telefono: '+54 9 341 555-0142',
  whatsapp: 'https://wa.me/5493415550142',
  direccion: 'Mendoza 1460, piso 2',
  ciudad: 'Rosario, Santa Fe',
  coordenadas: '32°56′48″ S · 60°38′51″ O',
  horario: 'Lunes a viernes, de 9 a 17',
  instagram: 'https://instagram.com/',
}
