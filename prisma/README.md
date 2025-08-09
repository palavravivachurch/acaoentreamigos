Tá na boa, Saldanha! Vou simplificar o esquema, tirando o model `Numero` e levando o número direto pro `Participante`
como campo único. No `Sorteio`, vai ter um campo pra número vencedor (um int, que referencia o número do participante
vencedor).

Segue a versão enxuta e alinhada com essa ideia:

---

# 📄 README — Banco de Dados "Ação Entre Amigos" (versão simplificada)

## Visão geral

Banco simplificado para o sistema de **Ação Entre Amigos** com sorteios, pagamentos e números únicos diretamente no
participante.

---

## Models

### 1. User

| Campo        | Tipo     | Descrição          |
|--------------|----------|--------------------|
| id           | String   | PK, UUID ou cuid() |
| nome         | String   | Nome completo      |
| email        | String   | Email único        |
| senha        | String   | Hash da senha      |
| criadoEm     | DateTime | Data de criação    |
| atualizadoEm | DateTime | Última atualização |

---

### 2. Participante

| Campo       | Tipo     | Descrição                                   |
|-------------|----------|---------------------------------------------|
| id          | String   | PK, cuid()                                  |
| nome        | String   | Nome do participante                        |
| telefone    | String   | Telefone de contato                         |
| email       | String?  | Email opcional do participante              |
| aceitouLGPD | Boolean  | Se o participante aceitou os termos da LGPD |
| numero      | Int      | Número único do participante (único)        |
| pagamentoId | String   | FK para Pagamento                           |
| criadoEm    | DateTime | Data de cadastro                            |

---

### 3. Pagamento

| Campo          | Tipo      | Descrição                                  |
|----------------|-----------|--------------------------------------------|
| id             | String    | PK, cuid()                                 |
| participanteId | String    | FK para Participante                       |
| valor          | Float     | Valor pago                                 |
| status         | Enum      | Status do pagamento (PENDENTE, CONFIRMADO) |
| metodo         | String    | Forma de pagamento (ex: cartão, boleto)    |
| confirmadoEm   | DateTime? | Quando foi confirmado (null se pendente)   |

---

### 4. Sorteio

| Campo               | Tipo                                                   | Descrição                          |
|---------------------|--------------------------------------------------------|------------------------------------|
| id                  | String                                                 | PK, cuid()                         |
| titulo              | String                                                 | Nome ou título do sorteio          |
| descricao           | String?                                                | Detalhes opcionais                 |
| dataSorteio         | DateTime                                               | Data marcada para o sorteio        |
| status              | Enum                                                   | (AGUARDANDO, REALIZADO, CANCELADO) |
| numeroVencedor Int? | Número vencedor (correspondente a participante.numero) |                                    |

---

## Fluxo principal

1. Participante realiza pagamento (status PENDENTE).
2. Ao confirmar pagamento, o sistema gera e atribui um número único ao participante.
3. No sorteio, um número vencedor é escolhido e armazenado no campo `numeroVencedor` do sorteio.
