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
const path = require('path');

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Title",
            version: version,
            description: "Test description",
            license: {
                name: "Test",
                url: "",
            },
            contact: {
                name: "Name",
                url: "",
                email: "",
            },
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: [
        // path.resolve(__dirname, 'userSwagger.js'),
        path.resolve(__dirname, './utils/swagger/recruiterSwagger.js'),
        // path.resolve(__dirname, 'jobSwagger.js'),
        // path.resolve(__dirname, 'companySwagger.js'),
    ],
};

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

const specs = swaggerJsdoc(options);
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

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});