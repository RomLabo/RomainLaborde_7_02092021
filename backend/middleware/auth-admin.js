const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userAdmin = decodedToken.userIsAdmin;
    if (userAdmin !== 1) {
      throw 'Vous ne possédez pas les privilèges requis';
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      error: new Error('Utilisateur non autorisé')
    });
  }
};