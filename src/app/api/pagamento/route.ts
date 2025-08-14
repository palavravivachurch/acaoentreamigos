import {NextResponse} from "next/server";
import {PagamentoService} from "@/service/PagamentoService";

export async function POST(request: Request) {
    const body = await request.json();
    const {nome, email, telefone, aceitouLGPD, cpfCnpj} = body;
    const pagamento = await PagamentoService.createPagamento({
        email: email,
        nome: nome,
        telefone: telefone,
        aceitouLGPD: aceitouLGPD,
        cpfCnpj: cpfCnpj
    });

    // Faça sua lógica aqui...
    return NextResponse.json(pagamento);
}
