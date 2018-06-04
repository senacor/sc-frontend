import React from 'react';
import CstMembers from './CstMembers';

describe('CstMembers component', function() {
  it('should match snapshot', () => {
    let cut = <CstMembers />;

    expect(cut).toMatchSnapshot();
  });
});
