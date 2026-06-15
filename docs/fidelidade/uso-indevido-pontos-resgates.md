# Uso Indevido de Pontos e Resgates — Conceito e Modelo de Detecção

> Domínio: **9 — Qualidade, Conceitos e Governança** (ver `principais-problemas-identificados.md`).
> Conecta-se diretamente aos motores **Earn** e **Burn** do modelo mestre (`desdobramento-estrategico.md`).

---

## 1. Definição

**Uso indevido** é o uso do programa Azul Fidelidade fora da sua finalidade de reconhecimento e relacionamento, com o objetivo de **monetização por terceiros** — ou seja, transformar pontos, passagens e benefícios do programa em lucro financeiro fora das regras.

O conceito guarda-chuva é a **comercialização**: a venda de pontos, passagens ou benefícios para quem não é o titular legítimo da relação com o programa.

A consequência econômica é dupla:

- **Destruição de margem no Burn** — resgates e benefícios desenhados como incentivo de relacionamento viram insumo de revenda.
- **Distorção do Earn e do passivo** — acúmulo artificial (buy points, transferências bonificadas) infla liability sem o relacionamento que justifica o reconhecimento.

---

## 2. A cadeia da negociação

Toda negociação indevida tem três funções. Uma mesma pessoa pode acumular funções, mas a separação é o que permite identificar o esquema:

| Função | Quem é | Papel na cadeia |
| ------ | ------ | --------------- |
| **Quem vende** | Contas que possuem pontos e os usam para emitir resgates **sem a presença do titular**, com características de negociação | Origem do estoque de pontos/passagens |
| **Quem negocia** | Contas e elementos (intermediários) que aproximam oferta e demanda | Elo de monetização — concentra os elementos de ligação |
| **Quem compra** | O viajante final, **não necessariamente participante do programa** | Demanda — paga abaixo do preço de mercado |

O **negociador** é o ator central: é nele que se concentram os elementos de ligação (cartão, IP, e-mail, telefone, fingerprint) que conectam contas vendedoras a compradores diversos.

---

## 3. Modelos econômicos de monetização

Por que vale a pena negociar? Há três modelos de lucro, todos baseados em obter o ativo abaixo do valor de mercado:

### Modelo 1 — Arbitragem para terceiros (pontos → dinheiro / passagem barata)
O negociador aproxima dois interesses:
- **(A)** quem quer transformar pontos em dinheiro;
- **(B)** quem quer comprar passagens ou produtos de viagem mais baratos.

O lucro vem de comprar o ponto abaixo do que vale para (A) e revender passagem/benefício a (B) — frequentemente usando incentivos do programa (ex.: 10% de desconto do cartão co-branded AIC) e ainda assim ficando abaixo do preço de mercado.

### Modelo 2 — Revenda de passagens e produtos de viagem
O negociador acumula pontos e benefícios pelos meios do programa, obtém produtos a custo baixo e os revende com margem — muitas vezes ainda abaixo do preço praticado pela própria companhia. **Há agências de viagens neste modelo**, que obtêm vantagens maiores que as de uma negociação direta com a empresa.

### Modelo 3 — Revenda de pontos
O negociante usa os meios do programa (Buy Points, transferências bonificadas de parceiros, promoções) para obter **volume de pontos a custo menor que o preço pago pelo mercado de negociação**. A combinação "compra de pontos em promoção no parceiro + transferência bonificada para o programa" potencializa a margem.

---

## 4. Perfis de conta

Perfis são **padrões reconhecíveis** que indicam participação na cadeia. Não são conclusões — são hipóteses a confirmar com os sinais da seção 5.

| Perfil | Definição operacional |
| ------ | --------------------- |
| **Seller** | Conta com resgate de pontos em que **o titular não está na reserva** e o cartão de crédito da taxa de embarque está na **whitelist** (liminar ou liberalidade negociada) |
| **Comercializador** | Identificado pelo resgate: emissões em **volume fora da normalidade** com **repetição de elementos de ligação** (cartão, IP, e-mail, telefone, fingerprint). É a porta de entrada para mapear quem vende, quem compra e quem negocia |
| **Milheiro** | Conta que **acumula muitos pontos e resgata muito sem a presença do titular** |

### Meios e estruturas usados na cadeia
- **Contas laranja** — contas de fachada para diluir volume e ocultar o real beneficiário.
- **Contas liberadas / em whitelist** — contas com restrições removidas (liminar ou liberalidade), usadas como canal "seguro".
- **Pool de contas e produtos de desconto** — ex.: cartão AIC (10% de desconto) usado como insumo de margem.
- **Demanda final** — usuários que querem dinheiro pelos pontos, ou passagens mais baratas.

---

## 5. Sinais determinantes (modelo de detecção)

Os comportamentos foram reorganizados por **dimensão analítica**, com a fonte de dados provável de cada um. Nenhum sinal isolado conclui uso indevido — o que caracteriza é a **convergência de sinais entre dimensões** e a **recorrência de elementos de ligação**.

### Dimensão A — Identidade e elementos de ligação (fingerprint)
A coluna vertebral da detecção. Repetição dos mesmos elementos em contas/reservas distintas:
- Mesmo **cartão de crédito** (taxa de embarque) recorrente em contas diferentes
- Mesmo **IP / e-mail / telefone / device fingerprint** entre contas ou reservas
- **Emissão de resgate para terceiros** através desses elementos identificados como envolvidos em comercialização

> Fonte: COMARCH (cadastro/transação), TAWS (resgate aéreo), APM (emissões interline).

### Dimensão B — Earn anômalo (acúmulo)
- **Alto volume de compra de pontos (Buy Points)**
- **Alto volume de transferência de pontos** de qualquer origem
- **Alto volume de transferência de parceiros que vendem pontos**
- **Participação incomum em campanhas** (quantidade fora do padrão)
- **Movimentação de pontos incomum** na conta

> Fonte: COMARCH (RM.CST_ACC_POINTS), bases de parceiros, campanhas B2B.

### Dimensão C — Burn anômalo (resgate)
- **Resgate de passagens para terceiros em grande volume, acima das margens estabelecidas**
- **Alta recorrência de obtenção de resgates aéreos**
- **Resgate em produtos não aéreos com alto volume e alta recorrência** (Pacotes de viagem, Varejo, Interline)
- Resgate **sem a presença do titular** na reserva

> Fonte: TAWS (precificação/itinerário), APM (interline), BRAVIUM (shopping/varejo).

### Dimensão D — Beneficiários
- **Grande volume de troca de beneficiários**
- **Troca de beneficiário imediatamente antes da emissão**

> Fonte: COMARCH / TRUSTED_CRM.

### Dimensão E — Exceções jurídicas e liberalidades
Não são prova de fraude, mas são **sinal de risco** e definem o tratamento (ver seção 6):
- Conta com **liminar para não restrição de beneficiários**
- Conta com **liminar para não restrição de uso do cartão de crédito**
- Conta em **whitelist por liberalidade negociada**

---

## 6. Tratamento de falsos positivos

Vários sinais têm explicações legítimas e precisam de regra explícita para não gerar acusação indevida:

- **Liminares e liberalidades** removem restrições por decisão judicial ou comercial — uma conta em whitelist **não pode ser bloqueada**, mas **deve ser monitorada** com peso maior nos demais sinais.
- **Famílias e empresas** legitimamente resgatam para terceiros e trocam beneficiários — o diferencial é o **volume**, a **recorrência** e a **convergência com elementos de ligação compartilhados**.
- **Clientes de alto valor** (Diamante, One) têm naturalmente alto volume — o critério não é volume absoluto, mas **desvio do padrão do próprio tier** combinado com sinais de comercialização.

Regra geral: **um sinal = monitorar; convergência de sinais + elementos de ligação repetidos = investigar.**

---

## 7. Produtos mais explorados

- **Buy Points**
- **Resgates aéreos**
- **Transferência de parceiros financeiros** (especialmente bonificadas)
- **Resgate Interline / APM** (passagens emitidas em outras companhias)

---

## 8. Perguntas de negócio que o modelo deve responder

1. Quais contas concentram **elementos de ligação compartilhados** com outras contas?
2. Quais contas têm **resgate sem presença do titular** acima do padrão do tier?
3. Quais contas combinam **Earn anômalo (buy/transfer) + Burn anômalo (resgate a terceiros)**?
4. Qual o **volume financeiro** estimado de margem destruída pela comercialização?
5. Quais contas em **whitelist/liminar** apresentam sinais de comercialização e exigem monitoramento dedicado?

---

## 9. Score de Risco de Comercialização (SRC)

O **SRC** é um score por conta (0–100) que combina as cinco dimensões da seção 5. Princípio de desenho: **nenhuma dimensão isolada conclui** — o score premia a **convergência** e usa os **elementos de ligação como confirmador**, refletindo a regra "um sinal = monitorar; convergência = investigar".

### 9.1 Sub-scores por dimensão
Cada dimensão gera um sub-score normalizado **0–1**, medido como **desvio em relação ao percentil do próprio tier** (não em valor absoluto — ver seção 6). Assim, o que é "anômalo" para um Topázio difere do que é anômalo para um Diamante.

| Dim. | Sinal | Peso | Papel |
| ---- | ----- | ---- | ----- |
| **A** | Elementos de ligação compartilhados (cartão/IP/e-mail/telefone/fingerprint) | **0,30** | Confirmador — backbone |
| **C** | Burn anômalo (resgate a terceiros / sem titular / não aéreo recorrente) | **0,25** | Monetização efetiva |
| **B** | Earn anômalo (buy points / transferências / campanhas) | **0,20** | Formação de estoque |
| **D** | Troca de beneficiários (volume / pré-emissão) | **0,15** | Operação da emissão |
| **E** | Exceções jurídicas (liminar / whitelist) | **0,10** | Sinal de risco — **não bloqueia** |

### 9.2 Fórmula

```
SRC_base = 100 × (0,30·sA + 0,25·sC + 0,20·sB + 0,15·sD + 0,10·sE)

SRC = SRC_base × fator_convergência

fator_convergência:
  1 dimensão acima do limiar      → 0,85   (atenua sinal solto)
  2 dimensões acima do limiar     → 1,00
  3+ dimensões acima do limiar    → 1,20   (teto em 100)
```

**Gate de ligação (Dim. A):** se a conta compartilha elementos com **N ou mais** contas/reservas distintas, ela sobe automaticamente para a faixa "investigar", independentemente do SRC base — é o sinal mais forte de cadeia organizada. (`N` a calibrar; ponto de partida sugerido: 3.)

### 9.3 Faixas de ação

| SRC | Classificação | Ação |
| --- | ------------- | ---- |
| 0–30 | Normal | Sem ação |
| 30–60 | Atenção | **Monitorar** — dossiê automático |
| 60–80 | Suspeito | **Investigar** — fila operacional |
| 80–100 | Crítico | **Investigar prioritário** — candidato a suspensão (ver seção 10) |

> Pesos, limiares e `N` são **pontos de partida para calibração** com a área de negócio/risco, não valores definitivos. A calibração deve usar uma base rotulada de casos já confirmados.

---

## 10. Cadastros suspensos e ciclo de vida da conta

O SRC é o **diagnóstico**; o **cadastro suspenso** é o **desfecho operacional**. Este conceito conecta-se ao guia de *ciclo de vida* e *cadastros suspensos* que o diagnóstico de governança já aponta como pendente de consolidação no catálogo central (`principais-problemas-identificados.md`, item 6).

### Estados do ciclo de vida (proposta)

```
Ativo → Em monitoramento → Em investigação → Suspenso → { Reabilitado | Encerrado }
```

| Estado | Gatilho | Efeito |
| ------ | ------- | ------ |
| **Em monitoramento** | SRC 30–60 | Dossiê acompanhado, sem restrição ao cliente |
| **Em investigação** | SRC 60+ ou gate de ligação | Entra na fila operacional; pode ter resgates retidos para análise |
| **Suspenso** | Investigação confirma comercialização | Restrição de resgate/transferência conforme regulamento |
| **Reabilitado** | Investigação não confirma | Volta a Ativo, com histórico preservado |
| **Encerrado** | Confirmação + reincidência | Encerramento conforme regulamento |

### Tratamento das contas com liminar / whitelist (Dim. E)
Contas em whitelist **não podem ser suspensas** por decisão judicial/comercial. Para elas, o desfecho não é suspensão e sim **monitoramento dedicado**: dossiê permanente, peso maior nas demais dimensões e acompanhamento jurídico. O SRC continua sendo calculado — serve de evidência caso a liminar seja revista.

---

## 11. Métricas de impacto financeiro

Quantificam **quanto a comercialização custa ao programa**, usando os conceitos econômicos já mapeados (custo marginal, transfer price, CPP, breakage, liability).

| Métrica | O que mede | Fórmula conceitual | Fonte |
| ------- | ---------- | ------------------ | ----- |
| **Custo marginal sob suspeita** | Custo dos resgates classificados como comercialização | Σ custo marginal dos resgates de contas com SRC ≥ limiar | TAWS / TPAPP.TB_MARGINALSEATCOST |
| **Liability artificial** | Passivo gerado por Earn sem relacionamento legítimo | Σ pontos de buy/transfer em contas suspeitas × CPP | COMARCH / catálogo CPP |
| **Breakage perdido** | Receita de expiração que deixa de ocorrer porque o ponto é resgatado via cadeia | Σ pontos suspeitos que seriam expirados × valor de breakage | Modelo de breakage |
| **Receita direta deslocada** | Canibalização — passagens que seriam vendidas por dinheiro e viram resgate comercializado | Σ (valor de mercado − custo do resgate) das emissões suspeitas a terceiros | TAWS (ITINERARY_PRICE) |
| **Desconto capturado indevidamente** | Benefício de incentivo (ex.: 10% AIC) usado como insumo de margem do negociador | Σ descontos aplicados em emissões classificadas como comercialização | AIC.TBCP_AIC |

**Indicadores de gestão (rollup para painel operacional):**
- Estoque de pontos sob suspeita (volume e % do passivo total)
- Nº de contas por faixa de SRC e por perfil (Seller / Comercializador / Milheiro)
- Custo marginal + receita deslocada evitáveis no período
- Nº de contas suspensas / reabilitadas / em monitoramento por liminar

> Estas métricas devem entrar no **Catálogo Corporativo de Métricas** (nome executivo, fórmula, owner, fonte, frequência) antes de virarem painel.

---

## 12. Próximos passos sugeridos

1. **Catalogar cada sinal** como métrica oficial (nome, definição, fórmula, fonte, owner) no Catálogo Corporativo de Métricas.
2. Definir **thresholds por tier** para cada sinal de volume/recorrência.
3. Construir o **grafo de elementos de ligação** (cartão / IP / e-mail / telefone / fingerprint) ligando contas e reservas.
4. **Calibrar o SRC** (seção 9) com uma base rotulada de casos confirmados: ajustar pesos, limiares por tier e o `N` do gate de ligação.
5. Formalizar os **estados de ciclo de vida / cadastro suspenso** (seção 10) no catálogo de conceitos.
6. Posicionar o resultado como painel **operacional** (domínio 9), com fila de investigação e os indicadores de impacto financeiro (seção 11) — não como painel executivo.
