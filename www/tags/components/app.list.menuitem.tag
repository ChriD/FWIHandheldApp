<app-list-menuitem>

  <div class="menuItem">   
    <div class="left">     
      <div class="mainline">{ text }</div>
      <div class="infoline">{ infoText }</div>        
    </div>
    <div class="right">
      <div class="shortcut">{ shortcutText }</div>
    </div>
  </div>

  <style>   
    .menuItem {
      padding: 0.8em 1.0em 0.8em 1.0em;
      border-bottom: 1px solid grey;
      display: flex;
    }

    /*
    .menuItem:hover {
      background-color: rgb(238,114,3);
      color: #FFFFFF;
    }*/

    .menuItem.selected {
      background-color: rgb(238,114,3);
    }

    .menuItem .left {
      flex: 1 1 auto;
    }

    .menuItem .right {
      width: 230px;
      flex: 1 1 4em;
      position: relative;
    }

    .infoline {
      color: #BBBBBB;
      font-size: 0.8em;
    } 

    .infoline.selected {
      color: #FFFFFF;      
    }   

    .shortcut {
      float: right; 
      position: absolute;
      top: 50%;
      right: 0px;
      transform: translate(0%,-50%);               
    }
  </style>

  <script>
    var self = this;

    this.text         = this.opts.listItemData.text;
    this.infoText     = this.opts.listItemData.infoText 
    this.shortcutText = this.opts.listItemData.shortcutText

    this.on('mount', () => {         
      self.root.firstChild.onclick = function(){                
        app.logDebug("Clicked menu item: " + self.text + " (" + self.root.id + ")")
        self.root.parentElement._tag.itemClicked(self.root.dataset.idx)
      }      
    })

    setText(_text) {
      self.text = _text
      self.update()
    }

    setInfoText(_infoText) {
      self.infoText = _infoText
      self.update()
    }

    setShortcutText(_shortcutText) {
      self.shortcutText = _shortcutText
      self.update()
    }
   
  </script>   

</app-list-menuitem>