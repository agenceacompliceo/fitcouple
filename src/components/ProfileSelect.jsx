import { useProfile } from '../context/ProfileContext'

export default function ProfileSelect() {
  const { selectProfile } = useProfile()

  return (
    <div style={{
      minHeight: '100dvh',
      maxWidth: '430px',
      margin: '0 auto',
      background: '#3D322A',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Image cadrée sur les visages — 60% de l'écran */}
      <div style={{
        width: '100%',
        height: '62dvh',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0
      }}>
        <img
          src="/home.png"
          alt="Adam et Andréa"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            display: 'block'
          }}
        />
        {/* Dégradé bas */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(to bottom, transparent, #3D322A)'
        }}/>
      </div>

      {/* Zone boutons */}
      <div style={{
        flex: 1,
        padding: '0 1.25rem 2.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: '0.75rem'
      }}>

        {/* Phrase motivation */}
        <p style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: '0.75rem',
          textAlign: 'center',
          marginBottom: '0.75rem',
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
            <div style={{ fontSize: '0.75rem', fontWeight: '400', color: '#888', marginTop: '1px' }}>
              Prise de masse
            </div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        {/* Bouton Andréa */}
        <button
          onClick={() => selectProfile('andrea')}
          style={{
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.15)',
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
            <div style={{ fontSize: '0.75rem', fontWeight: '400', color: 'rgba(255,255,255,0.45)', marginTop: '1px' }}>
              Affinage & galbe
            </div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

      </div>
    </div>
  )
}
