import { render, screen } from '@testing-library/react';

import Hero from '../LandingComponent/Hero/Hero'; // Adjust the import path as necessary
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

test('renders heading tag content', () => {
    render(<Hero />);
    const linkElement = screen.getByRole("H1");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Consultations Provided");
    
  });
  test('renders heading tag content', () => {
    render(<Hero />);
    const linkElement = screen.getByRole("H2");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Satisfied Clients");
    
  });

  test('renders heading tag content', () => {
    render(<Hero />);
    const linkElement = screen.getByRole("H3");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Award Winning");
  });

 