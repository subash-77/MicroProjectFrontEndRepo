import { render, screen } from '@testing-library/react';

import GetStrated from '../LandingComponent/GetStrated/GetStrated'; 
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
    render(<GetStrated />);
    const linkElement = screen.getByRole("H1");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Discover Our Powerful Management System");
    
  });
  test('renders heading tag content', () => {
    render(<GetStrated />);
    const linkElement = screen.getByRole("H2");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Transforming the Delivery of Psychiatric Care Through Technology");
    
  });

  test('renders heading tag content', () => {
    render(<GetStrated />);
    const linkElement = screen.getByRole("H3");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Contact");
  });

 