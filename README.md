# 🎯 Ação Entre Amigos – Plataforma de Sorteios Solidários

Plataforma web para gerenciar campanhas de **Ação Entre Amigos**, com controle de participantes, cotas, pagamentos e
sorteios.

Construído com:

* ⚡ **Next.js** – Frontend e Backend integrados
* 🗄 **Prisma** – ORM para banco de dados
* 🐘 **PostgreSQL** – Banco de dados relacional
* 🔐 **Auth.js** – Autenticação
* 💳 **Integração de Pagamentos** – (ex.: PIX / Stripe / Mercado Pago)
* 🎨 **Tailwind CSS** – Estilização rápida e responsiva

---

## 📸 Demonstração

![Preview](./public/preview.png)

---

## 🚀 Funcionalidades

### ✅ Já implementadas

* Cadastro de participantes
* Gestão de números/cotas
* Controle de pagamentos via BB API PIX, Asaas e AbacatePAY

### ⏳ Em desenvolvimento / Planejadas

* Notificações automáticas por e-mail/WhatsApp via n8n
* Sorteio automático (sistema interno)
* Painel administrativo completo
* Prestação de contas e transparência

---

## 📦 Tecnologias

* **Frontend/Backend:** [Next.js](https://nextjs.org/)
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Autenticação:** [Auth.js](https://authjs.dev/)
* **Pagamentos:** PIX / Stripe / Mercado Pago (configurável)
    * [PIX BB](https://www.bb.com.br/site/developers/bb-como-servico/api-pix)
    * [Pagar.ME](https://docs.pagar.me/reference/visão-geral-sobre-pagamento)
    * [Mercado Pago](https://www.mercadopago.com.br/developers/pt/reference)
    * [ASAAS](https://docs.asaas.com)
    * [AbacatePAY](https://www.abacatepay.com)

---

## Documentação do Banco de Dados

Para detalhes completos sobre o modelo do banco de dados, entidades, relacionamentos e esquema Prisma, acesse a
documentação dedicada:

📂 [prisma/README.md — Documentação do Banco de Dados](./prisma/README.md)
*Neste arquivo você encontra o esquema atualizado, descrição de cada model, enumerações e fluxo de dados do sistema.*

---

## ⚙️ Instalação e Uso

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/acao-entre-amigos.git
cd acao-entre-amigos
```

### 2️⃣ Instalar dependências

```bash
npm install
# ou
yarn
# ou
pnpm install
```

### 3️⃣ Rodar em desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.
O projeto usa [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para otimização
automática de fontes.

---

## 📖 Referências e aprendizado

* [Next.js Documentation](https://nextjs.org/docs)
* [Learn Next.js](https://nextjs.org/learn)
* [Next.js GitHub repository](https://github.com/vercel/next.js)

---

## ☁️ Deploy

A forma mais fácil de deploy é
pelo [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

Consulte [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) para
detalhes.