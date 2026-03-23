import React, { useEffect, useRef } from 'react'

const s = {
  card: {
    background: 'var(--card)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '24px',
  },
  cardTitle: {
    fontFamily: 'Syne, sans-serif', fontWeight: 700,
    fontSize: '0.95rem', letterSpacing: '-0.01em',
  },
  cardHeader: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 20,
  },
  cardAction: { fontSize: '0.68rem', color: 'var(--accent)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em' },
}

const stats = [
  { label: 'Deployments', value: '248', delta: '↑ 12% this week', up: true, color: 'var(--accent)', top: 'var(--accent)' },
  { label: 'Uptime', value: '99.8%', delta: '↑ 0.2% vs last month', up: true, color: 'var(--green)', top: 'var(--green)' },
  { label: 'Avg Latency', value: '42ms', delta: '↓ 8ms improvement', up: false, color: 'var(--accent2)', top: 'var(--accent2)' },
  { label: 'Incidents', value: '3', delta: '↑ 1 from last week', up: false, color: 'var(--red)', top: 'var(--red)' },
]

const activity = [
  { dot: 'var(--green)', text: <>Deployed <strong>taskflow-api:v2.3.1</strong> to production</>, time: '2 min ago' },
  { dot: 'var(--accent)', text: <>ECR image pushed for <strong>frontend:latest</strong></>, time: '18 min ago' },
  { dot: 'var(--accent2)', text: <>ASG scaled to <strong>4 instances</strong> (traffic spike)</>, time: '1 hr ago' },
  { dot: 'var(--red)', text: <>Alert fired: <strong>RDS CPU &gt; 85%</strong> for 5m</>, time: '3 hrs ago' },
  { dot: 'var(--green)', text: <>Cert renewed for <strong>taskflow.bhuvan.dev</strong></>, time: 'Yesterday' },
]

const pipelines = [
  { repo: 'taskflow-api', branch: 'main', dur: '1m 42s', status: 'pass', label: 'Passed' },
  { repo: 'frontend', branch: 'main', dur: '2m 08s', status: 'pass', label: 'Passed' },
  { repo: 'ecommerce-svc', branch: 'feat/cart', dur: '0m 54s', status: 'run', label: 'Running' },
  { repo: 'auth-service', branch: 'hotfix', dur: '3m 11s', status: 'fail', label: 'Failed' },
]

const uptime = [
  { name: 'TaskFlow API', pct: 99.9, ok: true },
  { name: 'Frontend CDN', pct: 100, ok: true },
  { name: 'PostgreSQL RDS', pct: 99.7, ok: true },
  { name: 'Auth Service', pct: 97.2, ok: false },
  { name: 'Netmaker VPN', pct: 99.5, ok: true },
]

const pillColors = {
  pass: { bg: 'rgba(34,211,165,0.12)', color: 'var(--green)' },
  fail: { bg: 'rgba(244,63,94,0.12)', color: 'var(--red)' },
  run: { bg: 'rgba(124,109,250,0.12)', color: 'var(--accent)' },
}

function BarChart() {
  const canvasRef = useRef()
  const data = [12, 19, 8, 24, 17, 31, 22]
  const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      const W = canvas.offsetWidth; const H = 180
      canvas.width = W; canvas.height = H
      ctx.clearRect(0, 0, W, H)
      const max = Math.max(...data)
      const gap = Math.floor(W / data.length)
      const barW = Math.floor(gap * 0.55)
      const pad = Math.floor(gap * 0.225)
      data.forEach((val, i) => {
        const barH = Math.floor((val / max) * (H - 40))
        const x = i * gap + pad
        const y = H - barH - 24
        const grad = ctx.createLinearGradient(0, y, 0, H - 24)
        grad.addColorStop(0, 'rgba(124,109,250,0.9)')
        grad.addColorStop(1, 'rgba(124,109,250,0.2)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.roundRect(x, y, barW, barH, 4)
        ctx.fill()
        ctx.fillStyle = 'rgba(90,90,114,0.9)'
        ctx.font = '10px DM Mono, monospace'
        ctx.textAlign = 'center'
        ctx.fillText(labels[i], x + barW / 2, H - 6)
        ctx.fillStyle = 'rgba(232,232,240,0.7)'
        ctx.fillText(val, x + barW / 2, y - 4)
      })
    }
    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: 180, display: 'block' }} />
}

export default function Dashboard() {
  return (
    <div style={{ animation: 'fadeUp 0.3s ease' }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
        {stats.map((st, i) => (
          <div key={i} style={{
            ...s.card, position: 'relative', overflow: 'hidden',
            animation: `fadeUp 0.5s ease ${i * 0.05 + 0.05}s both`,
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: st.top }} />
            <div style={{ fontSize: '0.68rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{st.label}</div>
            <div style={{ fontFamily: 'Syne,sans-serif', fontSize: '2rem', fontWeight: 800, lineHeight: 1, marginBottom: 6, color: st.color }}>{st.value}</div>
            <div style={{ fontSize: '0.7rem', color: st.up ? 'var(--green)' : 'var(--red)' }}>{st.delta}</div>
          </div>
        ))}
      </div>

      {/* Chart + Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, marginBottom: 20 }}>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <div style={s.cardTitle}>Deployment Frequency</div>
            <div style={s.cardAction}>7 days ▾</div>
          </div>
          <BarChart />
        </div>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <div style={s.cardTitle}>Recent Activity</div>
            <div style={s.cardAction}>View All</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {activity.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: 12, borderBottom: i < activity.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.dot, marginTop: 4, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.74rem', lineHeight: 1.5 }}>{a.text}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pipelines + Uptime */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <div style={s.cardTitle}>CI/CD Pipelines</div>
            <div style={s.cardAction}>All runs</div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.74rem' }}>
            <thead>
              <tr>{['Repo','Branch','Duration','Status'].map(h => (
                <th key={h} style={{ color:'var(--muted)', textTransform:'uppercase', fontSize:'0.65rem', letterSpacing:'0.08em', paddingBottom:12, textAlign:'left', fontWeight:500 }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {pipelines.map((p, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 0', borderTop: '1px solid var(--border)' }}>{p.repo}</td>
                  <td style={{ padding: '10px 0', borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>{p.branch}</td>
                  <td style={{ padding: '10px 0', borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>{p.dur}</td>
                  <td style={{ padding: '10px 0', borderTop: '1px solid var(--border)' }}>
                    <span style={{
                      fontSize: '0.62rem', padding: '3px 9px', borderRadius: 20,
                      fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em',
                      background: pillColors[p.status].bg, color: pillColors[p.status].color,
                    }}>{p.label}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={s.card}>
          <div style={s.cardHeader}>
            <div style={s.cardTitle}>Service Uptime</div>
            <div style={s.cardAction}>30 days</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {uptime.map((u, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.74rem' }}>{u.name}</span>
                  <span style={{ fontSize: '0.72rem', color: u.ok ? 'var(--green)' : 'var(--accent2)' }}>{u.pct}%</span>
                </div>
                <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${u.pct}%`, borderRadius: 3,
                    background: u.ok ? 'var(--green)' : 'var(--accent2)',
                    transition: 'width 1s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
