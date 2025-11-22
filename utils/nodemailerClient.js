// utils/nodemailerClient.js (now using Resend instead of nodemailer)

const RESEND_API_URL = 'https://api.resend.com/emails';

const sendEmail = async ({ to, subject, html }) => {
  try {
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev', // Resend default "from", no domain setup needed
        to: [to],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Resend API error:', res.status, text);
      throw new Error(`Resend failed with status ${res.status}`);
    }

    console.log('Reset email sent via Resend to:', to);
  } catch (err) {
    console.error('Reset email error (Resend):', err);
    throw err; // controller will return 500 to frontend
  }
};

module.exports = sendEmail;
