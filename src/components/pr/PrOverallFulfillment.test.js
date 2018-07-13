import React from 'react';
import { shallow } from 'enzyme';
import { PrOverallFulfillment } from './PrOverallFulfillment';

describe('PrOverallFulfillment Component', () => {
  it('should match snapshot', () => {
    let cut = shallow(
      <PrOverallFulfillment
        prById={{}}
        prRating={{
          id: 5,
          prRatingDescription: 'FULFILLMENT_OF_REQUIREMENT',
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
