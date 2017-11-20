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




Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
  }
  
  
  function stringToDate(_date,_format,_delimiter)
  {
      var formatLowerCase=_format.toLowerCase();
      var formatItems=formatLowerCase.split(_delimiter);
      var dateItems=_date.split(_delimiter);
      var monthIndex=formatItems.indexOf("mm");
      var dayIndex=formatItems.indexOf("dd");
      var yearIndex=formatItems.indexOf("yyyy");
      var month=parseInt(dateItems[monthIndex]);
      month-=1;
      var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
      return formatedDate;
  }
  
  function X3DateStringToDate(_date)
  {
      if(!_date)
          return null;
      var date = _date.substr(0,4) + "-" + _date.substr(4,2) + "-" + _date.substr(6,2)
      return stringToDate(date, "yyyy-mm-dd", "-")	
  }
  
  function dateToX3DateString(_date)
  {	
      if(!_date)
          return "";		
      var datestring = _date.getFullYear() + ("0"+(_date.getMonth()+1)).slice(-2) +("0" + _date.getDate()).slice(-2);
      return datestring;
  }
  
  function X3DateStringReadableString(_date)
  {
      if(!_date)
          return "";
      var date =  _date.substr(6,2)  + "." + _date.substr(4,2) + "." + _date.substr(0,4);
      return date;	
  }
  
  function date2string(_date)
  {
      if(!_date)
          return "";		
      var datestring = ("0" + _date.getDate()).slice(-2) + "." + ("0"+(_date.getMonth()+1)).slice(-2) + "." + _date.getFullYear();
      return datestring;
  }
  
  function escapeJSONValue(_value)
  {
      return _value
          .replace(/[\\]/g, '\\\\')
          .replace(/[\"]/g, '\\\"')
          .replace(/[\/]/g, '\\/')
          .replace(/[\b]/g, '\\b')
          .replace(/[\f]/g, '\\f')
          .replace(/[\n]/g, '\\n')
          .replace(/[\r]/g, '\\r')
          .replace(/[\t]/g, '\\t'); 
  }
  
  function generateUniqueNumber()
  {
      var d = new Date().getTime();
      if(window.performance && typeof window.performance.now === "function"){
          d += performance.now(); //use high-precision timer if available
      }
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
  }
  
  