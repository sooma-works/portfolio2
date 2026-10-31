// Medidas con coma decimal, como en los planos.
export const fmtM = (cm) => (cm / 100).toFixed(2).replace('.', ',')
export const fmtM2 = (m2) => m2.toFixed(1).replace('.', ',')
