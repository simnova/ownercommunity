import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mock } from 'vitest';
import { CommunityCreate } from './community-create';




// test if the page is initially loaded
describe('given initial state,', () => {
  interface RenderContext {
    user: ReturnType<typeof userEvent.setup>;
    onSave: Mock;
  }
  beforeEach<RenderContext>((context) => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(<CommunityCreate onSave={onSave} />);
    context.user = user;
    context.onSave = onSave;
  });

  it('should have the component rendered successfully', () => {
    const element = screen.getByText('Creating your Community');
    expect(element).toBeInTheDocument();
  });

  it('should have Name input empty', () => {
    const element = screen.getByLabelText('Name') as HTMLInputElement;
    expect(element.value).toBe('');
  });

  describe('when click Create Community', () => {
    it<RenderContext>('should have error "Please input Name!"', async ({ user }) => {
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

  describe('when input some name, after that, clear the input', () => {
    it<RenderContext>("should have error 'Please input Name!'", async ({ user }) => {
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
    it<RenderContext>('should call onSave handler', async ({ user, onSave }) => {
      const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
      const createButton = screen.getByText('Create Community');
      await act(async () => {
        await user.type(nameInput, 'test');
        await user.click(createButton);
      });
      
      await waitFor(() => {
        expect(onSave).toHaveBeenCalledWith({ name: 'test' });
      });
    });
  });
});
