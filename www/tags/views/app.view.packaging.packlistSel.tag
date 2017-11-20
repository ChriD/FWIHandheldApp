<app-view-packaging-packlistsel class="view">
  
   <div class="view-content">
      <div id="packaging_packlistsel_container" class="view-contentContainer">        
        <app-list itemtag="app-list-packitem" id="app-list-palsel"></app-list>
      </div>
    </div>
    <div class="view-buttonrow buttonRow">
      <button id="packaging-packlistsel-button-next"    class="borderRight" style="width: 49%;"></button>
      <button id="packaging-packlistsel-button-cancel"  class=""            style="width: 49%;">Abbrechen</button>
    </div>   

  <style>  
  </style>

  <script>
    var self = this;
    
    // every view tag needs to callback the mounted method so the <app-view> tag will know when its only child is mounted
    this.on('mount', () => {      
      if(self.opts.mountedCallback)
        self.opts.mountedCallback();        
      
      document.getElementById("packaging-packlistsel-button-next").onclick = function(){               
      }        
      document.getElementById("packaging-packlistsel-button-cancel").onclick = function(){                        
        application.getMainViewContainer().showPrevView();
      }         
    })


    this.on('handleKey', (_e) => {            
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
      _listData.push({ 'SSCCCOD' : 'Neue Palette', 'SSCCPC' : '' })

      var listComponent = document.getElementById("app-list-palsel")
      listComponent._tag.setListData(_listData)
      listComponent._tag.selectionCallback = function(_itemData){
        var params = new Object()
        params.calledBy = "app-view-packaging-packlistsel"
        params.SSCCPC = _itemData.SSCCPC         
        application.changeAppView("app-view-packaging-packlist", params);
      }      
    }                 


  </script>  

</app-view-packaging-packlistsel>