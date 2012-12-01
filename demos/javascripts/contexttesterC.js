/**
 * 
 */

dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.Button");

function readContext() {
	dojo.byId('messages').innerHTML = 'reading context...';
	var deffered = cfx.proxy.getContextData();
	deffered.addCallback(function(result) {
		var output = '';
		for ( var prop in result) {
			console.log(prop + " = " + result[prop]);
			output += '<b>' + prop + '</b> = ' + result[prop] + '<br>';
		}
		dojo.byId('contextItems').innerHTML = output; //dojo.toJson(result);
		dojo.byId('messages').innerHTML = '';
	});
	deffered.addErrback(function(result) {
		dojo.byId('messages').innerHTML = dojo.toJson(result.message);
	});
}

function setContext() {
	var deffered = cfx.proxy.setDelimitedContext(dojo.byId('items').value);
	deffered.addCallback(function(result) {
		dojo.byId('messages').innerHTML = 'context set...';
	});
	deffered.addErrback(function(result) {
		dojo.byId('messages').innerHTML = dojo.toJson(result.message);
	});

}

function setSurvey() {

	dojo.byId('messages').innerHTML = 'setting survey response';

	var deffered = cfx.proxy.setSurveyReason('clientPage',
			dojo.byId('reason').value);
	deffered.addCallback(function(result) {
		dojo.byId('messages').innerHTML = 'survey response set';
	});
	deffered.addErrback(function(result) {
		dojo.byId('messages').innerHTML = dojo.toJson(result.message);
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