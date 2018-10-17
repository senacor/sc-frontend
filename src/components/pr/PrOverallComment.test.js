import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { StyledComponent } from './PrOverallComment';
import TextField from '@material-ui/core/TextField';

describe('PrOverallComment Component', () => {
  let shallow = createShallow({ dive: 1 });
  it('should match snapshot', () => {
    let wrapper = shallow(
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

    expect(wrapper).toMatchSnapshot();
  });

  it('should display fullfilment of requirement as read-only', () => {
    let wrapper = shallow(
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
        prFinalized={true}
      />
    );

    expect(wrapper.find(TextField).find('[disabled]')).toHaveLength(0);
  });
});
