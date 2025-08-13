import {ParticipanteRepository} from "@/db/ParticipanteRepository";
import {PagamentoRepository} from "@/db/PagamentoRepository";
import {AbacatePayService} from "@/service/AbacatePayService";
import {PagamentoStatus, Participante} from "@/generated/prisma";
import {AsaasPayService} from "@/service/AsaasPayService";
import {formattedDueDateTomorrow} from "@/util/date";

export interface ParticipanteCreated {
    email: string;
    nome: string;
    telefone: string;
    aceitouLGPD: boolean;
}

async function createPagamento(participante: ParticipanteCreated) {
    const participanteCreated =
        await ParticipanteRepository.addParticipante(participante);
    const asaasPIXResponse = await createPagamentoAsaas(participanteCreated);
    // const abacatePIXResponse = await createPagamentoAbacate(participanteCreated);

    const pagamentoCreated = await PagamentoRepository.addPagamento({
        participanteId: participanteCreated.id,
        metodo: "PIX",
        status: PagamentoStatus.PENDENTE,
        valor: 20.0,
        confirmadoEm: null,
        id: "",
        qrCodePix: asaasPIXResponse.nossoNumero || "",
        txid: asaasPIXResponse.id || "",
    });

    return {qrCode: pagamentoCreated.qrCodePix};
}

async function createPagamentoAbacate(participante: Participante) {
    return await AbacatePayService.criarPixQRCode({
        amount: 2000, // R$20.00
        expiresIn: 7200,
        description: participante.nome + participante.id,
        // "metadata": {"externalId": participanteCreated.id}
    });
}

async function createPagamentoAsaas(participante: Participante) {
    return await AsaasPayService.criarPixQRCode({
        billingType: "PIX",
        customer: "cus_000006930852",
        dueDate: formattedDueDateTomorrow(),
        value: 20.0,
        description: participante.nome + participante.id,
        externalReference: participante.id,
    });
}

async function checkWhatsapp(numero: string): Promise<boolean> {
    const res = await fetch(`/api/whatsapp?zap=${numero}`, {
        headers: {'Cache-Control': 'no-cache'},
        method: 'GET'
    });
    return await res.json() as boolean;
}

export const PagamentoService = {createPagamento, checkWhatsapp};
