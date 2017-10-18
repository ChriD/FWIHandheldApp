<app-view-productionUsage class="view">
  
   <div class="view-content">
      <div id="productionusage_container" class="view-contentContainer">     

        <!-- scan prompter to tell the user what he has to scan -->
        <div id="productionusage-scanPrompter" class="scanPrompter">
          <div class="centerAll">{ scanPrompterText }</div>          
        </div>

        <div id="productionusage-scanError" class="scanError">
          <div class="centerAll">{ scanErrorText }</div>
        </div>

        <!-- scanned item information part -->
        <div id="productionusage-itemInfo">
          <div>
            <div>Art. Nr.:</div>
            <div>{ scancodeData.ITMREF }</div>
          </div>
          </div>
            <div>Bez.:</div>
            <div>{ scancodeData.ITMDES }</div>
          </div>
        </div>


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
    this.currentScantype    = 0
    this.scanPrompterText   = ""
    this.scanErrorText      = ""
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
        e.value = "]C10199004699954211151805263010↔"
        self.barcodeReady(e)
      }   

      document.getElementById("productionusage-button-testLot").onclick = function(){
        var e = new Object()
        e.value = "]C1100003470970008↔310301000090K3↔"
        self.barcodeReady(e)
      } 

      document.getElementById("productionusage-button-reset").onclick = function(){
        self.resetScanView();
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
      self.resetScanView();
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
      
      self.setScanError("");

      app.setBusy(true)
      app.sageX3Connector.moduleProductionUsage.getScanCodeInformations(_data.value).then(function(_result){
          
          // TODO: @@@
          // TODO: clear result if type 1 (item)
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

          // TODO: switch scantypes or show errors

          self.update()
          app.setBusy(false)
        }).catch(function(_error){          
          self.setScanError(_error);
          app.setBusy(false)
        });


      // TODO: deliver barcode to backend and wait for result data
      app.setBusy(false)

      self.setScanError("");

      /*
      if(this.currentScantype == 0)  
      {
        if(_data.value == "A")
        {
          self.setScanType(1);
        }
        else
        {
          self.setScanError("Keinen Artikel gescannt!")
        }
      }


      else if(this.currentScantype == 1)  
      {
        if(_data.value == "B")
        {
          self.setScanType(0);
        }
        else
        {
          self.setScanError("Keinen Charge gescannt!")
        }
      }   
      */      

      // TEST <--

    }


    resetScanView()
    {
      self.setScanType(0)
      self.setScanError("")
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