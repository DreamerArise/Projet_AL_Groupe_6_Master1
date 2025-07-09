import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { role, token } = useContext(AuthContext);

  const handleCopy = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      alert('Token copié !');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      fontFamily: 'Montserrat, Roboto, sans-serif',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 6px 32px 0 rgba(33, 150, 243, 0.10)',
        padding: '36px 32px 28px 32px',
        minWidth: 320,
        maxWidth: 400,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h1 style={{
          color: '#1976d2',
          fontWeight: 800,
          fontSize: 28,
          marginBottom: 24,
          letterSpacing: 0.5,
        }}>Mon profil</h1>
        <div style={{ marginBottom: 22, width: '100%' }}>
          <span style={{
            color: '#555',
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: 0.3,
          }}>Rôle :</span>
          <span style={{
            color: role === 'admin' ? '#d32f2f' : role === 'editeur' ? '#1976d2' : '#388e3c',
            background: role === 'admin' ? '#ffebee' : role === 'editeur' ? '#e3f2fd' : '#e8f5e9',
            borderRadius: 8,
            padding: '4px 12px',
            marginLeft: 10,
            fontWeight: 700,
            fontSize: 15,
          }}>{role || 'Non connecté'}</span>
        </div>
        <div style={{ width: '100%' }}>
          <span style={{ color: '#555', fontWeight: 600, fontSize: 16 }}>Token :</span>
          <span style={{
            fontFamily: 'monospace',
            background: '#f5faff',
            borderRadius: 8,
            padding: '4px 10px',
            marginLeft: 10,
            fontSize: 13,
            wordBreak: 'break-all',
          }}>{token ? token.substring(0, 20) + '...' : 'Non connecté'}</span>
          {token && (
            <button
              onClick={handleCopy}
              style={{
                marginLeft: 12,
                background: 'linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 7,
                padding: '5px 12px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseOver={e => e.target.style.background = '#1976d2'}
              onMouseOut={e => e.target.style.background = 'linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)'}
            >Copier</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
