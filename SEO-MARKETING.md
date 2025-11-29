# 📈 Guia de SEO e Marketing - Site Revela

## 🎯 Otimizações SEO Implementadas

### Meta Tags
✅ Title tag otimizado (< 60 caracteres)
✅ Meta description (< 160 caracteres)
✅ Open Graph tags (Facebook, LinkedIn)
✅ Twitter Cards
✅ Canonical URL
✅ Language tag (pt-BR)

### Estrutura HTML
✅ Heading hierarchy (H1 → H2 → H3)
✅ Semantic HTML5
✅ Alt text em imagens
✅ Structured data (Schema.org) - *a implementar*

### Performance
✅ Lazy loading de imagens
✅ Code splitting
✅ Minificação de assets
✅ Compressão gzip/brotli
✅ Cache headers

## 🚀 Próximas Otimizações SEO

### 1. Adicionar Schema.org (JSON-LD)

Adicione no `index.html` antes de `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Revela Consultoria",
  "description": "Consultoria de crescimento empresarial",
  "url": "https://seusite.com.br",
  "telephone": "+55-31-99807-9088",
  "email": "contato@seusite.com.br",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BR",
    "addressRegion": "Brasil"
  },
  "sameAs": [
    "https://www.linkedin.com/company/sua-empresa",
    "https://www.instagram.com/sua-empresa"
  ]
}
</script>
```

### 2. Sitemap XML

Crie `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://seusite.com.br/</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 3. Robots.txt

Crie `public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://seusite.com.br/sitemap.xml
```

### 4. Google Analytics 4

Adicione no `index.html` antes de `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 5. Google Search Console

1. Acesse https://search.google.com/search-console
2. Adicione sua propriedade
3. Verifique com meta tag ou arquivo HTML
4. Envie o sitemap

## 📱 Marketing Digital

### Redes Sociais

#### Meta Tags Otimizadas (já implementadas)
- Open Graph para Facebook/LinkedIn
- Twitter Cards para Twitter

#### Imagens Recomendadas
- **OG Image**: 1200x630px
- **Twitter Card**: 1200x600px
- **Favicon**: 512x512px

Gere com:
```bash
npm install -g @squoosh/cli
squoosh-cli --resize '{width:1200,height:630}' -d public/og-image.jpg sua-imagem.jpg
```

### Google Ads

#### Palavras-chave Sugeridas
- consultoria empresarial
- crescimento empresarial
- consultoria de negócios
- scale-up empresa
- aumentar faturamento
- consultoria estratégica

#### Landing Page Otimizada
✅ CTA claro e visível
✅ Formulário de contato
✅ Prova social (depoimentos)
✅ Proposta de valor clara
✅ Mobile-friendly

### Email Marketing

#### Integração com Mailchimp/SendGrid

Adicione ao `server/router.ts`:

```typescript
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

// No mutation subscribeNewsletter:
await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
  email_address: input.email,
  status: 'subscribed',
});
```

### Facebook Pixel

Adicione no `index.html`:

```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'SEU_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

## 🎨 Otimização de Conversão (CRO)

### A/B Testing

Use ferramentas como:
- Google Optimize
- VWO
- Optimizely

### Elementos para Testar
1. Cor do botão CTA
2. Texto do CTA
3. Posição do formulário
4. Headline principal
5. Imagens vs vídeos

### Heatmaps

Ferramentas recomendadas:
- Hotjar
- Crazy Egg
- Microsoft Clarity (gratuito)

## 📊 Métricas para Acompanhar

### Google Analytics
- Taxa de rejeição
- Tempo médio na página
- Páginas por sessão
- Taxa de conversão

### Search Console
- Impressões
- Cliques
- CTR
- Posição média

### Metas de Conversão
- Formulário enviado
- Newsletter inscrita
- Tempo de engajamento
- Scroll depth

## 🔗 Link Building

### Estratégias
1. Guest posts em blogs relevantes
2. Parcerias com empresas complementares
3. Diretórios de negócios
4. Perfis em redes sociais
5. Google Meu Negócio

### Backlinks de Qualidade
- LinkedIn Company Page
- Facebook Business Page
- Instagram Business
- YouTube Channel
- Medium/Blog

## 📝 Content Marketing

### Blog (a implementar)

Crie uma pasta `src/pages/blog/`:

```typescript
// src/pages/Blog.tsx
export default function Blog() {
  return (
    <section>
      <h1>Blog</h1>
      {/* Lista de artigos */}
    </section>
  );
}
```

### Tópicos Sugeridos
1. "Como escalar de R$5M para R$50M"
2. "Metodologias ágeis para PMEs"
3. "KPIs essenciais para crescimento"
4. "Case studies de clientes"
5. "Tendências de mercado"

### Frequência
- 2-4 posts por mês
- 1000-2000 palavras cada
- Otimizado para SEO

## 🎯 Conversão de Leads

### Funil de Vendas

1. **Topo (Awareness)**
   - Blog posts
   - Redes sociais
   - Google Ads

2. **Meio (Consideration)**
   - E-books gratuitos
   - Webinars
   - Cases de sucesso

3. **Fundo (Decision)**
   - Diagnóstico gratuito
   - Consulta inicial
   - Proposta comercial

### Lead Magnets

Ideias:
- "Checklist: 10 sinais que sua empresa precisa de consultoria"
- "E-book: Guia completo de crescimento empresarial"
- "Template: Plano de crescimento 90 dias"
- "Calculadora: Potencial de crescimento da sua empresa"

## 🚀 Quick Wins

### Implementações Rápidas (< 1 hora)

1. ✅ Adicionar Google Analytics
2. ✅ Criar Google Search Console
3. ✅ Adicionar Schema.org
4. ✅ Criar sitemap.xml
5. ✅ Configurar robots.txt
6. ✅ Adicionar Facebook Pixel
7. ✅ Criar perfis em redes sociais
8. ✅ Configurar Google Meu Negócio

### Implementações Médias (1-3 horas)

1. ⏳ Integrar email marketing
2. ⏳ Configurar Google Ads
3. ⏳ Criar conteúdo para blog
4. ⏳ Configurar heatmaps
5. ⏳ Criar lead magnets

### Implementações Longas (> 3 horas)

1. 📅 Estratégia de conteúdo completa
2. 📅 Campanha de link building
3. 📅 Programa de afiliados
4. 📅 Automação de marketing
5. 📅 CRM integration

## 📞 Contato e Suporte

Para implementar qualquer uma dessas estratégias, consulte:
- README.md (documentação técnica)
- QUICKSTART.md (início rápido)
- Documentação das ferramentas mencionadas

---

**Dica**: Implemente uma estratégia por vez e meça os resultados antes de adicionar mais!
