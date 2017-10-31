

class AppHandheld_Moser extends AppHandheld
{     
    constructor() 
    { 
        super()
        this.sageX3Connector = null
        this.barcodeReader = null
        this.errorSound = null
    }

    additionalLogIdentifier()
    {
        return "Moser Handheld App"
    }

    init()
    {                
        super.init()

        document.addEventListener("SageX3ConnectorJS.Log", this.x3ConnectorLog(this))
        document.addEventListener("SageX3ConnectorJS.ConnectionStateChanged", this.x3ConnectorStateChanged(this))
        document.addEventListener("BarcodeReader.dataReady", this.barcodeReady(this))

        this.sageX3Connector    = new SageX3Connector()  
        this.barcodeReader      = new AppBarcodeReader_Intermec()        
        this.barcodeReader.parmLogger(this.parmLogger())
        this.barcodeReader.init();

        this.errorSound = new Howl({ src: ['sound/error3.wav'], volume: 1.0 });
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
        this.getFooter().setConnectedToInfo(true, "Verbinde zu X3...")
        this.x3ConnectorConnect()
    }


    setMainMenuData(_listData)
    {
        var component = document.getElementById("app-list-main")
        component._tag.setListData(_listData);
    }


    changeAppView(_viewId)
    {
        this.changeView("app-appViews", _viewId) 
    }  
    


	x3ConnectorConnect()
	{        
		if(!this.sageX3Connector.init(this.getAppSettings().X3_URL, this.getAppSettings().X3_POOLID, this.getAppSettings().X3_USER, this.getAppSettings().X3_PASS, this.getAppSettings().X3_LANG))
            this.logError("Fehler beim initialisieren der X3 Verbindung!");		
	}
		

	x3ConnectorStateChanged(_self)
	{
        return function(_data)
        {	
            if(_data.detail.connected)   
            {     
                _self.setBusy(false);
                _self.getFooter().setConnectedToInfo(true, "Verbunden mit: " + _self.getAppSettings().X3_POOLID)
            }
            else
            {
                _self.setBusy(true);
                _self.getFooter().setConnectedToInfo(false, "Keine Verbindung!")
            }
        }
    }
    

    x3ConnectorLog(_self)
    {   
        return function(_e)
        {     
            if (_e.logType === 0) _self.logDebug(_e.logText)
            if (_e.logType === 1) _self.logInfo(_e.logText)
            if (_e.logType === 2) _self.logWarning(_e.logText)
            if (_e.logType === 3) _self.logError(_e.logText)
            if (_e.logType === 4) _self.logError(_e.logText)
        }
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


    audioError()
    {     
        if(this.errorSound)
            this.errorSound.play()
    }

}

