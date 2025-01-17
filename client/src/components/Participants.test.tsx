import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Participants from './Participants';
import selectEvent from 'react-select-event';

describe('Participants', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('should be able to add and delete participant', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([])); // Initial participants
    fetchMock.mockResponseOnce(
      JSON.stringify({ id: 1, name: 'Alice', blacklist: [] })
    ); // Add participant
    fetchMock.mockResponseOnce(
      JSON.stringify({ id: 2, name: 'Bob', blacklist: [] })
    ); // Add participant

    render(<Participants />);
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Alice' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(await screen.findByText('Alice')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Bob' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(await screen.findByText('Bob')).toBeInTheDocument();

    // Updating the blacklist
    await selectEvent.select(screen.getByLabelText('Exclude'), ['Bob']);
    await waitFor(() => {
      const latest = fetchMock.mock.calls.length - 1;
      const request = fetchMock.mock.calls[latest];
      expect(request[0]).toEqual(
        'http://localhost:3000/api/participants/1/blacklist'
      );
      expect(request[1]?.body).toEqual(JSON.stringify({ blacklist: [2] }));
    });

    // Deleting the participant
    fireEvent.click(screen.getAllByAltText('Delete user')[0]);
    await waitFor(() => {
      expect(screen.queryByText('Alice')).toBeNull();
    });
  });
});
