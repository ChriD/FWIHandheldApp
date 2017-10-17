<app-line-descriptionAndValue>

  <div>{ description }</div>
  <div>{ value }</div>

  <style>
    :scope {
      display: block;
    }
  </style>

  <script>
    var self = this
    this.description    = ""
    this.value          = ""
    
    this.on('mount', () => {
    })        

  </script>

</app-line-descriptionAndValue>