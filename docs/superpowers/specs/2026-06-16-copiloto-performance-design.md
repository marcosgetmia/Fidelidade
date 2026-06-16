# Copiloto de Performance — Design Spec

**Data:** 2026-06-16
**Status:** Aprovado
**Escopo:** Nova aba no bi-app (Next.js) — simulação de diagnóstico executivo por IA

---

## Objetivo

Adicionar a rota `/copiloto` ao bi-app com uma view que implementa o conceito do **Copiloto de Performance do Fidelidade**: uma interface que simula análise de IA em tempo real dos principais indicadores do programa, identificando desvios, causas e alavancas, e gerando uma narrativa executiva.

---

## Decisões de design

| Decisão | Escolha |
|---|---|
| Integração IA | Simulada (mock) — sem chamada de API real |
| Modelo de revelação | Seções progressivas com fade-in sequencial |
| Período de análise | Fixo no snapshot atual (MTD Jun/25) |
| Estilo visual | Segue padrão existente do bi-app (navy, accent, tailwind) |

---

## Rotas e arquivos novos

| Arquivo | Tipo | Descrição |
|---|---|---|
| `src/views/CopilotoView.tsx` | Client component | View principal com estado de animação |
| `src/components/StatusSignal.tsx` | Componente | Card de semáforo (verde/amarelo/vermelho) |
| Dados em `src/lib/mockData.ts` | Adição de dados | Desvios, causas, alavancas, narrativa |

### Arquivos modificados

| Arquivo | Mudança |
|---|---|
| `src/components/Sidebar.tsx` | Nova entrada no grupo "Principal" |
| `src/app/[domain]/page.tsx` | Import + entrada no mapa VIEWS |

---

## Layout da view

### Cabeçalho fixo (sempre visível)

- `PageHeader` padrão: ícone `✦`, título `COPILOTO DE PERFORMANCE`, subtitle `Diagnóstico executivo · Snapshot MTD Jun/25`
- Barra de status abaixo do header:
  - Texto: "Última análise gerada: hoje às 09:14"
  - Fontes conectadas (chips): Comarch · DW_Azul · P&L · Mapa Contábil
  - Botão: `▶ Gerar Diagnóstico` / estado loading: `◌ Analisando...` (desabilitado durante animação)

### Seções reveladas progressivamente (client state)

Estado: `visibleSections: number` (0 a 5), incrementado a cada 700ms após clique.

**Seção 1 — Sinais Econômicos** (delay: 0ms)
- 4 cards `StatusSignal` em grid 4 colunas
- Dados do `kpiExec` existente:
  - Burn/Earn: 84,7% → status `warn` (referência 85%)
  - Passivo: 12 meses → status `ok`
  - Breakage: 92,5% atingimento → status `warn`
  - Receita vs Meta: 96,6% → status `warn`

**Seção 2 — Desvios Identificados** (delay: 700ms)
- Lista de desvios com badge de severidade (`Atenção` / `Monitorar`)
- 4 desvios pré-construídos a partir dos KPIs reais

**Seção 3 — Possíveis Causas** (delay: 1.400ms)
- Agrupadas por desvio, com raciocínio baseado nos dados
- Apresentadas como "hipóteses identificadas pelo Copiloto"

**Seção 4 — Alavancas Sugeridas** (delay: 2.100ms)
- 4 ações priorizadas com domínio associado (Receita / Clientes / Earn-Burn / Campanhas)
- Badge de prioridade (Alta / Média)

**Seção 5 — Narrativa Executiva** (delay: 2.800ms)
- Parágrafo executivo completo
- Box destacado: borda accent esquerda, fundo `gray-bg`, label "Copiloto · Jun/25"

---

## Componente `StatusSignal`

```tsx
interface StatusSignalProps {
  label: string
  value: string
  reference?: string
  status: 'ok' | 'warn' | 'alert'
  detail?: string
}
```

- `ok` → borda e ícone verde (`#1A7A4A`)
- `warn` → borda e ícone âmbar (`#B45309`)
- `alert` → borda e ícone vermelho (`#B91C1C`)

---

## Dados novos em mockData.ts

```ts
export const copilotoDesvios = [...]  // 4 itens com: id, titulo, valor, meta, severidade, dominio
export const copilotoCausas = [...]   // agrupadas por desvio id
export const copilotoAlavancas = [...] // 4 itens com: titulo, dominio, prioridade, detalhe
export const copilotoNarrativa = `...` // string com texto executivo completo
```

---

## Comportamento de estado

```
estado inicial → visibleSections = 5 (análise já visível ao entrar na aba)

ao clicar "Gerar Diagnóstico":
  → visibleSections = 0
  → isAnalyzing = true
  → a cada 700ms: visibleSections++
  → quando visibleSections === 5: isAnalyzing = false
```

Ao entrar na aba pela primeira vez, a análise já aparece completa (snapshot pré-carregado). O botão serve para "regenerar", o que aplica a animação progressiva.

---

## Sidebar

Grupo: **Principal** (já existente)
Nova entrada logo abaixo de "Painel Executivo":

```
{ href: '/copiloto', icon: '✦', label: 'Copiloto de Performance', sub: 'Diagnóstico · Desvios · Alavancas' }
```

---

## Restrições e premissas

- Sem alteração em componentes existentes além de Sidebar e `[domain]/page.tsx`
- Todos os dados vêm do `mockData.ts` existente (adições apenas) ou de novas constantes no mesmo arquivo
- Nenhuma chamada de API — tudo client-side
- Animação usa `setTimeout` + `useState`, sem biblioteca de animação externa
- O fade-in das seções usa Tailwind com transição CSS (`transition-opacity duration-500`)
- Compatível com o padrão `'use client'` do Next.js já usado em Sidebar e outros componentes

---

## Fora de escopo

- Integração real com API de IA
- Histórico de diagnósticos anteriores
- Seletor de período
- Exportação/compartilhamento do diagnóstico
