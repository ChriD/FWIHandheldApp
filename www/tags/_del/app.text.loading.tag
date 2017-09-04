<animated-text>
  <yield/>   

  <style>    

    animated-text {      
      animation: example 0.75s infinite;
      animation-direction: alternate;
      color: var(--textColorLoading);
    }

    @keyframes example {
      from {color: var(--textColorLoadingAnimStart)}
      to {color: var(--textColorLoadingAnimStop);}
    }

  </style>

</animated-text>