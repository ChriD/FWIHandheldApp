class AppTools
{        
    constructor()
    {                
    }
    

	getAttributes(_domElement) 
	{
        var obj = {};
        for (var att, i=0, atts=_domElement.attributes, n=atts.length; i<n; i++){
            att = atts[i];
            obj[att.nodeName] = att.nodeValue;         
        }
		return obj;
    }    
    

    getInputDataObject(_inputDOMParent)
    {
        var self = this;     
        var json = { "input" : [] };
        
        return new Promise(function(_resolve, _reject){
            try
            {
                var inputElements = _inputDOMParent.getElementsByTagName('input');
                for (var i = 0; i < inputElements.length; ++i)
                {        
                    var attribs = self.getAttributes(inputElements[i])
                    if(attribs['type'] === "checkbox")	                    
                        attribs['value'] = inputElements[i].checked;
                    else
                        attribs['value'] = inputElements[i].value;

                    if(attribs['type'] === "number")
                        attribs['value'] = inputElements[i].value
                    
                    if(attribs['type'] === "hidden")	
                        continue;                                            
                    
                    json.input.push(attribs);
                }

                var inputElements = _inputDOMParent.getElementsByTagName('select');
                for (var i = 0; i < inputElements.length; ++i)
                {
                    var attribs = self.getAttributes(inputElements[i])
                    attribs["type"] = "select";
                    var options = [];

                    var optionElements = inputElements[i].options;
                    for (var o = 0; o < optionElements.length; ++o)
                    { 
                        options.push(self.getAttributes(optionElements[o]));
                    }                  
                    attribs["options"] = options;
                    attribs['value'] = inputElements[i].options[inputElements[i].selectedIndex].value;

                    json.input.push(attribs);
                }

                _resolve(json)
            }
            catch(exception)
            {
                _reject(exception);
            }
        });
    }


    inputDataObjectToStorageObject(_inputDataObject)
	{
		var storageObject = {};
		for(var i=0; i<_inputDataObject.input.length; i++)
		{
			var value = _inputDataObject.input[i]['value'];
			storageObject[_inputDataObject.input[i]['data-id']] = value;
		}
		return storageObject;
    }	
    

    setDataObjectToInput(_inputDOMParent, _settings)	
	{
		for (var property in _settings) 
		{
			// only one level objects!!!
			//if (_settings.hasOwnProperty(property) === false) 
			{
                var control  = null;
                var controls = _inputDOMParent.querySelectorAll('[data-id="' + property + '"]');	
                if( controls.length > 0)
                    control = controls[0]
                
                if(control)
				{
					if(control.type == 'checkbox')
					{
						control.checked = _settings[property]
					}
					if(control.type == 'select-one')
					{
						control.value = _settings[property]						
					}					
					if(control.type == 'number')
					{
						control.value = _settings[property]						
					}
					else
					{
						control.value = _settings[property]						
					}
				}
			}
		}
    }	
    
}