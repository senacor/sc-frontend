import React from 'react';
import { PrOverallFulfillment } from './PrOverallFulfillment';
import FormControl from '@material-ui/core/FormControl';
import { createShallow } from '@material-ui/core/test-utils';

describe('PrOverallFulfillment Component', () => {
  let shallow = createShallow({ dive: true });

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

  it('should display the fulfillment of requirement', () => {
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

  it('should display the fulfillment of requirement as read-only if the supervisor has finalized the PR', () => {
    const wrapper = shallow(
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
        prFinalized={true}
        prVisible={true}
      />
    );

    expect(wrapper.find(FormControl).find('[disabled]')).toHaveLength(0);
  });
});
