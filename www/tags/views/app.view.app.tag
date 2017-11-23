<app-view-app>

  <app-toolbar class="app-toolbar" id="app-toolbar" text="Dash"></app-toolbar>
    <div class="app-content">                 
    <div class="app-contentContainer"> 
      <app-views id="app-appViews" currentViewId="app-view-home" animation="fadeFast" enablekeyhandler="1">      
        <app-view id="app-view-home"                    viewTag="app-view-home"></app-view>
        <app-view id="app-view-counting"                viewTag="app-view-counting"></app-view>
        <app-view id="app-view-iteminfo"                viewTag="app-view-iteminfo"></app-view>
        <app-view id="app-view-appsettings"             viewTag="app-view-appsettings"></app-view>
        <app-view id="app-view-productionusage"         viewTag="app-view-productionusage"></app-view>
        <app-view id="app-view-packaging"               viewTag="app-view-packaging"></app-view>
        <app-view id="app-view-packaging-packlist"      viewTag="app-view-packaging-packlist"></app-view>
        <app-view id="app-view-packaging-packlistsel"   viewTag="app-view-packaging-packlistsel"></app-view>
        <app-view id="app-view-packaging-newpack"       viewTag="app-view-packaging-newpack"></app-view>
      </app-views>      
      
    </div>        
  </div>
  <app-footer id="app-footer" class="app-statusbar"></app-footer>

  <style> 
    :scope {
      background-color: #232323;
      color: #FFFFFF;
      display: flex;
      flex-direction: column;      
      width: 100%;
      height: 100%;
      
    }      
  </style>

  <script>
    var self = this;

    // every view tag needs to callback the mounted method so the <app-view> tag will know when its only child is mounted
    this.on('mount', () => {      
      if(self.opts.mountedCallback)
        self.opts.mountedCallback();

      // when a view is changing we have to update the toolbar text
      application.getViewContainer("app-appViews").on('changeView', (_viewId) => {              
        application.getToolbar().setText(application.getView(_viewId).name())
      })  

      application.connectToBackend()

    })  
   

  </script> 

</app-view-app>