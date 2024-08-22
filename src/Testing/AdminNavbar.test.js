import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminNavbar from '../Component/Navbar/AdminNavbar'; 

describe('AdminNavbar Component Text Presence Tests', () => {
  test('renders "Admin" text in the sidebar', () => {
    render(
      <MemoryRouter>
        <AdminNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  test('renders "Dashboard" menu item text', () => {
    render(
      <MemoryRouter>
        <AdminNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('renders "Appointment" menu item text', () => {
    render(
      <MemoryRouter>
        <AdminNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Appointment')).toBeInTheDocument();
  });

  test('renders "Psychiatrist Record" menu item text', () => {
    render(
      <MemoryRouter>
        <AdminNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Psychiatrist Record')).toBeInTheDocument();
  });

  test('renders "Patient Record" menu item text', () => {
    render(
      <MemoryRouter>
        <AdminNavbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Patient Record')).toBeInTheDocument();
  });

  test('renders modal with "Successfully Logout - Session Expired" message when triggered', () => {
    render(
      <MemoryRouter>
        <AdminNavbar />
      </MemoryRouter>
    );
  });
});
