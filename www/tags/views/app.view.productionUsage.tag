<app-view-productionUsage class="view">
  
   <div class="view-content">
      <div id="productionusage_container" class="view-contentContainer">     

        <!-- TODO: create scan prompter / info tag -->
        <!-- scan prompter to tell the user what he has to scan -->
        <div id="productionusage-scanPrompter" class="scanPrompter">
          <div class="centerAll">{ scanPrompterText }</div>          
        </div>

        <div id="productionusage-scanData" class="scanData">
          <div class="centerAll">{ lastScannedCode }</div>
        </div>

        <div id="productionusage-scanError" class="scanError">
          <div class="centerAll">{ scanErrorText }</div>
        </div>

        <!-- scanned item informations -->
        <div class="data">
          <app-item-descriptionAndValue id="productionusage-item-dv-item"       description="Art. Nr.:"     desWidth="5em"></app-item-descriptionAndValue>
          <app-item-descriptionAndValue id="productionusage-item-dv-itemDes"    description="Bez.:"         desWidth="5em"></app-item-descriptionAndValue>
          <app-item-descriptionAndValue id="productionusage-item-dv-itemBBD"    description="MHD:"          desWidth="5em"></app-item-descriptionAndValue>
          <app-item-descriptionAndValue id="productionusage-item-dv-itemQty"    description="Menge:"        desWidth="5em"></app-item-descriptionAndValue>        
          <!--<app-item-descriptionAndValue id="productionusage-item-dv-itemQtySTU" description="Menge Lager:"  desWidth="5em"></app-item-descriptionAndValue>-->
          <app-item-descriptionAndValue id="productionusage-item-dv-lot"        description="Charge:"       desWidth="5em"></app-item-descriptionAndValue>
          <app-item-descriptionAndValue id="productionusage-item-dv-weight"     description="Gewicht:"      desWidth="5em"></app-item-descriptionAndValue>
        </div>

        
        <div>
          <button id="productionusage-button-testItm">TEST ITM SCAN</button>
          <button id="productionusage-button-testLot">TEST LOT SCAN</button>                    
        </div>
        
        
        
          
      </div>
    </div>
    <div class="view-buttonrow buttonRow">
      <button id="productionusage-button-post"    class="borderRight" style="width: 49%;">Buchen</button>
      <button id="productionusage-button-cancel"  class=""            style="width: 49%;">Abbrechen</button>
    </div>   

  <style>

    :scope {         
    }

    .scanPrompter {
      width: 100%;
      height: 3em;      
      color: black
    }

    .scanPrompterItm {             
      background: rgb(255,216,0);
    }

    .scanPrompterLot {             
      background: rgb(255,153,45);
    }

    .scanData {
      font-size: 0.75em;
      height: 1em;
      margin-top: 0.5em;
      display: none;
    }

    .scanError {
      width: 100%;
      min-height: 2.25em;                    
      color: red;
      visibility: hidden;
      margin-top: 0.5em;
      margin-bottom: 0.5em;
      font-size: 0.75em;
      overflow-y: scroll;
      margin-top: 0.5em;
    }

    .data {
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
    this.FNC1               = '\u001d'            
    this.currentScantype    = 0
    this.scanPrompterText   = ""
    this.scanErrorText      = ""
    this.lastScannedCode    = ""
    this.scancodeData       = new Object()   
    this.postingLock        = true       

    // every view tag needs to callback the mounted method so the <app-view> tag will know when its only child is mounted
    this.on('mount', () => {      
      if(self.opts.mountedCallback)
        self.opts.mountedCallback()
      
      document.getElementById("productionusage-button-cancel").onclick = function(){                        
        application.getMainViewContainer().showPrevView()
      }    

      document.getElementById("productionusage-button-post").onclick = function(){
        self.post().then(function(){
          self.setScanType(0)
        }).catch(function(_error){          
          self.postingError(_error)
        })
      } 

      // TEST -->
      
      
      document.getElementById("productionusage-button-testItm").onclick = function(){
        var e = new Object()        
        e.value = "0199004699954211151805263010"
        //e.value = "0104002540351907151805263010"
        //e.value = "010400254035190715181113100011946474"
        self.barcodeReady(e)
      }   

      document.getElementById("productionusage-button-testLot").onclick = function(){
        var e = new Object()
        e.value = "100003470970008" + self.FNC1 + "310301000090K3"
        self.barcodeReady(e)
      }  

    })


    this.on('handleKey', (_e) => {      
      console.log("handleKey trigger 2")
    })   


    this.on('requestPrevViewId', (_args) => {       
      _args.viewId  = "app-view-home"
    })  


    this.on('entered', (_e) => {      
      // reset scantype and clear all data when reentring the form
      self.lastScannedCode = ""
      self.resetScan()
    })


    this.on('action', (_e) => {      
      if(_e.action == "barcodeReady")      
        self.barcodeReady(_e.data)     
    })


    postingError(_error)
    {
      self.setScanType(0)
      self.setScanError("Buchen fehlgeschlagen: " + _error)
      application.audioError()
    }

    isEmpty(_val)
    {
      if (!_val)
        return true
      if (_val == "0")
        return true
      return false
    }

    barcodeReady(_data)
    {                
      self.setScanError("")
      self.lastScannedCode = _data.value

      if(self.scancodeData.ITMREF && self.scancodeData.LOT)
        self.resetScan()
  
      application.setBusy(true)
      
      application.sageX3Connector.moduleProductionUsage.getScanCodeInformations(_data.value, _data.type, 1, 1, self.FNC1).then(function(_result){
          
          if((!_result.ITMREF && !self.scancodeData.ITMREF) || (_result.LOT && !self.scancodeData.ITMREF && !_result.ITMREF))
          {
            self.setScanError("Keinen Artikel gescannt!")            
          }
          else if(!_result.LOT && self.scancodeData.ITMREF )
          {
            self.setScanError("Keinen Charge gescannt!")            
          }          
          else
          {   
            // we do have a valid scan so we "merge" the data from multiple different scans
            // in fact we may have 2 scans if the lot is not within the first scan. We always do need itemid and lot at least
            if(!self.isEmpty(_result.ITMREF))     self.scancodeData.ITMREF      = _result.ITMREF
            if(!self.isEmpty(_result.ITMDES))     self.scancodeData.ITMDES      = _result.ITMDES
            if(!self.isEmpty(_result.EAN))        self.scancodeData.EAN         = _result.EAN
            if(!self.isEmpty(_result.BBD))        self.scancodeData.BBD         = _result.BBD          
            if(!self.isEmpty(_result.LOT))        self.scancodeData.LOT         = _result.LOT
            if(!self.isEmpty(_result.QTY))        self.scancodeData.QTY         = _result.QTY
            if(!self.isEmpty(_result.UOM))        self.scancodeData.UOM         = _result.UOM
            if(!self.isEmpty(_result.QTYSTU))     self.scancodeData.QTYSTU      = _result.QTYSTU
            if(!self.isEmpty(_result.STU))        self.scancodeData.STU         = _result.STU
            if(!self.isEmpty(_result.WEIGHT))     self.scancodeData.WEIGHT      = _result.WEIGHT
            if(!self.isEmpty(_result.WEIGHTUNIT)) self.scancodeData.WEIGHTUNIT  = _result.WEIGHTUNIT
          }

          // remove the posting lock after a valid 2 part scan
          if(self.scancodeData.ITMREF && self.scancodeData.LOT)
            self.postingLock = false

          // if we do have filled itmref and we do not have a lot, we have to scan the lot,
          // so set scanytpe to 1 (that means user has to scan a lot)
          if(self.scancodeData.ITMREF && !self.scancodeData.LOT)
          {
            self.setScanType(1)
          }
          // if lot and itmref are filled we do have all data we need for posting, If auto post is enabled
          // we do post and reset scan type and scancode data to 0. If not we have to wait for click on posting
          if(self.scancodeData.ITMREF && self.scancodeData.LOT)
          {
            if(application.getAppSettings().PRODUSAGE_AUTOCONFIRMPOST == true)
            {              
              self.post().then(function(){                
                self.setScanType(0)
              }).catch(function(_error){    
                self.postingLock = true                            
                self.postingError(_error)
                self.updatePostButton()
              })                              
            }  
            else
            {
              self.updatePostButton()
              // Wait for POST Button to be pressed or a new item scan              
            }
          }                    

          self.updateItemDescValue()
          self.update()          
          

          application.setBusy(false)
        }).catch(function(_error){          
          self.setScanError(_error)
          application.setBusy(false)
        })
    }


    post()
    {
      if(self.isPostingAllowed() == false)
        return

      return new Promise(function(_resolve, _reject){	
        application.sageX3Connector.moduleProductionUsage.createAndPostItemUsage(self.scancodeData.ITMREF, self.scancodeData.QTYSTU, "", self.scancodeData.LOT).then(function(_result){
          _resolve()
        }).catch(function(_error)
        {
          _reject()
        })
      })
    }

    isPostingAllowed(_allowed)
    {      
      return self.scancodeData.ITMREF && self.scancodeData.LOT && !self.postingLock   
    }

    updatePostButton()
    {
      if(self.isPostingAllowed())
        document.getElementById("productionusage-button-post").classList.remove('disabled')
      else
        document.getElementById("productionusage-button-post").classList.add('disabled')
    }
      

    // unfortunately it seems that riot can not update the opts values of tags (non observable)
    // so we do have create this method to set the values 'oldSchool'
    updateItemDescValue()
    {
      document.getElementById('productionusage-item-dv-item')._tag.setValue(self.scancodeData.ITMREF)
      document.getElementById('productionusage-item-dv-itemDes')._tag.setValue(self.scancodeData.ITMDES)      
      document.getElementById('productionusage-item-dv-itemBBD')._tag.setValue(self.scancodeData.BBD)
      document.getElementById('productionusage-item-dv-itemQty')._tag.setValue(self.scancodeData.QTY + " " + self.scancodeData.UOM)
      //document.getElementById('productionusage-item-dv-itemQtySTU')._tag.setValue(self.scancodeData.QTYSTU + " " + self.scancodeData.STU)
      document.getElementById('productionusage-item-dv-lot')._tag.setValue(self.scancodeData.LOT)
      document.getElementById('productionusage-item-dv-weight')._tag.setValue(self.scancodeData.WEIGHT + " " + self.scancodeData.WEIGHTUNIT)      
    }


    resetScanView()
    {           
      self.setScanType(0)
      self.setScanError("")  
      self.updateItemDescValue()    
    }


    resetScan()
    {
      self.scancodeData = new Object();
      self.scancodeData.ITMREF  = ""
      self.scancodeData.ITMDES  = ""
      self.scancodeData.LOT     = ""
      self.scancodeData.WEIGHT  = 0
      self.scancodeData.QTY     = 0
      self.scancodeData.QTYSTU  = 0
      self.scancodeData.UOM     = ""
      self.scancodeData.STU     = ""
      self.scancodeData.WEIGHTUNIT = ""
      self.resetScanView()
      self.updatePostButton()
    }


    setScanType(_scantype)
    {
      self.currentScantype = _scantype

      document.getElementById("productionusage-scanPrompter").classList.remove("scanPrompterItm")
      document.getElementById("productionusage-scanPrompter").classList.remove("scanPrompterLot")

      if(_scantype == 0)
      {
        self.scanPrompterText = "Bitte Artikel Scannen"
        document.getElementById("productionusage-scanPrompter").classList.add("scanPrompterItm")        
      }
      if(_scantype == 1)
      {
        self.scanPrompterText = "Bitte Charge Scannen" 
        document.getElementById("productionusage-scanPrompter").classList.add("scanPrompterLot")
      }
      self.update()
    }


    setScanError(_scanError)
    {
      self.scanErrorText = _scanError
      if(self.scanErrorText == "")
      {
        document.getElementById("productionusage-scanError").style.visibility = 'hidden'
      }
      else
      {
        document.getElementById("productionusage-scanError").style.visibility = 'visible'
        application.audioError()
      }
      self.update()
    }


    name(){
      return "Produktionsverbrauch" // LABEL
    }              


  </script>  

</app-view-productionUsage>