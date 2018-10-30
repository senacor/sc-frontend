import React from 'react';
import { StyledComponent } from './PrOverallFulfillment';
import FormControl from '@material-ui/core/FormControl';
import { createShallow } from '@material-ui/core/test-utils';

describe('PrOverallFulfillment Component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let cut = shallow(
      <StyledComponent
        prById={{}}
        prRating={{
          id: 5,
          prRatingDescription: 'FULFILLMENT_OF_REQUIREMENT',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 2,
          comment: 'ggg'
        }}
        category="TARGET_ROLE"
        isActionPerformer
      />
    );

    expect(cut).toMatchSnapshot();
  });

  it('should display the fulfillment of requirement', () => {
    let cut = shallow(
      <StyledComponent
        prById={{}}
        prRating={{
          id: 5,
          prRatingDescription: 'FULFILLMENT_OF_REQUIREMENT',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 2,
          comment: 'ggg'
        }}
        category="TARGET_ROLE"
        nonActionPerformer
      />
    );

    expect(cut).toMatchSnapshot();
  });

  it('should display the fulfillment of requirement as read-only if the supervisor has finalized the PR', () => {
    const wrapper = shallow(
      <StyledComponent
        prById={{}}
        prRating={{
          id: 5,
          prRatingDescription: 'FULFILLMENT_OF_REQUIREMENT',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 2,
          comment: 'ggg'
        }}
        category="TARGET_ROLE"
        readOnly={true}
        isActionPerformer
      />
    );

    let isDisabled = wrapper
      .find(FormControl)
      .map(role => role.get(0).props.disabled);
    expect(isDisabled).toEqual([true]);
  });
});
