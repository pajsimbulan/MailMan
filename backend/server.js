const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./routes/authentication');
const route = require('./routes/route');
const app = express();

//SERVER CONSTANTS
const PORT = 4000;
const DB_URL = 'mongodb+srv://mailman:mailman98@cluster0.s2lr8pa.mongodb.net/?retryWrites=true&w=majority';
const VERSION = 'v0';

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//SERVER MIDDLEWARE + ENDPOINTS
app.get(`/${VERSION}/authorize`,   auth.authorize);
app.get(`/${VERSION}/email`,       auth.check, route.getAllEmails);
app.get(`/${VERSION}/email/:id`,   auth.check, route.getEmail);

app.post(`/${VERSION}/user`,         auth.check, route.getUserInfo);
app.post(`/${VERSION}/register`,   auth.register);
app.post(`/${VERSION}/login`,      auth.login);
app.post(`/${VERSION}/email`,      auth.check, route.sendEmail);

app.put(`/${VERSION}/user`,   auth.check, route.updateUserInfo); 
app.put(`/${VERSION}/changepassword`, auth.changePassword);


//SERVER and DB initialize connections
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log("Connection to Database is successful");
        console.log(`Server Running on port ${PORT}`);
    }))
    .catch((error) => console.log(error.message));




module.exports = app;