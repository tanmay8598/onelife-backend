const asyncHandler = require("express-async-handler");

const Email = require("../models/emailModel");

const createEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const blog = await Email.create({
    email,
  });

  if (blog) {
    res.status(201).json({
      blog,
    });
  } else {
    res.status(400);
    throw new Error("Form not created");
  }
});

const getEmails = asyncHandler(async (req, res) => {
  const pageSize = 40;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Email.countDocuments({});
  var pageCount = Math.floor(count / 40);
  if (count % 40 !== 0) {
    pageCount = pageCount + 1;
  }

  const blogs = await Email.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ _id: -1 });

  res.status(201).json({ blogs, pageCount });
});

module.exports = {
  createEmail,
  getEmails,
};
