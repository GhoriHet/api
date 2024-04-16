const express = require('express');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const cors = require('cors');
const session = require('express-session')
const passport = require('passport');
const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./apidocs.yaml');

connectDB();

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "ffmgprfmgrpfmofgffghf",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
    console.log("Server started on port 3000");
})