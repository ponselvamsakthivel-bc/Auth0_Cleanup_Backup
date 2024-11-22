/**
@param {string} recipient - phone number
@param {string} text - message body
@param {object} context - additional authorization context
@param {string} context.message_type - 'sms' or 'voice'
@param {string} context.action - 'enrollment' or 'second-factor-authentication'
@param {string} context.language - language used by login flow
@param {string} context.code - one time password
@param {string} context.ip - ip address
@param {string} context.user_agent - user agent making the authentication request
@param {object} context.client - object with details about the Auth0 application
@param {string} context.client.client_id - Auth0 application ID
@param {string} context.client.name - Auth0 application name
@param {object} context.client.client_metadata - metadata from client (optional)
@param {object} context.user - object representing the user
@param {string} context.user.user_id - Auth0 user ID
@param {string} context.user.name - user name
@param {string} context.user.email - user email
@param {object} context.user.app_metadata - metadata specific to user and application
@param {object} context.user.user_metadata - metadata specific to user
@param {function} cb - function (error, response)
*/
module.exports = function(recipient, text, context, cb) 
{
  const axios = require('axios@0.22.0');
  //console.log("MFA_SMS_Test1");
  const options = 
	{
        method: 'POST',
        url: context.webtask.secrets.DEV_URL,
        headers: { 'content-type': 'application/json', 'x-api-key':context.webtask.secrets.XAPI_KEY},
        data:       
        {
            'phoneNumber': recipient, 
            //'phoneNumber': '447747087648',
            //'phoneNumber': '+14043833639',                
            'templateId': context.webtask.secrets.TEMPLATE_ID,
            'message': [
                        {
                        'key': 'code',
                        'message': text
                        }
                      ]
        }
     
    };
        axios(options)
		      .then(function (response) {
			      console.log(response);
						                    })
          .catch(function (error) {
		        console.log(error);})
  //console.log(response);
  cb(null, {});
};