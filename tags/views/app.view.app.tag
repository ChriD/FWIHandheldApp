<app-view-app>

  <app-toolbar> class="app-toolbar">Header</app-toolbar>
    <div class="app-content">                          
    <div class="app-contentContainer"> 

      <app-views id="app-appViews" currentViewId="app-view-home" animation="fadeFast" enablekeyhandler="1">
        <app-view id="app-view-home"        viewTag="app-view-home"></app-view>                  
        <app-view id="app-view-counting"    viewTag="app-view-counting"></app-view>
        <app-view id="app-view-iteminfo"    viewTag="app-view-iteminfo"></app-view>
        <app-view id="app-view-appsettings" viewTag="app-view-appsettings"></app-view>
      </app-views>      
      
    </div>        
  </div>
  <app-footer class="app-statusbar"></app-footer>

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
    })  

  </script> 

</app-view-app>