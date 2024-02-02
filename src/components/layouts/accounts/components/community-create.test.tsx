import { userEvent } from '@storybook/test';
import { act, render, screen, waitFor } from '@testing-library/react';
import { CommunityCreate } from './community-create';

describe('initially,', () => {
  it('should have Name input empty', () => {
    render(<CommunityCreate />);
    const element = screen.getByLabelText('Name') as HTMLInputElement;
    expect(element.value).toBe('');
  });
});

describe('initially, when the Name input is empty, click Create Community', () => {
  it('should have error Please input Name!', async () => {
    render(<CommunityCreate />);
    const user = userEvent.setup() as typeof userEvent;
    const errorElement = screen.queryByText(/please input name!/i) as HTMLElement;
    expect(errorElement).not.toBeInTheDocument();
    const createButton = screen.getByText('Create Community');
    await act(async () => {
      await user.click(createButton);
    });
    await waitFor(() => {
      const errorElement = screen.queryByText(/please input name!/i) as HTMLElement;
      expect(errorElement).toBeInTheDocument();
    });
  });
});

describe('when input some name, then clear the input', () => {
  it("should have error 'Please input Name!'", async () => {
    render(<CommunityCreate />);
    const user = userEvent.setup() as typeof userEvent;
    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;

    // user interacts with the input
    await act(async () => {
      await user.type(nameInput, 'test');
      await user.clear(nameInput);
    });

    // need to put in await waitFor() to wait for the error to appear
    await waitFor(() => {
      const errorElement = screen.queryByText(/please input name!/i) as HTMLElement;
      expect(errorElement).toBeInTheDocument();
    });
  });
});

// test navigation
// describe('given Name is provided, click Create Community', () => {
//   it('should show loading indication, then redirect users to community/accounts', async () => {
//     render(
//       <MemoryRouter initialEntries={['community/accounts']}>
//         <App />
//       </MemoryRouter>
//     );
//     const user = userEvent.setup() as typeof userEvent;
//     const nameInput = screen.getByLabelText('Name') as HTMLInputElement;

//     // user interacts with the input
//     await act(async () => {
//       await user.type(nameInput, 'community 5');
//     });

//     const createButton = screen.getByText('Create Community');
//     await act(async () => {
//       await user.click(createButton);
//     });

//     await waitFor(() => {
//       const welcomeTextOnAccountsScreen = screen.queryByText(/Welcome to Owner Community/i) as HTMLElement;
//       expect(welcomeTextOnAccountsScreen).toBeInTheDocument();
//     });
//   });
// });

