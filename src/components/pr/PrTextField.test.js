import React from 'react';
import PrTextField from './PrTextField';
import { createShallow } from '@material-ui/core/test-utils';

describe('PrTextField Component', () => {
  let shallow = createShallow({ dive: true });
  let readOnlyText = 'this is only to be read';
  let writeableText = 'we can write on this';
  let value = cut => {
    return cut.map(field => field.get(0).props.children[1].props.value);
  };
  let disabled = cut => {
    return cut.map(field => field.get(0).props.disabled);
  };
  let readOnly = cut => {
    return cut.map(field => field.get(0).props.children[1].props.readOnly);
  };
  let error = cut => {
    return cut.map(field => field.get(0).props.error);
  };

  it('should be disabled for nonActionPerformer before it is released as read-only', () => {
    let cut = shallow(
      <PrTextField
        readOnlyText={readOnlyText}
        writeableText={writeableText}
        nonActionPerformer
      />
    );

    expect(value(cut)).toEqual(['']);
    expect(disabled(cut)).toEqual([true]);
    expect(cut).toMatchSnapshot();
  });

  it('should be disabled for ActionPerformer before editing is enabled', () => {
    let cut = shallow(
      <PrTextField
        readOnlyText={readOnlyText}
        writeableText={writeableText}
        isActionPerformer
      />
    );

    expect(value(cut)).toEqual(['']);
    expect(disabled(cut)).toEqual([true]);
    expect(cut).toMatchSnapshot();
  });

  it('should be disabled for ActionPerformer when it is released as read-only, but there is no entry', () => {
    let cut = shallow(
      <PrTextField
        readOnlyText={''}
        writeableText={writeableText}
        isActionPerformer
        readOnlyFlag
      />
    );

    expect(value(cut)).toEqual(['']);
    expect(disabled(cut)).toEqual([true]);
    expect(cut).toMatchSnapshot();
  });

  it('should be disabled for nonActionPerformer when it is released as read-only, but there is a null-entry', () => {
    let cut = shallow(
      <PrTextField
        readOnlyText={null}
        writeableText={writeableText}
        nonActionPerformer
        readOnlyFlag
      />
    );

    expect(value(cut)).toEqual(['']);
    expect(disabled(cut)).toEqual([true]);
    expect(cut).toMatchSnapshot();
  });

  it('should be in read-only-mode for ActionPerformer when it is released as read-only and the entry is non-zero', () => {
    let cut = shallow(
      <PrTextField
        readOnlyText={readOnlyText}
        writeableText={writeableText}
        isActionPerformer
        readOnlyFlag
      />
    );

    expect(value(cut)).toEqual(['this is only to be read']);
    expect(readOnly(cut)).toEqual([true]);
    expect(cut).toMatchSnapshot();
  });

  it('should be in read-only-mode for nonActionPerformer when it is released as read-only and the entry is non-zero', () => {
    let cut = shallow(
      <PrTextField
        readOnlyText={readOnlyText}
        writeableText={writeableText}
        nonActionPerformer
        readOnlyFlag
      />
    );

    expect(value(cut)).toEqual(['this is only to be read']);
    expect(readOnly(cut)).toEqual([true]);
    expect(cut).toMatchSnapshot();
  });

  it('should be in error-mode for ActionPerformer when it has an errorFlag and there is no entry', () => {
    let cut = shallow(
      <PrTextField
        readOnlyText={readOnlyText}
        writeableText={''}
        isActionPerformer
        errorFlag
        openEditing
      />
    );

    expect(error(cut)).toEqual([true]);
    expect(value(cut)).toEqual(['']);
    expect(cut).toMatchSnapshot();
  });

  it('should not be in error-mode but in standard enabled mode for ActionPerformer when it has an errorFlag and there is an entry', () => {
    let cut = shallow(
      <PrTextField
        readOnlyText={readOnlyText}
        writeableText={writeableText}
        isActionPerformer
        errorFlag
        openEditing
      />
    );

    expect(value(cut)).toEqual(['we can write on this']);
    expect(cut).toMatchSnapshot();
  });

  it('should be in standard enabled mode for ActionPerformer when editing is open and it is not released as read-only', () => {
    let cut = shallow(
      <PrTextField
        readOnlyText={readOnlyText}
        writeableText={writeableText}
        isActionPerformer
        openEditing
      />
    );

    expect(value(cut)).toEqual(['we can write on this']);
    expect(cut).toMatchSnapshot();
  });

  /*
  //null test does not work: TypeError: ShallowWrapper::dive() can only be called on components
  it('should not show anything if the user is neither ActionPerformer nor nonActionPerformer', () => {
    let cut = shallow(
      <PrTextField readOnlyText={readOnlyText} writeableText={writeableText} />
    );

    expect(cut.map(field => field.get(0))).toEqual([null]);
    expect(cut).toMatchSnapshot();
  });
  */
});
