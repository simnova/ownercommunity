import { userEvent } from '@storybook/test';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
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
    // const user = userEvent.setup();
    const errorElement = screen.queryByText(/please input name!/i) as HTMLElement;
    expect(errorElement).not.toBeInTheDocument();
    const createButton = screen.getByText('Create Community');
    await act(async () => {
      await userEvent.click(createButton);
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
    // const user = userEvent.setup();
    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;

    // user interacts with the input
    await act(async () => {
      await userEvent.type(nameInput, 'test');
      await userEvent.clear(nameInput);
    });

    // need to put in await waitFor() to wait for the error to appear
    await waitFor(() => {
      const errorElement = screen.queryByText(/please input name!/i) as HTMLElement;
      expect(errorElement).toBeInTheDocument();
    });
  });
});
