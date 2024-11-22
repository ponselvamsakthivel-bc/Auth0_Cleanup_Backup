function addAttributes(user, context, callback) {
  console.log('user',user);
  context.idToken['https://ccs-sso/connection'] = context.connection;
   if (user.user_metadata && user.user_metadata.use_mfa === true){
    context.idToken['https://ccs-sso/use_mfa'] = true;
  }  
  callback(null, user, context);
}