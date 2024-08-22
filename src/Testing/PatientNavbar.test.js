import { render, screen } from '@testing-library/react';
import PatientNavbar from '../Component/Navbar/PatientNavbar';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';

test('displays sidebar menu items', () => {
    render(
        <MemoryRouter>
        <PatientNavbar />
      </MemoryRouter>
    );
  
    expect(screen.getByText('Appointment')).toBeInTheDocument();
    expect(screen.getByText('EHR')).toBeInTheDocument();
    expect(screen.getByText('Patient Engagement')).toBeInTheDocument();
    expect(screen.getByText('Care Plan')).toBeInTheDocument();
    expect(screen.getByText('Waiting Room')).toBeInTheDocument();
  });
  test('displays sidebar menu items 2', () => {
    render(
        <MemoryRouter>
        <PatientNavbar />
      </MemoryRouter>
    );
    expect(screen.getByText('EHR')).toBeInTheDocument();
    
  });
  
  test('displays sidebar menu items 3', () => {
    render(
        <MemoryRouter>
        <PatientNavbar />
      </MemoryRouter>
    );
    expect(screen.getByText('Patient Engagement')).toBeInTheDocument();
  });
  test('displays sidebar menu items 4', () => {
    render(
        <MemoryRouter>
        <PatientNavbar />
      </MemoryRouter>
    );
    expect(screen.getByText('Care Plan')).toBeInTheDocument();
    
  });
  test('displays sidebar menu items 5', () => {
    render(
        <MemoryRouter>
        <PatientNavbar />
      </MemoryRouter>
    );
    expect(screen.getByText('Waiting Room')).toBeInTheDocument();
  });