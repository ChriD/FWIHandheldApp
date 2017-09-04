<app-icon-fa>

  <i class="fa { iconName }"></i>  

  <style>
    :scope {
      display: block;
    }

    .spinColor {
      color: red;
    }
  </style>

  <script>
    var self = this
    this.iconName = self.opts.name
    
    this.on('mount', () => {      
    }) 


    spin(_spin){
      if(_spin === true)
        self.startSpin();
      else
        self.stopSpin();
    }    

    startSpin(){
      this.root.firstChild.classList.add("fa-spin")
      this.root.firstChild.classList.add("spinColor")
      self.update()
    }

    stopSpin(){
      this.root.firstChild.classList.remove("fa-spin")
      this.root.firstChild.classList.remove("spinColor")
      self.update()   
    }

    setIconName(_iconName){
      self.iconName = _iconName
      self.update()
    }

  </script>

</app-icon-fa>