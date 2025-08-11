-- CreateEnum
CREATE TYPE "public"."PagamentoStatus" AS ENUM ('PENDENTE', 'CONFIRMADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "public"."SorteioStatus" AS ENUM ('AGUARDANDO', 'REALIZADO', 'CANCELADO');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Participante" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT,
    "aceitouLGPD" BOOLEAN NOT NULL,
    "numero" INTEGER,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pagamentoId" TEXT,

    CONSTRAINT "Participante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pagamento" (
    "id" TEXT NOT NULL,
    "participanteId" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "status" "public"."PagamentoStatus" NOT NULL DEFAULT 'PENDENTE',
    "metodo" TEXT NOT NULL,
    "qrCodePix" TEXT,
    "txid" TEXT,
    "confirmadoEm" TIMESTAMP(3),

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Numero" (
    "id" TEXT NOT NULL,
    "contador" INTEGER NOT NULL DEFAULT 0,
    "limite" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Numero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sorteio" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "dataSorteio" TIMESTAMP(3) NOT NULL,
    "status" "public"."SorteioStatus" NOT NULL DEFAULT 'AGUARDANDO',
    "numeroVencedor" INTEGER,

    CONSTRAINT "Sorteio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Participante_numero_key" ON "public"."Participante"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Participante_pagamentoId_key" ON "public"."Participante"("pagamentoId");

-- CreateIndex
CREATE UNIQUE INDEX "Pagamento_participanteId_key" ON "public"."Pagamento"("participanteId");

-- AddForeignKey
ALTER TABLE "public"."Participante" ADD CONSTRAINT "Participante_pagamentoId_fkey" FOREIGN KEY ("pagamentoId") REFERENCES "public"."Pagamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;
