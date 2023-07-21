
let Redis = require('ioredis')
require('dotenv').config()
let client = new Redis(`redis://default:ZF0WVHxl5aAOYTm94oJy6FtIDxKClnNE@redis-15753.c258.us-east-1-4.ec2.cloud.redislabs.com:15753`)

console.log("redis")

module.exports = {client}


