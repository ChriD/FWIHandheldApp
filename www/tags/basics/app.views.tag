<app-views tabIndex="1">  
  <yield/>

  <style> 
  </style>

  <script>
    // hide views / show views
    
    var self = this    
    this.currentViewId = "";



    this.on('mount', () => {      
      // when this element is mounted we do show the given view
      self.changeView(self.opts.currentviewid, true); 
      if(self.opts.enablekeyhandler)
        self.addKeyHandlers();       
    })


    this.on('update', () => {      
    })


    this.on('action', (_data) => {      
      var viewElement = document.getElementById(self.currentViewId)        
      if(viewElement)
        viewElement._tag.trigger("action", _data)    
    })


    getFirstViewElementId() {
        // TODO: @@@
      return "";
    }
    

    changeView(_viewId, _force = false, _params = null) {
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
            viewElement._tag.enter(_params)
            self.trigger("changeView", _viewId)
          }
        }
        
        self.currentViewId = _viewId;
        self.update();
      })
    }


    showPrevView()
    {
      var args = new Object();
      var viewElement = document.getElementById(self.currentViewId)
      viewElement._tag.trigger("requestPrevViewId", args);
      if(args.viewId)
        self.changeView(args.viewId) 
    }


    addKeyHandlers()
    {      
      // add the event listener for the views container
      // we do use all keystrokes for the document, in fact w eassuem that there is only one 'views' tag
      // which may receive keydown events, if scope is changing we have to redesign this one!
      document.addEventListener("keydown", function(_e){
        var viewElement = document.getElementById(self.currentViewId)        
        if(viewElement && !viewElement._tag.isCurrentlyAnimated)
        {          
          _e.isPropagationStopped = false;
          viewElement._tag.trigger("handleKey", _e)
          if(!_e.isPropagationStopped)
          {
            if(_e.keyCode == 27)
            {
              self.showPrevView();
            }
          }
        }  

        if ( !_e.metaKey && _e.isPropagationStopped) 
          _e.preventDefault()

      }, false)          
    }

  </script>
</app-views>