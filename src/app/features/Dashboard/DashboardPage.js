import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectMetaMaskWallet, selectMetaMaskState, setMetaMaskAddress } from "../../store/slice/MetaMaskSlice";
import SharedLoader from '../shared-components/SharedLoader';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WalletIcon from '@mui/icons-material/Wallet';

export default function DashboardPage() {
    const navigate = useNavigate();
    const metaMaskState = useSelector(selectMetaMaskState);
    const [isLoading, setIsLoading] = useState(true);
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
    const [isRequestPending, setIsRequestPending] = useState(false);
    const dispatch = useDispatch()

    const handleConnectWallet = async () => {
        if (isRequestPending) {
            console.log("A permission request is already in progress. Please wait.");
            return;
        }

        setIsRequestPending(true);
        try {
            const res = await dispatch(connectMetaMaskWallet());
            console.log(res);
        } catch (error) {
            console.log(error);
        } finally {
            setIsRequestPending(false);
        }
    };

    useEffect(() => {
        const checkEthereum = () => {
            if (window.ethereum) {
                window.ethereum.on("accountsChanged", (accounts) => {
                    if (accounts.length === 0) {
                        dispatch(setMetaMaskAddress(""));
                    }
                });
                setIsMetaMaskInstalled(true);
            } else {
                setIsMetaMaskInstalled(false);
            }
        };
        checkEthereum();
        const interval = setInterval(checkEthereum, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (window.ethereum) {
            handleConnectWallet()
        }
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Box className="flex flex-col justify-center items-center w-full h-full gap-2">
            {isLoading ? (
                <SharedLoader isLoading={isLoading} fullScreen={false} />
            ) : (
                <>
                    <Typography>Welcome To Hiring Testing Frontend</Typography>
                    {metaMaskState?.metaMaskAddress ? (
                        <Typography variant="caption">Meta Mask Wallet Address is: <span style={{ color: '#1976d2' }}>{metaMaskState?.metaMaskAddress}</span></Typography>
                    ) : (
                        !isMetaMaskInstalled ? (
                            <Typography variant="caption" color="error">Meta Mask Extension Not Found. Please Click The Button Below to Install.</Typography>
                        ) : (
                            <Typography variant="caption" color="error">Meta Mask Wallet not Connected or Address is unavailable.</Typography>
                        )
                    )}
                    <Container maxWidth={false} className='flex justify-center items-center gap-3'>
                        <Button
                            variant='contained'
                            startIcon={<AddIcon />}
                            onClick={() => navigate("/titles")}
                            color='info'
                        >
                            Add Title
                        </Button>

                        {isMetaMaskInstalled && !metaMaskState?.metaMaskAddress && (
                            <Button
                                variant='contained'
                                startIcon={<WalletIcon />}
                                onClick={handleConnectWallet}
                                color='success'
                            >
                                Connect To Wallet
                            </Button>
                        )}

                        {!isMetaMaskInstalled && (
                            <Button
                                variant='contained'
                                startIcon={<AccountBalanceWalletIcon />}
                                color='warning'
                                href="https://metamask.io/download.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Get Extension
                            </Button>
                        )}
                    </Container>
                </>
            )
            }
        </Box >
    );
}
