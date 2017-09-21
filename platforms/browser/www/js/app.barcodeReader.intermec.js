
class AppBarcodeReader_Intermec extends AppBarcodeReader
{     
    constructor() 
    { 
        super()        
    }


    init()
    {
        super.init();        
        if(!this.barcodeReader)
        {
            this.logDebug(" staring barcode reader setup")
            this.barcodeReader = new BarcodeReader(null, this.setupBarcodeReaderComplete(this))
        }
    }


    close()
    {
        super.close()
    }


    setupBarcodeReaderComplete(self)
    {
        return function(_result)
        {
            if (_result.status === 0)
            {
                self.logDebug("BarcodeReader setup successfull")
                self.barcodeReader.setBuffered("Symbology", "Code39", "Enable", "true", self.setBufferedComplete(self));
                self.barcodeReader.setBuffered("Symbology", "Code128", "EnableCode128", "true", self.setBufferedComplete(self));
                self.barcodeReader.commitBuffer(self.commitComplete(self));

                 // Add an event handler for the barcodedataready event
                 self.barcodeReader.addEventListener("barcodedataready", self.barcodeDataReady(self), false); 
            }
            else
            {
                self.logError("Failed to setup BarcodeReader: " + _result.message)
            }
        }
    }


    setBufferedComplete (self)
    {
        return function(_result)
        {
            if (_result.status !== 0)
            {
                self.logError("Failed to setup BarcodeSymbology " + _result.family + ": " + _result.message, _result)                
            }
        }
    }


    commitComplete (self)
    {
        return function(_resultArray)
        {
            if(_resultArray.length > 0)
            {
                for (var i = 0; i < _resultArray.length; i++)
                {
                    var result = _resultArray[i];
                    if (result.status !== 0)
                    {
                        self.logError("Commit Buffer failed: " + result.status + ": " + result.message, result)                       
                    }
                } 
            }
        }        
    }


    closeBarcodeReader()
    {
        var self = this
        if (self.barcodeReader)
        {            
            self.barcodeReader.close(function(result) {
                if (result.status === 0)
                {
                    self.logError("Barcode Reader closed")                    
                    self.barcodeReader = null;                    
                }
                else
                {
                    self.logError("Error on closing barcode reader: " + result.status + " : " + result.message)                   
                }
            });
        }
    }


    barcodeDataReady(self)
    {
        return function(_data, _type, _time)
        {
            self.logDebug("Barcode scanned: " + _type +  " -> " + _data)
            var event = new CustomEvent("BarcodeReader.dataReady", { detail: { "type"   : _type,
                                                                               "value" : _data}
                                                                   })
            document.dispatchEvent(event);            
        }
    }

}