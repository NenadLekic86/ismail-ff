import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'postmark';

// Initialize Postmark client - MUST use environment variable for security
const client = new Client(process.env.POSTMARK_SERVER_TOKEN as string);

if (!process.env.POSTMARK_SERVER_TOKEN) {
  throw new Error('POSTMARK_SERVER_TOKEN environment variable is required');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Send email via Postmark
    const result = await client.sendEmail({
      From: process.env.POSTMARK_FROM_EMAIL || 'noreply@yourdomain.com', // You'll need to set this
      To: process.env.POSTMARK_TO_EMAIL || 'your-email@yourdomain.com', // You'll need to set this
      Subject: `New Contact Form Submission from ${name}`,
      HtmlBody: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This message was sent from your website contact form.</em></p>
      `,
      TextBody: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        ${phone ? `Phone: ${phone}` : ''}
        
        Message:
        ${message}
        
        ---
        This message was sent from your website contact form.
      `,
      ReplyTo: email, // This allows you to reply directly to the sender
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been sent successfully!',
        messageId: result.MessageID 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}
