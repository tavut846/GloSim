import React from 'react';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  title,
  videoUrl
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(10, 10, 10, 0.85)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        backgroundColor: 'var(--ink-900)',
        borderRadius: 'var(--radius-md)',
        maxWidth: '900px',
        width: '100%',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-raised)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'var(--white)'
        }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{title}</h4>
          <button
            onClick={onClose}
            style={{
              color: '#9CA3AF',
              background: 'none',
              border: 'none',
              padding: '4px',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Player */}
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, backgroundColor: '#000' }}>
          <video
            controls
            autoPlay
            src={videoUrl}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          >
            Your browser does not support HTML5 video.
          </video>
        </div>
      </div>
    </div>
  );
};
