import { formatDateForFrontend } from './date';
import moment from 'moment';

describe('formatDateForFrontend', () => {
  it('should render german date format ', () => {
    let testdate = moment('2018-03-05');

    let result = formatDateForFrontend(testdate);

    expect(result).toEqual('05.03.2018');
  });

  it('should return null if date is undefined ', () => {
    let testdate = undefined;

    let result = formatDateForFrontend(testdate);

    expect(result).toBeNull();
  });

  it('should render german date if it is a valid date string', () => {
    let testdate = '2018-03-05';

    let result = formatDateForFrontend(testdate);

    expect(result).toEqual('05.03.2018');
  });

  it('should render german date if it is a valid date object', () => {
    let testdate = new Date(2018, 2, 5);

    let result = formatDateForFrontend(testdate);

    expect(result).toEqual('05.03.2018');
  });

  it('should return null if date is invalid', () => {
    let testdate = '2017-11-31';

    let result = formatDateForFrontend(testdate);

    expect(result).toEqual(null);
  });
});
