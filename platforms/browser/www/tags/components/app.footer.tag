<app-footer>
  
  <div class="left">
    <!--    
      <app-icon-fa  id="viewBackIcon" name="fa-arrow-left"></app-icon-fa>
    -->
  </div>
  <div class="right">Connected to: { connectedToInfo }</div>

  <style>
    :scope {
      display: block;
      padding: 0.5em;
      padding-left: 1em; 
      padding-right: 1em;
    }

    .right {
      float: right;
      margin-left: 0.75em;
    }

    .left {
      float: left;
      height: 100%;
      font-size: 1.75em;
    }
  </style>

  <script>
    this.connectedToInfo = ""

    this.on('mount', () => {         
      document.getElementById("viewBackIcon").onclick = function(){                
        app.logDebug("Clicked 'Back'")
        app.getMainViewContainer().showPrevView();
      }      
    })

    setConnectedToInfo(_connectedToInfo) {
      this.connectedToInfo = _connectedToInfo
      this.update();
    }
  </script>

</app-footer>