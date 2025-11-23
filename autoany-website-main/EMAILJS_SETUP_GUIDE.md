# EmailJS Setup Guide for Gmail Integration

## Step-by-Step Instructions

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up" (free account)
3. Complete registration

### Step 2: Add Gmail Email Service
1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**
5. Sign in with your Gmail account
6. Authorize EmailJS to send emails
7. **Copy the Service ID** (you'll need this)

### Step 3: Create Email Template
1. Go to **"Email Templates"** in dashboard
2. Click **"Create New Template"**
3. Use this template structure:

**Template Name:** AutoAny Contact Form

**Subject:** New Contact Form Submission from AutoAny Website

**Content:**
```
You have a new message from your AutoAny website contact form.

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Phone: {{phone}}

Message:
{{message}}

---
This email was sent from the AutoAny contact form.
```

4. Set **"To Email"** to your Gmail address (where you want to receive form submissions)
5. Set **"From Name"** to "AutoAny Website"
6. Click **"Save"**
7. **Copy the Template ID** (you'll need this)

### Step 4: Get Public Key
1. Go to **"Account"** → **"General"** tab
2. Find **"Public Key"**
3. **Copy the Public Key** (you'll need this)

### Step 5: Configure Environment Variables
1. In your project root directory, create a file named `.env`
2. Add these lines (replace with your actual values):

```
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

**Example:**
```
VITE_EMAILJS_SERVICE_ID=service_gmail123
VITE_EMAILJS_TEMPLATE_ID=template_abc456
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnopqrstuvwxyz123456
```

3. **Restart your dev server** after creating the .env file:
   ```bash
   npm run dev
   ```

### Step 6: Test the Form
1. Open your website (http://localhost:8080)
2. Navigate to Contact section
3. Fill out the form
4. Submit and check your Gmail inbox

---

## Troubleshooting

### "EmailJS is not configured" Error
- Make sure you created `.env` file in the project root
- Check that all three variables are set correctly
- Restart the dev server after creating/updating .env file

### Emails Not Arriving
- Check your Gmail inbox (including spam)
- Verify the "To Email" in your EmailJS template is correct
- Check EmailJS dashboard → "Logs" to see if emails were sent
- Verify your Gmail service is connected in EmailJS

### Form Not Submitting
- Check browser console for errors
- Verify EmailJS credentials are correct
- Check network tab for failed requests

---

## EmailJS Free Tier Limits
- 200 emails per month (free tier)
- Upgrade available if needed

---

## Security Note
- The Public Key is safe to expose in frontend code
- It only allows sending emails through your configured service
- Never share your Private Key (if you upgrade)

---

**That's it! Your contact form is now connected to Gmail.** 🎉

