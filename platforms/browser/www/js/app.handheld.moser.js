

class AppHandheld_Moser extends AppHandheld
{     
    constructor() 
    { 
        super()
        this.sageX3Connector = null;
        this.barcodeReader = null;
    }

    additionalLogIdentifier()
    {
        return "Moser Handheld App"
    }

    init()
    {                
        super.init()

        document.addEventListener("SageX3ConnectorJS.Log", this.x3ConnectorLog)
        document.addEventListener("SageX3ConnectorJS.ConnectionStateChanged", this.x3ConnectorStateChanged)
        document.addEventListener("BarcodeReader.dataReady", this.barcodeReady(this))

        this.sageX3Connector    = new SageX3Connector()  
        this.barcodeReader      = new AppBarcodeReader_Intermec()        
        this.barcodeReader.parmLogger(this.parmLogger())
        this.barcodeReader.init();
    }

    exitApp()
    {
        if(this.barcodeReader)
            this.barcodeReader.close()
        super.exitApp()
    }

    appSettingsLoaded()
    {
        this.x3ConnectorConnect()
    }

    connectToBackend()
    {
        this.setBusy(true);
        app.getFooter().setConnectedToInfo(true, "Verbinde zu X3...")
        this.x3ConnectorConnect()
    }


    setMainMenuData(_listData)
    {
        var component = document.getElementById("app-list-main")
        component._tag.setListData(_listData);
    }


    changeAppView(_viewId, _params = null)
    {
        this.changeView("app-appViews", _viewId, _param) 
    }  
    


	x3ConnectorConnect()
	{        
		if(!this.sageX3Connector.init(app.getAppSettings().X3_URL, app.getAppSettings().X3_POOLID, app.getAppSettings().X3_USER, app.getAppSettings().X3_PASS, app.getAppSettings().X3_LANG))
            this.logError("Fehler beim initialisieren der X3 Verbindung!");		
	}
		

	x3ConnectorStateChanged(_data)
	{	
        if(_data.detail.connected)   
        {     
            app.setBusy(false);
            app.getFooter().setConnectedToInfo(true, "Verbunden mit: " + app.getAppSettings().X3_POOLID)
        }
        else
        {
            app.setBusy(true);
            app.getFooter().setConnectedToInfo(false, "Keine Verbindung!")
        }
    }
    

    x3ConnectorLog(_e)
    {        
        if (_e.logType === 0) app.logDebug(_e.logText)
        if (_e.logType === 1) app.logInfo(_e.logText)
        if (_e.logType === 2) app.logWarning(_e.logText)
        if (_e.logType === 3) app.logError(_e.logText)
        if (_e.logType === 4) app.logError(_e.logText)
    }  

    barcodeReady(self)
    {
        return function(_data)
        {
            // TODO: dispatch barcode to current view
            self.logDebug("Barcode scanned: " + _data.toString())
            self.getMainViewContainer().trigger("action", {action : "barcodeReady", data : _data.detail})            
        }
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

