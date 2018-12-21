import React from 'react';
import InfoWidget from './InfoWidget';
import { createShallow } from '@material-ui/core/test-utils';

describe('InfoWidget component', () => {
  let shallow = createShallow({ dive: false });

  it('should match snapshot', () => {
    let wrapper = shallow(
      <InfoWidget
        label={'PRs mit mir als Vorgesetzter insgesamt (inkl. Archiv)'}
        value={'3'}
        linkTo={'/prs'}
        onClick={() => {}}
        icon={'library_books'}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
