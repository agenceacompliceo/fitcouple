import { useProfile } from '../context/ProfileContext'

export default function ProfileSelect() {
  const { selectProfile } = useProfile()

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#111',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>

      {/* Avatar illustration */}
      <div style={{ marginBottom: '2.5rem' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100" width="200" height="143">

          {/* Adam (gauche) — plus grand, cheveux bouclés */}
          <rect x="18" y="52" width="22" height="30" rx="5" fill="white"/>
          <circle cx="29" cy="40" r="14" fill="#D4A574"/>
          <circle cx="20" cy="33" r="7" fill="#2C1810"/>
          <circle cx="29" cy="28" r="7" fill="#2C1810"/>
          <circle cx="38" cy="33" r="7" fill="#2C1810"/>
          <circle cx="21" cy="40" r="5" fill="#2C1810"/>
          <circle cx="37" cy="40" r="5" fill="#2C1810"/>
          <rect x="18" y="80" width="8" height="14" rx="3" fill="#333"/>
          <rect x="32" y="80" width="8" height="14" rx="3" fill="#333"/>
          <rect x="6" y="53" width="10" height="20" rx="4" fill="#D4A574"/>
          <rect x="42" y="53" width="10" height="20" rx="4" fill="#D4A574"/>

          {/* Andréa (droite) — plus petite, métisse, cheveux lisses */}
          <rect x="88" y="58" width="20" height="26" rx="5" fill="white"/>
          <circle cx="98" cy="48" r="12" fill="#C68642"/>
          <rect x="84" y="36" width="28" height="30" rx="6" fill="#1a0a00"/>
          <rect x="86" y="37" width="24" height="14" rx="5" fill="#C68642"/>
          <rect x="81" y="50" width="6" height="22" rx="3" fill="#1a0a00"/>
          <rect x="109" y="50" width="6" height="22" rx="3" fill="#1a0a00"/>
          <rect x="88" y="82" width="7" height="12" rx="3" fill="#333"/>
          <rect x="101" y="82" width="7" height="12" rx="3" fill="#333"/>
          <rect x="78" y="59" width="9" height="18" rx="4" fill="#C68642"/>
          <rect x="109" y="59" width="9" height="18" rx="4" fill="#C68642"/>

          {/* Petit coeur entre les deux */}
          <text x="65" y="68" fontSize="16" textAnchor="middle" fill="white">♥</text>
        </svg>
      </div>

      {/* Titre */}
      <h1 style={{
        color: 'white',
        fontSize: '1.6rem',
        fontWeight: '600',
        letterSpacing: '-0.02em',
        marginBottom: '0.5rem',
        textAlign: 'center'
      }}>
        Qui es-tu ?
      </h1>

      <p style={{
        color: '#888',
        fontSize: '0.9rem',
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        Sélectionne ton profil pour accéder à ton planning
      </p>

      {/* Boutons profil */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: '320px'
      }}>
        <button
          onClick={() => selectProfile('adam')}
          style={{
            background: 'white',
            color: '#111',
            border: 'none',
            borderRadius: '12px',
            padding: '1.1rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <div>Adam</div>
            <div style={{ fontSize: '0.78rem', fontWeight: '400', color: '#666', marginTop: '2px' }}>Prise de masse</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        <button
          onClick={() => selectProfile('andrea')}
          style={{
            background: 'white',
            color: '#111',
            border: 'none',
            borderRadius: '12px',
            padding: '1.1rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <div>Andréa</div>
            <div style={{ fontSize: '0.78rem', fontWeight: '400', color: '#666', marginTop: '2px' }}>Affinage & galbe</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* Phrase motivation du jour */}
      <p style={{
        color: '#555',
        fontSize: '0.78rem',
        marginTop: '3rem',
        textAlign: 'center',
        maxWidth: '260px',
        lineHeight: '1.5',
        fontStyle: 'italic'
      }}>
        "La discipline est le pont entre les objectifs et les résultats."
      </p>

    </div>
  )
}
