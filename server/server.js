const express = require('express');
const mongoose = require('mongoose');
const user2 = require('./schemas/user');
const PORT = 4000;
const app = express();
const DB_URL = 'mongodb+srv://mailman:mailman98@cluster0.s2lr8pa.mongodb.net/?retryWrites=true&w=majority';

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Your routes go here
/**
 * 
app.post('/v0/login',   auth.login);
app.get('/v0/mail',     auth.check, mail.getMail);
app.get('/v0/mail/:id', auth.check, mail.getMailById);
app.post('/v0/mail',    auth.check, mail.put);
app.put('/v0/mail/:id', auth.check, mail.move); 
 */

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log("Connection to Database is successful");
        console.log(`Server Running on port ${PORT}`);
        const tempUser = new user2({firstName: 'Paul',
        
        email: 'pajsimbulan@gmail.com',
        password: 'whatever'
        });
        const savedUser = tempUser.save();
        console.log(`inserted \n ${savedUser}`);
        
    }))
    .catch((error) => console.log(error.message));




module.exports = app;