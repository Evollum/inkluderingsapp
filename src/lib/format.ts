export function formatTimeDot(time?: string) {
  if (!time) return '';
  // Expect formats like "HH:MM" or "H:MM"
  const parts = time.split(':');
  if (parts.length < 2) return time.replace(':', '.');
  const hh = parts[0].padStart(2, '0');
  const mm = parts[1].padStart(2, '0');
  return `${hh}.${mm}`;
}

export function formatDateShort(dateStr?: string) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('no-NO');
  } catch (e) {
    return dateStr;
  }
}
