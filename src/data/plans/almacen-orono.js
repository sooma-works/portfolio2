import { oH, oV, plan, r } from './helpers.js'

// Local en esquina, con la ochava original como entrada.
const K = 212.4 // cara interior de la ochava (muro de 30 a 45°)

export default plan({
  north: 315,
  walls: [
    [
      [0, 200],
      [200, 0],
      [K, 30],
      [30, K],
    ],
    r(200, 0, 900, 30),
    r(1070, 0, 30, 600),
    r(0, 570, 1100, 30),
    r(0, 200, 30, 400),
    r(700, 350, 370, 15),
    r(700, 350, 15, 220),
    r(940, 365, 15, 205),
  ],
  openings: [
    { type: 'door', x: 110.6, y: 110.6, w: 110, t: 30, a: -45, hinge: -1, swing: 1 },
    oH(300, 650, 0, 30, 'window'),
    oH(760, 1000, 0, 30, 'window'),
    oV(280, 520, 0, 30, 'window'),
    oH(740, 830, 350, 15, 'door', { swing: 1 }),
    oV(390, 460, 940, 15, 'door', { swing: 1 }),
    oH(760, 850, 570, 30, 'door', { swing: -1 }),
  ],
  fixtures: [
    { pts: r(720, 240, 300, 60) },
    { pts: r(760, 30, 300, 60) },
    { pts: r(730, 375, 200, 55) },
    { circle: [320, 190, 34] },
    { circle: [480, 190, 34] },
    { circle: [320, 360, 34] },
    { circle: [480, 360, 34] },
    { circle: [180, 470, 34] },
    { pts: r(560, 470, 120, 70) },
  ],
  rooms: [
    { id: 'salon', name: 'Salón', photo: 0, label: [400, 290],
      pts: [[30, K], [K, 30], [700, 30], [700, 570], [30, 570]] },
    { id: 'barra', name: 'Barra', photo: 1, pts: r(700, 30, 370, 320) },
    { id: 'cuadra', name: 'Cuadra', photo: 5, pts: r(715, 365, 225, 205) },
    { id: 'bano', name: 'Baño', nota: 'Baño para clientes, accesible, con azulejo blanco hasta el techo. No se fotografió.', pts: r(955, 365, 115, 205) },
  ],
  dims: [
    { a: [0, 0], b: [1100, 0], off: -110 },
    { a: [0, 600], b: [0, 0], off: -110 },
    { a: [0, 200], b: [200, 0], off: -40 },
    { a: [715, 600], b: [1070, 600], off: 60 },
  ],
})
