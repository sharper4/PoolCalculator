import test from 'node:test';
import assert from 'node:assert/strict';

import { buildEmailPayload, buildGmailMessageRaw } from '../src/emailUtil.js';

test('buildEmailPayload creates a valid mailto URL for the customer', () => {
  const payload = buildEmailPayload({
    to: 'customer@example.com',
    subject: 'Pool Chemistry Analysis Report',
    reportHtml: '<h1>Pool Report</h1><p>Chlorine: 2 ppm</p>'
  });

  const parsed = new URL(payload.mailtoUrl);
  assert.equal(parsed.protocol, 'mailto:');
  assert.equal(parsed.pathname, 'customer@example.com');
  assert.equal(parsed.searchParams.get('subject'), 'Pool Chemistry Analysis Report');
  assert.ok(parsed.searchParams.get('body').includes('Pool Report'));
  assert.ok(parsed.searchParams.get('body').includes('Chlorine: 2 ppm'));
  assert.match(payload.textBody, /Pool Report/);
  assert.match(payload.textBody, /Chlorine: 2 ppm/);
});

test('buildGmailMessageRaw returns valid base64', () => {
  const raw = buildGmailMessageRaw({
    to: 'customer@example.com',
    subject: 'Pool Report',
    htmlBody: '<p>Hello from the pool app.</p>'
  });

  assert.match(raw, /^[A-Za-z0-9_+=-]+$/);
  assert.ok(raw.length > 0);
});
