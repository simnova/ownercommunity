import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotLoggedIn } from './not-logged-in';

const onLoginClickedMock = vi.fn();
const onSignupClickedMock = vi.fn();
render(<NotLoggedIn onLoginClicked={onLoginClickedMock} onSignupClicked={onSignupClickedMock}/>)

describe('not-logged-in.notLoggedInComponentLoaded', () => {
  describe('Given NotLoggedIn component loaded', () => {
    // Arrange: setup is done in the render function

    describe('when rendering page', () => {
      // Act
      const loginButton = screen.getByRole('button', { name: 'Login' });
      const signupButton = screen.getByRole('button', { name: 'Sign up' });
      it('then I expect the Login and Sign up buttons to appear on screen', () => {
        // Assert
        expect(loginButton).toBeInTheDocument();
        expect(signupButton).toBeInTheDocument();
      });
    });
  });
});

describe('not-logged-in.login', () => {
  describe('Given a logged out user', () => {
    // Arrange: setup is done in the render function
    
    describe('when user clicks Login button', () => {
      // Act
      fireEvent.click(screen.getByText('Login'));
      it('then I expect onLoginClicked to have been called', () => {
        // Assert
        expect(onLoginClickedMock).toHaveBeenCalled();
      });
    });
  });
});

describe('not-logged-in.signUp', () => {
  describe('Given a logged out user', () => {
    
    // Arrange: setup is done in the render function

    describe('when user clicks Sign up button', () => {
      // Act
      fireEvent.click(screen.getByText('Sign up'));
      it('then I expect onSignupClicked to have been called', () => {
        // Assert
        expect(onSignupClickedMock).toHaveBeenCalled();
      });
    });
  });
});