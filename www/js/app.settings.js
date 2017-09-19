class AppSettings
{            
    constructor(_appName)
    {    
        this.storage = localforage.createInstance({
            driver:     [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
            name:       _appName        
          });
    }


    saveSettings(_settingsId, _settingsObject)
    {
        var self = this
        return new Promise(function(_resolve, _reject){
            try
            {
                self.storage.setItem(_settingsId, _settingsObject).then(function(){
                    _resolve()
                }).catch(function(_exception) {
                    _reject(_exception)
                });
            }
            catch(exception)
            {
                _reject(exception)
            }
        });         
    }
    

    loadSettings(_settingsId)
    {
        var self = this
        return new Promise(function(_resolve, _reject){
            try
            {
                self.storage.getItem(_settingsId).then(function(_settings){
                    _resolve(_settings)
                }).catch(function(_exception) {
                    _reject(_exception)
                });
            }
            catch(exception)
            {
                _reject(exception)
            }
        });     
    }



}