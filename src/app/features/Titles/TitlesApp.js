import React, { useEffect, useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import TitleTable from './Components/TitleTable';
import DashboardHeader from '../shared-components/DashboardHeader';
import AddIcon from '@mui/icons-material/Add';
import AddTitleDialig from './Components/AddTitleDialig';
import { useSelector } from 'react-redux';
import { selectMetaMaskState } from '../../store/slice/MetaMaskSlice';
import SharedSnackBar from '../shared-components/SharedSnackBar';
import SharedLoader from '../shared-components/SharedLoader';


function TitlePage() {
    const [openDialog, setOpenDialog] = useState(false);
    const metaMaskState = useSelector(selectMetaMaskState)

    const [snackOpen, setSnackOpen] = useState(false)
    const [snackMessage, setSnackMessage] = useState("")
    const [snackVarient, setSnackVarient] = useState("")

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    const actionBtns = () => {
        return (
            <div onClick={(() => {
                if (!metaMaskState?.metaMaskAddress) {
                    setSnackMessage("Meta Mask Wallet is not Connected.")
                    setSnackVarient("error")
                    setSnackOpen(true);
                }
            })}>
                <Button
                    variant='contained'
                    color='primary'
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog(true)}
                    disabled={!metaMaskState?.metaMaskAddress}
                >
                    Add
                </Button>
            </div>
        )
    }

    return (
        <Box className='flex flex-col h-full w-full gap-5 bg-opacity-20' sx={{ overflow: !isLoading && "auto" }} >
            {isLoading ? (
                <>
                    <SharedLoader isLoading={isLoading} fullScreen={false} />
                </>
            ) : (
                <>
                    <DashboardHeader title='Titles Page' actionBtns={actionBtns} />
                    <Container maxWidth={false} className='overflow-auto p-o'>
                        <TitleTable />
                    </Container>

                    {openDialog && (
                        <AddTitleDialig open={openDialog} onClose={() => setOpenDialog(false)} />
                    )}

                    <SharedSnackBar
                        setSnackOpen={setSnackOpen}
                        snackOpen={snackOpen}
                        snackVarient={snackVarient}
                        snackMessage={snackMessage}
                    />
                </>
            )}
        </Box>
    );
}
export default TitlePage;
