from fastapi import APIRouter
from models.contact import ContactMessage
from services.email_service import email_service

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("")
async def send_contact_message(message: ContactMessage):
    """Handle contact form submission and send email notification"""
    # Send email notification
    email_service.send_contact_notification(message)
    
    return {
        "status": "success",
        "message": "Thank you for your message! I'll get back to you soon."
    }
