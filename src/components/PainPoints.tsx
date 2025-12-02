const painPoints = [
  {
    icon: '⏰',
    title: 'Horas perdidas em tarefas repetitivas',
    description: 'Sua equipe gasta mais tempo em processos manuais do que em trabalho estratégico.'
  },
  {
    icon: '📊',
    title: 'Planilhas que ninguém atualiza',
    description: 'Dados desatualizados e processos quebrados por falta de integração.'
  },
  {
    icon: '👤',
    title: 'Processos que dependem de uma pessoa',
    description: 'Conhecimento crítico centralizado em poucos funcionários.'
  },
  {
    icon: '📈',
    title: 'Concorrentes crescendo mais rápido',
    description: 'Enquanto você lida com gargalos, outros já automatizaram.'
  }
];

export function PainPoints() {
  return (
    <div className="pain-points-section">
      <div className="pain-points-grid">
        {painPoints.map((pain, index) => (
          <div key={index} className="pain-point-card">
            <div className="pain-point-icon">{pain.icon}</div>
            <h3 className="pain-point-title">{pain.title}</h3>
            <p className="pain-point-description">{pain.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
