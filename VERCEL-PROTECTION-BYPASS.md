# Vercel Deployment Protection / Bypass

Este projeto está com **Deployment Protection** ativo em Vercel, exigindo autenticação (SSO / Team) ou um **bypass token** para acessar rotas como `/`, `/pitch`, `/kaia` via scripts automatizados.

## 1. Gerar Token de Bypass
1. Acesse o projeto no Vercel Dashboard.
2. Vá em: Settings → Deployments → Protection.
3. Em "Protection Bypass Tokens" clique em "Generate".
4. Copie o token (formato hash longo). Guarde em local seguro.

## 2. Usar Token no Browser
Abra diretamente:
```
https://SEU-DOMINIO/?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=SEU_TOKEN
```
Após isso o cookie é definido e páginas subsequentes liberam conteúdo (no mesmo navegador).

## 3. Usar Token em Scripts (sem cookie persistente)
Inclua sempre o query string:
```
https://SEU-DOMINIO/pitch?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=SEU_TOKEN
```
Para cada rota protegida.

## 4. Smoke Test Automatizado
Use o script `scripts/smoke_test.ps1` (ver abaixo) passando o token:
```powershell
powershell -File .\scripts\smoke_test.ps1 -BaseUrl https://SEU-DOMINIO -BypassToken SEU_TOKEN
```

## 5. Desativar Temporariamente (não recomendado em produção)
Em Settings → Deployments → Protection: "Disable Protection". Reative assim que terminar testes.

## 6. Boas Práticas
- Nunca commitar o token.
- Armazene em um secret do CI/CD (ex: `VERCEL_BYPASS_TOKEN`).
- Rotacione periodicamente.

## 7. Erros Comuns
| Sintoma | Causa | Solução |
|--------|-------|---------|
| Página volta formulário de autenticação | Query sem token ou cookie não definido | Adicione parâmetros de bypass novamente |
| Script retorna 401/Authentication Required | Falta do token em cada requisição | Append do query string a cada chamada |
| Token exposto em logs públicos | Logging sem sanitização | Mascarar antes de imprimir |

## 8. Integração CI (Exemplo cURL)
```bash
curl -s "https://SEU-DOMINIO/?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=$VERCEL_BYPASS_TOKEN" > /dev/null
curl -s "https://SEU-DOMINIO/pitch?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=$VERCEL_BYPASS_TOKEN" | grep -i "pilares"
```

## 9. Observação
Caso a proteção seja alterada para senha, ajuste o fluxo para enviar a senha ou mudar a estratégia para autenticação via SSO/cookie.

---
Atualize SEU-DOMINIO e substitua SEU_TOKEN antes de usar.
