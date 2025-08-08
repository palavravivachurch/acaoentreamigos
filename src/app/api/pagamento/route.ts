import type {NextApiRequest, NextApiResponse} from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({error: "Método não permitido"});
    }

    const {nome, email, telefone} = req.body;

    // Aqui poderia integrar com sua API real
    // Simulação de resposta:
    res.status(200).json({
        pix: "pix@amoremacao.org",
        valor: "50,00",
        descricao: `Contribuição - ${nome}`,
    });
}
