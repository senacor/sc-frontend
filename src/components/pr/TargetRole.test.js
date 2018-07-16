import React from 'react';
import { shallow } from 'enzyme';
import { TargetRole } from './TargetRole';

describe('TargetRole Component', () => {
  it('should match snapshot', () => {
    let cut = shallow(
      <TargetRole
        prById={{}}
        prRating={{
          id: 5,
          prRatingDescription: 'PROBLEM_ANALYSIS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 2,
          comment: 'ggg'
        }}
        category="TARGET_ROLE"
      />
    );

    expect(cut).toMatchSnapshot();
  });
});
