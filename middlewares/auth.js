const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Token missing or invalid format' });
  }

  const token = authHeader.substring(7, authHeader.length);
  const private_tokenization = process.env.TOKENIZER;
  // Reemplaza el token de ejemplo con uno adecuado para tu entorno
  if (token === private_tokenization) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticate;
