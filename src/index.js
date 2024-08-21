const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { version } = require('../package.json');
const connectDB = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');
const recruiterRoutes = require('./routes/recruiterRoutes');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const companyRoutes = require('./routes/companyRoutes');
const path = require('path');

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "ResumeMatch API",
            version: version,
            description: "API documentation for ResumeMatch application.",
        },
        servers: [
            {
                url: "http://localhost:8080/api",
                description: "Local development server"
            },
        ],
    },
    apis: [
        path.resolve(__dirname, './utils/swagger/userSwagger.js'),
        path.resolve(__dirname, './utils/swagger/recruiterSwagger.js'),
        path.resolve(__dirname, './utils/swagger/jobSwagger.js'),
        path.resolve(__dirname, './utils/swagger/companySwagger.js'),
    ],
};

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

const specs = swaggerJsdoc(options);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use('/api/user', userRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/company', require('./routes/companyRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});