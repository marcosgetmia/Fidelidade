# Copiloto de Performance — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar a rota `/copiloto` ao bi-app com uma view que simula diagnóstico executivo de IA em tempo real, revelando 5 seções progressivamente a cada 700 ms após o clique em "Gerar Diagnóstico".

**Architecture:** Client component com `useState` + `useEffect` controlando `visibleSections` (0–5). Dados 100% mockados em `mockData.ts`. Animação de fade-in via CSS `@keyframes` injetado em `globals.css`. Novo componente `StatusSignal` para os cards de semáforo.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS. Sem dependências novas.

---

## File Map

| Ação | Arquivo | Responsabilidade |
|---|---|---|
| Modify | `src/lib/mockData.ts` | Adicionar dados copiloto (desvios, causas, alavancas, narrativa) |
| Modify | `src/app/globals.css` | Adicionar keyframe `fade-in` |
| Create | `src/components/StatusSignal.tsx` | Card de semáforo reutilizável (ok / warn / alert) |
| Create | `src/views/CopilotoView.tsx` | View principal com estado de animação progressiva |
| Modify | `src/components/Sidebar.tsx` | Nova entrada no grupo "Principal" |
| Modify | `src/app/[domain]/page.tsx` | Import + entrada no mapa VIEWS |

---

## Task 1: Adicionar dados mock do Copiloto em mockData.ts

**Files:**
- Modify: `bi-app/src/lib/mockData.ts` (adicionar ao final do arquivo)

- [ ] **Step 1: Abrir o arquivo e ir ao final**

  O arquivo termina na linha 189. Adicionar após `agingPontos`.

- [ ] **Step 2: Adicionar os tipos e constantes**

  Adicionar ao final de `bi-app/src/lib/mockData.ts`:

  ```ts
  // ─── Copiloto de Performance ──────────────────────────────────────────────────
  export type DesvioSeveridade = 'Atenção' | 'Monitorar'
  export type AlavancaPrioridade = 'Alta' | 'Média'

  export interface CopilotoDesvio {
    id: string
    titulo: string
    valor: string
    meta: string
    gap: string
    severidade: DesvioSeveridade
    dominio: string
  }

  export interface CopilotoAlavanca {
    titulo: string
    dominio: string
    prioridade: AlavancaPrioridade
    detalhe: string
  }

  export const copilotoDesvios: CopilotoDesvio[] = [
    {
      id: 'receita-meta',
      titulo: 'Receita MTD abaixo da meta',
      valor: 'R$ 176,8 Mi',
      meta: 'R$ 183,0 Mi',
      gap: '-3,4%',
      severidade: 'Atenção',
      dominio: 'Receita',
    },
    {
      id: 'burn-earn',
      titulo: 'Burn/Earn levemente abaixo da referência',
      valor: '84,7%',
      meta: '85,0%',
      gap: '-0,3 p.p.',
      severidade: 'Monitorar',
      dominio: 'Earn-Burn',
    },
    {
      id: 'breakage',
      titulo: 'Breakage com gap vs projetado',
      valor: 'R$ 49 Mi',
      meta: 'R$ 53 Mi',
      gap: '-7,5%',
      severidade: 'Atenção',
      dominio: 'Earn-Burn',
    },
    {
      id: 'b2b-crescimento',
      titulo: 'B2B com crescimento abaixo do potencial',
      valor: '+3,9% MTD',
      meta: '+8,0% MTD',
      gap: '-4,1 p.p.',
      severidade: 'Monitorar',
      dominio: 'Receita',
    },
  ]

  export const copilotoCausas: Record<string, string[]> = {
    'receita-meta': [
      'B2B crescendo a +3,9% MTD — abaixo da média anual de +7,2% —, com parceiros tradicionais (Caixa -1,3%) amortecendo o avanço de digitais.',
      'B2C sustenta +11,4% e Clube +18,2%, mas a massa desses segmentos não compensa o gap de B2B frente à meta consolidada.',
    ],
    'burn-earn': [
      'Burn crescendo a +12,6% YTD — ritmo 3,3 p.p. acima do Earn (+9,3%) — criando tendência que, se mantida por mais 2 meses, ativa o alerta de janela acumulada.',
      'Mix de resgates com maior proporção de Azul pelo Mundo eleva o custo médio por ponto resgatado, pressionando o denominador do índice.',
    ],
    'breakage': [
      'Taxa de ativação de pontos mais elevada em clientes recém-ativados reduz a massa de pontos expirados no período.',
      'Campanha de duplo de pontos no varejo acelerou uso de saldos que seriam breakage natural em jul-ago/25.',
    ],
    'b2b-crescimento': [
      'Parceiros bancários tradicionais com crescimento estagnado (Caixa -1,3%, Bradesco +4,2%) compensam parcialmente o avanço de digitais (Nubank +22,7%, iFood +34,2%).',
      'Pipeline de novas campanhas B2B concentrado em jul/25 — o impacto não foi capturado no MTD de junho.',
    ],
  }

  export const copilotoAlavancas: CopilotoAlavanca[] = [
    {
      titulo: 'Acelerar campanhas B2B com foco em parceiros digitais',
      dominio: 'Receita',
      prioridade: 'Alta',
      detalhe: 'Nubank e iFood crescendo acima de 20%. Antecipar campanhas do pipeline de jul/25 pode recuperar parte do gap de receita MTD sem custo adicional de aquisição.',
    },
    {
      titulo: 'Monitorar janela acumulada de Burn/Earn semanalmente',
      dominio: 'Earn-Burn',
      prioridade: 'Alta',
      detalhe: 'Burn (+12,6%) cresce acima de Earn (+9,3%). Acompanhar o acumulado de 3 meses. Se o padrão se repetir em jul/25, o alerta de janela será ativado.',
    },
    {
      titulo: 'Revisar projeção de Breakage para jul-ago/25',
      dominio: 'Earn-Burn',
      prioridade: 'Média',
      detalhe: 'Campanhas de acúmulo aceleradas anteciparam uso de saldos. Ajustar projeção antes do fechamento do P&L mensal para evitar surpresa negativa no resultado.',
    },
    {
      titulo: 'Intensificar engajamento de clientes High Value',
      dominio: 'Clientes',
      prioridade: 'Média',
      detalhe: 'Base High Value cresceu +6,8% YTD. Aumentar frequência de transações nesse segmento melhora o Burn/Earn e gera receita incremental de alta margem.',
    },
  ]

  export const copilotoNarrativa =
    'O programa Azul Fidelidade encerra o MTD de junho de 2025 com receita de R$ 176,8 Mi — 3,4% abaixo da meta de R$ 183,0 Mi. O principal vetor do desvio é o ritmo de crescimento B2B (+3,9% MTD vs média anual de +7,2%), parcialmente compensado por B2C robusto (+11,4%) e Clube com aceleração expressiva (+18,2%). No plano econômico, o Burn/Earn de 84,7% está 0,3 p.p. abaixo da referência de 85%, com sinal de atenção: o Burn cresce a +12,6% — ritmo 3,3 p.p. acima do Earn (+9,3%). Se o padrão persistir por mais dois meses, o alerta de janela acumulada será ativado. O Breakage realizou R$ 49 Mi frente a projeção de R$ 53 Mi, impactado por campanhas de acúmulo que anteciparam uso de saldos naturalmente expiráveis. O Passivo permanece controlado dentro do teto de 12 meses. As alavancas prioritárias para o curto prazo são: (1) antecipar campanhas B2B com parceiros digitais de alto crescimento; (2) monitorar a janela acumulada de Burn/Earn semanalmente; e (3) revisar a projeção de Breakage para jul-ago antes do fechamento contábil.'
  ```

- [ ] **Step 3: Verificar que o arquivo compila sem erros**

  ```bash
  cd bi-app && npx tsc --noEmit
  ```
  Esperado: zero erros.

- [ ] **Step 4: Commit**

  ```bash
  git add bi-app/src/lib/mockData.ts
  git commit -m "feat(copiloto): add copiloto mock data to mockData"
  ```

---

## Task 2: Adicionar animação fade-in ao globals.css

**Files:**
- Modify: `bi-app/src/app/globals.css`

- [ ] **Step 1: Adicionar keyframe e classe utilitária ao final do arquivo**

  Adicionar ao final de `bi-app/src/app/globals.css`:

  ```css
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in {
    animation: fadeSlideIn 0.45s ease forwards;
  }
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add bi-app/src/app/globals.css
  git commit -m "feat(copiloto): add fade-in animation to globals.css"
  ```

---

## Task 3: Criar componente StatusSignal

**Files:**
- Create: `bi-app/src/components/StatusSignal.tsx`

- [ ] **Step 1: Criar o arquivo com conteúdo completo**

  Criar `bi-app/src/components/StatusSignal.tsx`:

  ```tsx
  interface StatusSignalProps {
    label: string
    value: string
    reference?: string
    status: 'ok' | 'warn' | 'alert'
    detail?: string
  }

  const CFG = {
    ok:    { border: 'border-bi-green',  icon: '✓', iconColor: 'text-bi-green',  pill: 'bg-green-100 text-bi-green',   pillLabel: 'Normal'  },
    warn:  { border: 'border-amber-500', icon: '⚠', iconColor: 'text-amber-600', pill: 'bg-amber-100 text-amber-700',  pillLabel: 'Atenção' },
    alert: { border: 'border-red-500',   icon: '✕', iconColor: 'text-red-600',   pill: 'bg-red-100   text-red-700',    pillLabel: 'Alerta'  },
  } as const

  export default function StatusSignal({ label, value, reference, status, detail }: StatusSignalProps) {
    const c = CFG[status]
    return (
      <div className={`border-2 ${c.border} bg-white rounded-md p-3.5`}>
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] uppercase tracking-wide font-semibold text-gray-txt">{label}</p>
          <span className={`text-sm font-bold ${c.iconColor}`}>{c.icon}</span>
        </div>
        <p className="text-xl font-bold text-dark leading-tight">{value}</p>
        {reference && <p className="text-[11px] text-gray-txt mt-1">Ref.: {reference}</p>}
        {detail    && <p className="text-[11px] text-gray-txt mt-0.5">{detail}</p>}
        <span className={`inline-block mt-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${c.pill}`}>
          {c.pillLabel}
        </span>
      </div>
    )
  }
  ```

- [ ] **Step 2: Verificar tipos**

  ```bash
  cd bi-app && npx tsc --noEmit
  ```
  Esperado: zero erros.

- [ ] **Step 3: Commit**

  ```bash
  git add bi-app/src/components/StatusSignal.tsx
  git commit -m "feat(copiloto): add StatusSignal component"
  ```

---

## Task 4: Criar CopilotoView

**Files:**
- Create: `bi-app/src/views/CopilotoView.tsx`

- [ ] **Step 1: Criar o arquivo com conteúdo completo**

  Criar `bi-app/src/views/CopilotoView.tsx`:

  ```tsx
  'use client'
  import { useState, useEffect } from 'react'
  import PageHeader from '@/components/PageHeader'
  import SectionLabel from '@/components/SectionLabel'
  import StatusSignal from '@/components/StatusSignal'
  import {
    copilotoDesvios,
    copilotoCausas,
    copilotoAlavancas,
    copilotoNarrativa,
  } from '@/lib/mockData'

  const TOTAL = 5

  const SEV_CLS: Record<string, string> = {
    'Atenção':  'bg-amber-100 text-amber-700 border border-amber-200',
    'Monitorar':'bg-blue-50  text-bi-blue  border border-blue-200',
  }

  const PRI_CLS: Record<string, string> = {
    'Alta':  'bg-red-100  text-red-700',
    'Média': 'bg-amber-100 text-amber-700',
  }

  export default function CopilotoView() {
    const [visible,   setVisible]   = useState(TOTAL)
    const [analyzing, setAnalyzing] = useState(false)

    useEffect(() => {
      if (!analyzing) return
      if (visible >= TOTAL) { setAnalyzing(false); return }
      const t = setTimeout(() => setVisible(v => v + 1), 700)
      return () => clearTimeout(t)
    }, [analyzing, visible])

    function handleGenerate() {
      setVisible(0)
      setAnalyzing(true)
    }

    return (
      <div>
        <PageHeader
          icon="✦"
          title="COPILOTO DE PERFORMANCE"
          subtitle="Diagnóstico executivo · Snapshot MTD Jun/25"
        />

        <div className="bg-white border border-gray-line border-t-0 rounded-b-md p-5 space-y-5">

          {/* ── Barra de status ── */}
          <div className="flex items-center justify-between border border-gray-line rounded-md px-4 py-3 bg-gray-bg">
            <div className="flex items-center gap-5">
              <div>
                <p className="text-[10px] text-gray-txt uppercase tracking-wide">Última análise</p>
                <p className="text-xs font-semibold text-dark">Hoje às 09:14 · MTD Jun/25</p>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="text-[10px] text-gray-txt">Fontes:</p>
                {['Comarch', 'DW_Azul', 'P&L', 'Mapa Contábil'].map(f => (
                  <span key={f} className="text-[9px] font-bold bg-blue-light text-navy px-2 py-0.5 rounded-full">
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={handleGenerate}
              disabled={analyzing}
              className={`text-xs font-bold px-4 py-2 rounded-md transition-colors ${
                analyzing
                  ? 'bg-gray-line text-gray-txt cursor-not-allowed'
                  : 'bg-navy text-white hover:bg-navy-mid'
              }`}
            >
              {analyzing ? '◌  Analisando...' : '▶  Gerar Diagnóstico'}
            </button>
          </div>

          {/* ── Seção 1 — Sinais Econômicos ── */}
          {visible >= 1 && (
            <div className="animate-fade-in">
              <SectionLabel icon="🔍" title="Sinais Econômicos" period="MTD Jun/25 · Status atual" />
              <div className="grid grid-cols-4 gap-3">
                <StatusSignal
                  label="Burn / Earn"
                  value="84,7%"
                  reference="Referência: 85,0%"
                  status="warn"
                  detail="0,3 p.p. abaixo da referência"
                />
                <StatusSignal
                  label="Passivo (meses resgate)"
                  value="12 meses"
                  reference="Teto: 12 meses"
                  status="ok"
                  detail="Dentro do limite controlado"
                />
                <StatusSignal
                  label="Breakage (atingimento)"
                  value="92,5%"
                  reference="Meta: R$ 53 Mi"
                  status="warn"
                  detail="Gap de R$ 4 Mi vs projetado"
                />
                <StatusSignal
                  label="Receita vs Meta"
                  value="96,6%"
                  reference="Meta: R$ 183,0 Mi"
                  status="warn"
                  detail="Gap de R$ 6,2 Mi no MTD"
                />
              </div>
            </div>
          )}

          {/* ── Seção 2 — Desvios ── */}
          {visible >= 2 && (
            <div className="animate-fade-in">
              <SectionLabel icon="⚡" title="Desvios Identificados" period={`${copilotoDesvios.length} desvios detectados · Jun/25`} />
              <div className="space-y-2">
                {copilotoDesvios.map(d => (
                  <div key={d.id} className="border border-gray-line rounded-md p-3 bg-gray-bg flex items-center gap-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${SEV_CLS[d.severidade]}`}>
                      {d.severidade}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-dark">{d.titulo}</p>
                      <p className="text-[11px] text-gray-txt">
                        Realizado: <strong>{d.valor}</strong>
                        {' · '}Meta/Ref.: <strong>{d.meta}</strong>
                        {' · '}Desvio: <strong>{d.gap}</strong>
                      </p>
                    </div>
                    <span className="text-[9px] font-bold text-accent bg-blue-light px-2 py-0.5 rounded-full shrink-0">
                      {d.dominio}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Seção 3 — Causas ── */}
          {visible >= 3 && (
            <div className="animate-fade-in">
              <SectionLabel icon="🧠" title="Possíveis Causas" period="Hipóteses identificadas pelo Copiloto" />
              <div className="space-y-3">
                {copilotoDesvios.map(d => (
                  <div key={d.id} className="border border-gray-line rounded-md p-3.5 bg-gray-bg">
                    <p className="text-[10px] font-bold text-navy uppercase tracking-wide mb-2">{d.titulo}</p>
                    <ul className="space-y-1.5">
                      {copilotoCausas[d.id].map((causa, i) => (
                        <li key={i} className="flex gap-2 text-[12px] text-dark leading-snug">
                          <span className="text-accent font-bold shrink-0 mt-0.5">›</span>
                          <span>{causa}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Seção 4 — Alavancas ── */}
          {visible >= 4 && (
            <div className="animate-fade-in">
              <SectionLabel icon="🎯" title="Alavancas Sugeridas" period="Priorizadas por impacto esperado" />
              <div className="grid grid-cols-2 gap-3">
                {copilotoAlavancas.map((a, i) => (
                  <div key={i} className="border border-gray-line rounded-md p-3.5 bg-gray-bg">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${PRI_CLS[a.prioridade]}`}>
                        {a.prioridade}
                      </span>
                      <span className="text-[9px] font-bold text-accent bg-blue-light px-2 py-0.5 rounded-full">
                        {a.dominio}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-dark mb-1">{a.titulo}</p>
                    <p className="text-[11px] text-gray-txt leading-relaxed">{a.detalhe}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Seção 5 — Narrativa Executiva ── */}
          {visible >= 5 && (
            <div className="animate-fade-in">
              <SectionLabel icon="✦" title="Narrativa Executiva" period="Diagnóstico consolidado · Copiloto Jun/25" />
              <div className="border-l-4 border-accent bg-gray-bg rounded-r-md p-5">
                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-3">
                  Copiloto de Performance · MTD Jun/25
                </p>
                <p className="text-sm text-dark leading-relaxed">{copilotoNarrativa}</p>
              </div>
            </div>
          )}

        </div>
      </div>
    )
  }
  ```

- [ ] **Step 2: Verificar tipos**

  ```bash
  cd bi-app && npx tsc --noEmit
  ```
  Esperado: zero erros.

- [ ] **Step 3: Commit**

  ```bash
  git add bi-app/src/views/CopilotoView.tsx
  git commit -m "feat(copiloto): add CopilotoView with progressive reveal"
  ```

---

## Task 5: Registrar rota e entrada na sidebar

**Files:**
- Modify: `bi-app/src/components/Sidebar.tsx` — adicionar item no grupo "Principal"
- Modify: `bi-app/src/app/[domain]/page.tsx` — import + entrada em VIEWS

- [ ] **Step 1: Adicionar entrada no NAV do Sidebar**

  Em `bi-app/src/components/Sidebar.tsx`, no array `NAV`, dentro do grupo `'Principal'`, adicionar o item do Copiloto logo após o item do Painel Executivo:

  ```ts
  // Antes (grupo Principal):
  {
    group: 'Principal',
    items: [
      { href: '/executivo',  icon: '📊', label: 'Painel Executivo',      sub: 'Executive Scorecard' },
    ],
  },

  // Depois:
  {
    group: 'Principal',
    items: [
      { href: '/executivo',  icon: '📊', label: 'Painel Executivo',      sub: 'Executive Scorecard' },
      { href: '/copiloto',   icon: '✦',  label: 'Copiloto de Performance', sub: 'Diagnóstico · Desvios · Alavancas' },
    ],
  },
  ```

- [ ] **Step 2: Registrar a view no roteador de domínios**

  Em `bi-app/src/app/[domain]/page.tsx`:

  ```tsx
  // Adicionar import no topo (após os outros imports de views):
  import CopilotoView from '@/views/CopilotoView'

  // Adicionar entrada no objeto VIEWS:
  const VIEWS: Record<string, React.FC> = {
    executivo:  ExecutivoView,
    receita:    ReceitaView,
    b2b:        B2BView,
    clientes:   ClientesView,
    clube:      ClubeView,
    aic:        AICView,
    'earn-burn':EarnBurnView,
    resgates:   ResgatesView,
    governanca: GovernancaView,
    copiloto:   CopilotoView,   // ← adicionar esta linha
  }
  ```

- [ ] **Step 3: Verificar tipos e build**

  ```bash
  cd bi-app && npx tsc --noEmit
  ```
  Esperado: zero erros.

- [ ] **Step 4: Commit**

  ```bash
  git add bi-app/src/components/Sidebar.tsx bi-app/src/app/[domain]/page.tsx
  git commit -m "feat(copiloto): wire up sidebar nav and domain route"
  ```

---

## Task 6: Smoke test visual no browser

**Files:** nenhum (verificação)

- [ ] **Step 1: Iniciar o servidor de dev**

  ```bash
  cd bi-app && npm run dev
  ```
  Esperado: servidor rodando em `http://localhost:3000`.

- [ ] **Step 2: Verificar a nova entrada na sidebar**

  Abrir `http://localhost:3000`. Confirmar que "✦ Copiloto de Performance" aparece no grupo "Principal" logo abaixo de "Painel Executivo".

- [ ] **Step 3: Verificar análise pré-carregada**

  Clicar em "Copiloto de Performance". Confirmar que as 5 seções (Sinais, Desvios, Causas, Alavancas, Narrativa) aparecem completas ao entrar na aba.

- [ ] **Step 4: Verificar animação progressiva**

  Clicar em "▶ Gerar Diagnóstico". Confirmar:
  - As seções desaparecem
  - O botão muda para "◌  Analisando..." e fica desabilitado
  - As seções reaparece em sequência com fade-in a cada ~700 ms
  - Após a última seção (Narrativa), o botão volta a "▶ Gerar Diagnóstico"

- [ ] **Step 5: Verificar responsividade do grid de sinais**

  Redimensionar a janela para < 780px e confirmar que os 4 cards de StatusSignal quebram corretamente (depende do Tailwind padrão — se necessário, adicionar `sm:grid-cols-2` ao grid).

- [ ] **Step 6: Commit final se tudo OK**

  ```bash
  git add -A
  git commit -m "feat(copiloto): complete Copiloto de Performance implementation"
  ```
