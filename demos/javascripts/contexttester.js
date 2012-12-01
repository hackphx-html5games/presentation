/**
 * 
 */

dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.Button");

function readContext() {
	dojo.byId('messages').innerHTML = 'reading context...';
	dojo.xhrGet({
			url: '/getContext',
			content: {
				endpoint : cfx.rpcEndpoint				
			},
			handleAs: 'json',
			load: function(result){
				if(result.error){
					dojo.byId('messages').innerHTML = result.error;
				}else{
					var output = '';
					for ( var prop in result) {
						console.log(prop + " = " + result[prop]);
						output += '<b>' + prop + '</b> = ' + result[prop] + '<br>';
					}
					dojo.byId('contextItems').innerHTML = output; 				
					dojo.byId('messages').innerHTML = '';
				}				
			},
			error: function(result){
				dojo.byId('messages').innerHTML = "Error: " + error;
			}	
	});
}

function setContext() {
	dojo.byId('messages').innerHTML = 'setting context...';
	dojo.xhrGet({
		url: '/setContext',
		content: {
			endpoint : cfx.rpcEndpoint,
			context: dojo.byId('items').value
		},
		handleAs: 'json',
		load: function(result){
			if(result && result.error){
				dojo.byId('messages').innerHTML = result.error;
			}else{
				dojo.byId('messages').innerHTML = 'context set...';
			}
			
		},
		error: function(error){
			dojo.byId('messages').innerHTML = "Error: " + error;
		}	
	});
}

function setSurvey() {
	dojo.byId('messages').innerHTML = 'setting survey response';
	dojo.xhrGet({
		url: '/setSurvey',
		content: {
			endpoint : cfx.rpcEndpoint,
			reason: dojo.byId('reason').value
		},
		handleAs: 'json',
		load: function(result){
			if(result && result.error){
				dojo.byId('messages').innerHTML = result.error;
			}else{
				dojo.byId('messages').innerHTML = 'survey response set';
			}
			
		},
		error: function(error){
			dojo.byId('messages').innerHTML = "Error: " + error;
		}	
	});
}

try {
	cfx.ready(function() {

		readContext();
		dojo.style(dojo.byId("formDiv"), {
			display : ''
		});

		//remove default of behavior of reloading entire page.
		dojo.unsubscribe(cfxContextUpdatedHandler);
		cfxContextUpdatedHandler = dojo.subscribe('cfxContextCouponUpdated',
				readContext);
	});
} catch (ex) {
	console.info(ex);
}