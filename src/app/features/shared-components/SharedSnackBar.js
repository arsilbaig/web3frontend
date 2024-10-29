import { Alert, Snackbar } from "@mui/material";


const SharedSnackBar = ({ setSnackOpen, snackOpen, snackVarient, snackMessage }) => {

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false);
    };
    return (
        <Snackbar
            open={snackOpen}
            autoHideDuration={2000}
            onClose={handleCloseSnack}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            <Alert onClose={handleCloseSnack} variant="filled" severity={snackVarient}>
                {snackMessage}
            </Alert>
        </Snackbar>
    )
}

export default SharedSnackBar