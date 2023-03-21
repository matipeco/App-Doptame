const {login} = require ('../controllers/loginController')

const userLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    login(email, password, (err, result) => {
      if (err) {
        return res.status(401).json({ error: err.message });
      }
      return res.status(200).json(result);
    });
  }
  
  module.exports = userLogin;