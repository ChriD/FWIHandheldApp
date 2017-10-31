<app-view-home>
  
  <app-list menuitemtag="app-list-menuitem" id="app-list-main"></app-list>
  
  <style>      
  </style>

  <script>  
    var self = this;

    var mainMenuListData = [  { 'id' : '1', 'viewTagName' : 'app-view-productionusage',   'text' : 'Produktionsverbrauch',        'infoText' : 'Verbrauch von Artikeln buchen', 'shortcutText' : 'F1'},                              
                              /*
                              { 'id' : '1', 'viewTagName' : 'app-view-counting',          'text' : 'Inventur',                    'infoText' : 'Inventieren von Artikel', 'shortcutText' : 'F1'},
                              { 'id' : '2', 'viewTagName' : 'app-view-iteminfo',          'text' : 'Artikelinfo',                 'infoText' : 'Informationen zum Artikel', 'shortcutText' : 'F2'},
                              */
                              { 'id' : '3', 'viewTagName' : 'app-view-appsettings',       'text' : 'Einstellungen',               'infoText' : 'Einstellungen für die Applikation', 'shortcutText' : 'F11'},                            
                              { 'id' : '4', 'viewTagName' : '',                           'text' : 'Beenden',                     'infoText' : 'Beenden der Applikation', 'shortcutText' : 'F12'} ]

    // every view tag needs to callback the mounted method so the <app-view> tag will know when its only child is mounted
    this.on('mount', () => {      
      if(self.opts.mountedCallback)
        self.opts.mountedCallback();    

      var listComponent = document.getElementById("app-list-main")
      listComponent._tag.setListData(mainMenuListData)
      listComponent._tag.selectionCallback = function(_itemData){        
        if(_itemData.viewTagName)
        {
          application.logDebug("Change app view to : " + _itemData.viewTagName)
          application.changeAppView(_itemData.viewTagName);
        }
        else
        {
          application.exitApp();
        }
      }      
    })   


    this.on('handleKey', (_e) => {            
      var listComponent = document.getElementById("app-list-main")   
      listComponent._tag.trigger("handleKey", _e) 

      if(!_e.isPropagationStopped)
      {
        // Handle F(x) keys!
        if(_e.keyCode == 112) application.changeAppView("app-view-productionusage")      // F1
        //if(_e.keyCode == 113) application.changeAppView("app-view-iteminfo")      // F2
        if(_e.keyCode == 122) application.changeAppView("app-view-appsettings")   // F11
        if(_e.keyCode == 123) application.exitApp();                              // F12
      }
      
      _e.isPropagationStopped = true

    })


    name(){
      return "Dash" // LABEL
    }

  </script>  

</app-view-home>