

class App extends AppBase
{         
    constructor() 
    { 
        super()
        this.tools      = new AppTools()
        this.settings   = new AppSettings(this.name())
    }

    additionalLogIdentifier()
    {
        return this.name();
    }

    name()
    {
        return "App"
    }


    getAppSettings()
    {
        if(!this.settings.data.APP)
            this.settings.data.APP = {}
        return this.settings.data.APP
    }

    init()
    {                
        var self = this
        this.logger = new AppLogger()        

        // add a global exception catcher
        window.addEventListener("error", function (e) {
            self.logError(e.error.message, e)
            return false;
        })

        // add the riot exception handler
        riot.util.tmpl.errorHandler = function(_err) {
            self.logError(_err.message, _err)            
        }

        // load the settings (async)
        this.settings.loadSettings("APP").then(function(){            
            self.logDebug("Settings loaded")      
            self.appSettingsLoaded();      
        }).catch(function(_exception){
            self.logError("Loading settings failed: " + _exception.toString())
        })

        // mount the visual layer
        riot.mount('app')

        // TODO: Show splash screen

        this.logDebug("Initialize app")               
    }


    appSettingsLoaded()
    {
    }


    changeView(_viewContainerId, _viewId, _params = null)
    {
        var component = document.getElementById(_viewContainerId)
        component._tag.changeView(_viewId, false, _params)
    }


    getViewContainer(_viewContainerId)
    {
        var component = document.getElementById(_viewContainerId)
        return component._tag
    }

    
    getMainViewContainer()
    {
        return this.getViewContainer("app-appViews")  
    }


    getView(_viewId)
    {
        var component = document.getElementById(_viewId)
        return component._tag.getViewTag()
    }


    setBusy(_busy)
    {    
    }


    exitApp()
    {        
        if (navigator.app) 
        {
            navigator.app.exitApp()
        }
        else if (navigator.device)
        {
            navigator.device.exitApp()          
        } 
        else 
        {            
            //window.close();
        }
    }

}

