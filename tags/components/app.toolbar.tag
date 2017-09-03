<app-toolbar>

  <div class="left">{ toolbarInfoText }</div>
  <app-clock class="right"></app-clock>
  <app-icon class="right"></app-icon>

  <style>
    :scope {
      display: block;
      padding: 0.5em;
      padding-left: 1em; 
      padding-right: 1em;
    }

    .right {
      float: right;
      margin-left: 0.5em;
    }

    .left {
      float: left;
    }

  </style>

  <script>    
    var self = this;
    this.toolbarInfoText = self.opts.text

    this.on('mount', () => {         
    }) 

    setText(_text) {
      self.toolbarInfoText = _text
      self.update()
    }

  </script>

</app-toolbar>