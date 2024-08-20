const User = require('../models/User');
const Job = require('../models/Job');
const Resume = require('../models/Resume');
const { generateToken } = require('../utils/auth');
const ValidationError = require('../errors/ValidationError');
const DatabaseError = require('../errors/DatabaseError');
const NotFoundError = require('../errors/NotFoundError');
const { hashPassword, comparePassword } = require('../utils/password');
const axios = require('axios');

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
    res.status(200).json(user.templates);
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
