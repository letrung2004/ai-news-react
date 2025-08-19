import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { authService } from "../../services/authService";
import { tokenStorage } from "../../utils/storage";
import { extractAuthCode, handleApiError } from "../../utils/helpers";
import { useAuth } from "../../hooks/useAuth";


export default function Authenticate() {
    const hasProcessed = useRef(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (hasProcessed.current) return;
        hasProcessed.current = true;

        const authCode = extractAuthCode(window.location.href);
        if (!authCode) {
            navigate("/login?error=no_code");
            return;
        }

        const handleOAuthLogin = async () => {
            try {
                console.log("In authenticated")
                const res = await authService.loginWithOAuth(authCode);
                const token = res.result.token;

                if (!token) {
                    navigate("/login?error=oauth_failed");
                    return;
                }

                tokenStorage.saveToken(token);
                const user = await authService.getUserInfo();

                login(user.result, token);
                setIsLogin(true);
            } catch (err) {
                console.error("OAuth login error:", err);
                navigate(`/login?error=${encodeURIComponent(handleApiError(err))}`);
            }
        };

        handleOAuthLogin();
    }, [navigate, login]);

    useEffect(() => {
        if (isLogin) {
            const redirectTo = localStorage.getItem('redirectAfterOAuth') || '/';
            localStorage.removeItem('redirectAfterOAuth');
            navigate(redirectTo, { replace: true });
        }
    }, [isLogin, navigate]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <CircularProgress />
            <Typography>Đang xác thực từ Google...</Typography>
        </Box>
    );
}
