// Helpers de máscara
export const maskCpfCnpj = (doc: string) => {
    const d = (doc || "").replace(/\D/g, "");
    if (d.length <= 11) return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    return d.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
};
export const maskPhone = (p?: string) => (p ? p.replace(/\D/g, "").replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "($2) $3-$4") : "");
export const maskEmail = (e?: string) => {
    if (!e) return "";
    const [u, d] = e.split("@");
    const mid = u.length > 2 ? u[0] + "*".repeat(Math.max(1, u.length - 2)) + u[u.length - 1] : u[0] + "*";
    return `${mid}@${d}`;
};