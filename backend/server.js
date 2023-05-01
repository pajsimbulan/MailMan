require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./routes/authentication');
const route = require('./routes/route');
const app = express();

//SERVER CONSTANTS
const PORT = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL;
const VERSION = process.env.VERSION;
const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN || 'https://mailman.paulsimbulan.com';

const corsOptions = {
    origin: ['http://localhost:3000', CLIENT_DOMAIN],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};

console.log('CLIENT_DOMAIN:', CLIENT_DOMAIN);
console.log('corsOptions:', corsOptions);

app.use(express.json({ limit: '1gb' }));
app.use(express.urlencoded({limit:'1gb', extended: false}));
app.use(cors(corsOptions));



//SERVER MIDDLEWARE + ENDPOINTS
app.get(`/${VERSION}/authorize`,   auth.authorize);
app.get(`/${VERSION}/email/:id`,   auth.check, route.getEmail);
app.get(`/${VERSION}/user/:userId/inbox/:inboxName`,       auth.check, route.getInbox);
app.get(`/${VERSION}/draft/:id`, auth.check, route.getDraft);


app.post(`/${VERSION}/register`,   auth.register);
app.post(`/${VERSION}/login`,      auth.login);
app.post(`/${VERSION}/email`,      auth.check, route.sendEmail);
app.post(`/${VERSION}/reply`,      auth.check, route.replyEmail);
app.post(`/${VERSION}/draft`,      auth.check, route.createDraft);
app.post(`/${VERSION}/postDraft`,      auth.check, route.postDraft);


app.put(`/${VERSION}/user`,   auth.check, auth.updateUserInfo); 
app.put(`/${VERSION}/email`,   auth.check, route.updateEmail);
app.put(`/${VERSION}/moveEmail`,   auth.check, route.moveEmails);
app.put(`/${VERSION}/changePassword`, auth.changePassword);
app.put(`/${VERSION}/draft`, auth.check, route.updateDraft);
app.put(`/${VERSION}/deleteDrafts`, auth.check, route.deleteDrafts);


//SERVER and DB initialize connections
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT || 4000, () => {
        console.log("Connection to Database is successful");
        
        console.log(`Server Running on port ${PORT}`);
    }))
    .catch((error) => console.log(error.message));




module.exports = app;