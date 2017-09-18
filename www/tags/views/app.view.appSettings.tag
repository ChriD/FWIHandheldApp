<app-view-appSettings>
  
  <div class="settings">  
  <!--
  https://www.joshmorony.com/a-summary-of-local-storage-options-for-phonegap-applications/
  we will use indexed db!    
  -->
    <div class="settingsItem">
      <div>X3 Webservice Url</div>
      <div><input type="text"></input></div>
    </div>
    <div class="settingsItem">
      <div>X3 Webservice User</div>
      <div><input type="text"></input></div>
    </div>
    <div class="settingsItem">
      <div>X3 Webservice Passwort</div>
      <div><input type="password"></input></div>
    </div>
    <div class="settingsItem">
      <div>X3 Webservice Pool</div>
      <div><input type="password"></input></div>
    </div>
    <div class="settingsItem">
      <div>X3 Webservice Sprache</div>
      <div><input type="password"></input></div>
    </div>
  </div>

  <div class="buttonRow">
    <button style="width: 49%;">Speichern</button>
    <button style="width: 49%;">Abbrechen</button>
  </div>

  <style>  
    :scope {      
      display: block;      
    }  

    .settings {
      padding: 1em;
    }

    .settingsItem {
      margin-bottom: 0.5em;
    }
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