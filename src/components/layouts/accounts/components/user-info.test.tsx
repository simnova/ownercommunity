import { render, screen } from '@testing-library/react';
import { UserInfo } from './user-info';

describe('given data for user id 123', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // always clear all mocks to prevent side effects from other tests
  });

  it('should render User Id: 123', async () => {
    const mockProps = {
      userCurrent: {
        id: '123'
      }
    };
    render(<UserInfo data={mockProps} />);
    const element = screen.getByTestId('user-id');
    expect(element).toHaveTextContent('User ID: 123');
  });
});
