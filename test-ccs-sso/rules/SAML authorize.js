function samlAuthorization(user, context, callback) {
    const axios = require('axios@0.22.0');

    if (context.protocol !== 'samlp') {
        return callback(null, user, context);
    }
    
   //user.corpref = 99999;  
  //console.log("SAML_API_REQUETS");
  //console.log(`${configuration.SEC_API_URL}/security/users/saml?email=${user.email}&client-id=${context.clientID}`);
  //console.log(configuration.SEC_API_KEY);
  
  // Set Trainline Custom Attribue p2sprint9 
  
 if (context.clientID === configuration.TRAINLINE_DIGITS_CLIENT_ID){
   user.corpref = "10009655";
   console.log(user.corpref);
 		}
    const options = {
        method: 'GET',
        url: `${configuration.SEC_API_URL}/security/users/samlp?email=${user.email}&client-id=${context.clientID}`,
        headers: { 'content-type': 'application/json', 'x-api-key':`${configuration.SEC_API_KEY}`}
    };

    axios(options)
        .then(res => {
            const result = res.data;
            if (result.isAccessible === true) {
                return callback(null, user, context);
            }
            else {
                return callback(
                    new UnauthorizedError('NOT ALLOWED')
                );
            }
        })
        .catch(err => {
            return callback(
                new UnauthorizedError('NOT ALLOWED')
            );
        });
}