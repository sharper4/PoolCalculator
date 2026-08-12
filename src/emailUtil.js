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

export function buildGmailMessageRaw({ to, subject, htmlBody }) {
  const headers = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8'
  ].join('\r\n');

  const raw = `${headers}\r\n\r\n${htmlBody}`;
  return btoa(unescape(encodeURIComponent(raw)));
}
