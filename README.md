# NodeEvents - Real-World Event-Driven Email System

A practical Node.js application demonstrating the **Event Emitter pattern** with real email notifications. Perfect for learning event-driven architecture!

## 🎯 What This Project Does

This application simulates an **order processing system** where a single event (`orderCreated`) triggers multiple independent services:

```
orderCreated event
│
├── 📦 Inventory Service    → Reserves stock
├── 💳 Billing Service      → Processes payment
├── 📊 Analytics Service    → Records order data
└── 📧 Email Service        → Sends confirmation email (via Gmail)
```

When an order is placed, all services respond automatically and independently!

## ✨ Features

✅ **Event-Driven Architecture** - Loosely coupled, highly scalable design
✅ **Real Gmail Integration** - Actually sends email confirmations
✅ **Multiple Services** - Inventory, Billing, Analytics, Email
✅ **Secure Credentials** - Uses `.env` and `.gitignore` to protect secrets
✅ **Error Handling** - Graceful failure handling for email issues
✅ **SMTP Verification** - Confirms email connection on startup

## 📁 Project Structure

```
nodeevents/
├── app.js                  # Main application with OrderSystem
├── package.json            # Dependencies (nodemailer, dotenv)
├── package-lock.json       # Dependency lock file
├── .env                    # Your Gmail credentials (NOT in repo)
├── .env.example            # Template for .env setup
├── .gitignore              # Prevents .env from being committed
└── README.md               # This file
```

## 🚀 Quick Start

### 1. Clone or Setup Project

```bash
# If cloning from GitHub
git clone https://github.com/YOUR_USERNAME/nodeevents.git
cd nodeevents

# Or create from scratch
mkdir nodeevents
cd nodeevents
npm init -y
npm install nodemailer dotenv
```

### 2. Setup Gmail Credentials

#### Step A: Enable 2-Step Verification

1. Go to: https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)

#### Step B: Create App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select **Mail** and **Windows Computer** (or your device)
3. Google generates a **16-character password**
4. Copy it immediately

#### Step C: Create `.env` File

```bash
cp .env.example .env
```

Edit `.env`:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

**⚠️ IMPORTANT:** Never commit `.env` to GitHub. It's protected by `.gitignore`.

### 3. Install Dependencies

```bash
npm install
```

This installs:
- **nodemailer** - Sends emails via SMTP
- **dotenv** - Loads environment variables from `.env`

### 4. Run the Application

```bash
node app.js
```

### 5. Expected Output

```
SMTP Server is ready

===== NEW ORDER =====

[Inventory] Reserving 3 x Notebook
[Billing] Charging customer $15
[Analytics] Order recorded
[Email] Confirmation sent to inmousom@gmail.com
[Email] Message ID: <message-id>
```
<img width="1602" height="776" alt="Screenshot 2026-08-30 201717" src="https://github.com/user-attachments/assets/95d4aeba-7c28-4604-b6bb-721bf0fc37e5" />


**Check your email!** You should receive an order confirmation. 📧

## 📖 How It Works

### Event Emitter Pattern

Node.js `EventEmitter` allows one event to trigger multiple independent listeners:

```javascript
// Single event emission
orders.emit("orderCreated", order);

// Multiple listeners respond
orders.on("orderCreated", (order) => {
  // Inventory Service
});

orders.on("orderCreated", (order) => {
  // Billing Service
});

orders.on("orderCreated", async (order) => {
  // Email Service
});
```

### The Services

| Service | Function | Output |
|---------|----------|--------|
| **Inventory** | Reserves items | `[Inventory] Reserving X items` |
| **Billing** | Charges customer | `[Billing] Charging customer $X` |
| **Analytics** | Records data | `[Analytics] Order recorded` |
| **Email** | Sends confirmation | `[Email] Confirmation sent to...` |

### Gmail SMTP Configuration

```javascript
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,      // your-email@gmail.com
    pass: process.env.EMAIL_PASSWORD,  // 16-char app password
  },
});
```

## 🎨 Customization

### Modify Demo Order

Edit the order at the bottom of `app.js`:

```javascript
placeOrder({
  customerName: "John Doe",
  item: "Laptop",
  quantity: 1,
  amount: 999,
  email: "john@example.com",
});
```

### Change Email Template

Modify the email text in the Email Service section:

```javascript
orders.on("orderCreated", async (order) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: order.email,
    subject: "Your Custom Subject",
    text: `Your custom email template here`,
  });
});
```

### Add More Services

Add a new listener for any new service:

```javascript
// Shipping Service
orders.on("orderCreated", (order) => {
  console.log(`[Shipping] Preparing order for delivery`);
});
```

## 🔧 Troubleshooting

### "Authentication unsuccessful" Error

**Problem:** Gmail credentials not accepted
**Solutions:**
- ✅ Verify you're using an **App Password**, not your Gmail password
- ✅ Check that **2-Step Verification** is enabled
- ✅ Confirm `.env` file has correct values
- ✅ Regenerate the App Password and update `.env`

### "ENOTFOUND" or Connection Error

**Problem:** Cannot connect to Gmail SMTP
**Solutions:**
- ✅ Check internet connection
- ✅ Verify firewall isn't blocking SMTP (port 587)
- ✅ Ensure Gmail allows "Less secure apps" (not needed with App Password)

### Email Not Sent

**Problem:** No email received
**Solutions:**
- ✅ Check recipient email is correct
- ✅ Verify sender (EMAIL_USER) is correct
- ✅ Check spam folder
- ✅ Look at console error messages

### `.env` File Not Working

**Problem:** `process.env.EMAIL_USER` is undefined
**Solutions:**
- ✅ Ensure `.env` file exists in project root
- ✅ Verify `dotenv` is installed: `npm list dotenv`
- ✅ Check first line of `app.js` has: `require("dotenv").config();`
- ✅ Restart the application after creating `.env`

## 📚 Learning Concepts

This project teaches:

1. **Event Emitter Pattern** - Core Node.js pattern for async communication
2. **Loose Coupling** - Services don't depend on each other
3. **Environment Variables** - Secure credential management
4. **SMTP Integration** - Real-world email sending
5. **Error Handling** - Try-catch for async operations
6. **npm Packages** - Using nodemailer and dotenv

## 🔐 Security Best Practices

✅ **Do:**
- Use `.env` file for all credentials
- Add `.env` to `.gitignore`
- Use **App Passwords** (not your regular Gmail password)
- Keep `.env.example` without actual values
- Regenerate App Password if compromised

❌ **Don't:**
- Commit `.env` file to GitHub
- Hardcode passwords in `app.js`
- Use your regular Gmail password
- Share your `.env` file
- Push credentials to public repositories

## 📦 Dependencies

```json
{
  "nodemailer": "^6.9.x",  // SMTP email client
  "dotenv": "^16.x"        // Environment variable loader
}
```

## 🚀 Next Steps / Enhancements

- [ ] Add HTML email templates
- [ ] Implement database for order history
- [ ] Create REST API endpoints
- [ ] Add order status tracking
- [ ] Implement retry logic for failed emails
- [ ] Add rate limiting
- [ ] Create unit tests
- [ ] Add logging system
- [ ] Deploy to cloud (Heroku, AWS, etc.)

## 💡 Real-World Applications

This pattern is used in:
- E-commerce platforms (order processing)
- Payment systems (transaction handling)
- Notification systems (alerts, emails, SMS)
- Log aggregation services
- IoT sensor data processing
- Message brokers (RabbitMQ, Kafka)

## 📄 License

Add your license here (MIT, Apache, etc.)

## 👨‍💻 Author

Created by **SPC**

## 🤝 Contributing

Contributions welcome! Feel free to:
- Open issues for bugs
- Submit pull requests with improvements
- Suggest new features

## 📞 Support

For help:
1. Check the **Troubleshooting** section above
2. Review error messages carefully
3. Open a GitHub Issue
4. Check [nodemailer documentation](https://nodemailer.com/)

## 🎓 Further Learning

- **Node.js EventEmitter:** https://nodejs.org/api/events.html
- **Nodemailer Docs:** https://nodemailer.com/
- **Gmail App Passwords:** https://support.google.com/accounts/answer/185833
- **Event-Driven Architecture:** https://en.wikipedia.org/wiki/Event-driven_architecture

---

**Happy coding!** 🚀 Feel free to fork, modify, and use this project for learning!
