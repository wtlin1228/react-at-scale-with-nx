import { render } from '@testing-library/react';
import { server } from '@bg-hoard/test/util-mock-games-api';
import StoreFeatureGameDetail from './store-feature-game-detail';

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen();
});
afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close();
});

describe('StoreFeatureGameDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StoreFeatureGameDetail />);
    expect(baseElement).toBeTruthy();
  });
});
