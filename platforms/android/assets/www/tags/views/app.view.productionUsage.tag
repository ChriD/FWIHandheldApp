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
        <app-item-descriptionAndValue id="productionusage-item-dv-item"     description="Art. Nr.:"></app-item-descriptionAndValue>
        <app-item-descriptionAndValue id="productionusage-item-dv-itemDes"  description="Bez.:"    ></app-item-descriptionAndValue>        
        <app-item-descriptionAndValue id="productionusage-item-dv-lot"      description="Charge:"  ></app-item-descriptionAndValue>      

        <div>
          <button id="productionusage-button-testItm">TEST ITM SCAN</button>
          <button id="productionusage-button-testLot">TEST LOT SCAN</button>
          <button id="productionusage-button-reset">Reset</button>
          <button id="productionusage-button-post">Buchen</button>
        </div>
          
      </div>
    </div>
    <div class="view-buttonrow buttonRow">
      <button id="productionusage-button-next"    class="borderRight" style="width: 49%;">Weiter</button>
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
    }

    .scanError {
      width: 100%;
      height: 1em;                    
      color: red;
      visibility: hidden;
      margin-top: 0.5em;
      margin-bottom: 0.5em;
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
    //this.FNC1               = 
    //100003470970008310301000090K3
    this.currentScantype    = 0
    this.scanPrompterText   = ""
    this.scanErrorText      = ""
    this.lastScannedCode    = ""
    this.scancodeData       = new Object()      

    // every view tag needs to callback the mounted method so the <app-view> tag will know when its only child is mounted
    this.on('mount', () => {      
      if(self.opts.mountedCallback)
        self.opts.mountedCallback();
      
      document.getElementById("productionusage-button-next").onclick = function(){               
      }  
      
      document.getElementById("productionusage-button-cancel").onclick = function(){                        
        app.getMainViewContainer().showPrevView();
      }    

      // TEST -->
      document.getElementById("productionusage-button-testItm").onclick = function(){
        var e = new Object()
        //e.value = "]C1(01)99004699954211(15)180526(30)10"
        e.value = "0199004699954211151805263010"
        self.barcodeReady(e)
      }   

      document.getElementById("productionusage-button-testLot").onclick = function(){
        var e = new Object()
        e.value = "100003470970008" + self.FNC1 + "310301000090K3"
        self.barcodeReady(e)
      } 

      document.getElementById("productionusage-button-reset").onclick = function(){
        self.resetScan();
      } 

      document.getElementById("productionusage-button-post").onclick = function(){
        app.sageX3Connector.moduleProductionUsage.createAndPostItemUsage("07015", 10, "0", "DUCHTEST0003").then(function(_result){

        }).catch(function(_error)
        {
        
        });
      } 
      
      // TEST <--      

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
        self.barcodeReady(_e.data);      
    })

    barcodeReady(_data)
    {      
      //var newNode = document.createElement('div');    
      //newNode.innerHTML = _data.value;  
      //document.getElementById("productionusage_container").appendChild(newNode);      
      
      self.setScanError("")
      self.lastScannedCode = _data.value

      if(self.scancodeData.ITMREF && self.scancodeData.LOT)
        self.resetScan()
  
      app.setBusy(true)
      
      app.sageX3Connector.moduleProductionUsage.getScanCodeInformations(_data.value, _data.type, 1, 1).then(function(_result){
          
          if(!_result.ITMREF && !self.scancodeData.ITMREF || _result.LOT && !self.scancodeData.ITMREF)
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
            if(_result.ITMREF)  self.scancodeData.ITMREF   = _result.ITMREF
            if(_result.ITMDES)  self.scancodeData.ITMDES   = _result.ITMDES
            if(_result.EAN)     self.scancodeData.EAN      = _result.EAN
            if(_result.BBD)     self.scancodeData.BBD      = _result.BBD          
            if(_result.LOT)     self.scancodeData.LOT      = _result.LOT
            if(_result.QTY)     self.scancodeData.QTY      = _result.QTY
            if(_result.UOM)     self.scancodeData.UOM      = _result.UOM
            if(_result.QTYSTU)  self.scancodeData.QTYSTU   = _result.QTYSTU
            if(_result.STU)     self.scancodeData.STU      = _result.STU
            if(_result.WEIGHT)  self.scancodeData.WEIGHT   = _result.WEIGHT
          }

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
            self.setScanType(0)
            // do auto post
            
            //  if(autoPost)
            //  {
            //    post()
            //    resetScan();
            //  }
            

            //self.resetScan()
            //self.setScanType(0)
          }          

          // force the "app-item-descriptionAndValue" tags to redraw

          self.updateItemDescValue()
          self.update()          
          

          app.setBusy(false)
        }).catch(function(_error){          
          self.setScanError(_error);
          app.setBusy(false)
        });
    }


    // unfortunately it seems that riot can not update the opts values of tags (non observable)
    // so we do have create this method to set the values 'oldSchool'
    updateItemDescValue()
    {
      document.getElementById('productionusage-item-dv-item')._tag.setValue(self.scancodeData.ITMREF)
      document.getElementById('productionusage-item-dv-itemDes')._tag.setValue(self.scancodeData.ITMDES);
      document.getElementById('productionusage-item-dv-lot')._tag.setValue(self.scancodeData.LOT);     
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
      self.resetScanView()
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
        document.getElementById("productionusage-scanError").style.visibility = 'hidden'
      else
        document.getElementById("productionusage-scanError").style.visibility = 'visible'
      self.update()
    }


    name(){
      return "Produktionsverbrauch" // LABEL
    }              


  </script>  

</app-view-productionUsage>