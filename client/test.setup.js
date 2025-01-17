import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
