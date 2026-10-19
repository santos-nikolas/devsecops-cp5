# CP05 - O Pipeline DevSecOps Completo

**Aluno:** Nikolas Rodrigues Moura dos Santos | **RM:** 551566 | **Turma:** 4ESPW

Pipeline de referência da Arcanjo SA: todo `push` e `pull_request` passa por três barreiras de segurança
definidas em [`.github/workflows/security.yml`](.github/workflows/security.yml).

| Job | Categoria | O que barra |
|-----|-----------|-------------|
| `gitleaks` | Secret scanning | Senhas, tokens e chaves (ex.: AWS) em qualquer commit do histórico |
| `semgrep` | SAST | Código vulnerável, como `eval()` com entrada do usuário |
| `trivy` | Scan de imagem | Imagem Docker com CVE **CRITICAL** que já tem correção (roda só se as duas primeiras passarem) |

## Estrutura

```
.github/workflows/security.yml   # pipeline com os 3 jobs
Dockerfile                       # nginx:alpine + patches do apk (evolução do CP04)
index.html, style.css            # site
calculadora.js                   # calculadora sem eval()
```

## Rodando local

```bash
docker build -t cp5-site .
docker run -d -p 8080:80 cp5-site
# http://localhost:8080
```

## Provas de sabotagem

O histórico de commits deste repositório registra cada sabotagem e sua correção
(veja a aba **Actions**):

1. **Gitleaks**: commit `config.js` com chave AWS falsa → pipeline **falha**; correção remove o arquivo.
2. **Semgrep**: calculadora reescrita com `eval()` → pipeline **falha**; correção volta ao parser seguro.
3. **Trivy**: imagem base trocada por `nginx:1.16-alpine` (antiga) → pipeline **falha** por CVE CRITICAL; correção volta para `nginx:alpine`.

> Observação: a chave usada na prova 1 é **falsa**, criada só para o teste. Num vazamento real, apagar o arquivo
> não resolve (o Git guarda o histórico): a credencial precisa ser **revogada** imediatamente.
