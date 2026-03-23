import React, { useState } from 'react'

const card = { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }
const cardTitle = { fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.95rem', marginBottom: 18 }

// ── SERVICES ──────────────────────────────────────────────────────────────────
const services = [
  { icon: '🚀', name: 'TaskFlow API', desc: 'Node.js REST API on EC2 with ALB, ASG, ECR, and Prometheus metrics.', status: 'Healthy', ok: 'green' },
  { icon: '🌐', name: 'Frontend CDN', desc: 'React SPA served via CloudFront + S3. SPA routing handled at edge.', status: 'Healthy', ok: 'green' },
  { icon: '🗄️', name: 'PostgreSQL RDS', desc: 'Multi-AZ RDS in private subnet. Automated snapshots every 24h.', status: 'Healthy', ok: 'green' },
  { icon: '🔐', name: 'Auth Service', desc: 'JWT-based auth microservice. Degraded due to hotfix branch issue.', status: 'Degraded', ok: 'yellow' },
  { icon: '📊', name: 'Grafana + Loki', desc: 'Observability stack. Dashboards for EC2, RDS, and app-level metrics.', status: 'Healthy', ok: 'green' },
  { icon: '🔒', name: 'Netmaker VPN', desc: 'WireGuard VPN on EC2 with Elastic IP. 15-member office team connected.', status: 'Healthy', ok: 'green' },
]
const dotColor = { green: 'var(--green)', yellow: 'var(--accent2)', red: 'var(--red)' }
const dotLabel = { green: 'var(--green)', yellow: 'var(--accent2)', red: 'var(--red)' }
const iconBg = { '🚀': 'rgba(124,109,250,0.12)', '🌐': 'rgba(34,211,165,0.12)', '🗄️': 'rgba(249,115,22,0.12)', '🔐': 'rgba(244,63,94,0.12)', '📊': 'rgba(124,109,250,0.12)', '🔒': 'rgba(34,211,165,0.12)' }

export function Services() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, animation: 'fadeUp 0.3s ease' }}>
      {services.map((svc, i) => (
        <div key={i} style={card}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: iconBg[svc.icon], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: 14 }}>{svc.icon}</div>
          <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>{svc.name}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--muted)', lineHeight: 1.6 }}>{svc.desc}</div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.7rem' }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: dotColor[svc.ok],
              boxShadow: svc.ok === 'green' ? `0 0 6px ${dotColor[svc.ok]}` : 'none',
            }} />
            <span style={{ color: dotLabel[svc.ok] }}>{svc.status}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── DEPLOYMENTS ───────────────────────────────────────────────────────────────
const deploys = [
  { id: '#248', svc: 'taskflow-api', ver: 'v2.3.1', env: 'prod', by: 'bhuvan', time: '2m ago', status: 'pass', label: 'Success' },
  { id: '#247', svc: 'frontend', ver: 'v1.9.0', env: 'prod', by: 'CI/CD', time: '18m ago', status: 'pass', label: 'Success' },
  { id: '#246', svc: 'ecommerce', ver: 'v0.4.2', env: 'staging', by: 'CI/CD', time: '1h ago', status: 'run', label: 'Running' },
  { id: '#245', svc: 'auth-service', ver: 'v1.1.0', env: 'prod', by: 'bhuvan', time: '3h ago', status: 'fail', label: 'Failed' },
  { id: '#244', svc: 'taskflow-api', ver: 'v2.3.0', env: 'prod', by: 'CI/CD', time: 'Yesterday', status: 'pass', label: 'Success' },
  { id: '#243', svc: 'netmaker-vpn', ver: 'v0.20.5', env: 'prod', by: 'bhuvan', time: '2d ago', status: 'pass', label: 'Success' },
]
const pillStyle = {
  pass: { background: 'rgba(34,211,165,0.12)', color: 'var(--green)' },
  fail: { background: 'rgba(244,63,94,0.12)', color: 'var(--red)' },
  run:  { background: 'rgba(124,109,250,0.12)', color: 'var(--accent)' },
}

export function Deployments() {
  return (
    <div style={{ ...card, animation: 'fadeUp 0.3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>All Deployments</div>
        <div style={{ fontSize: '0.68rem', color: 'var(--accent)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Export CSV</div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.74rem' }}>
        <thead>
          <tr>{['ID','Service','Version','Env','By','Time','Status'].map(h => (
            <th key={h} style={{ color:'var(--muted)', textTransform:'uppercase', fontSize:'0.65rem', letterSpacing:'0.08em', paddingBottom:12, textAlign:'left', fontWeight:500 }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {deploys.map((d, i) => (
            <tr key={i}>
              <td style={{ padding:'10px 0', borderTop:'1px solid var(--border)', color:'var(--muted)' }}>{d.id}</td>
              <td style={{ padding:'10px 0', borderTop:'1px solid var(--border)' }}>{d.svc}</td>
              <td style={{ padding:'10px 0', borderTop:'1px solid var(--border)', color:'var(--muted)' }}>{d.ver}</td>
              <td style={{ padding:'10px 0', borderTop:'1px solid var(--border)' }}>{d.env}</td>
              <td style={{ padding:'10px 0', borderTop:'1px solid var(--border)' }}>{d.by}</td>
              <td style={{ padding:'10px 0', borderTop:'1px solid var(--border)', color:'var(--muted)' }}>{d.time}</td>
              <td style={{ padding:'10px 0', borderTop:'1px solid var(--border)' }}>
                <span style={{ fontSize:'0.62rem', padding:'3px 9px', borderRadius:20, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.05em', ...pillStyle[d.status] }}>{d.label}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── SETTINGS ──────────────────────────────────────────────────────────────────
function Toggle({ defaultOn }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div onClick={() => setOn(!on)} style={{
      width: 36, height: 20, borderRadius: 10,
      background: on ? 'var(--accent)' : 'var(--border)',
      cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
    }}>
      <div style={{
        position: 'absolute', width: 14, height: 14, borderRadius: '50%',
        background: 'white', top: 3, left: on ? 19 : 3, transition: 'left 0.2s',
      }} />
    </div>
  )
}

function SettingSection({ title, rows }) {
  return (
    <div style={card}>
      <div style={cardTitle}>{title}</div>
      {rows.map((row, i) => (
        <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
          <span style={{ fontSize:'0.76rem', color: row.accent ? 'var(--accent)' : 'var(--text)', cursor: row.accent ? 'pointer' : 'default' }}>{row.label}</span>
          {row.toggle !== undefined && <Toggle defaultOn={row.toggle} />}
        </div>
      ))}
    </div>
  )
}

export function Settings() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, animation:'fadeUp 0.3s ease' }}>
      <SettingSection title="Notifications" rows={[
        { label:'Deployment alerts', toggle: true },
        { label:'Incident alerts', toggle: true },
        { label:'Daily digest email', toggle: false },
        { label:'Slack integration', toggle: true },
      ]} />
      <SettingSection title="Integrations" rows={[
        { label:'GitHub Actions', toggle: true },
        { label:'Prometheus scraping', toggle: true },
        { label:'Loki log shipping', toggle: true },
        { label:'PagerDuty oncall', toggle: false },
      ]} />
      <SettingSection title="Display" rows={[
        { label:'24h clock', toggle: true },
        { label:'Auto-refresh (30s)', toggle: true },
        { label:'Compact view', toggle: false },
      ]} />
      <SettingSection title="Account" rows={[
        { label:'bhuvan@devpulse.io' },
        { label:'Role: Admin' },
        { label:'Region: ap-south-1' },
        { label:'Change password →', accent: true },
      ]} />
    </div>
  )
}
