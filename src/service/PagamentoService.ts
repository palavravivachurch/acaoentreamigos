import {ParticipanteRepository} from "@/db/ParticipanteRepository";
import {PagamentoRepository} from "@/db/PagamentoRepository";
import {AbacatePayService} from "@/service/AbacatePayService";
import {PagamentoStatus} from "@/generated/prisma";

export interface ParticipanteCreated {
    email: string;
    nome: string;
    telefone: string;
    aceitouLGPD: boolean;
}

async function createPagamento(participante: ParticipanteCreated) {
    const participanteCreated =
        await ParticipanteRepository.addParticipante(participante);
    const abacatePIXResponse = await AbacatePayService.criarPixQRCode({
        "amount": 2000,
        "expiresIn": 7200,
        "description": participanteCreated.nome + participanteCreated.id,
        "metadata": {"externalId": participanteCreated.id}
    });

    const pagamentoCreated = await PagamentoRepository.addPagamento({
        participanteId: participanteCreated.id,
        metodo: "PIX",
        status: PagamentoStatus.PENDENTE,
        valor: 20.0,
        confirmadoEm: null,
        id: "",
        qrCodePix: abacatePIXResponse.data.brCode,
        txid: abacatePIXResponse.data.id,
    });

    return {qrCode: pagamentoCreated.qrCodePix};
}

export const PagamentoService = {createPagamento};
