# Fix EmailJS Gmail Authentication Error (412)

## Error: "Request had insufficient authentication scopes"

This means your Gmail service in EmailJS doesn't have the right permissions.

## Quick Fix (2 minutes):

### Option 1: Reconnect Gmail Service (Recommended)

1. Go to EmailJS dashboard: https://www.emailjs.com/
2. Click **"Email Services"** in left sidebar
3. Find your Gmail service
4. Click the **3 dots menu** (or "Edit" button)
5. Click **"Reconnect Account"** or **"Update"**
6. Click **"Connect Account"** again
7. Sign in with your Gmail account
8. **IMPORTANT:** When Google asks for permissions, make sure you:
   - Grant **ALL** requested permissions
   - Check "Allow" for everything
   - Don't skip any permission requests
9. Click **"Allow"** / **"Continue"**
10. Save the service

**Try the form again - it should work now!**

---

### Option 2: Delete and Recreate Gmail Service

If Option 1 doesn't work:

1. Go to EmailJS dashboard → **"Email Services"**
2. Find your Gmail service
3. Click **"Delete"** (remove it)
4. Click **"Add New Service"** again
5. Select **"Gmail"**
6. Click **"Connect Account"**
7. Sign in with your Gmail account
8. **Make sure to grant ALL permissions** Google asks for
9. Allow EmailJS to send emails on your behalf
10. Copy the new Service ID
11. Update your `.env` file with the new Service ID
12. Restart dev server

---

### Option 3: Use Gmail SMTP Instead (More Reliable)

If Gmail OAuth keeps giving issues, use SMTP:

1. In EmailJS dashboard → **"Email Services"**
2. Delete the current Gmail service
3. Click **"Add New Service"**
4. Select **"Gmail"** → **"Gmail SMTP"** (if available)
   OR select **"SMTP"** → Configure manually:
   - Host: `smtp.gmail.com`
   - Port: `587`
   - Username: Your Gmail address
   - Password: Gmail App Password (not regular password!)

**For Gmail App Password:**
1. Go to your Google Account settings
2. Security → 2-Step Verification (enable if not enabled)
3. Search for "App passwords"
4. Generate a new app password for "Mail"
5. Use that 16-character password (not your regular Gmail password)

---

## Why This Happens

Google requires specific permissions (scopes) to send emails. If EmailJS didn't get all permissions when you connected, you'll get this error.

---

## Test After Fixing

1. Make sure your `.env` file has the correct Service ID
2. Restart your dev server: `npm run dev`
3. Test the form
4. Check EmailJS dashboard → "Logs" to see if email was sent
5. Check your Gmail inbox

---

**Try Option 1 first - it's the quickest fix!** 🚀
