const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: 'postgres://ebycrauzlwbawx:6046b15f94aa6d042114e2f8404bdad44b31b523e845ee344b7513707cfa32c5@ec2-54-83-1-101.compute-1.amazonaws.com:5432/dr2vh94lc2557',
        ssl: true,
    }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => { res.send('it is working!') })

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
    console.log(`my connectionString is ${process.env.DATABASE_URL}`)
})

