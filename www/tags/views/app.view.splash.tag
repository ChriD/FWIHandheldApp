<app-view-splash>

  <div class="flex">    
    <div>
      <div class="centerText imageContainer"><img src="assets/images/FWI_Logo_Letyourworkflow.png" width="100%"></img><div>     
    </div>
  </div>

  <style>  
    :scope {
      background-color: #232323;
      color: #FFFFFF;
      display: block;
      width: 100%;
      height: 100%;
    }

    .flex {
      width: 100%;
      height: 100%;
      display: flex;    
      align-items: center;    
      justify-content: center;
    }

    .imageContainer {
      margin-left:20%;
      margin-right:20%;
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

</app-view-splash>