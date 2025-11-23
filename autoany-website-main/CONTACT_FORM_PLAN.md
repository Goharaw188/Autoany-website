# Contact Form & Email Integration Plan

## Goals
1. ✅ Remove LogoLoader component
2. ✅ Add Contact Form section to website
3. ✅ Connect form to Gmail via EmailJS

---

## Email Integration Options

### Option 1: EmailJS (Recommended - Client-Side)
**How it works:**
- Client-side email service (no backend needed)
- Sends emails directly from browser
- Can send to any email (Gmail, etc.)
- Free tier: 200 emails/month

**Setup:**
1. Sign up at https://www.emailjs.com/
2. Create an email service (Gmail SMTP)
3. Get Service ID, Template ID, and Public Key
4. Install `@emailjs/browser` package
5. Configure form to send via EmailJS

**Pros:**
- No backend required
- Easy setup
- Free for small sites
- Works with any email provider

**Cons:**
- Requires EmailJS account
- API keys exposed in frontend (safe for this use case)

### Option 2: Formspree / FormSubmit (Alternative)
- Simple form services
- Free tier available
- Just needs form action URL

---

## Implementation Steps

### Step 1: Remove LogoLoader
- Remove LogoLoader import from App.tsx
- Remove loading state logic
- Remove LogoLoader component usage
- Make content show immediately

### Step 2: Create Contact Form Component
**Location:** `src/components/ContactForm.tsx`

**Form Fields:**
- Name (required)
- Email (required, validation)
- Company (optional)
- Phone (optional)
- Message (required)
- Service Interest (optional dropdown)

**Design:**
- Clean, minimalist form matching site style
- Use existing shadcn form components
- White/black theme with accent color #41B8D5

### Step 3: Add Contact Section
**Location:** After TrustBuilder section

**Layout:**
- Two-column layout on desktop
- Left: Form
- Right: Contact info or CTA text (optional)

### Step 4: EmailJS Integration
1. Install package: `npm install @emailjs/browser`
2. Create EmailJS service configuration
3. Set up email template in EmailJS dashboard
4. Configure form submission handler

### Step 5: Update Navigation
- Add "Contact" link to navigation menu

---

## Form Structure

```
┌─────────────────────────────────────┐
│  Get In Touch                       │
│  Ready to transform your business?  │
│                                     │
│  ┌──────────┐  ┌──────────┐       │
│  │  Name *  │  │ Email *  │       │
│  └──────────┘  └──────────┘       │
│  ┌──────────┐  ┌──────────┐       │
│  │ Company  │  │  Phone   │       │
│  └──────────┘  └──────────┘       │
│  ┌──────────────────────────┐     │
│  │  Message *               │     │
│  │                          │     │
│  └──────────────────────────┘     │
│  [Submit Button]                   │
└─────────────────────────────────────┘
```

---

## Email Configuration

### EmailJS Setup Steps:
1. **Create EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up (free)

2. **Add Email Service**
   - Dashboard → Email Services
   - Add Gmail service
   - Connect your Gmail account
   - Note the Service ID

3. **Create Email Template**
   - Dashboard → Email Templates
   - Create new template
   - Use variables: {{name}}, {{email}}, {{company}}, {{phone}}, {{message}}
   - Set "To Email" to your Gmail address
   - Note the Template ID

4. **Get Public Key**
   - Dashboard → Account → General
   - Copy Public Key

5. **Environment Variables** (Optional)
   - Store keys in `.env` file:
     ```
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
     ```

---

## Next Steps After Implementation

1. **Test form submission**
2. **Check email delivery**
3. **Add success/error messages**
4. **Optional: Add reCAPTCHA for spam protection**

---

**Ready to implement!** 🚀
