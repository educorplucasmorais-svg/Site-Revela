type KaiaFloatingSealProps = {
  onClick?: () => void;
};

export function KaiaFloatingSeal({ onClick }: KaiaFloatingSealProps) {
  return (
    <button
      type="button"
      className="kaia-seal"
      aria-label="Abrir demonstração da Kaia"
      onClick={onClick}
    >
      <span className="kaia-seal-icon" aria-hidden>💧</span>
      <span className="kaia-seal-text">Kaia • Demo</span>
    </button>
  );
}
