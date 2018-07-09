import React from 'react';
import { shallow } from 'enzyme';
import Translate, { translateContent, translationMap } from './Translate';

describe('Translate component', () => {
  it('should translate ON_DEMAND to "Auf Nachfrage"', () => {
    let cut = shallow(<Translate content="ON_DEMAND" />);

    expect(cut.text()).toEqual('Auf Nachfrage');
  });
});

describe('translateContent function', () => {
  it('should translate ON_DEMAND to "Auf Nachfrage"', () => {
    let result = translateContent('ON_DEMAND');

    expect(result).toEqual('Auf Nachfrage');
  });

  it('should throw an Error if key is invalid', () => {
    expect(() => {
      translateContent('NONSENSE');
    }).toThrow();
  });
});

describe('translationMap', () => {
  it('should be sorted alphabetically ascending', () => {
    const result = Object.keys(translationMap).sort();

    expect(result).toEqual(Object.keys(translationMap));
  });
});
