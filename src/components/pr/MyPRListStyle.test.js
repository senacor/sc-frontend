import React from 'react';
import styles from './MyPRListStyle';

describe('MyPRList Style storage', () => {
  it('should exist', () => {
    const func = styles;

    expect(func).toMatchSnapshot();
  });
});
