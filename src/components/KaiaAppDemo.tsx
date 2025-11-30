import { useState } from 'react';
import '../styles/kaia-app.css';

interface NavItem {
  icon: string;
  label: string;
  id: string;
  badge?: string;
}

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

const navItems: NavItem[] = [
  { icon: '🏠', label: 'Dashboard', id: 'dashboard' },
  { icon: '💬', label: 'Conversas', id: 'chats', badge: '12' },
  { icon: '👥', label: 'Leads', id: 'leads', badge: '3' },
  { icon: '📊', label: 'Analytics', id: 'analytics' },
  { icon: '🤖', label: 'Automações', id: 'automations' },
  { icon: '🔗', label: 'Integrações', id: 'integrations' },
];

const settingsItems: NavItem[] = [
  { icon: '⚙️', label: 'Configurações', id: 'settings' },
  { icon: '❓', label: 'Ajuda', id: 'help' },
];

const initialMessages: Message[] = [
  { id: 1, text: 'Olá! 👋 Sou a Kaia, sua assistente de IA. Como posso ajudar seu negócio hoje?', sender: 'bot' },
  { id: 2, text: 'Quero automatizar o atendimento no WhatsApp', sender: 'user' },
  { id: 3, text: 'Ótima escolha! Posso configurar respostas automáticas inteligentes para seu WhatsApp. Você prefere começar com FAQs ou qualificação de leads?', sender: 'bot' },
];

const activities = [
  { icon: '🎯', text: 'Novo lead qualificado: Maria Silva', time: 'Há 2 min' },
  { icon: '💬', text: 'Conversa finalizada com João Santos', time: 'Há 15 min' },
  { icon: '📈', text: 'Meta de conversão atingida!', time: 'Há 1 hora' },
  { icon: '🤖', text: 'Automação "Boas-vindas" ativada', time: 'Há 2 horas' },
];

export function KaiaAppDemo() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      const botResponses = [
        'Entendi! Vou preparar isso para você. Me dá mais detalhes sobre seu negócio?',
        'Perfeito! Essa funcionalidade está disponível no plano Pro. Quer que eu te mostre?',
        'Boa pergunta! A Kaia pode fazer isso automaticamente com IA generativa.',
        'Interessante! Posso configurar isso em poucos minutos. Vamos lá?',
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: randomResponse,
        sender: 'bot',
      }]);
    }, 1500);
  };

  return (
    <div className="kaia-app">
      {/* Sidebar */}
      <aside className="kaia-sidebar">
        <div className="kaia-sidebar-header">
          <div className="kaia-sidebar-logo">
            <div className="kaia-sidebar-logo-icon">🤖</div>
            <span className="kaia-sidebar-logo-text">Kaia</span>
          </div>
        </div>

        <nav className="kaia-sidebar-nav">
          <div className="kaia-nav-section">
            <div className="kaia-nav-section-title">Principal</div>
            {navItems.map(item => (
              <button
                key={item.id}
                className={`kaia-nav-item ${activeNav === item.id ? 'active' : ''}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="kaia-nav-item-icon">{item.icon}</span>
                {item.label}
                {item.badge && <span className="kaia-nav-item-badge">{item.badge}</span>}
              </button>
            ))}
          </div>

          <div className="kaia-nav-section">
            <div className="kaia-nav-section-title">Sistema</div>
            {settingsItems.map(item => (
              <button
                key={item.id}
                className={`kaia-nav-item ${activeNav === item.id ? 'active' : ''}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="kaia-nav-item-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="kaia-main">
        {/* Top Bar */}
        <div className="kaia-topbar">
          <div className="kaia-topbar-left">
            <h1>Bem-vindo de volta! 👋</h1>
            <p>Aqui está o resumo de hoje da sua IA</p>
          </div>
          <div className="kaia-topbar-actions">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '16px', padding: '4px 12px', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '20px', border: '1px solid rgba(34, 211, 238, 0.2)' }}>
              <span style={{ fontSize: '12px' }}>🔒</span>
              <span style={{ fontSize: '12px', color: 'var(--kaia-accent)', fontWeight: '600' }}>Ambiente Seguro</span>
            </div>
            <button 
              className="kaia-topbar-btn kaia-topbar-btn-secondary"
              title="Documentos gerados são protegidos contra cópia"
              onClick={() => alert('Os documentos gerados pela Kaia são protegidos com criptografia e bloqueio de cópia para garantir a segurança dos seus dados.')}
            >
              📥 Exportar (Protegido)
            </button>
            <button className="kaia-topbar-btn kaia-topbar-btn-primary">
              + Nova Automação
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="kaia-stats-grid">
          <div className="kaia-stat-card" style={{ '--stat-color': '#22C55E' } as React.CSSProperties}>
            <div className="kaia-stat-header">
              <div className="kaia-stat-icon">💬</div>
              <span className="kaia-stat-trend up">↑ 12%</span>
            </div>
            <div className="kaia-stat-value">1,247</div>
            <div className="kaia-stat-label">Mensagens hoje</div>
          </div>

          <div className="kaia-stat-card" style={{ '--stat-color': '#6366F1' } as React.CSSProperties}>
            <div className="kaia-stat-header">
              <div className="kaia-stat-icon">🎯</div>
              <span className="kaia-stat-trend up">↑ 8%</span>
            </div>
            <div className="kaia-stat-value">89</div>
            <div className="kaia-stat-label">Leads capturados</div>
          </div>

          <div className="kaia-stat-card" style={{ '--stat-color': '#22D3EE' } as React.CSSProperties}>
            <div className="kaia-stat-header">
              <div className="kaia-stat-icon">⚡</div>
              <span className="kaia-stat-trend up">↑ 23%</span>
            </div>
            <div className="kaia-stat-value">94%</div>
            <div className="kaia-stat-label">Taxa de resposta</div>
          </div>

          <div className="kaia-stat-card" style={{ '--stat-color': '#F59E0B' } as React.CSSProperties}>
            <div className="kaia-stat-header">
              <div className="kaia-stat-icon">⭐</div>
              <span className="kaia-stat-trend up">↑ 5%</span>
            </div>
            <div className="kaia-stat-value">4.9</div>
            <div className="kaia-stat-label">Satisfação média</div>
          </div>
        </div>

        {/* Chat & Activity */}
        <div className="kaia-chat-section">
          {/* Chat Preview */}
          <div className="kaia-chat-main">
            <div className="kaia-chat-header">
              <div className="kaia-chat-header-left">
                <div className="kaia-chat-avatar">🤖</div>
                <div className="kaia-chat-info">
                  <h3>Kaia Assistant</h3>
                  <span>Online agora</span>
                </div>
              </div>
            </div>

            <div className="kaia-chat-messages">
              {messages.map(msg => (
                <div key={msg.id} className={`kaia-message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="kaia-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>

            <div className="kaia-chat-input">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>Enviar</button>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="kaia-activity">
            <h3>Atividade Recente</h3>
            <div className="kaia-activity-list">
              {activities.map((activity, index) => (
                <div key={index} className="kaia-activity-item">
                  <div className="kaia-activity-icon">{activity.icon}</div>
                  <div className="kaia-activity-content">
                    <p>{activity.text}</p>
                    <span>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', marginTop: '32px' }}>
          Ações Rápidas
        </h2>
        <div className="kaia-quick-actions">
          <a href="#pricing" className="kaia-action-card">
            <div className="kaia-action-icon">🚀</div>
            <h3>Criar Automação</h3>
            <p>Configure fluxos automáticos de conversa em minutos</p>
          </a>
          <a href="#pricing" className="kaia-action-card">
            <div className="kaia-action-icon">🔗</div>
            <h3>Conectar WhatsApp</h3>
            <p>Integre seu número e comece a automatizar</p>
          </a>
          <a href="#pricing" className="kaia-action-card">
            <div className="kaia-action-icon">📚</div>
            <h3>Treinar a IA</h3>
            <p>Ensine a Kaia sobre seu produto ou serviço</p>
          </a>
        </div>
      </main>

      {/* Demo Badge */}
      <a href="#pricing" className="kaia-demo-badge">
        ✨ Este é um demo - Comece grátis!
      </a>
    </div>
  );
}
