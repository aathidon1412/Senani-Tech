import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { name, email, phone, message, attachment, attachmentName } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields (name, email, message).' });
  }

  const host = process.env.SMTP_HOST;
  const portStr = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || `"SenaniTech Contact Form" <${user}>`;
  const to = process.env.SMTP_TO || 'info@senanitech.com';

  if (!host || !portStr || !user || !pass) {
    console.error('SMTP configuration error: missing required environment variables.');
    return res.status(500).json({ 
      error: 'Server is currently unable to send emails due to missing configuration.' 
    });
  }

  const port = parseInt(portStr, 10);
  const secure = port === 465;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    connectionTimeout: 8000,
    greetingTimeout: 5000,
    socketTimeout: 8000,
  });

  try {
    const mailOptions: any = {
      from,
      to,
      replyTo: email,
      subject: `New Message from ${name} via SenaniTech Contact Form`,
      text: `
You have received a new message from the SenaniTech contact form:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
  <h2 style="color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-top: 0;">
    New Message from Contact Form
  </h2>
  <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
    <tr>
      <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 120px;">Name:</td>
      <td style="padding: 8px 0; color: #0f172a;">${name}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
      <td style="padding: 8px 0; color: #0f172a;">
        <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
      <td style="padding: 8px 0; color: #0f172a;">${phone || '<i>Not provided</i>'}</td>
    </tr>
  </table>
  <div style="margin-top: 20px; padding: 15px; border-radius: 8px; background-color: #f8fafc; border: 1px solid #f1f5f9;">
    <h3 style="margin-top: 0; color: #475569; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
      Message Content
    </h3>
    <p style="color: #0f172a; line-height: 1.6; white-space: pre-wrap; margin-bottom: 0;">${message}</p>
  </div>
</div>
      `,
    };

    if (attachment && attachmentName) {
      mailOptions.attachments = [
        {
          filename: attachmentName,
          content: Buffer.from(attachment, 'base64'),
        },
      ];
    }

    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error: any) {
    console.error('Error sending SMTP email:', error);
    return res.status(500).json({ 
      error: 'Failed to send your message. Technical details: ' + (error.message || error) 
    });
  }
}
