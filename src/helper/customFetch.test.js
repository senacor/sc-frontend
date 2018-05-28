import { default as customFetch } from './customFetch';
import fetchMock from 'fetch-mock';

describe('Custom Fetch', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('access_token', 'staticAccessToken');
  });

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should extend given headers with authorization token header and content-type', async () => {
    let data = {
      body: 'body',
      method: 'post'
    };
    fetchMock.postOnce('http://localhost:3000', data);

    await customFetch('http://localhost:3000', {
      body: 'body',
      method: 'post',
      headers: {
        customHeader: 'should be present'
      }
    });

    expect(fetchMock.called('http://localhost:3000')).toBe(true);
    expect(fetchMock.lastOptions('http://localhost:3000', 'post')).toEqual({
      body: 'body',
      headers: {
        Authorization: 'Bearer staticAccessToken',
        'Content-Type': 'application/json',
        customHeader: 'should be present'
      },
      method: 'post'
    });
  });
});
