import reducer, { setMetaMaskAddress } from '../MetaMaskSlice';

describe('MetaMaskSlice', () => {
    const initialState = {
        metaMaskAddress: null,
    };

    it('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle setMetaMaskAddress', () => {
        const actual = reducer(initialState, setMetaMaskAddress('0x123'));
        expect(actual.metaMaskAddress).toEqual('0x123');
    });
});