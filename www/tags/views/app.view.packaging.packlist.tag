<app-view-packaging-packlist class="view">
  
   <div class="view-content">
      <div id="packaging_packlist_container" class="view-contentContainer">

        <div id="packaging-packlist-scanPrompter" class="scanPrompter">
          <div class="centerAll">{ scanPrompterText }</div>          
        </div>

        <div id="packaging-packlist-productionusage-scanInfo" class="scanInfo">
          <div class="centerAll">{ scanInfoText }</div>
        </div>

        <!-- if we have no sscc we have to let the user select (for now we do it fixed!) -->        
        <app-list itemtag="app-list-menuitem" id="app-list-packChoose" if={ noSSCC }></app-list>
        
        <!-- TEST -->
        <div>
          <div><input width="100%" id="packagin-packlist-input-test1"></input></div>
          <div><button style="width:100%; height:40px;" id="packagin-packlist-button-test1">TEST</button></div>
        </div>
        <!-- TEST -->

        <app-list itemtag="app-list-packitem" id="app-list-packChilds"></app-list>
      </div>
    </div>
    <div class="view-buttonrow buttonRow">
      <button id="packaging-packlist-button-next"    class="borderRight" style="width: 49%;">{ listActionButtonText }</button>
      <button id="packaging-packlist-button-cancel"  class=""            style="width: 49%;">Zurück</button>
    </div>   

  <style>  
    .scanPrompter {
      width: 100%;
      height: 3em;      
      color: black;
      background: rgb(255,216,0);
    }       

    .scanInfo {
      /*width: 100%;*/
      min-height: 2.25em;                    
      /*color: red;*/
      visibility: hidden;
      margin-top: 0.5em;
      margin-bottom: 0.5em;
      font-size: 0.75em;
      overflow-y: scroll;
      margin-top: 0.5em;
      padding-left: 1em;
      padding-right: 1em;
    }

    .centerAll {
      width: 100%; 
      height: 100%;                            
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>

  <script>
    var self = this
    self.curSSCCPC = ""
    self.noSSCC = true
    self.params = null
    self.isMounted = false
    self.devMode = true

    self.scanPrompterText = ""
    self.scanInfoText     = ""
    self.unitListData     = new Array();
    self.listActionButtonText = ""
    self.curListStatus    = 0
    self.FNC1             = '\u001d' 

    // every view tag needs to callback the mounted method so the <app-view> tag will know when its only child is mounted
    this.on('mount', () => {      
      if(self.opts.mountedCallback)
        self.opts.mountedCallback();        
      
      document.getElementById("packaging-packlist-button-next").onclick = function(){
        switch(self.curListStatus)
        {                     
            // current status is open. we have to close the list
            case 2:              
              application.setBusy(true)
              application.sageX3Connector.modulePackaging.closeSSCCHeader(self.curSSCCPC).then(function(_result){        
                self.setListStatus(3)
                self.updateInfo()
                self.update()
                application.setBusy(false)
                application.getMainViewContainer().showPrevView()
              }).catch(function(_error){         
                application.logError(_error.toString())
                application.setBusy(false)
              })   
              break;
            // current status is closed. we have to open the list
            case 3:
              application.setBusy(true)
              application.sageX3Connector.modulePackaging.reopenSSCCHeader(self.curSSCCPC).then(function(_result){        
                self.setListStatus(2)
                self.updateInfo()
                self.update()
                application.setBusy(false)        
              }).catch(function(_error){         
                application.logError(_error.toString())
                application.setBusy(false)
              })   
              break;              
        }               
      }  

      document.getElementById("packaging-packlist-scanPrompter").onclick = function(){                        
        self.printCurSSCCLabel()
      }   
      
      document.getElementById("packaging-packlist-button-cancel").onclick = function(){                        
        application.getMainViewContainer().showPrevView()
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
      var listComponent = document.getElementById("app-list-packChoose")   
      if(listComponent)
        listComponent._tag.trigger("handleKey", _e) 

      if(!_e.isPropagationStopped)
      {
        // Handle F(x) keys!
        if(_e.keyCode >= 112 && _e.keyCode < (112 + self.unitListData.length))
        {
          self.createSSCC(self.unitListData[(_e.keyCode-112)].unit)
          _e.isPropagationStopped = true 
        }   

        if(_e.keyCode == 0) // TODO: @@@duch  
        {
          // print sscc label
          self.printCurSSCCLabel()         
        }

      }                    
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
      self.setScanInfo("", false)

      if(!_params || !_params.SSCCPC)
      {
        self.curSSCCPC = ""
        self.noSSCC = true   
        self.setListStatus(1)
      } 
      else
      {
        // load list for the given master sscc
        self.curSSCCPC = _params.SSCCPC
        self.noSSCC = false                              
      } 

      if(_params && _params.isClosed)
        self.setListStatus(3)  
      if(_params && !_params.isClosed)
        self.setListStatus(2)     

      self.readList() 
      self.updateInfo()
      self.update()
      self.initChooseList()
      self.fillChooseList()                   
    }) 


    setListStatus(_status)
    {
      self.curListStatus = _status
      if(_status == 1)
        self.listActionButtonText = ""
      else if(_status == 2)
        self.listActionButtonText = "Pallette Schließen"
      else if(_status == 3)
        self.listActionButtonText = "Palette Öffnen"
      self.update()
    }


    updateInfo()
    {
      if(self.noSSCC)
        self.scanPrompterText = "Bitte Typ auswählen"
      else
        self.scanPrompterText = "Bitte Packstück scannen"

      if(self.curListStatus == 3)
        self.scanPrompterText = "Etikett drucken (PRNT)"
    }

    createSSCC(_unit)
    {
      application.setBusy(true)
      application.sageX3Connector.modulePackaging.createSSCCHeader(true, _unit, "").then(function(_result){ 
        self.curSSCCPC = _result.SSCCPC
        self.noSSCC = false
        self.setListStatus(2)
        self.updateInfo()
        application.setBusy(false)
        self.update()
        // print sscc label
        self.printCurSSCCLabel()
      }).catch(function(_error){         
        application.logError(_error.toString())
        application.setBusy(false)
      })     
    }


    printSSCCLabel(_ssccPc, _copies = 1)
    {
      self = this;
      
      if(!application.getAppSettings().SETTINGS_PACKLIST_PRINTER_ETISSCC_ID)
        return Promise.reject("No printer Id for sscc label specified")

      if(!application.getAppSettings().SETTINGS_PACKLIST_PRINTER_ETISSCC_TMPL)
        return Promise.reject("No printer template for sscc label specified")	

      return new Promise(function(_resolve, _reject){	
        self.app.sageX3Connector.modulePackaging.printDocument(application.getAppSettings().SETTINGS_PACKLIST_PRINTER_ETISSCC_ID, application.getAppSettings().SETTINGS_PACKLIST_PRINTER_ETISSCC_TMPL, "SSCCLABEL", _ssccPc, _copies).then(function(_data){					
          _resolve(_data);
        }).catch(function(_data){
          _reject(_data)
        });
      });
    }


    printCurSSCCLabel()
    {
      self.printSSCCLabel(self.curSSCCPC).then(function(){
        // all ok, thats good, nothing to do
      }).catch(function(_error){
        self.setScanInfo("Fehler beim Drucken von Etikett: " + _error.toString() , true)
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
            self.createSSCC(_itemData.unit)           
          }
        } 
      }       
    }


    fillChooseList()
    {      
      if(!application.getAppSettings().PACKLIST_PARENTPACKUNITS)
      {
        self.setScanInfo("Keine Einheiten für Anlage in den Einstellungen angegeben!", true)
        return
      }

      self.unitListData.length = 0 
      
      var units = application.getAppSettings().PACKLIST_PARENTPACKUNITS.split(",")
      for (var i=0; i < units.length; i++) 
      {
        self.unitListData.push({ 'id' : '1', 'unit' : units[i], 'text' : units[i],  'infoText' : '', 'shortcutText' : 'F'+(i+1).toString()})
      }                      
      var listComponent = document.getElementById("app-list-packChoose")
      if(listComponent)
        listComponent._tag.setListData(self.unitListData)
    }


    readList()
    {
      application.setBusy(true)      
      application.sageX3Connector.modulePackaging.getPackageLines(self.curSSCCPC).then(function(_result){
        self.updateListData(_result)
        if(_result.length)
        {
          if(_result[0].ISPARENTCLOSED != "0")
            self.setListStatus(3)
          else
            self.setListStatus(2)
        }
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
        //
      }    
      self.update()
    } 

    barcodeReady(_data)
    {   
      if(self.curListStatus > 2)
      {
        self.setScanInfo("Verpackungs SSCC bereits geschlossen!", true)
        return
      }

      // Allow barcode scanning if we do have a valid master sscc
      if(self.noSSCC == false)
      {        
        // if sscc already exists it will be removed, otherwise it will be added to the master (this will be done in the backend)        
        application.setBusy(true)              
        application.sageX3Connector.modulePackaging.packlistBarcodeScanned(self.curSSCCPC, _data.value, _data.type, 1, 1, self.FNC1).then(function(_result){ 
          if(_result.SSCCACTION == "ADD")
            self.setScanInfo("Packstück hinzugefügt", false)
          if(_result.SSCCACTION == "REMOVE")  
          {          
            self.setScanInfo("Packstück gelöscht", false)
            application.audioAttention()
          }
          application.setBusy(false)
          self.readList()          
        }).catch(function(_error){   
          self.setScanInfo(_error.toString(), true)
          application.logError(_error.toString())
          application.setBusy(false)
        })    
      }
      else
      {
        self.setScanInfo("Keine Master Packung ausgewählt!", true)
        application.logError("Keine Master Packung ausgewählt!")
      }
    }
    

    name(){
      return "Palettierung" // LABEL
    }        


    setScanInfo(_info, _isError = false)
    {
      self.scanInfoText = _info
      if(self.scanInfoText == "")
      {
        document.getElementById("packaging-packlist-productionusage-scanInfo").style.visibility = 'hidden'
        document.getElementById("packaging-packlist-productionusage-scanInfo").style.display = 'none'
      }
      else
      {
        document.getElementById("packaging-packlist-productionusage-scanInfo").style.visibility = 'visible'
        document.getElementById("packaging-packlist-productionusage-scanInfo").style.display = 'block'
        if(_isError)
          application.audioError()
      }

      if(_isError)
        document.getElementById("packaging-packlist-productionusage-scanInfo").style.color = 'red'
      else
        document.getElementById("packaging-packlist-productionusage-scanInfo").style.color = 'green'

      self.update()
    }    


  </script>  

</app-view-packaging-packlist>