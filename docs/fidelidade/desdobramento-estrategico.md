Este documento descreve uma transformação que vai muito além de BI. Na prática, o objetivo é construir uma **função de Inteligência de Negócio do Azul Fidelidade**, e não uma fábrica de dashboards.

Essa diferença é fundamental.

O maior risco em programas como esse é começar pelo Power BI, pelos indicadores ou pelo DW. Na realidade, a ordem correta é:

**Estratégia → Gestão → Métricas → Dados → BI**

e não o contrário.

Pelo contexto mapeado do Fidelidade, existe uma premissa que precisa virar praticamente um mantra da área: **"Nenhum dashboard existe por si só. Todo dashboard deve existir para suportar uma decisão de negócio."** 

---

# Ajustes no plano

O esboço já está correto estruturalmente, mas vale adicionar uma camada anterior.

Estrutura atual considerada:

1. DW
2. KPIs
3. Dashboards
4. Governança

Proposta ajustada:

1. Modelo Estratégico do Fidelidade
2. Arquitetura de Gestão
3. KPIs
4. DW
5. Dashboards
6. Governança

---

# A visão alvo

O objetivo da área não deve ser:

> "Produzir BI"

O objetivo deve ser:

> "Garantir que cada líder do Fidelidade saiba exatamente onde atuar para melhorar resultado."

Isso muda tudo.

---

# O Modelo Mestre do Fidelidade

Antes de falar de painéis, precisamos definir:

## Quais são os motores do negócio?

Pela estrutura atual do Fidelidade, são identificados 7 motores principais:

### 1. Base de Clientes

Responsável por:

* aquisição
* ativação
* retenção
* evolução de tiers

Pergunta executiva:

> Estamos aumentando a base que gera valor?

---

### 2. Earn

Responsável por:

* acúmulo
* venda de pontos
* geração de passivo

Pergunta:

> Estamos gerando receita futura suficiente?

---

### 3. Burn

Responsável por:

* resgates
* experiência
* consumo do passivo

Pergunta:

> Estamos entregando valor ao cliente sem destruir margem?

---

### 4. Clube

Responsável por:

* recorrência
* previsibilidade de caixa

Pergunta:

> Estamos aumentando receita recorrente?

---

### 5. AIC

Responsável por:

* aquisição de clientes de alto valor
* earn recorrente

Pergunta:

> O cartão está expandindo a relevância do programa?

---

### 6. B2B

Responsável por:

* parceiros
* campanhas
* bancos

Pergunta:

> Os parceiros estão crescendo e gerando receita?

---

### 7. Economia do Programa

Responsável por:

* liability
* breakage
* transfer price
* custo marginal

Pergunta:

> O Fidelidade está economicamente saudável?

---

# O que deveria existir acima dos dashboards

Atualmente, provavelmente existem 50+ painéis.

Na empresa ideal existe primeiro:

## Mapa Estratégico

Exemplo:

| Objetivo                  | KPI                |
| ------------------------- | ------------------ |
| Crescer receita           | Receita Fidelidade |
| Crescer clientes valiosos | Clientes Safira+   |
| Melhorar retenção         | Churn Clube        |
| Melhorar utilização       | Burn Rate          |
| Controlar passivo         | Liability          |
| Melhorar rentabilidade    | Margem econômica   |

Se o KPI não está ligado a um objetivo estratégico:

**esse KPI não deveria existir.**

---

# Novo modelo de BI

Os BI's podem ser divididos em quatro camadas.

---

## Camada 1 — Executive Scorecard

5 a 10 páginas no máximo.

Consumidor:

* Diretor
* VP
* C-Level

Perguntas:

* Estamos ganhando?
* Estamos perdendo?
* Onde agir?

Indicadores:

* Receita
* Forecast
* Meta
* Liability
* Breakage
* Earn
* Burn
* Base ativa
* Clube
* AIC

Nada além disso.

---

## Camada 2 — Gestão de Domínio

Um painel por domínio estratégico.

Exemplo:

### Receita B2C

### Receita B2B

### Clube

### AIC

### Clientes e Tiers

### Burn

### Liability

### Resgates

### Precificação

Esses são os verdadeiros painéis gerenciais.

---

## Camada 3 — Operação

Coordenadores.

Perguntas:

* O que está quebrando?
* O que caiu?
* Onde agir?

---

## Camada 4 — Observabilidade

Painéis de dados.

Consumidor:

* BI
* Engenharia

Perguntas:

* A carga executou?
* A regra mudou?
* O número fechou?

---

# O problema mais grave identificado hoje

Não é DW.

Não é Power BI.

Não é governança.

É a ausência de um modelo oficial de métricas.

É necessário criar:

# Catálogo Corporativo de Métricas do Fidelidade

Toda métrica deve possuir:

* Nome executivo
* Nome técnico
* Definição
* Fórmula
* Owner de negócio
* Fonte
* Frequência
* Uso permitido
* Exceções

Exemplo:

---

Receita Fidelidade

Definição:

Receita total reconhecida pelo Fidelidade.

Owner:

Financeiro Fidelidade

Fonte:

DW Fidelidade

Fórmula:

Σ receita reconhecida

Granularidade:

Dia

---

Quando isso existir, acaba a discussão:

> "Mas neste BI aparece diferente."

---

# O DW deveria ser desenhado em torno do negócio

O conceito de marts orientados a domínio é bastante aderente. 

Mas é recomendável ir além.

O DW principal deveria ter como backbone:

### Fato Cliente

### Fato Earn

### Fato Burn

### Fato Receita

### Fato Liability

### Fato Produto

### Fato Parceiro

### Fato Resgate

E não em torno dos sistemas.

A visão de negócio não se organiza por:

* COMARCH
* APM
* TAWS

A visão de negócio se concentra em:

* cliente
* receita
* resgate
* passivo

---

# Como executar a transformação

## Fase 1 — Descoberta (30 dias)

Objetivo:

Entender o caos atual.

Entregáveis:

* Inventário completo dos 50+ BI's
* Owners
* Usuários
* Frequência de uso
* Duplicidades
* Métricas utilizadas

Resultado:

Mapa de redundância.

---

## Fase 2 — Modelo Estratégico (30 dias)

Objetivo:

Definir como o Fidelidade será gerido.

Entregáveis:

* Árvore de KPIs
* Scorecard executivo
* Domínios
* Métricas oficiais

Resultado:

Manual de gestão do Fidelidade.

---

## Fase 3 — Fundação de Dados (60 dias)

Objetivo:

Construir a verdade única.

Entregáveis:

* DW Fidelidade
* Marts
* Catálogo de métricas
* Monitoramento

Resultado:

Single Source of Truth.

---

## Fase 4 — Racionalização (90 dias)

Objetivo:

Eliminar desperdício.

Entregáveis:

* Consolidação dos BI's
* Desativação dos redundantes
* Certificação dos oficiais

Meta agressiva:

Sair de 50+ painéis para algo entre:

* 1 executivo
* 8 a 12 gerenciais
* 15 a 20 operacionais

Todo o restante vira legado ou é aposentado.

---

# Maior diferencial para o Azul Fidelidade

Nesta transformação, recomenda-se posicionar um objetivo acima de todos os outros:

> "Transformar o BI em um cockpit do negócio Fidelidade."

Ou seja:

Ao consultar o painel executivo, a diretoria do Fidelidade deve conseguir responder imediatamente:

* Como está a receita?
* Como está o passivo?
* Como está o burn?
* Como está o Clube?
* Como está o AIC?
* Como estão os clientes de alto valor?
* Qual alavanca precisa de ação agora?

Se o painel não ajuda a responder uma dessas perguntas, provavelmente não deveria estar na camada executiva.

O contexto já mapeado sobre a natureza econômica do Fidelidade — earn, burn, liability, breakage, clientes de alto valor, produtos B2B/B2C e rentabilidade do programa — deve continuar sendo o eixo central de toda a arquitetura futura.  


