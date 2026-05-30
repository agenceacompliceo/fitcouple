import { useProfile } from '../context/ProfileContext'

export default function ProfileSelect() {
  const { selectProfile } = useProfile()

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#3D322A',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Image plein écran en haut */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: '220px',
        backgroundImage: 'url(/home.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}/>

      {/* Dégradé bas pour transition vers les boutons */}
      <div style={{
        position: 'absolute',
        bottom: '200px',
        left: 0,
        right: 0,
        height: '120px',
        background: 'linear-gradient(to bottom, transparent, #3D322A)'
      }}/>

      {/* Zone boutons en bas */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        padding: '0 1.5rem 3rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>

        {/* Phrase motivation */}
        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.78rem',
          textAlign: 'center',
          marginBottom: '1rem',
          fontStyle: 'italic',
          lineHeight: '1.5'
        }}>
          "La discipline est le pont entre les objectifs et les résultats."
        </p>

        {/* Bouton Adam */}
        <button
          onClick={() => selectProfile('adam')}
          style={{
            background: 'white',
            color: '#111',
            border: 'none',
            borderRadius: '14px',
            padding: '1rem 1.25rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            width: '100%'
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <div>Adam</div>
            <div style={{ fontSize: '0.75rem', fontWeight: '400', color: '#888', marginTop: '1px' }}>Prise de masse</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        {/* Bouton Andréa */}
        <button
          onClick={() => selectProfile('andrea')}
          style={{
            background: 'rgba(255,255,255,0.12)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '14px',
            padding: '1rem 1.25rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            width: '100%'
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <div>Andréa</div>
            <div style={{ fontSize: '0.75rem', fontWeight: '400', color: 'rgba(255,255,255,0.5)', marginTop: '1px' }}>Affinage & galbe</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

      </div>
    </div>
  )
}
