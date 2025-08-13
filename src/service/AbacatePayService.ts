async function criarPixQRCode(pix: Pagamentos.AbacatePIXRequest): Promise<Pagamentos.AbacatePIXResponse> {
    const url = process.env.ABACATE_API + '/pixQrCode/create';

    const options: RequestInit = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + process.env.ABACATE_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pix),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar QR Code');
    }

    return await response.json()
}

export const AbacatePayService = {criarPixQRCode};