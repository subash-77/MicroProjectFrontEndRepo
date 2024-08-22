import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdminAppointment from '../Component/AdminPages/AdminAppointment'; // Adjust path as necessary
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

describe('AdminAppointment Component', () => {
  test('renders the component and checks for initial contents', () => {
    render(<AdminAppointment />);

  
    expect(screen.getByText(/All/i)).toBeInTheDocument();
    expect(screen.getByText(/Scheduled/i)).toBeInTheDocument();
    expect(screen.getByText(/Waiting/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  test('renders table headers when records are available', async () => {
    mock.onGet('http://localhost:1225/admin/allAppointment').reply(200, [
      {
        appointmentId: '1',
        patientInfo: { name: 'John Doe' },
        payment: { amount: '100' },
        status: 'waiting',
        psychiatristId: '1',
        appointmentSlot: 'slot1',
      },
    ]);

    render(<AdminAppointment />);
    expect(await screen.findByText(/appointmentId/i)).toBeInTheDocument();
    expect(await screen.findByText(/patientInfo/i)).toBeInTheDocument();
    expect(await screen.findByText(/payment/i)).toBeInTheDocument();
    expect(await screen.findByText(/Action/i)).toBeInTheDocument();
  });

  

  test('shows success message when an action is completed', async () => {
 
    mock.onGet('http://localhost:1225/admin/allAppointment').reply(200, [
      {
        appointmentId: '1',
        patientInfo: { name: 'John Doe' },
        payment: { amount: '100' },
        status: 'waiting',
        psychiatristId: '1',
        appointmentSlot: 'slot1',
      },
    ]);


    mock.onPost('http://localhost:1225/admin/updateAppointment').reply(200, {});

    render(<AdminAppointment />);
  });
});
