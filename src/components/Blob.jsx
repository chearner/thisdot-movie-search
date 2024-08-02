export default function Blob(props) {
  return (
    <div style={{ filter: 'blur(100px)', pointerEvents: 'none', position: 'fixed', minWidth: '100%', marginTop: '0', height: '180%', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)', zIndex: '0', opacity: '0.3' }}>
      <div style={{ borderRadius: '99999px', position: 'absolute', top: '50%', left: '50%', width: '100vw', minWidth: '1000px', height: '100vh', transform: 'translate(-50%, -50%) scale(0.6)', overflow: 'hidden' }}>
        <div className='color-blobs' style={{ position: 'absolute', top: '50%', left: '50%', width: '100vw', height: '100vw', transform: 'translate(-50%, -50%)' }}></div>
      </div>
    </div>
  );
}
