const tools = [
  { name: 'Google AI Studio', category: 'IA' },
  { name: 'Firebase Studio', category: 'IA' },
  { name: 'AntiGravity (Gemini)', category: 'IA' },
  { name: 'GPT-4 / Claude Opus', category: 'IA' },
  { name: 'NotebookLM', category: 'IA' },
  { name: 'VSCode / IntelliJ', category: 'Dev' },
  { name: 'GitHub', category: 'Dev' },
  { name: 'Railway', category: 'Deploy' },
  { name: 'Vercel', category: 'Deploy' },
  { name: 'Hostinger', category: 'Infra' },
];

export function ToolsGrid() {
  return (
    <div className="tools-section">
      <div className="tools-grid">
        {tools.map((tool, index) => (
          <div key={index} className="tool-item">
            <div className="tool-icon">
              {tool.category === 'IA' && '🤖'}
              {tool.category === 'Dev' && '💻'}
              {tool.category === 'Deploy' && '🚀'}
              {tool.category === 'Infra' && '🏗️'}
            </div>
            <span className="tool-name">{tool.name}</span>
            <span className="tool-category">{tool.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
