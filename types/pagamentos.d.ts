declare namespace Pagamentos {
    export interface BBCobrancaRequest {
        calendario?: {
            expiracao?: number; // tempo em segundos, padrão 86400 (24h)
        };
        devedor?: {
            cpf?: string;  // não usar com cnpj
            cnpj?: string; // não usar com cpf
            nome?: string; // se preenchido, cpf ou cnpj deve existir
        };
        loc?: {
            id: number; // id do location pré-reservado (opcional)
        };
        valor: {
            original: string; // valor original, formato "12.34"
            modalidadeAlteracao?: 0 | 1; // 0 (não altera) ou 1 (pode alterar)
            retirada?: {
                saque?: {
                    valor: string; // valor do saque, "0.00" para saque
                    modalidadeAlteracao?: 0 | 1;
                    modalidadeAgente?: "AGTEC" | "AGTOT" | "AGPSS";
                    prestadorDoServicoDeSaque?: string; // ISPB do agente
                };
                troco?: {
                    valor: string; // valor do troco, >0
                    modalidadeAlteracao?: 0 | 1;
                    modalidadeAgente?: "AGTEC" | "AGTOT" | "AGPSS";
                    prestadorDoServicoDeSaque?: string;
                };
            };
        };
        chave: string; // chave Pix do recebedor
        solicitacaoPagador?: string; // texto para pagador (max 140 chars)
        infoAdicionais?: {
            nome: string;
            valor: string;
        }[];
    }

    interface BBCobrancaResponse {
        calendario: {
            criacao: string;       // ex: "2025-08-11T12:34:56Z"
            expiracao: number;     // em segundos
        };
        txid: string;            // ID da transação (26-35 caracteres)
        revisao: number;         // número de revisão da cobrança
        loc: {
            id: number;            // ID do location
            location: string;      // URL do QR Code dinâmico
            tipoCob: string;       // tipo de cobrança (ex: "cob")
        };
        location: string;        // link direto para QR Code
        status: "ATIVA" | "CONCLUIDA" | "REMOVIDA_PELO_USUARIO_RECEBEDOR" | "REMOVIDA_PELO_PSP";
        devedor?: {
            cpf?: string;
            cnpj?: string;
            nome: string;
        };
        valor: {
            original: string;      // valor original ("20.00")
            modalidadeAlteracao?: number; // 0 = não altera, 1 = pode alterar
        };
        chave: string;           // chave Pix do recebedor
        solicitacaoPagador?: string; // mensagem para o pagador
        infoAdicionais?: {
            nome: string;
            valor: string;
        }[];
        pixCopiaECola?: string;  // código "copia e cola"
    }

    interface AbacatePIXRequest {
        "amount": number,
        "expiresIn": number,
        "description": string,
        "customer"?: {
            "name": string,
            "cellphone": string,
            "email": string,
            "taxId": string
        },
        "metadata": { "externalId": string }
    }

    interface AbacatePIXResponse {
        "data": {
            "id": string,
            "amount": number,
            "status": "PENDING" | "EXPIRED" | "CANCELLED" | "PAID" | "REFUNDED",
            "devMode": boolean,
            "brCode": string,
            "brCodeBase64": string,
            "platformFee": number,
            "createdAt": string,
            "updatedAt": string,
            "expiresAt": string
        },
        "error": null
    }
}