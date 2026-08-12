import test from 'node:test';
import assert from 'node:assert/strict';

import { buildEmailPayload, buildGmailMessageRaw, buildHtmlEmailDocument } from '../src/emailUtil.js';

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

test('buildGmailMessageRaw embeds an inline screenshot when provided', () => {
  const raw = buildGmailMessageRaw({
    to: 'customer@example.com',
    subject: 'Pool Report',
    htmlBody: '<img src="cid:report-screenshot" />',
    imageDataUrl: 'data:image/png;base64,AAAA'
  });

  assert.match(raw, /^[A-Za-z0-9_+=-]+$/);
  assert.ok(raw.length > 0);

  const decoded = Buffer.from(raw, 'base64').toString('utf8');
  assert.match(decoded, /poolcalc-report-boundary|report-screenshot|image\/png/i);
});

test('buildHtmlEmailDocument keeps the printed report layout in HTML email format', () => {
  const html = buildHtmlEmailDocument({
    subject: 'Pool Chemistry Analysis Report',
    reportHtml: '<article class="report-sheet"><h2>Water Quality Report</h2><p>Test result</p></article>'
  });

  assert.match(html, /<style>/i);
  assert.match(html, /report-sheet/i);
  assert.match(html, /Water Quality Report/i);
  assert.match(html, /font-family:/i);
  assert.match(html, /@media\s+screen/i);
});
