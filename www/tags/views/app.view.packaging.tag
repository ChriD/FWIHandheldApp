<app-view-packaging class="view">
  
   <div class="view-content">
      <div id="packaging_container" class="view-contentContainer">
        <app-list itemtag="app-list-menuitem" id="app-list-packaging"></app-list>
      </div>
    </div>
    <div class="view-buttonrow buttonRow">
      <button id="packaging-button-next"    class="borderRight" style="width: 49%;"></button>
      <button id="packaging-button-cancel"  class=""            style="width: 49%;">Abbrechen</button>
    </div>   

  <style>  
  </style>

  <script>
    var self = this;

    var listData = [  { 'id' : '1', 'viewTagName' : 'app-view-packaging-packlist',      'text' : 'Neue Palette',         'infoText' : '', 'shortcutText' : 'F1'},
                      { 'id' : '2', 'viewTagName' : 'app-view-packaging-packlistsel',   'text' : 'Palette bearbeiten',   'infoText' : '', 'shortcutText' : 'F2'}
                   ]
    // every view tag needs to callback the mounted method so the <app-view> tag will know when its only child is mounted
    this.on('mount', () => {      
      if(self.opts.mountedCallback)
        self.opts.mountedCallback();        
      
      document.getElementById("packaging-button-next").onclick = function(){               
      }  
      
      document.getElementById("packaging-button-cancel").onclick = function(){                        
        application.getMainViewContainer().showPrevView();
      }    

      var listComponent = document.getElementById("app-list-packaging")
      listComponent._tag.setListData(listData)
      listComponent._tag.selectionCallback = function(_itemData){        
        if(_itemData.viewTagName)
        {
          application.changeAppView(_itemData.viewTagName);
        }        
      }      

    })


    this.on('handleKey', (_e) => {            
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
      return "Palettierung" // LABEL
    }              


  </script>  

</app-view-packaging>