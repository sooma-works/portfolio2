import { oH, oV, plan, r } from './helpers.js'

// Departamento en un edificio de 1950. Se tiró el muro entre cocina y
// comedor; el hall queda abierto al estar.
export default plan({
  north: 30,
  legend: 'tr',
  walls: [
    r(0, 0, 1000, 30),
    r(0, 770, 1000, 30),
    r(0, 0, 30, 800),
    r(970, 0, 30, 800),
    r(600, 30, 15, 740),
    r(615, 400, 355, 15),
    r(615, 640, 355, 15),
    r(30, 450, 370, 15),
    r(385, 465, 15, 305),
  ],
  roof: [
    [
      [30, -120],
      [570, -120],
    ],
    [
      [30, -120],
      [30, 0],
    ],
    [
      [570, -120],
      [570, 0],
    ],
  ],
  openings: [
    oH(60, 200, 0, 30, 'window'),
    oH(220, 360, 0, 30, 'door', { swing: -1, hinge: 1 }),
    oH(440, 560, 0, 30, 'window'),
    oH(700, 900, 0, 30, 'window'),
    oH(450, 550, 770, 30, 'door', { swing: -1 }),
    oV(310, 390, 600, 15, 'door', { swing: 1, hinge: 1 }),
    oV(480, 560, 600, 15, 'door', { swing: 1 }),
    oV(670, 750, 600, 15, 'door', { swing: 1, hinge: 1 }),
    oV(490, 570, 385, 15, 'door', { swing: -1 }),
    oV(560, 720, 0, 30, 'window'),
    oV(470, 570, 970, 30, 'window'),
  ],
  fixtures: [
    { pts: r(540, 30, 60, 420) },
    { pts: r(415, 170, 70, 210) },
    { pts: r(80, 90, 90, 240) },
    { pts: r(880, 430, 75, 190) },
    { pts: r(640, 430, 60, 90) },
    { pts: r(720, 120, 180, 210) },
  ],
  rooms: [
    { id: 'estar', name: 'Estar', photo: 1, pts: r(30, 30, 360, 420) },
    { id: 'cocina', name: 'Cocina', photo: 2, pts: r(390, 30, 210, 420) },
    { id: 'dormitorio', name: 'Dormitorio', photo: 4, pts: r(615, 30, 355, 370) },
    { id: 'bano', name: 'Baño', photo: 5, pts: r(615, 415, 355, 225) },
    { id: 'lavadero', name: 'Lavadero', nota: 'Lavadero cerrado con puertas de guatambú, al lado del baño. No se fotografió.', pts: r(615, 655, 355, 115) },
    { id: 'hall', name: 'Hall', photo: 6, pts: r(400, 465, 200, 305) },
    { id: 'estudio', name: 'Estudio', nota: 'El tercer ambiente: hoy es el estudio, mañana un cuarto. Sin fotos por pedido de los dueños.', pts: r(30, 465, 355, 305) },
    { id: 'balcon', name: 'Balcón', nota: 'Se ve al fondo del estar: la carpintería original, restaurada en lugar de cambiada.', exterior: true, pts: r(30, -120, 540, 120) },
  ],
  dims: [
    { a: [1000, 800], b: [0, 800], off: -110 },
    { a: [0, 800], b: [0, 0], off: -110 },
    { a: [385, 800], b: [30, 800], off: -50 },
    { a: [600, 800], b: [400, 800], off: -50 },
    { a: [970, 800], b: [615, 800], off: -50 },
  ],
})
