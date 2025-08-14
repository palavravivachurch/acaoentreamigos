interface ToE164Options {
    defaultCountry?: string;
    countryCodeOverride?: string;
}

export function toE164(input: string | null | undefined, opts: ToE164Options = {}): string | null {
    if (input == null) return null;
    const {defaultCountry = 'BR', countryCodeOverride} = opts;

    // mapa mínimo de DDI (adicione mais se precisar)
    const CC: Record<string, string> = {
        BR: '55',
        US: '1',
        CA: '1',
        PT: '351',
        AR: '54',
        CL: '56',
        MX: '52',
        CO: '57',
        PE: '51',
        ES: '34',
        DE: '49',
        FR: '33',
        UK: '44', // GB/UK
        IT: '39',
        IN: '91'
    };

    let s = String(input).trim();

    // normaliza: mantém + se vier no início, remove o resto de não-dígitos
    if (s.startsWith('+')) {
        s = '+' + s.slice(1).replace(/\D+/g, '');
    } else {
        // troca "00" internacional por '+'
        s = s.replace(/\D+/g, '');
        if (s.startsWith('00')) s = '+' + s.slice(2);
    }

    // Se já tem '+', validamos e retornamos
    if (s.startsWith('+')) {
        const digits = s.slice(1);
        if (digits.length < 8 || digits.length > 15) return null;
        return '+' + digits;
    }

    // Aqui não tem '+' => é número nacional; remove zeros à esquerda (trunk)
    s = s.replace(/^0+/, '');

    // escolhe código do país
    const cc =
        (countryCodeOverride && countryCodeOverride.replace(/\D/g, '')) ||
        CC[defaultCountry.toUpperCase()];
    if (!cc) throw new Error(`Código de país desconhecido para ${defaultCountry}`);

    const candidate = `+${cc}${s}`;

    // valida tamanho E.164
    const digits = candidate.slice(1);
    if (digits.length < 8 || digits.length > 15) return null;

    return candidate;
}

type TelefoneInfo = {
    ddi: string;
    ddd: string;
    telefone: string;
    telefoneFormatado: string;
};

const DDI_MAP: Record<string, string> = {
    "1": "EUA/Canadá",
    "44": "Reino Unido",
    "49": "Alemanha",
    "55": "Brasil",
    // Você pode adicionar mais DDIs aqui
};

export function parseTelefone(numero: string): TelefoneInfo {
    const numeros = numero.replace(/\D/g, "");

    let ddi = "";
    let ddd = "";
    let telefone = "";

    // Detecta o DDI correto usando a lista de DDIs
    for (let i = 1; i <= 3; i++) {
        const possivelDDI = numeros.slice(0, i);
        if (DDI_MAP[possivelDDI]) {
            ddi = possivelDDI;
            break;
        }
    }

    if (!ddi) {
        throw new Error(`DDI não identificado no número: ${numero}`);
    }

    // Aqui ajusta o tamanho do DDD — padrão Brasil 2 dígitos, outros pode variar
    // Exemplo: Brasil = 2 dígitos DDD, EUA = 3 dígitos area code
    if (ddi === "1") {
        // EUA/Canadá → código de área 3 dígitos
        ddd = numeros.slice(ddi.length, ddi.length + 3);
        telefone = numeros.slice(ddi.length + 3);
    } else {
        // Demais → código de área 2 dígitos
        ddd = numeros.slice(ddi.length, ddi.length + 2);
        telefone = numeros.slice(ddi.length + 2);
    }

    const telefoneFormatado = `(${ddd}) ${telefone}`;

    return {ddi, ddd, telefone, telefoneFormatado};
}
