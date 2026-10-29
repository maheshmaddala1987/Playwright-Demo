import { mergeTests } from '@playwright/test';
import { test as browserFixtures } from './browserFixtures';
import { test as pageobjectfixture } from './pageobjectfixture';
import {test as authenticatedfixture } from './authenticatedfixture';
import { test as apiFixtures } from './apiFixtures';

export const test = mergeTests(
  browserFixtures,
  pageobjectfixture,
  authenticatedfixture,
  apiFixtures
);