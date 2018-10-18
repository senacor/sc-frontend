import React from 'react';
import PrTextField from './PrTextField';
import { createShallow } from '@material-ui/core/test-utils';
import { textFieldEnum } from '../../helper/textFieldEnum';

describe('PrTextField Component', () => {
  let shallow = createShallow({ dive: true });

  it('should render the disabled mode', () => {
    let cut = shallow(<PrTextField state={textFieldEnum.DISABLED} />);

    expect(cut).toMatchSnapshot();
  });

  it('should render the enabled mode', () => {
    let cut = shallow(
      <PrTextField
        state={textFieldEnum.ENABLED}
        value={'This is writeable text!'}
      />
    );

    expect(cut).toMatchSnapshot();
  });

  it('should render the error mode', () => {
    let cut = shallow(<PrTextField state={textFieldEnum.ERROR} />);

    expect(cut).toMatchSnapshot();
  });

  it('should render the readonly mode', () => {
    let cut = shallow(
      <PrTextField
        state={textFieldEnum.READONLY}
        value={'This is read-only text!'}
      />
    );

    expect(cut).toMatchSnapshot();
  });
});
