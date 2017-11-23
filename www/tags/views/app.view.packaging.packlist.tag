<app-view-packaging-packlist class="view">
  
   <div class="view-content">
      <div id="packaging_packlist_container" class="view-contentContainer">
        <!-- if we have no sscc we have to let the user select (for now we do it fixed!) -->        
        <app-list itemtag="app-list-menuitem" id="app-list-packChoose" if={ noSSCC }></app-list>
        
        <!-- TEST -->
        <div>
          <div><input width="100%" id="packagin-packlist-input-test1"></input></div>
          <div><button width="100%" id="packagin-packlist-button-test1">TEST 1</button></div>
        </div>
        <!-- TEST -->

        <app-list itemtag="app-list-packitem" id="app-list-packChilds"></app-list>
      </div>
    </div>
    <div class="view-buttonrow buttonRow">
      <button id="packaging-packlist-button-next"    class="borderRight" style="width: 49%;"></button>
      <button id="packaging-packlist-button-cancel"  class=""            style="width: 49%;">Abbrechen</button>
    </div>   

  <style>  
  </style>

  <script>
    var self = this
    self.curSSCCPC = ""
    self.noSSCC = true
    self.params = null
    self.isMounted = false
    self.devMode = true
    
    // every view tag needs to callback the mounted method so the <app-view> tag will know when its only child is mounted
    this.on('mount', () => {      
      if(self.opts.mountedCallback)
        self.opts.mountedCallback();        
      
      document.getElementById("packaging-packlist-button-next").onclick = function(){               
      }  
      
      document.getElementById("packaging-packlist-button-cancel").onclick = function(){                        
        application.getMainViewContainer().showPrevView();
      }   

      // TEST -->      
      if(self.devMode == true)
      {
        document.getElementById("packagin-packlist-button-test1").onclick = function(){
          var e = new Object()                 
          e.value = document.getElementById("packagin-packlist-input-test1").value
          self.barcodeReady(e)
        }           
      }
      else
      {
        document.getElementById("packagin-packlist-input-test1").style.display = 'none'
        document.getElementById("packagin-packlist-button-test1").style.display = 'none'        
      }
      // TEST <--

       
      self.isMounted = true                  
    })


    this.on('handleKey', (_e) => {            
    })   


    this.on('requestPrevViewId', (_args) => {  
      if(self.params && self.params.calledBy)
        _args.viewId  = self.params.calledBy
      else     
        _args.viewId  = "app-view-packaging"
    })  


    this.on('action', (_e) => {      
      if(_e.action == "barcodeReady")
      {
        self.barcodeReady(_e.data);
      }    
    })


    this.on('entered', (_params) => { 
      self.params = _params 
      if(!_params || !_params.SSCCPC)
      {
        self.curSSCCPC = ""
        self.noSSCC = true                       
      } 
      else
      {
        // load list for the given master sscc
        self.curSSCCPC = _params.SSCCPC
        self.noSSCC = false               
        self.readList()
      } 
      self.update()
      self.initChooseList()
      self.fillChooseList()                   
    }) 

    createSSCC(_unit)
    {
      application.setBusy(true)
      application.sageX3Connector.modulePackaging.createSSCCHeader(true, _unit, "").then(function(_result){ 
        self.curSSCCPC = _result.SSCCPC
        self.noSSCC = false
        application.setBusy(false)
        self.update()
      }).catch(function(_error){         
        application.logError(_error.toString())
        application.setBusy(false)
      })     
    }


    initChooseList()
    {
      var element = document.getElementById("app-list-packChoose")
      if(element && element._tag && !element._tag.selectionCallback)
      {
        document.getElementById("app-list-packChoose")._tag.selectionCallback = function(_itemData){        
          if(_itemData.unit)
          {
            // TODO: fill unit @@@            
            self.createSSCC(_itemData.unit)
            // TODO: @@@  
          }
        } 
      }       
    }


    fillChooseList()
    {
      // TODO: make dynamic
      var listData = [  { 'id' : '1', 'unit' : 'PAL', 'text' : 'PAL',  'infoText' : '', 'shortcutText' : 'F1'},
                        { 'id' : '2', 'unit' : 'H1',  'text' : 'H1',   'infoText' : '', 'shortcutText' : 'F2'}
                     ]
      var listComponent = document.getElementById("app-list-packChoose")
      if(listComponent)
        listComponent._tag.setListData(listData)     
    }


    readList()
    {
      application.setBusy(true)      
      application.sageX3Connector.modulePackaging.getPackageLines(self.curSSCCPC).then(function(_result){
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
        _listData = new Array()                    
      var listComponent = document.getElementById("app-list-packChilds")
      listComponent._tag.setListData(_listData)
      listComponent._tag.selectionCallback = function(_itemData){  

      }    
      self.update()
    } 

    barcodeReady(_data)
    {   
      // Allow barcode scanning if we do have a valid master sscc
      if(self.noSSCC == false)
      {
        // TODO: @@@
        // if sscc already exists it will be removed, otherwise it will be added to the master (this will be done in the backend)
        // backend.barcodeScanned(sscccode,)
        // --> returns add or delete info...
        application.setBusy(true)      
        application.sageX3Connector.modulePackaging.packlistBarcodeScanned(self.curSSCCPC, _data.value).then(function(_result){
          self.updateListData(_result)
          application.setBusy(false)
        }).catch(function(_error){         
          application.logError(_error.toString())
          application.setBusy(false)
        })    
      }
      else
      {
        application.logError("Keine Master Packung ausgewählt!")
      }
    }
    

    name(){
      return "Palettierung" // LABEL
    }            


  </script>  

</app-view-packaging-packlist>