
class AppBarcodeReader extends AppBase
{     
    constructor() 
    { 
        super()
        this.barcodeReader = null;
    }

    additionalLogIdentifier()
    {
        return "Barcode Reader"
    }

    init()
    {        
    }

    close()
    {
    }
}
