# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o Site Revela! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Código de Conduta

- Seja respeitoso e inclusivo
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros

## 🚀 Como Contribuir

### Reportar Bugs

1. Verifique se o bug já foi reportado nas [Issues](https://github.com/seu-usuario/site-revela/issues)
2. Se não, crie uma nova issue com:
   - Título claro e descritivo
   - Descrição detalhada do problema
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots (se aplicável)
   - Ambiente (OS, Node version, etc.)

### Sugerir Melhorias

1. Abra uma issue com a tag `enhancement`
2. Descreva a melhoria proposta
3. Explique por que seria útil
4. Forneça exemplos de uso

### Pull Requests

1. **Fork o projeto**
```bash
git clone https://github.com/seu-usuario/site-revela.git
cd site-revela
```

2. **Crie uma branch**
```bash
git checkout -b feature/minha-feature
# ou
git checkout -b fix/meu-fix
```

3. **Faça suas alterações**
   - Siga o style guide
   - Adicione testes se aplicável
   - Atualize a documentação

4. **Commit suas mudanças**
```bash
git add .
git commit -m "feat: adiciona nova funcionalidade X"
```

5. **Push para o GitHub**
```bash
git push origin feature/minha-feature
```

6. **Abra um Pull Request**
   - Descreva suas mudanças
   - Referencie issues relacionadas
   - Aguarde review

## 📝 Convenções de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nova funcionalidade
fix: correção de bug
docs: mudanças na documentação
style: formatação, ponto e vírgula, etc
refactor: refatoração de código
test: adicionar testes
chore: atualizar dependências, etc
```

Exemplos:
```bash
git commit -m "feat: adiciona validação de email no formulário"
git commit -m "fix: corrige erro de CORS no backend"
git commit -m "docs: atualiza README com instruções de deploy"
```

## 🎨 Style Guide

### TypeScript/JavaScript

```typescript
// ✅ Bom
const handleSubmit = async (data: FormData) => {
  try {
    const result = await trpc.submitContact.mutate(data);
    toast.success(result.message);
  } catch (error) {
    toast.error('Erro ao enviar');
  }
};

// ❌ Evitar
const handleSubmit = async (data) => {
  const result = await trpc.submitContact.mutate(data);
  toast.success(result.message);
};
```

### CSS

```css
/* ✅ Bom - Use variáveis CSS */
.button {
  background: var(--gradient-primary);
  padding: var(--space-md);
  border-radius: var(--radius-lg);
}

/* ❌ Evitar - Valores hardcoded */
.button {
  background: linear-gradient(135deg, #8a2be2 0%, #00bfff 100%);
  padding: 1.5rem;
  border-radius: 0.75rem;
}
```

### Nomenclatura

- **Componentes**: PascalCase (`ContactForm.tsx`)
- **Funções**: camelCase (`handleSubmit`)
- **Constantes**: UPPER_SNAKE_CASE (`API_URL`)
- **Arquivos CSS**: kebab-case (`style.css`)

## 🧪 Testes

### Adicionar Testes

```typescript
// ContactForm.test.tsx
import { render, screen } from '@testing-library/react';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  it('renders form fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
});
```

### Rodar Testes

```bash
npm test
```

## 📚 Documentação

### Atualizar Documentação

- Mantenha README.md atualizado
- Documente novas funcionalidades
- Adicione exemplos de uso
- Atualize CHANGELOG.md

### Comentários no Código

```typescript
// ✅ Bom - Explica o "porquê"
// Usamos debounce para evitar múltiplas requisições durante digitação
const debouncedSearch = debounce(search, 300);

// ❌ Evitar - Explica o "o quê" (óbvio)
// Define a função de busca
const search = () => { ... };
```

## 🔍 Code Review

### O que esperamos

- Código limpo e legível
- Testes passando
- Documentação atualizada
- Sem console.logs
- Sem código comentado
- Sem TODOs sem issue

### Checklist antes do PR

- [ ] Código segue o style guide
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Build passa sem erros
- [ ] Linter passa sem warnings
- [ ] Testado localmente

## 🏗️ Estrutura de Branches

```
main (produção)
  ↓
develop (desenvolvimento)
  ↓
feature/nome-da-feature
fix/nome-do-fix
```

## 📦 Versionamento

Seguimos [Semantic Versioning](https://semver.org/):

- **MAJOR**: Mudanças incompatíveis
- **MINOR**: Novas funcionalidades compatíveis
- **PATCH**: Correções de bugs

Exemplo: `1.2.3`

## 🎯 Áreas para Contribuir

### Frontend
- [ ] Novos componentes
- [ ] Melhorias de UX
- [ ] Animações
- [ ] Acessibilidade
- [ ] Performance

### Backend
- [ ] Novas rotas tRPC
- [ ] Validações
- [ ] Otimizações
- [ ] Testes

### Documentação
- [ ] Tutoriais
- [ ] Exemplos
- [ ] Traduções
- [ ] Diagramas

### DevOps
- [ ] CI/CD
- [ ] Docker
- [ ] Monitoramento
- [ ] Testes automatizados

## 💬 Comunicação

- **Issues**: Para bugs e features
- **Discussions**: Para perguntas e ideias
- **Pull Requests**: Para contribuições de código

## 🙏 Reconhecimento

Todos os contribuidores serão adicionados ao README.md!

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a MIT License.

---

**Obrigado por contribuir! 🎉**
