import { render, screen } from '@testing-library/react';

import Footer from '../LandingComponent/Footer/Footer'; 
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
    render(<Footer />);
    const linkElement = screen.getByRole("H1");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Information");
    
  });

  test('renders heading tag content 2', () => {
    render(<Footer />);
    const linkElement = screen.getByRole("H2");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Avaniyapuram,Madurai-625012");
    
  });

  test('renders heading tag content 3', () => {
    render(<Footer />);
    const linkElement = screen.getByRole("H3");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Property");
    
  });
  test('renders heading tag content 4', () => {
    render(<Footer />);
    const linkElement = screen.getByRole("H4");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Service");
    
  });
  test('renders heading tag content 5', () => {
    render(<Footer />);
    const linkElement = screen.getByRole("H5");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Product");
    
  });
  test('renders heading tag content 6', () => {
    render(<Footer />);
    const linkElement = screen.getByRole("H6");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("About Us");
  });