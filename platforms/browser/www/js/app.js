

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
        }).catch(function(_exception){
            self.logError("Loading settings failed: " + _exception.toString())
        })

        // mount the visual layer
        riot.mount('app')

        // TODO: Show splash screen

        this.logDebug("Initialize app")               
    }

    changeView(_viewContainerId, _viewId)
    {
        var component = document.getElementById(_viewContainerId)
        component._tag.changeView(_viewId)
    }


    getViewContainer(_viewContainerId)
    {
        var component = document.getElementById(_viewContainerId)
        return component._tag
    }

    
    getMainViewContainer()
    {
        return app.getViewContainer("app-appViews")  
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
        navigator.app.exitApp()
    }

}

