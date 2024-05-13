const authMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === process.env.API_KEY) {
        next()
    } else {
        return res.status(401).json({ ok: false, message: "Invalid API key." });
    }
}
module.exports = { authMiddleware }