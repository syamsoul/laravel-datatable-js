(function( factory ) {
	"use strict";

	if ( typeof exports === 'object' ) {
		// CommonJS
		if ( ! $ || ! jQuery) {
			$ = require('jquery');
		}
		
		module.exports = $.fn.SdLaraDataTable = jQuery.fn.SdLaraDataTable = factory($);
	}
	else {
		// Browser
		$.fn.SdLaraDataTable = jQuery.fn.SdLaraDataTable = factory(jQuery);
	}
}
(function($) {
	"use strict";
    
	$.fn.SdLaraDataTable = (()=>{
		let CORE = function(){
			let dt, table_jel, opts_new;
			
			this.methods = {
				init : function(opts) {
					let that = this;
					
					table_jel = $(that);
					
					opts_new = (function(){
			            let opts_new = {};
					
			            if(typeof opts == "object"){               
							if(typeof opts['url'] != "string"){
								$.error('URL is required');
							}else opts_new['url'] = opts['url'];
							
							if(typeof opts['columns'] == 'undefined' || !Array.isArray(opts['columns'])){
								$.error('Columns is required');
							}else opts_new['columns'] = opts['columns'];
							
							if(typeof opts['order'] == 'undefined' || !Array.isArray(opts['order'])) opts_new['order'] = [];
							else opts_new['order'] = opts['order'];
			            }else{
							$.error("There's something wrong with your SdLaraDataTable configuration");
							return false;
						}
					
			            return opts_new;
			        })();
					
					if(opts_new == false){
						return false;
					}
					
					let dt_opts = {
						processing: true,
	                    serverSide: true,
						ajax: opts_new['url'],
						columns: opts_new['columns'],
						order: opts_new['order'],
					};
					
			        table_jel.dataTable($.extend(dt_opts, {}));
					
					return that;
				},
				// clear : function() { 
				// 	table_jel[0].reset();
				// }
			};
		};
	
	    return function(methodOrOptions) {
			let settings = $(this).data("settings");
			 
			if(settings == undefined){
				settings = {is_first_time:true,methods:{}};
				$(this).data("settings", settings);
			}
			
			let methods = settings.methods;
			
			if ( methods[methodOrOptions] ) {
				return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
				if(settings.is_first_time){
					settings = new CORE();
					$(this).data("settings", settings);
				
					// Default to "init"
					return settings.methods.init.apply( this, arguments );
				}else{
					$.error( 'Method init cannot be called multiple times' );
				}				
			} else {
				$.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.SdLaraDataTable' );
			}    
		};
	})();
    
    return $.fn.SdLaraDataTable;
}));