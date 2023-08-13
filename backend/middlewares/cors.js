const allowedCors = [
  'https://sereg1ns.nomoreparties.co',
  'http://sereg1ns.nomoreparties.co',
  'http://localhost:3001',
  'https://localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Save the origin of the request to the origin variable
  const { method } = req; // Save the request type (HTTP method) to the variable
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) { // Check that the request source is allowed
    res.header('Access-Control-Allow-Origin', origin); // Set a header that allows browser requests from this origin
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS); // Allow cross-domain requests of any type
    res.header('Access-Control-Allow-Headers', requestHeaders); // Allow cross-domain requests with these headers
    return res.end(); // We complete the processing of the request and return the result
  }
  return next();
};
