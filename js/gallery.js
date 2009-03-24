window.addEvent('domready', function(){
  var items = $$('.item');
  var curItem = 0;
  var swapTime = 1000;
  var transTime = 1000;
  var counter = 0;
  
  var nextButton = $$('span.next')[0];
  var prevButton = $$('span.prev')[0];
  
  items[0].setOpacity(1);
  for(var i = 1; i < items.length; i++){
			items[i].setOpacity(0);
		}
		
	nextButton.addEvent('click', show_next);
    prevButton.addEvent('click', show_prior);

    function show_next(e) {
    	var show = 0;
    	if(curItem != (items.length - 1)) var show = curItem + 1;
    	itemSwap(show);
    }

    function show_prior(e) {
    	var show = (items.length - 1);
    	if(curItem != 0) var show = curItem - 1;
    	itemSwap(show);
    }

    function itemSwap(show) {
    	var oldEl = items[curItem];
    	var oldElEffect = oldEl.fade('out');


      curItem = show;

    	var newEl = items[curItem];
    	var newElEffect = newEl.fade('in');
    }
});