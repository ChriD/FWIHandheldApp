<!--  
      This tag is only usable within a <app-views> tag as a direct children 
      It's for having 'persistent' views which can be transitioned/animated and which will stay 'drawed' and working (only set invisible)
      Furthermore the views can be switched by calling a method on the <app-views> tag
-->

<app-view>  
  <!--Dynamically loaded view content (tag) into this -->    

  <style>     
  </style>


  <script>  

    var self = this;    
    this.viewTag = null;   
    this.viewTagName = self.opts.viewtag;    
    this.isCurrentlyAnimated = false;
    this.isEnterAnimation = false;
    this.isLeaveAnimation = false;
  

    this.on('mount', () => {           
    })
    

    this.on('before-unmount', () => {
    })    

  
    this.on('handleKey', (_e) => {      
      // reroute to "real" tag view      
      self.root.firstChild._tag.trigger("handleKey", _e)      
    })

    
    this.on('requestPrevViewId', (_args) => {      
      // reroute to "real" tag view      
      self.root.firstChild._tag.trigger("requestPrevViewId", _args)      
    })    



    setAnimations() 
    {          
      this.animation      = this.opts.animation       ? this.opts.animation       : this.parent.opts.animation
      this.animationEnter = this.opts.animationenter  ? this.opts.animationenter  : this.parent.opts.animationenter
      this.animationLeave = this.opts.animationleave  ? this.opts.animationleave  : this.parent.opts.animationleave

      if(!this.animationEnter)
        this.animationEnter = this.animation + "-enter"
      if(!this.animationLeave)
        this.animationLeave = this.animation + "-leave"
      
      self.root.addEventListener("animationend", function(_e){   
        
        if(self.isLeaveAnimation)
          self.left();  
        if(self.isEnterAnimation)
          self.entered();  

        self.isCurrentlyAnimated = false; 
        self.isEnterAnimation = false
        self.isLeaveAnimation = false;
      })

      self.root.addEventListener("animationstart", function(_e){        
        //self.root.style.display = "block";
        self.isCurrentlyAnimated = true;
      })

      this.root.classList.add(self.animation);
    }


    getViewTag() {
      if(!self.viewTag)
        return null;
      return self.viewTag[0];
    }


    mountViewTag() 
    {
      return new Promise(function (_resolve, _reject) {
        // if the view is already mounted we can resolve immediately and then leave the method
        // we do not have to create the tag because it's already there and mounted
        if (self.viewTag)
        {
          _resolve();
          return;
        }

        // otherwise if there are no subtags we have to create the tag/view and wait for it to be mounted
        // to get the info if the child is mounted we have to attach a callback into the options because we
        // can not use the 'mount' event trigger because it would be to late after 'riot.mount' and it's to
        // soon before 'riot.mount' because there is no active '_tag' on the element
        var tagElement = document.createElement(self.viewTagName)       
        self.opts.mountedCallback = () => {
          self.root.appendChild(tagElement) 
          //var el = document.getElementById(self.opts.id + "_X")
          //el.appendChild(tagElement);
          self.setAnimations();
          _resolve();
        } 

        // mount the view with the same options as this tag
        self.viewTag = riot.mount(tagElement, self.viewTagName, self.opts)                  
      })
    }
    

    unmountViewTag() {
      if(self.viewTag)
      {        
        self.viewTag.unmount(true);
      }
    }


    /**
     * will be called by the <app-views> element when it want's the view to be visible     
     */
    enter() {           
      self.trigger("enter")
      //self.viewTag.trigger("enter")
      self.root.style.display = "block";
      //self.root.style.zIndex = "1"; 
      self.isEnterAnimation = true
      if(self.animationLeave)
        self.root.classList.remove(self.animationLeave)
      if(self.animationEnter)      
        self.root.classList.add(self.animationEnter)              
      else
        self.entered();      
    }
    
    /**
     * will be called by the <app-views> element when it want's the view to be hidden     
     */
    leave() {
      self.trigger("leave")
      //self.viewTag.trigger("leave")
      self.isLeaveAnimation = true
      if(self.animationEnter)
        self.root.classList.remove(self.animationEnter)
      if(self.animationLeave)      
        self.root.classList.add(self.animationLeave)      
      else      
        self.left();      
    }

    /**
     * will be called when the 'leave' transition will be finished
     */
    left() {
       //self.root.style.zIndex = "-999";
       self.root.style.display = "none";       
       self.root.firstChild._tag.trigger("left")
    }


    /**
     * will be called when the 'enter' transition will be finished
     */
    entered() {
        //self.root.style.zIndex = "1";        
        self.root.firstChild._tag.trigger("entered")
    }

  </script>  

</app-view>