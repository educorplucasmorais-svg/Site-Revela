// ============================================
// DEPOIMENTOS - EDITE AQUI OS TESTIMONIALS
// ============================================
// Adicione, remova ou edite os depoimentos abaixo.
// Cada depoimento precisa ter: name, role, company, image, text, rating

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string; // URL da foto ou deixe vazio para usar iniciais
  text: string;
  rating: number; // 1 a 5 estrelas
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Mariana Costa',
    role: 'CEO',
    company: 'TechStart Brasil',
    image: '', // Deixe vazio para usar iniciais
    text: 'A Revela transformou completamente nossa operação de marketing. Em 6 meses, triplicamos nosso faturamento com estratégias que nunca tínhamos considerado. O time é excepcional e realmente entende de crescimento.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Ricardo Almeida',
    role: 'Fundador',
    company: 'Inova Logística',
    image: '',
    text: 'Contratamos a Revela para um diagnóstico e acabamos fechando uma parceria de longo prazo. A metodologia deles é diferente de tudo que já vi no mercado. Resultados reais, não apenas relatórios bonitos.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Fernanda Oliveira',
    role: 'Diretora de Marketing',
    company: 'Grupo Expansão',
    image: '',
    text: 'O C-Level as a Service foi a melhor decisão que tomamos. Temos acesso a expertise de alto nível sem precisar contratar um time inteiro. Nossa taxa de conversão aumentou 180% em apenas 4 meses.',
    rating: 5,
  },
];

// ============================================
// CONFIGURAÇÕES DA SEÇÃO
// ============================================
export const testimonialsConfig = {
  sectionTitle: 'O que nossos clientes dizem',
  sectionSubtitle: 'Empresas que confiaram na Revela e alcançaram resultados extraordinários',
  sectionLabel: '— DEPOIMENTOS',
  showRating: true, // Mostrar estrelas de avaliação
  autoRotate: true, // Rotação automática dos depoimentos
  rotateInterval: 5000, // Tempo em ms para trocar (5 segundos)
};
