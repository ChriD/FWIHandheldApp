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
										"SSCCPCSUMCRIT"  	: _ssccpcsum										
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



	
	createSSCCHeader(_isacc = true) 
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
										"PRHNUM"  		: _prhnum,
										"ISACC" 		: _isacc,
										"SSCCPCSUM"		: _ssccpcsum
									}
				};               						
			self.sageX3Connector.callSubprog("PICK|CREATESSCCHEADER|", "XFPACK_CSS", jsonParameters, true, function(_requestId, _data, _error)
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
               