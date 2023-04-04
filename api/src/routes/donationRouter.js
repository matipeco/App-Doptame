const { Router } = require("express");
const { sendDonationNotification, postDonation } = require("../controllers/donationController");
const donationRouter = Router();

donationRouter.post("/", donationRouter);

module.exports = donationRouter;