export function isSameMonth(dateISO: string, ref = new Date()) {
  const d = new Date(dateISO);
  return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();
}

export function isPrevMonth(dateISO: string, ref = new Date()) {
  const d = new Date(dateISO);
  const y = ref.getFullYear();
  const m = ref.getMonth();
  const prevM = m === 0 ? 11 : m - 1;
  const prevY = m === 0 ? y - 1 : y;
  return d.getFullYear() === prevY && d.getMonth() === prevM;
}
