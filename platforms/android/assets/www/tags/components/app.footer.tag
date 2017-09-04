<app-footer>

  <div>Connected to: { connectedToInfo }</div>

  <style>
    :scope {
      display: block;
    }
  </style>

  <script>
    this.connectedToInfo = ""

    setConnectedToInfo(_connectedToInfo) {
      this.connectedToInfo = _connectedToInfo
      this.update();
    }
  </script>

</app-footer>