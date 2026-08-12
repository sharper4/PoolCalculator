import test from 'node:test';
import assert from 'node:assert/strict';

import { buildEmailPayload, buildGmailMessageRaw } from '../src/emailUtil.js';

test('buildEmailPayload creates a valid mailto URL for the customer', () => {
  const payload = buildEmailPayload({
    to: 'customer@example.com',
    subject: 'Pool Chemistry Analysis Report',
    reportHtml: '<h1>Pool Report</h1><p>Chlorine: 2 ppm</p>'
  });

  assert.equal(payload.mailtoUrl.startsWith('mailto:customer@example.com?'), true);
  assert.ok(payload.mailtoUrl.includes('subject=Pool%20Chemistry%20Analysis%20Report'));
  assert.ok(payload.mailtoUrl.includes('body='));
  assert.match(payload.textBody, /Pool Report/);
  assert.match(payload.textBody, /Chlorine: 2 ppm/);
});

test('buildGmailMessageRaw returns URL-safe base64', () => {
  const raw = buildGmailMessageRaw({
    to: 'customer@example.com',
    subject: 'Pool Report',
    htmlBody: '<p>Hello from the pool app.</p>'
  });

  assert.match(raw, /^[A-Za-z0-9_-]+$/);
  assert.ok(raw.length > 0);
});
