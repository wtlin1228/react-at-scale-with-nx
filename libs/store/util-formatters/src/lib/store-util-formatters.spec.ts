import { formatRating } from './store-util-formatters';

describe('formatRating', () => {
  it('should work', () => {
    expect(formatRating(0.75)).toEqual('7.5 / 10');
  });
});
