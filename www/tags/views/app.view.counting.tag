<app-view-counting>
  
  <div>
  Counting
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
      return "Inventur" // LABEL
    }
    

  </script>  

</app-view-counting>