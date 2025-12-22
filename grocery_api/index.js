const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_DB_CONFIG } = require('./config/app.config');
const errors = require("./middleware/errors.js");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

mongoose.Promise = global.Promise;

mongoose
    .connect(MONGO_DB_CONFIG.DB, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api",require("./routers/appRoutes.js"));
app.use(errors.errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT || 4000, () => {
    console.log('Server is listening on port 4000');
});