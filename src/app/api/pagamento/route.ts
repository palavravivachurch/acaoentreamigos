import { NextResponse } from "next/server";
import { PagamentoService } from "@/service/PagamentoService";

export async function POST(request: Request) {
  const body = await request.json();
  const { nome, email, telefone, aceitouLGPD } = body;
  console.log(body);
  const pagamento = await PagamentoService.createPagamento({
    email: email,
    nome: nome,
    telefone: telefone,
    aceitouLGPD: aceitouLGPD,
  });

  // Faça sua lógica aqui...
  return NextResponse.json({
    timestampCriacaoSolicitacao: "2021-11-11T14:34:31.24-03:00",
    estadoSolicitacao: "ATIVA",
    codigoConciliacaoSolicitante: "ogyevSKPZSj770FYgbf1Ub1GavxgOpvPKy9",
    numeroVersaoSolicitacaoPagamento: "0",
    linkQrCode:
      "qrcodepix-h.bb.com.br/pix/v2/38472887-c0e5-41db-b1c6-20cc3e6086e5",
    qrCode:
      "00020101021226870014br.gov.bcb.pix2565qrcodepix-h.bb.com.br/pix/v2/38472887-c0e5-41db-b1c6-20cc3e6086e55204000053039865802BR5925SECRETARIA DA RECEITA FED6008BRASILIA62070503***63043C35",
  });
}
