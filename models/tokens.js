import jwt from 'jsonwebtoken';

const generateToken = (username) => {
  // Generate the token using the user and password
  const token = jwt.sign({ username }, 'foo', { expiresIn: '4h' });
  return token;
}

const verifyToken = (token) => {
  try {
    // Verify the token
    jwt.verify(token, 'foo');
    return true;
  }
  catch (error) {
    return false;
  }
}

export {
  generateToken,
  verifyToken
}
