export function MockBadge() {
  const enabled = import.meta.env.VITE_USE_MSW === 'true';
  if (!enabled) return null;
  return (
    <div style={{
      position: 'fixed', right: 12, bottom: 12, padding: '6px 10px',
      fontSize: 12, borderRadius: 8, background: '#00000099', color: 'white', zIndex: 9999
    }}>
      Mock Data
    </div>
  );
}
