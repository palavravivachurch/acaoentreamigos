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

export default function ParticiparPage() {
    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
        aceitouLGPD: false,
    });
    const [loading, setLoading] = useState(false);
    const [pagamento, setPagamento] = useState<null | { qrCode: string }>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
            alert("Você precisa aceitar os termos da LGPD para continuar.");
            return;
        }

        setLoading(true);
        setPagamento(null);

        try {
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
                    Participar
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Preencha seus dados para receber as informações de contribuição.
                </Typography>

                <Box component="form" onSubmit={handleSubmit} mt={3}>
                    <TextField
                        fullWidth
                        label="Nome"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        margin="normal"
                        required
                        disabled={pagamento !== null}
                    />
                    <TextField
                        fullWidth
                        label="E-mail"
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
                        label="Telefone/Whatsapp"
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
                                fontSize: '0.8rem',
                                lineHeight: 0.9,
                            }
                        }}
                        label="Aceito os termos da LGPD, autorizando o uso e compartilhamento dos meus dados com instituições conforme previsto na legislação vigente."
                    />

                    <Box textAlign="center" mt={3}>
                        <Button
                            variant="contained"
                            size="large"
                            type="submit"
                            disabled={loading || pagamento !== null} sx={{
                            backgroundColor: '#c62828',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#b71c1c',
                            },
                        }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit"/> : "Enviar"}
                        </Button>
                    </Box>
                </Box>

                {pagamento && (
                    <Box mt={4} display="flex"
                         flexDirection="column"
                         alignItems="center"
                         textAlign="center">
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Dados para Contribuição
                        </Typography>
                        <Typography variant="h4">Valor: R$ 20</Typography>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>Chave Pix:</Typography>
                        <Typography>{pagamento.qrCode}</Typography>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>QR Code:</Typography>
                        <QRCode value={pagamento.qrCode} logoImage={'/logos/logoamoremacaopreta.png'}
                                size={300}
                                removeQrCodeBehindLogo
                                logoPaddingStyle='circle'
                                logoWidth={300 * 0.3}/>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => navigator.clipboard.writeText(pagamento.qrCode)}
                            sx={{mt: 1}}
                        >
                            Copiar Pix
                        </Button>
                        {/* Novo texto de validade */}
                        <Typography mt={2} color="text.secondary" fontWeight="bold">
                            Código válido por 2 horas.
                        </Typography>
                        <Typography mt={2} color="text.secondary" fontStyle="italic">
                            Após a confirmação do pagamento, seu número será enviado via WhatsApp e/ou e-mail.
                        </Typography>
                        {/* Botão para contato WhatsApp */}
                        <Button
                            variant="contained"
                            color="success"
                            sx={{mt: 2}}
                            // component={Link}
                            //@ts-ignore
                            href={`https://wa.me/554888038556?text=${encodeURIComponent(
                                'Olá, gostaria de fazer um pagamento em dinheiro. Podemos conversar?'
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Pagar em dinheiro? Fale conosco no WhatsApp
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}
