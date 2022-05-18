const bcrypt = require('bcryptjs')

import Config from '../config'

let secret = 'lJT2MttDgwlJT2Mt'
let ObjectID = require('mongodb').ObjectId

const Verify = async (req, res, next) => {
  let token
  // for health check
  if (req.path === '/health') {
    return res.send('healthy')
  }

  if (req.headers.authorization) token = req.headers.authorization
  else if (req.body.token) token = req.body.token
  else if (req.cookies.session) token = req.cookies.session

  if (!token) return res.status(400).send('No session Token found, please login.')

  let data = token.split(':')
  let time = data[0]
  let id = data[1]

  if (time < Date.now()) return res.status(400).send('Token expired')

  let valid = data[2] && (await bcrypt.compare(time + id + secret, data[2]))

  if (!valid) return res.status(400).send('Invalid token')

  req.user = await req.users.findOne({ _id: new ObjectID(id) })

  if (!req.user) return res.status(400).send('Something went wrong with fetching the user')

  next()
}

const Login = async (req, res, next) => {
  let username = req.body.user
  let password = req.body.pass
  let use_cookie = req.body.use_cookie

  if (!username || !password) return res.status(400).send('Missing the username or password')

  let user = await req.users.findOne({ username: username })

  if (!user) return res.status(400).send('Password or Username invalid')

  let valid = await bcrypt.compare(password, user.hash)

  if (!valid) return res.status(400).send('Password or Username invalid')

  let time = Date.now() + Config.session_length
  let hash = await bcrypt.hash(time + user._id + secret, 12)

  let token = `${time}:${user._id}:${hash}`

  if (use_cookie) res.cookie('session', token)

  res.send(token)
}

const Register = async (req, res, next) => {
  let username = req.body.user
  let password = req.body.pass
  let name = req.body.name
  let email = req.body.email

  let hash = await bcrypt.hash(password, 12)

  let user = {
    username: username,
    hash: hash,
    name: name,
    email: email,
    permissions: ['user'],
  }

  try {
    req.users.insert(user)
    return res.status(200).send('Complete')
  } catch {
    return res.status(400).send('Something went wrong!')
  }
}

const TestAddAdmin = async (req, res, next) => {
  let username = 'admin'
  let password = 'admin'
  let name = 'admin'

  let hash = await bcrypt.hash(password, 12)

  let user = {
    username: username,
    hash: hash,
    name: name,
    permissions: ['admin', 'manager', 'user'],
  }
  try {
    req.users.insert(user)
    return res.status(200).send('Complete')
  } catch (exp) {
    console.log(exp)
    return res.status(400).send('Something went wrong!')
  }
}

const AddUser = async (req, res, next) => {
  let username = req.body.username
  let password = req.body.password
  let name = req.body.name

  let hash = await bcrypt.hash(password, 12)

  let user = {
    username: username,
    hash: hash,
    name: name,
    permissions: req.body.premissions,
  }

  try {
    await req.users.insert(user)
    return res.status(200).send('Complete')
  } catch {
    return res.status(400).send('Something went wrong!')
  }
}

module.exports = {
  Verify,
  Login,
  Register,
  AddUser,
  TestAddAdmin,
}
