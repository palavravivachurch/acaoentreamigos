import {AsaasClient, IAsaasPaymentResponse} from "asaas";
import {Participante} from "@/generated/prisma";
import {formattedDueDateTomorrow} from "@/util/date";

const VALOR_PIX = 20.0;
const TIPO_COBRANCA = "PIX";

async function criarPixQRCode(
    participante: Participante,
): Promise<IAsaasPaymentResponse> {
    // @ts-ignore
    const apiKey = `$${process.env.ASAAS_API_KEY}`;
    let asaas = new AsaasClient(apiKey);
    if (Boolean(process.env.ASAAS_API_TEST)) {
        asaas = new AsaasClient(apiKey, {sandbox: true});
    }
    let customerResponse = {id: "cus_000130283386"};
    if (participante.cpfCnpj) {
        const customerList = await asaas.customers.list({cpfCnpj: participante.cpfCnpj, limit: 1});
        if (customerList?.data[0]?.id) {
            customerResponse = customerList.data[0];
        } else {
            customerResponse = await asaas.customers.new({
                cpfCnpj: participante.cpfCnpj,
                email: participante.email || "",
                name: participante.nome,
                mobilePhone: participante.telefone
            });
        }
    }

    const response = await asaas.payments.new(({
        billingType: TIPO_COBRANCA,
        customer: customerResponse.id,
        dueDate: formattedDueDateTomorrow(),
        value: VALOR_PIX,
        description: participante.nome + participante.id,
        externalReference: participante.id,
    }));
    // @ts-ignore
    const qrCode = await asaas.payments.getPixQrCode(response.id);

    response.nossoNumero = qrCode.payload;
    // @ts-ignore
    return response;
}

export const AsaasPayService = {criarPixQRCode};
