import React from 'react';
import { shallow } from 'enzyme';
import { RequestPerformanceReview } from './RequestPerformanceReview';

describe('RequestPerformanceReview', () => {
  it('should match snapshot', () => {
    let cut = shallow(<RequestPerformanceReview />);

    expect(cut).toMatchSnapshot();
  });

  it('should redirect to prDetail if newPrId is set', () => {
    let cut = shallow(<RequestPerformanceReview newPrId={42} />);

    expect(cut.find('Redirect').props().to).toEqual('/prDetail/42');
  });

  it('should not redirect to prDetail if newPrId is not set', () => {
    let cut = shallow(<RequestPerformanceReview />);

    expect(cut.find('Redirect')).toHaveLength(0);
  });
});
