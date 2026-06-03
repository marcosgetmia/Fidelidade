# Diagnóstico do Portfólio Atual de BI — Azul Fidelidade v0.1

Com base na análise das quatro levas de painéis mapeados, é possível fazer uma primeira leitura estruturada do portfólio atual de BI do Azul Fidelidade.

Os temas cobertos nas levas incluem:

- Performance Regional
- Azul Pelo Mundo / APM
- Campanhas B2B — performance geral
- Burn to Earn
- Liability
- Acúmulo Aéreo Diário / Retroclaim
- Daily Bookings / Jornadas e Pontos
- Clube Azul Fidelidade — tabelas detalhadas
- Cobranded / AIC
- Painel de Clientes
- Bancos Perfil Cliente
- Cálculo CPP

A leitura preliminar é clara: existe muita riqueza analítica, mas o portfólio atual está organizado mais por demanda, tema ou necessidade pontual do que por uma arquitetura única de gestão do Fidelidade.

## Principais problemas identificados

### 1. Sobreposição forte de conteúdo

Clientes, tiers, Clube, AIC, B2B, burn, earn e resgates aparecem em vários painéis com recortes semelhantes. A mesma métrica é apresentada com definições ou granularidades distintas dependendo do painel consultado.

### 2. Mistura de níveis decisórios no mesmo painel

Alguns painéis combinam visão executiva, gerencial, tática e transacional em uma mesma tela, sem hierarquia clara de informação. Isso dificulta tanto a leitura executiva quanto o uso operacional.

### 3. Painéis muito extensos

Há dashboards com muitas seções, tabelas, gráficos e filtros acumulados, o que prejudica a tomada de decisão rápida e aumenta o tempo de interpretação sem necessariamente agregar valor.

### 4. Excesso de filtros e baixa hierarquia visual

Muitos painéis iniciam com uma camada pesada de filtros antes de responder à pergunta principal de negócio. A hierarquia visual não favorece a leitura por prioridade.

### 5. Boas peças isoladas, mas sem arquitetura de portfólio

O painel executivo é um bom caminho; alguns guias de conceito também são positivos. O problema é que o conjunto ainda não opera como um sistema coeso — cada painel existe de forma independente, sem relação estruturada com os demais.

### 6. Governança de conceitos ainda dispersa

Existem guias para ciclo de vida, cadastros suspensos, conceitos de cliente e métricas, mas esses documentos precisam ser consolidados em um catálogo central oficial com definições únicas e rastreáveis.

### 7. Falta de separação clara entre cockpit, análise e operação

Daily Bookings, Burn to Earn, Liability, B2B, Clube e Cobranded têm elementos de acompanhamento estratégico misturados com elementos de troubleshooting no mesmo ecossistema, sem separação de público ou propósito.

## Organização proposta por domínio

A partir dos painéis analisados, o diagnóstico pode ser organizado em 9 domínios:

1. Executivo Fidelidade
2. Receita e Faturamento
3. B2B e Parceiros
4. Clientes, Tiers e Ciclo de Vida
5. Clube
6. AIC / Cobranded
7. Earn, Burn e Liability
8. Resgates / Daily Bookings / APM / Interline
9. Qualidade, Conceitos e Governança

## Próximo passo recomendado

Montar a matriz de racionalização dos painéis atuais, classificando cada um segundo os critérios:

| Critério           | Descrição                                                        |
| ------------------ | ---------------------------------------------------------------- |
| Manter             | Painel com escopo claro, público definido e métrica certificada  |
| Consolidar         | Painel redundante que pode ser absorvido por outro               |
| Redesenhar         | Painel com conteúdo válido, mas estrutura ou foco inadequados    |
| Arquivar           | Painel sem uso ativo ou substituído por outra solução            |
| Substituir         | Painel que deve ser reconstruído sobre nova arquitetura de dados |
| Certificar         | Painel prioritário que precisa de owner e governança formal      |
