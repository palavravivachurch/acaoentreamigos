import {AsaasClient, IAsaasPayment, IAsaasPaymentResponse} from "asaas";


async function criarPixQRCode(
    pix: IAsaasPayment,
): Promise<IAsaasPaymentResponse> {
    // @ts-ignore
    let apiKey = `$${process.env.ASAAS_API_KEY}`;
    const asaas = new AsaasClient(apiKey, {
        sandbox: Boolean(process.env.ASAAS_API_TEST),
    });

    const response = await asaas.payments.new(pix);
    // @ts-ignore
    const qrCode = await asaas.payments.getPixQrCode(response.id);

    response.nossoNumero = qrCode.payload;
    // @ts-ignore
    return response;
}

export const AsaasPayService = {criarPixQRCode};
