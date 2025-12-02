const phases = [
  {
    number: '01',
    title: 'Descoberta',
    duration: '1-2 semanas',
    description: 'Mapeamento completo + Prova de Conceito',
    icon: '🔍'
  },
  {
    number: '02',
    title: 'MVP Core',
    duration: '2-4 semanas',
    description: 'Design + Código base funcional',
    icon: '⚙️'
  },
  {
    number: '03',
    title: 'Integração IA',
    duration: '2-3 semanas',
    description: 'Modelo de IA funcionando em produção',
    icon: '🤖'
  },
  {
    number: '04',
    title: 'Produção',
    duration: '1-2 semanas',
    description: 'Go-live + Treinamento da equipe',
    icon: '🚀'
  }
];

export function Methodology() {
  return (
    <div className="methodology-section">
      <div className="methodology-timeline">
        {phases.map((phase, index) => (
          <div key={index} className="methodology-phase">
            <div className="methodology-phase-header">
              <span className="methodology-phase-number">{phase.number}</span>
              <span className="methodology-phase-icon">{phase.icon}</span>
            </div>
            <h3 className="methodology-phase-title">{phase.title}</h3>
            <span className="methodology-phase-duration">{phase.duration}</span>
            <p className="methodology-phase-description">{phase.description}</p>
            {index < phases.length - 1 && <div className="methodology-connector" />}
          </div>
        ))}
      </div>
    </div>
  );
}
