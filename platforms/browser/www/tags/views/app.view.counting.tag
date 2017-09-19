<app-view-counting class="view">
  
  <div class="view-content">
    <div class="view-contentContainer">
      Counting
    </div>
  </div>
  <div class="view-buttonrow buttonRow">
    <button id="counting-button-next"    class="borderRight" style="width: 49%;">Weiter</button>
    <button id="counting-button-cancel"  class=""            style="width: 49%;">Abbrechen</button>
  </div>   

  <style>  
  </style>

  <script>
    var self = this;

    // every view tag needs to callback the mounted method so the <app-view> tag will know when its only child is mounted
    this.on('mount', () => {      
      if(self.opts.mountedCallback)
        self.opts.mountedCallback();

      document.getElementById("counting-button-next").onclick = function(){               
      }  
      
      document.getElementById("counting-button-cancel").onclick = function(){                        
        app.getMainViewContainer().showPrevView();
      } 

    })

    this.on('handleKey', (_e) => {      
      console.log("handleKey trigger 2")
    })   

    this.on('requestPrevViewId', (_args) => {            
      _args.viewId = "app-view-home"
    })  

    name(){
      return "Inventur" // LABEL
    }
    

  </script>  

</app-view-counting>