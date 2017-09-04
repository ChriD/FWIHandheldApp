<app-view-busy>

  <div class="flex">
    <!-- animated image -->
    <div>
      <div class="centerText"><img src="assets/images/raumfeldLogo.png" width="120px" class="animation-beat2 imageX"></img><div>
      <div class="centerText busyText"><b>{ busyText }</b></div>
      <div class="centerText progressText">{ progressText }</div> 
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

    .centerText {
      display: block;
      text-align: center;
    }

    .busyText {
      font-size: 1.2em;
      font-weight: bold;
      margin: 0 0 0.35em 0
    }

    .progressText {
      font-weight: normal;
    }

    .flex {
      width: 100%;
      height: 100%;
      display: flex;    
      align-items: center;    
      justify-content: center;
    }

    .imageX {
      padding-bottom: 40px;
    }

  </style>

  <script>
    var self = this;

    this.busyText = this.opts.busytext
    this.progressText = this.opts.progresstext 

    // every view tag needs to callback the mounted method so the <app-view> tag will know when its only child is mounted
    this.on('mount', () => {      
      if(self.opts.mountedCallback)
        self.opts.mountedCallback();
    })   

    setBusyText(_busyText) {
      self.busyText = _busyText
      self.update()
    }

    setProgressText(_progressText) {
      self.progressText = _progressText
      self.update()
    }

   

  </script>  

</app-view-busy>