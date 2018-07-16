import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { StyledComponent } from './PrOverallComment';

describe('PrOverallComment Component', () => {
  let shallow = createShallow({ dive: 1 });
  it('should match snapshot', () => {
    let cut = shallow(
      <StyledComponent
        prById={{}}
        prRating={{
          id: 5,
          prRatingDescription: 'FULFILLMENT_OF_REQUIREMENT',
          prRatingCategory: 'FULFILLMENT_OF_REQUIREMENT',
          rating: 2,
          comment: 'ggg'
        }}
        category="FULFILLMENT_OF_REQUIREMENT"
      />
    );

    expect(cut).toMatchSnapshot();
  });
});
