# Plano de Transformacao da Area de BI - Azul Fidelidade

## Objetivo

Transformar a area de BI de uma operacao reativa de atendimento sob demanda para uma funcao de inteligencia de negocio orientada ao Fidelidade, responsavel por traduzir estrategia, operacao e resultado em indicadores, paineis e analises confiaveis para tomada de decisao.

O objetivo nao e produzir mais BI. O objetivo e tornar o BI um mecanismo de direcionamento do negocio Fidelidade.

## Diagnostico inicial

O contexto informado aponta um modelo atual com sintomas classicos de operacao orientada a solicitacoes:

- paineis construidos a partir da demanda e nao da estrategia
- excesso de redundancia entre BI's
- inflacao de conteudo e baixo foco por publico
- baixa padronizacao de metricas e regras
- risco de numeros diferentes para a mesma pergunta
- cobertura desigual entre produtos, segmentos e processos do negocio
- baixa governanca de ciclo de vida dos paineis

## Norte estrategico

### Missao da area de BI

Ser a referencia de inteligencia gerencial da unidade Azul Fidelidade, provendo indicadores, narrativas e instrumentos de acompanhamento que suportem crescimento de receita, eficiencia operacional, gestao economica do passivo e excelencia na experiencia dos clientes de maior valor.

### Principios de desenho

- Fidelidade e o centro. O BI deve responder ao negocio, nao a vaidade de dashboard.
- Cada painel deve ter dono, publico, decisao e objetivo definidos.
- Uma metrica deve ter uma unica definicao oficial.
- A granularidade correta depende do nivel decisorio.
- O minimo necessario de informacao e melhor que o excesso irrelevante.
- Toda visao executiva deve estar sustentada por camadas taticas e operacionais coerentes.
- O DW deve ser a fonte estruturante da verdade de negocio.

## Modelo alvo de arquitetura de BI

### Camada 1 - Estrategia e governanca

Definir o mapa de negocio do Fidelidade como estrutura principal de acompanhamento. A area de BI deixa de organizar paineis por pedido e passa a organizar por dominios de valor.

Dominios prioritarios:

- Receita B2B
- Receita B2C
- Resgates e burn
- Passivo e contabilizacao economica
- Cliente, tiers e relacionamento
- Precificacao, custo marginal e rentabilidade
- Campanhas, performance comercial e conversao
- Operacao critica e qualidade de servico dos produtos

### Camada 2 - DW e metricas oficiais

Criar uma camada estruturada de DW de Fidelidade com tabelas e marts orientados ao negocio.

Marts prioritarios sugeridos:

- mart_receita_fidelidade
- mart_b2b_parceiros
- mart_b2c_produtos
- mart_clientes_tiers
- mart_earn_burn
- mart_liability
- mart_breakage
- mart_resgates_aereos
- mart_resgates_nao_aereos
- mart_precificacao_transfer_price
- mart_forecast_meta

Cada mart deve nascer com:

- definicao funcional
- fonte origem
- regra de negocio oficial
- periodicidade
- granularidade
- owner de negocio
- owner tecnico

### Camada 3 - Portifolio de paineis por nivel decisorio

#### Nivel executivo

Poucos paineis, alta consolidacao, foco em decisao e desvio relevante.

Conteudo esperado:

- receita total e por alavanca
- earn, burn e spread
- passivo, breakage e reconhecimento
- clientes ativos e mix por tier
- desempenho dos produtos-chave
- forecast versus meta
- riscos e alertas executivos

#### Nivel gerencial

Visao por produto, canal, parceiro, segmento, safra e desempenho operacional.

Conteudo esperado:

- B2B por parceiro, campanha, canal e produto
- B2C por produto, oferta, conversao e receita
- resgate por tipo, custo, volume e perfil
- cohorts de clientes e movimentacao entre tiers
- performance de campanhas e funil
- acompanhamento de metas por area responsavel

#### Nivel tatico

Foco em monitoramento continuo, diagnostico e gestao do plano de acao.

Conteudo esperado:

- quebras por dia, semana e safra
- gargalos por processo
- detalhamento de estornos, cancelamentos e inconsistencias
- alertas de qualidade operacional e financeira
- trilhas de conciliacao

#### Nivel operacional

Suporte a execucao, troubleshooting e controle.

Conteudo esperado:

- logs de processamento
- filas, falhas, atrasos de carga
- conciliacao por transacao
- detalhamento de PNR, pontos, pedidos e eventos

## Balanced Scorecard adaptado ao Fidelidade

O plano pode usar uma estrutura proxima a Balanced Scorecard, desde que simplificada e aplicada ao negocio.

### Perspectiva financeira

- receita total Fidelidade
- receita B2B
- receita B2C
- receita por produto
- forecast versus realizado
- breakage realizado e provisionado
- passivo total e variacao
- custo de resgate
- margem economica por produto, quando aplicavel

### Perspectiva cliente

- base total e base ativa
- distribuicao por tier
- clientes de alto valor
- ativacao e retencao por produto
- migracao entre tiers
- adesao ao Clube
- penetração AIC
- uso de resgates por perfil

### Perspectiva processos internos

- SLA de atualizacao dos paineis
- taxa de falha de carga
- tempo medio de resolucao de incidentes
- aderencia de regras de negocio
- reconciliacao entre fontes e paineis
- duplicidade de ativos de BI

### Perspectiva aprendizado e governanca

- cobertura de dominios criticos do negocio
- percentual de metricas oficializadas
- percentual de paineis com owner definido
- percentual de paineis com monitoramento ativo
- indice de uso efetivo dos paineis principais

## KPIs e metricas prioritarias

### Pilar 1 - Receita

- receita total Fidelidade
- receita B2B por parceiro e campanha
- receita B2C por produto
- receita por canal
- pontos vendidos
- ticket medio
- clientes compradores
- conversao por oferta

### Pilar 2 - Cliente

- base cadastrada
- base ativa 30, 90 e 365 dias
- mix por tier
- clientes high value
- adesao, cancelamento e churn de Clube
- aderencia ao co-branded
- transferencia de pontos de bancos

### Pilar 3 - Earn, burn e passivo

- pontos acumulados
- pontos resgatados
- relacao earn/burn
- saldo de pontos
- liability acumulo
- liability resgate
- breakage provisionado e realizado
- aging de pontos

### Pilar 4 - Resgates

- resgates aereos Azul
- resgates APM
- resgates Shopping
- resgates de assento, bagagem e tarifa congelada
- custo por tipo de resgate
- mix por microsegmento
- cancelamentos e estornos

### Pilar 5 - Rentabilidade e precificacao

- transfer price
- custo marginal
- custo por booking
- valor de ponto utilizado
- spread economico entre custo e valor percebido
- aderencia a pisos economicos

## Racionalizacao do portifolio atual de BI

O portifolio atual com mais de 50 BI's deve passar por uma limpeza estruturada.

Classificacao sugerida para cada painel existente:

- Manter
- Consolidar
- Redesenhar
- Arquivar
- Substituir por camada analitica ou relatorio operacional

Criticos de decisao para cada painel:

- qual decisao ele suporta
- quem usa de fato
- qual metrica oficial ele carrega
- se existe duplicidade
- se a atualizacao e confiavel
- se o nivel de detalhe e adequado ao publico
- se possui owner de negocio e owner tecnico

## Governanca de metricas e regras

Criar um catalogo oficial de metricas com:

- nome executivo
- nome tecnico
- definicao
- formula
- granularidade
- filtros validos
- excecoes e exclusoes
- fonte oficial
- owner de negocio
- owner tecnico

Regras essenciais:

- nenhuma metrica critica sem definicao oficial
- nenhuma metrica critica com mais de uma regra em paineis distintos
- todo painel deve apontar para a mesma camada certificada

## Qualidade e monitoramento

Criar uma esteira de confiabilidade para os BI's prioritarios.

Controles minimos:

- monitoramento de carga e SLA
- teste de reconciliacao com fonte origem
- teste de consistencia entre paineis
- alerta para quebra de volumetria
- alerta para atraso de refresh
- revisao periodica de uso e aderencia

## Priorizacao de execucao

### Onda 1 - Fundacao

Prioridade maxima para o que sustenta o negocio e a confiabilidade.

- inventario de BI's e classificacao
- definicao da arquitetura de dominios do Fidelidade
- escolha das metricas executivas oficiais
- definicao de owners
- desenho do DW de Fidelidade por marts
- saneamento do painel executivo
- definicao do glossario de metricas

### Onda 2 - Consolidacao gerencial

- padronizacao dos paineis gerenciais por dominio
- consolidacao de receita B2B e B2C
- consolidacao de earn, burn e liability
- painel de clientes e tiers
- trilhas de monitoramento e data quality

### Onda 3 - Expansao tatico-operacional

- paineis taticos por produto e processo
- camadas operacionais de suporte
- automacao de controles
- revisao de backlog analitico sob nova governanca

## Roadmap inicial de 90 dias

### 0 a 30 dias

- fechar mapa de dominios do Fidelidade
- inventariar todos os paineis e classificar redundancias
- escolher o conjunto minimo de KPIs executivos e gerenciais
- definir owners e rito de governanca
- desenhar arquitetura-alvo do DW

### 31 a 60 dias

- oficializar glossario de metricas
- certificar primeiras tabelas/marts
- redesenhar painel executivo
- consolidar primeira onda de paineis gerenciais prioritarios
- implantar monitoramento basico de qualidade

### 61 a 90 dias

- retirar ou consolidar paineis redundantes
- expandir cobertura para cliente, resgate e passivo
- estabelecer comite recorrente de metricas e BI
- implantar scorecard de uso, confiabilidade e impacto do portifolio

## Estrutura de governanca recomendada

- Forum executivo mensal de Fidelidade e performance
- Forum gerencial quinzenal de metricas e desvios
- Forum semanal tecnico de dados, carga, qualidade e backlog
- Processo formal para criacao, alteracao e desativacao de BI

## Resultado esperado

Ao fim da transformacao, a area de BI deve operar como uma funcao estruturante do negocio Fidelidade, com:

- menos paineis e mais clareza
- metricas unicas e comparaveis
- confiabilidade operacional
- foco em decisao por nivel hierarquico
- cobertura dos produtos e motores do negocio
- sustentacao por DW e regras oficiais

## Proximos desdobramentos do plano

Este documento e um esboco inicial. Os proximos artefatos a derivar dele devem ser:

- inventario e matriz de racionalizacao dos BI's atuais
- mapa de KPIs por dominio
- catalogo oficial de metricas
- desenho do DW de Fidelidade
- modelo de governanca de paineis e qualidade