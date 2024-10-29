import React from 'react';
import { render } from '@testing-library/react';
import SharedSnackBar from '../SharedSnackBar';

test('renders SharedSnackBar without crashing', () => {
    render(
        <SharedSnackBar
            setSnackOpen={jest.fn()}
            snackOpen={true}
            snackVarient="success"
            snackMessage="Test message"
        />
    );
});