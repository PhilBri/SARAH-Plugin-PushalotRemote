exports.action = function(data, callback, config){
  // Retrieve config
  config = config.modules.pushalot;
  if (!config.token){
    console.log('\033[91m[ Error ]\033[0m PushalotRemote => \'Token\' non paramétré');
    callback({});
    return;
  }
  
  var pushover = require('./lib/pushalot');
  pushover.send({  
    AuthorizationToken: config.Token,
    Title: config.Title,
    Body: data.Push,
    IsSilent: config.Silent
  },
  
  function(err, response){    
    if (err){
      callback({'tts': "Erreur dans l'envoi"});
      console.log('\033[91m[ Error ]\033[0m PushalotRemote => ' + err.message);
      return;
    }
    callback({'tts': 'Message envoyé'});
    console.log('\x1b[92m[    OK ]\x1b[0m TeleinfoRemote => ' + response.Description);
  });
}