<app-list-packitemsel>

  <div class="item">   
    <div class="left"> 
      <div>
        <div class="lockicon">
          <i class="fa fa-lock lockedColor" aria-hidden="true" if={ closed }></i>
          <i class="fa fa-unlock" aria-hidden="true" if={ open }></i>          
        </div>        
         { packnr }
      </div>        
    </div>
    <div class="right">
      <div class="centerAll">   
        { packUnit }    
      <div>
    </div>
  </div>

   <app-list itemtag="app-list-menuitem" id="app-list-packChoose" if={ noSSCC }></app-list>

  <style>   

    .lockicon {
      float: left;
      width: 1em;
      margin-right: 0.5em;
    }

    .lockedColor {
      color: red;
    }
 

    .item {
      padding: 0.8em 0.5em 0.8em 0.5em;
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
      flex: 1 1 2.5em;
      position: relative;      
    }

    .centerAll {
      width: 100%; 
      height: 100%;                            
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  </style>

  <script>
    var self = this
    self.packnr         = this.opts.listItemData.SSCCCOD
    self.packUnit       = this.opts.listItemData.SSCCUNIT
    self.closed         = this.opts.listItemData.ISCLOSED == "0" ? false : true
    self.open           = this.opts.listItemData.ISCLOSED != "0" ? false : true

    this.on('mount', () => {         
      self.root.firstChild.onclick = function(){                        
        self.root.parentElement._tag.itemClicked(self.root.dataset.idx)
      }      
    })

  </script>   

</app-list-packitemsel>