// utils/nodemailerClient.js - Resend version with testing email

const RESEND_API_URL = 'https://api.resend.com/emails';

// In testing mode Resend allows only your own email
const TEST_EMAIL = process.env.TEST_EMAIL || 'lochankr12@gmail.com';

const sendEmail = async ({ to, subject, html }) => {
  // Resend free/test: always send to your own email
  const actualRecipient = TEST_EMAIL;

  try {
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev', // default Resend "from"
        to: [actualRecipient],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Resend API error:', res.status, text);
      throw new Error(`Resend failed with status ${res.status}`);
    }

    console.log(
      `Reset email sent via Resend. Requested to: ${to}, actually sent to: ${actualRecipient}`
    );
  } catch (err) {
    console.error('Reset email error (Resend):', err);
    throw err;
  }
};

module.exports = sendEmail;
