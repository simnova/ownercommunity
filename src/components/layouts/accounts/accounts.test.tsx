import * as ApolloClient from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { act, render, screen, waitFor } from '@testing-library/react';
import * as Auth from 'react-oidc-context';
import { AuthProvider } from 'react-oidc-context';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Accounts } from '.';
import App from '../../../App';
import { oidcConfig } from '../../../config/odic-config';
import { Community } from '../../../generated';
import RequireAuth from '../../shared/require-auth';
import { Members } from '../members';

// to be tested scenarios:
// - not authorized user, render Not Authorized screen
// - authorized user, render /community/accounts screen successfully with correct user's name, User Id
// - authorized user, click Create Community button will navigate to create community page
// - authorized user, click on a community will navigate to community detail screen

const mockQueryValue = {
  loading: false,
  error: undefined,
  data: {
    userCurrent: {
      externalId: '123',
      firstName: 'Duy',
      lastName: 'Nguyen'
    },
    communities: [
      {
        name: 'hello world 1',
        domain: 'hello-world-1',
        whiteLabelDomain: 'hello-world-1',
        handle: 'hello-world-1',
        publicContentBlobUrl: 'https://hello-world-1.blob.core.windows.net/public',
        userIsAdmin: true,
        id: 1,
        schemaVersion: '1',
        createdAt: '2021-08-25T00:00:00.000Z',
        updatedAt: '2021-08-25T00:00:00.000Z',
        __typename: 'Community'
      },
      {
        name: 'hello world 2',
        domain: 'hello-world-2',
        whiteLabelDomain: 'hello-world-2',
        handle: 'hello-world-2',
        publicContentBlobUrl: 'https://hello-world-1.blob.core.windows.net/public',
        userIsAdmin: true,
        id: 2,
        schemaVersion: '1',
        createdAt: '2021-08-25T00:00:00.000Z',
        updatedAt: '2021-08-25T00:00:00.000Z',
        __typename: 'Community'
      },
      {
        name: 'hello world 3',
        domain: 'hello-world-3',
        whiteLabelDomain: 'hello-world-3',
        handle: 'hello-world-3',
        publicContentBlobUrl: 'https://hello-world-1.blob.core.windows.net/public',
        userIsAdmin: true,
        id: 3,
        schemaVersion: '1',
        createdAt: '2021-08-25T00:00:00.000Z',
        updatedAt: '2021-08-25T00:00:00.000Z',
        __typename: 'Community'
      }
    ] as Community[]
  }
};

// unauthorized user
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
      const element = screen.queryByText('Not Authorized');
      expect(element).toBeInTheDocument();
    });
  });
});

// authorized user
describe('given authorized user with name Duy Nguyen and user id 123,', () => {
  beforeEach(async () => {
    const useAuthSpy = vi.spyOn(Auth, 'useAuth');
    const mockResolveValue = {
      isAuthenticated: true
    };
    useAuthSpy.mockReturnValue(mockResolveValue as any);

    
    const useQuerySpy = vi.spyOn(ApolloClient, 'useQuery');
    useQuerySpy.mockReturnValue(mockQueryValue as any);
    
    await act(async () => {
      render(
        <AuthProvider {...oidcConfig}>
          <MemoryRouter initialEntries={['/community/accounts']}>
            <Routes>
              <Route
                path="/community/*"
                element={
                  <RequireAuth forceLogin={false}>
                    <MockedProvider>
                      <Routes>
                        <Route path="/accounts/*" element={<Accounts />} />
                        {/* <Route path="/:communityId/admin/*" element={<Admin />} /> */}
                        <Route path="/:communityId/member/:userId/*" element={<Members />} />
                      </Routes>
                    </MockedProvider>
                  </RequireAuth>
                }
              />
            </Routes>
          </MemoryRouter>
        </AuthProvider>
      );
    });
  });

  it('should render /community/accounts/create-community screen successfully with name Duy Nguyen and user ID 123', async () => {
    const welcomeTextOnAccountsScreen = screen.queryByText('Your Community');
    expect(welcomeTextOnAccountsScreen).toBeInTheDocument();

    const userFirstLastName = screen.getByText('Duy Nguyen');
    expect(userFirstLastName).toBeInTheDocument();

    const userId = screen.getByTestId('user-id');
    expect(userId).toBeInTheDocument();
  });
  describe('when click on Create a Community...', () => {
    it('should navigate to Create community screen', async () => {
      const createCommunityButton = screen.getByText('Create a Community...');
      await act(async () => {
        await createCommunityButton.click();
      });

      await waitFor(() => {
        const createCommunityText = screen.queryByText('Creating your Community'); // keyword on create community screen
        expect(createCommunityText).toBeInTheDocument();
      });
    });
  });

  describe('when click on a member community', () => {
    it('should be navigate the users to community detail screen', async () => {
      const communityDetailBtns = screen.getAllByText(/hello world 3/i);
      expect(communityDetailBtns.length).toBeGreaterThan(0);
      localStorage.setItem('userId', '123');

      await act(async () => {
        await communityDetailBtns[0].click();
      });


      // await waitFor(() => {
        const communityDetailText = screen.getByText(/User ID: 123/i); // keyword on community detail screen
        expect(communityDetailText).toBeInTheDocument();
      // });
    });
  });
});
