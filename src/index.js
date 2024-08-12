const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');
const recruiterRoutes = require('./routes/recruiterRoutes');


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use('/api/recruiter', recruiterRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});