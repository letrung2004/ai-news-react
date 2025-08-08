import { Box, CircularProgress, Typography } from "@mui/material";

export default function Unauthorized() {
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
            <Typography>Bạn không có quyền truy cập vào trang này</Typography>
        </Box>
    );
};