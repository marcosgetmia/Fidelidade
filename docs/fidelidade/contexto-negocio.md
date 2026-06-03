# Contexto de Negocio - Azul Fidelidade

## Papel da unidade

Azul Fidelidade e a unidade de negocios responsavel pelo programa de vantagens da Azul Linhas Aereas.

O Fidelidade deve ser tratado como negocio, e nao como uma operacao de BI. O BI existe para traduzir estrategia, operacao, performance e alavancas de resultado da unidade, sempre com foco no que move receita, caixa, reconhecimento de clientes de alto valor e eficiencia operacional.

## Tese economica central

O programa de fidelidade combina reconhecimento de clientes de alto valor com uma dinamica financeira de geracao antecipada de caixa. Parte relevante do caixa entra no momento do acumulo de pontos e da comercializacao de produtos do ecossistema, enquanto a prestacao economica e o reconhecimento de parte da receita acontecem posteriormente, no resgate ou na expiracao.

Essa dinamica torna centrais os temas de:

- earn e burn
- liability de acumulo e de resgate
- saldo de passivo
- breakage
- forecast
- coerencia entre receita, pontos, custo e reconhecimento contabil

## Base de clientes e tiers

- Mais de 20 milhoes de clientes cadastrados
- Tiers atuais informados:
- Azul Fidelidade (cadastro basico)
- Azul Topazio
- Azul Safira
- Azul Diamante
- Azul Diamante Unique
- Azul One

## Produtos e frentes de negocio

### B2C

- Buy Points
- Renew
- Transfer
- Clube
- MGM

### B2B

- AIC (cartao co-branded em parceria com Itau)
- Campanhas com parceiros, bancos e varejo

### Resgate

- Passagens aereas
- Espaco Azul
- Bagagem
- Azul Pelo Mundo (APM)
- Shopping
- Tarifa congelada

## Bancos de dados principais

### COMARCH

Sistema principal de loyalty, com cadastro de clientes, contas, saldo, extrato, pontos e transacoes.

Exemplos identificados em metadata:

- RM.CST_ACCOUNTS
- RM.CST_ACC_POINTS

### AIC

Base recebida do Itau com informacoes sobre clientes do cartao co-branded.

Exemplos identificados em metadata:

- AIC.TBCP_AIC

### APM

Base de passagens emitidas com pontos em outras companhias.

Exemplos identificados em metadata:

- APM.PNR
- APM.FLIGHT
- APM.PASSENGER_POINTS
- APM.PASSENGER_POINTS_PLUS_MONEY

### BRAVIUM

Base do shopping.

Exemplos identificados em metadata:

- SHOPPING.TB_TAZUL_ORDER
- SHOPPING.TB_TAZUL_ITEM_ORDER
- SHOPPING.TB_TAZUL_PARTICIPANT

### TAWS

Camada de precificacao e integracao de resgate aereo com o ecossistema de reservas.

Exemplos identificados em metadata:

- DBO.ITINERARY_PRICE
- DBO.ITINERARY_PRICE_DETAIL
- DBO.ITINERARY_PRICE_POINTS
- DBO.PRICING_RULE

### TRUSTED_CRM

Camada consolidada de negocio para fidelidade, com tratamento e aplicacao de regras.

Exemplos identificados em metadata:

- DBO.CADASTRAL
- DBO.TRANSACIONAL

### TRUSTED_FIDELIDADE

Camada analtica ligada a custo marginal, transfer price, regras de valor e sustentacao de precificacao economica do resgate.

Exemplos identificados em metadata:

- TPAPP.TRANSFER_NAVITARE
- TPAPP.TB_TP_LEG
- TPAPP.TB_MARGINALSEATCOST

## Relatorios e termos criticos do negocio

- Liability acumulo
- Liability resgate
- Saldo do passivo
- Faturas
- Breakage
- Aging
- Forecast
- Highlights

## BI's citados como relevantes

- Painel executivo de receitas
- Gerencial faturamento B2B
- Gerencial faturamento B2C
- Perfil clientes
- Campanhas B2B
- Burn earn
- Daily bookings

## Premissas para BI de Fidelidade

- O core do BI deve ser o negocio Fidelidade
- Cada painel deve servir a uma decisao clara
- O dado deve ser consistente entre paineis
- Regras de negocio devem ser unicas e rastreaveis
- Redundancias devem ser reduzidas de forma ativa
- O nivel de detalhe deve variar por publico e objetivo