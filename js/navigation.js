// JavaScript Document
var navigation = function() {
	
	return {
	
		nav_link_selector 			: 'ul#nav li a',
		nav_links					: '',
		content_selector			: 'contentText',
		content_el					: '',
		content_header_selector		: 'content_header',
		content_header_el			: '',
		history_timer				: '',
		current_page				: 'home',
		loader_path					: 'images/loader.gif',
		
		init : function() {
			
			this.render();
			
		},
		
		render : function() {
			
			this.nav_links 			= $$(this.nav_link_selector);
			this.nav_links.each(this.update_link, this);
			
			this.content_el			= $(this.content_selector);
			this.content_header_el	= $(this.content_header_selector);
			
			this.check_page();
			this.start_timer();
			
		},
		
		start_timer : function() {
			
			this.history_timer = this.check_page.periodical(500, this);
			
		},
		
		check_page : function() {
			var hash	= location.hash;
			hash		= hash.replace(/#/, '' );
			if(hash != this.current_page) {
				this.nav_links.each(function(el) {
					if(hash == el.get('rev')) {
						this.make_request(el.get('rel'), hash);
					}
				}, this);
			}
		},
		
		update_link : function(el) {
			var href = el.get('href');
			el.set('rel', href);
			el.set('href', 'javascript:void(0);');
			el.addEvent('click', this.link_click);
		},
		
		link_click : function(e) {
			var url		= this.get('rel');
			var page	= this.get('rev');
			window.location.assign('#' + page);
			navigation.make_request(url, page);
		},
		
		make_request : function(url, page) {
			var HTMLRequest = new Request.HTML({		url			: url,
											   			method		: 'get',
														onRequest	: this.on_request_handler,
											   			onSuccess 	: this.on_success_handler,
														onFailure 	: this.on_failure_handler
											   });
			HTMLRequest.send();
			this.current_page = page;
		},
		
		on_request_handler : function() {
			navigation.content_el.fade('out');
			navigation.content_header_el.empty();
			
			var load_el		= new Element('img', { src : navigation.loader_path, width : '16', height : '16' });
			navigation.content_header_el.adopt(load_el);
			
			navigation.content_header_el.appendText('Loading...');
			
		},
		
		on_success_handler : function(html) {
			
			(function() {
			
				navigation.content_el.empty();
				navigation.content_el.adopt(html[1].getChildren('#contentText').getChildren());
				
				var header = $$("#content_header");
				
		console.log(navigation.content_header_el.appendText(html[1].getChildren(header).get('text')));
				navigation.content_header_el.empty();
				navigation.content_header_el.appendText(html[1].getChildren('#content_header').get('text'));
				
				navigation.content_el.fade('in');
				
				navigation.update_body_class(navigation.current_page);
				navigation.update_title_bar(navigation.current_page);
				
			}).delay(1000);
			
		},
		
		on_failure_handler : function() {
			console.log("REQUEST FAILED");
			
		},
		
		update_body_class : function(page) {
			var body_el		= $$('body')[0];
			this.nav_links.each(function(el) {
				if(body_el.hasClass(el.get('rev'))) {
					body_el.removeClass(el.get('rev'));
				}
			}, this);
			body_el.addClass(page);
		},
		
		update_title_bar : function(page) {
			document.title = page.capitalize();
		}
	}
	
}();