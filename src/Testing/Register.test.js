import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../LandingComponent/Register';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
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

describe('Register Component Tests', () => {
  test('renders form elements', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  });

  test('shows error messages on invalid inputs', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('User Name'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'different-password' },
    });
    fireEvent.click(screen.getByText('REGISTER'));

    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Email is invalid')).toBeInTheDocument();
    expect(screen.getByText('Passwords not match')).toBeInTheDocument();
  });

  test('shows no error messages on valid inputs', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('User Name'), {
      target: { value: 'validUser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('REGISTER'));

    // No validation errors should be present
    expect(screen.queryByText('Username is required')).toBeNull();
    expect(screen.queryByText('Email is invalid')).toBeNull();
    expect(screen.queryByText('Passwords not match')).toBeNull();
  });

  test('enables register button when form is valid', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('User Name'), {
      target: { value: 'validUser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password123' },
    });

    const registerButton = screen.getByText('REGISTER');
    expect(registerButton).not.toHaveClass('bg-gray-400 cursor-not-allowed');
    expect(registerButton).toBeEnabled();
  });

});
