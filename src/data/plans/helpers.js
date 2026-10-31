// Utilidades para dibujar plantas como datos. Todo en centímetros, con el
// origen arriba a la izquierda (x hacia la derecha, y hacia abajo).

// Rectángulo como polígono.
export const r = (x, y, w, h) => [
  [x, y],
  [x + w, y],
  [x + w, y + h],
  [x, y + h],
]

// Abertura en un muro horizontal: va de x0 a x1 sobre el muro que arranca en
// y (cara superior) con espesor t.
export const oH = (x0, x1, y, t, type = 'door', opts = {}) => ({
  type,
  x: (x0 + x1) / 2,
  y: y + t / 2,
  w: x1 - x0,
  t,
  a: 0,
  hinge: -1,
  swing: 1,
  ...opts,
})

// Abertura en un muro vertical: va de y0 a y1 sobre el muro que arranca en x
// (cara izquierda) con espesor t. swing: 1 abre hacia +x, -1 hacia -x.
// hinge: -1 bisagra arriba (y0), 1 abajo (y1).
export const oV = (y0, y1, x, t, type = 'door', opts = {}) => ({
  type,
  x: x + t / 2,
  y: (y0 + y1) / 2,
  w: y1 - y0,
  t,
  a: 90,
  hinge: opts.hinge ?? -1,
  // al rotar 90°, el +y local apunta a -x de pantalla
  swing: -(opts.swing ?? 1),
})

// Superficie de un polígono en m² (fórmula del área de Gauss).
export function area(pts) {
  let s = 0
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i]
    const [x2, y2] = pts[(i + 1) % pts.length]
    s += x1 * y2 - x2 * y1
  }
  return Math.abs(s) / 2 / 10000
}

export function bbox(pts) {
  const xs = pts.map((p) => p[0])
  const ys = pts.map((p) => p[1])
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]
}

export function center(pts) {
  const [x0, y0, x1, y1] = bbox(pts)
  return [(x0 + x1) / 2, (y0 + y1) / 2]
}

// Completa cada ambiente con su superficie y la posición del rótulo.
export function plan(def) {
  return {
    ...def,
    rooms: def.rooms.map((room) => ({
      ...room,
      m2: room.m2 ?? Math.round(area(room.pts) * 10) / 10,
      label: room.label ?? center(room.pts),
    })),
  }
}
