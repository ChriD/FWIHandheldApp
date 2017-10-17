

class SageX3Connector_ProductionUsage
{     
    constructor(_sageX3Connector) 
    {                      
        this.sageX3Connector    = _sageX3Connector;        
    }	
    
	/**
	 * check if a lot is valid
	 * @param {string} _scancode	 
	 * @param {function} callback function
	 * @return a promise
	 */ 
	scanCode(_scancode, _callback = null)
	{		
		self = this;
		return new Promise(function(_resolve, _reject){			
			var jsonParameters = 
				{
					"INPUT" :		{
										"SCANCODE"  	: _scancode										
									}
				}   
				/*           						
			self.sageX3Connector.callSubprog("PICK|CHECKISVALIDLOT|" + self.requestIdCounter["PICK|CHECKISVALIDLOT"], "XFPICK_IVL", jsonParameters, true, function(_requestId, _data, _error)
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
			*/          
		})
	}


		/**
	 * check if a lot is valid
	 * @param {string} _scancode	 
	 * @param {function} callback function
	 * @return a promise
	 */ 
	createAndPostItemUsage(_itmRef, _qty, _lotFrom, _lotTo, _callback = null)
	{		
		self = this;
		return new Promise(function(_resolve, _reject){			
			var jsonParameters = 
				{
					"INPUT" :		{
										"ITMREF"  	: _itmRef,
										"LOTFROM"  	: _lotFrom,
										"LOTTO"  	: _lotTo,
										"QTYSTU"  	: _qty
									}
				}   
         						
			self.sageX3Connector.callSubprog("ISRE|POSTPRODUCTIONUSAGE", "XFISRE_PPU", jsonParameters, true, function(_requestId, _data, _error)
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

	
}


               