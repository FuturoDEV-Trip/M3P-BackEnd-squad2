const { Router } = require("express");
const locaisRoutes = require("./local.route");


const routes = Router()


routes.use('/local', locaisRoutes)



module.exports = routes