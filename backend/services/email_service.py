import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from models.contact import ContactMessage
from config.settings import settings


class EmailService:
    """Service for sending email notifications"""
    
    @staticmethod
    def send_contact_notification(message: ContactMessage) -> bool:
        """
        Send email notification for contact form submission
        
        Args:
            message: ContactMessage object with form data
            
        Returns:
            bool: True if email sent successfully, False otherwise
        """
        try:
            # Create email message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f"Portfolio Contact: {message.subject or 'New Message'}"
            msg['From'] = settings.RECIPIENT_EMAIL
            msg['To'] = settings.RECIPIENT_EMAIL
            msg['Reply-To'] = message.email
            
            # Create HTML email body
            html_body = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
                            New Contact Form Submission
                        </h2>
                        
                        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p><strong style="color: #6366f1;">From:</strong> {message.name}</p>
                            <p><strong style="color: #6366f1;">Email:</strong> <a href="mailto:{message.email}">{message.email}</a></p>
                            <p><strong style="color: #6366f1;">Subject:</strong> {message.subject or 'No subject'}</p>
                        </div>
                        
                        <div style="background-color: #fff; padding: 20px; border-left: 4px solid #6366f1; margin: 20px 0;">
                            <h3 style="color: #6366f1; margin-top: 0;">Message:</h3>
                            <p style="white-space: pre-wrap;">{message.message}</p>
                        </div>
                        
                        <p style="color: #6b7280; font-size: 12px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
                            This email was sent from your portfolio contact form.
                        </p>
                    </div>
                </body>
            </html>
            """
            
            # Create plain text version
            text_body = f"""
New Contact Form Submission
{'='*50}

From: {message.name}
Email: {message.email}
Subject: {message.subject or 'No subject'}

Message:
{message.message}

{'='*50}
This email was sent from your portfolio contact form.
            """
            
            # Attach both versions
            part1 = MIMEText(text_body, 'plain')
            part2 = MIMEText(html_body, 'html')
            msg.attach(part1)
            msg.attach(part2)
            
            # Check if SMTP is configured
            if not settings.SMTP_PASSWORD:
                print(f"⚠️  SMTP password not configured. Email preview:")
                print(f"   From: {message.name} ({message.email})")
                print(f"   Subject: {message.subject}")
                print(f"   Message: {message.message}")
                return False
            
            # Send email
            print(f"🔍 SMTP Configuration:")
            print(f"   Server: {settings.SMTP_SERVER}:{settings.SMTP_PORT}")
            print(f"   Username: {settings.SMTP_USERNAME}")
            print(f"   Password configured: Yes")
            print(f"📧 Attempting to send email...")
            
            with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT, timeout=10) as server:
                server.set_debuglevel(0)
                server.starttls()
                server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
                server.send_message(msg)
            
            print(f"✅ Email successfully sent to {settings.RECIPIENT_EMAIL}")
            return True
            
        except smtplib.SMTPAuthenticationError as e:
            print(f"❌ SMTP Authentication Error: {str(e)}")
            print(f"   Check your Gmail app password is correct")
            print(f"   Make sure 2-Step Verification is enabled")
            return False
        except smtplib.SMTPException as e:
            print(f"❌ SMTP Error: {str(e)}")
            return False
        except Exception as e:
            print(f"❌ Unexpected error sending email: {type(e).__name__}: {str(e)}")
            return False
        finally:
            # Always log the message
            print(f"\n📨 Contact form submission:")
            print(f"   Name: {message.name}")
            print(f"   Email: {message.email}")
            print(f"   Subject: {message.subject}")
            print(f"   Message: {message.message}\n")


email_service = EmailService()
