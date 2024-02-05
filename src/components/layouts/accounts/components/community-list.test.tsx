import { render, screen } from '@testing-library/react';
import { CommunityList } from './community-list';
import { MemoryRouter } from 'react-router-dom';
import { Community } from '../../../../generated';

describe('given an empty array of communities', () => {
  it('should have the component rendered successfully', () => {
    const communityMockProps = [] as Community[];
    render(
      <MemoryRouter>
        <CommunityList data={{ communities: communityMockProps }} />
      </MemoryRouter>
    );
    const header = screen.getByText('Navigate to a Community');
    expect(header).toBeInTheDocument();
  });
});

describe('given an array of communities', () => {
  it('should display the list of communites for Member Site and Admin Site', async () => {
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

    render(
      <MemoryRouter>
        <CommunityList
          data={{
            communities: communityMockProps
          }}
        />
      </MemoryRouter>
    );
    const header = screen.getByText("Navigate to a Community");
    expect(header).toBeInTheDocument();

    const communityListButtons = screen.getAllByTestId('community-list-button');
    expect(communityListButtons).toHaveLength(communityMockProps.length);

    const communityListAdminButtons = screen.getAllByTestId('community-list-admin-button');
    expect(communityListAdminButtons).toHaveLength(communityMockProps.filter((comm) => comm.userIsAdmin).length);

  });
});
