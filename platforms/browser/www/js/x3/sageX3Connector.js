

class SageX3Connector
{     
    constructor() 
    {                      
        this.x3User             = "";
        this.x3Pass             = "";
        this.x3Lang             = "ENG";        
        this.webSvcPool         = "";  
        this.webSvcPoolId       = ""; 
        this.webSvcUrlPath      = "soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC";
        this.webSvcServer       = "";
        this.basicSoapReqestTpl = "";
		this.objectSoapReqestTpl = "";
        this.initSuccessfull    = false; 
		this.X3Connected		= false;
		this.pingInterval		= 7500;
		this.noPingSended		= true;
        // modules
        this.modulePicking      =  new SageX3Connector_Picking(this);
    }

    /**
     * Initializes the lib. Has to be called before calling any other method!
     * @param {value} the value which will be checked if its empty         
     * @return {boolean} true if init was successful
     */ 
    init(_x3WebSvcServer, _x3WebSvcPool, _x3User, _x3Pass, _x3Lang) 
    {  
        this.logDebug('Initializing SageX3ConnectorJS');    
        this.setWebSvcPool(_x3WebSvcPool);
        this.setWebSvcServer(_x3WebSvcServer);
        this.setUserAndPass(_x3User, _x3Pass); 
		this.setLangauge(_x3Lang);
        this.loadRequestTemplates();
        // loading request templates is a sync action, so we can safely validate for existence of the values (even soap request tpl) here
        if (!this.validateBasicValues())
        {
            this.initSuccessfull = false;
			this.event("SageX3ConnectorJS.ConnectionStateChanged", { connected: this.X3Connected, error: "Verbindungseinstellungen nicht gepflegt!"}); 
            return false;
        }
        if(!this.initSuccessfull)		
            this.startAlivePinger();
        this.initSuccessfull = true;		
        return true;
    }

    /**
    * Event Trigger wrapper         
    */ 
    event(_name, _data)
    {
        var event = new CustomEvent(_name, { detail: _data } )
        document.dispatchEvent(event);
    }
               
    /**
     * Closes the library. This has to be called when the lib is not needed any more.         
     */  
    close() 
    {  
        this.logDebug("Closing SageX3ConnectorJS");           
    }
	
	
	/**
     * Starts the pinging of the X3 System to get its state        
     */  
    startAlivePinger() 
    {         
		setTimeout(this.isAlivePinger(this), 10);	
    }
	
	
	/**
     * Pings the webservice to check if its alive and connection is established         
     */  
    isAlivePinger(_this) 
    {  	
		return function()
        {	
			_this.logDebug("Ping to Sage X3-System"); 			
			_this.callSubprog("PING", "XF_PING", {}, false, _this.isAlivePingerCallback(_this));  
		}			
    }
	
	/**
     * Pings the webservice to check if its alive and connection is established         
     */  
    isAlivePingerCallback(_this) 
    {  
		return function(_requestId, _data, _error)
        {
            if(!_error)
            {
				if(_this.X3Connected === false)
				{
					var jsonObject = _this.getArrayDataFromJson(_data, "RESULT");
					_this.X3Connected = true;
					_this.event("SageX3ConnectorJS.ConnectionStateChanged", { connected: _this.X3Connected, error: _error}); 					
				}
				_this.logDebug("Pong from Sage X3-System"); 
            }
            else
            {   
				if(_this.X3Connected === true || _this.noPingSended === true)
				{					
					_this.X3Connected = false;
					_this.event("SageX3ConnectorJS.ConnectionStateChanged", { connected: _this.X3Connected, error: _error}); 					
				}
				_this.logDebug("Error connection to Sage X3: " + _error); 
            }
			_this.noPingSended = false;
			setTimeout(_this.isAlivePinger(_this), _this.pingInterval);			         
        }        	
    }
			
                              
     /**
     * Validates the basic values for the system to work
     * @param {value} the value which will be checked if its empty         
     * @return {boolean} true if given value is empty
     */  
    isEmpty(_value) 
    {
        return typeof _value == 'string' && !_value.trim() || typeof _value == 'undefined' || _value === null;
    }
        
    /**
     * Returns if the lib is initialized         
     * @return {boolean} true if lib is initialized
     */  
    isInitialized() 
    {
        return this.initSuccessfull;
    }
        
    /**
     * Validates the basic values for the system to work
     * @return {boolean} Returns true when all the necessary params have values and we may try to use the lib
     */  
    validateBasicValues()
    {  
        var hasError = false;            
        if (this.isEmpty(this.x3User))              { hasError = true; this.logError('X3 User is empty!'); }
        if (this.isEmpty(this.x3Pass))              { hasError = true; this.logError('X3 Password is empty!'); }
        if (this.isEmpty(this.x3Lang))              { hasError = true; this.logError('X3 Language is empty!'); }
        if (this.isEmpty(this.webSvcPool))          { hasError = true; this.logError('Web Service Pool is empty!'); }
        if (this.isEmpty(this.webSvcUrlPath))       { hasError = true; this.logError('Web Service Url is empty!'); }
        if (this.isEmpty(this.webSvcServer))        { hasError = true; this.logError('Web Service Server is empty!'); }
        if (this.isEmpty(this.basicSoapReqestTpl))  { hasError = true; this.logError('SOAP Request Template is empty!'); }
		if (this.isEmpty(this.objectSoapReqestTpl)) { hasError = true; this.logError('SOAP Request Template for Objects is empty!'); }
        if (hasError === true) { this.logError('Error validating basic settings!'); }
        return !hasError;
    }
             
             
    /**
     * adds debug info to the log
     * @param {string} log text                  
     */
    logDebug(_logText) 
    {      
        console.log(this.getReadableDate() + " SageX3ConnectorJS: " + _logText);  
        this.logToViewer(0, _logText, "");
    }
      
    /**
     * adds info to the log
     * @param {string} log text                  
     */          
    logInfo(_logText) 
    { 
        console.log(this.getReadableDate() + " SageX3ConnectorJS: " + _logText);    
        this.logToViewer(1, _logText, "");            
    }
     
    /**
     * adds warning to the log
     * @param {string} log text                  
     */              
    logWarning(_logText) 
    { 
        console.log(this.getReadableDate() + " SageX3ConnectorJS: " + _logText);    
        this.logToViewer(2, _logText, "");            
    }
    
    /**
     * adds error to the log
     * @param {string} log text                  
     */         
    logError(_logText) 
    { 
        console.log(this.getReadableDate() + " SageX3ConnectorJS: " + _logText);    
        this.logToViewer(3, _logText, "");            
    }
                
    /**
     * adds exception to the log
     * @param {object} exception object                  
     */         
    logException(_exception) 
    {         
        console.log(this.getReadableDate() + "SageX3ConnectorJS: " + "EXCEPTION: " + _exception.message + "\n\n" + _exception.stack);    
        this.logToViewer(4, _exception.message, _exception.stack);            
    }
        
    /**
     * adds a log with a specific type to the log
     * @param {int} log type (0 = Debug, 1 = Info, 2 = Warning, 3= Error, 4 = Exception)                 
     * @param {string} log text
     * @param {string} log stack
     */         
    logToViewer(logType, logText, logStack) 
    {
        this.event("SageX3ConnectorJS.Log", { logtype: logType, logText: logText, logStack: logStack, logTime: this.getReadableDate()});                 
    }
    
    /**
     * Returns current date in readable format
     * @return current date in readable format
     */ 
    getReadableDate()
    {
        var newDate = new Date();            
        var dateString = newDate.toUTCString();
        return dateString;
    }      
        
    /**
     * Sets the credentials for connecting to the X3 webservices
     * @param {string} a valid user for sageX3         
     * @param {string} the password for the user                 
     */                   
    setUserAndPass(_x3User, _x3Pass)
    {
        this.logDebug('Setting User to: ' + _x3User + ':' + _x3Pass);  
        this.x3User = _x3User;
        this.x3Pass = _x3Pass;            
    }
    
    /**
     * Sets the pool to use for the X3 webservices
     * @param {string} a valid X webservice pool                            
     */  
    setWebSvcPool(_x3WebSvcPool)
    {
        this.logDebug('Setting Webservice-Pool to: ' + _x3WebSvcPool);  
        this.webSvcPool = _x3WebSvcPool;
    }    


	/**
     * Sets the language to use for the X3 webservices
     * @param {string} a valid X webservice pool                            
     */  
    setLangauge(_x3Language)
    {
        this.logDebug('Setting Language to: ' + _x3Language);  
        this.x3Lang = _x3Language;
    }  	
                
    /**
     * Sets the url to use for consuming the X3 webservice
     * @param {string} a url to a valid X3 webservice                             
     */  
    setWebSvcServer(_webSvcServer)
    {
        this.logDebug('Setting Webservice-Server to: ' + _webSvcServer);  
        this.webSvcServer = _webSvcServer;
    }


    /**
     * ajax call wrapper                    
     */  
    ajaxCall(_params) 
    {
        if(typeof(_params.type) === 'undefined')            _params.type = "GET"
        if(typeof(_params.async) === 'undefined')           _params.async = true  
        if(typeof(_params.contentType) === 'undefined')     _params.contentType = "text/xml" 
        
        // # jquery
        //$.ajax(_params);
        
        // # vanilla js
        
        var request = new XMLHttpRequest();
        request.open(_params.type, _params.url, _params.async)
        
        request.onload = function() {
          if ((this.status >= 200 && this.status < 400) || this.status == 0) {            
            var response = this.response
            if(_params.success)
                _params.success(response)
          } 
          else 
          {           
            if(_params.error)
                _params.error(this)
          }
        }
        
        request.onerror = function() {          
          _params.error(this)
        }

        request.setRequestHeader("Content-Type", _params.contentType);

        if(_params.beforeSend)
            _params.beforeSend(request)
        
        request.send(_params.data);
        

        /*        
        cache: false,        
        data: _soapMessage, 
        processData: false,
        crossDomain: true,                           
        dataType: "xml",                                    
        */
    }

        
    /**
     * load the request template file into a variable.
     * This method uses an synchronous ajax call!
     */  
    loadRequestTemplates()
    {
        this.logDebug("Load request templates");  
        this.ajaxCall({
            url: "BasicSoapRequest.tpl",
            type: 'GET',
            async: false,
            success: this.loadRequestTemplatesSuccess(this, "Basic"),
            error: this.loadRequestTemplatesError(this, "Basic")
        });    

		this.logDebug("Load object request templates");  
        this.ajaxCall({
            url: "ObjectSoapRequest.tpl",
            type: 'GET',
            async: false,
            success: this.loadRequestTemplatesSuccess(this, "Object"),
            error: this.loadRequestTemplatesError(this, "Object")
        }); 		
    }
    
    /**
     * called when template loading was a success
     */ 
    loadRequestTemplatesSuccess(_sageX3Connector, _typeId)
    {
        return function(_fileContent)
        {
			if(_typeId == "Basic") 	_sageX3Connector.basicSoapReqestTpl = _fileContent;
			if(_typeId == "Object") _sageX3Connector.objectSoapReqestTpl = _fileContent;
            _sageX3Connector.logDebug(_typeId + "SoapRequest Template loaded!");
        }
    }
    
    /**
     * called when template loading has an error
     */ 
    loadRequestTemplatesError(_sageX3Connector, _typeId)
    {
        return function(_request, _status, _error)
        {
            _sageX3Connector.logDebug("Error loading Request " + _typeId + " Template: " + _error);
        }
    }
       
        
    /**
     * Returns the 'compiled' SOAP template
     * @param {string} SOAP template
	 * @param {string} name of the webservice
     * @return {string} formatted SOAP request
     */          
    compileBasicSoapTemplate(_soapTemplate, _publicName, _parameters)
    {        
        var soapMessage = _soapTemplate;          
        soapMessage = soapMessage.replace("%1", this.x3Lang);
        soapMessage = soapMessage.replace("%2", this.webSvcPool);
        soapMessage = soapMessage.replace("%3", this.webSvcPoolId);
        soapMessage = soapMessage.replace("%4", _publicName);            
        soapMessage = soapMessage.replace("%5", JSON.stringify(_parameters, null, 2));    
        return soapMessage;
    } 
	
	/**
     * Returns the 'compiled' SOAP template
     * @param {string} SOAP template
	 * @param {string} name of the webservice
	 * @param {string} XML String of key objactes (Key value pair)
	 * @param {string} action type (modify, delete,...)
     * @return {string} formatted SOAP request
     */          
    compileObjectSoapTemplate(_soapTemplate, _publicName, _objectKeys, _actionType, _parameters)
    {        
        var soapMessage = _soapTemplate;          
        soapMessage = soapMessage.replace("%1", this.x3Lang);
        soapMessage = soapMessage.replace("%2", this.webSvcPool);
        soapMessage = soapMessage.replace("%3", this.webSvcPoolId);
        soapMessage = soapMessage.replace("%4", _publicName);            
        soapMessage = soapMessage.replace("%5", _objectKeys);    
		soapMessage = soapMessage.replace("%6", JSON.stringify(_parameters, null, 2));
		soapMessage = soapMessage.replace("%7", _actionType);    
        return soapMessage;
    } 
        
    /**
     * Returns the request url where to send SOAP requests  
     * @return {string} url
     */          
    getRequestUrl()
    {        
        return this.webSvcServer + '/' + this.webSvcUrlPath;        
    }
        
    /**
     * Calls a subprog webservice with the given public name
     * @param {string} a request id which identifies the request                             
     * @param {string} the public name which identifies the subprog in X3
     * @param {object} json parameter object for the webservice
     * @param {function} a callback function which will be called when request was processed
     */            
    callSubprog(_requestId, _publicName, _parameters, _sync, _callbackFunction)
    {                                           
        var soapMessage = this.compileBasicSoapTemplate(this.basicSoapReqestTpl, _publicName, _parameters);
        this.getSoapData(_requestId, this.getRequestUrl(), "run", soapMessage, _sync, _callbackFunction);
    }
	
	/**
     * Calls update on an object-webservice
     * @param {string} a request id which identifies the request                             
     * @param {string} the public name which identifies the object-webservice in X3
	 * @param {array} array of key value pair objects
     * @param {object} json parameter object for the webservice
     * @param {function} a callback function which will be called when request was processed
     */            
    callObjectUpdate(_requestId, _publicName, _keys, _parameters, _sync, _callbackFunction)
    {                         		
		var objectKeysXML = this.convertObjectKeys(_keys);
        var soapMessage = this.compileObjectSoapTemplate(this.basicSoapReqestTpl, objectKeysXML, "modify", _publicName, _parameters);
        this.getSoapData(_requestId, this.getRequestUrl(), "modify", soapMessage, _sync, _callbackFunction);
    }  
	
	
	/**
     * Performas a SOAP request to a specific url with specific data
     * @param {string} a request id which identifies the request                             
     * @param {string} the url to the SOAP Webservice
     * @param {string} the SOAP Action which should be performed
     * @param {string} the valid SOAP message
     */ 
	convertObjectKeys(_objectKeys)
	{
		var objectKeysXML = "";
		for(var i = 0; i < _objectKeys.length; i++)
		{
			objectKeysXML += "<key>" + _objectKeys[i].key + "</key>"
			objectKeysXML += "<value>" + _objectKeys[i].value + "</value>"
		}
		return objectKeysXML;
	}
         
		 
    /**
     * Performas a SOAP request to a specific url with specific data
     * @param {string} a request id which identifies the request                             
     * @param {string} the url to the SOAP Webservice
     * @param {string} the SOAP Action which should be performed
     * @param {string} the valid SOAP message
     */          
    getSoapData(_requestId, _url, _soapAction, _soapMessage, _sync, _callbackFunction)
    {
        this.logDebug("Perform SOAP Request: " + _requestId); 
        try
        {                       
            this.ajaxCall({
                url: _url, 
                cache: false,
                type: "POST",    
                async: !_sync,		                
                data: _soapMessage, 
                processData: false,
                crossDomain: true,                    
                contentType: "text/xml;",
                dataType: "xml",                            
                beforeSend: this.getSoapDataBeforeSend(this, _soapAction),
                success: this.getSoapDataSuccess(_requestId, _callbackFunction, this), 
                error: this.getSoapDataError(_requestId, _callbackFunction, this)
            }); 
        }
        catch(_err)
        {  
            this.logException(_err);                              
        }           
    }
    
     /**
     * callback function for before send
     * @params {object} the connector object
     */ 
    getSoapDataBeforeSend(_sageX3Connector, _soapAction)
    {
        return function(xhr)
        {  
            xhr.setRequestHeader("Authorization", "Basic " + btoa(unescape(encodeURIComponent(_sageX3Connector.x3User + ":" + _sageX3Connector.x3Pass))));
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.setRequestHeader("SOAPAction", _soapAction);          
        }
    }
        
     /**
     * callback function for successful requests 
     * @params {string} request id which identifies the request 
     * @params {function} the callback function which will be called when request was processed
     * @params {object} the connector object
     */ 
    getSoapDataSuccess(_requestId, _callbackFunction, _sageX3Connector)
    {
        return function(_data) 
        {
            var xmlDoc;
            // generate an xml document from the response string
            if(typeof(_data) === 'object' &&  _data.constructor.name == 'XMLDocument')  
                xmlDoc = _data
            else
                xmlDoc = new window.DOMParser().parseFromString(_data, "text/xml");                        

            _sageX3Connector.logDebug("SOAP Request response: " + _requestId);                        
                 
            // we may get some "invalid" xml ehen not logged in
            var statusElements = xmlDoc.getElementsByTagName("status")
            if(!statusElements || !statusElements.length)
            {
                _callbackFunction(_requestId, "", true);
                return;
            }

            // we are getting a SOAP response xml and there we have to get the JSON return data or the
            // error messages which will be returned. To get the info if there was an error we have to 
            // look at the status node       
            var status = xmlDoc.getElementsByTagName("status")[0].innerHTML;
            
            // when status = 1, everything was ok, we can get the json data and call the callback
            if (status == 1)
            {    
                _sageX3Connector.logDebug("SOAP Request response: " + _requestId + " is valid!"); 
                // the JSON String is given in the 'resultXml' node. So we do get this node and make a 
                // json object out of it 
                var resultXml = xmlDoc.getElementsByTagName("resultXml")[0].innerHTML;
                resultXml = resultXml.replace("<![CDATA[", "").replace("]]>", "");   
                _callbackFunction(_requestId, JSON.parse(resultXml), false);             
            }
            else
            {
                _sageX3Connector.logDebug("SOAP Request response: " + _requestId + " has errors!"); 
                var errors = "";
                // get all the 'message' nodes and cumulate them into a big error message
                var messagesArray = xmlDoc.getElementsByTagName("message");                  
                for (var i = 0; i < messagesArray.length; i++) 
                {
                    _sageX3Connector.logError(messagesArray[i].innerHTML);
                    errors += messagesArray[i].innerHTML + "<br>";
                }                    
                _callbackFunction(_requestId, errors, true);             
            }                                                                                                                                                              
        };
    }
    
     /**
     * callback function for request with errors
     * @params {string} request id which identifies the request 
     * @params {function} the callback function which will be called when request was processed
     * @params {object} the connector object
     */ 
    getSoapDataError(_requestId, _callbackFunction, _sageX3Connector)
    {
        return function(_request, _status, _error) 
        {
            _sageX3Connector.logError("SOAP Request Error: " + _requestId + "\n" + _error);               
            _callbackFunction(_requestId, _error, true);                
        };
    }
    
    /**
     * returns a child array from an json object
     * @params {jsonObject} json object
     * @params {string} id of the child 'node'
     * @return {array} array of object,...
     */ 
    getArrayDataFromJson(_jsobObject, _arrayId)
    {                 
        return _jsobObject[_arrayId];
    }  
            

 

}
            
