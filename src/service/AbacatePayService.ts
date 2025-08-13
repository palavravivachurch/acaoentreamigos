import AbacatePay from "abacatepay-nodejs-sdk";
import {
  CreatePixQrCodeData,
  IPixQrCode,
} from "abacatepay-nodejs-sdk/dist/types";

async function criarPixQRCode(pix: CreatePixQrCodeData): Promise<IPixQrCode> {
  // @ts-ignore
  let abacatePay = AbacatePay(process.env.ABACATE_KEY);

  const response = await abacatePay.pixQrCode.create(pix);

  if (response.error !== null) {
    throw new Error(response.error);
  }

  return response.data;
}

export const AbacatePayService = { criarPixQRCode };
