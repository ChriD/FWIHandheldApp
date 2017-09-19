

class AppHandheld extends App
{     
    constructor() 
    { 
        super()
    }

    /**
     * return the toolbar tag          
     */
    getToolbar()
    {
        var component = document.getElementById("app-toolbar")
        if(component)
            return component._tag;
        return null;
    }

    /**
     * show the splashscreen of the application           
     */
    showSplashScreen()
    {       
        this.changeView("appMainViews", "app-view-splash")
    }

    /**
     * hide the splashscreen of the application           
     */
    hideSplashScreen()
    {
        this.changeView("appMainViews", "app-view-app")
    }


    setBusy(_busy)
    {
        if(this.getToolbar())
            this.getToolbar().setBusy(_busy);
    }


    changeView(_viewContainerId, _viewId)
    {        
        super.changeView(_viewContainerId, _viewId)                        
    }

}


