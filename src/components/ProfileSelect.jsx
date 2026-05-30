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

      {/* Photo du couple */}
      <div style={{ marginBottom: '2.5rem' }}>
        <img
          src="/couple.png"
          alt="Adam & Andréa"
          style={{
            width: '100%',
            maxWidth: '320px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            display: 'block',
          }}
        />
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
