const authRouter = require('../routes/authRoutes')

const Router = (app) => {
    app.use('/api/v1', authRouter)
}

module.exports = Router