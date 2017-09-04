<app-footer>
  
  <app-icon-fa class="left" id="viewBackIcon" name="fa-arrow-left"></app-icon-fa>
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