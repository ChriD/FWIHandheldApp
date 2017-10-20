<app-item-descriptionAndValue>  
  <div class="description" style="width: {deswidth}">{ description }</div>
  <div class="value">{ value }</div>

  <style>
    :scope {
      clear: both;
      display: block;
      width: 100%;
      height: 1em;
    }

    .description {
      float: left;      
    }

    .value {
      float: left;
    }
  </style>

  <script>
    var self = this
    this.description  = this.opts.description 
    this.value        = this.opts.value
    this.deswidth     = this.opts.deswidth

    this.on('mount', () => {      
    })    

    setDescription(_description){
      self.description = _description
      self.update()
    }

    setValue(_value){
      self.value = _value
      self.update()
    }    

  </script>

</app-item-descriptionAndValue>