<app-list tabindex="1">   

  <style>    
    :scope {
      outline: none;
    }
  </style>

  <script>
    var self = this
    
    self.itemTagName = self.opts.itemtag
    self.currentSelectedItemId = ""
    self.currentSelectedDataIdx = -1
    self.currentSelectedElement = null
    self.listData = null
    self.selectionCallback = null 
    self.selectionAllowed = self.opts.selectionallowed ? self.opts.selectionallowed : true


    updateData()
    {
      var tagRootElement = self.root;
      while (tagRootElement.firstChild) 
      {
        tagRootElement.removeChild(tagRootElement.firstChild);
      }

      if(!self.listData)
        return;

      try
      {

        for(var i=0; i<self.listData.length; i++) 
        {          
            var childTagOptions = new Object()
            childTagOptions.listItemData = self.listData[i]
            var tagElement = document.createElement(self.itemTagName)
            tagElement.id = self.getListItemId(self.listData[i].id);
            tagElement.dataset.idx = i;
            riot.mount(tagElement, self.itemTagName, childTagOptions)              
            self.root.appendChild(tagElement) 
        }
      }
      catch(_e)
      {
        application.logError(_e.toString())
      }
    }


    getListItemId(_id)
    {
      return self.root.id + '|' + _id
    }

    setListData(_listData)
    {
      self.listData = _listData;
      self.updateData();

      // select the first item if we have new data
      if(self.listData.length)
        self.selectListItemIdx(0);  
    }


    selectListItemIdx(_idx)
    {
      if(!self.selectionAllowed || self.selectionAllowed == "0")
        return

      // remove the old selection
      var elements = self.root.querySelectorAll("[data-idx='" + self.currentSelectedDataIdx + "']")
      if (elements.length)
      {
        var childElements = elements[0].getElementsByTagName("*")        
        for(i=0; i<childElements.length; i++) childElements[i].classList.remove('selected');
        self.currentSelectedItemId  = "";
        self.currentSelectedDataIdx = -1
      }

      // "select" the list item
      var elements = self.root.querySelectorAll("[data-idx='" + _idx + "']")
      if (elements.length)
      {
        var childElements = elements[0].getElementsByTagName("*")        
        for(i=0; i<childElements.length; i++) childElements[i].classList.add('selected');
        self.currentSelectedItemId  = self.getListItemId(elements[0].id);
        self.currentSelectedDataIdx = _idx
        self.currentSelectedElement = elements[0]
      }
      else
      {
        self.currentSelectedElement = null
      }
    }


    selectNextListItem()
    {
      if(self.currentSelectedDataIdx < 0 && self.listData.length > 0)
        self.selectListItemIdx(0)
      else if(self.currentSelectedDataIdx >=0 && self.listData.length > (self.currentSelectedDataIdx + 1) )
        self.selectListItemIdx(self.currentSelectedDataIdx + 1)
      // TODO: if not visible, then scroll down
      //self.root.scrollTop      
    }


    selectPrevListItem()
    {
      if(self.currentSelectedDataIdx < 0 && self.listData.length > 0)
        self.selectListItemIdx(0)
      else if(self.currentSelectedDataIdx >=0 && (self.currentSelectedDataIdx - 1) >= 0 )
        self.selectListItemIdx(self.currentSelectedDataIdx - 1)
      // TODO: if not visible, then scroll up
    }


    itemSelected()
    {
      if(self.selectionCallback && self.currentSelectedDataIdx >= 0)
        self.selectionCallback(self.listData[self.currentSelectedDataIdx])
    }

    
    itemClicked(_idx)
    {
      self.selectListItemIdx(_idx)
      self.itemSelected()
    }
    

    getSelectedElement()
    {
      return self.currentSelectedElement
    }
    

    this.on('handleKey', (_e) => {            
      if(_e.keyCode == 40){          
        self.selectNextListItem()
      }
      if(_e.keyCode == 38){          
        self.selectPrevListItem()
      }
      if(_e.keyCode == 13){          
        self.itemSelected()
      }     
    })
    

    this.on('mount', () => {      
    }) 
   
  </script>   

</app-list>