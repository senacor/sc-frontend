import styles from './MyPRListStyle';

describe('MyPRList Style storage', () => {
  it('should exist and take a theme as property', () => {
    const theme_mock = {
      palette: {
        background: { paper: 1 },
        primary: {
          '50': 50,
          '100': 100,
          '200': 200,
          '300': 300,
          '400': 400
        }
      }
    };

    let result = styles(theme_mock);

    expect(result).toMatchSnapshot();
  });
});
