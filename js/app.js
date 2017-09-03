

class App extends AppBase
{     
    constructor() 
    { 
        super()
    }

    additionalLogIdentifier()
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

        // mount the visual layer
        riot.mount('app')

        // TODO: Show splash screen

        this.logDebug("Initialize app")               
    }

    changeView(_viewContainerId, _viewId)
    {
        var component = document.getElementById(_viewContainerId)
        component._tag.changeView(_viewId);
    }


    getViewContainer(_viewContainerId)
    {
        var component = document.getElementById(_viewContainerId)
        return component._tag;
    }


    getView(_viewId)
    {
        var component = document.getElementById(_viewId)
        return component._tag.getViewTag();
    }

}

