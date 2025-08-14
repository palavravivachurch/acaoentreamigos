import {Participante} from "@/generated/prisma";
import {Constants} from "@/util/constants";
import {buildPixDescription} from "@/util/generators";
import {isValidCNPJ, isValidCPF} from "@/util/ssn";

const BB_API_BASE = process.env.BB_API_BASE; // homologação sem mTLS
const BB_APP_KEY = process.env.BB_APP_KEY!; // coloque no .env

async function getAccessToken() {
    const basicAuth = Buffer.from(`${process.env.BB_CLIENT_ID}:${process.env.BB_CLIENT_SECRET}`).toString("base64");

    const resp = await fetch(`${process.env.BB_OAUTH_URL}?grant_type=client_credentials&scope=cob.write`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    if (!resp.ok) {
        throw new Error(`Erro ao obter token: ${resp.status} ${await resp.text()}`);
    }

    const data = await resp.json();
    return data.access_token as string;
}// coloque no .env

async function cobrancaImediata(
    participante: Participante,
): Promise<Pagamentos.BBCobrancaResponse> {
    const token = await getAccessToken();

    const payload = {
        devedor: null,
        calendario: {expiracao: 7200},
        valor: {original: Constants.VALOR},
        chave: "00955233917",
        solicitacaoPagador: buildPixDescription(participante),
        infoAdicionais: [
            {nome: "Nome", valor: participante.nome},
            {nome: "Email", valor: participante.email},
            {nome: "Telefone", valor: participante.telefone},
        ],
    };


    if (participante.cpfCnpj) {
        const cleanDoc = participante.cpfCnpj.replace(/\D/g, ""); // remove pontos, traços e barras

        if (isValidCPF(cleanDoc)) {
            // @ts-ignore
            payload.devedor = {nome: participante.nome, cpf: cleanDoc};
        } else if (isValidCNPJ(cleanDoc)) {
            // @ts-ignore
            payload.devedor = {nome: participante.nome, cnpj: cleanDoc}
        }
    }

    const resp = await fetch(`${BB_API_BASE}?gw-dev-app-key=${BB_APP_KEY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    return await resp.json();
}

export const BBService = {cobrancaImediata};