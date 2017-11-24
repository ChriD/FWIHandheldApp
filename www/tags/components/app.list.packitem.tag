<app-list-packitem>

  <div class="item">   
    <div class="left">  
      { packnr } 
    </div>
    <div class="right">
      <div class="centerAll">   
        { packUnit }    
      <div>
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

    .centerAll {
      width: 100%; 
      height: 100%;                            
      display: flex;
      /*align-items: center;*/
      justify-content: flex-end;
    }
  </style>

  <script>
    var self = this
    self.packnr         = this.opts.listItemData.SSCCCOD
    self.packUnit       = this.opts.listItemData.SSCCUNIT

    this.on('mount', () => {         
      self.root.firstChild.onclick = function(){                        
        self.root.parentElement._tag.itemClicked(self.root.dataset.idx)
      }      
    })

  </script>   

</app-list-packitem>