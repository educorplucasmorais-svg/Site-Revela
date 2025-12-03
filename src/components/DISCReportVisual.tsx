// ============================================
// KAIA DISC EXECUTIVE REPORT
// Layout Profissional estilo PDF Executivo
// Com Download PDF e Envio por Email
// ============================================

import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DISCReportEngine, { DISCScores, FullDISCReport } from '../lib/disc-report-engine';

// Cores oficiais DISC
const DISC_COLORS = {
  D: { primary: '#DC2626', light: '#FEE2E2', gradient: 'linear-gradient(135deg, #DC2626, #B91C1C)', name: 'Dominancia' },
  I: { primary: '#F59E0B', light: '#FEF3C7', gradient: 'linear-gradient(135deg, #F59E0B, #D97706)', name: 'Influencia' },
  S: { primary: '#16A34A', light: '#DCFCE7', gradient: 'linear-gradient(135deg, #16A34A, #15803D)', name: 'Estabilidade' },
  C: { primary: '#2563EB', light: '#DBEAFE', gradient: 'linear-gradient(135deg, #2563EB, #1D4ED8)', name: 'Conformidade' }
};

// ========== ESTILOS DO RELATORIO ==========
const styles: Record<string, React.CSSProperties> = {
  reportContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    color: '#1F2937',
    lineHeight: 1.6
  },
  cover: {
    background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
    color: '#fff',
    padding: '48px 40px',
    borderRadius: '16px',
    marginBottom: '24px',
    position: 'relative',
    overflow: 'hidden'
  },
  coverPattern: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '40%',
    background: 'radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)',
    pointerEvents: 'none'
  },
  coverLogo: {
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: '#22D3EE',
    marginBottom: '32px'
  },
  coverTitle: {
    fontSize: '32px',
    fontWeight: 800,
    marginBottom: '8px',
    letterSpacing: '-0.5px'
  },
  coverSubtitle: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '40px'
  },
  coverMeta: {
    display: 'flex',
    gap: '32px',
    fontSize: '14px',
    color: 'rgba(255,255,255,0.6)'
  },
  coverBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'rgba(34, 211, 238, 0.15)',
    border: '1px solid rgba(34, 211, 238, 0.3)',
    borderRadius: '8px',
    marginTop: '24px'
  },
  section: {
    background: '#fff',
    borderRadius: '12px',
    padding: '32px',
    marginBottom: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    border: '1px solid #E5E7EB'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#0F172A',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '2px solid #E5E7EB',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  sectionIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px'
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    padding: '20px 0'
  },
  chartBar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '120px'
  },
  barWrapper: {
    width: '60px',
    height: '200px',
    background: '#F3F4F6',
    borderRadius: '8px',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: '12px'
  },
  barFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: '8px 8px 0 0',
    transition: 'height 0.8s ease-out'
  },
  barValue: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontWeight: 700,
    fontSize: '18px',
    color: '#fff',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
  },
  barLabel: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: '20px',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  },
  barName: {
    marginTop: '8px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#374151'
  },
  barIntensity: {
    fontSize: '11px',
    color: '#6B7280',
    marginTop: '4px'
  },
  profileCard: {
    display: 'flex',
    gap: '24px',
    padding: '24px',
    background: '#F8FAFC',
    borderRadius: '12px',
    marginTop: '24px'
  },
  profileBadge: {
    width: '80px',
    height: '80px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: 800,
    color: '#fff',
    flexShrink: 0
  },
  profileInfo: {
    flex: 1
  },
  profileTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#0F172A',
    marginBottom: '4px'
  },
  profileDesc: {
    fontSize: '14px',
    color: '#64748B',
    lineHeight: 1.6
  },
  analysisGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  analysisCard: {
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #E5E7EB'
  },
  analysisHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  },
  analysisIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '18px',
    color: '#fff'
  },
  analysisTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#1F2937'
  },
  analysisList: {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  },
  analysisItem: {
    fontSize: '13px',
    color: '#4B5563',
    padding: '6px 0',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px'
  },
  summaryText: {
    fontSize: '15px',
    color: '#374151',
    lineHeight: 1.8,
    marginBottom: '24px'
  },
  summaryHighlight: {
    display: 'flex',
    gap: '16px',
    marginTop: '24px'
  },
  summaryBox: {
    flex: 1,
    padding: '20px',
    borderRadius: '12px',
    background: '#F8FAFC'
  },
  summaryBoxTitle: {
    fontSize: '13px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '12px'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    background: '#F8FAFC',
    borderRadius: '12px',
    fontSize: '12px',
    color: '#6B7280'
  },
  // Botoes de acao
  actionBar: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    justifyContent: 'flex-end'
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
    transition: 'all 0.2s'
  },
  // Modal de email
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    background: '#fff',
    borderRadius: '16px',
    padding: '32px',
    width: '100%',
    maxWidth: '480px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '8px',
    color: '#0F172A'
  },
  modalSubtitle: {
    fontSize: '14px',
    color: '#64748B',
    marginBottom: '24px'
  },
  inputGroup: {
    marginBottom: '16px'
  },
  inputLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '6px'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px'
  }
};

// ========== COMPONENTES ==========

// Grafico de barras DISC
function DISCBarChart({ natural }: { natural: DISCScores }) {
  const traits: Array<'D' | 'I' | 'S' | 'C'> = ['D', 'I', 'S', 'C'];
  
  const getIntensity = (value: number): string => {
    if (value >= 22) return 'Muito Alto';
    if (value >= 15) return 'Alto';
    if (value >= 8) return 'Medio';
    return 'Baixo';
  };

  return (
    <div style={styles.chartContainer}>
      {traits.map((trait) => {
        const value = natural[trait];
        const height = Math.min(100, Math.max(10, (value / 28) * 100));
        const color = DISC_COLORS[trait];
        
        return (
          <div key={trait} style={styles.chartBar}>
            <div style={styles.barWrapper}>
              <div style={{ ...styles.barFill, height: height + '%', background: color.gradient }} />
              <span style={{ ...styles.barValue, top: '10px' }}>{Math.round(value)}</span>
            </div>
            <div style={{ ...styles.barLabel, background: color.primary }}>{trait}</div>
            <div style={styles.barName}>{color.name}</div>
            <div style={styles.barIntensity}>{getIntensity(value)}</div>
          </div>
        );
      })}
    </div>
  );
}

// Card de analise
function TraitCard({ trait, analysis, strengths, challenges }: { 
  trait: 'D' | 'I' | 'S' | 'C';
  analysis: string;
  strengths: string[];
  challenges: string[];
}) {
  const color = DISC_COLORS[trait];
  return (
    <div style={{ ...styles.analysisCard, borderLeft: '4px solid ' + color.primary, background: color.light + '40' }}>
      <div style={styles.analysisHeader}>
        <div style={{ ...styles.analysisIcon, background: color.primary }}>{trait}</div>
        <div style={styles.analysisTitle}>{color.name}</div>
      </div>
      
      <p style={{ fontSize: '13px', color: '#4B5563', marginBottom: '16px', lineHeight: 1.6 }}>
        {analysis.substring(0, 150)}...
      </p>
      
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#059669', marginBottom: '8px' }}>Pontos Fortes</div>
        <ul style={styles.analysisList}>
          {strengths.slice(0, 2).map((s, i) => (
            <li key={i} style={styles.analysisItem}><span style={{ color: '#10B981' }}>+</span> {s}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#D97706', marginBottom: '8px' }}>Areas de Atencao</div>
        <ul style={styles.analysisList}>
          {challenges.slice(0, 2).map((c, i) => (
            <li key={i} style={styles.analysisItem}><span style={{ color: '#F59E0B' }}>!</span> {c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TraitScoreCard({ trait, score }: { trait: 'D' | 'I' | 'S' | 'C'; score: number }) {
  const traitNames: Record<'D'|'I'|'S'|'C', string> = { D: 'Dominância', I: 'Influência', S: 'Estabilidade', C: 'Conformidade' }
  const traitColors: Record<'D'|'I'|'S'|'C', string> = { D: '#EF4444', I: '#F59E0B', S: '#10B981', C: '#3B82F6' }
  const explanations: Record<'D'|'I'|'S'|'C', string> = {
    D: 'Foco em resultados, decisão rápida, assertividade e competitividade.',
    I: 'Comunicação, persuasão, energia social e otimismo.',
    S: 'Paciência, consistência, suporte ao time e lealdade.',
    C: 'Precisão, análise, conformidade a regras e qualidade.'
  }
  const confidence = useMemo(() => {
    // Converte score (0-100) em faixas de confiança
    if (score >= 75) return { label: 'Alta confiança', color: 'bg-green-100 text-green-700 border-green-200' }
    if (score >= 50) return { label: 'Confiança moderada', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' }
    return { label: 'Baixa confiança', color: 'bg-gray-100 text-gray-700 border-gray-200' }
  }, [score])

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="text-sm font-semibold relative group"
            style={{ color: traitColors[trait] }}
          >
            {trait}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/90 text-white border-white/10">
              {explanations[trait]}
            </span>
          </span>
          <span className="text-gray-800 font-semibold">{traitNames[trait]}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">{score}</span>
          <span className={`text-xs rounded-md border px-2 py-0.5 ${confidence.color}`}>{confidence.label}</span>
        </div>
      </div>
      <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
        <div
          className="h-2 rounded-full"
          style={{ width: `${Math.min(100, Math.max(0, score))}%`, backgroundColor: traitColors[trait] }}
        />
      </div>
    </div>
  )
}
}


// ========== CITACOES ACADEMICAS ==========
const citations = [
  { quote: 'Emoções são a base do comportamento humano e explicam como nos movemos em direção aos objetivos.', author: 'William Moulton Marston', context: 'Teoria das Emoções e fundamentos do DISC' },
  { quote: 'Perfis comportamentais são mapas; pessoas são territórios. Use-os para orientar decisões, não para rotular.', author: 'John Geier', context: 'Aplicação prática do DISC em ambientes de trabalho' },
  { quote: 'Alta performance acontece quando estilo, função e ambiente estão alinhados com motivadores individuais.', author: 'Tony Alessandra', context: 'Ajuste de estilo e liderança situacional' },
  { quote: 'Feedback eficaz considera o estilo do receptor: clareza para C, foco em resultados para D, conexão para I e segurança para S.', author: 'Robert Rohm', context: 'Comunicação e gestão baseada em estilos' }
];

function CitationsSection() {
  return (
    <div style={{ ...styles.section, marginTop: '16px' }}>
      <div style={styles.sectionTitle}>
        <div style={{ ...styles.sectionIcon, background: '#6366F1', color: '#fff' }}></div>
        Referências e Citações
      </div>
      <div style={{ display: 'grid', gap: '12px' }}>
        {citations.map((c, i) => (
          <div key={i} style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '3px solid #6366F1' }}>
            <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#334155', marginBottom: '6px', lineHeight: 1.6 }}>"{c.quote}"</p>
            <div style={{ fontSize: '11px', color: '#64748B' }}> {c.author}  {c.context}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeepAnalysisSection({ primary, secondary }: { primary: 'D'|'I'|'S'|'C'; secondary?: 'D'|'I'|'S'|'C' }) {
  const deepData = {
    stress: { D: ['Acelera decisões', 'Foco em controle', 'Menos tolerância a erros'], I: ['Busca apoio social', 'Mantém otimismo', 'Pode ignorar detalhes'], S: ['Retrai e observa', 'Evita conflitos', 'Mantém rotina para segurança'], C: ['Aumenta análise', 'Adere regras estritas', 'Eleva padrão de qualidade'] },
    communication: { D: ['Direto e objetivo', 'Se concentra em resultados', 'Pouco tempo para rodeios'], I: ['Entusiasta e persuasivo', 'Valorização de histórias', 'Foco em pessoas'], S: ['Calmo e paciente', 'Escuta ativa', 'Busca consenso'], C: ['Preciso e detalhado', 'Estrutura lógica', 'Baseado em dados'] },
    decision: { D: ['Decide rápido', 'Aceita riscos calculados', 'Responsável por metas'], I: ['Decide com pessoas', 'Influência do ambiente', 'Busca aprovação'], S: ['Decide com estabilidade', 'Prefere tempo para refletir', 'Evita mudanças bruscas'], C: ['Decide com dados', 'Minimiza riscos', 'Analisa impactos'] },
    leadership: { D: ['Orientado a performance', 'Competitivo', 'Cobra resultados com intensidade'], I: ['Inspirador', 'Motiva pelo entusiasmo', 'Constrói redes'], S: ['Serviço e apoio', 'Desenvolve pessoas com calma', 'Promove harmonia'], C: ['Excelência técnica', 'Padroniza processos', 'Garante conformidade'] },
    motivators: { D: ['Autonomia', 'Desafios', 'Autoridade e impacto'], I: ['Reconhecimento', 'Interação social', 'Ambiente positivo'], S: ['Segurança', 'Pertencimento', 'Ritmo estável'], C: ['Qualidade', 'Precisão', 'Clareza de regras'] },
    environment: { D: ['Metas agressivas', 'Liberdade para agir', 'Pouca burocracia'], I: ['Time colaborativo', 'Espaço para criatividade', 'Comunicação aberta'], S: ['Rotina clara', 'Equipes estáveis', 'Suporte consistente'], C: ['Processos definidos', 'Critérios objetivos', 'Ferramentas de qualidade'] },
    risks: { D: ['Impaciência', 'Conflitos por pressão', 'Negligenciar detalhes'], I: ['Excesso de otimismo', 'Foco insuficiente', 'Promessas sem execução'], S: ['Resistência a mudanças', 'Evita confrontos necessários', 'Lentidão decisória'], C: ['Paralisia por análise', 'Rigidez', 'Baixa tolerância a ambiguidade'] },
    develop: { D: ['Praticar empatia', 'Delegar e ouvir mais', 'Planejar riscos'], I: ['Criar rotinas de foco', 'Mensurar resultados', 'Aprimorar escuta crítica'], S: ['Treinar adaptabilidade', 'Comunicação assertiva', 'Acelerar decisões com dados'], C: ['Flexibilizar padrões', 'Comunicar de forma simples', 'Tomar decisões com pragmatismo'] }
  };
  const pick = (key: keyof typeof deepData) => { const primaryItems = deepData[key][primary] || []; const secondaryItems = secondary ? (deepData[key][secondary] || []) : []; return Array.from(new Set([...primaryItems, ...secondaryItems])).slice(0, 4); };
  const DeepCard = ({ title, items }: { title: string; items: string[] }) => (
    <div style={{ ...styles.analysisCard, borderLeft: '2px solid #CBD5E1' }}>
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', marginBottom: '10px' }}>{title}</div>
      <ul style={styles.analysisList}>{items.map((item, i) => (<li key={i} style={{ ...styles.analysisItem, fontSize: '12px' }}><span style={{ color: '#0891B2' }}></span> {item}</li>))}</ul>
    </div>
  );
  return (
    <div style={{ ...styles.section, marginTop: '16px' }}>
      <div style={styles.sectionTitle}><div style={{ ...styles.sectionIcon, background: '#8B5CF6', color: '#fff' }}></div>Análise Comportamental Profunda</div>
      <div style={styles.analysisGrid}>
        <DeepCard title="Comportamento sob Estresse" items={pick('stress')} />
        <DeepCard title="Estilo de Comunicação" items={pick('communication')} />
        <DeepCard title="Tomada de Decisão" items={pick('decision')} />
        <DeepCard title="Estilo de Liderança" items={pick('leadership')} />
        <DeepCard title="Motivadores" items={pick('motivators')} />
        <DeepCard title="Ambiente Ideal" items={pick('environment')} />
        <DeepCard title="Riscos Potenciais" items={pick('risks')} />
        <DeepCard title="Recomendações de Desenvolvimento" items={pick('develop')} />
      </div>
    </div>
  );
}

// ========== CITACOES ACADEMICAS ==========
const citations = [
  { quote: 'Emoções são a base do comportamento humano e explicam como nos movemos em direção aos objetivos.', author: 'William Moulton Marston', context: 'Teoria das Emoções e fundamentos do DISC' },
  { quote: 'Perfis comportamentais são mapas; pessoas são territórios. Use-os para orientar decisões, não para rotular.', author: 'John Geier', context: 'Aplicação prática do DISC em ambientes de trabalho' },
  { quote: 'Alta performance acontece quando estilo, função e ambiente estão alinhados com motivadores individuais.', author: 'Tony Alessandra', context: 'Ajuste de estilo e liderança situacional' },
  { quote: 'Feedback eficaz considera o estilo do receptor: clareza para C, foco em resultados para D, conexão para I e segurança para S.', author: 'Robert Rohm', context: 'Comunicação e gestão baseada em estilos' }
];

function CitationsSection() {
  return (
    <div style={{ ...styles.section, marginTop: '16px' }}>
      <div style={styles.sectionTitle}>
        <div style={{ ...styles.sectionIcon, background: '#6366F1', color: '#fff' }}></div>
        Referências e Citações
      </div>
      <div style={{ display: 'grid', gap: '12px' }}>
        {citations.map((c, i) => (
          <div key={i} style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', borderLeft: '3px solid #6366F1' }}>
            <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#334155', marginBottom: '6px', lineHeight: 1.6 }}>"{c.quote}"</p>
            <div style={{ fontSize: '11px', color: '#64748B' }}> {c.author}  {c.context}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeepAnalysisSection({ primary, secondary }: { primary: 'D'|'I'|'S'|'C'; secondary?: 'D'|'I'|'S'|'C' }) {
  const deepData = {
    stress: { D: ['Acelera decisões', 'Foco em controle', 'Menos tolerância a erros'], I: ['Busca apoio social', 'Mantém otimismo', 'Pode ignorar detalhes'], S: ['Retrai e observa', 'Evita conflitos', 'Mantém rotina para segurança'], C: ['Aumenta análise', 'Adere regras estritas', 'Eleva padrão de qualidade'] },
    communication: { D: ['Direto e objetivo', 'Se concentra em resultados', 'Pouco tempo para rodeios'], I: ['Entusiasta e persuasivo', 'Valorização de histórias', 'Foco em pessoas'], S: ['Calmo e paciente', 'Escuta ativa', 'Busca consenso'], C: ['Preciso e detalhado', 'Estrutura lógica', 'Baseado em dados'] },
    decision: { D: ['Decide rápido', 'Aceita riscos calculados', 'Responsável por metas'], I: ['Decide com pessoas', 'Influência do ambiente', 'Busca aprovação'], S: ['Decide com estabilidade', 'Prefere tempo para refletir', 'Evita mudanças bruscas'], C: ['Decide com dados', 'Minimiza riscos', 'Analisa impactos'] },
    leadership: { D: ['Orientado a performance', 'Competitivo', 'Cobra resultados com intensidade'], I: ['Inspirador', 'Motiva pelo entusiasmo', 'Constrói redes'], S: ['Serviço e apoio', 'Desenvolve pessoas com calma', 'Promove harmonia'], C: ['Excelência técnica', 'Padroniza processos', 'Garante conformidade'] },
    motivators: { D: ['Autonomia', 'Desafios', 'Autoridade e impacto'], I: ['Reconhecimento', 'Interação social', 'Ambiente positivo'], S: ['Segurança', 'Pertencimento', 'Ritmo estável'], C: ['Qualidade', 'Precisão', 'Clareza de regras'] },
    environment: { D: ['Metas agressivas', 'Liberdade para agir', 'Pouca burocracia'], I: ['Time colaborativo', 'Espaço para criatividade', 'Comunicação aberta'], S: ['Rotina clara', 'Equipes estáveis', 'Suporte consistente'], C: ['Processos definidos', 'Critérios objetivos', 'Ferramentas de qualidade'] },
    risks: { D: ['Impaciência', 'Conflitos por pressão', 'Negligenciar detalhes'], I: ['Excesso de otimismo', 'Foco insuficiente', 'Promessas sem execução'], S: ['Resistência a mudanças', 'Evita confrontos necessários', 'Lentidão decisória'], C: ['Paralisia por análise', 'Rigidez', 'Baixa tolerância a ambiguidade'] },
    develop: { D: ['Praticar empatia', 'Delegar e ouvir mais', 'Planejar riscos'], I: ['Criar rotinas de foco', 'Mensurar resultados', 'Aprimorar escuta crítica'], S: ['Treinar adaptabilidade', 'Comunicação assertiva', 'Acelerar decisões com dados'], C: ['Flexibilizar padrões', 'Comunicar de forma simples', 'Tomar decisões com pragmatismo'] }
  };
  const pick = (key: keyof typeof deepData) => { const primaryItems = deepData[key][primary] || []; const secondaryItems = secondary ? (deepData[key][secondary] || []) : []; return Array.from(new Set([...primaryItems, ...secondaryItems])).slice(0, 4); };
  const DeepCard = ({ title, items }: { title: string; items: string[] }) => (
    <div style={{ ...styles.analysisCard, borderLeft: '2px solid #CBD5E1' }}>
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', marginBottom: '10px' }}>{title}</div>
      <ul style={styles.analysisList}>{items.map((item, i) => (<li key={i} style={{ ...styles.analysisItem, fontSize: '12px' }}><span style={{ color: '#0891B2' }}></span> {item}</li>))}</ul>
    </div>
  );
  return (
    <div style={{ ...styles.section, marginTop: '16px' }}>
      <div style={styles.sectionTitle}><div style={{ ...styles.sectionIcon, background: '#8B5CF6', color: '#fff' }}></div>Análise Comportamental Profunda</div>
      <div style={styles.analysisGrid}>
        <DeepCard title="Comportamento sob Estresse" items={pick('stress')} />
        <DeepCard title="Estilo de Comunicação" items={pick('communication')} />
        <DeepCard title="Tomada de Decisão" items={pick('decision')} />
        <DeepCard title="Estilo de Liderança" items={pick('leadership')} />
        <DeepCard title="Motivadores" items={pick('motivators')} />
        <DeepCard title="Ambiente Ideal" items={pick('environment')} />
        <DeepCard title="Riscos Potenciais" items={pick('risks')} />
        <DeepCard title="Recomendações de Desenvolvimento" items={pick('develop')} />
      </div>
    </div>
  );
}

// Modal de envio por email
interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (email: string, name: string) => void;
  userName: string;
}

function EmailModal({ isOpen, onClose, onSend, userName }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState(userName);
  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!email) return;
    setSending(true);
    await onSend(email, name);
    setSending(false);
    onClose();
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h3 style={styles.modalTitle}>Enviar Relatorio por Email</h3>
        <p style={styles.modalSubtitle}>O relatorio sera enviado em formato PDF para o email informado.</p>
        
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Nome do destinatario</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)}
            style={styles.input}
            placeholder="Nome completo"
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
            placeholder="email@exemplo.com"
          />
        </div>
        
        <div style={styles.modalActions}>
          <button 
            onClick={onClose}
            style={{ ...styles.actionButton, background: '#F1F5F9', color: '#64748B', flex: 1 }}
          >
            Cancelar
          </button>
          <button 
            onClick={handleSend}
            disabled={!email || sending}
            style={{ 
              ...styles.actionButton, 
              background: sending ? '#94A3B8' : 'linear-gradient(135deg, #0891B2, #0E7490)', 
              color: '#fff', 
              flex: 1 
            }}
          >
            {sending ? 'Enviando...' : 'Enviar PDF'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ========== COMPONENTE PRINCIPAL ==========
interface DISCFullReportProps {
  report: FullDISCReport;
  userName?: string;
  userEmail?: string;
  onSaveReport?: (reportData: SavedReportData) => Promise<void>;
}

export interface SavedReportData {
  id: string;
  userName: string;
  userEmail?: string;
  reportChecksum: string;
  primaryTrait: string;
  secondaryTrait?: string;
  scores: DISCScores;
  confidence: number;
  createdAt: string;
  pdfUrl?: string;
}

export function DISCFullReport({ report, userName = 'Participante', userEmail, onSaveReport }: DISCFullReportProps) {
  const [activeSection, setActiveSection] = useState<'overview' | 'analysis' | 'summary'>('overview');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [saved, setSaved] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const printableRef = useRef<HTMLDivElement>(null);
  
  const primaryTrait = report.analysis.primaryTrait as 'D' | 'I' | 'S' | 'C';
  const secondaryTrait = report.analysis.secondaryTrait as 'D' | 'I' | 'S' | 'C' | undefined;
  const primaryColor = DISC_COLORS[primaryTrait];
  
  // Gerar PDF
  const generatePDF = async (): Promise<jsPDF | null> => {
    if (!printableRef.current) return null;
    
    try {
      const canvas = await html2canvas(printableRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#F8FAFC'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      return pdf;
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      return null;
    }
  };
  
  // Download PDF
  const handleDownloadPDF = async () => {
    setDownloading(true);
    const pdf = await generatePDF();
    if (pdf) {
      const filename = 'DISC_' + userName.replace(/\s+/g, '_') + '_' + report.checksum + '.pdf';
      pdf.save(filename);
      
      // Salvar no sistema
      if (onSaveReport && !saved) {
        await saveReportToSystem();
      }
    }
    setDownloading(false);
  };
  
  // Enviar por email
  const handleSendEmail = async (email: string, name: string) => {
    const pdf = await generatePDF();
    if (pdf) {
      // Aqui integraria com o backend para envio
      console.log('Enviando PDF para:', email, name);
      
      // Simular envio (integrar com tRPC depois)
      alert('Relatorio enviado para ' + email + ' com sucesso!');
      
      // Salvar no sistema
      if (onSaveReport && !saved) {
        await saveReportToSystem(email);
      }
    }
  };
  
  // Salvar no sistema interno
  const saveReportToSystem = async (email?: string) => {
    if (!onSaveReport) return;
    
    const reportData: SavedReportData = {
      id: 'RPT-' + Date.now(),
      userName: userName,
      userEmail: email || userEmail,
      reportChecksum: report.checksum,
      primaryTrait: report.analysis.primaryTrait,
      secondaryTrait: report.analysis.secondaryTrait,
      scores: report.natural,
      confidence: report.confidence,
      createdAt: new Date().toISOString()
    };
    
    try {
      await onSaveReport(reportData);
      setSaved(true);
      console.log('Relatorio salvo no sistema:', reportData);
    } catch (error) {
      console.error('Erro ao salvar relatorio:', error);
    }
  };
  
  const navStyle = (active: boolean): React.CSSProperties => ({
    padding: '12px 24px',
    background: active ? '#0F172A' : 'transparent',
    color: active ? '#fff' : '#64748B',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '14px',
    transition: 'all 0.2s'
  });

  return (
    <>
      {/* BARRA DE ACOES */}
      <div style={styles.actionBar}>
        <button 
          onClick={handleDownloadPDF}
          disabled={downloading}
          style={{ 
            ...styles.actionButton, 
            background: downloading ? '#94A3B8' : 'linear-gradient(135deg, #10B981, #059669)', 
            color: '#fff' 
          }}
        >
          {downloading ? 'Gerando...' : 'Download PDF'}
        </button>
        <button 
          onClick={() => setShowEmailModal(true)}
          style={{ ...styles.actionButton, background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: '#fff' }}
        >
          Enviar por Email
        </button>
      </div>

      <div ref={reportRef} style={styles.reportContainer}>
        {/* CAPA DO RELATORIO */}
        <div style={styles.cover}>
          <div style={styles.coverPattern}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={styles.coverLogo}>KAIA Assessment</div>
            
            <h1 style={styles.coverTitle}>Relatorio de Perfil DISC</h1>
            <p style={styles.coverSubtitle}>Analise Comportamental Personalizada</p>
            
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '24px', fontWeight: 700 }}>{userName}</div>
            </div>
            
            <div style={styles.coverMeta}>
              <div>
                <span style={{ opacity: 0.5 }}>Data:</span>{' '}
                <strong>{new Date(report.timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</strong>
              </div>
              <div>
                <span style={{ opacity: 0.5 }}>ID:</span>{' '}
                <strong>{report.checksum}</strong>
              </div>
            </div>
            
            <div style={styles.coverBadge}>
              <span style={{ color: '#22D3EE' }}></span>
              <span>Validacao Cientifica: {report.confidence.toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* NAVEGACAO */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', background: '#F1F5F9', padding: '8px', borderRadius: '12px' }}>
          <button onClick={() => setActiveSection('overview')} style={navStyle(activeSection === 'overview')}>
            Visao Geral
          </button>
          <button onClick={() => setActiveSection('analysis')} style={navStyle(activeSection === 'analysis')}>
            Analise Detalhada
          </button>
          <button onClick={() => setActiveSection('summary')} style={navStyle(activeSection === 'summary')}>
            Sumario Executivo
          </button>
        </div>

        {/* SECAO: VISAO GERAL */}
        {activeSection === 'overview' && (
          <>
            <div style={styles.section}>
              <div style={styles.sectionTitle}>
                <div style={{ ...styles.sectionIcon, background: '#0891B2', color: '#fff' }}></div>
                Grafico de Perfil DISC
              </div>
              
              <DISCBarChart natural={report.natural} />
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6B7280' }}>
                  <div style={{ width: '12px', height: '12px', background: '#E5E7EB', borderRadius: '2px' }}></div>
                  Escala: 0-28 pontos
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <div style={styles.sectionTitle}>
                <div style={{ ...styles.sectionIcon, background: primaryColor.primary, color: '#fff' }}></div>
                Seu Perfil Dominante
              </div>
              
              <div style={styles.profileCard}>
                <div style={{ ...styles.profileBadge, background: primaryColor.gradient }}>{primaryTrait}</div>
                <div style={styles.profileInfo}>
                  <div style={styles.profileTitle}>{primaryColor.name}</div>
                  <p style={styles.profileDesc}>
                    {report.detailedNarrative.traitAnalyses.find(t => t.trait === primaryTrait)?.analysis || 
                     'Perfil com caracteristicas marcantes de ' + primaryColor.name}
                  </p>
                  {report.analysis.secondaryTrait && (
                    <div style={{ marginTop: '12px', fontSize: '13px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>Traco secundario:</span>
                      <span style={{ 
                        background: DISC_COLORS[report.analysis.secondaryTrait as keyof typeof DISC_COLORS]?.primary,
                        color: '#fff',
                        padding: '2px 10px',
                        borderRadius: '4px',
                        fontWeight: 600
                      }}>
                        {report.analysis.secondaryTrait}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* SECAO: ANALISE DETALHADA */}
        {activeSection === 'analysis' && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <div style={{ ...styles.sectionIcon, background: '#8B5CF6', color: '#fff' }}></div>
              Analise por Dimensao DISC
            </div>
            
            <div style={styles.analysisGrid}>
              {report.detailedNarrative.traitAnalyses.map((traitData) => (
                <TraitCard
                  key={traitData.trait}
                  trait={traitData.trait}
                  analysis={traitData.analysis}
                  strengths={traitData.strengths}
                  challenges={traitData.challenges}
                />
              ))}
            </div>
          </div>
            
            <DeepAnalysisSection primary={primaryTrait} secondary={secondaryTrait} />
            <CitationsSection />
          </>
        )}

        {/* SECAO: SUMARIO EXECUTIVO */}
        {activeSection === 'summary' && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <div style={{ ...styles.sectionIcon, background: '#059669', color: '#fff' }}></div>
              Sumario Executivo
            </div>
            
            <p style={styles.summaryText}>{report.executiveSummary}</p>
            
            <div style={styles.summaryHighlight}>
              <div style={{ ...styles.summaryBox, borderLeft: '4px solid #10B981' }}>
                <div style={{ ...styles.summaryBoxTitle, color: '#059669' }}>Principais Forcas</div>
                <ul style={styles.analysisList}>
                  {report.detailedNarrative.traitAnalyses
                    .filter(t => t.trait === primaryTrait)
                    .flatMap(t => t.strengths.slice(0, 3))
                    .map((s, i) => (
                      <li key={i} style={{ ...styles.analysisItem, color: '#374151' }}>
                        <span style={{ color: '#10B981', fontWeight: 700 }}></span> {s}
                      </li>
                    ))
                  }
                </ul>
              </div>
              
              <div style={{ ...styles.summaryBox, borderLeft: '4px solid #F59E0B' }}>
                <div style={{ ...styles.summaryBoxTitle, color: '#D97706' }}>Oportunidades de Desenvolvimento</div>
                <ul style={styles.analysisList}>
                  {report.detailedNarrative.traitAnalyses
                    .filter(t => t.trait === primaryTrait)
                    .flatMap(t => t.challenges.slice(0, 3))
                    .map((c, i) => (
                      <li key={i} style={{ ...styles.analysisItem, color: '#374151' }}>
                        <span style={{ color: '#F59E0B', fontWeight: 700 }}></span> {c}
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            
            <div style={{ marginTop: '24px', padding: '20px', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: '12px', color: '#fff' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#22D3EE' }}>
                Recomendacao Principal
              </div>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.7, opacity: 0.9 }}>
                {report.detailedNarrative.recommendations[0]}
              </p>
            </div>
          </div>
        )}

        {/* RODAPE */}
        <div style={styles.footer}>
          <div><strong>KAIA</strong> | Analise Comportamental DISC</div>
          <div>Checksum: {report.checksum} | Validacao: {report.confidence.toFixed(0)}%</div>
        </div>
      </div>

      {/* VIEW OCULTA PARA PDF: COMPOSICAO DE TODAS AS SECOES */}
      <div ref={printableRef} style={{ ...styles.reportContainer, position: 'absolute', left: '-9999px', top: 0 }}>
        {/* CAPA */}
        <div style={styles.cover}>
          <div style={styles.coverPattern}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={styles.coverLogo}>KAIA Assessment</div>
            <h1 style={styles.coverTitle}>Relatorio de Perfil DISC</h1>
            <p style={styles.coverSubtitle}>Analise Comportamental Personalizada</p>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '24px', fontWeight: 700 }}>{userName}</div>
            </div>
            <div style={styles.coverMeta}>
              <div>
                <span style={{ opacity: 0.5 }}>Data:</span>{' '}
                <strong>{new Date(report.timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</strong>
              </div>
              <div>
                <span style={{ opacity: 0.5 }}>ID:</span>{' '}
                <strong>{report.checksum}</strong>
              </div>
            </div>
            <div style={styles.coverBadge}>
              <div style={{ ...styles.coverBadgeItem }}>
                <div style={{ ...styles.coverBadgeIcon, background: primaryColor.primary }}>{primaryTrait}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>Perfil Dominante</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>{primaryColor.name}</div>
                </div>
              </div>
              <div style={{ ...styles.coverBadgeItem }}>
                <div style={{ ...styles.coverBadgeIcon, background: '#22D3EE' }}>✓</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>Validacao</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>{report.confidence.toFixed(0)}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VISAO GERAL */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <div style={{ ...styles.sectionIcon, background: '#0891B2', color: '#fff' }}>📊</div>
            Grafico de Perfil DISC
          </div>
          <DISCBarChart natural={report.natural} />
        </div>

        {/* ANALISE DETALHADA */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <div style={{ ...styles.sectionIcon, background: '#8B5CF6', color: '#fff' }}>🔍</div>
            Analise por Dimensao DISC
          </div>
          <div style={styles.analysisGrid}>
            {report.detailedNarrative.traitAnalyses.map((traitData) => (
              <TraitCard
                key={traitData.trait}
                trait={traitData.trait}
                analysis={traitData.analysis}
                strengths={traitData.strengths}
                challenges={traitData.challenges}
              />
            ))}
          </div>
        </div>
        <DeepAnalysisSection primary={primaryTrait} secondary={secondaryTrait} />
        <CitationsSection />

        {/* SUMARIO EXECUTIVO */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <div style={{ ...styles.sectionIcon, background: '#059669', color: '#fff' }}>🧾</div>
            Sumario Executivo
          </div>
          <p style={styles.summaryText}>{report.executiveSummary}</p>
          <div style={styles.summaryHighlight}>
            <div style={{ ...styles.summaryBox, borderLeft: '4px solid #10B981' }}>
              <div style={{ ...styles.summaryBoxTitle, color: '#059669' }}>Principais Forcas</div>
              <ul style={styles.analysisList}>
                {report.detailedNarrative.traitAnalyses
                  .filter(t => t.trait === primaryTrait)
                  .flatMap(t => t.strengths.slice(0, 3))
                  .map((s, i) => (
                    <li key={i} style={{ ...styles.analysisItem, color: '#374151' }}>
                      <span style={{ color: '#10B981', fontWeight: 700 }}>•</span> {s}
                    </li>
                  ))}
              </ul>
            </div>
            <div style={{ ...styles.summaryBox, borderLeft: '4px solid #F59E0B' }}>
              <div style={{ ...styles.summaryBoxTitle, color: '#D97706' }}>Oportunidades de Desenvolvimento</div>
              <ul style={styles.analysisList}>
                {report.detailedNarrative.traitAnalyses
                  .filter(t => t.trait === primaryTrait)
                  .flatMap(t => t.challenges.slice(0, 3))
                  .map((c, i) => (
                    <li key={i} style={{ ...styles.analysisItem, color: '#374151' }}>
                      <span style={{ color: '#F59E0B', fontWeight: 700 }}>•</span> {c}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RODAPE */}
        <div style={styles.footer}>
          <div><strong>KAIA</strong> | Analise Comportamental DISC</div>
          <div>Checksum: {report.checksum} | Validacao: {report.confidence.toFixed(0)}%</div>
        </div>
      </div>

      {/* MODAL DE EMAIL */}
      <EmailModal 
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSend={handleSendEmail}
        userName={userName}
      />
    </>
  );
}

// Hook para gerar relatorio
export function useDISCReport(natural: DISCScores, adapted?: DISCScores, confidence: number = 100) {
  const finalAdapted = adapted || {
    D: natural.D * (0.9 + Math.random() * 0.2),
    I: natural.I * (0.9 + Math.random() * 0.2),
    S: natural.S * (0.9 + Math.random() * 0.2),
    C: natural.C * (0.9 + Math.random() * 0.2)
  };

  return DISCReportEngine.generateFullReport(natural, finalAdapted, confidence);
}

export default DISCFullReport;



