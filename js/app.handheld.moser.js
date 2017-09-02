

class AppHandheld_Moser extends AppHandheld
{     
    constructor() 
    { 
        super()
    }

    additionalLogIdentifier()
    {
        return "Moser Handheld App"
    }

    init()
    {                
        super.init()
    }

    setMainMenuData(_listData)
    {
        var component = document.getElementById("app-list-main")
        component._tag.setListData(_listData);
    }


    changeAppView(_viewId)
    {
        app.changeView("app-appViews", _viewId) 
    }
    

    /*
    setSystemOnline(_online)
    {
        this.logDebug("System is " +  (_online ? "online" : "offline") )
        if(!_online)
            app.changeView("appMainViews", "app-view-systemOffline")
        else
            app.changeView("appMainViews", "app-view-app")
    }


    setRoomOnline(_online)
    {
        this.logDebug("Room is " +  (_online ?  "online" : "offline")) 
        if(!_online)
            app.changeView("appMainViews", "app-view-roomOffline")
        else
            app.changeView("appMainViews", "app-view-app")
    }
    */
    

}

