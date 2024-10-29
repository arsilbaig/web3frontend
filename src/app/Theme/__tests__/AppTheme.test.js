import React from 'react';
import { render } from '@testing-library/react';
import AppTheme from '../AppTheme';

test('renders AppTheme without crashing', () => {
    render(<AppTheme><div>Test</div></AppTheme>);
});