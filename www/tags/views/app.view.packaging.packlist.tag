<app-view-packaging-packlist class="view">
  
   <div class="view-content">
      <div id="packaging_packlist_container" class="view-contentContainer">
        Packlist
        <app-list itemtag="app-list-packitem" id="app-list-palchilds"></app-list>
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
    self.params = null
    
    // every view tag needs to callback the mounted method so the <app-view> tag will know when its only child is mounted
    this.on('mount', () => {      
      if(self.opts.mountedCallback)
        self.opts.mountedCallback();        
      
      document.getElementById("packaging-packlist-button-next").onclick = function(){               
      }  
      
      document.getElementById("packaging-packlist-button-cancel").onclick = function(){                        
        application.getMainViewContainer().showPrevView();
      }          

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
        self.createSSCC();
        
      } 
      else
      {
        // load list for the given master sscc
        self.curSSCCPC = _params.SSCCPC
        self.readList();
      }             
    }) 

    createSSCC()
    {
      application.setBusy(true)
      application.sageX3Connector.modulePackaging.createSSCCHeader(true).then(function(_result){ 
        self.curSSCCPC = _result.SSCCPC
        application.setBusy(false)
      }).catch(function(_error){         
        application.logError(_error.toString())
        application.setBusy(false)
      })     
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
      var listComponent = document.getElementById("app-list-palchilds")
      listComponent._tag.setListData(_listData)
      listComponent._tag.selectionCallback = function(_itemData){   
      }      
    } 

    barcodeReady(_data)
    {            
    }
    

    name(){
      return "Palettierung" // LABEL
    }            


  </script>  

</app-view-packaging-packlist>