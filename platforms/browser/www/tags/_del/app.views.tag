<app-views>  
  <yield/>

  <style> 
    :scope {
      overflow: hidden;      
    }
  </style>

  <script>
    // hide views / show views
    
    var self = this    
    this.currentViewId = "";



    this.on('mount', () => {      
      // when this element is mounted we do show the given view
      self.changeView(self.opts.currentviewid, true);  
    })


    this.on('update', () => {      
    })


    getFirstViewElementId() {
      return "";
    }
    

    changeView(_viewId, _force = false) {
      // get first view of childs when the currentViewId is empty, this is the one we will show when we do first mount our view
      if(!_viewId)      
        _viewId = self.getFirstViewElementId();
            
      var viewElement = document.getElementById(_viewId)

      // whenever a view is changeing we 
      viewElement._tag.mountViewTag().then(function(){
      
        // if there is a view which is currently being shown we do hide it if its not the same view (same id)
        if(self.currentViewId && _viewId != self.currentViewId || _force)
        {        
          var viewElement = document.getElementById(self.currentViewId)
          if(viewElement)
          {
            viewElement._tag.leave();
          }
        }

        // show the new view if it differs from the current view
        if(_viewId && _viewId != self.currentViewId || _force)
        {
          var viewElement = document.getElementById(_viewId)
          if(viewElement)
          {
            viewElement._tag.enter();
          }
        }
        
        self.currentViewId = _viewId;
        self.update();
      })

      
      
    }



  // after mount all views are invisible, so do select/show the firts one if "currentView" is empty    
  
  // after switching a view we may unmount the old one or set it invisible, the new one will be mount if not mounted and will be st visible
  // how to make transitions?

  </script>
</app-views>