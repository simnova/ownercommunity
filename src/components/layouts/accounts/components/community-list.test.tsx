import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Community } from '../../../../generated';
import { CommunityList } from './community-list';
import * as RRD from 'react-router-dom';

vi.mock('react-router-dom', async (importOriginal) => {
  const nav = vi.fn();
  const mod = await importOriginal<typeof import('react-router-dom')>(); // from documentation https://vitest.dev/api/vi.html#mock-modules

  // const rrd = await vi.importActual<typeof import('react-router-dom')>('react-router-dom'); // from documentation intellisense
  return {
    ...mod,
    useNavigate: vi.fn(() => {
      console.log('useNavigate called');
      return nav;
    })
  };
});

describe('given an empty array of communities', () => {
  it('should have the component rendered successfully', () => {
    const communityMockProps = [] as Community[];
    render(
      <RRD.MemoryRouter>
        <CommunityList data={{ communities: communityMockProps }} />
      </RRD.MemoryRouter>
    );
    const header = screen.getByText('Navigate to a Community');
    expect(header).toBeInTheDocument();
  });
});

const communityMockProps = [
  {
    id: '1',
    name: 'hello world',
    userIsAdmin: true
  },
  {
    id: '2',
    name: 'hello world 2',
    userIsAdmin: false
  },
  {
    id: '3',
    name: 'hello world 3',
    userIsAdmin: true
  }
] as Community[];

describe('given an array of communities', () => {
  beforeEach(() => {
    // // Clears all information about every call.
    // // After calling it, all properties on .mock will return empty state.
    // // This method does not reset implementations.
    // // It is useful if you need to clean up mock between different assertions.
    vi.clearAllMocks();

    render(
      <RRD.MemoryRouter>
        <CommunityList
          data={{
            communities: communityMockProps
          }}
        />
      </RRD.MemoryRouter>
    );
  });

  it('should render the component successfully and display the list of communities for Member Site and Admin Site', async () => {
    const header = screen.getByText('Navigate to a Community');
    expect(header).toBeInTheDocument();

    const communityListButtons = screen.getAllByTestId('community-list-button');
    expect(communityListButtons).toHaveLength(communityMockProps.length);

    const communityListAdminButtons = screen.getAllByTestId('community-list-admin-button');
    expect(communityListAdminButtons).toHaveLength(communityMockProps.filter((comm) => comm.userIsAdmin).length);
  });

  // test if navigation is called when clicking on a community
  describe('when clicking on a community', () => {
    it('should call useNavigate once', async () => {
      const user = userEvent.setup();
      const communityListButtons = screen.getAllByTestId('community-list-button');
      await act(async () => {
        await user.click(communityListButtons[0]);
      });
      await waitFor(() => {
        expect(RRD.useNavigate).toHaveBeenCalledOnce();
      });
    });
  });
});
