window.addEvent('domready', function() {
  
  for (var i=0; i < 16; i++) {
   	$('question_'+[i]).addEvent('submit', function(e) {
  		//Prevents the default submit event from loading a new page.
  		e.stop();
  		//Empty the log and show the spinning indicator.
  		//Send the form.
  		this.send();
  	});
  };
});