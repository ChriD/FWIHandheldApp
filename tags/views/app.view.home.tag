<app-view-home>

  <app-list menuitemtag="app-list-menuitem" id="app-list-main"></app-list>
  
  <style>      
  </style>

  <script>  
    var self = this;

    var mainMenuListData = [  { 'id' : '1', 'viewTagName' : 'app-view-counting',    'text' : 'Inventur',        'infoText' : 'Inventieren von Artikel', 'shortcutText' : 'F1'},
                              { 'id' : '2', 'viewTagName' : 'app-view-iteminfo',    'text' : 'Artikelinfo',     'infoText' : 'Informationen zum Artikel', 'shortcutText' : 'F2'},
                              { 'id' : '3', 'viewTagName' : 'app-view-appsettings', 'text' : 'Einstellungen',   'infoText' : 'Einstellungen für die Applikation', 'shortcutText' : 'F11'},
                              { 'id' : '4', 'viewTagName' : '',                     'text' : 'Beenden',         'infoText' : 'Beenden der Applikation', 'shortcutText' : 'F12'} ]

    // every view tag needs to callback the mounted method so the <app-view> tag will know when its only child is mounted
    this.on('mount', () => {      
      if(self.opts.mountedCallback)
        self.opts.mountedCallback();    

      var listComponent = document.getElementById("app-list-main")
      listComponent._tag.setListData(mainMenuListData)
      listComponent._tag.selectionCallback = function(_itemData){        
        if(_itemData.viewTagName)
        {
          app.logDebug("Change app view to : " + _itemData.viewTagName)
          app.changeAppView(_itemData.viewTagName);
        }
      }      
    })   


    this.on('handleKey', (_e) => {            
      var listComponent = document.getElementById("app-list-main")   
      listComponent._tag.trigger("handleKey", _e)      
    })


    name(){
      return "Dash" // LABEL
    }

  </script>  

</app-view-home>