import React from 'react';
import PrStatusActionButton from './PrStatusActionButton';
import { createShallow } from '@material-ui/core/test-utils';

describe('PerformanceReviewDetail Component', () => {
  let shallow = createShallow({ dive: true });

  const mockReleaseButtonClick = jest.fn();

  it('should match snapshot', () => {
    const component = shallow(
      <PrStatusActionButton
        label={'Freigabe'}
        releaseButtonClick={mockReleaseButtonClick}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
