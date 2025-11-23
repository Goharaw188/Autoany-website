# Quick EmailJS Setup - Get It Done in 5 Minutes

## Step 1: Sign Up (1 minute)
1. Go to: https://www.emailjs.com/
2. Click **"Sign Up"** (top right)
3. Use email/password OR sign in with Google (easiest)
4. Verify your email if needed

---

## Step 2: Add Gmail Service (2 minutes)
1. After logging in, you'll see the dashboard
2. Click **"Email Services"** in the left sidebar
3. Click **"Add New Service"** button (big blue button)
4. Click **"Gmail"**
5. Click **"Connect Account"**
6. Sign in with your Gmail account (the one where you want to receive emails)
7. Click **"Allow"** to give EmailJS permission
8. You'll see your Service ID - **COPY IT** (looks like `service_xxxxx`)

**✅ Save this:** Service ID = `service_xxxxx`

---

## Step 3: Create Email Template (1 minute)
1. Click **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. In the template editor:

**Template Name:** `AutoAny Contact Form`

**To Email:** YOUR Gmail address (where you want to receive emails)

**Subject:** `New Contact Form - AutoAny Website`

**Content (copy/paste this):**
```
New contact form submission from AutoAny website:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Phone: {{phone}}

Message:
{{message}}

---
Sent from AutoAny contact form
```

4. Click **"Save"** button
5. You'll see your Template ID - **COPY IT** (looks like `template_xxxxx`)

**✅ Save this:** Template ID = `template_xxxxx`

---

## Step 4: Get Public Key (30 seconds)
1. Click **"Account"** in the left sidebar (or your profile icon)
2. Click **"General"** tab
3. Find **"Public Key"** - **COPY IT** (long string of letters/numbers)

**✅ Save this:** Public Key = `xxxxxxxxxxxxxxxxxxxxx`

---

## Step 5: Add to Your Project (1 minute)
1. In your project folder, create a file named `.env` (exact name, no extension)
2. Location: `autoany-website-main/.env` (same folder as `package.json`)
3. Add these 3 lines (replace with YOUR values):

```
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Example:**
```
VITE_EMAILJS_SERVICE_ID=service_gmail123
VITE_EMAILJS_TEMPLATE_ID=template_abc456
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnop123456
```

4. **Save the file**

---

## Step 6: Restart Server (30 seconds)
1. Stop your dev server (Ctrl+C in terminal)
2. Run again: `npm run dev`
3. Open http://localhost:8080/
4. Navigate to Contact section
5. Fill out the form and submit
6. Check your Gmail inbox!

---

## That's It! 🎉

If the form shows an error, check:
- ✅ `.env` file exists in project root
- ✅ All 3 values are filled in correctly (no typos)
- ✅ You restarted the dev server after creating .env
- ✅ No spaces around the = sign
- ✅ No quotes around the values

---

## Need Help?

**Common Issues:**

1. **"EmailJS is not configured" error**
   - Make sure `.env` file is in the right place (project root, same as package.json)
   - Restart dev server after creating .env

2. **Form submits but no email**
   - Check EmailJS dashboard → "Logs" to see if email was sent
   - Check Gmail spam folder
   - Verify "To Email" in template is correct

3. **Can't find Public Key**
   - Dashboard → Account → General tab
   - Scroll down, it's there

---

**Done! Test it and let me know if it works.** 🚀
