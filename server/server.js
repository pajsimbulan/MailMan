const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./routes/authentication');
const route = require('./routes/route');
const PORT = 4000;
const app = express();
const DB_URL = 'mongodb+srv://mailman:mailman98@cluster0.s2lr8pa.mongodb.net/?retryWrites=true&w=majority';

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


app.get('/v0/authorize',   auth.authorize);
app.get('/v0/email',       auth.check, route.getAllEmails);
app.get('/v0/email/:id',   auth.check, route.getEmail);
app.get('v0/user',         auth.check, route.getUserInfo);
app.post('/v0/register',   auth.register);
app.post('/v0/login',      auth.login);
app.post('/v0/email',      auth.check, route.sendEmail);

app.put('/v0/user',   auth.check, route.updateUserInfo); 
app.put('/v0/changepassword', auth.changePassword);

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log("Connection to Database is successful");
        console.log(`Server Running on port ${PORT}`);
    }))
    .catch((error) => console.log(error.message));




module.exports = app;