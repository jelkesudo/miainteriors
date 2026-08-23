export default function Placeholder({ label = 'DODAJ SLIKU', className = '' }) {
  return (
    <div className={`media-placeholder ${className}`}>
      <span>{label}</span>
    </div>
  );
}
