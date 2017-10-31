<app-footer>
  
  <div class="left">
    <!--    
      <app-icon-fa  id="viewBackIcon" name="fa-arrow-left"></app-icon-fa>
    -->
  </div>
  <div class="right conTo">{ connectedToInfo }</div>

  <style>
    :scope {
      display: block;
      padding: 0.5em;
      padding-left: 1em; 
      padding-right: 1em;
      min-height: 1.2em;
    }

    .right {
      float: right;
      margin-left: 0.75em;
      font-size: 0.75em;
    }

    .left {
      float: left;
      height: 100%;
      font-size: 1.75em;
    }

    .notConnected {
      color: red;
    }

  </style>

  <script>
    this.connectedToInfo = ""

    this.on('mount', () => {         
      document.getElementById("viewBackIcon").onclick = function(){                        
        application.getMainViewContainer().showPrevView() // TODO: @@@ application object""""
      }      
    })


    setConnectedToInfo(_connected, _connectedToInfo) {      
      this.connectedToInfo = _connectedToInfo
      if(!_connected)
        this.getConnectedToElement().classList.add("notConnected")
      else
        this.getConnectedToElement().classList.remove("notConnected")
      this.update()
    }


    getConnectedToElement() {
      var elementList = this.root.getElementsByClassName('conTo');
      if(elementList.length)
        return elementList[0]
      return null
    }

  </script>

</app-footer>