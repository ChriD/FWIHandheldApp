<app-view-appSettings class="view">  
    <!--
    https://www.joshmorony.com/a-summary-of-local-storage-options-for-phonegap-applications/
    we will use indexed db!    
    --> 
    <div class="view-content">
      <div class="view-contentContainer">

        <div class="settings">      
          <div class="settingsItem">
            <div>X3 Webservice Url</div>
            <div><input type="text" id="SETTINGS_X3_URL" data-id="X3_URL"></input></div>
          </div>
          <div class="settingsItem">
            <div>X3 Webservice User</div>
            <div><input type="text" id="SETTINGS_X3_USER" data-id="X3_USER"></input></div>
          </div>
          <div class="settingsItem">
            <div>X3 Webservice Passwort</div>
            <div><input type="password" id="SETTINGS_X3_PASS" data-id="X3_PASS"></input></div>
          </div>
          <div class="settingsItem">
            <div>X3 Webservice Pool</div>
            <div><input type="text" id="SETTINGS_X3_POOLID" data-id="X3_POOLID"></input></div>
          </div>
          <div class="settingsItem">
            <div>X3 Webservice Sprache</div>
            <select id="SETTINGS_X3_LANG" data-id="X3_LANG">
						  <option value="GER">GER - Deutsch</option>
							<option value="ENG">ENG - Englisch (US)</option>
							<option value="BRI">BRI - Englisch (UK)</option>				
					  </select>            
          </div>
        </div>
      </div>

    </div>
    <div class="view-buttonrow buttonRow">
      <button id="appSettings-button-save"    class="borderRight" style="width: 49%;">Speichern</button>
      <button id="appSettings-button-cancel"  class=""            style="width: 49%;">Abbrechen</button>
    </div>   

  <style>  
    :scope {        
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
             
      document.getElementById("appSettings-button-save").onclick = function(){ 
          //
          //app.saveSettings()                       
          app.getMainViewContainer().showPrevView();
        }  

      document.getElementById("appSettings-button-cancel").onclick = function(){                        
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
      return "Einstellungen" // LABEL
    }
    

  </script>  

</app-view-appSettings>