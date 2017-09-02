

class AppHandheld extends App
{     
    constructor() 
    { 
        super()
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


