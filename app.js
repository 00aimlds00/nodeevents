require("dotenv").config();

const EventEmitter = require("events");
const nodemailer = require("nodemailer");

class OrderSystem extends EventEmitter {}

const orders = new OrderSystem();

// Gmail Transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify SMTP Connection
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Error:", error.message);
  } else {
    console.log("SMTP Server is ready");
  }
});

// Inventory Service
orders.on("orderCreated", (order) => {
  console.log(
    `[Inventory] Reserving ${order.quantity} x ${order.item}`
  );
});

// Billing Service
orders.on("orderCreated", (order) => {
  console.log(
    `[Billing] Charging customer $${order.amount}`
  );
});

// Analytics Service
orders.on("orderCreated", () => {
  console.log("[Analytics] Order recorded");
});

// Email Service
orders.on("orderCreated", async (order) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: order.email,
      subject: "Order Confirmation",
      text: `
Hi ${order.customerName},

Thank you for your order.

Item: ${order.item}
Quantity: ${order.quantity}
Amount: $${order.amount}

Your order has been received and is being processed.

Thanks,
Order Team
      `,
    });

    console.log(
      `[Email] Confirmation sent to ${order.email}`
    );
    console.log(
      `[Email] Message ID: ${info.messageId}`
    );
  } catch (err) {
    console.error("[Email] Failed:", err.message);
  }
});

// Function
function placeOrder(order) {
  console.log("\n===== NEW ORDER =====\n");
  orders.emit("orderCreated", order);
}

// Demo Order
placeOrder({
  customerName: "Mousom",
  item: "Notebook",
  quantity: 3,
  amount: 15,
  email: "inmousom@gmail.com",
});