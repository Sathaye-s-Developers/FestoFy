const router = require("express").Router();
const Razorpay = require("razorpay");

//create instance
const razorpay = new Razorpay({
  key_id: process.env.ROZARPAY_ID,
  key_secret: process.env.ROZARPAY_SECRET,
});

// createOrder.js
router.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount == 0) {
    return res.status(402).send({ message: "invalid amount number" });
  }
  console.log(amount);
  const amountInPaise = amount * 100; // Rs 499
  const options = {
    amount: amountInPaise,
    currency: "INR",
    receipt: `sub_order_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: "Order creation failed" });
  }
});

module.exports = router;
