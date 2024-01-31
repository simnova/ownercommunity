import { AuthProvider } from 'react-oidc-context';
import { MemoryRouter } from 'react-router-dom';
import { oidcConfig } from '../../../config/odic-config';
import { render, waitFor, screen } from '@testing-library/react';
import App from '../../../App';

describe('given not authorized, when navigating to community/accounts', () => {
  it('should display Not Authorized', async () => {
    render(
      <AuthProvider {...oidcConfig}>
        <MemoryRouter initialEntries={['/community/accounts']}>
          <App />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      const element = screen.queryByText(/Not Authorized/i);
      expect(element).toBeInTheDocument();
    });
  });
});
