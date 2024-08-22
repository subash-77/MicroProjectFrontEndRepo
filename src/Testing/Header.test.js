import { render, screen } from '@testing-library/react';

import Header from '../LandingComponent/Header/Header'; // Adjust the import path as necessary
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
    render(<Header />);
    const linkElement = screen.getByRole("H1");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Home");
    
  });
  test('renders heading tag content', () => {
    render(<Header />);
    const linkElement = screen.getByRole("H2");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Service");
    
  });

  test('renders heading tag content', () => {
    render(<Header />);
    const linkElement = screen.getByRole("H3");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("About Us");
  });
  test('renders heading tag content', () => {
    render(<Header />);
    const linkElement = screen.getByRole("H4");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Contact Us");
  });
 