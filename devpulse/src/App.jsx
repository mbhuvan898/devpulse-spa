import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import { Services, Deployments, Settings } from './components/Views'

const pageTitles = {
  dashboard:   <>Infra <span style={{ color: 'var(--accent)' }}>Overview</span></>,
  services:    <>Running <span style={{ color: 'var(--accent)' }}>Services</span></>,
  deployments: <>Deployment <span style={{ color: 'var(--accent)' }}>History</span></>,
  settings:    <>App <span style={{ color: 'var(--accent)' }}>Settings</span></>,
}

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [clock, setClock] = useState('')

  useEffect(() => {
    const tick = () => setClock(new Date().toTimeString().slice(0, 8))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const views = {
    dashboard: <Dashboard />,
    services: <Services />,
    deployments: <Deployments />,
    settings: <Settings />,
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar active={page} onNav={setPage} />

      <main style={{ marginLeft: 220, flex: 1, padding: '36px 40px' }}>
        {/* Topbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 36 }}>
          <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '1.6rem', letterSpacing: '-0.03em' }}>
            {pageTitles[page]}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{
              background: 'rgba(124,109,250,0.15)', color: 'var(--accent)',
              fontSize: '0.68rem', padding: '4px 10px', borderRadius: 20,
              letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500,
            }}>● Live</span>
            <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>{clock}</span>
          </div>
        </div>

        {/* Page content */}
        {views[page]}
      </main>
    </div>
  )
}
