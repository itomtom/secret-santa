import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import Draw from './Draw';

describe('Draw', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('should return draw results', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([])); // Initial history fetch
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          giver: {
            id: 1,
            name: 'Alice',
          },
          receiver: {
            id: 2,
            name: 'Bob',
          },
        },
        {
          giver: {
            id: 2,
            name: 'Bob',
          },
          receiver: {
            id: 1,
            name: 'Alice',
          },
        },
      ])
    ); // Draw results

    render(<Draw />);
    fireEvent.click(screen.getByRole('button', { name: 'Start draw' }));

    await waitFor(() => {
      expect(screen.getByTestId('1_2').textContent).toBe(
        'Alice(1)is Secret Santa forBob(2)'
      );
      expect(screen.getByTestId('2_1').textContent).toBe(
        'Bob(2)is Secret Santa forAlice(1)'
      );
    });
  });

  test('should display history when returned', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          createdAt: '2021-12-01T00:00:00.000Z',
          id: 1,
          history: [
            {
              giver: {
                id: 1,
                name: 'Alice',
              },
              receiver: {
                id: 2,
                name: 'Bob',
              },
            },
            {
              giver: {
                id: 2,
                name: 'Bob',
              },
              receiver: {
                id: 1,
                name: 'Alice',
              },
            },
          ],
        },
      ])
    ); // Initial history fetch
    render(<Draw />);

    expect(
      await screen.findByText('12/1/2021, 12:00:00 AM')
    ).toBeInTheDocument();

    const list = screen.getByRole('list', {
      name: 'draw-history',
    });
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items[0].textContent).toEqual(
      '12/1/2021, 12:00:00 AMAlice(1)is Secret Santa forBob(2)Bob(2)is Secret Santa forAlice(1)'
    );
  });
});
