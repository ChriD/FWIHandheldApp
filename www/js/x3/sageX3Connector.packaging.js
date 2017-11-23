class SageX3Connector_Packaging
{     
    constructor(_sageX3Connector) 
    {                      
        this.sageX3Connector    = _sageX3Connector;     
    }
		
	

    getUseablePackages(_sumPackages, _closedOnes, _openOnes, _date, _callback = null)
	{		
        self = this;
        
        if(_sumPackages) 
            _sumPackages = "2"
        else
            _sumPackages = "0"
        if(_closedOnes) 
            _closedOnes = "2"
        if(_openOnes)   
            _openOnes = "2"

		return new Promise(function(_resolve, _reject){			
			var jsonParameters = 
				{
					"SELECTION" :	{
										"ISACCCRIT"  	: _sumPackages,										
										"CLOSEDCRIT"    : _closedOnes,
										"OPENCRIT"  	: _openOnes,
										"CURDATCRIT"  	: dateToX3DateString(_date)
									}
				}   
				           						
			self.sageX3Connector.callSubprog("PACK|XFPACK_GPD", "XFPACK_GPD", jsonParameters, true, function(_requestId, _data, _error)
			{
				if(_callback)
					_callback(_requestId, _data, _error);
					
				if(_error)
				{
					_reject(_data);
				}
				else
				{
					var jsonData = self.sageX3Connector.getArrayDataFromJson(_data, "RESULT");								
					if(jsonData.ERROR)
						_reject(jsonData.ERROR);
					else
					{						
						_resolve(jsonData);				
					}
				}
			});        
		})
	}




	getPackageLines(_ssccpcsum, _callback = null)
	{		
        self = this;              

		return new Promise(function(_resolve, _reject){			
			var jsonParameters = 
				{
					"SELECTION" :	{
										"SSCCPCPARENTCRIT"  	: _ssccpcsum										
									}
				}   
				           						
			self.sageX3Connector.callSubprog("PACK|XFPACK_GPL", "XFPACK_GPL", jsonParameters, true, function(_requestId, _data, _error)
			{
				if(_callback)
					_callback(_requestId, _data, _error);
					
				if(_error)
				{
					_reject(_data);
				}
				else
				{
					var jsonData = self.sageX3Connector.getArrayDataFromJson(_data, "RESULT");								
					if(jsonData.ERROR)
						_reject(jsonData.ERROR);
					else
					{						
						_resolve(jsonData);				
					}
				}
			});        
		})
	}



	
	createSSCCHeader(_isacc, _unit, _fcy) 
    {		
		self = this;
		return new Promise(function(_resolve, _reject){

			if (_isacc === true) 
				_isacc = 1;
			else
				_isacc = 0;

			var jsonParameters = 
				{
					"INPUT" :		{										
										"ISACC" 	: _isacc,
										"UNIT"		: _unit,
										"FCY"		: _fcy
									}
				};               						
			self.sageX3Connector.callSubprog("PACK|CREATESSCCHEADER|", "XFPACK_CSS", jsonParameters, true, function(_requestId, _data, _error)
            {
                if(_error)
				{
					_reject(_data);
				}
				else
				{
					var jsonData = self.sageX3Connector.getArrayDataFromJson(_data, "RESULT");								
                	if(jsonData.ERROR)
						_reject(jsonData.ERROR);
					else
					{
						var jsonObject = self.sageX3Connector.getArrayDataFromJson(_data, "RESULT");
						_resolve(jsonObject);				
					}
				}
			});            
		});
	}
	

	packlistBarcodeScanned(_ssccpc, _barcode) 
    {		
		self = this;
		return new Promise(function(_resolve, _reject){

			var jsonParameters = 
				{
					"INPUT" :		{	
										"SSCCPCPARENT" 	: _ssccpc,
										"BARCODE" 		: _barcode
									}
				};               						
			self.sageX3Connector.callSubprog("PACK|PACKLISTBARCODESCANNED|", "XFPACK_PBS", jsonParameters, true, function(_requestId, _data, _error)
            {
                if(_error)
				{
					_reject(_data);
				}
				else
				{
					var jsonData = self.sageX3Connector.getArrayDataFromJson(_data, "RESULT");								
                	if(jsonData.ERROR)
						_reject(jsonData.ERROR);
					else
					{
						var jsonObject = self.sageX3Connector.getArrayDataFromJson(_data, "RESULT");
						_resolve(jsonObject);				
					}
				}
			});            
		});
    }
    
}
               