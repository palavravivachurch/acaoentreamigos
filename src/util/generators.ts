import {maskCpfCnpj, maskEmail, maskPhone} from "@/util/mask";
import {Participante} from "@/generated/prisma";

function gerarTxid(): string {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 30; // entre 26 e 35, escolhi 30 pra garantir
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function gerarTxidComPrefixo(prefix = "TX"): string {
    const timestamp = Date.now().toString(36); // base36 pra ser curto e com letras+números
    const randomPart = gerarTxid().slice(
        0,
        30 - prefix.length - timestamp.length,
    );
    return prefix + timestamp + randomPart;
}

// Monta a description (curta, < 140 chars)
export const buildPixDescription = (participante: Participante) => {
        const parts = [
            "Amor em Ação – Ação entre amigos da Moto",
            `Nome: ${participante.nome}`,
            `Doc: ${participante.cpfCnpj !== "" ? maskCpfCnpj(participante.cpfCnpj || "") : ""}`
        ];

        if (participante.telefone) parts.push(`Tel: ${maskPhone(participante.telefone)}`);
        if (participante.email) parts.push(`Email: ${maskEmail(participante.email)}`);

        // Junta e corta com segurança (limite típico de 140 chars)
        let desc = parts.join(" | ");
        if (desc.length > 140) desc = desc.slice(0, 137) + "...";
        return desc;
    }
;
