const asyncHandler = require("express-async-handler");
const Form = require("../models/formModel");
const emailTemplate = require("../document/email");

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = (name, email, phone, service) => {
  transporter.sendMail({
    from: ` OneLife Tourism <onelifetourismllc@gmail.com>`, // sender address
    to: `honey@onelifetourism.com`, // list of receivers
    replyTo: `<onelifetourismllc@gmail.com>`,
    subject: `New Form from ${name}`, // Subject line
    text: `New Form Submitted`, // plain text body
    html: emailTemplate(name, email, phone, service), // html body
  });
};

const createForm = asyncHandler(async (req, res) => {
  const { name, email, phone, service } = req.body;

  const blog = await Form.create({
    name,
    email,
    phone,
    service,
  });

  if (blog) {
    sendEmail(name, email, phone, service);
    res.status(201).json({
      blog,
    });
  } else {
    res.status(400);
    throw new Error("Form not created");
  }
});

const getForms = asyncHandler(async (req, res) => {
  const service = req.query.service;
  const pageSize = 40;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Form.countDocuments({});
  var pageCount = Math.floor(count / 40);
  if (count % 40 !== 0) {
    pageCount = pageCount + 1;
  }

  const blogs = await Form.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ _id: -1 });

  res.status(201).json({ blogs, pageCount });
});

const deleteForm = asyncHandler(async (req, res) => {
  const BlogId = req.query.formId;
  const blog = await Form.findById(BlogId);

  if (blog) {
    await blog.deleteOne({ _id: blog._id });
    res.json({ message: "Form removed" });
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

const getFormById = asyncHandler(async (req, res) => {
  const blog = await Form.findById(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error("Form not found");
  }
});

module.exports = {
  createForm,
  getFormById,
  deleteForm,
  getForms,
};
