import React from 'react';
import { shallow } from 'enzyme';
import { PrOverallFulfillment } from './PrOverallFulfillment';
import { StyledComponent } from './PrComment';
import ROLES from '../../helper/roles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { createShallow } from '@material-ui/core/test-utils';
import { StyledComponentOA } from './PrOverallAssessment';

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
      />
    );

    expect(
      wrapper
        .find(FormControl)
        .find('[disabled]')
        .props().disabled
    ).toEqual(true);
  });
});
