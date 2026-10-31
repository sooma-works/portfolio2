import { oH, oV, plan, r } from './helpers.js'

// Casa chorizo en un lote de 8,66 × 26,00 m. La calle queda a la izquierda.
// Se demolieron dos habitaciones del medio para abrir el patio central.
export default plan({
  north: 200,
  walls: [
    r(0, 0, 30, 866), // frente
    r(2570, 0, 30, 866), // fondo
    r(0, 0, 2600, 30), // medianera norte
    r(0, 836, 2600, 30), // medianera sur
    r(430, 30, 15, 420),
    r(845, 30, 15, 420),
    r(30, 450, 1085, 15),
    r(860, 270, 240, 15),
    r(1100, 30, 15, 435),
    r(430, 465, 15, 371),
    r(1615, 30, 15, 806),
    r(2130, 30, 15, 270),
    r(2130, 450, 15, 386),
    r(2145, 450, 425, 15),
  ],
  columns: [r(640, 600, 15, 15), r(880, 600, 15, 15)],
  roof: [
    [
      [445, 615],
      [1100, 615],
    ],
  ],
  openings: [
    oV(600, 700, 0, 30, 'door', { swing: 1 }),
    oV(130, 330, 0, 30, 'window'),
    oH(330, 410, 450, 15, 'door', { hinge: 1, swing: -1 }),
    oH(465, 545, 450, 15, 'door', { swing: -1 }),
    oH(640, 800, 450, 15, 'window'),
    oH(900, 980, 450, 15, 'door', { swing: -1 }),
    oV(80, 150, 845, 15, 'door', { swing: 1 }),
    oV(100, 200, 1100, 15, 'window'),
    oV(330, 420, 1100, 15, 'window'),
    oV(480, 560, 430, 15, 'door', { swing: 1 }),
    oV(660, 800, 430, 15, 'window'),
    oV(60, 560, 1615, 15, 'window'),
    oV(620, 760, 1615, 15, 'door', { swing: 1 }),
    oV(640, 760, 2130, 15, 'door', { swing: 1 }),
    oH(2250, 2450, 450, 15, 'window'),
  ],
  fixtures: [
    { pts: r(2160, 30, 395, 62) },
    { pts: r(2300, 42, 60, 40) },
    { pts: r(1040, 60, 60, 110) },
    { pts: r(866, 180, 70, 84) },
    { pts: r(1690, 600, 300, 110) },
    { circle: [1300, 640, 70] },
  ],
  rooms: [
    { id: 'patio', name: 'Patio', photo: 0, label: [1365, 380], exterior: true,
      pts: [[445, 615], [1100, 615], [1100, 465], [1115, 465], [1115, 30], [1615, 30], [1615, 836], [445, 836]] },
    { id: 'zaguan', name: 'Zaguán', photo: 1, pts: r(30, 465, 400, 371) },
    { id: 'dormitorio', name: 'Dormitorio', pts: r(30, 30, 400, 420) },
    { id: 'estudio', name: 'Estudio', photo: 7, pts: r(445, 30, 400, 420) },
    { id: 'bano', name: 'Baño', pts: r(860, 30, 240, 240) },
    { id: 'lavadero', name: 'Lavadero', pts: r(860, 285, 240, 165) },
    { id: 'galeria', name: 'Galería', photo: 5, pts: r(445, 465, 655, 150) },
    { id: 'estar', name: 'Estar y comedor', photo: 4, pts: r(1630, 30, 500, 806) },
    { id: 'cocina', name: 'Cocina', photo: 2, pts: r(2145, 30, 425, 420) },
    { id: 'fondo', name: 'Patio de fondo', photo: 6, exterior: true, pts: r(2145, 465, 425, 371) },
  ],
  dims: [
    { a: [0, 0], b: [2600, 0], off: -110 },
    { a: [0, 866], b: [0, 0], off: -110 },
    { a: [30, 0], b: [430, 0], off: -50 },
    { a: [445, 0], b: [845, 0], off: -50 },
    { a: [1115, 0], b: [1615, 0], off: -50 },
    { a: [1630, 0], b: [2130, 0], off: -50 },
    { a: [2145, 0], b: [2570, 0], off: -50 },
  ],
})
