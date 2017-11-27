<app-view-packaging-packlistsel class="view">
  
   <div class="view-content">
      <div id="packaging_packlistsel_container" class="view-contentContainer">        
        <app-list itemtag="app-list-packitemsel" id="app-list-palsel"></app-list>
      </div>
    </div>
    <div class="view-buttonrow buttonRow">
      <button id="packaging-packlistsel-button-next"    class="borderRight" style="width: 49%;"></button>
      <button id="packaging-packlistsel-button-cancel"  class=""            style="width: 49%;">Zurück</button>
    </div>   

  <style>  
  </style>

  <script>
    var self      = this
    self.FNC1     = '\u001d' 
    self.devMode  = true
    
    // every view tag needs to callback the mounted method so the <app-view> tag will know when its only child is mounted
    this.on('mount', () => {      
      if(self.opts.mountedCallback)
        self.opts.mountedCallback();        
      
      document.getElementById("packaging-packlistsel-button-next").onclick = function(){
        if(self.devMode)
        {
          self.barcodeReady("00390078440000004197")
        }
      }        
      document.getElementById("packaging-packlistsel-button-cancel").onclick = function(){                        
        application.getMainViewContainer().showPrevView();
      }         
    })


    this.on('handleKey', (_e) => {         
      var listComponent = document.getElementById("app-list-palsel")      
      if(listComponent)
        listComponent._tag.trigger("handleKey", _e)          
    })   


    this.on('requestPrevViewId', (_args) => {       
      _args.viewId  = "app-view-packaging"
    })  


    this.on('action', (_e) => {      
      if(_e.action == "barcodeReady")
      {
        self.barcodeReady(_e.data);
      }    
    })
    

    this.on('entered', (_e) => {  
        
        self.readList()        
    }) 


    barcodeReady(_data)
    {     
      // TODO: Allow scan of SSCC and if valid open this pallet! 
      // we do ask the backend for the pallet so we may open pallets that show not up in list?
      // here we may give some info to the user that the pallet is not ready to open?
      // TODO: @@@      
      application.setBusy(true)             
      application.sageX3Connector.modulePackaging.selectionBarcodeScanned(_data.value, _data.type, 1, 1, self.FNC1).then(function(_result){
        if(_result.ISALLOWED = "1")
          application.changeAppView("app-view-packaging-packlist", self.createParam(_result.SSCCPC, _result.ISCLOSED))
        //else
          // TODO: @@@ log to visible!!! 
        application.setBusy(false)
      }).catch(function(_error){        
        // TODO: @@@ log to visible!!! 
        application.logError(_error.toString())
        application.setBusy(false)
      })  
    }


    name(){
      return "Palettenselektion" // LABEL
    }   

    readList()
    {
      application.setBusy(true) 
      application.sageX3Connector.modulePackaging.getUseablePackages(true, true, true, new Date()).then(function(_result){
        self.updateListData(_result)           
        application.setBusy(false)
      }).catch(function(_error){         
        application.logError(_error.toString())
        application.setBusy(false)
      })         

    }

    updateListData(_listData)
    {
      if(!_listData.length)
      {
        application.logInfo("Keine Daten vorhanden")
        _listData = new Array()        
      }
      _listData.push({ 'SSCCCOD' : 'Neue Palette', 'SSCCPC' : '', 'ISCLOSED' : '0' })

      var listComponent = document.getElementById("app-list-palsel")
      listComponent._tag.setListData(_listData)
      listComponent._tag.selectionCallback = function(_itemData){
        application.changeAppView("app-view-packaging-packlist", self.createParam(_itemData.SSCCPC, _itemData.ISCLOSED));
      }      
    }                 

    createParam(_ssccpc, _isclosed)
    {
        var params = new Object()
        params.calledBy = "app-view-packaging-packlistsel"
        params.SSCCPC   = _ssccpc         
        params.isClosed = _isclosed == "0" ? false : true
        return params;
    }


  </script>  

</app-view-packaging-packlistsel>