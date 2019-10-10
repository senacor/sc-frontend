import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';

import EmployeesPRsDialog from './EmployeesPRsDialog';

describe('EmployeesPRsDialog', () => {
  let wrapper;
  it('should render correctly', () => {
    wrapper = shallowWithIntl(<EmployeesPRsDialog />);
    expect(wrapper).toMatchSnapshot();
  });
});
