import React from 'react';
import { render } from '@testing-library/react';
import { SitemarkIcon, FacebookIcon, GoogleIcon } from '../CustomIcons';

test('renders SitemarkIcon without crashing', () => {
    render(<SitemarkIcon />);
});

test('renders FacebookIcon without crashing', () => {
    render(<FacebookIcon />);
});

test('renders GoogleIcon without crashing', () => {
    render(<GoogleIcon />);
});