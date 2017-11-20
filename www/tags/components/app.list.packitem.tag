<app-list-packitem>

  <div class="item">   
    <div class="left">  
       { packnr } 
    </div>
    <div class="right">      
    </div>
  </div>

  <style>   
    .item {
      padding: 0.8em 1.0em 0.8em 1.0em;
      border-bottom: 1px solid grey;
      display: flex;
    }

    .item.selected {
      background-color: rgb(238,114,3);
    }

    .item .left {
      flex: 1 1 auto;
    }

    .item .right {
      width: 230px;
      flex: 1 1 4em;
      position: relative;
    }
  </style>

  <script>
    var self = this
    self.packnr         = this.opts.listItemData.SSCCCOD

    this.on('mount', () => {         
      self.root.firstChild.onclick = function(){                        
        self.root.parentElement._tag.itemClicked(self.root.dataset.idx)
      }      
    })

  </script>   

</app-list-packitem>