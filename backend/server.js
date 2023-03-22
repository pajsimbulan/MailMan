require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./routes/authentication');
const route = require('./routes/route');
const app = express();

//SERVER CONSTANTS
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const VERSION = process.env.VERSION;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//SERVER MIDDLEWARE + ENDPOINTS
app.get(`/${VERSION}/authorize`,   auth.authorize);
app.get(`/${VERSION}/email/:id`,   auth.check, route.getEmail);
app.get(`/${VERSION}/user/:userId/inbox/:inboxName`,       auth.check, route.getInbox);


app.post(`/${VERSION}/register`,   auth.register);
app.post(`/${VERSION}/login`,      auth.login);
app.post(`/${VERSION}/email`,      auth.check, route.sendEmail);
app.post(`/${VERSION}/reply`,      auth.check, route.replyEmail);

app.put(`/${VERSION}/user`,   auth.check, route.updateUserInfo); 
app.put(`/${VERSION}/moveEmail`,   auth.check, route.moveEmail);
app.put(`/${VERSION}/changePassword`, auth.changePassword);


//SERVER and DB initialize connections
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log("Connection to Database is successful");
        console.log(`Server Running on port ${PORT}`);
    }))
    .catch((error) => console.log(error.message));




module.exports = app;