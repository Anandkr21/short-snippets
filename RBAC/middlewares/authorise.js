const authorise = (permittedRoles) => {
    return (req, res, next) => {
      const user_role = req.user.role;
      if(permittedRoles.includes(user_role)) {
        next()
      } else {
        res.send('unauthorise')
      }
    }
  }

  module.exports = {authorise}