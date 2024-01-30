import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Download } from './download';
import { Editor } from '@craftjs/core';

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    render(
      <Editor>
        <Download />
      </Editor>
    );
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });

});