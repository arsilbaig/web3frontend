import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BrowserProvider } from 'ethers';

export const connectMetaMaskWallet = createAsyncThunk(
    'metaMask/wallet/connect',
    async () => {
        if (!window.ethereum) {
            return null;
        } else {
            const provider = new BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            return address;
        }

    }
);

const initialState = {
    metaMaskAddress: null
};

export const MetaMaskSlice = createSlice({
    name: 'metaMask',
    initialState,
    reducers: {
        setMetaMaskAddress: (state, action) => {
            if (action.payload === "") {
                state.metaMaskAddress = null
            } else {
                state.metaMaskAddress = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(connectMetaMaskWallet.fulfilled, (state, action) => {
                state.metaMaskAddress = action.payload;
            })
            .addCase(connectMetaMaskWallet.rejected, (state, action) => {
                state.metaMaskAddress = null;
            })
            .addCase(connectMetaMaskWallet.pending, (state, action) => {
            })
    },
});
export const { setMetaMaskAddress } = MetaMaskSlice.actions;
export const selectMetaMaskState = (state) => {
    return state.MetaMaskSlice
};
export default MetaMaskSlice.reducer;
