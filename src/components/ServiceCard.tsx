interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  benefits: string[];
}

export function ServiceCard({ icon, title, description, benefits }: ServiceCardProps) {
  return (
    <div className="service-card">
      <div className="service-card-icon">{icon}</div>
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-description">{description}</p>
      <ul className="service-card-benefits">
        {benefits.map((benefit, index) => (
          <li key={index} className="service-card-benefit">
            <span className="service-card-benefit-check">✓</span>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}
