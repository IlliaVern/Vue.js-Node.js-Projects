require('dotenv').config()
const jwt = require('jsonwebtoken')
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

module.exports = (req, res, next) => {
    var userToken = localStorage.getItem('userToken')
    try{
        jwt.verify(userToken, process.env.JWT_KEY)
        next()
    } catch (error) {
        return res.status(401).render('main', { title: 'Unauthorized action', shopName: 'CRUD Test Shop',
        page: 'error', message: "Unauthorized" })
    }
}

// module.exports = (req, res, next) => {
//     try{
//         const token = req.headers.authorization.split(" ")[1] //было
//         // const token = req.headers['authorization'].split(" ")[1]
//         const decoded = jwt.verify(token, process.env.JWT_KEY)
//         req.userData = decoded
//         next()
//     } catch (error) {
//         return res.status(401).json({
//             message: 'Auth failed'
//         })
//     }
// }