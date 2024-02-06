import { describe, it, expect, vi} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Needed for Link component
import { LoggedIn } from './logged-in';

describe('LoggedIn Component', () => {
  const mockLogout = vi.fn();
  const defaultProps = {
    data: {
      firstName: 'John',
      lastName: 'Doe',
      notificationCount: 3
    },
    onLogoutClicked: mockLogout
  }

  it('renders with default props', () => {
    // Arrange
    render(<LoggedIn {...defaultProps} />, { wrapper: MemoryRouter });
    
    // Act: implicit in render
    
    // Assert
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Log Out/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /My Community\(s\)/ })).toBeInTheDocument();
  });

  it('displays initials when no profile image is provided', () => {
    // Arrange
    render(<LoggedIn {...defaultProps} />, { wrapper: MemoryRouter });
  
    const firstName = defaultProps.data.firstName;
    const lastName = defaultProps.data.lastName;
    const avatarUrl = `https://ui-avatars.com/api/?name=${firstName}+${lastName}`;
    
    // Act
    const images = screen.getAllByRole('img');
    const avatarInitialsImg = images.find((img) => img.getAttribute('src') === avatarUrl);

    // Assert
    expect(avatarInitialsImg).toBeInTheDocument();
  });

  it('display profile image when provided', () => {
    // Arrange
    // add profile image to props
    const propsWithImage = {
      ...defaultProps,
      data: {
        ...defaultProps.data,
        profileImage: 'https://example.com/profile.jpg'
      }
    }
    render(<LoggedIn {...propsWithImage} />, { wrapper: MemoryRouter });

    // Act
    const images = screen.getAllByRole('img');
    const avatarImg = images.find((img) => img.getAttribute('src') === propsWithImage.data.profileImage);
    
    // Assert
    expect(avatarImg).toBeInTheDocument();
  });

  it('calls onLogoutClicked when logout button is clicked', () => {
    // Arrange
    render(<LoggedIn {...defaultProps} />, { wrapper: MemoryRouter });

    // Act
    const logoutButton = screen.getByText(/Log Out/);
    fireEvent.click(logoutButton);

    // Assert
    expect(mockLogout).toHaveBeenCalled();
  });

  it('contains a link to the community accounts page', () => {
    // Arrange
    render(<LoggedIn {...defaultProps} />, { wrapper: MemoryRouter });

    // Act
    const link = screen.getByRole('link', { name: /My Community\(s\)/ });
    
    // Assert
    expect(link).toHaveAttribute('href', '/community/accounts');
  });
});