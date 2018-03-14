import { formatMomentForFrontend } from './date';
import moment from 'moment';

describe('formatMomentForFrontend', () => {
  it('should render german date format ', () => {
    let testdate = moment('2018-03-05');

    let result = formatMomentForFrontend(testdate);

    expect(result).toEqual('05.03.2018');
  });

  it('should return null if date is undefined ', () => {
    let testdate = undefined;

    let result = formatMomentForFrontend(testdate);

    expect(result).toBeNull();
  });
});
