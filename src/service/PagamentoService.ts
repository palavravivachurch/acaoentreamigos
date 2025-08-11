import {$Enums} from "@/generated/prisma";
import {ParticipanteRepository} from "@/db/ParticipanteRepository";
import {PagamentoRepository} from "@/db/PagamentoRepository";
import PagamentoStatus = $Enums.PagamentoStatus;

export interface ParticipanteCreated {
    email: string,
    nome: string,
    telefone: string,
    aceitouLGPD: boolean,
}

async function createPagamento(participante: ParticipanteCreated) {
    console.log(participante);
    const participanteCreated = await ParticipanteRepository.addParticipante(participante);
    const pagamentoCreated = await PagamentoRepository.addPagamento({
        participanteId: participanteCreated.id,
        metodo: 'PIX',
        status: PagamentoStatus.PENDENTE,
        valor: 20.0,
        confirmadoEm: null,
        id: "",
        qrCodePix: ""
    });
}

export const PagamentoService = {createPagamento};