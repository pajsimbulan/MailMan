# MailMan
A lightweight email service that aims to make online communication easier and less formal than traditional email services.  It's a fresh take on email services that offers a chat-like experience by adopting a less formal and more streamlined approach.  Drawing inspiration from messaging apps such as iOS Messages while still keeping intact with the traditional emailing system, Mailman enables users to send messages to recipients or create group email conversations, fostering a more engaging communication experience. Users can create an account, complete with personal details and a profile picture.

**This is currently a solo project that I worked on and currently will be working on as I gain more experience in the field.** <br />

**Future plans include the integration of AI technology to help users craft emails in their unique writing style and a complete overhaul of the user interface for a more modern look and feel.** <br/>

## Live Site
 - https://mailman.paulsimbulan.com
 
## Version
 - 1.0 <br/>

## Key Features 
 - Lightweight email service with a chat app style
 - Send messages to multiple recipients or create group conversations
 - Account creation
 - Persistent user sessions for a seamless experience
 - JWT for authentication and Bcrypt for password security
 - Planned updates include AI integration and modern UI design (Version 2.0)

## Technology Stack <br/>
### Frontend
- React
- Javascript
- Material UI
- CSS

### Backend <br/>
- Node.js
- Express
- MongoDB (NoSQL database)

### Others 
- JSON Web Token (Authentication)
- Bcrypt (Password Security)
- Hostinger (frontend Hosting)
- Heroku (backend Hosting)
<br/><br/><br/>

# Architecture

<img src="./screenshots/architecture_png.png" alt="Description of the screenshot" width="400px"> <br/>
Available to view with this link (`registration required from Lucid.app to view`) :  https://lucid.app/lucidchart/0610b552-fdb4-42d4-935b-ee7d1c0229d0/edit?viewport_loc=785%2C-1257%2C1113%2C747%2C0_0&invitationId=inv_546559cf-ef8e-452b-acf8-be5e90c267d8
<br /><br />

# Screenshots
## PC
<div style="display: flex; flex-direction: row; flex-wrap: wrap;">

<figure style="display: flex; flex-direction: column; align-items: center;">

  <img src="./screenshots/pc/signin.png" alt="Description of the screenshot" width="400px">
 
</figure>
<figure style="display: flex; flex-direction: column; align-items: center;">

  <img src="./screenshots/pc/home.jpg" alt="Description of the screenshot" width="400px">
  
</figure><figure style="display: flex; flex-direction: column; align-items: center;">

  <img src="./screenshots/pc/compose_with_images_files.jpg" alt="Description of the screenshot" width="400px">
  
</figure><figure style="display: flex; flex-direction: column; align-items: center;">

  <img src="./screenshots/pc/email_content.jpg" alt="Description of the screenshot" width="400px">
</figure>
</div>

## Mobile
<div style="display: flex; flex-direction: row; flex-wrap: wrap;">

<figure style="display: flex; flex-direction: column; align-items: center;">

  <img src="./screenshots/mobile/signin.jpg" alt="Description of the screenshot" width="200px">
 
</figure>
<figure style="display: flex; flex-direction: column; align-items: center;">

  <img src="./screenshots/mobile/home.jpg" alt="Description of the screenshot" width="200px">
  
</figure><figure style="display: flex; flex-direction: column; align-items: center;">

  <img src="./screenshots/mobile/compose_email.jpg" alt="Description of the screenshot" width="200px">
  
</figure><figure style="display: flex; flex-direction: column; align-items: center;">

  <img src="./screenshots/mobile/email_contents_1.jpg" alt="Description of the screenshot" width="200px">
</figure>
</div>

### **More screenshots available on the ./screenshots directory or visit https://paulsimbulan.com**
<br/><br/>
# Video Demo (PC Version Only)

### https://youtu.be/pvIHewhP_T8
<br/><br/>


# Environment Setup
 - Install Node:
 - https://nodejs.org/en/download/
 - Setup MongoDb
 - https://www.mongodb.com/atlas/database
 <br /><br />

# Setup Instructions

##

1. Clone the repository

```
git clone https://github.com/pajsimbulan/mailman.git

or

git@github.com:pajsimbulan/MailMan.git
```

2. Change into the project directory:

```
cd mailman
```

3. Install Front-End required dependencies:

```
cd frontend 

npm install --legacy-peer-deps
```

4. Create a file `.env` in the frontend root directory and in its contents include:
```
DISABLE_ESLINT_PLUGIN=true
ESLINT_NO_DEV_ERRORS=true

# The following env vars are used by the backend to connect to the database
REACT_APP_BACKEND_URL= YOUR_BACKEND_URL_GO_HERE   for example (http://localhost:4000)
REACT_APP_BACKEND_VERSION= YOUR_BACKEND_VERSION_GO_HERE for example(v0)

for example:
REACT_APP_BACKEND_URL=http://localhost:4000
REACT_APP_BACKEND_VERSION=v0

```

5. Go to the backend now and install Back-End required dependencies:
```
cd backend

npm install
```
6. Create a file .env in the backend root directory this time and in its contents include:
```

#Port Number for the server to listen on
PORT= YOUR_PORT_NUMBER_GO_HERE

# URL for the development database
DB_URL= YOUR_MONGODB_URL_GO_HERE

#VERSION OF THE API
VERSION= YOUR_VERSION_OF_API_GO_HERE

#SECRET KEY FOR THE JWT
JWT_SECRET_KEY= YOUR_JWT_SECRET_KEY_GO_HERE



for example 

#Port Number for the server to listen on
PORT=4000

# URL for the development database
DB_URL=mongodb+srv://mailman:temporary!@mailmandb.xyxvxl.mongodb.net/?retryWrites=true&w=majority

#VERSION OF THE API
VERSION=v0

#SECRET KEY FOR THE JWT
JWT_SECRET_KEY= lumpia
```
7. Start the development server by having to terminals.  One for backend and one for frontend.  For each, run:

```
npm run
``` 

## Commands
 - `npm start` to begin the development server for frontend and backend
 - `npm run lint` to lint code (frontend only)
 - `npm run lint --fix` to fix simple linting errors (frontend only)
<br /><br />

# Contributing
As this is a solo project, contributions are not currently being accepted. However, suggestions for improvements and new features are always welcome.<br/><br/>

# License
This project is open-source and available under the MIT License.

