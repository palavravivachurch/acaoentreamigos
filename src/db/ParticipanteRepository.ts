import {Participante, PrismaClient} from "@/generated/prisma";
import {ParticipanteCreated} from "@/service/PagamentoService";

const prisma = new PrismaClient();

async function addParticipante(participante: ParticipanteCreated): Promise<Participante> {
    let newVar = await prisma.participante.create({
            data: {
                nome: participante.nome,
                email: participante.email,
                telefone: participante.telefone,
                aceitouLGPD: participante.aceitouLGPD,
            },
        })
    ;
    return newVar;
}

export const ParticipanteRepository = {
    async addParticipante(participante: ParticipanteCreated) {
        return addParticipante(participante);
    },
    async getParticipante(id: string) {
        return prisma.participante.findUnique({
            where: {
                id: id,
            },
        });
    },
}
