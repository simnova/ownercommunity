import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import {Download} from './download';


describe('something truthy and falsy', () => {
  it('true to be true', () => {
    render(<Download />);
   expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});