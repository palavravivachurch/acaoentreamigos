// util/cpfCnpj.ts
export function isValidCpfCnpj(value: string) {
    const clean = value.replace(/\D/g, ''); // remove tudo que não é número

    if (clean.length === 11) {
        // valida CPF
        let sum = 0;
        let remainder;

        if (/^(\d)\1+$/.test(clean)) return false; // todos iguais

        for (let i = 1; i <= 9; i++) sum += parseInt(clean.substring(i - 1, i)) * (11 - i);
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(clean.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) sum += parseInt(clean.substring(i - 1, i)) * (12 - i);
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(clean.substring(10, 11))) return false;

        return true;
    } else if (clean.length === 14) {
        // valida CNPJ
        if (/^(\d)\1+$/.test(clean)) return false; // todos iguais

        let length = clean.length - 2;
        let numbers = clean.substring(0, length);
        const digits = clean.substring(length);
        let sum = 0;
        let pos = length - 7;
        for (let i = length; i >= 1; i--) {
            sum += parseInt(numbers.charAt(length - i)) * pos--;
            if (pos < 2) pos = 9;
        }
        let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== parseInt(digits.charAt(0))) return false;

        length = length + 1;
        numbers = clean.substring(0, length);
        sum = 0;
        pos = length - 7;
        for (let i = length; i >= 1; i--) {
            sum += parseInt(numbers.charAt(length - i)) * pos--;
            if (pos < 2) pos = 9;
        }
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== parseInt(digits.charAt(1))) return false;

        return true;
    }

    return false;
}

// util/formatCpfCnpj.ts
export function formatCpfCnpj(value: string) {
    const digits = value.replace(/\D/g, '');

    if (digits.length <= 11) {
        // CPF
        return digits
            .replace(/^(\d{3})(\d)/, '$1.$2')
            .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1-$2')
            .slice(0, 14); // máximo com pontuação
    } else {
        // CNPJ
        return digits
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .slice(0, 18); // máximo com pontuação
    }
}

export function isValidCPF(cpf: string) {
    return /^\d{11}$/.test(cpf);
}

export function isValidCNPJ(cnpj: string) {
    return /^\d{14}$/.test(cnpj);
}
