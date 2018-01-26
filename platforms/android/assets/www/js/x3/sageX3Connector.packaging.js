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
	

	packlistBarcodeScanned(_ssccpc, _barcode, _scancodeType, _addprefix = 1, _checkprefix = 1, _fnc1 = "") 
    {		
		self = this;
		return new Promise(function(_resolve, _reject){

			var jsonParameters = 
				{
					"INPUT" :		{	
										"SSCCPCPARENT" 	: _ssccpc,
										"BARCODE" 		: _barcode,
										"SCANCODETYPE"  : _scancodeType,
										"ADDPREFIX"  	: _addprefix,
										"CHECKPREFIX"  	: _checkprefix,
										"FNC1"			: _fnc1	
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
	

	closeSSCCHeader(_ssccpc) 
    {		
		self = this;
		return new Promise(function(_resolve, _reject){
			var jsonParameters = 
				{
					"INPUT" :		{										
										"SSCCPC" 	: _ssccpc										
									}
				};               						
			self.sageX3Connector.callSubprog("PACK|CLOSESSCCHEADER|", "XFPACK_CLS", jsonParameters, true, function(_requestId, _data, _error)
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


	reopenSSCCHeader(_ssccpc) 
    {		
		self = this;
		return new Promise(function(_resolve, _reject){
			var jsonParameters = 
				{
					"INPUT" :		{										
										"SSCCPC" 	: _ssccpc										
									}
				};               						
			self.sageX3Connector.callSubprog("PACK|REOPENSSCCHEADER|", "XFPACK_ROS", jsonParameters, true, function(_requestId, _data, _error)
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


	selectionBarcodeScanned(_barcode, _anyallowed = false, _scancodeType, _addprefix = 1, _checkprefix = 1, _fnc1 = "") 
    {		
		self = this;
		return new Promise(function(_resolve, _reject){
			var jsonParameters = 
				{
					"INPUT" :		{										
										"BARCODE" 		: _barcode,
										"ANYALLOWED"	: _anyallowed ? "1" : "0",
										"SCANCODETYPE"  : _scancodeType,
										"ADDPREFIX"  	: _addprefix,
										"CHECKPREFIX"  	: _checkprefix,
										"FNC1"			: _fnc1									
									}
				};               						
			self.sageX3Connector.callSubprog("PACK|SELECTIONBARCODESCANNED|", "XFPACK_SBS", jsonParameters, true, function(_requestId, _data, _error)
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


	/**
	 * print a dcoument
	 * @param {string} printer id
	 * @param {string} printer template (may be empty)
	 * @param {string} document id which should be printed
	 * @param {string} document num which should be printed
	 * @param {integer} copies of the document
	 * @return a promise
	 */ 
	printDocument(_printerId, _printerTemplate, _documentId, _documentNum, _copies)
	{		
		self = this;
		return new Promise(function(_resolve, _reject){			
			var jsonParameters = 
				{
					"INPUT" :		{
										"PRINTERID"  		: _printerId,
										"PRINTERTEMPLATE"	: _printerTemplate,
										"DOCUMENTID"		: _documentId,
										"DOCUMENTNUM"		: _documentNum,
										"COPIES"			: _copies
									}
				};               						
			self.sageX3Connector.callSubprog("PICK|PRINTDOC|", "XFPACK_PRI", jsonParameters, true, function(_requestId, _data, _error)
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
						_resolve(jsonData);				
					}
				}
			});            
		});
    }
	
    
}
               