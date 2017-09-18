<app-view-appSettings>
  
  <div>
  Settings2
  <!--
  https://www.joshmorony.com/a-summary-of-local-storage-options-for-phonegap-applications/
  we will use indexed db!
  -->
    <div>
      <div>X3 Webservice Url</div>
      <div></div>
    </div>

    <div>
      <div>X3 Webservice User</div>
      <div></div>
    </div>

  </div>

  <style>  
  </style>

  <script>
    var self = this;

    // every view tag needs to callback the mounted method so the <app-view> tag will know when its only child is mounted
    this.on('mount', () => {      
      if(self.opts.mountedCallback)
        self.opts.mountedCallback();
    })

    this.on('handleKey', (_e) => {      
      console.log("handleKey trigger 2")
    })   

    this.on('requestPrevViewId', (_args) => {            
      _args.viewId = "app-view-home"
    })  

    name(){
      return "Einstellungen" // LABEL
    }
    

  </script>  

</app-view-appSettings>