import { Pagamento, PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

async function addPagamento(pagamento: Pagamento) {
  let newVar = await prisma.pagamento.create({
    data: {
      participanteId: pagamento.participanteId,
      metodo: pagamento.metodo,
      status: pagamento.status,
      valor: pagamento.valor,
      confirmadoEm: pagamento.confirmadoEm,
      qrCodePix: pagamento.qrCodePix,
    },
  });
  return newVar;
}

export const PagamentoRepository = {
  addPagamento,
};
