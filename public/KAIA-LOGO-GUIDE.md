#  Logo Kaia - Guia Técnico e Diretrizes de Uso

##  Sumário Executivo

A logo da **Kaia** foi recriada em alta definição com suporte para múltiplas resoluções e formatos. O pacote inclui versões vetoriais (SVG) e rasterizadas (PNG) com qualidade até **40964096 pixels**.

---

##  Design da Logo

### Elementos Principais

1. **Cubo Tecnológico 3D**
   - Representa inovação, tecnologia e estrutura
   - Animações sutis de pulso na versão interativa
   - Gradientes dinâmicos

2. **Ondas de Água**
   - Simboliza fluidez, adaptação e movimento
   - Paleta azul-ciano para transmitir confiança
   - Animação ondulante (versão React)

3. **Nós e Partículas**
   - Representam conexões e dados
   - Distribuídos em torno da estrutura principal
   - Efeito de brilho sutil

4. **Tipografia**
   - Fonte: Inter, sans-serif (ou sistema)
   - Peso: 800 (Bold)
   - Espaçamento de letras: 4px
   - Gradiente ciano-azul

---

##  Especificações Técnicas

### Paleta de Cores

| Elemento          | Cor Primária | Cor Secundária | Opacidade |
|-------------------|-------------|----------------|-----------|
| Gradiente Principal | #00c6ff (Ciano) | #0072ff (Azul) | 100% |
| Água/Ondas         | #005bea (Azul) | #00c6ff (Ciano) | 80-90% |
| Texto "KAIA"       | #00c6ff  #0072ff | Gradiente 135° | 100% |
| Subtítulo          | Igual ao texto | - | 70% |

### Dimensões e Proporções

- **Aspect Ratio**: 1:1 (quadrado)
- **ViewBox**: 0 0 500 500
- **Espaço em branco**: 40px em todos os lados
- **Escala interna**: 0.9 (otimização de proporções)

### Formatos Disponíveis

| Formato | Resolução | Tamanho | Uso Recomendado |
|---------|-----------|--------|-----------------|
| SVG     | Vetorial  | 4.61 KB | Web, logos escaláveis, impressão |
| PNG     | 10241024 | 2.35 KB | Redes sociais, favicons, ícones |
| PNG     | 20482048 | 6.89 KB | Apresentações, sites, impressão média |
| PNG     | 40964096 | 23.51 KB | Impressão grande formato, material de marketing |

---

##  Arquivos Disponíveis

Todos os arquivos estão localizados em `public/`:

```
public/
 kaia-logo-hd.svg              # Versão vetorial (sem animações)
 kaia-logo-1024.png            # 10241024 pixels (web)
 kaia-logo-2048.png            # 20482048 pixels (apresentações)
 kaia-logo-4096.png            # 40964096 pixels (impressão profissional)
 kaia-logo-showcase.html       # Página interativa de visualização
```

---

##  Diretrizes de Uso

###  Recomendado

-  Usar em fundo branco para máximo contraste
-  Usar em fundos escuros (compatível com tema dark)
-  Manter espaço em branco mínimo de 40px
-  SVG para web (melhor performance)
-  PNG 2048 para apresentações (PowerPoint, Google Slides)
-  PNG 4096 para impressão profissional
-  Redimensionar mantendo proporções (1:1)

###  Evitar

-  Distorcer a logo (quebra o aspecto 1:1)
-  Usar cores diferentes das do gradiente original
-  Adicionar sombras ou efeitos sem aprovação
-  Usar em fundo com baixo contraste (dificulta legibilidade)
-  Rotacionar para ângulos não-padrão

---

##  Contextos de Uso

### Web e Digital
- **Navbar/Header**: use PNG 6464 ou SVG escalável
- **Footer**: use PNG 128128 ou SVG
- **Social Media**: use PNG 10241024
- **Favicon**: use PNG 6464 ou 3232
- **Landing Page**: use SVG ou PNG 20482048

### Documentos e Apresentações
- **PowerPoint**: PNG 20482048 ou SVG
- **PDF**: SVG (mantém qualidade em qualquer escala)
- **Google Slides**: PNG 20482048
- **Relatórios**: PNG 40964096 ou SVG

### Impressão
- **Business Cards**: PNG 40964096 (300 DPI)
- **Panfletos**: PNG 40964096 ou SVG
- **Banners**: PNG 40964096 ou SVG
- **Outdoor**: SVG (escalável infinitamente)

### Merchandise
- **T-shirts**: PNG 20482048
- **Adesivos**: SVG (permite corte preciso)
- **Bordado**: SVG (para máquinas de bordar)
- **Canetas/Bonés**: PNG 10241024

---

##  Implementação em Código

### React (Componente Existente)

```tsx
import { KaiaWaterLogo } from '@/components/KaiaWaterLogo';

// Com animações (padrão)
<KaiaWaterLogo showText={true} animated={true} />

// Apenas ícone sem texto
<KaiaWaterLogo showText={false} animated={true} />

// Versão estática (sem animações)
<KaiaWaterLogo showText={true} animated={false} />
```

### HTML Puro

```html
<!-- SVG Vetorial (Recomendado) -->
<img src="/kaia-logo-hd.svg" alt="Kaia Logo" width="200" height="200">

<!-- PNG Rasterizado -->
<img src="/kaia-logo-2048.png" alt="Kaia Logo" width="200" height="200">

<!-- Favicon -->
<link rel="icon" type="image/png" href="/kaia-logo-1024.png">
```

### CSS

```css
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  background: white;
  border-radius: 16px;
  padding: 16px;
}

.logo-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

---

##  Responsividade

### Tamanhos Recomendados por Breakpoint

| Breakpoint | Tamanho Recomendado | Formato |
|-----------|-------------------|---------|
| Mobile (< 480px) | 6464 - 8080 | PNG 1024 ou SVG |
| Tablet (480-1024px) | 100100 - 150150 | PNG 2048 ou SVG |
| Desktop (> 1024px) | 150150 - 300300 | PNG 2048/4096 ou SVG |
| Print (HQ) | 300300+ | PNG 4096 ou SVG |

---

##  Variações e Futuro

### Variações Planejadas
- [ ] Versão em escala de cinzas (monocromática)
- [ ] Versão negativa (invertida)
- [ ] Ícone simplificado (apenas cubo, sem ondas)
- [ ] Versão com fundo semi-transparente
- [ ] Animação GIF para interfaces dinâmicas

### Melhorias Técnicas
-  Filtros de brilho (glow effect) implementados
-  Gradientes animados (versão React)
-  Múltiplas resoluções geradas
-  Otimização de arquivo (WebP em futuro)

---

##  Suporte e Versioning

### Versão Atual
- **Data**: Dezembro 4, 2025
- **Versão**: 1.0 (HD Release)
- **Formato**: SVG + PNG Multi-resolução
- **Compatibilidade**: Todos os navegadores modernos + Office

### Histórico de Versões
| Versão | Data | Mudanças |
|--------|------|----------|
| 1.0 | 04/12/2025 | Release inicial em alta definição |

---

##  Créditos

- **Design**: Baseado no componente `KaiaWaterLogo.tsx`
- **Cores**: Paleta Kaia (#6366F1, #22D3EE, #0891B2)
- **Geração**: Sharp (Node.js image processing)
- **Projeto**: Site Revela - Plataforma de Desenvolvimento de Pessoas

---

**Última atualização**: 04/12/2025
