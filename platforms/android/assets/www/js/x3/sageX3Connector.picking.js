

class SageX3Connector_Picking
{     
    constructor(_sageX3Connector) 
    {                      
        this.sageX3Connector    = _sageX3Connector;
        this.requestIdCounter = {};
        
        this.requestIdCounter["PICK|TICKET"] = 0;
        this.requestIdCounter["PICK|TICKETDETAIL"] = 0;
		this.requestIdCounter["PICK|PICKPROTOCOL"] = 0;
		this.requestIdCounter["PICK|PICKPROTOCOLSUM"] = 0;
		this.requestIdCounter["PICK|ADDPICKPROTOCOL"] = 0;
		this.requestIdCounter["PICK|CANCELPICKPROTOCOL"] = 0;
		this.requestIdCounter["PICK|ABORTPICKPROTOCOL"] = 0;
		this.requestIdCounter["PICK|TRANSFERPICKPROTOCOL"] = 0;
		this.requestIdCounter["PICK|FINISHTICKET"] = 0;
		this.requestIdCounter["PICK|PICKPROTOCOLDIST"] = 0;
		this.requestIdCounter["PICK|UPDATEQUANTITY"] = 0;		
		this.requestIdCounter["PICK|UPDATEMANUALPICKPROT"] = 0;
		this.requestIdCounter["PICK|ADDMANUALPICKPROT"] = 0;
		this.requestIdCounter["PICK|PICKPROTOCOLCOUNT"] = 0;
		this.requestIdCounter["PICK|GETBOXNUMBERS"] = 0;
		this.requestIdCounter["PICK|SAVEBOXNUMBERS"] = 0;
		this.requestIdCounter["PICK|CREATESSCCHEADER"] = 0;
		this.requestIdCounter["PICK|CLOSESSCCHEADER"] = 0;
		this.requestIdCounter["PICK|GETOPENSSCC"] = 0;
		this.requestIdCounter["PICK|LINKSSCC"] = 0;
		this.requestIdCounter["PICK|PRINTDOC"] = 0;	
		this.requestIdCounter["PICK|CHECKISVALIDLOT"] = 0;	
    }	
    
    /**
     * Starts the request for getting a list of the picking tickets
     * @param {string} the ranging criteria 
     * @param {string} the order criteria (not used for now!)
     * @param {function} callback function which is called when request finished (with error or without)
     */ 
    getPickingTicketHeaders(_criteria, _orderCriteria, _callbackFunction) 
    {    		
        var jsonParameters = 
            {
                "SELECTION" :	{
									"CRITERIA"  	: _criteria,
									"ORDERCRITERIA" : _orderCriteria
								}
            };               

        this.requestIdCounter["PICK|TICKET"]++;
        this.sageX3Connector.callSubprog("PICK|TICKET|" + this.requestIdCounter["PICK|TICKET"], "XFPICK_GTH", jsonParameters, false, _callbackFunction);            
    }
        
	
	/**
     * Starts the request for getting a list of picking ticket lines for the specific parameters
     * @param {string} the PRHNUM 	 
	 * @param {integer} if "1" the protocol may lookup lines from other picking lists (with the same BPC and same Shipping date) 
     * @param {function} callback function which is called when request finished (with error or without)
     */ 
    getPickingTicketDetails(_prhnum, _prhspan, _callbackFunction) 
    {    
		if (_prhspan === true) _prhspan = 1;
	
        var jsonParameters = 
            {
                "SELECTION" :	{									
									"PRHNUMCRIT"  	: _prhnum,									
									"PRHSPANCRIT" 	: _prhspan
								}
            };               

        this.requestIdCounter["PICK|TICKETDETAIL"]++;
        this.sageX3Connector.callSubprog("PICK|TICKETDETAIL|" + this.requestIdCounter["PICK|TICKETDETAIL"], "XFPICK_GTD", jsonParameters, false, _callbackFunction);            
    }	
	
	/**
	 * Starts the request for getting a the picking protocol for the specific parameters
	 * @param {string} the PRHNUM 
	 * @param {integer} the PRELIN
	 * @param {string} 
	 * @param {boolean} show cancelled positions
	 * @param {function} callback function which is called when request finished (with error or without)
	 */ 
    getPickingProtocol(_prhnum, _prelin, _sumid, _showCancelled, _callbackFunction) 
    {    		
		if (_showCancelled === true) _showCancelled = 1;	
		
        var jsonParameters = 
            {
                "SELECTION" :	{									
									"PRHNUMCRIT"  		: _prhnum,
									"PRELINCRIT" 		: _prelin,
									"SUMIDCRIT" 		: _sumid,
									"SHOWCANCELLEDCRIT" : _showCancelled
								}
            };               

        this.requestIdCounter["PICK|PICKPROTOCOL"]++;
        this.sageX3Connector.callSubprog("PICK|PICKPROTOCOL|" + this.requestIdCounter["PICK|PICKPROTOCOL"], "XFPICK_GPP", jsonParameters, false, _callbackFunction);            
    }
		
	/**
	 * Starts the request for getting a the picking protocol for the specific parameters
	 * @param {string} the PRHNUM 
	 * @param {integer} the PRELIN	
	 * @param {function} callback function which is called when request finished (with error or without)
	 */ 
    getPickingProtocolSum(_prhnum, _prelin, _callbackFunction) 
    {    						
        var jsonParameters = 
            {
                "SELECTION" :	{									
									"PRHNUM"  		: _prhnum,
									"PRELIN" 		: _prelin
								}
            };               

        this.requestIdCounter["PICK|PICKPROTOCOLSUM"]++;
        this.sageX3Connector.callSubprog("PICK|PICKPROTOCOLSUM|" + this.requestIdCounter["PICK|PICKPROTOCOLSUM"], "XFPICK_GPS", jsonParameters, false, _callbackFunction);            
    }

	/**
	 * Starts the request for getting the record count for the picking protocol
	 * @param {string} the PRHNUM 
	 * @param {integer} the PRHSPAN	
	 * @param {function} callback function which is called when request finished (with error or without)
	 */ 
    getPickingProtocolCount(_prhnum, _prhspan, _callbackFunction) 
    {    
		if (_prhspan === true) _prhspan = 1;

        var jsonParameters = 
            {
                "SELECTION" :	{									
									"PRHNUM"  		: _prhnum,
									"PRHSPAN" 		: _prhspan
								}
            };               

        this.requestIdCounter["PICK|PICKPROTOCOLCOUNT"]++;
        this.sageX3Connector.callSubprog("PICK|PICKPROTOCOLCOUNT|" + this.requestIdCounter["PICK|PICKPROTOCOLCOUNT"], "XFPICK_GPC", jsonParameters, false, _callbackFunction);            
    }


	/**
	 * Starts the request for getting the box numbers
	 * @param {string} the PRHNUM 
	 * @param {integer} the PRHSPAN	
	 * @param {function} callback function which is called when request finished (with error or without)
	 */ 
    getBoxNumbers(_prhnum, _prhspan, _callbackFunction) 
    {    
		if (_prhspan === true) _prhspan = 1;

        var jsonParameters = 
            {
                "SELECTION" :	{									
									"PRHNUM"  		: _prhnum,
									"PRHSPAN" 		: _prhspan
								}
            };               

        this.requestIdCounter["PICK|GETBOXNUMBERS"]++;
        this.sageX3Connector.callSubprog("PICK|GETBOXNUMBERS|" + this.requestIdCounter["PICK|GETBOXNUMBERS"], "XFPICK_GBX", jsonParameters, false, _callbackFunction);            
    }
	

	/**
	 * adds the picking scan-protocol
	 * @param {string} the PRHNUM
	 * @param {integer} the PRELIN
	 * @param {string} the BPC
	 * @param {integer} if "1" the protocol may lookup lines from other picking lists (with the same BPC and same Shipping date) 
	 * @param {string} the SCANCODE
	 * @param {string} a unique id for protocol identification
	 * @param {function} callback function which is called when request finished (with error or without)
	 */ 
    addScanProtocol(_prhnum, _prelin, _bpc, _prhspan, _scancode, _sumId, _ssccpc, _ssccpcsub, _callbackFunction) 
    {    
		if (_prhspan === true) _prhspan = 1;
	
        var jsonParameters = 
            {
                "INPUT" :	{
								"PRHNUM"  	: _prhnum,
								"PRELIN" 	: _prelin,
								"BPC" 		: _bpc,
								"PRHSPAN" 	: _prhspan,
								"SUMID" 	: escapeJSONValue(_sumId),
								"SCANCODE" 	: escapeJSONValue(_scancode),
								"SSCCPC"		: _ssccpc,
								"SSCCPCSUB"		: _ssccpcsub
							}
            };               

        this.requestIdCounter["PICK|ADDPICKPROTOCOL"]++;
        this.sageX3Connector.callSubprog("PICK|ADDPICKPROTOCOL|" + this.requestIdCounter["PICK|PICKPROTOCOL"], "XFPICK_ASP", jsonParameters, true, _callbackFunction);            
    }
	
	/**
	 * adds the picking weighing-protocol
	 * @param {string} the PRHNUM
	 * @param {integer} the PRELIN
	 * @param {decimal} the weight	 
	 * @param {string} the weight unit
	 * @param {string} a unique id for protocol identification
	 * @param {function} callback function which is called when request finished (with error or without)
	 */ 
    addWeighingProtocol(_prhnum, _prelin, _weight, _weightUnit, _lot, _sumId, _ssccpc, _ssccpcsub, _callbackFunction) 
    {    			
        var jsonParameters = 
            {
                "INPUT" :	{
								"PRHNUM"  		: _prhnum,
								"PRELIN" 		: _prelin,
								"WEIGHT" 		: _weight,
								"WEIGHTUNIT" 	: _weightUnit,
								"LOT"			: _lot,
								"SUMID" 		: escapeJSONValue(_sumId),
								"SSCCPC"		: _ssccpc,
								"SSCCPCSUB"		: _ssccpcsub
							}
            };               

        this.requestIdCounter["PICK|ADDPICKPROTOCOL"]++;
        this.sageX3Connector.callSubprog("PICK|ADDPICKPROTOCOL|" + this.requestIdCounter["PICK|PICKPROTOCOL"], "XFPICK_AWP", jsonParameters, true, _callbackFunction);            
    }
	
	/**
	 * cancels a picking protcol line
	 * @param {integer} the PROTID
	 * @param {string} a unique id for protocol identification
	 * @param {function} callback function which is called when request finished (with error or without)
	 */ 
    cancelPickingProtocol(_protId, _sumId,  _callbackFunction) 
    {    			
        var jsonParameters = 
            {
                "INPUT" :	{
								"PROTID"  		: _protId,							
								"SUMID" 		: escapeJSONValue(_sumId)
							}
            };               

        this.requestIdCounter["PICK|CANCELPICKPROTOCOL"]++;
        this.sageX3Connector.callSubprog("PICK|CANCELPICKPROTOCOL|" + this.requestIdCounter["PICK|CANCELPICKPROTOCOL"], "XFPICK_CPP", jsonParameters, true, _callbackFunction);            
    }
	
	/**
	 * cancels a picking protcol line
	 * @param {string} a unique id for protocol summary identification 
	 * @param {function} callback function which is called when request finished (with error or without)
	 */ 
    abortPickingProtocolForSumId(_sumId,  _callbackFunction) 
    {    			
        var jsonParameters = 
            {
                "INPUT" :	{
								"SUMID" 		: escapeJSONValue(_sumId)
							}
            };               

        this.requestIdCounter["PICK|ABORTPICKPROTOCOL"]++;
        this.sageX3Connector.callSubprog("PICK|ABORTPICKPROTOCOL|" + this.requestIdCounter["PICK|ABORTPICKPROTOCOL"], "XFPICK_ABP", jsonParameters, true, _callbackFunction);            
    }
	
	/**
	 * transfers the picking protcol for the summaryId (if given) and for the preline (if given)
	 * @param {string} the PRHNUM 
	 * @param {integer} the PRELIN
	 * @param {string} a unique id for protocol summary identification 
	 * @param {function} callback function which is called when request finished (with error or without)
	 */ 
    transferPickingProtocol(_prhnum, _prelin, _sumId, _callbackFunction) 
    {    			
        var jsonParameters = 
            {
                "INPUT" :	{
								"PRHNUM"  		: _prhnum,
								"PRELIN" 		: _prelin,
								"SUMID" 		: escapeJSONValue(_sumId)
							}
            };               

        this.requestIdCounter["PICK|TRANSFERPICKPROTOCOL"]++;
        this.sageX3Connector.callSubprog("PICK|TRANSFERPICKPROTOCOL|" + this.requestIdCounter["PICK|TRANSFERPICKPROTOCOL"], "XFPICK_TPP", jsonParameters, true, _callbackFunction);            
    }
	
	
	/**
	 * finish the picking ticket (makes it deliverable)
	 * @param {string} the picking ticket number
	 * @param {integer} if "1" the finishing of lines from other picking lists (with the same BPC and same Shipping date) is enabled
	 * @param {array} array of box numbers
	 * @param {function} callback function which is called when request finished (with error or without)
	 */ 
    finishPickingTicket(_prhnum, _prhspan, _postsdh, _postsih, _callbackFunction) 
    { 		
		if (_prhspan === true) _prhspan = 1;
		if (_postsdh === true) _postsdh = 1;
		if (_postsih === true) _postsih = 1;
		
        var jsonParameters = 
            {
                "INPUT" :		{
									"PRHNUM"  		: _prhnum,
									"PRHSPAN" 		: _prhspan,
									"POSTSDH" 		: _postsdh,
									"POSTSIH" 		: _postsih
								}
            };               
		
        this.requestIdCounter["PICK|FINISHTICKET"]++;
        this.sageX3Connector.callSubprog("PICK|FINISHTICKET|" + this.requestIdCounter["PICK|FINISHTICKET"], "XFPICK_FPT", jsonParameters, true, _callbackFunction);            
    }
	
	
	/**
	 * returns the qty distribution for the picking protocol and if there is any need for specifying a qty
	 * @param {string} the PRHNUM 
	 * @param {integer} the PRELIN	
	 * @param {string} a unique id for protocol summary identification 
	 * @param {function} callback function which is called when request finished (with error or without)
	 */ 
    getPickingProtocolQtyDistribution(_prhnum, _prelin, _sumId, _callbackFunction) 
    {    						
        var jsonParameters = 
            {
                "SELECTION" :	{									
									"PRHNUMCRIT"  		: _prhnum,
									"PRELINCRIT" 		: _prelin,
									"SUMIDCRIT" 		: escapeJSONValue(_sumId)
								}
            };               

        this.requestIdCounter["PICK|PICKPROTOCOLDIST"]++;
        this.sageX3Connector.callSubprog("PICK|PICKPROTOCOLDIST|" + this.requestIdCounter["PICK|PICKPROTOCOLDIST"], "XFPICK_GPD", jsonParameters, true, _callbackFunction);            
    }
	
	
	/**
	 * update the picking protocol qty distribution
	 * @param {array} object array 
	 * @param {function} callback function which is called when request finished (with error or without)
	 */ 
    updatePickingProtocolDistQty(_distQtyData, _callbackFunction) 
    {    
	
        var jsonParameters = 
            {
                "INPUT" : _distQtyData
            };               

        this.requestIdCounter["PICK|UPDATEQUANTITY"]++;
        this.sageX3Connector.callSubprog("PICK|UPDATEQUANTITY|" + this.requestIdCounter["PICK|UPDATEQUANTITY"], "XFPICK_UQD", jsonParameters, true, _callbackFunction);            
    }

	
	/**
	 * update data on the manual picking protocol
	 * @param {integer} the protocol unique id	
	 * @param {decimal} the qty in stock unit	
	 * @param {decimal} the qty in sales unit	
	 * @param {string} the lot
	 * @param {function} callback function which is called when request finished (with error or without)
	 */ 
    updateManualPickingProtocol(_protId, _qtySTU, qtySAU, _lot, _bbd, _callbackFunction) 
    {    					
        var jsonParameters = 
            {
                "INPUT" :  	{									
								"PROTID"  		: _protId,
								"QTYSTU" 		: _qtySTU,
								"QTYSAU" 		:  qtySAU,
								"LOT" 			: escapeJSONValue(_lot),
								"BBD"			: dateToX3DateString(_bbd)
							}
            };               

        this.requestIdCounter["PICK|UPDATEMANUALPICKPROT"]++;
        this.sageX3Connector.callSubprog("PICK|UPDATEMANUALPICKPROT|" + this.requestIdCounter["PICK|UPDATEMANUALPICKPROT"], "XFPICK_UMP", jsonParameters, true, _callbackFunction);            
    }
	
	
	/**
	 * add an empty manual picking protocol
	 * @param {string} the PRHNUM 
	 * @param {integer} the PRELIN	
	 * @param {string} a unique id for protocol summary identification 
	 * @param {function} callback function which is called when request finished (with error or without)
	 */ 
    addManualPickingProtocol(_prhnum, _prelin, _lot, _sumId, _ssccpc, _ssccpcsub, _callbackFunction) 
    {    		
        var jsonParameters = 
            {
                "INPUT" :  	{									
								"PRHNUM"  		: _prhnum,
								"PRELIN" 		: _prelin,	
								"LOT"			: _lot,							
								"SUMID"			: escapeJSONValue(_sumId),
								"SSCCPC"		: _ssccpc,
								"SSCCPCSUB"		: _ssccpcsub						
							}
            };               

        this.requestIdCounter["PICK|ADDMANUALPICKPROT"]++;
        this.sageX3Connector.callSubprog("PICK|ADDMANUALPICKPROT|" + this.requestIdCounter["PICK|ADDMANUALPICKPROT"], "XFPICK_AMP", jsonParameters, true, _callbackFunction);            
    }


	/**
	 * save box numbers
	 * @param {string} the picking ticket number
	 * @param {integer} if "1" the finishing of lines from other picking lists (with the same BPC and same Shipping date) is enabled
	 * @param {array} array of box numbers
	 * @param {function} callback function which is called when request finished (with error or without)
	 */ 
    saveBoxNumbers(_prhnum, _prhspan, _boxNumbers, _callbackFunction) 
    {    		
		var inputArray = [];
		if (_prhspan === true) _prhspan = 1;

		for(var i=0; i<=_boxNumbers.length; i++)
		{
			inputArray.push({"BOXNUMBER" : _boxNumbers[i]});
		}	
		
        var jsonParameters = 
            {
                "INPUT" :		{
									"PRHNUM"  		: _prhnum,
									"PRHSPAN" 		: _prhspan
								},
				"INPUTARRAY" : 	inputArray
            };               
		
        this.requestIdCounter["PICK|SAVEBOXNUMBERS"]++;
        this.sageX3Connector.callSubprog("PICK|SAVEBOXNUMBERS|" + this.requestIdCounter["PICK|SAVEBOXNUMBERS"], "XFPICK_SBX", jsonParameters, true, _callbackFunction);            
    }


	/**
	 * create SSCC Headers
	 * @param {string} the picking ticket number
	 * @param {integer} if "1" a accumulated sscc ticket will be written
	 * @return a promise
	 */ 
    createSSCCHeader(_prhnum, _isacc = false, _ssccpcsum = "") 
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
			self.requestIdCounter["PICK|CREATESSCCHEADER"]++;
			self.sageX3Connector.callSubprog("PICK|CREATESSCCHEADER|" + self.requestIdCounter["PICK|CREATESSCCHEADER"], "XFPICK_CSS", jsonParameters, true, function(_requestId, _data, _error)
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
	 * close SSCC Headers
	 * @param {string} the ssccpc number	 
	 * @return a promise
	 */ 
	closeSSCCHeader(_ssccpc) 
	{		
		self = this;
		return new Promise(function(_resolve, _reject){			
			var jsonParameters = 
				{
					"INPUT" :		{
										"SSCCPC"  		: _ssccpc										
									}
				};               			
			self.requestIdCounter["PICK|CLOSESSCCHEADER"]++;
			self.sageX3Connector.callSubprog("PICK|CLOSESSCCHEADER|" + self.requestIdCounter["PICK|CLOSESSCCHEADER"], "XFPICK_XSS", jsonParameters, true, function(_requestId, _data, _error)
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


	/**
	 * link SSCC Headers
	 * @param {string} the main (parent) ssccpc number		 
	 * @param {string} the child sscc	 
	 * @return a promise
	 */ 
	linkSSCC(_ssccpcsum, _ssccpc) 
	{		
		self = this;
		return new Promise(function(_resolve, _reject){			
			var jsonParameters = 
				{
					"INPUT" :		{
										"SSCCPC"  		: _ssccpcsum,
										"SSCCPCSUB"		: _ssccpc
									}
				};               			
			self.requestIdCounter["PICK|LINKSSCC"]++;
			self.sageX3Connector.callSubprog("PICK|LINKSSCC|" + self.requestIdCounter["PICK|LINKSSCC"], "XFPICK_CSL", jsonParameters, true, function(_requestId, _data, _error)
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


	/**
	 * get open SSCC
	 * @param {string} the picking ticket number	 
	 * @return a promise
	 */ 
	getOpenSSCC(_prhnum, _isacc = false) 
	{		
		self = this;
		return new Promise(function(_resolve, _reject){		

			if (_isacc === true) 
				_isacc = 1;
			else
				_isacc = 0;

			var jsonParameters = 
				{
					"SELECTION":	{
										"PRHNUMCRIT"  		: _prhnum,
										"ISACCCRIT"  		: _isacc
									}
				};               			
			self.requestIdCounter["PICK|GETOPENSSCC"]++;
			self.sageX3Connector.callSubprog("PICK|GETOPENSSCC|" + self.requestIdCounter["PICK|GETOPENSSCC"], "XFPICK_GSS", jsonParameters, true, function(_requestId, _data, _error)
			{
				if(_error)
				{
					_reject(_data);
				}
				else
				{				
					var jsonArray = self.sageX3Connector.getArrayDataFromJson(_data, "RESULT");
					_resolve(jsonArray);									
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
			self.requestIdCounter["PICK|PRINTDOC"]++;
			self.sageX3Connector.callSubprog("PICK|PRINTDOC|" + self.requestIdCounter["PICK|PRINTDOC"], "XFPICK_PRI", jsonParameters, true, function(_requestId, _data, _error)
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


	/**
	 * check if a lot is valid
	 * @param {string} lot group
	 * @param {string} lot id
	 * @param {date} date to check for
	 * @return a promise
	 */ 
	checkIsValidLot(_lotGroup, _lot, _dateCheck, _callback = null)
	{		
		self = this;
		return new Promise(function(_resolve, _reject){			
			var jsonParameters = 
				{
					"INPUT" :		{
										"LOTGRP"  		: _lotGroup,
										"LOT"			: _lot,
										"DATECHECK"		: dateToX3DateString(_dateCheck)
									}
				};               			
			self.requestIdCounter["PICK|CHECKISVALIDLOT"]++;
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
		});
    }

	
}


               