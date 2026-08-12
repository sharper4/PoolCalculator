export function buildEmailPayload({ to, subject, reportHtml }) {
  const textBody = [
    'North Texas Elite Pool Care',
    '',
    'Pool Chemistry Analysis Report',
    '',
    reportHtml
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<li>/gi, '\n- ')
      .replace(/<[^>]+>/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\s+\n/g, '\n')
      .trim(),
    ''
  ].join('\n');

  const params = new URLSearchParams({
    subject,
    body: textBody
  });

  return {
    mailtoUrl: `mailto:${to}?${params.toString()}`,
    textBody
  };
}

export function buildHtmlEmailDocument({ subject, reportHtml }) {
  const safeReportHtml = String(reportHtml || '').trim();
  const style = `
    <style>
      body {
        margin: 0;
        padding: 24px;
        background: #edf3fb;
        color: #071b43;
        font-family: 'Segoe UI', Arial, sans-serif;
      }
      .report-sheet {
        max-width: 760px;
        background: #ffffff;
        border: 1px solid #bdd2ee;
        border-radius: 14px;
        padding: 22px;
        box-shadow: 0 14px 28px rgba(7, 27, 67, 0.08);
        color: #071b43;
      }
      .report-sheet * {
        box-sizing: border-box;
      }
      .report-sheet h2,
      .report-sheet h3,
      .report-sheet p,
      .report-sheet ul,
      .report-sheet li,
      .report-sheet td,
      .report-sheet th,
      .report-sheet span,
      .report-sheet strong {
        color: #071b43;
      }
      .report-sheet table {
        width: 100%;
        border-collapse: collapse;
      }
      .report-sheet img {
        max-width: 100%;
        height: auto;
        display: block;
      }
      .report-sheet .report-brand-text {
        font-weight: 700;
        font-size: 15px;
        color: #0e4f97;
        letter-spacing: 0.02em;
        white-space: nowrap;
      }
      .report-sheet textarea,
      .report-sheet .report-notes {
        width: 100%;
        min-height: 72px;
        white-space: pre-wrap;
        line-height: 1.5;
        padding: 8px 10px;
        border: 1px solid #c7d8ee;
        border-radius: 6px;
        background: #f9fbff;
        font-family: 'Segoe UI', Arial, sans-serif;
        color: #071b43;
      }
      .report-sheet th,
      .report-sheet td {
        border: 1px solid #c7d8ee;
        padding: 8px 10px;
        text-align: left;
        vertical-align: top;
      }
      .report-sheet th {
        background: #edf5ff;
      }
      .report-sheet .report-header {
        border-bottom: 2px solid #0e4f97;
        padding-bottom: 12px;
        margin-bottom: 16px;
      }
      .report-sheet .report-meta {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px 20px;
        margin: 12px 0;
      }
      .report-sheet .report-block {
        margin-top: 16px;
        border-top: 1px solid #cedcf0;
        padding-top: 12px;
      }
      .report-sheet .check-row,
      .report-sheet .check-list {
        margin: 10px 0 0;
      }
      .report-sheet .check-row label,
      .report-sheet .check-list li {
        display: block;
        margin: 4px 0;
      }
      .report-sheet .report-two-col {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 20px;
      }
      @media screen and (max-width: 640px) {
        body { padding: 12px; }
        .report-sheet { padding: 14px; }
        .report-sheet .report-meta,
        .report-sheet .report-two-col {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${subject}</title>
    ${style}
  </head>
  <body>
    ${safeReportHtml}
  </body>
</html>`;
}

export function buildGmailMessageRaw({ to, subject, htmlBody, imageDataUrl = '', inlineImages = [] }) {
  const images = Array.isArray(inlineImages) && inlineImages.length > 0
    ? inlineImages
    : imageDataUrl
      ? [{ cid: 'report-screenshot', dataUrl: imageDataUrl, filename: 'report-screenshot.png' }]
      : [];

  if (images.length > 0) {
    const boundary = 'poolcalc-report-boundary';
    const htmlBase64 = btoa(unescape(encodeURIComponent(htmlBody)));
    const parts = [
      `To: ${to}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      `Content-Type: multipart/related; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      'Content-Type: text/html; charset=UTF-8',
      'Content-Transfer-Encoding: base64',
      '',
      htmlBase64,
      ''
    ];

    images.forEach(({ cid, dataUrl, filename }) => {
      const base64Image = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
      parts.push(
        `--${boundary}`,
        `Content-Type: image/png; name="${filename}"`,
        'Content-Transfer-Encoding: base64',
        `Content-ID: <${cid}>`,
        `Content-Disposition: inline; filename="${filename}"`,
        '',
        base64Image,
        ''
      );
    });

    parts.push(`--${boundary}--`);
    const mimeBody = parts.join('\r\n');
    return btoa(unescape(encodeURIComponent(mimeBody)));
  }

  const headers = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8'
  ].join('\r\n');

  const raw = `${headers}\r\n\r\n${htmlBody}`;
  return btoa(unescape(encodeURIComponent(raw)));
}
