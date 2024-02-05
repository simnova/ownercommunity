import { act, render, screen, waitFor } from '@testing-library/react';
import { CommunityCreate } from './community-create';
import userEvent from '@testing-library/user-event';

// test if the page is initially loaded
describe('initially,', () => {
  it('should have the component rendered successfully', () => {
    render(<CommunityCreate />);
    const element = screen.getByText("Creating your Community");
    expect(element).toBeInTheDocument();
  });
});

// test if the Name input is empty
describe('initially, when page is first loaded', () => {
  it('should have Name input empty', () => {
    render(<CommunityCreate />);
    const element = screen.getByLabelText('Name') as HTMLInputElement;
    expect(element.value).toBe('');
  });
});

describe('initially, when the Name input is empty, click Create Community', () => {
  it('should have error "Please input Name!"', async () => {
    const user = userEvent.setup();
    render(<CommunityCreate />);
    let errorElement = screen.queryByText(/please input name!/i) as HTMLElement;
    expect(errorElement).not.toBeInTheDocument();
    const createButton = screen.getByText('Create Community');

    await act(async () => {
      await user.click(createButton);
    });

    await waitFor(() => {
      errorElement = screen.queryByText(/please input name!/i) as HTMLElement;
      expect(errorElement).toBeInTheDocument();
    });
  });
});

describe('when input some name, then clear the input', () => {
  it("should have error 'Please input Name!'", async () => {
    const user = userEvent.setup();
    render(<CommunityCreate />);
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

// test if onSave() handler is called when Name input has some value
describe('given Name have some value, click Create Community button', () => {
  it('should call onSave handler', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(<CommunityCreate onSave={onSave} />);

    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
    await act(async () => {
      await user.type(nameInput, 'test');
    });

    const createButton = screen.getByText('Create Community');
    await act(async () => {
      await user.click(createButton);
    });

    expect(onSave).toHaveBeenCalledWith({ name: 'test' });
  });
});
