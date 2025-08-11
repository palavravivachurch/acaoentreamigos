const BB_API_BASE = process.env.BB_API_BASE; // homologação sem mTLS
const BB_APP_KEY = process.env.BB_APP_KEY!; // coloque no .env
const BB_TOKEN = process.env.BB_TOKEN!;     // coloque no .env

async function cobrancaImediata(cobranca: Pagamentos.BBCobrancaRequest): Promise<Pagamentos.BBCobrancaResponse> {
    const body = {
        calendario: {
            expiracao: 3600 // 1 hora
        },
        devedor: {
            cpf: cobranca.devedor?.cpf || undefined,
            nome: cobranca.devedor?.nome || undefined
        },
        valor: {
            original: cobranca.valor.original,
            modalidadeAlteracao: 0
        },
        chave: cobranca.chave,
        solicitacaoPagador: "Pagamento via Pix"
    };

    const response = await fetch(`${BB_API_BASE}/cob/${gerarTxidComPrefixo()}?gw-dev-app-key=${BB_APP_KEY}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${BB_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const text = await response.text();
        console.error('Erro ao chamar API do BB Pix:', text);
        throw new Error('Erro ao chamar API do BB Pix: ' + text);
    }

    return await response.json()
}
