"use client";

import Head from "next/head";
import '../globals.css';
import '../page.module.css';
import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Link as MuiLink,
    MenuItem,
    Select,
    Toolbar,
    Typography
} from "@mui/material";
import {useLocale, useTranslations} from "next-intl";
import {Globe} from "lucide-react";
import {motion} from "framer-motion";
import MenuIcon from '@mui/icons-material/Menu';
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";


export default function AcaoEntreAmigosPage() {
    const t = useTranslations("home");
    const router = useRouter();
    const locale = useLocale();
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <>
            <Head>
                <title>{t("title")} | {t("subtitle")}</title>
                <meta name="description" content={t("mission")}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
                <meta property="og:title" content={t("title")}/>
                <meta property="og:description" content={t("mission")}/>
                <meta property="og:image" content="/logos/amoremacao.png"/>
                <meta property="og:type" content="website"/>
                <meta property="og:locale" content={locale === "pt" ? "pt_BR" : "es_ES"}/>
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={t("title")}/>
                <meta name="twitter:description" content={t("mission")}/>
                <meta name="twitter:image" content="/logos/amoremacao.png"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            {/* Navbar */}
            <AppBar position="static" color="transparent" elevation={0} id='appbar'>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{display: {sm: 'none'}}}>
                            <MenuIcon/>
                        </IconButton>
                        <Image src="/logos/logoacaoentreamigos.png" alt="Logo Amor em Ação" width={40} height={40}/>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Globe/>
                        <Select
                            value={locale}
                            onChange={(e) => {
                                const newLocale = e.target.value;
                                window.location.href = `/${newLocale}`;
                            }}
                            size="small"
                            variant="outlined"
                            style={{
                                backgroundColor: '#fff',
                                color: '#001d3d',
                                borderRadius: 8,
                            }}
                        >
                            <MenuItem value="pt">PT-BR</MenuItem>
                            <MenuItem value="es">ES</MenuItem>
                        </Select>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Conteúdo */}
            <Container maxWidth="md" sx={{
                minHeight: "100vh",
                py: 6,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                <motion.div
                    initial={{opacity: 0, y: 40}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                >
                    {/*Logo central (pode ser logo da ação)*/}
                    {/*<Box textAlign="center" mb={4}>*/}
                    {/*    <Image src="/logos/logoacaoentreamigos.png" width={200} height={200} alt="Logo Amor em Ação"/>*/}
                    {/*</Box>*/}

                    <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
                        {t("title")}
                    </Typography>
                    <Typography variant="h5" align="center" color="error" gutterBottom>
                        {/* subtítulo vermelho */}
                        {t("subtitle")}
                    </Typography>
                    <Typography variant="body1" align="center" paragraph>
                        {t("mission")}
                    </Typography>

                    {/* Prêmio e foto da moto */}
                    <Box textAlign="center" mb={6}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {t("prize")}
                        </Typography>
                        <Box
                            component="img"
                            src="/images/prize/hondacg125fan.jpg"
                            alt="Moto Honda CG"
                            sx={{
                                display: "block",   // para o margin funcionar corretamente
                                mx: "auto",        // centraliza horizontalmente
                                maxWidth: "100%",
                                height: "auto",
                                borderRadius: 2,
                                boxShadow: 3,
                                mt: 1,
                            }}
                        />
                    </Box>

                    <Box textAlign="center" mt={4}>
                        <Button variant="contained" size="large" sx={{
                            px: {xs: 3, sm: 4, md: 6},         // padding horizontal: menor no celular, maior no desktop
                            py: {xs: 1.5, sm: 2, md: 2.5},     // padding vertical ajustado conforme tela
                            fontSize: {xs: '2rem', sm: '3rem', md: '3rem'}, // fonte cresce com o tamanho da tela
                            minWidth: {xs: 180, sm: 200, md: 260},           // largura mínima também responsiva
                            borderRadius: 3,
                        }} onClick={() => router.push('/participar')}>
                            {t("cta")}
                        </Button>
                    </Box>

                    {/* Sobre a instituição com logo clicável */}
                    <Box mt={8} display="flex" flexDirection={{xs: "column", sm: "row"}} alignItems="center" gap={4}
                         justifyContent="center">
                        <MuiLink
                            href="https://www.instagram.com/amoremacaopv"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{display: "inline-block", cursor: "pointer", maxWidth: 160}}
                        >
                            <Image
                                src="/logos/logoamoremacaopreta.png"
                                alt="Logo Amor em Ação"
                                width={160}
                                height={160}
                                style={{borderRadius: "12px", objectFit: "contain"}}
                            />
                        </MuiLink>

                        <Box maxWidth={600}>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {t("aboutTitle")}
                            </Typography>
                            <Typography variant="body1">
                                {t("aboutDescription")}
                            </Typography>
                        </Box>
                    </Box>
                </motion.div>

                {/* Rodapé */}
                <Box mt={6} textAlign="center">
                    <Typography variant="caption">
                        Desenvolvido com ❤️ por <a href='https://gbl.dev.br'>Gabriel Saldanha</a> – Projeto ELO
                        © {year || ""}
                    </Typography>
                </Box>
            </Container>
        </>
    );
}
