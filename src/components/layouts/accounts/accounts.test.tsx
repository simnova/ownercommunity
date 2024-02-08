import * as ApolloClient from '@apollo/client';
import { render, screen, waitFor, act, cleanup } from '@testing-library/react';
import * as Auth from 'react-oidc-context';
import { AuthProvider } from 'react-oidc-context';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../../../App';
import { oidcConfig } from '../../../config/odic-config';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import {
  Community,
  CommunityListContainerCommunitiesQueryDocument,
  LoggedInUserRootContainerUserCurrentQueryDocument,
  UserInfoContainerUserCurrentQueryDocument
} from '../../../generated';
import RequireAuth from '../../shared/require-auth';
import ApolloConnection from '../../shared/apollo-connection';
import { Accounts } from '.';

const CommunityListContainerCommunitiesQueryMock = {
  request: {
    query: CommunityListContainerCommunitiesQueryDocument,
    variables: {}
  },
  result: {
    data: {
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
  }
};

const LoggedInUserRootContainerUserCurrentQueryMock = {
  request: {
    query: LoggedInUserRootContainerUserCurrentQueryDocument,
    variables: {}
  },
  result: {
    data: {
      userCurrent: {
        id: '1234',
        externalId: '1234',
        firstName: 'Duy',
        lastName: 'Nguyen',
        __typename: 'User'
      }
    }
  },
  maxUsageCount: 5
};

beforeEach(() => {
  vi.clearAllMocks();
});

// to be tested scenarios:
// - not authorized user, render Not Authorized screen
// - authorized user, render /community/accounts screen successfully with correct user's name, User Id
// - authorized user, click Create Community button to navigate to create community page
// - authorized user, click on a community to navigate to community detail screen

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
    screen.debug();
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

  describe('when click on a community', () => {
    it('should be navigate the users to community detail screen', async () => {
      const element = screen.getAllByText(/hello world 3/i);
      expect(element.length).toBeGreaterThan(0);
    });
  });
});
