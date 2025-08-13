"use client";

import {useState} from "react";
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import {QRCode} from "react-qrcode-logo";
import {PagamentoService} from "@/service/PagamentoService";
import {toE164} from "@/util/phone";
import {useLocale, useTranslations} from "next-intl";

export default function ParticiparPage() {
    const locale = useLocale(); // 👈 pega o locale atual
    const t = useTranslations("participar"); // 👈 namespace das traduções
    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
        aceitouLGPD: false,
    });
    const [loading, setLoading] = useState(false);
    const [pagamento, setPagamento] = useState<null | { qrCode: string }>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        // @ts-ignore
        const {name, value, type, checked} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.aceitouLGPD) {
            alert(t("alertLgpd"));
            return;
        }

        setLoading(true);
        setPagamento(null);

        try {
            let numero = toE164(form.telefone, {defaultCountry: 'BR'});
            // @ts-ignore
            form.telefone = numero
            // @ts-ignore
            let isWpChecked = await PagamentoService.checkWhatsapp(numero);
            if (!isWpChecked) {
                alert(t("alertWhatsappInvalido"));
                return;
            }

            const res = await fetch("/api/pagamento", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Erro ao gerar pagamento");

            const data = await res.json();
            setPagamento(data);
        } catch (error) {
            console.error(error);
            alert("Ocorreu um erro, tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{py: 6}}>
            <Paper sx={{p: 4, boxShadow: 3}}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {t("titulo")}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t("descricao")}
                </Typography>

                <Box component="form" onSubmit={handleSubmit} mt={3}>
                    <TextField
                        fullWidth
                        label={t("nome")}
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        margin="normal"
                        required
                        disabled={pagamento !== null}
                    />
                    <TextField
                        fullWidth
                        label={t("email")}
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                        disabled={pagamento !== null}
                    />
                    <TextField
                        fullWidth
                        label={t("telefone")}
                        name="telefone"
                        value={form.telefone}
                        onChange={handleChange}
                        margin="normal"
                        required
                        disabled={pagamento !== null}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form.aceitouLGPD}
                                onChange={handleChange}
                                name="aceitouLGPD"
                                color="primary"
                                required
                            />
                        }
                        disabled={pagamento !== null}
                        sx={{
                            "& .MuiFormControlLabel-label": {
                                fontSize: "0.8rem",
                                lineHeight: 0.9,
                            },
                        }}
                        label={t("lgpd")}
                    />

                    <Box textAlign="center" mt={3}>
                        <Button
                            variant="contained"
                            size="large"
                            type="submit"
                            disabled={loading || pagamento !== null}
                            sx={{
                                backgroundColor: "#c62828",
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: "#b71c1c",
                                },
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit"/>
                            ) : (
                                t("botaoEnviar")
                            )}
                        </Button>
                    </Box>
                </Box>

                {pagamento && (
                    <Box
                        mt={4}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        textAlign="center"
                    >
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {t("dadosPagamentoTitulo")}
                        </Typography>
                        <Typography variant="h4">Valor: R$ 20</Typography>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {t("chavePix")}:
                        </Typography>
                        <Typography sx={{
                            overflowWrap: 'break-word',
                            maxWidth: {
                                xs: '90vw',   // celular: até 90% da largura da viewport
                                sm: 400,      // tablets: 400px
                                md: 500,      // desktop médio: 500px
                                lg: 600,      // desktop maior: 600px
                            }, // limita a largura máxima em px, ajuste conforme precisar
                            whiteSpace: 'normal',
                            wordBreak: 'break-all', // quebra até no meio da palavra se precisar
                        }}>{pagamento.qrCode}</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => navigator.clipboard.writeText(pagamento.qrCode)}
                            sx={{mt: 1}}
                        >
                            {t("copiarPix")}
                        </Button>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            QR Code:
                        </Typography>
                        <QRCode
                            value={pagamento.qrCode}
                            logoImage={"/logos/logoamoremacaopreta.png"}
                            size={300}
                            removeQrCodeBehindLogo
                            logoPaddingStyle="circle"
                            logoWidth={300 * 0.3}
                        />
                        {/* Novo texto de validade */}
                        <Typography mt={2} color="text.secondary" fontWeight="bold">
                            {t("validade")}
                        </Typography>
                        <Typography mt={2} color="text.secondary" fontStyle="italic">
                            {t("aposPagamento")}
                        </Typography>
                        {/* Botão para contato WhatsApp */}
                        <Button
                            variant="contained"
                            color="success"
                            sx={{mt: 2}}
                            // component={Link}
                            //@ts-ignore
                            href={`https://wa.me/554888038556?text=${encodeURIComponent(
                                "Olá, gostaria de fazer um pagamento em dinheiro. Podemos conversar?",
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t("pagarDinheiro")}
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}
