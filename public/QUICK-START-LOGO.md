#  Quick Start - Logo Kaia

## 1 Uso Mais Rápido (HTML Simples)

```html
<!-- Em HTML, adicione uma destas linhas: -->

<!-- Para web (melhor performance) -->
<img src="/kaia-logo-hd.svg" alt="Kaia" width="200" height="200">

<!-- Para social media -->
<img src="/kaia-logo-2048.png" alt="Kaia" width="200" height="200">

<!-- Como favicon -->
<link rel="icon" type="image/png" href="/kaia-logo-1024.png">
```

## 2 Em React (Componente Animado)

```tsx
import { KaiaWaterLogo } from "@/components/KaiaWaterLogo";

export default function Header() {
  return (
    <div className="navbar">
      {/* Logo com animações e texto */}
      <KaiaWaterLogo width={48} height={48} />
      
      {/* Apenas ícone sem texto */}
      <KaiaWaterLogo showText={false} width={32} height={32} />
      
      {/* Versão estática */}
      <KaiaWaterLogo animated={false} width={64} height={64} />
    </div>
  );
}
```

## 3 Em CSS (Responsivo)

```css
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-container img {
  width: auto;
  max-width: 100%;
  height: auto;
}

/* Mobile: 64x64 */
@media (max-width: 480px) {
  .logo { width: 64px; height: 64px; }
}

/* Tablet: 120x120 */
@media (481px) and (max-width: 1024px) {
  .logo { width: 120px; height: 120px; }
}

/* Desktop: 200x200 */
@media (min-width: 1025px) {
  .logo { width: 200px; height: 200px; }
}
```

## 4 Qual Formato Usar?

| Situação | Use | Motivo |
|----------|-----|--------|
| Site/Web | **SVG** | Escalável, menor tamanho |
| Instagram/Twitter | **PNG 1024** | Tamanho padrão, otimizado |
| Apresentação | **PNG 2048** ou SVG | Alta qualidade |
| Impressão A4 | **PNG 4096** | Máxima resolução |
| Favicon | **PNG 64** | Padrão web |

## 5 Copiar para Seu Projeto

```bash
# Copiar para public/ do seu projeto
cp public/kaia-logo-*.png seu-projeto/public/
cp public/kaia-logo-hd.svg seu-projeto/public/

# Ou apenas o SVG (recomendado para web)
cp public/kaia-logo-hd.svg seu-projeto/public/logo-kaia.svg
```

## 6 No Seu Componente de Logo

```tsx
// components/Logo.tsx
export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { width: '32px', height: '32px' },
    md: { width: '48px', height: '48px' },
    lg: { width: '64px', height: '64px' },
  };

  return (
    <img
      src="/kaia-logo-hd.svg"
      alt="Kaia Logo"
      style={sizes[size]}
    />
  );
}
```

## 7 Cor de Fundo Recomendada

```css
/* Fundo Claro (ideal) */
.with-light-bg {
  background: white;
  /* Logo fica em alto contraste */
}

/* Fundo Escuro (funciona bem) */
.with-dark-bg {
  background: linear-gradient(135deg, #001220 0%, #002855 100%);
  /* Logo mantém visibilidade com gradiente) */
}

/* Evite */
.bad-bg {
  background: #888888;
  /* Contraste baixo - evitar! */
}
```

## 8 Integração com Tailwind

```tsx
<div className="flex items-center justify-center">
  <img
    src="/kaia-logo-hd.svg"
    alt="Kaia"
    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
  />
</div>
```

## 9 Metadados para Next.js

```tsx
// app/layout.tsx
export const metadata = {
  icons: {
    icon: '/kaia-logo-1024.png',
    apple: '/kaia-logo-2048.png',
  },
  openGraph: {
    images: ['/kaia-logo-2048.png'],
  },
};
```

##  Troubleshooting

**Logo não aparece?**
- Verifique o caminho: `/public/kaia-logo-hd.svg`
- Use SVG para melhor compatibilidade
- Valide o HTML

**Logo distorcida?**
- Use `width` e `height` iguais (proporção 1:1)
- Use `object-fit: contain` em CSS
- Evite `width: 100%` sem altura

**Animação não funciona?**
- Use o componente React `KaiaWaterLogo`
- PNG estático não tem animação
- SVG pode ter animação se incluída no arquivo

---

** Localização:** `public/kaia-logo-*`  
** Guia Completo:** Veja `KAIA-LOGO-GUIDE.md`  
** Visualizar:** `kaia-logo-showcase.html`
