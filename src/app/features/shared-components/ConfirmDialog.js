import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    IconButton,
    Container,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SharedSnackBar from './SharedSnackBar';


const ConfirmDialog = ({ open, onClose, handleConfirm, dialogText }) => {
    const [snackOpen, setSnackOpen] = useState(false)
    const [snackMessage, setSnackMessage] = useState("")
    const [snackVarient, setSnackVarient] = useState("")

    const [isDisabled, setIsDisabled] = useState(false)

    const handleSubmit = () => {
        setIsDisabled(true)
        handleConfirm()
        setSnackMessage("Title Deleted Successfullt")
        setSnackVarient("success")
        setSnackOpen(true)
        setTimeout(() => {
            onClose()
            setIsDisabled(false)
        }, 1000)
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="md"
                fullWidth
            >
                <Container maxWidth={false} className='p-10'>
                    <DialogTitle>
                        Confirmation
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={onClose}
                            aria-label="close"
                            style={{ position: 'absolute', right: 35, top: 8 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        {dialogText}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="error">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={isDisabled} variant='contained' color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Container>

            </Dialog>

            <SharedSnackBar
                setSnackOpen={setSnackOpen}
                snackOpen={snackOpen}
                snackVarient={snackVarient}
                snackMessage={snackMessage}
            />
        </>
    );
};

export default ConfirmDialog;
