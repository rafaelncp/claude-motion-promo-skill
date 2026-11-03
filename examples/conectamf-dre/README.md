# ConectaMF: DRE em 15 segundos (piloto)

Um exemplo **vertical (1080 x 1920), 15 segundos**, para adaptar e executar no Codex. Usa o motor existente Three.js + Playwright + FFmpeg. Não requer Remotion nem serviço pago.

**Estado:** roteiro, cena e teste de conciliação prontos para reprodução local. A existência do projeto no GitHub **não comprova que o MP4 foi renderizado nem que há narração**.

## Pré-requisitos

Node.js >= 20; Python >= 3 com numpy; ffmpeg + ffprobe no PATH; Playwright Chromium instalado; dependências do template via npm. Verifique as instruções de licença das vozes TTS antes de usos comerciais. No Windows, rode `make.sh` no Git Bash ou WSL.

## Rodar

Na raiz do fork:

```bash
node --test examples/conectamf-dre/dre.test.mjs
node motion-promo/motion-video/scripts/video.mjs doctor
node examples/conectamf-dre/prepare.mjs
```

O preparador cria `~/motion-videos/conectamf-dre` por padrão; aceita outro caminho como argumento e **recusa sobrescrever** uma pasta existente.

Depois, no diretório criado:

```bash
npm install
npx playwright install chromium
node render.mjs preview 0.8,2.8,5.9,8.8,11.8,14.2
bash make.sh 30 "" conectamf-dre
ffprobe -v error -show_entries format=duration -show_entries stream=codec_name,width,height -of json out/conectamf-dre.mp4
```

Revise as imagens em `preview/f_*.png`, `preview/contact.png` e `preview/check_*.png`. Elas são provas mais úteis que um log dizendo "rendered". O MP4 fica em `out/conectamf-dre.mp4`.

## Narração brasileira: roteiro a gravar

"Receita líquida menos custos vira lucro bruto. Tirando despesas operacionais, temos EBITDA. Descontando depreciação e amortização, chegamos ao EBIT. Depois entram receitas e despesas financeiras. Tiramos imposto de renda e contribuição social, e encontramos o lucro líquido."

**Atenção:** a voz acima é roteiro, **não arquivo de áudio**. O render padrão fornece efeitos sonoros e música sintética, mas não sintetiza essa fala. Para voz em português, forneça uma gravação própria ou configure explicitamente um TTS licenciado; em seguida faça o mix final e confira sincronia e loudness.

## Números fictícios (R$)

| Etapa | Valor |
|---|---:|
| Receita líquida, após deduções sobre vendas | 1.000.000 |
| (-) CPV / COGS | (400.000) |
| (=) Lucro bruto | 600.000 |
| (-) Despesas operacionais sem D&A | (250.000) |
| (=) EBITDA gerencial | 350.000 |
| (-) Depreciação + amortização | (50.000) |
| (=) EBIT | 300.000 |
| (+) Receita financeira | 20.000 |
| (-) Despesa financeira | (70.000) |
| (=) Lucro antes IR/CSLL | 250.000 |
| (-) IR + CSLL | (85.000) |
| (=) Lucro líquido | 165.000 |

**Nota contábil:** Receita líquida não equivale a todo faturamento bruto. CPV normalmente inclui os custos dos produtos efetivamente vendidos; vendedores/comissões são classificados conforme natureza, política e critérios aplicáveis, não simplesmente somados ao CPV. EBITDA é aqui uma reconciliação gerencial, não uma linha obrigatória em toda DRE societária.

## Critérios de conclusão

- [x] Conciliação aritmética testável em `dre.test.mjs`
- [x] Cena 3D roteirizada e configuração 9:16 reproduzível
- [ ] Diagnóstico de dependências na máquina de render
- [ ] Prévia visual aprovada em 6 momentos
- [ ] MP4 final validado (15s, 1080x1920, h264+aac)
- [ ] Narração em pt-BR e legenda sincronizada validadas, se exigidas
- [ ] Revisão editorial e autorização antes de publicar no Instagram

Referência: `motion-promo/SKILL.md`, licença MIT em `LICENSE`. O projeto está vinculado à participação no ConectaMF, mas não implica compromisso de postagens automáticas.
