import React from 'react'

const NavIcon = ({ d, viewBox = "0 0 24 24", rect, rects, polylines, circles, paths }) => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox={viewBox}>
    {rects && rects.map((r, i) => <rect key={i} {...r} />)}
    {rect && <rect {...rect} />}
    {polylines && polylines.map((p, i) => <polyline key={i} points={p} />)}
    {circles && circles.map((c, i) => <circle key={i} {...c} />)}
    {paths && paths.map((p, i) => <path key={i} d={p} />)}
  </svg>
)

const navItems = [
  {
    id: 'dashboard', label: 'Dashboard',
    icon: <NavIcon rects={[{x:3,y:3,width:7,height:7},{x:14,y:3,width:7,height:7},{x:3,y:14,width:7,height:7},{x:14,y:14,width:7,height:7}]} />
  },
  {
    id: 'services', label: 'Services',
    icon: <NavIcon circles={[{cx:12,cy:12,r:3}]} paths={['M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42']} />
  },
  {
    id: 'deployments', label: 'Deployments',
    icon: <NavIcon polylines={['16 18 22 12 16 6', '8 6 2 12 8 18']} />
  },
  {
    id: 'settings', label: 'Settings',
    icon: <NavIcon circles={[{cx:12,cy:12,r:3}]} paths={['M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z']} />
  },
]

export default function Sidebar({ active, onNav }) {
  return (
    <aside style={{
      width: 220, flexShrink: 0, background: 'var(--surface)',
      borderRight: '1px solid var(--border)', display: 'flex',
      flexDirection: 'column', padding: '28px 0',
      position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 10,
    }}>
      <div style={{
        fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem',
        color: 'var(--text)', padding: '0 24px 32px', letterSpacing: '-0.02em',
      }}>
        Dev<span style={{ color: 'var(--accent)' }}>Pulse</span>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, padding: '0 12px' }}>
        {navItems.map(item => (
          <div
            key={item.id}
            onClick={() => onNav(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', borderRadius: 8, cursor: 'pointer',
              color: active === item.id ? 'var(--accent)' : 'var(--muted)',
              background: active === item.id ? 'rgba(124,109,250,0.15)' : 'transparent',
              fontSize: '0.78rem', fontWeight: 500,
              letterSpacing: '0.04em', textTransform: 'uppercase',
              transition: 'all 0.18s ease', userSelect: 'none',
            }}
            onMouseEnter={e => { if (active !== item.id) { e.currentTarget.style.background = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' } }}
            onMouseLeave={e => { if (active !== item.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)' } }}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <div style={{ padding: '20px 24px 0', borderTop: '1px solid var(--border)', marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Syne, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: 'white',
          }}>BK</div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text)', fontWeight: 500 }}>Bhuvan K</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>DevOps Eng</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
