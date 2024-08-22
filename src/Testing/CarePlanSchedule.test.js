import { render, screen } from '@testing-library/react';
import CarePlanSchedule from '../Component/PsychiatristPages/CarePalnSchedule';


test('renders the main title', () => {
  render(<CarePlanSchedule />);
  const titleElement = screen.getByText(/Patient Engagement/i);
  expect(titleElement).toBeInTheDocument();
});

