import colors from './colors';

describe('colors', () => {
  it('should create a mui theme', () => {
    expect(colors).toMatchSnapshot();
  });
});
