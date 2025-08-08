"use client";

import {useState} from "react";
import {Box, Button, CircularProgress, Container, Paper, TextField, Typography,} from "@mui/material";

export default function ParticiparPage() {
    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
    });
    const [loading, setLoading] = useState(false);
    const [pagamento, setPagamento] = useState<null | any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
                    />
                    <TextField
                        fullWidth
                        label="Telefone"
                        name="telefone"
                        value={form.telefone}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <Box textAlign="center" mt={3}>
                        <Button
                            variant="contained"
                            size="large"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit"/> : "Enviar"}
                        </Button>
                    </Box>
                </Box>

                {pagamento && (
                    <Box mt={4}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Dados para Contribuição
                        </Typography>
                        <Typography>Chave Pix: {pagamento.pix}</Typography>
                        <Typography>Valor: R$ {pagamento.valor}</Typography>
                        <Typography>Descrição: {pagamento.descricao}</Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}
