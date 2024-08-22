const User = require('../models/User');
const Job = require('../models/Job');
const Template = require('../models/Template');
const Resume = require('../models/Resume');
const { generateToken } = require('../utils/auth');
const ValidationError = require('../errors/ValidationError');
const DatabaseError = require('../errors/DatabaseError');
const NotFoundError = require('../errors/NotFoundError');
const { hashPassword, comparePassword } = require('../utils/password');
const axios = require('axios');
const path = require('path');
const fs = require('fs-extra');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');


// Register a new user
exports.register = async (req, res, next) => {
  const { email, fullName, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return next(new ValidationError('User already exists'));
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    user = new User({
      email,
      fullName,
      passwordHash: hashedPassword,
    });

    await user.save();

    // Generate JWT token
    const token = generateToken({ id: user._id });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

// Log in a user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Get user
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ValidationError('Invalid credentials'));
    }

    // Check password
    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return next(new ValidationError('Invalid credentials'));
    }

    // Generate JWT token
    const token = generateToken({ id: user._id });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

// Should be tested
exports.createResumeData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('resume');

    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    let resume;

    if (!user.resume) {
      const resumeData = {
        user: user._id,
        ...req.body.data
      };

      resume = new Resume(resumeData);
      await resume.save();

      user.resume = resume._id;
      await user.save();
    } else {
      resume = user.resume;
      Object.assign(resume, req.body);
      await resume.save();
    }

    res.status(201).json({
      status: 'success',
      data: {
        resume
      }
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

exports.getResumeData = async (req, res, next) => {
  try {
    const resume = await Resume.find({ user: req.user._id });
    if (!resume) {
      return next(new NotFoundError('User or resume data not found'));
    }
    res.status(200).json({
      status: 'success',
      data: {
        resume
      }
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

exports.updateResumeData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('resume');

    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    if (!user.resume) {
      return next(new NotFoundError('You do not have a resume data'));
    }

    const resume = user.resume;
    Object.assign(resume, req.body.data);
    await resume.save();

    res.status(200).json({
      status: 'success',
      data: {
        resume
      }
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

// Should be tested
exports.getTemplates = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    const templates = await Template.find({ user: user._id });

    if (!templates) {
      return next(new NotFoundError('Templates not found'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        templates
      }
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

// Should be tested
exports.getTemplate = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError('User not found'));
    }
    res.status(200).json(user.templates.id(id));
  }
  catch (error) {
    next(new DatabaseError());
  }
};

exports.createTemplate = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    const template = new Template({
      user: user._id,
      resumeData: user.resume,
      templateLink: req.body.templateLink
    });

    await template.save();

    res.status(200).json(template._id);
  } catch (error) {
    next(new DatabaseError());
  }
}

exports.updateTemplate = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    const template = await Template.findById(id);
    if (!template) {
      return next(new NotFoundError('Template not found'));
    }

    template.templateLink = req.body.templateLink;
    await template.save();

    res.status(200).json(template);
  } catch (error) {
    next(new DatabaseError());
  }
}

exports.deleteTemplate = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    const template = await Template.findById(id);
    if (!template) {
      return next(new NotFoundError('Template not found'));
    }

    await Template.deleteOne({ _id: id });

    res.status(200).json({
      status: 'success',
      message: 'Template deleted successfully'
    });
  } catch (error) {
    next(new DatabaseError());
  }
}

exports.processResume = async (req, res) => {
  if (!req.resumeText) {
    return res.status(400).send('Resume processing failed.');
  }

  try {
    const prompt = formatPrompt(req.resumeText);
    const result = await sendToOpenAI(prompt);

    const jsonString = result.message.content;

    const cleanJsonString = jsonString.replace(/```json|```/g, '').trim();
    const parsedJson = await JSON.parse(cleanJsonString);


    const user = await User.findById(req.user._id).populate('resume');

    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    let resume;

    if (!user.resume) {
      const resumeData = {
        user: user._id,
        ...parsedJson.data.resume[0]
      };

      resume = new Resume(resumeData);
      await resume.save();

      user.resume = resume._id;
      await user.save();
    } else {
      resume = user.resume;
      Object.assign(resume, parsedJson.data.resume[0]);
      await resume.save();
    }

    res.status(200).json(parsedJson);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Failed to process resume');
  }
};

exports.saveTemplate = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const htmlContent = req.body.htmlContent;

    if (!htmlContent) {
      return res.status(400).json({ message: 'No HTML content provided.' });
    }

    const savePath = path.join(__dirname, '..', 'uploads', userId.toString());
    await fs.ensureDir(savePath);

    const htmlFileName = `template-${Date.now()}.html`;
    const htmlFilePath = path.join(savePath, htmlFileName);
    await fs.writeFile(htmlFilePath, htmlContent, 'utf8');

    const pdfFileName = `resume-${Date.now()}.pdf`;
    const pdfFilePath = path.join(savePath, pdfFileName);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`file://${htmlFilePath}`, { waitUntil: "networkidle0" });
    await page.pdf({ path: pdfFilePath, format: "A4" });
    await browser.close();

    res.status(200).json({
      message: 'Template saved and PDF generated successfully.',
      pdfFilePath: pdfFilePath,
    });
  } catch (error) {
    console.error('Error saving template or generating PDF:', error);
    next(new DatabaseError());
  }
};

exports.getLatestResumePdfPath = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const userFolderPath = path.join(__dirname, "..", "uploads", userId.toString());

    if (!fs.existsSync(userFolderPath)) {
      return res.status(404).json({
        message: "No resume PDF files found for this user.",
      });
    }

    const files = fs.readdirSync(userFolderPath);

    const pdfFiles = files.filter(file => file.endsWith(".pdf"));

    if (pdfFiles.length === 0) {
      return res.status(404).json({
        message: "No PDF files found for this user.",
      });
    }

    // Sort files by creation time and get the latest one
    const latestPdfFile = pdfFiles.map(file => ({
      fileName: file,
      time: fs.statSync(path.join(userFolderPath, file)).mtime.getTime(),
    })).sort((a, b) => b.time - a.time)[0];

    const latestPdfPath = path.join(userFolderPath, latestPdfFile.fileName);

    res.status(200).json({
      status: 'success',
      data: {
        pdfPath: latestPdfPath
      }
    });
  } catch (error) {
    console.error("Error fetching latest resume PDF path:", error);
    next(new DatabaseError());
  }
};


exports.sendApplication = async (req, res, next) => {
  try {
    const { coverLetter, companyEmail, resumePdfPath } = req.body;

    if (!coverLetter || !companyEmail || !resumePdfPath) {
      return res.status(400).json({ message: 'Cover letter and resume PDF are required.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: companyEmail,
      subject: `Job Application from ${req.user.fullName}`,
      text: coverLetter,
      attachments: [
        {
          filename: 'resume.pdf',
          path: resumePdfPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Application sent successfully!' });

  } catch (error) {
    console.error('Error sending application:', error);
    return res.status(500).json({ message: 'Failed to send the application' });
  }
};


function formatPrompt(resumeText) {
  return `
  Given the following resume data:

  ${resumeText.join('\n')}

  Please format the data into the following JSON structure, format all dates like 2024-12-01 (YYYY-MM-DD), if the data is like September 2024 return it as 2024-09-01 and return only the JSON data without any additional text:

  {
      "status": "success",
      "data": {
          "resume": [
              {
                  "contactInfo": {
                      "phone": "",
                      "email": "",
                      "address": ""
                  },
                  "name": "",
                  "summary": "",
                  "skills": [
                      ""
                  ],
                  birthDate: "",
                  "experience": [
                      {
                          "jobTitle": "",
                          "company": "",
                          "startDate": "",
                          "endDate": "",
                          "description": ""
                      }
                  ],
                  "education": [
                      {
                          "institution": "",
                          "degree": "",
                          "startDate": "",
                          "endDate": ""
                      }
                  ],
                  "languages": [
                      ""
                  ],
                  "references": [
                      ""
                  ],
                  "certificates": [
                      {
                          "institution": "",
                          "title": "",
                          "date": ""
                      }
                  ]
              }
          ]
      }
  }

  Please format the data accordingly and ensure that all fields are filled accurately based on the provided input.
  Return only the JSON structure above with the data filled in, without any additional comments, explanations, or text.`;
}

async function sendToOpenAI(prompt) {
  try {
    const response = await axios.post('https://gen-ai-wbs-consumer-api.onrender.com/api/v1/chat/completions',
      {
        "stream": false,
        "model": "gpt-4o",
        "messages": [
          {
            "role": "system",
            "content": "You are quite dramatic"
          },
          {
            "role": "user",
            "content": prompt
          }
        ]
      },
      {
        headers: {
          'provider': 'open-ai',
          'mode': 'production',
          'Authorization': `${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

    if (response.status !== 200) {
      throw new Error(response.data.error.message || 'Error processing data through OpenAI');
    }

    return response.data;

  } catch (error) {
    console.error('Error:', error.message || error);
    throw new Error(error.message || 'An unexpected error occurred while communicating with OpenAI');
  }
}
