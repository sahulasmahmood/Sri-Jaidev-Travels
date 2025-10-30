import { NextRequest, NextResponse } from "next/server";
import Lead from "@/config/utils/admin/lead/leadSchema";
import connectDB from "@/config/models/connectDB";
import EmailSMTP from "@/config/utils/admin/smtp/emailSMTPSchema";
import { createSMTPTransporter } from "@/config/models/connectSMTP";

// POST - Create new lead from frontend forms
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['fullName', 'phone', 'serviceType', 'pickupLocation', 'dropLocation', 'travelDate'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }
    
    const newLead = new Lead(body);
    const savedLead = await newLead.save();

    // Send email notification to admin
    try {
      await sendBookingNotification(savedLead);
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
      // Don't fail the API call if email fails, just log it
    }

    return NextResponse.json({
      success: true,
      data: savedLead,
      message: "Lead created successfully",
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    
    // Handle validation errors from mongoose
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: "Please check all required fields are filled correctly" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: "Failed to create lead" },
      { status: 500 }
    );
  }
}

// Function to send booking notification email to admin
async function sendBookingNotification(lead: any) {
  try {
    // Get SMTP configuration
    const smtpConfig = await EmailSMTP.findOne({
      id: "default",
      isActive: true,
    });

    if (!smtpConfig) {
      console.log("SMTP configuration not found or inactive - skipping email");
      return;
    }

    // Create transporter
    const transporter = createSMTPTransporter(smtpConfig);

    // Email content
    const emailSubject = `🚗 New Booking Request - ${lead.fullName}`;

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background-color: #f8fafc;">
        <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🚗 New Booking Request</h1>
          <p style="color: #fed7aa; margin: 10px 0 0 0; font-size: 16px;">Sri Jaidev Tours & Travels</p>
        </div>
        
        <div style="padding: 30px; background-color: white; margin: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <div style="border-left: 4px solid #f97316; padding-left: 20px; margin-bottom: 30px;">
            <h2 style="color: #2d3748; margin: 0 0 10px 0;">Booking Information</h2>
            <div style="background-color: #fff7ed; padding: 15px; border-radius: 8px;">
              <p style="margin: 5px 0;"><strong>Status:</strong> <span style="background-color: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${lead.status.toUpperCase()}</span></p>
              <p style="margin: 5px 0;"><strong>Priority:</strong> <span style="background-color: #ef4444; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${lead.priority.toUpperCase()}</span></p>
              <p style="margin: 5px 0;"><strong>Source:</strong> <span style="background-color: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${lead.source.toUpperCase()}</span></p>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
            <div>
              <h3 style="color: #2d3748; border-bottom: 2px solid #fed7aa; padding-bottom: 10px;">Customer Details</h3>
              <p style="margin: 10px 0;"><strong>Name:</strong> ${lead.fullName}</p>
              <p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${lead.phone}" style="color: #f97316;">${lead.phone}</a></p>
              ${lead.email ? `<p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${lead.email}" style="color: #f97316;">${lead.email}</a></p>` : ''}
              ${lead.passengers ? `<p style="margin: 10px 0;"><strong>Passengers:</strong> ${lead.passengers}</p>` : ''}
            </div>
            
            <div>
              <h3 style="color: #2d3748; border-bottom: 2px solid #fed7aa; padding-bottom: 10px;">Service Details</h3>
              <p style="margin: 10px 0;"><strong>Service:</strong> ${lead.serviceType}</p>
              <p style="margin: 10px 0;"><strong>Travel Date:</strong> ${new Date(lead.travelDate).toLocaleDateString('en-IN')}</p>
              ${lead.travelTime ? `<p style="margin: 10px 0;"><strong>Travel Time:</strong> ${lead.travelTime}</p>` : ''}
              ${lead.returnDate ? `<p style="margin: 10px 0;"><strong>Return Date:</strong> ${new Date(lead.returnDate).toLocaleDateString('en-IN')}</p>` : ''}
            </div>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="color: #2d3748; border-bottom: 2px solid #fed7aa; padding-bottom: 10px;">Trip Details</h3>
            <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px;">
              <p style="margin: 10px 0;"><strong>📍 Pickup Location:</strong> ${lead.pickupLocation}</p>
              <p style="margin: 10px 0;"><strong>📍 Drop Location:</strong> ${lead.dropLocation || 'Not specified'}</p>
            </div>
          </div>

          ${lead.message ? `
          <div style="margin-bottom: 30px;">
            <h3 style="color: #2d3748; border-bottom: 2px solid #fed7aa; padding-bottom: 10px;">Additional Information</h3>
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
              <p style="margin: 0; line-height: 1.6; color: #2d3748;">${lead.message}</p>
            </div>
          </div>
          ` : ''}

          ${lead.estimatedCost ? `
          <div style="margin-bottom: 30px;">
            <h3 style="color: #2d3748; border-bottom: 2px solid #fed7aa; padding-bottom: 10px;">Estimated Cost</h3>
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #2d3748;">${lead.estimatedCost}</p>
            </div>
          </div>
          ` : ''}

          <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #fed7aa;">
            <p style="color: #718096; margin: 0; font-size: 14px;">
              This email was automatically generated from Sri Jaidev Tours & Travels website.<br>
              Lead ID: #${lead._id}<br>
              Submitted at: ${new Date(lead.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
          </div>
        </div>
      </div>
    `;

    // Send email to admin
    const adminEmail = process.env.SMTP_FROM_EMAIL || smtpConfig.fromEmail;

    const mailOptions = {
      from: `"${smtpConfig.fromName}" <${smtpConfig.fromEmail}>`,
      to: adminEmail,
      subject: emailSubject,
      html: emailHTML,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Booking notification email sent:", result.messageId);

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error("Failed to send booking notification:", error);
    throw error;
  }
}