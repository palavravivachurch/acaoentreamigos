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

// ---------------- EXEMPLOS ----------------
const samples: string[] = [
    '(11) 99876-5432',      // BR local
    '0 11 98765 4321',      // BR com zero tronco
    '+55 (48) 99999-0000',  // já em internacional
    '0044 20 7946 0018',    // "00" -> UK
    '21 9 8888-7777',       // BR sem DDI/DDD leading zeros
    '+1 (415) 555-2671',    // US ok
    '351 912 345 678'       // PT sem '+'
];

for (const n of samples) {
    console.log(n, '=>', toE164(n)); // default BR
}
console.log('PT override =>', toE164('48912 345 678', {defaultCountry: 'PT'}));
console.log('US override =>', toE164('(415) 555-2671', {defaultCountry: 'US'}));
