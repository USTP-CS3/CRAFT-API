/**
 * a documented google oauth2 library used to verify the id token 
 * 
 */


import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client();

/**
 * Checks request header for a valid id token.
 * This function must be called before any route that requires authentication.
 */
function verify(req, res, next) {

    const isHeaderInvalid = 
        req.headers.authorization == undefined 
        || req.headers.authorization.split(' ')[0] != 'Bearer';
    
    if (isHeaderInvalid) {
        // note: req.craft.log are processed by middleware
        req.craft.log = { 
            isValid: false,
            message: 'Invalid Authorization', 
            data: null 
        };
        next(); return;
    }

    // client id is generated by the google cloud console when you register your app
    const CLIENT_ID = '89255587017-7rk09mkvbs1630in8u0n8jlsip4q5l6k.apps.googleusercontent.com';
    
    // id token is generated by the google sign in library when the client signs in
    const ID_TOKEN = req.headers.authorization.split(' ')[1];

    client.verifyIdToken({
        idToken: ID_TOKEN,
        audience: CLIENT_ID
    })
    .then((ticket) => {
        const data = ticket.getPayload();
        // note: req.craft.log are processed by middleware
        req.craft.log = { 
            isValid: true,
            message: 'GOOD', 
            data: data
        };
        next(); return;
    })
  
     // call the verify function and assign the routes 
    .catch(e => {

        // contains the user data if token format is valid
        let data = null;

        // get the error message
        const message = e.message.split(':')[0].split(',')[0];
            
        // if the token is expired, then extract user data from the token
        if (message == 'Token used too late') {
            // extract user data from the error string
            data = JSON.parse('{'+e.message.split('{')[1]);
        }
        // note: req.craft.log are processed by middleware
        req.craft.log = { 
            isValid: false,
            message: message, 
            data: data 
        };
        next(); return;
    });
}


/**
 * Route is locked for authenticated users only.
 * This function must be called after the verify middleware.
 * Otherwise, the req.craft.log will not be updated. 
 */
function auth(req, res, next) {
    // note: req.craft.log are processed by middleware
    if (req.craft.log.isValid) {
        // continue to the next middleware
        next(); return;
    }
    else {
        // TODO: is this a redirect or a response?
    }
} 

export { verify, auth };