import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../LandingComponent/Login';
import { BrowserRouter } from 'react-router-dom';

import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
 
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
 
const mock = new MockAdapter(axios);
 
const mockNavigate = jest.fn();
useNavigate.mockReturnValue(mockNavigate);
 
afterEach(() => {
    mock.reset();
});

describe('Login Component Tests', () => {
  test('renders email and password placeholders', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('shows email error message on invalid email input', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email Address'), {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText('Login'));

    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  test('shows password error message on empty password input', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email Address'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByText('Login'));

    expect(screen.getByText('Please enter your password')).toBeInTheDocument();
  });
});
