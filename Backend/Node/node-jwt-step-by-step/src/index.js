require('dotenv').config()

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {verify} = require('jsonwebtoken');
const {hash, compare} = require('bcryptjs');
const {fakeDB} = require('../db/fake-db.js');

const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  sendAccessToken
} = require('./tokens.js');

const {isAuth} = require('./auth.js');
const { REFRESH_TOKEN_SECRET } = require('./config.js');

const server = express();

server.use(cookieParser());

server.use(cors())

server.use(express.json());

server.use(express.urlencoded({extended:true}));

server.listen(3000, ()=> {
  console.log('server listening on port 3000');
});

server.get('/', (req, res)=>{
  res.send({
    message: "Hello World!"
  })
})

server.post('/register', async(req, res) => {
  const {email, password} = req.body;
  try {
      if (!email || !password) {
          throw new Error('Email and password are required');
      }

      let user = fakeDB.find(user => user.email === email);
      if (user) throw new Error('User already exists');
      
      const hashPassword = await hash(password, 10);
      fakeDB.push({
        id: fakeDB.length,
        email, 
        password: hashPassword
      });

      res.send({
        message: "User successfully created."
      })

  } catch(err) {
    res.send({
      error: `${err.message}`
    })
  }
})

server.post('/login', async(req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = fakeDB.find(user => user.email === email);
    if (!user) throw new Error('User does not exist');
    const valid = await compare(password, user.password);

    if (!valid) throw new Error('Password not correct');

    const accesstoken = createAccessToken(user.id);
    const refreshtoken = createRefreshToken(user.id);

    user.refreshtoken = refreshtoken;
    sendRefreshToken(res, refreshtoken);
    sendAccessToken(res, req, accesstoken);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});



server.post('/refresh_token', (req, res) => {
  const token = req.cookies.refreshtoken;

  if (!token) return res.send({ accesstoken: '' });

  let payload = null;
  try {
    payload = verify(token, REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ accesstoken: '' });
  }

  const user = fakeDB.find(user => user.id === payload.userId);
  
  if (!user) return res.send({ accesstoken: '' });
  
  if (user.refreshtoken !== token)
    return res.send({ accesstoken: '' });

  const accesstoken = createAccessToken(user.id);
  const refreshtoken = createRefreshToken(user.id);
  
  user.refreshtoken = refreshtoken;
 
  sendRefreshToken(res, refreshtoken);
  return res.send({ accesstoken });
});


server.post('/protected', async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      res.send({
        data: 'This is protected data.',
      });
    }
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});


server.post('/logout', (_req, res) => {
  res.clearCookie('refreshtoken', { path: '/refresh_token' });
  return res.send({
    message: 'Logged out',
  });
});