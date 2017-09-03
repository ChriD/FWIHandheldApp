

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
        return component._tag;
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

}


