
import { test as base, request, type APIRequestContext } from '@playwright/test';

export const test = base.extend<{ api: APIRequestContext }>({
  api: async ({}, use) => {
    // Create API client
    const api = await request.newContext();
    
    // Use the API client
    try {
      await use(api);
    } finally {
      await api.dispose();
    }
  },
});