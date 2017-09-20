<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">
   <soapenv:Header/>
   <soapenv:Body>
      <wss:%7 soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <callContext xsi:type="wss:CAdxCallContext">
            <codeLang xsi:type="xsd:string">%1</codeLang>
            <poolAlias xsi:type="xsd:string">%2</poolAlias>
            <poolId xsi:type="xsd:string">%3</poolId>
            <requestConfig xsi:type="xsd:string">adxwss.optreturn=JSON&adxwss.beautify=true</requestConfig>
         </callContext>
         <publicName xsi:type="xsd:string">%4</publicName>
         <objectKeys xsi:type="wss:ArrayOfCAdxParamKeyValue" soapenc:arrayType="wss:CAdxParamKeyValue[]">
			<ArrayOfCAdxParamKeyValue>
				%5
			</ArrayOfCAdxParamKeyValue>
		</objectKeys>
         <objectXml xsi:type="xsd:string">
         <![CDATA[
				%6
			]]>
         </objectXml>
      </wss:%7>
   </soapenv:Body>
</soapenv:Envelope>