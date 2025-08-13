import {AsaasClient, IAsaasPayment, IAsaasPaymentResponse} from "asaas";


async function criarPixQRCode(
    pix: IAsaasPayment,
): Promise<IAsaasPaymentResponse> {
    // @ts-ignore
    const apiKey = `$${process.env.ASAAS_API_KEY}`;
    let asaas = new AsaasClient(apiKey);
    if (process.env.ASAAS_API_TEST) {
        asaas = new AsaasClient(apiKey, {sandbox: true});
    }

    const response = await asaas.payments.new(pix);
    // @ts-ignore
    const qrCode = await asaas.payments.getPixQrCode(response.id);

    response.nossoNumero = qrCode.payload;
    // @ts-ignore
    return response;
}

export const AsaasPayService = {criarPixQRCode};
