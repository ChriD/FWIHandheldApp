<app-toolbar>

  <div class="left">{ toolbarInfoText }</div>
  <!--
  <app-clock class="right"></app-clock>    
  <app-icon-fa-battery class="right"></app-icon-fa-battery>
  -->

  <!--<app-icon-fa class="right busy" name="fa-hourglass"></app-icon-fa>-->
  <div class="right busy">
    <i class="fa fa-spinner fa-pulse fa-fw"></i>
  </div>

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

    .busy {
      display: none;
    }

  </style>

  <script>    
    var self = this;
    this.toolbarInfoText = self.opts.text
    this.isBusy = false;

    this.on('mount', () => {         
    }) 


    setText(_text) {
      self.toolbarInfoText = _text
      self.update()
    }


    setBusy(_busy){
      self.isBusy = _busy;  
      var busyElement = self.getBusyElement();
      if(busyElement)
      {
        //busyElement._tag.spin(_busy)
        if(!_busy)
          busyElement.style.display = 'none'
        else
          busyElement.style.display = 'block'
      }

    }


    getBusyElement() {
      var elementList = self.root.getElementsByClassName('busy');
      if(elementList.length)
        return elementList[0]
      return null
    }


  </script>

</app-toolbar>