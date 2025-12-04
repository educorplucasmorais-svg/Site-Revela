import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { KaiaWaterLogo } from '../components/KaiaWaterLogo';
import { QAMonitor, QuestionBankValidator } from '../lib/profiler-validator';
import DISCReportEngine from '../lib/disc-report-engine';
import { DISCFullReport, SavedReportData } from '../components/DISCReportVisual';
import '../styles/kaia.css';

// Função para salvar relatório no sistema
const saveReportToDatabase = async (reportData: SavedReportData): Promise<void> => {
  try {
    // Salvar no localStorage como backup
    const savedReports = JSON.parse(localStorage.getItem('kaia_disc_reports') || '[]');
    savedReports.push(reportData);
    localStorage.setItem('kaia_disc_reports', JSON.stringify(savedReports));
    
    // TODO: Integrar com tRPC/API para salvar no MySQL
    console.log('Relatório salvo:', reportData);
    
    // Simulação de envio para API
    // await fetch('/api/disc-reports', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(reportData)
    // });
  } catch (error) {
    console.error('Erro ao salvar relatório:', error);
    throw error;
  }
};

interface User {
  email: string;
  name: string;
  role: string;
  loginAt: string;
}

// ============================================
// KAIA PROFILER - Sistema TRI/MUPP + DISC
// ============================================

interface ProfilerItem {
  id: string;
  text: string;
  trait: 'D' | 'I' | 'S' | 'C';
  polarity: 'positive' | 'negative';
  desirability: number;
}

interface ItemBlock {
  block_id: string;
  desirability_level: 'high' | 'medium' | 'low';
  items: ProfilerItem[];
}

interface ProfileResult {
  natural: { D: number; I: number; S: number; C: number };
  adapted: { D: number; I: number; S: number; C: number };
  dominantTrait: string;
  secondaryTrait: string;
  adaptationCost: number;
  riskIndicators: string[];
  saboteurs: string[];
  strengths: string[];
}

// ============================================
// BANCO EXTENSO DE QUESTÕES CALIBRADAS
// 30 blocos (10 high, 10 medium, 10 low)
// Cada teste usa 6 blocos selecionados aleatoriamente
// Mantém proporção: 2 high + 2 medium + 2 low
// ============================================

const fullQuestionBank: ItemBlock[] = [
  // ========== HIGH DESIRABILITY (10 blocos) ==========
  {
    block_id: "H01",
    desirability_level: "high",
    items: [
      { id: "H01_D", text: "Assumo riscos com facilidade para alcançar resultados", trait: "D", polarity: "positive", desirability: 8 },
      { id: "H01_I", text: "Gosto de inspirar e motivar as pessoas ao meu redor", trait: "I", polarity: "positive", desirability: 8 },
      { id: "H01_S", text: "Mantenho a calma mesmo sob pressão intensa", trait: "S", polarity: "positive", desirability: 8 },
      { id: "H01_C", text: "Sigo processos e regras com precisão e consistência", trait: "C", polarity: "positive", desirability: 8 }
    ]
  },
  {
    block_id: "H02",
    desirability_level: "high",
    items: [
      { id: "H02_D", text: "Tomo decisões rápidas mesmo com informações limitadas", trait: "D", polarity: "positive", desirability: 8 },
      { id: "H02_I", text: "Crio conexões genuínas com pessoas facilmente", trait: "I", polarity: "positive", desirability: 8 },
      { id: "H02_S", text: "Prefiro ambientes estáveis e previsíveis", trait: "S", polarity: "positive", desirability: 8 },
      { id: "H02_C", text: "Analiso todos os dados antes de agir", trait: "C", polarity: "positive", desirability: 8 }
    ]
  },
  {
    block_id: "H03",
    desirability_level: "high",
    items: [
      { id: "H03_D", text: "Lidero naturalmente quando vejo oportunidades", trait: "D", polarity: "positive", desirability: 8 },
      { id: "H03_I", text: "Transformo ambientes tensos em leves com meu humor", trait: "I", polarity: "positive", desirability: 8 },
      { id: "H03_S", text: "Sou o pilar de confiança da minha equipe", trait: "S", polarity: "positive", desirability: 8 },
      { id: "H03_C", text: "Entrego trabalhos com qualidade impecável", trait: "C", polarity: "positive", desirability: 8 }
    ]
  },
  {
    block_id: "H04",
    desirability_level: "high",
    items: [
      { id: "H04_D", text: "Não desisto facilmente diante de obstáculos", trait: "D", polarity: "positive", desirability: 7 },
      { id: "H04_I", text: "Pessoas me procuram para desabafar e pedir conselhos", trait: "I", polarity: "positive", desirability: 7 },
      { id: "H04_S", text: "Cumpro minhas promessas sem exceção", trait: "S", polarity: "positive", desirability: 7 },
      { id: "H04_C", text: "Identifico erros que outros deixam passar", trait: "C", polarity: "positive", desirability: 7 }
    ]
  },
  {
    block_id: "H05",
    desirability_level: "high",
    items: [
      { id: "H05_D", text: "Nego e defendo meus pontos com convicção", trait: "D", polarity: "positive", desirability: 7 },
      { id: "H05_I", text: "Energizo grupos com minha presença positiva", trait: "I", polarity: "positive", desirability: 7 },
      { id: "H05_S", text: "Escuto mais do que falo em conversas importantes", trait: "S", polarity: "positive", desirability: 7 },
      { id: "H05_C", text: "Planejo cada etapa antes de executar projetos", trait: "C", polarity: "positive", desirability: 7 }
    ]
  },
  {
    block_id: "H06",
    desirability_level: "high",
    items: [
      { id: "H06_D", text: "Aceito desafios que outros consideram impossíveis", trait: "D", polarity: "positive", desirability: 8 },
      { id: "H06_I", text: "Faço networking naturalmente em qualquer ambiente", trait: "I", polarity: "positive", desirability: 8 },
      { id: "H06_S", text: "Mantenho relacionamentos de longa duração", trait: "S", polarity: "positive", desirability: 8 },
      { id: "H06_C", text: "Documento processos para garantir replicabilidade", trait: "C", polarity: "positive", desirability: 8 }
    ]
  },
  {
    block_id: "H07",
    desirability_level: "high",
    items: [
      { id: "H07_D", text: "Busco ser referência em tudo que me proponho fazer", trait: "D", polarity: "positive", desirability: 7 },
      { id: "H07_I", text: "Celebro as conquistas dos outros como minhas", trait: "I", polarity: "positive", desirability: 7 },
      { id: "H07_S", text: "Priorizo o bem-estar coletivo acima do individual", trait: "S", polarity: "positive", desirability: 7 },
      { id: "H07_C", text: "Reviso meu trabalho múltiplas vezes antes de entregar", trait: "C", polarity: "positive", desirability: 7 }
    ]
  },
  {
    block_id: "H08",
    desirability_level: "high",
    items: [
      { id: "H08_D", text: "Supero metas e sempre busco ir além", trait: "D", polarity: "positive", desirability: 8 },
      { id: "H08_I", text: "Convenço pessoas com argumentos emocionais", trait: "I", polarity: "positive", desirability: 8 },
      { id: "H08_S", text: "Sou paciente com o ritmo de aprendizado dos outros", trait: "S", polarity: "positive", desirability: 8 },
      { id: "H08_C", text: "Organizo informações de forma lógica e acessível", trait: "C", polarity: "positive", desirability: 8 }
    ]
  },
  {
    block_id: "H09",
    desirability_level: "high",
    items: [
      { id: "H09_D", text: "Prospero em ambientes competitivos", trait: "D", polarity: "positive", desirability: 7 },
      { id: "H09_I", text: "Conto histórias que engajam e inspiram", trait: "I", polarity: "positive", desirability: 7 },
      { id: "H09_S", text: "Mediano conflitos buscando soluções justas", trait: "S", polarity: "positive", desirability: 7 },
      { id: "H09_C", text: "Questiono premissas para encontrar a melhor solução", trait: "C", polarity: "positive", desirability: 7 }
    ]
  },
  {
    block_id: "H10",
    desirability_level: "high",
    items: [
      { id: "H10_D", text: "Tomo a frente quando ninguém quer liderar", trait: "D", polarity: "positive", desirability: 8 },
      { id: "H10_I", text: "Reconheço e elogio as qualidades de cada pessoa", trait: "I", polarity: "positive", desirability: 8 },
      { id: "H10_S", text: "Apoio meus colegas mesmo fora do horário de trabalho", trait: "S", polarity: "positive", desirability: 8 },
      { id: "H10_C", text: "Aprendo com erros e melhoro continuamente", trait: "C", polarity: "positive", desirability: 8 }
    ]
  },

  // ========== MEDIUM DESIRABILITY (10 blocos) ==========
  {
    block_id: "M01",
    desirability_level: "medium",
    items: [
      { id: "M01_D", text: "Confronto problemas de frente sem hesitar", trait: "D", polarity: "positive", desirability: 6 },
      { id: "M01_I", text: "Sou o centro das atenções em grupos sociais", trait: "I", polarity: "positive", desirability: 6 },
      { id: "M01_S", text: "Evito mudanças bruscas sempre que possível", trait: "S", polarity: "positive", desirability: 6 },
      { id: "M01_C", text: "Questiono até encontrar a resposta correta", trait: "C", polarity: "positive", desirability: 6 }
    ]
  },
  {
    block_id: "M02",
    desirability_level: "medium",
    items: [
      { id: "M02_D", text: "Busco controle sobre situações e resultados", trait: "D", polarity: "positive", desirability: 5 },
      { id: "M02_I", text: "Prefiro trabalhar em equipe a trabalhar sozinho", trait: "I", polarity: "positive", desirability: 5 },
      { id: "M02_S", text: "Valorizo harmonia acima de velocidade", trait: "S", polarity: "positive", desirability: 5 },
      { id: "M02_C", text: "Sou perfeccionista em tudo que faço", trait: "C", polarity: "positive", desirability: 5 }
    ]
  },
  {
    block_id: "M03",
    desirability_level: "medium",
    items: [
      { id: "M03_D", text: "Cobro resultados da minha equipe com firmeza", trait: "D", polarity: "positive", desirability: 5 },
      { id: "M03_I", text: "Uso humor para aliviar tensões", trait: "I", polarity: "positive", desirability: 5 },
      { id: "M03_S", text: "Prefiro rotinas estabelecidas a improvisações", trait: "S", polarity: "positive", desirability: 5 },
      { id: "M03_C", text: "Verifico fatos antes de formar opiniões", trait: "C", polarity: "positive", desirability: 5 }
    ]
  },
  {
    block_id: "M04",
    desirability_level: "medium",
    items: [
      { id: "M04_D", text: "Expresso discordância abertamente", trait: "D", polarity: "positive", desirability: 6 },
      { id: "M04_I", text: "Gosto de apresentações públicas", trait: "I", polarity: "positive", desirability: 6 },
      { id: "M04_S", text: "Tenho poucos amigos, mas muito próximos", trait: "S", polarity: "positive", desirability: 6 },
      { id: "M04_C", text: "Prefiro trabalhar com prazos bem definidos", trait: "C", polarity: "positive", desirability: 6 }
    ]
  },
  {
    block_id: "M05",
    desirability_level: "medium",
    items: [
      { id: "M05_D", text: "Tomo iniciativa sem esperar instruções", trait: "D", polarity: "positive", desirability: 6 },
      { id: "M05_I", text: "Puxo conversa com desconhecidos facilmente", trait: "I", polarity: "positive", desirability: 6 },
      { id: "M05_S", text: "Cedo em discussões para manter a paz", trait: "S", polarity: "positive", desirability: 6 },
      { id: "M05_C", text: "Arquivo documentos de forma organizada", trait: "C", polarity: "positive", desirability: 6 }
    ]
  },
  {
    block_id: "M06",
    desirability_level: "medium",
    items: [
      { id: "M06_D", text: "Defendo minhas ideias mesmo contra maioria", trait: "D", polarity: "positive", desirability: 5 },
      { id: "M06_I", text: "Participo ativamente de eventos sociais", trait: "I", polarity: "positive", desirability: 5 },
      { id: "M06_S", text: "Guardo rancor por pouco tempo", trait: "S", polarity: "positive", desirability: 5 },
      { id: "M06_C", text: "Leio instruções antes de montar algo", trait: "C", polarity: "positive", desirability: 5 }
    ]
  },
  {
    block_id: "M07",
    desirability_level: "medium",
    items: [
      { id: "M07_D", text: "Acelero processos que considero lentos", trait: "D", polarity: "positive", desirability: 5 },
      { id: "M07_I", text: "Mantenho contato com muitas pessoas", trait: "I", polarity: "positive", desirability: 5 },
      { id: "M07_S", text: "Priorizo estabilidade financeira", trait: "S", polarity: "positive", desirability: 5 },
      { id: "M07_C", text: "Confiro cálculos mais de uma vez", trait: "C", polarity: "positive", desirability: 5 }
    ]
  },
  {
    block_id: "M08",
    desirability_level: "medium",
    items: [
      { id: "M08_D", text: "Negocio condições melhores para mim", trait: "D", polarity: "positive", desirability: 6 },
      { id: "M08_I", text: "Compartilho novidades com entusiasmo", trait: "I", polarity: "positive", desirability: 6 },
      { id: "M08_S", text: "Ajudo pessoas sem esperar retorno", trait: "S", polarity: "positive", desirability: 6 },
      { id: "M08_C", text: "Comparo opções antes de decidir compras", trait: "C", polarity: "positive", desirability: 6 }
    ]
  },
  {
    block_id: "M09",
    desirability_level: "medium",
    items: [
      { id: "M09_D", text: "Digo o que penso sem rodeios", trait: "D", polarity: "positive", desirability: 5 },
      { id: "M09_I", text: "Faço amizades em filas e salas de espera", trait: "I", polarity: "positive", desirability: 5 },
      { id: "M09_S", text: "Perdoo facilmente quem me magoou", trait: "S", polarity: "positive", desirability: 5 },
      { id: "M09_C", text: "Mantenho listas de tarefas atualizadas", trait: "C", polarity: "positive", desirability: 5 }
    ]
  },
  {
    block_id: "M10",
    desirability_level: "medium",
    items: [
      { id: "M10_D", text: "Estabeleço regras claras em projetos", trait: "D", polarity: "positive", desirability: 6 },
      { id: "M10_I", text: "Celebro pequenas vitórias com a equipe", trait: "I", polarity: "positive", desirability: 6 },
      { id: "M10_S", text: "Valorizo tradições e costumes", trait: "S", polarity: "positive", desirability: 6 },
      { id: "M10_C", text: "Faço backup de arquivos importantes", trait: "C", polarity: "positive", desirability: 6 }
    ]
  },

  // ========== LOW DESIRABILITY (10 blocos) ==========
  {
    block_id: "L01",
    desirability_level: "low",
    items: [
      { id: "L01_D", text: "Posso parecer impaciente com processos lentos", trait: "D", polarity: "negative", desirability: 4 },
      { id: "L01_I", text: "Às vezes falo demais em reuniões", trait: "I", polarity: "negative", desirability: 4 },
      { id: "L01_S", text: "Tenho dificuldade com urgências inesperadas", trait: "S", polarity: "negative", desirability: 4 },
      { id: "L01_C", text: "Posso ser crítico demais com erros", trait: "C", polarity: "negative", desirability: 4 }
    ]
  },
  {
    block_id: "L02",
    desirability_level: "low",
    items: [
      { id: "L02_D", text: "Às vezes ignoro opiniões para acelerar", trait: "D", polarity: "negative", desirability: 3 },
      { id: "L02_I", text: "Tenho dificuldade em trabalhar sozinho", trait: "I", polarity: "negative", desirability: 3 },
      { id: "L02_S", text: "Demoro para me adaptar a novas situações", trait: "S", polarity: "negative", desirability: 3 },
      { id: "L02_C", text: "Fico paralisado se não tenho todas informações", trait: "C", polarity: "negative", desirability: 3 }
    ]
  },
  {
    block_id: "L03",
    desirability_level: "low",
    items: [
      { id: "L03_D", text: "Interrompo pessoas quando discordo", trait: "D", polarity: "negative", desirability: 3 },
      { id: "L03_I", text: "Perco foco quando a tarefa é repetitiva", trait: "I", polarity: "negative", desirability: 3 },
      { id: "L03_S", text: "Evito dar feedbacks negativos", trait: "S", polarity: "negative", desirability: 3 },
      { id: "L03_C", text: "Refaço trabalho de outros sem avisar", trait: "C", polarity: "negative", desirability: 3 }
    ]
  },
  {
    block_id: "L04",
    desirability_level: "low",
    items: [
      { id: "L04_D", text: "Fico frustrado quando não estou no controle", trait: "D", polarity: "negative", desirability: 4 },
      { id: "L04_I", text: "Prometo mais do que consigo entregar", trait: "I", polarity: "negative", desirability: 4 },
      { id: "L04_S", text: "Digo sim quando quero dizer não", trait: "S", polarity: "negative", desirability: 4 },
      { id: "L04_C", text: "Aponto erros antes de elogiar acertos", trait: "C", polarity: "negative", desirability: 4 }
    ]
  },
  {
    block_id: "L05",
    desirability_level: "low",
    items: [
      { id: "L05_D", text: "Descarto sugestões que parecem fracas", trait: "D", polarity: "negative", desirability: 3 },
      { id: "L05_I", text: "Mudo de assunto quando perco interesse", trait: "I", polarity: "negative", desirability: 3 },
      { id: "L05_S", text: "Aceito situações injustas para evitar conflito", trait: "S", polarity: "negative", desirability: 3 },
      { id: "L05_C", text: "Demoro excessivamente em tarefas simples", trait: "C", polarity: "negative", desirability: 3 }
    ]
  },
  {
    block_id: "L06",
    desirability_level: "low",
    items: [
      { id: "L06_D", text: "Sou competitivo até em situações informais", trait: "D", polarity: "negative", desirability: 4 },
      { id: "L06_I", text: "Falo sobre mim mais do que deveria", trait: "I", polarity: "negative", desirability: 4 },
      { id: "L06_S", text: "Guardo mágoas por muito tempo", trait: "S", polarity: "negative", desirability: 4 },
      { id: "L06_C", text: "Questiono decisões já tomadas pela equipe", trait: "C", polarity: "negative", desirability: 4 }
    ]
  },
  {
    block_id: "L07",
    desirability_level: "low",
    items: [
      { id: "L07_D", text: "Assumo tarefas dos outros por impaciência", trait: "D", polarity: "negative", desirability: 3 },
      { id: "L07_I", text: "Esqueço detalhes importantes de conversas", trait: "I", polarity: "negative", desirability: 3 },
      { id: "L07_S", text: "Evito assumir posições de liderança", trait: "S", polarity: "negative", desirability: 3 },
      { id: "L07_C", text: "Travo em decisões com múltiplas opções", trait: "C", polarity: "negative", desirability: 3 }
    ]
  },
  {
    block_id: "L08",
    desirability_level: "low",
    items: [
      { id: "L08_D", text: "Fico irritado com pessoas indecisas", trait: "D", polarity: "negative", desirability: 4 },
      { id: "L08_I", text: "Começo projetos e perco interesse no meio", trait: "I", polarity: "negative", desirability: 4 },
      { id: "L08_S", text: "Tenho medo de decepcionar expectativas", trait: "S", polarity: "negative", desirability: 4 },
      { id: "L08_C", text: "Critico mentalmente quem comete erros", trait: "C", polarity: "negative", desirability: 4 }
    ]
  },
  {
    block_id: "L09",
    desirability_level: "low",
    items: [
      { id: "L09_D", text: "Desvalorizo tarefas que considero triviais", trait: "D", polarity: "negative", desirability: 3 },
      { id: "L09_I", text: "Preciso de validação constante", trait: "I", polarity: "negative", desirability: 3 },
      { id: "L09_S", text: "Resisto a mudanças mesmo quando necessárias", trait: "S", polarity: "negative", desirability: 3 },
      { id: "L09_C", text: "Levo críticas para o lado pessoal", trait: "C", polarity: "negative", desirability: 3 }
    ]
  },
  {
    block_id: "L10",
    desirability_level: "low",
    items: [
      { id: "L10_D", text: "Monopolizo discussões quando tenho certeza", trait: "D", polarity: "negative", desirability: 4 },
      { id: "L10_I", text: "Sou desorganizado com documentos e prazos", trait: "I", polarity: "negative", desirability: 4 },
      { id: "L10_S", text: "Preciso de tempo excessivo para decidir", trait: "S", polarity: "negative", desirability: 4 },
      { id: "L10_C", text: "Sou pessimista sobre novos projetos", trait: "C", polarity: "negative", desirability: 4 }
    ]
  }
];

// Função para selecionar blocos aleatórios mantendo proporção
const selectRandomBlocks = (_count: number = 6): ItemBlock[] => {
  const highBlocks = fullQuestionBank.filter(b => b.desirability_level === 'high');
  const mediumBlocks = fullQuestionBank.filter(b => b.desirability_level === 'medium');
  const lowBlocks = fullQuestionBank.filter(b => b.desirability_level === 'low');
  
  // Embaralhar cada grupo
  const shuffle = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };
  
  // Selecionar 2 de cada nível
  const selected = [
    ...shuffle(highBlocks).slice(0, 2),
    ...shuffle(mediumBlocks).slice(0, 2),
    ...shuffle(lowBlocks).slice(0, 2)
  ];
  
  // Embaralhar a ordem final
  return shuffle(selected);
};

// Função selectRandomBlocks é usada pelo state activeBlocks

const traitDescriptions = {
  D: {
    name: "Dominancia",
    color: "#EF4444",
    icon: "D",
    keywords: ["Resultados", "Decisao", "Competicao", "Desafios"],
    strengths: ["Orientado a resultados", "Decisivo", "Assume riscos", "Resolve problemas"],
    challenges: ["Impaciente", "Insensivel", "Controlador", "Argumentativo"],
    saboteurs: ["Controlador", "Hiper-realizador"],
    communication: "Seja direto, foque em resultados, evite detalhes desnecessarios"
  },
  I: {
    name: "Influencia",
    color: "#F59E0B",
    icon: "I",
    keywords: ["Pessoas", "Entusiasmo", "Colaboracao", "Reconhecimento"],
    strengths: ["Comunicativo", "Otimista", "Inspirador", "Colaborativo"],
    challenges: ["Desorganizado", "Impulsivo", "Superficial", "Distraido"],
    saboteurs: ["Inquieto", "Prestativo"],
    communication: "Seja amigavel, permita expressao, reconheca contribuicoes"
  },
  S: {
    name: "Estabilidade",
    color: "#22C55E",
    icon: "S",
    keywords: ["Harmonia", "Paciencia", "Lealdade", "Consistencia"],
    strengths: ["Confiavel", "Paciente", "Leal", "Bom ouvinte"],
    challenges: ["Resistente a mudancas", "Passivo", "Indeciso", "Evita conflitos"],
    saboteurs: ["Vitima", "Esquivo"],
    communication: "Seja paciente, de tempo para processar, ofereca seguranca"
  },
  C: {
    name: "Conformidade",
    color: "#3B82F6",
    icon: "C",
    keywords: ["Qualidade", "Precisao", "Analise", "Processos"],
    strengths: ["Analitico", "Preciso", "Sistematico", "Alto padrao"],
    challenges: ["Perfeccionista", "Critico", "Lento", "Pessimista"],
    saboteurs: ["Hiper-vigilante", "Hiper-racional"],
    communication: "Forneca dados, seja logico, de tempo para analise"
  }
};

type ActiveTool = 'dashboard' | 'diagnostic' | 'pdi' | 'goals' | 'chat' | 'reports';

export default function KaiaMVP() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [activeTool, setActiveTool] = useState<ActiveTool>('dashboard');
  
  // Profiler State
  const [profilerPhase, setProfilerPhase] = useState<'intro' | 'natural' | 'adapted' | 'result'>('intro');
  const [currentBlock, setCurrentBlock] = useState(0);
  const [naturalAnswers, setNaturalAnswers] = useState<{[key: string]: {most: string; least: string}}>({});
  const [adaptedAnswers, setAdaptedAnswers] = useState<{[key: string]: {most: string; least: string}}>({});
  const [selectedMost, setSelectedMost] = useState<string | null>(null);
  const [selectedLeast, setSelectedLeast] = useState<string | null>(null);
  const [profileResult, setProfileResult] = useState<ProfileResult | null>(null);
  const [activeBlocks, setActiveBlocks] = useState<ItemBlock[]>(() => selectRandomBlocks());
  const [validationResult, setValidationResult] = useState<{
    overallValid: boolean;
    overallConfidence: number;
    recommendation: string;
  } | null>(null);

  // Chat State
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Ola! Sou a Kaia, sua assistente de desenvolvimento pessoal. Como posso ajudar voce hoje?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('kaia_user');
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setLocation('/kaia/login');
    }

    // Validar banco de questões na inicialização
    const qbValidation = QuestionBankValidator.validateQuestionBank(fullQuestionBank);
    console.log('=== VALIDAÇÃO BANCO DE QUESTÕES ===');
    console.log('Total de blocos:', fullQuestionBank.length);
    console.log('Válido:', qbValidation.isValid);
    console.log('Confiança:', qbValidation.confidence + '%');
    if (qbValidation.errors.length > 0) {
      console.warn('Erros encontrados:', qbValidation.errors);
    }
    console.log('===================================');
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem('kaia_user');
    setLocation('/kaia/login');
  };

  // Calculate Profile
  const calculateProfile = () => {
      const naturalScores = { D: 50, I: 50, S: 50, C: 50 };
      const adaptedScores = { D: 50, I: 50, S: 50, C: 50 };

      Object.values(naturalAnswers).forEach(answer => {
        const mostItem = activeBlocks.flatMap(b => b.items).find(i => i.id === answer.most);
        const leastItem = activeBlocks.flatMap(b => b.items).find(i => i.id === answer.least);

        if (mostItem) {
          naturalScores[mostItem.trait] += mostItem.polarity === 'positive' ? 8 : -4;
        }
        if (leastItem) {
          naturalScores[leastItem.trait] += leastItem.polarity === 'positive' ? -6 : 2;
        }
      });

      Object.values(adaptedAnswers).forEach(answer => {
        const mostItem = activeBlocks.flatMap(b => b.items).find(i => i.id === answer.most);
        const leastItem = activeBlocks.flatMap(b => b.items).find(i => i.id === answer.least);

        if (mostItem) {
          adaptedScores[mostItem.trait] += mostItem.polarity === 'positive' ? 8 : -4;
        }
        if (leastItem) {
          adaptedScores[leastItem.trait] += leastItem.polarity === 'positive' ? -6 : 2;
        }
      });    const normalize = (scores: typeof naturalScores) => {
      const min = Math.min(...Object.values(scores));
      const max = Math.max(...Object.values(scores));
      const range = max - min || 1;
      return {
        D: Math.round(((scores.D - min) / range) * 100),
        I: Math.round(((scores.I - min) / range) * 100),
        S: Math.round(((scores.S - min) / range) * 100),
        C: Math.round(((scores.C - min) / range) * 100)
      };
    };

    const natural = normalize(naturalScores);
    const adapted = normalize(adaptedScores);
    const sortedNatural = Object.entries(natural).sort((a, b) => b[1] - a[1]);
    
    const adaptationCost = Math.round(
      (Math.abs(natural.D - adapted.D) + 
       Math.abs(natural.I - adapted.I) + 
       Math.abs(natural.S - adapted.S) + 
       Math.abs(natural.C - adapted.C)) / 4
    );

    const riskIndicators: string[] = [];
    if (adaptationCost > 25) riskIndicators.push("Alto custo energetico de adaptacao");
    if (Math.abs(natural.D - adapted.D) > 30) riskIndicators.push("Overshift em Dominancia - possivel burnout");
    if (natural.S > 80 && adapted.S < 40) riskIndicators.push("Forcando ritmo nao natural - risco de estresse");

    const dominantTrait = sortedNatural[0][0] as keyof typeof traitDescriptions;
    const dominantInfo = traitDescriptions[dominantTrait];

    const finalResult = {
      natural,
      adapted,
      dominantTrait: sortedNatural[0][0],
      secondaryTrait: sortedNatural[1][0],
      adaptationCost,
      riskIndicators,
      saboteurs: dominantInfo.saboteurs,
      strengths: dominantInfo.strengths
    };

    // Executar validação anti-alucinação
    const qaResult = QAMonitor.runFullValidation(
      activeBlocks,
      naturalAnswers,
      adaptedAnswers,
      finalResult
    );

    console.log('=== KAIA QA VALIDATION ===');
    console.log('Confiança:', qaResult.overallConfidence + '%');
    console.log('Válido:', qaResult.overallValid);
    console.log('Recomendação:', qaResult.recommendation);
    if (qaResult.reportValidation.errors.length > 0) {
      console.log('Erros:', qaResult.reportValidation.errors);
    }
    if (qaResult.reportValidation.warnings.length > 0) {
      console.log('Avisos:', qaResult.reportValidation.warnings);
    }
    console.log('Checksum:', qaResult.reportValidation.auditLog.find(a => a.checksum)?.checksum);
    console.log('=========================');

    setValidationResult({
      overallValid: qaResult.overallValid,
      overallConfidence: qaResult.overallConfidence,
      recommendation: qaResult.recommendation
    });

    setProfileResult(finalResult);
    setProfilerPhase('result');
  };

  const handleProfilerAnswer = () => {
    if (!selectedMost || !selectedLeast) return;
    
    const answers = profilerPhase === 'natural' ? naturalAnswers : adaptedAnswers;
    const setAnswers = profilerPhase === 'natural' ? setNaturalAnswers : setAdaptedAnswers;
    
    setAnswers({
      ...answers,
      [activeBlocks[currentBlock].block_id]: { most: selectedMost, least: selectedLeast }
    });

    setSelectedMost(null);
    setSelectedLeast(null);

    if (currentBlock < activeBlocks.length - 1) {
      setCurrentBlock(currentBlock + 1);
    } else {
      if (profilerPhase === 'natural') {
        setProfilerPhase('adapted');
        setCurrentBlock(0);
      } else {
        calculateProfile();
      }
    }
  };

  const resetProfiler = () => {
      // Regenerar blocos aleatórios para novo teste
      const newBlocks = selectRandomBlocks();
      setActiveBlocks(newBlocks);
      setProfilerPhase('intro');
      setCurrentBlock(0);
      setNaturalAnswers({});
      setAdaptedAnswers({});
      setSelectedMost(null);
      setSelectedLeast(null);
      setProfileResult(null);
    };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses = [
      'Interessante! Baseado no seu perfil, sugiro focar em desenvolver sua inteligencia emocional.',
      'Entendi. Vamos criar um plano de acao especifico para essa meta.',
      'Essa e uma otima reflexao! O autoconhecimento e o primeiro passo para o crescimento.',
      'Posso te ajudar a mapear seus pontos fortes e areas de desenvolvimento.',
      'Vamos trabalhar isso juntos! Qual prazo voce considera realista para essa meta?'
    ];

    setChatMessages(prev => [...prev, {
      role: 'ai',
      text: responses[Math.floor(Math.random() * responses.length)]
    }]);
    setIsTyping(false);
  };

  if (!user) {
    return (
      <div className="tech-noir-page">
        <div className="tech-noir-bg"></div>
        <div style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.6)' }}>Carregando...</p>
        </div>
      </div>
    );
  }

  const tools = [
    { id: 'dashboard' as ActiveTool, icon: '', label: 'Dashboard' },
    { id: 'diagnostic' as ActiveTool, icon: '', label: 'Diagnostico' },
    { id: 'pdi' as ActiveTool, icon: '', label: 'PDI' },
    { id: 'goals' as ActiveTool, icon: '', label: 'Metas' },
    { id: 'chat' as ActiveTool, icon: '', label: 'Chat IA' },
    { id: 'reports' as ActiveTool, icon: '', label: 'Relatorios' }
  ];

  // Render Profiler Intro
  const renderProfilerIntro = () => (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '24px' }}></div>
      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: 800,
        background: 'linear-gradient(135deg, #22D3EE, #0891B2)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '16px'
      }}>
        Mapeamento Comportamental DISC
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '32px', lineHeight: 1.6 }}>
        Descubra seu perfil comportamental atraves de uma metodologia cientifica baseada em 
        <strong style={{ color: '#22D3EE' }}> TRI (Teoria de Resposta ao Item)</strong> e 
        <strong style={{ color: '#22D3EE' }}> modelo DISC</strong>.
      </p>

      <div style={{ 
        background: 'rgba(34, 211, 238, 0.1)', 
        border: '1px solid rgba(34, 211, 238, 0.3)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        textAlign: 'left'
      }}>
        <h3 style={{ color: '#22D3EE', marginBottom: '16px', fontSize: '1rem' }}>Como funciona:</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          <li>Voce vera blocos de 4 afirmacoes</li>
          <li>Escolha qual <strong>"Mais parece com voce"</strong></li>
          <li>Escolha qual <strong>"Menos parece com voce"</strong></li>
          <li>Nao ha respostas certas ou erradas</li>
        </ul>
      </div>

      <div style={{ 
        background: 'rgba(251, 191, 36, 0.1)', 
        border: '1px solid rgba(251, 191, 36, 0.3)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '32px',
        textAlign: 'left'
      }}>
        <h3 style={{ color: '#FCD34D', marginBottom: '8px', fontSize: '0.95rem' }}>Duas etapas:</h3>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
          <strong>1. Perfil Natural:</strong> Como voce age quando relaxado<br/>
          <strong>2. Perfil Adaptado:</strong> Como voce age no trabalho
        </p>
      </div>

      <button
        onClick={() => setProfilerPhase('natural')}
        style={{
          background: 'linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)',
          color: '#fff',
          border: 'none',
          padding: '16px 48px',
          fontSize: '1.1rem',
          fontWeight: 600,
          borderRadius: '12px',
          cursor: 'pointer'
        }}
      >
        Iniciar Mapeamento
      </button>
      <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
        Tempo estimado: 8-12 minutos
      </p>
    </div>
  );

  // Render Profiler Questions
  const renderProfilerQuestions = () => {
    const block = activeBlocks[currentBlock];
    const progress = ((currentBlock + 1) / activeBlocks.length) * 100;
    const phaseLabel = profilerPhase === 'natural' ? 'Perfil Natural' : 'Perfil Adaptado';
    const phaseContext = profilerPhase === 'natural' 
      ? 'Como voce age quando esta relaxado e sendo voce mesmo?' 
      : 'Como voce age no ambiente de trabalho?';

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ 
              background: profilerPhase === 'natural' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(139, 92, 246, 0.2)',
              color: profilerPhase === 'natural' ? '#22C55E' : '#8B5CF6',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              {phaseLabel}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              {currentBlock + 1} / {activeBlocks.length}
            </span>
          </div>
          
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
            <div style={{ 
              height: '100%', 
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #22D3EE, #0891B2)',
              borderRadius: '2px',
              transition: 'width 0.3s ease'
            }} />
          </div>

          <p style={{ margin: '16px 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
            {phaseContext}
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ marginBottom: '16px', fontWeight: 600, fontSize: '0.95rem' }}>
            Selecione: <span style={{ color: '#22C55E' }}>Mais parece</span> e <span style={{ color: '#EF4444' }}>Menos parece</span>
          </p>
          
          {block.items.map(item => {
            const isMost = selectedMost === item.id;
            const isLeast = selectedLeast === item.id;
            
            return (
              <div
                key={item.id}
                style={{
                  background: isMost ? 'rgba(34, 197, 94, 0.15)' : isLeast ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 30, 60, 0.5)',
                  border: `2px solid ${isMost ? '#22C55E' : isLeast ? '#EF4444' : 'rgba(34, 211, 238, 0.2)'}`,
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '12px'
                }}
              >
                <p style={{ margin: '0 0 12px', fontSize: '0.95rem' }}>{item.text}</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => {
                      if (selectedLeast === item.id) setSelectedLeast(null);
                      setSelectedMost(selectedMost === item.id ? null : item.id);
                    }}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: isMost ? '#22C55E' : 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid #22C55E',
                      borderRadius: '8px',
                      color: isMost ? '#fff' : '#22C55E',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.85rem'
                    }}
                  >
                    + Mais parece
                  </button>
                  <button
                    onClick={() => {
                      if (selectedMost === item.id) setSelectedMost(null);
                      setSelectedLeast(selectedLeast === item.id ? null : item.id);
                    }}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: isLeast ? '#EF4444' : 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid #EF4444',
                      borderRadius: '8px',
                      color: isLeast ? '#fff' : '#EF4444',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.85rem'
                    }}
                  >
                    - Menos parece
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleProfilerAnswer}
          disabled={!selectedMost || !selectedLeast}
          style={{
            width: '100%',
            padding: '16px',
            background: selectedMost && selectedLeast 
              ? 'linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)' 
              : 'rgba(255,255,255,0.1)',
            color: selectedMost && selectedLeast ? '#fff' : 'rgba(255,255,255,0.3)',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: selectedMost && selectedLeast ? 'pointer' : 'not-allowed'
          }}
        >
          {currentBlock === activeBlocks.length - 1 && profilerPhase === 'adapted' 
            ? 'Ver Resultado' 
            : currentBlock === activeBlocks.length - 1 
              ? 'Proxima Etapa' 
              : 'Continuar'}
        </button>
      </div>
    );
  };

  // Render Profiler Result
  const renderProfilerResult = () => {
    if (!profileResult) return null;

    // Gerar relatório DISC completo usando o motor
    const discReport = DISCReportEngine.generateFullReport(
      profileResult.natural,
      profileResult.adapted,
      validationResult?.overallConfidence || 100
    );

    return (
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Badge de Validação QA no topo */}
        {validationResult && (
          <div style={{
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: validationResult.overallConfidence >= 95
                ? 'rgba(34, 197, 94, 0.15)'
                : validationResult.overallConfidence >= 80
                  ? 'rgba(251, 191, 36, 0.15)'
                  : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${
                validationResult.overallConfidence >= 95
                  ? 'rgba(34, 197, 94, 0.4)'
                  : validationResult.overallConfidence >= 80
                    ? 'rgba(251, 191, 36, 0.4)'
                    : 'rgba(239, 68, 68, 0.4)'
              }`,
              borderRadius: '24px'
            }}>
              <span style={{ fontSize: '1rem' }}>
                {validationResult.overallConfidence >= 95 ? '✅' : validationResult.overallConfidence >= 80 ? '⚠️' : '❌'}
              </span>
              <span style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: validationResult.overallConfidence >= 95
                  ? '#22C55E'
                  : validationResult.overallConfidence >= 80
                    ? '#FCD34D'
                    : '#EF4444'
              }}>
                Validacao Cientifica: {validationResult.overallConfidence}%
              </span>
            </div>
          </div>
        )}

        {/* Relatório DISC Completo */}
          <DISCFullReport
            report={discReport}
            userName={user?.name || 'Participante'}
            userEmail={user?.email}
            onSaveReport={saveReportToDatabase}
          />        {/* CTAs */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          justifyContent: 'center',
          marginTop: '32px' 
        }}>
          <button
            onClick={resetProfiler}
            style={{
              background: 'transparent',
              color: '#22D3EE',
              border: '1px solid #22D3EE',
              padding: '14px 28px',
              fontSize: '1rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Refazer Teste
          </button>
          <button
            onClick={() => setActiveTool('pdi')}
            style={{
              background: 'linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)',
              color: '#fff',
              border: 'none',
              padding: '14px 28px',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            Gerar meu PDI
          </button>
        </div>
      </div>
    );
  };  return (
    <div className="tech-noir-page">
      <div className="tech-noir-bg"></div>
      <div className="noise-overlay"></div>

      {/* Sidebar - App Style */}
      <aside style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '64px',
        background: 'linear-gradient(180deg, rgba(0, 15, 30, 0.98) 0%, rgba(0, 10, 25, 0.98) 100%)',
        borderRight: '1px solid rgba(34, 211, 238, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 0',
        zIndex: 100
      }}>
        {/* Logo compacto */}
        <Link href="/kaia" style={{ marginBottom: '24px', opacity: 0.9, transition: 'opacity 0.2s' }}>
          <KaiaWaterLogo style={{ height: '32px' }} showText={false} />
        </Link>

        {/* Navigation Icons */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, width: '100%', padding: '0 8px' }}>
          {tools.map(tool => {
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                title={tool.label}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  border: 'none',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.25), rgba(8, 145, 178, 0.15))'
                    : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  boxShadow: isActive
                    ? '0 0 20px rgba(34, 211, 238, 0.3), inset 0 0 15px rgba(34, 211, 238, 0.1)'
                    : 'none',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(34, 211, 238, 0.08)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                <span style={{
                  fontSize: '1.4rem',
                  filter: isActive ? 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))' : 'none',
                  transition: 'filter 0.2s'
                }}>{tool.icon}</span>
                
                {/* Active indicator - glow bar */}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    left: '-8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3px',
                    height: '28px',
                    background: 'linear-gradient(180deg, #22D3EE 0%, #0891B2 100%)',
                    borderRadius: '0 4px 4px 0',
                    boxShadow: '0 0 12px rgba(34, 211, 238, 0.8), 0 0 24px rgba(34, 211, 238, 0.4)'
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          title="Sair"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#EF4444',
            fontSize: '1rem',
            transition: 'all 0.2s',
            marginTop: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.25)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          ✕
        </button>
      </aside>

      {/* Main Content */}
      <main style={{
        marginLeft: '64px',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Header - Compact */}
        <header style={{
          padding: '12px 24px',
          borderBottom: '1px solid rgba(34, 211, 238, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(0, 10, 20, 0.6)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h1 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #22D3EE, #0891B2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {tools.find(t => t.id === activeTool)?.label}
            </h1>
            <span style={{ 
              color: 'rgba(255,255,255,0.35)', 
              fontSize: '0.7rem',
              padding: '3px 8px',
              background: 'rgba(34, 211, 238, 0.08)',
              borderRadius: '4px'
            }}>
              MVP
            </span>
          </div>
          <div style={{
            padding: '6px 14px',
            background: 'rgba(34, 211, 238, 0.1)',
            border: '1px solid rgba(34, 211, 238, 0.2)',
            borderRadius: '6px',
            color: '#22D3EE',
            fontSize: '0.75rem',
            fontWeight: '500'
          }}>
            {user?.name}
          </div>
        </header>

        {/* Content Area */}
        <div style={{ padding: '24px' }}>

          {/* Dashboard */}
          {activeTool === 'dashboard' && (
            <div style={{ display: 'grid', gap: '24px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                {[
                  { icon: '', label: 'Diagnosticos', value: profileResult ? '1' : '0', color: '#22D3EE' },
                  { icon: '', label: 'PDIs Ativos', value: '0', color: '#0EA5E9' },
                  { icon: '', label: 'Metas', value: '0', color: '#3B82F6' },
                  { icon: '', label: 'Conversas IA', value: String(chatMessages.length - 1), color: '#6366F1' }
                ].map((stat, i) => (
                  <div key={i} style={{
                    padding: '24px',
                    background: 'rgba(0, 20, 40, 0.6)',
                    border: '1px solid rgba(34, 211, 238, 0.15)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      {stat.icon}
                    </div>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{stat.label}</div>
                      <div style={{ fontSize: '2rem', fontWeight: '700', color: stat.color }}>{stat.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                padding: '32px',
                background: 'rgba(0, 20, 40, 0.6)',
                border: '1px solid rgba(34, 211, 238, 0.15)',
                borderRadius: '16px'
              }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}> Comece sua jornada</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  {/* MVP TESTAR - Destaque Premium */}
                  <button
                    onClick={() => setActiveTool('diagnostic')}
                    style={{
                      padding: '20px',
                      background: 'linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)',
                      border: '2px solid rgba(34, 211, 238, 0.5)',
                      borderRadius: '12px',
                      color: '#fff',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(34, 211, 238, 0.6)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(34, 211, 238, 0.3)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ position: 'absolute', top: '-50%', right: '-50%', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', animation: 'pulse 3s ease-in-out infinite' }} />
                    <span style={{ fontSize: '2rem', display: 'block', marginBottom: '4px' }}>🎯</span>
                    <h3 style={{ margin: '8px 0 4px', fontSize: '1.1rem', fontWeight: '700' }}>TESTAR MVP</h3>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem', margin: 0 }}>
                      Mapeamento DISC completo
                    </p>
                    <span style={{ display: 'inline-block', marginTop: '8px', fontSize: '0.75rem', background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '4px' }}>
                      ⚡ Grátis por 7 dias
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTool('diagnostic')}
                    style={{
                      padding: '20px',
                      background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(8, 145, 178, 0.1))',
                      border: '1px solid rgba(34, 211, 238, 0.3)',
                      borderRadius: '12px',
                      color: '#fff',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}></span>
                    <h3 style={{ margin: '12px 0 4px', fontSize: '1rem' }}>Fazer Diagnostico DISC</h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: 0 }}>
                      Mapeamento comportamental completo
                    </p>
                  </button>
                  <button
                    onClick={() => setActiveTool('chat')}
                    style={{
                      padding: '20px',
                      background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(59, 130, 246, 0.1))',
                      border: '1px solid rgba(14, 165, 233, 0.3)',
                      borderRadius: '12px',
                      color: '#fff',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}></span>
                    <h3 style={{ margin: '12px 0 4px', fontSize: '1rem' }}>Conversar com Kaia</h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: 0 }}>
                      Tire duvidas e receba orientacoes
                    </p>
                  </button>
                </div>

                <style>{`
                  @keyframes pulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                  }
                `}</style>
              </div>
            </div>
          )}

          {/* Diagnostic Tool - PROFILER */}
          {activeTool === 'diagnostic' && (
            <div>
              {profilerPhase === 'intro' && renderProfilerIntro()}
              {(profilerPhase === 'natural' || profilerPhase === 'adapted') && renderProfilerQuestions()}
              {profilerPhase === 'result' && renderProfilerResult()}
            </div>
          )}

          {/* Chat with Kaia */}
          {activeTool === 'chat' && (
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              height: 'calc(100vh - 180px)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                flex: 1,
                background: 'rgba(0, 20, 40, 0.6)',
                border: '1px solid rgba(34, 211, 238, 0.15)',
                borderRadius: '20px 20px 0 0',
                padding: '24px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                  }}>
                    <div style={{
                      maxWidth: '70%',
                      padding: '14px 18px',
                      borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: msg.role === 'user'
                        ? 'linear-gradient(135deg, #22D3EE, #0891B2)'
                        : 'rgba(0, 30, 60, 0.8)',
                      border: msg.role === 'ai' ? '1px solid rgba(34, 211, 238, 0.2)' : 'none'
                    }}>
                      {msg.role === 'ai' && (
                        <div style={{ fontSize: '0.75rem', color: '#22D3EE', marginBottom: '6px' }}>
                           Kaia
                        </div>
                      )}
                      <p style={{ margin: 0, lineHeight: 1.5 }}>{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{
                      padding: '14px 18px',
                      borderRadius: '16px 16px 16px 4px',
                      background: 'rgba(0, 30, 60, 0.8)',
                      border: '1px solid rgba(34, 211, 238, 0.2)'
                    }}>
                      <span style={{ color: 'rgba(255,255,255,0.5)' }}>Kaia esta digitando...</span>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleChatSubmit} style={{
                display: 'flex',
                gap: '12px',
                padding: '16px 24px',
                background: 'rgba(0, 15, 30, 0.9)',
                border: '1px solid rgba(34, 211, 238, 0.15)',
                borderTop: 'none',
                borderRadius: '0 0 20px 20px'
              }}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  style={{
                    flex: 1,
                    padding: '14px 18px',
                    background: 'rgba(0, 30, 60, 0.5)',
                    border: '1px solid rgba(34, 211, 238, 0.2)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
                <button type="submit" style={{
                  padding: '14px 24px',
                  background: 'linear-gradient(135deg, #22D3EE, #0891B2)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Enviar
                </button>
              </form>
            </div>
          )}

          {/* PDI */}
          {activeTool === 'pdi' && (
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              padding: '40px',
              background: 'rgba(0, 20, 40, 0.6)',
              border: '1px solid rgba(34, 211, 238, 0.15)',
              borderRadius: '20px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '4rem' }}></span>
              <h2 style={{ fontSize: '1.5rem', margin: '20px 0 12px' }}>PDI Inteligente</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>
                Complete seu diagnostico para gerar um Plano de Desenvolvimento Individual personalizado.
              </p>
              {profileResult ? (
                <div style={{
                  padding: '20px',
                  background: 'rgba(34, 211, 238, 0.1)',
                  borderRadius: '12px',
                  marginBottom: '20px'
                }}>
                  <p style={{ color: '#22D3EE', margin: 0 }}> Diagnostico completo! PDI em breve...</p>
                </div>
              ) : (
                <button
                  onClick={() => setActiveTool('diagnostic')}
                  style={{
                    padding: '14px 28px',
                    background: 'linear-gradient(135deg, #22D3EE, #0891B2)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Fazer Diagnostico Primeiro
                </button>
              )}
            </div>
          )}

          {/* Goals */}
          {activeTool === 'goals' && (
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              padding: '40px',
              background: 'rgba(0, 20, 40, 0.6)',
              border: '1px solid rgba(34, 211, 238, 0.15)',
              borderRadius: '20px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '4rem' }}></span>
              <h2 style={{ fontSize: '1.5rem', margin: '20px 0 12px' }}>Gestao de Metas</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>
                Defina metas SMART e acompanhe seu progresso em tempo real.
              </p>
              <p style={{
                padding: '16px',
                background: 'rgba(14, 165, 233, 0.1)',
                borderRadius: '8px',
                color: '#0EA5E9',
                fontSize: '0.9rem'
              }}>
                 Funcionalidade em desenvolvimento para o MVP
              </p>
            </div>
          )}

          {/* Reports */}
          {activeTool === 'reports' && (
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              padding: '40px',
              background: 'rgba(0, 20, 40, 0.6)',
              border: '1px solid rgba(34, 211, 238, 0.15)',
              borderRadius: '20px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '4rem' }}></span>
              <h2 style={{ fontSize: '1.5rem', margin: '20px 0 12px' }}>Relatorios e Analytics</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>
                Visualize metricas e insights sobre seu desenvolvimento.
              </p>
              <p style={{
                padding: '16px',
                background: 'rgba(14, 165, 233, 0.1)',
                borderRadius: '8px',
                color: '#0EA5E9',
                fontSize: '0.9rem'
              }}>
                 Funcionalidade em desenvolvimento para o MVP
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}





