function gerarTxid(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 30; // entre 26 e 35, escolhi 30 pra garantir
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function gerarTxidComPrefixo(prefix = 'TX'): string {
    const timestamp = Date.now().toString(36); // base36 pra ser curto e com letras+números
    const randomPart = gerarTxid().slice(0, 30 - prefix.length - timestamp.length);
    return prefix + timestamp + randomPart;
}
