import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    IconButton,
    Container,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SharedSnackBar from '../../shared-components/SharedSnackBar';
import { useDispatch } from 'react-redux';
import { createTitle, getAllTitles } from '../../../store/slice/TitleSlice';

const AddTitleDialig = ({ open, onClose }) => {
    const [title, setTitle] = useState('');

    const [snackOpen, setSnackOpen] = useState(false)
    const [snackMessage, setSnackMessage] = useState("")
    const [snackVarient, setSnackVarient] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)


    const dispatch = useDispatch()

    const handleSubmit = () => {
        setIsDisabled(true)
        if (!title.trim()) {
            setSnackMessage("Title is Required")
            setSnackVarient("error")
            setSnackOpen(true);
            return;
        } else {
            let body = {
                title: title,
                token: sessionStorage.getItem('token')
            }
            dispatch(createTitle(body)).unwrap().then((res) => {
                setSnackMessage("Title Created Successfully")
                setSnackVarient("success")
                setSnackOpen(true);
                dispatch(getAllTitles({ token: sessionStorage.getItem('token') }))
                setTimeout(() => {
                    onClose();
                    setTitle('');
                    setIsDisabled(false)
                }, 1000)
            }).catch((error) => {
                setSnackMessage("Unable Create Title.")
                setSnackVarient("error")
                setSnackOpen(true);
            })
        }
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
                        Add Title
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
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            error={!title.trim()}
                            helperText={!title.trim() ? 'Title cannot be empty' : ''}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="error">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant='contained'
                            color="primary"
                            disabled={!title.trim() || isDisabled}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Container>

            </Dialog >

            <SharedSnackBar
                setSnackOpen={setSnackOpen}
                snackOpen={snackOpen}
                snackVarient={snackVarient}
                snackMessage={snackMessage}
            />
        </>
    );
};

export default AddTitleDialig;
