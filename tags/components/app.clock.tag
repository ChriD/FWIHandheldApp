<app-clock>

  <div>{ clockVisualString }</div>

  <style>
    :scope {
      display: block;
    }
  </style>

  <script>
    var self = this
    this.clockVisualString = "00:00:00"

    
    this.on('mount', () => {      
      self.updateClock();
      setInterval(function(){
        self.updateClock();          
      },1000)
    }) 

    
    updateClock(){
      var now = new Date();
      //self.clockVisualString = self.addLeading0(now.getHours().toString()) + ":" + self.addLeading0(now.getMinutes().toString())  + ":" + self.addLeading0(now.getSeconds().toString())      
      self.clockVisualString = self.addLeading0(now.getHours().toString()) + ":" + self.addLeading0(now.getMinutes().toString())
      this.update();
    }


    addLeading0(_value){
      return ('0' + _value).slice(-2)
    }

  </script>

</app-clock>