import { render, screen } from '@testing-library/react';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import PsychiatristNavbar from '../Component/Navbar/PsychiatristNavbar';

test('displays sidebar menu items', () => {
  render(
    <MemoryRouter>
    <PsychiatristNavbar />
  </MemoryRouter>
  );

  expect(screen.getByText('Patient EHR')).toBeInTheDocument();
});

test('displays sidebar menu items 2', () => {
    render(
      <MemoryRouter>
      <PsychiatristNavbar />
    </MemoryRouter>
    );
  
    
    expect(screen.getByText('View Assigned Appointments')).toBeInTheDocument();
  });

  test('displays sidebar menu items 3', () => {
    render(
      <MemoryRouter>
      <PsychiatristNavbar />
    </MemoryRouter>
    );
  
    expect(screen.getByText('Care Plan Assign')).toBeInTheDocument();
  });