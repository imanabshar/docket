function Sidebar({ darkTheme, onToggleTheme, activeView, onNavigate, isOpen, onClose }) {
  return (
    <div className={`sidebar${isOpen ? ' open' : ''}`}>
      <div className="brand">
        <div className="brand-mark">D</div>
        <span className="brand-name">Docket</span>
        <button className="sidebar-close-btn" onClick={onClose} aria-label="Close menu">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div
        className={`navitem${activeView === 'upload' ? ' active' : ''}`}
        onClick={() => onNavigate('upload')}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 16V4M12 4l-4 4M12 4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" /></svg>
        New extraction
      </div>

      <div className="seclabel">Workspace</div>
      <div
        className={`navitem${activeView === 'about' ? ' active' : ''}`}
        onClick={() => onNavigate('about')}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></svg>
        About
      </div>

      <div className="sidebar-spacer" />

      <div className="social-tags">
        <a className="icon-tag" href="https://github.com/imanabshar" target="_blank" rel="noreferrer" aria-label="GitHub">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.35-3.88-1.35-.52-1.34-1.28-1.7-1.28-1.7-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 015.8 0c2.2-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .3.2.66.79.55A10.52 10.52 0 0023.5 12c0-6.27-5.23-11.5-11.5-11.5z" /></svg>
        </a>
        <a className="icon-tag" href="https://linkedin.com/in/imanabshar" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
        </a>
        <button className="icon-tag theme-toggle" onClick={onToggleTheme} aria-label={darkTheme ? 'Switch to light theme' : 'Switch to dark theme'}>
          {darkTheme ? (
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
          )}
        </button>
      </div>
    </div>
  )
}

export default Sidebar