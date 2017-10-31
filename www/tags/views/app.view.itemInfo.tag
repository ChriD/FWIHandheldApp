<app-view-itemInfo class="view">
  
   <div class="view-content">
      <div id="iteminfo_container" class="view-contentContainer">
        ItemInfo
      </div>
    </div>
    <div class="view-buttonrow buttonRow">
      <button id="iteminfo-button-next"    class="borderRight" style="width: 49%;">Weiter</button>
      <button id="iteminfo-button-cancel"  class=""            style="width: 49%;">Abbrechen</button>
    </div>   

  <style>  
  </style>

  <script>
    var self = this;

    // every view tag needs to callback the mounted method so the <app-view> tag will know when its only child is mounted
    this.on('mount', () => {      
      if(self.opts.mountedCallback)
        self.opts.mountedCallback();
      
      document.getElementById("iteminfo-button-next").onclick = function(){               
      }  
      
      document.getElementById("iteminfo-button-cancel").onclick = function(){                        
        application.getMainViewContainer().showPrevView();
      }    

    })


    this.on('handleKey', (_e) => {      
      console.log("handleKey trigger 2")
    })   


    this.on('requestPrevViewId', (_args) => {       
      _args.viewId  = "app-view-home"
    })  


    this.on('action', (_e) => {      
      if(_e.action == "barcodeReady")
      {
        self.barcodeReady(_e.data);
      }    
    })

    barcodeReady(_data)
    {      
      var newNode = document.createElement('div');    
      newNode.innerHTML = _data.value;  
      document.getElementById("iteminfo_container").appendChild(newNode);      
    }


    name(){
      return "Artikelinfo" // LABEL
    }              


  </script>  

</app-view-itemInfo>