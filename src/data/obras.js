import { photos } from './credits.js'
import almacenOrono from './plans/almacen-orono.js'
import casaFunes from './plans/casa-funes.js'
import casaPatioAlberdi from './plans/casa-patio-alberdi.js'
import departamentoPichincha from './plans/departamento-pichincha.js'
import oficinasRibera from './plans/oficinas-ribera.js'

// Suma los textos alternativos a las fotos registradas en credits.js.
const withAlt = (slug, alts) => photos[slug].map((p, i) => ({ ...p, alt: alts[i] }))

export const obras = [
  {
    slug: 'casa-funes',
    numero: '01',
    nombre: 'Casa Funes',
    tipo: 'Vivienda nueva',
    ubicacion: 'Funes, Santa Fe',
    m2: 186,
    anio: 2024,
    estado: 'Terminada',
    equipo: ['Carla Mansilla', 'Julieta Roldán', 'Tomás Ferreyra', 'Ing. Lucía Ortega (estructura)'],
    materiales: ['Hormigón visto', 'Cemento alisado', 'Paraíso', 'Aluminio negro'],
    bajada: 'Una sola planta bajo una losa de hormigón visto, abierta de punta a punta a la galería.',
    texto: [
      'Un lote de 20 × 50 en Funes, con el sol entrando de costado y un vecino que iba a levantar dos pisos sobre la medianera norte. La familia quería una casa en una sola planta, sin pasillos largos y con la cocina en el centro de todo.',
      'Partimos la casa en dos barras. Adelante, el estar y la cocina-comedor: un solo espacio de 14 metros bajo una losa de hormigón visto que quedó tal como salió del encofrado. Atrás, separada por un tabique de hormigón, el ala de los dormitorios.',
      'La galería de tres metros hace de alero hacia el sur y lleva la vida afuera nueve meses al año. Las carpinterías corren de muro a muro: con todo abierto, el estar y la galería son el mismo piso de cemento alisado.',
    ],
    fotos: withAlt('casa-funes', [
      'Cocina y comedor bajo la losa de hormigón visto, con la isla de madera y el ventanal abierto a la galería',
      'Estar con ventanales de piso a techo hacia el parque y un sillón claro',
      'Isla de cocina enchapada en madera, con mesada de piedra y banquetas',
      'Comedor con mesa larga de madera junto a los ventanales y la columna de hormigón',
      'Mesa ratona baja de madera sobre una alfombra, con libros encima',
      'Mesa del comedor y alacena vidriada, vista desde la cocina',
      'Cocina y comedor de punta a punta, con la columna de hormigón y las carpinterías negras',
    ]),
    plan: casaFunes,
  },
  {
    slug: 'departamento-pichincha',
    numero: '02',
    nombre: 'Departamento Pichincha',
    tipo: 'Reforma integral',
    ubicacion: 'Pichincha, Rosario',
    m2: 74,
    anio: 2023,
    estado: 'Terminada',
    equipo: ['Julieta Roldán', 'Carla Mansilla', 'Martina Sosa'],
    materiales: ['Terrazo', 'Guatambú', 'Pinotea recuperada', 'Cal'],
    bajada: 'Un tres ambientes de 1952 que ganó un living abriendo la cocina con una barra de terrazo.',
    texto: [
      'Un tres ambientes de 1952 en Pichincha, con la cocina encerrada al fondo y un pasillo que se comía el quince por ciento de la superficie. Los pisos de pinotea estaban abajo de un flotante; el resto, para recuperar.',
      'Tiramos el muro entre la cocina y el estar y convertimos el pasillo en un hall que se abre al living. La cocina pasó a ser una barra de terrazo que ordena el espacio sin cerrarlo.',
      'Muebles de guatambú hechos a medida, mesadas de terrazo con granalla gris y la carpintería original del balcón restaurada en lugar de cambiada. Son 74 m² que se viven como 90.',
    ],
    fotos: withAlt('departamento-pichincha', [
      'Estar y cocina integrados: sillón gris, barra de terrazo y la puerta al balcón al fondo',
      'Estar con sillón gris, sillas de caño tapizadas en bordó y ventana al balcón',
      'Barra de terrazo gris con banquetas blancas y alacena de madera oscura',
      'Mesada de terrazo con bacha de acero y muebles de madera oscura',
      'Dormitorio chico con cama de madera, ventana y dos discos celestes en la pared',
      'Baño con revestimiento vertical de cerámica marrón y vanitory de madera oscura',
      'Hall blanco con puertas en arco y piso de madera oscura',
      'Detalle de la barra de terrazo con un florero de vidrio y ramas',
    ]),
    plan: departamentoPichincha,
  },
  {
    slug: 'almacen-orono',
    numero: '03',
    nombre: 'Almacén Oroño',
    tipo: 'Café / local comercial',
    ubicacion: 'Bv. Oroño, Rosario',
    m2: 62,
    anio: 2025,
    estado: 'Terminada',
    equipo: ['Carla Mansilla', 'Julieta Roldán', 'Tomás Ferreyra'],
    materiales: ['Ladrillo común', 'Roble', 'Granito negro', 'Latón'],
    bajada: 'Un almacén de 1930 que volvió a abrir por la ochava, con el ladrillo pelado y una sola pieza nueva: la barra.',
    texto: [
      'Un almacén de barrio de 1930, en una esquina de Oroño, cerrado desde hacía diez años. Muros de ladrillo bajo tres capas de pintura, vidrieras de madera con los vidrios rotos y una ochava que nadie usaba.',
      'La regla fue no sumar nada que compitiera con lo que había: el ladrillo pelado, las carpinterías reparadas y una sola pieza nueva, la barra, que corre de la vidriera hacia el fondo.',
      'La entrada volvió a la ochava, como en el almacén original. La cuadra se ve desde el salón, así el pan se hace a la vista. La luz es cálida y baja, para que de noche el local se lea desde la calle.',
    ],
    fotos: withAlt('almacen-orono', [
      'Salón en penumbra con ventanales altos de madera, muro de ladrillo y la barra con la cafetera',
      'Barista trabajando en la barra, recortado contra el ventanal',
      'Ventanal alto de madera con luz de tarde sobre la mesada de la barra',
      'Carpintería original con vidrios repartidos y una lámpara colgante de chapa',
      'Vitrina de facturas y panes bajo luz cálida',
      'Cuadra con panaderos trabajando al fondo del local',
    ]),
    plan: almacenOrono,
  },
  {
    slug: 'casa-patio-alberdi',
    numero: '04',
    nombre: 'Casa Patio Alberdi',
    tipo: 'Reciclaje de casa chorizo',
    ubicacion: 'Alberdi, Rosario',
    m2: 140,
    anio: 2022,
    estado: 'Terminada',
    equipo: ['Julieta Roldán', 'Carla Mansilla', 'Martina Sosa', 'Ing. Lucía Ortega (estructura)'],
    materiales: ['Ladrillo recuperado', 'Revoque a la cal', 'Chapa plegada', 'Bloque de vidrio'],
    bajada: 'Restar en vez de sumar: dos habitaciones demolidas que hoy son el patio por donde respira la casa.',
    texto: [
      'Una casa chorizo de 1920 en Alberdi: habitaciones en fila, una galería larga y oscura y un patio de fondo al que nunca le llegaba el sol. La familia necesitaba menos cuartos y más luz.',
      'En vez de sumar metros, restamos. Demolimos las dos habitaciones del medio y las convertimos en un patio. La casa ahora respira por el centro y todos los ambientes miran a algo verde.',
      'Revoques a la cal sobre el ladrillo original, carpinterías de chapa plegada pintadas de rojo, como las de las casas del barrio, y bloques de vidrio para pasar luz al lavadero sin perder intimidad. Los ladrillos de la demolición volvieron como solado del patio.',
    ],
    fotos: withAlt('casa-patio-alberdi', [
      'Patio central con un árbol joven, muros revocados y la cocina iluminada al fondo, enmarcada por carpinterías rojas',
      'Fachada sobre la vereda con el portón de chapa rojo y los muros grises',
      'Cocina con barra de madera, lámparas de globo y muro de bloques de vidrio',
      'Galería interior con lámparas de globo y vista al patio por un vano',
      'Vista desde la cocina hacia el patio, con la puerta roja abierta',
      'Muro de bloques de vidrio junto a la carpintería roja de la galería',
      'Patio de fondo con piso de granza, mesas plegables y la galería vidriada',
      'Estudio con escritorio bajo la ventana roja que da al patio',
    ]),
    plan: casaPatioAlberdi,
  },
  {
    slug: 'oficinas-ribera',
    numero: '05',
    nombre: 'Oficinas Ribera',
    tipo: 'Interiorismo de oficina',
    ubicacion: 'Zona ribera, Rosario',
    m2: 210,
    anio: 2026,
    estado: 'En obra',
    equipo: ['Carla Mansilla', 'Julieta Roldán', 'Tomás Ferreyra', 'Martina Sosa'],
    materiales: ['Hormigón existente', 'Placa de yeso', 'Vidrio laminado', 'Linóleo'],
    bajada: 'Un ex depósito portuario que se vuelve oficina sin perder la planta libre ni la luz del río.',
    texto: [
      'Un depósito portuario de 1940 sobre la ribera, que una consultora de ingeniería alquiló para mudar a sus dieciocho personas. Planta libre, columnas de hormigón cada 3,50 m y un cielorraso con molduras de cuando el edificio fue oficina de aduana.',
      'La idea es dejar la planta libre lo más libre posible: los cerramientos nuevos se agrupan contra el muro este, y las salas que necesitan intimidad llevan tabiques vidriados para no cortar la luz que entra desde el río.',
      'La obra está en etapa de tabiquería: ya están armados los perfiles de las salas y relevadas las molduras para restaurarlas. La entrega está prevista para febrero de 2027.',
    ],
    fotos: withAlt('oficinas-ribera', [
      'Planta en obra con perfiles metálicos de los tabiques nuevos, piso de ladrillo y cielorraso abierto',
      'Estructura de perfiles de la futura sala de reuniones, con placas apoyadas contra la pared',
      'Sala en obra con escalera, herramientas y molduras originales en el cielorraso',
      'Ambiente en obra con andamio, materiales acopiados y luz por las ventanas altas',
      'Puerta original protegida con placas y una cruz naranja de marcador en la pared',
    ]),
    plan: oficinasRibera,
  },
]

export const getObra = (slug) => obras.find((o) => o.slug === slug)

export const nextObra = (slug) => {
  const i = obras.findIndex((o) => o.slug === slug)
  return obras[(i + 1) % obras.length]
}

// La obra del hero: su planta se dibuja al cargar y se abre por el patio.
export const destacada = { slug: 'casa-patio-alberdi', room: 'patio' }
