<!--  
      This tag is only usable within a <app-views> tag as a direct children 
      It's for having 'persistent' views which can be transitioned/animated and which will stay 'drawed' and working (only set invisible)
      Furthermore the views can be switched by calling a method on the <app-views> tag
-->

<app-view>  
    <!--Dynamically loaded view content (tag) into this -->

  <style>    
    :scope {
      position: absolute;
      width: 100%;
      height: 100%;                 
    }
  </style>


  <script>  

    var self = this;    
    this.viewTag = null;   
    this.viewTagName = self.opts.viewtag;    
    this.isCurrentlyAnimated = false;       
  

    this.on('mount', () => {           
    })
    

    this.on('before-unmount', () => {
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
        console.log(self.opts.id + ": Animation complete: " +  _e.animationName); 
        self.isCurrentlyAnimated = false;             
      })

      self.root.addEventListener("animationstart", function(_e){
        console.log(self.opts.id + ": Animation start: " +  _e.animationName);
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
        // to get the info if the child is mounted we have to attach a callback into the optionsbecause we
        // can not use the 'mount' event trigger because it would be to late after 'riot.mount' and it's to
        // soon before 'riot.mount' because there is no active '_tag' on the element
        var tagElement = document.createElement(self.viewTagName)       
        self.opts.mountedCallback = () => {
          self.root.appendChild(tagElement) 
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
      console.log("Enter view...")
      if(self.animationLeave)
        self.root.classList.remove(self.animationLeave);
      if(self.animationEnter)
        self.root.classList.add(self.animationEnter);        
      // TODO: trigger event for child view
      self.trigger("enter")
    }
    
    /**
     * will be called by the <app-views> element when it want's the view to be hidden     
     */
    leave() {  
      console.log("Leave view...")    
      if(self.animationEnter)
        self.root.classList.remove(self.animationEnter);
      if(self.animationLeave)
        self.root.classList.add(self.animationLeave);
      // TODO: trigger event for child view   
      self.trigger("leave");
    }

  </script>  

</app-view>