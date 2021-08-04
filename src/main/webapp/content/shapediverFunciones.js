function imagenCarritoApi(){
		
			var imagen = api.scene.getScreenshot();
			$("#soloParaMeterEnlacesYmostrar").append('<p id="imagen1BBDD" class="'+imagen+'"></p>');
}

function imagenCarritoApiInterior(){
	
			/**var armario = window.armario;
			if(armario == 1){
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "material" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  }
			  }
			  if(armario == 2){
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
				  }
				  
			  }
			  if(armario == 3){
		
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
				  }
		
			  }
			  if(armario == 4){
		
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
				  }
		
			  }
			  if(armario == 5){
		
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
					  
				  }
		
			  }
			  if(armario == 6){
		
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
					  
				  }
				  
			  }
			  if(armario == 7){
		
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_6"]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_6"]);
					  
				  }
				  
			  }
			  if(armario == 8){
		
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_6"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_7"]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_6"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_7"]);
				  }
				  
			  }**/
	 var intervalo = setInterval(function(){

			 api.state.addEventListener(api.state.EVENTTYPE.IDLE, function() {
		api.scene.removeAsync({name: "puertas"}, "CommPlugin_1");
		api.scene.removeAsync({name: "Tiradores"}, "CommPlugin_1");
			  $("#soloParaMeterEnlacesYmostrar").empty();
			  var imagen = api.scene.getScreenshot();
			  $("#soloParaMeterEnlacesYmostrar").append('<p id="imagen1BBDD" class="'+imagen+'"></p>');
			  clearInterval(intervalo);
			 }); 
				 
		 }, 1000);
		
} 

function imagenGirarParaCarro(){
	var idProd = $('#nombreMesita').attr('class');
	if(parseFloat(idProd) != 110 && parseFloat(idProd) != 107 && parseFloat(idProd) != 108 && parseFloat(idProd) != 295 && parseFloat(idProd) != 296 && parseFloat(idProd) != 112 && parseFloat(idProd) != 114 && parseFloat(idProd) != 114 && parseFloat(idProd) != 109 && parseFloat(idProd) != 410 && parseFloat(idProd) != 111 && parseFloat(idProd) != 113 && parseFloat(idProd) != 116 && parseFloat(idProd) != 115 && parseFloat(idProd) != 298 && parseFloat(idProd) != 297 && parseFloat(idProd) != 118 && parseFloat(idProd) != 117 && parseFloat(idProd) != 299 && parseFloat(idProd) != 301 && parseFloat(idProd) != 112 && parseFloat(idProd) != 300 && parseFloat(idProd) != 275 && parseFloat(idProd) != 255 && parseFloat(idProd) != 256 && parseFloat(idProd) != 251 && parseFloat(idProd) != 247 && parseFloat(idProd) != 252 && parseFloat(idProd) != 248 && parseFloat(idProd) != 1 && parseFloat(idProd) != 2 && parseFloat(idProd) != 3 && parseFloat(idProd) != 4 && parseFloat(idProd) != 5 && parseFloat(idProd) != 6 && parseFloat(idProd) != 7 && parseFloat(idProd) != 8 && parseFloat(idProd) != 9 && parseFloat(idProd) != 10 && parseFloat(idProd) != 11 && parseFloat(idProd) != 12 && parseFloat(idProd) != 13 && parseFloat(idProd) != 238 && parseFloat(idProd) != 239 && parseFloat(idProd) != 240 && parseFloat(idProd) != 241 && parseFloat(idProd) != 242 && parseFloat(idProd) != 243 && parseFloat(idProd) != 244 && parseFloat(idProd) != 245 && parseFloat(idProd) != 277 && parseFloat(idProd) != 278 && parseFloat(idProd) != 283 && parseFloat(idProd) != 284 && parseFloat(idProd) != 334 && parseFloat(idProd) != 303 && parseFloat(idProd) != 14 && parseFloat(idProd) != 304 && parseFloat(idProd) != 53 && parseFloat(idProd) != 305 && parseFloat(idProd) != 62 && parseFloat(idProd) != 306 && parseFloat(idProd) != 63 && parseFloat(idProd) != 307 && parseFloat(idProd) != 64 && parseFloat(idProd) != 308 && parseFloat(idProd) != 65 && parseFloat(idProd) != 309 && parseFloat(idProd) != 66 && parseFloat(idProd) != 311 && parseFloat(idProd) != 68  && parseFloat(idProd) != 312 && parseFloat(idProd) != 69 && parseFloat(idProd) != 336 && parseFloat(idProd) != 335 && parseFloat(idProd) != 338 && parseFloat(idProd) != 337 && parseFloat(idProd) != 279 && parseFloat(idProd) != 280 && parseFloat(idProd) != 271 && parseFloat(idProd) != 272 && parseFloat(idProd) != 213 && parseFloat(idProd) != 215 && parseFloat(idProd) != 217 && parseFloat(idProd) != 218 && parseFloat(idProd) != 219 && parseFloat(idProd) != 220 && parseFloat(idProd) != 221){ 
		$("#soloParaEnviarImagenGirada")[0].click();
	}else{
		$("#sdv-container").css({"width":"410px"});
		$("#sdv-container").css({"height":"410px"});
		if(parseFloat(idProd) != 275 && parseFloat(idProd) != 255 && parseFloat(idProd) != 256 && parseFloat(idProd) != 251 && parseFloat(idProd) != 247 && parseFloat(idProd) != 252 && parseFloat(idProd) != 248 && parseFloat(idProd) != 1 && parseFloat(idProd) != 2 && parseFloat(idProd) != 3 && parseFloat(idProd) != 4 && parseFloat(idProd) != 5 && parseFloat(idProd) != 6 && parseFloat(idProd) != 7 && parseFloat(idProd) != 8 && parseFloat(idProd) != 9 && parseFloat(idProd) != 10 && parseFloat(idProd) != 11 && parseFloat(idProd) != 12 && parseFloat(idProd) != 13 && parseFloat(idProd) != 238 && parseFloat(idProd) != 239 && parseFloat(idProd) != 240 && parseFloat(idProd) != 241 && parseFloat(idProd) != 242 && parseFloat(idProd) != 243 && parseFloat(idProd) != 244 && parseFloat(idProd) != 245 && parseFloat(idProd) != 277 && parseFloat(idProd) != 278 && parseFloat(idProd) != 283 && parseFloat(idProd) != 284 && parseFloat(idProd) != 334 && parseFloat(idProd) != 303 && parseFloat(idProd) != 14 && parseFloat(idProd) != 304 && parseFloat(idProd) != 53 && parseFloat(idProd) != 305 && parseFloat(idProd) != 62 && parseFloat(idProd) != 306 && parseFloat(idProd) != 63 && parseFloat(idProd) != 307 && parseFloat(idProd) != 64 && parseFloat(idProd) != 308 && parseFloat(idProd) != 65  && parseFloat(idProd) != 309 && parseFloat(idProd) != 66 && parseFloat(idProd) != 311 && parseFloat(idProd) != 68 && parseFloat(idProd) != 312 && parseFloat(idProd) != 69 && parseFloat(idProd) != 336 && parseFloat(idProd) != 335 && parseFloat(idProd) != 338 && parseFloat(idProd) != 337 && parseFloat(idProd) != 279 && parseFloat(idProd) != 280 && parseFloat(idProd) != 271 && parseFloat(idProd) != 272 && parseFloat(idProd) != 213 && parseFloat(idProd) != 215 && parseFloat(idProd) != 217 && parseFloat(idProd) != 218 && parseFloat(idProd) != 219 && parseFloat(idProd) != 220 && parseFloat(idProd) != 221){
			api.scene.camera.updateAsync({'position': {x: -794.3905299322976, y: -989.9030901933802, z: 601.723605460861}, 'target': {x: 625, y: 175, z: 250} }).then(
		            function(response) {
		            	$("#soloParaEnviarImagenGirada")[0].click();
		            });
		}else{
			api.scene.camera.updateAsync({'position': {x: -657.883398040687, y: -1721.5418300011615, z: 1227.8223071618345}, 'target': {x: 758.5643606351833, y:  127.50578991868758, z: 631.7026621119127} }).then(
		            function(response) {
		            	api.scene.camera.zoomAsync().then(function(response){
		            		$("#soloParaEnviarImagenGirada")[0].click();
		            	})
		            });

		}
		
	}

}

function imagenGirarParaCarro1(){

		$("#sdv-container").css({"width":"410px"});
		$("#sdv-container").css({"height":"410px"});
		
			api.scene.camera.updateAsync({'position': {x: -657.883398040687, y: -1721.5418300011615, z: 1227.8223071618345}, 'target': {x: 758.5643606351833, y:  127.50578991868758, z: 631.7026621119127} }).then(
		            function(response) {
		            	api.scene.camera.zoomAsync().then(function(response){
		            		var imagen = api.scene.getScreenshot();
		        			$("#soloParaMeterEnlacesYmostrar").append('<p id="imagen1BBDD" class="'+imagen+'"></p>');
		            		
		        			var armario = window.armario;
		        			if(armario == 1){
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
		        				  if(window.tieneTiradores == 1){
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "material" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
		        				  }
		        			  }
		        			  if(armario == 2){
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
		        				  
		        				  if(window.tieneTiradores == 1){
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
		        				  }
		        				  
		        			  }
		        			  if(armario == 3){
		        		
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
		        				  
		        				  if(window.tieneTiradores == 1){
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
		        				  }
		        		
		        			  }
		        			  if(armario == 4){
		        		
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
		        				  
		        				  if(window.tieneTiradores == 1){
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
		        				  }
		        		
		        			  }
		        			  if(armario == 5){
		        		
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
		        				  
		        				  if(window.tieneTiradores == 1){
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
		        					  
		        				  }
		        		
		        			  }
		        			  if(armario == 6){
		        		
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
		        				  
		        				  if(window.tieneTiradores == 1){
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
		        					  
		        				  }
		        				  
		        			  }
		        			  if(armario == 7){
		        		
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_6"]);
		        				  
		        				  if(window.tieneTiradores == 1){
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_6"]);
		        					  
		        				  }
		        				  
		        			  }
		        			  if(armario == 8){
		        		
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_6"]);
		        				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_7"]);
		        				  
		        				  if(window.tieneTiradores == 1){
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_6"]);
		        					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_7"]);
		        				  }
		        				  
		        			  }
		        			  
		        			  
		        			  
			        			setTimeout(function() {
			        				var imagen1 = api.scene.getScreenshot();
				        			$("#soloParaMeterEnlacesYmostrar").append('<p id="imagen2BBDD" class="'+imagen1+'"></p>');
			        				$("#soloParaEnviarImagenGirada11")[0].click();
			        			}, 1000);
		            	})
		            });

}

function funcionParaLimitarAdi(id,interiores){
	
	var arrayEsta = interiores;
	var hayCamisero = 0;
	if(arrayEsta.length != 0){
    	var int = [];
    	var contInt = 0;
    	for(let i = 0;i<arrayEsta.length;i++){
    		if( (id - 1) == arrayEsta[i]["interior"]){
    			int[contInt] = arrayEsta[i];
    			contInt++;
    			if(arrayEsta[i]["tipo"] == "camisero"){
    				hayCamisero = 1;
    			}
    		}
    	}
    	var minArm = 0;
    	var alturaPrueba = parseFloat($('#rs-range-line1').val());
       
        var alturaValor = alturaPrueba * 10;
        int.sort(function (a, b) {
		    return (a.altura - b.altura)
		});
		
        var pos = [];
        var alts = [];
        var contGen = 0;
        
        for(let i = 0;i<int.length;i++){
        	if(i == 0){
        		if(int[i]["posicion"] != 0){
        			pos[0] = 0;
        			alts[0] = 0;
        			contGen++;
        		}
        	}
        	pos[contGen] = int[i]["posicion"];
        	alts[contGen] = int[i]["altura"];
        	contGen++;
        }
        
        if(alts[alts.length - 1] != (alturaValor - 90)){
        	pos[pos.length] = alturaValor - 90;
        	alts[alts.length] = alturaValor - 90;
        }
        
		var arrayTamanos = [];
		var contTam = 0;
		var altu = 0;
		var posi = 0;
		var tramo = 0;
		if(alts.length != 1){
			for(let w = 0;w<alts.length - 1;w++){
				altu = alts[w];
				posi = pos[w + 1];
				tramo = posi - altu;
				arrayTamanos[contTam] = tramo;
				contTam++;
			}
		}else{
			arrayTamanos[contTam] = alts[0];
			contTam++;
		}
		console.log(arrayTamanos);
		$(".adicionalEstanteCristal").css({"display":"none"});
		$(".adicionalEstanteMadera").css({"display":"none"});
		$(".adicionalTubo").css({"display":"none"});
		$(".adicional1CajonSuelo").css({"display":"none"});
		$(".adicional2CajonSuelo").css({"display":"none"});
		$(".adicional3CajonSuelo").css({"display":"none"});
		$(".adicional4CajonSuelo").css({"display":"none"});
		$(".adicional5CajonSuelo").css({"display":"none"});
		$(".adicional1CajonVol").css({"display":"none"});
		$(".adicionalCamisero2").css({"display":"none"});
		$(".adicionalCamisero4").css({"display":"none"});
		$(".adicional2CajonVol").css({"display":"none"});
		$(".adicionalCamisero3").css({"display":"none"});
		$(".adicional3CajonVol").css({"display":"none"});
		for(let k = 0;k<arrayTamanos.length;k++){
			if(arrayTamanos[k] >= 8){
				$(".adicionalEstanteCristal").css({"display":"block"});
				if(arrayTamanos[k] >= 30){
					$(".adicionalEstanteMadera").css({"display":"block"});
					$(".adicionalTubo").css({"display":"block"});
					if(arrayTamanos[k] >= 212){
						if(int.length > 0){
							if(int[0]["posicion"] != 0){
								$(".adicional1CajonSuelo").css({"display":"block"});
							}
						}else{
							$(".adicional1CajonSuelo").css({"display":"block"});
						}
						
						if(arrayTamanos[k] >= 242){
							$(".adicional1CajonVol").css({"display":"block"});
							if(arrayTamanos[k] >= 300){
								if(hayCamisero == 0){
									$(".adicionalCamisero2").css({"display":"block"});
								}
								if(arrayTamanos[k] >= 380){
									if(int.length > 0){
										if(int[0]["posicion"] != 0){
											$(".adicional2CajonSuelo").css({"display":"block"});
										}
									}else{
										$(".adicional2CajonSuelo").css({"display":"block"});
									}
									if(arrayTamanos[k] >= 410){
										$(".adicional2CajonVol").css({"display":"block"});
										if(arrayTamanos[k] >= 450){
											if(hayCamisero == 0){
												$(".adicionalCamisero3").css({"display":"block"});
											}
											if(arrayTamanos[k] >= 556){
												if(int.length > 0){
													if(int[0]["posicion"] != 0){
														$(".adicional3CajonSuelo").css({"display":"block"});
													}
												}else{
													$(".adicional3CajonSuelo").css({"display":"block"});
												}
												if(arrayTamanos[k] >= 586){
													$(".adicional3CajonVol").css({"display":"block"});
													if(arrayTamanos[k] >= 600){
														if(hayCamisero == 0){
															$(".adicionalCamisero4").css({"display":"block"});
														}
														if(arrayTamanos[k] >= 724){
															if(int.length > 0){
																if(int[0]["posicion"] != 0){
																	$(".adicional4CajonSuelo").css({"display":"block"});
																}
															}else{
																$(".adicional4CajonSuelo").css({"display":"block"});
															}
															if(arrayTamanos[k] >= 900){
																if(int.length > 0){
																	if(int[0]["posicion"] != 0){
																		$(".adicional5CajonSuelo").css({"display":"block"});
																	}
																}else{
																	$(".adicional5CajonSuelo").css({"display":"block"});
																}
															}
														}
													}
													
												}
											}
										}
									}
								}
							}
						}
					}
				}				
			}
		}
	}
	
	$("#paradevolveryguardartam").attr("class",""+JSON.stringify(arrayTamanos)+"");
	$("#paradevolveryguardartam")[0].click();
	
}

function cambiarAnchoImagenSha(ancho){
	var parame = api.parameters.get({name :"L"}).data[0];
	api.parameters.updateAsync({
        id: parame.id,
        value: (parseFloat(ancho)*10)
      });
}

function apiShape(id){
		var rangeSlider = document.getElementById("rs-range-line");
		var rangeSlider1 = document.getElementById("rs-range-line1");
		var rangeSlider2 = document.getElementById("rs-range-line2");
		var rangeBullet = document.getElementById("rs-bullet");
	
		rangeSlider.addEventListener("input", showSliderValue, false);
		rangeSlider1.addEventListener("input", showSliderValue1, false);
		rangeSlider2.addEventListener("input", showSliderValue2, false);
		$("#rs-range-line").attr("onmouseup","cambiarVistaArmario(1)");
		$("#rs-range-line1").attr("onmouseup","cambiarVistaArmarioAltura()");
		$("#rs-range-line2").attr("onmouseup","cambiarVistaArmarioFondo()");
		$(".divBuscadorArticulos").css({"display":"block"});
		$("#page-heading").css({"display":"none"});
        $("#diviframeprueba").css({"display":"block"});
        $('.divseleccionarcodigoRutaNueva').css({ display: 'none' });
        var _container = document.getElementById('sdv-container');
		// viewer settings
		var _viewerSettings = {
		  // container to use
		  container: _container,
		  // when creating the viewer, we want to get back an API v2 object
		  api: {
		    version: 2
		  },
		  // ticket for a ShapeDiver model
		  ticket: id,
		  //'589fd5f0b47d32a4c0c9f51178e2547d3921c0e137f6f31417ac666ef0456ff50aeab735a16ffd696e90158f0f5d25deec11d207532baa49e0b71f9066037ef12216bba84850e072c837de602f921a62ab50a3de25206525a8fdaf74ca4337e8a71ba5f26622d5950551425af9297df908b8a57ce908-c4735fa91c66bf76053b2e0432c8158e',
		  modelViewUrl: 'eu-central-1',
		  showControlsInitial: true,
		  showSettingsInitial: false
		};
		
		// create the viewer, get back an API v2 object
		window.api = new SDVApp.ParametricViewer(_viewerSettings);
		
		var viewerInit = false;
		var parameters;
		var hoverEffect = {
			active: {
		    name: "colorHighlight",
		    options: {
		      color: [100, 100, 100]
		    }
		  }
		};

		var selectEffect = {
		  active: {
		    name: "colorHighlight",
		    options: {
			     color: [255, 0, 0]
				    }
			 }
		};
		var leftPivot, rightPivot, rotAxis, transVector;
				var leftTrans = {
				  scenePaths: [],
				  transformations: [
				    {
				      delay: 0,
				      duration: 500,
				      type: "rotation",
				      repeat: 0,
				      //yoyo:true,
				      rotationAxis: {
				        x: 1,
				        y: 0,
				        z: 0
				      },
				      rotationDegree: 90,
				      pivot: {}
				    }
				  ],
				  reset: false
				};
				var leftTrans1 = {
						  scenePaths: [],
						  transformations: [
						    {
						      delay: 0,
						      duration: 500,
						      type: "rotation",
						      repeat: 0,
						      //yoyo:true,
						      rotationAxis: {
						        x: 1,
						        y: 0,
						        z: 0
						      },
						      rotationDegree: -90,
						      pivot: {}
						    }
						  ],
						  reset: false
						};
				var puertaIzq = {
						  scenePaths: [],
						  transformations: [
						    {
						      delay: 0,
						      duration: 500,
						      type: "rotation",
						      repeat: 0,
						      //yoyo:true,
						      rotationAxis: {
						        x: 0,
						        y: 1,
						        z: 0
						      },
						      rotationDegree: 90,
						      pivot: {}
						    }
						  ],
						  reset: false
						};
						var puertaIzq1 = {
								  scenePaths: [],
								  transformations: [
								    {
								      delay: 0,
								      duration: 500,
								      type: "rotation",
								      repeat: 0,
								      //yoyo:true,
								      rotationAxis: {
								        x: 0,
								        y: 1,
								        z: 0
								      },
								      rotationDegree: -90,
								      pivot: {}
								    }
								  ],
								  reset: false
								};
					var selectableGroup = {
						  id: "select",
						  hoverable: true,
						  hoverEffect: hoverEffect,
						  //selectionEffect: selectEffect,
						  selectable: true,
						  selectionMode: "single"
						};
		api.scene.addEventListener(api.scene.EVENTTYPE.VISIBILITY_ON, function() {
		    if (!viewerInit) {
		    	window.s = new THREE.Matrix4();
		      var updatedSettings = {
		    		  scene : {
		    			  camera : {
		    				  rotationSpeed : 0.1,
		    				  autoAdjust: true,
		    				  restrictions :{
		    					  rotation : {
		    						  minAzimuthAngle: -75,
		    						  minPolarAngle: 45,
		    						  maxPolarAngle: 90,
		    						  maxAzimuthAngle: 75
		    						  }
		      					}
		      				}
		      			}
		      }
		      
		     
		      api.updateSettingsAsync(updatedSettings);
		      var globalDiv = document.getElementById("parameters");
		      parameters = api.parameters.get();
		      parameters.data.sort(function(a, b) {
		        return a.order - b.order;
		      });
		      console.log(parameters.data);
		      
		      	window.object0 = api.scene.get({name: "TapaGeo", format: "glb"},"CommPlugin_1").data[0];
		      	window.object1 = api.scene.get({name: "CostadosGeo", format: "glb"},"CommPlugin_1").data[0];
		      	window.object2 = api.scene.get({name: "SueloGeo", format: "glb"},"CommPlugin_1").data[0];
		      	window.object3 = api.scene.get({name: "Tabica geo", format: "glb"},"CommPlugin_1").data[0];
		      	window.object4 = api.scene.get({name: "MolduraGeo", format: "glb"},"CommPlugin_1").data[0];
		      	window.object5 = api.scene.get({name: "TraseraGeo", format: "glb"},"CommPlugin_1").data[0];
		      	window.object6 = api.scene.get({name: "FrenteGeo", format: "glb"},"CommPlugin_1").data[0];
		      	window.object7 = api.scene.get({name: "CostadoIntGeo", format: "glb"},"CommPlugin_1").data[0];

		    	      let arrPivot = api.scene.getData({
		    	        name: "frente"
		    	      }).data[0].data;
		    	      leftPivot = {
		    	        x: arrPivot[0],
		    	        y: arrPivot[1],
		    	        z: arrPivot[2]
		    	      };
		    	      leftTrans.scenePaths = [
		    	        api.scene.get(
		    	          {
		    	            name: "FrenteGeo",
		    	            format: "glb"
		    	          },
		    	          "CommPlugin_1"
		    	        ).data[0].scenePath
		    	      ];
		    	      leftTrans1.scenePaths = [
			    	        api.scene.get(
			    	          {
			    	            name: "FrenteGeo",
			    	            format: "glb"
			    	          },
			    	          "CommPlugin_1"
			    	        ).data[0].scenePath
			    	      ];
		    	      leftTrans.transformations[0].pivot = leftPivot;
		    	      leftTrans1.transformations[0].pivot = leftPivot;
		    	      api.scene.updateInteractionGroups(selectableGroup);
		    	      var assets = api.scene.get(
		    	        {
		    	          name: "FrenteGeo",
		    	          format: "glb"
		    	        },
		    	        "CommPlugin_1"
		    	      ).data;
		    	      var updateObjects = [];
		    	      let updateObject = {
		    	        id: assets[0].id,
		    	        duration: 0,
		    	        interactionGroup: selectableGroup.id,
		    	        interactionMode: "global"
		    	      };
		    	      updateObjects.push(updateObject);
		    	      api.scene.updatePersistentAsync(updateObjects, "CommPlugin_1");
		    	      window.seadadoclic = 0;
		    	      api.scene.addEventListener(api.scene.EVENTTYPE.SELECT_ON, function(){
		    	        console.log("SELECT_ON");
		    	          if(seadadoclic == 0){
		    	            api.scene.setLiveTransformation([leftTrans]);
		    	            seadadoclic = 1;
		    	          }else{
		    	            api.scene.setLiveTransformation([leftTrans1]);
		    	            seadadoclic = 0;
		    	          }
		    	      });
		      for (let i = 0; i < parameters.data.length; i++) {
		        let paramInput = null;
		        let paramDiv = document.createElement("div");
		        let param = parameters.data[i];
		        let label = document.createElement("label");
		        label.setAttribute("for", param.id);
		        		
		        if(i == 8){
		        	param["hidden"] = false;
		        }
		        if(i == 0){
		        	param["name"] = "ANCHO";
		        }
		        if(i == 1){
		        	param["name"] = "FONDO";
		        }
		        if(i == 2){
		        	param["name"] = "ALTO";
		        }
		        if(i == 3){
		        	param["hidden"] = true;
		        }
		        label.innerHTML = param.name;
		        if (param.type == "Int" || param.type == "Float" || param.type == "Even" || param.type == "Odd") {
		          paramInput = document.createElement("input");
		          paramInput12 = document.createElement("output");
		          paramInput.setAttribute("id", param.id);
		          paramInput.setAttribute("type", "range");
		          paramInput.setAttribute("min", param.min/10);
		          //paramInput.setAttribute("oninput", "this.nextElementSibling.value = this.value");
		          if(i == 0){
		        	  window.currScaleX = param.value / 10;
		        	  paramInput.setAttribute("oninput", "funcionAumentarTamanoAncho(this.value);");
		          }
		          if(i == 1){
		        	  window.currScaleY = param.value / 10;
		        	  paramInput.setAttribute("oninput", "funcionAumentarTamanoFondo(this.value);");
		          }
		          if(i == 2){
		        	  window.currScaleZ = param.value / 10;
		        	  paramInput.setAttribute("oninput", "funcionAumentarTamanoAlto(this.value);");
		          }
		          paramInput.setAttribute("max", (param.max/10));
		          paramInput.setAttribute("class", "rangeInputgg");
		          paramInput.setAttribute("value", (param.value/10));
		          window.valorDef = param.value/10;
		          paramInput12.setAttribute("id", "voydespues"+i);
		          if (param.type == "Int") paramInput.setAttribute("step", 1);
		          else if (param.type == "Even" || param.type == "Odd") paramInput.setAttribute("step", 2);
		          else paramInput.setAttribute("step", 1 / Math.pow(10, param.decimalplaces));
		          paramInput.onchange = function() {
		            
		            if(param["name"] == "ANCHO"){
		            	$("#ancho1").text(this.value);
		            }
		            if(param["name"] == "ALTO"){
		            	$("#altoDatosDimen").text(this.value);
		            }
		            if(param["name"] == "FONDO"){
		            	$("#fondoDatosDimen").text(this.value);
		            }
		            
		            var currScaleX = $("#voydespues0").text();
		            var currScaleY = $("#voydespues1").text();
		            var currScaleZ = $("#voydespues2").text();
		            api.parameters.updateAsync({
			              id: param.id,
			              value: this.value * 10
			            });
		            if(textura2 != undefined && textura2 != null){
		            	for (let i = 0; i < parameters.data.length; i++) {
		    				if(parameters.data[i]["name"] == "textura2"){
		    					api.parameters.updateAsync({
		    			            id: parameters.data[i]["id"],
		    			            value: textura2
		    			          });
		    				}

		    			}
		            	
		            }
					if(textura != undefined && textura != null){
						for (let i = 0; i < parameters.data.length; i++) {
		    				if(parameters.data[i]["name"] == "textura"){
		    					api.parameters.updateAsync({
		    			            id: parameters.data[i]["id"],
		    			            value: textura
		    			          });
		    				}

		    			}            	
							            	
					}
					if(textura6 != undefined && textura6 != null){
						for (let i = 0; i < parameters.data.length; i++) {
		    				if(parameters.data[i]["name"] == "textura6"){
		    					api.parameters.updateAsync({
		    			            id: parameters.data[i]["id"],
		    			            value: textura6
		    			          });
		    				}

		    			}
						
					}
		            
		            
		          };
		        } else if (param.type == "Bool") {
		          paramInput = document.createElement("input");
		          paramInput.setAttribute("id", param.id);
		          paramInput.setAttribute("type", "checkbox");
		          paramInput.setAttribute("checked", param.value);
		          paramInput.onchange = function() {
		            console.log(this);
		            api.scene.camera.zoomAsync()
		          };
		        
		        } else if (param.type == "Color") {
		          paramInput = document.createElement("input");
		          paramInput.setAttribute("id", param.id);
		          paramInput.setAttribute("type", "color");
		          paramInput.setAttribute("value", param.value);
		          paramInput.onchange = function() {
		            api.parameters.updateAsync({
		              id: param.id,
		              value: this.value
		            });
		            api.scene.camera.updateAsync({position:{x:1752.1604577050061,y:-1064.35000980438,z:311.8331380020649}, target:{x:699.6633891813408,y:254.5559136794404,z:59.28410887811541} });
		            api.scene.camera.zoomAsync()
		          };
		        } else if (param.type == "StringList") {
		          paramInput = document.createElement("select");
		          paramInput.setAttribute("id", param.id);
		          for (let j = 0; j < param.choices.length; j++) {
		            let option = document.createElement("option");
		            option.setAttribute("value", j);
		            option.setAttribute("name", param.choices[j]);
		            option.innerHTML = param.choices[j];
		            if (param.value == j) option.setAttribute("selected", "");
		            paramInput.appendChild(option);
		          }
		          paramInput.onchange = function() {
		            api.parameters.updateAsync({
		              id: param.id,
		              value: this.value
		            });
		            api.scene.camera.zoomAsync();
		            api.scene.camera.updateAsync({position:{x:1752.1604577050061,y:-1064.35000980438,z:311.8331380020649}, target:{x:699.6633891813408,y:254.5559136794404,z:59.28410887811541} });
		            
		          };
		        }
		        if (param.hidden) paramDiv.setAttribute("hidden", "");
		        paramDiv.appendChild(label);
		        paramDiv.appendChild(paramInput);
		        paramDiv.appendChild(paramInput12);
		        globalDiv.appendChild(paramDiv);
		        $("#voydespues"+i).append(param.value / 10);
		      }

		      var exports = api.exports.get();
		      for (let i = 0; i < exports.data.length; i++) {
		        let exportAsset = exports.data[i];
		        let exportDiv = document.createElement("div");
		        let exportInput = document.createElement("input");
		        exportInput.setAttribute("id", exportAsset.id);
		        exportInput.setAttribute("type", "button");
		        exportInput.setAttribute("name", exportAsset.name);
		        exportInput.setAttribute("value", exportAsset.name);
		        exportInput.onclick = function() {
		          api.exports.requestAsync({
		            id: this.id
		          }).then(
		            function(response) {
		              let link = response.data.content[0].href;
		              window.location = link;
		            }
		          );
		        };
		        exportDiv.appendChild(exportInput);
		        globalDiv.appendChild(exportDiv);
		      }
		      
		      viewerInit = true;
		      
		    }
		  });
		
		
	}

function apiShape3(id){
	
	window.textura = 'https://dl.dropboxusercontent.com/s/w62eqw9qyciq4lz/TABAK.png?dl=1';
	window.puertasAca = [];
	window.puertasAca1 = [];
	window.puertasAcaCantos = [];
	window.puertasAcaCantos1 = [];
	$(".divBuscadorArticulos").css({"display":"block"});
	$("#page-heading").css({"display":"none"});
    $("#diviframeprueba").css({"display":"block"});
    $('.divseleccionarcodigoRutaNueva').css({ display: 'none' });
    var _container = document.getElementById('sdv-container');
	// viewer settings
	var _viewerSettings = {
	  // container to use
	  container: _container,
	  // when creating the viewer, we want to get back an API v2 object
	  api: {
	    version: 2
	  },
	  // ticket for a ShapeDiver model
	  ticket: id,
	  //'589fd5f0b47d32a4c0c9f51178e2547d3921c0e137f6f31417ac666ef0456ff50aeab735a16ffd696e90158f0f5d25deec11d207532baa49e0b71f9066037ef12216bba84850e072c837de602f921a62ab50a3de25206525a8fdaf74ca4337e8a71ba5f26622d5950551425af9297df908b8a57ce908-c4735fa91c66bf76053b2e0432c8158e',
	  modelViewUrl: 'eu-central-1',
	  showControlsInitial: true,
	  showSettingsInitial: false
	};
	
	// create the viewer, get back an API v2 object
	window.api = new SDVApp.ParametricViewer(_viewerSettings); 
	
	var viewerInit = false;
	var parameters;
	/**var hoverEffect = {
		active: {
	    name: "colorHighlight",
	    options: {
	      color: [100, 100, 100]
	    }
	  }
	};

	var selectEffect = {
	  active: {
	    name: "colorHighlight",
	    options: {
		     color: [255, 0, 0]
			    }
		 }
	};
	var leftPivot, rightPivot, rotAxis, transVector;
			var leftTrans = {
			  scenePaths: [],
			  transformations: [
			    {
			      delay: 0,
			      duration: 500,
			      type: "rotation",
			      repeat: 0,
			      //yoyo:true,
			      rotationAxis: {
			        x: 1,
			        y: 0,
			        z: 0
			      },
			      rotationDegree: 90,
			      pivot: {}
			    }
			  ],
			  reset: false
			};
			var leftTrans1 = {
					  scenePaths: [],
					  transformations: [
					    {
					      delay: 0,
					      duration: 500,
					      type: "rotation",
					      repeat: 0,
					      //yoyo:true,
					      rotationAxis: {
					        x: 1,
					        y: 0,
					        z: 0
					      },
					      rotationDegree: -90,
					      pivot: {}
					    }
					  ],
					  reset: false
					};
			var puertaIzq = {
					  scenePaths: [],
					  transformations: [
					    {
					      delay: 0,
					      duration: 500,
					      type: "rotation",
					      repeat: 0,
					      //yoyo:true,
					      rotationAxis: {
					        x: 0,
					        y: 1,
					        z: 0
					      },
					      rotationDegree: 90,
					      pivot: {}
					    }
					  ],
					  reset: false
					};
					var puertaIzq1 = {
							  scenePaths: [],
							  transformations: [
							    {
							      delay: 0,
							      duration: 500,
							      type: "rotation",
							      repeat: 0,
							      //yoyo:true,
							      rotationAxis: {
							        x: 0,
							        y: 1,
							        z: 0
							      },
							      rotationDegree: -90,
							      pivot: {}
							    }
							  ],
							  reset: false
							};
				var selectableGroup = {
					  id: "select",
					  hoverable: true,
					  hoverEffect: hoverEffect,
					  //selectionEffect: selectEffect,
					  selectable: true,
					  selectionMode: "single"
					};**/

	api.scene.addEventListener(api.scene.EVENTTYPE.VISIBILITY_ON, function() {
		
	    if (!viewerInit) {
	    	window.s = new THREE.Matrix4();
	    	//$('#clicWebNumeroCambio')[0].click();
		  var updatedSettings = {
				  scene : {
					  camera : {
						  rotationSpeed : 0.1,
						  autoAdjust: true,
						  restrictions :{
							  rotation : {
								  minAzimuthAngle: -75,
								  minPolarAngle: 45,
								  maxPolarAngle: 90,
								  maxAzimuthAngle: 75
								  }
		  					}
		  				}
		  			}
		  }
		  
		 var ancho1 = $("#ancho1").text();
		  var parame = api.parameters.get({name :"L"}).data[0];
		 
			api.parameters.updateAsync({
		      id: parame.id,
		      value: (parseFloat(ancho1)*10)
		    }).then(function(response){
		    	 var alto1 = $("#altoDatosDimen").text();
		  	     var parame = api.parameters.get({name :"H"}).data[0];
		  	     if(parame != undefined){
		  	    	api.parameters.updateAsync({
			  	          id: parame.id,
			  	          value: (parseFloat(alto1)*10)
			  	        }) 
		  	     }
		    });
			var updatedSettings = {
				  scene : {
					  camera : {
						  rotationSpeed : 0.1,
						  autoAdjust: true,
						  restrictions :{
							  rotation : {
								  minAzimuthAngle: -75,
								  minPolarAngle: 45,
								  maxPolarAngle: 90,
								  maxAzimuthAngle: 75
								  }
		  					}
		  				}
		  			}
		  }
		api.updateSettingsAsync(updatedSettings); 
			 if(api.scene.get({ name: "Dimensiones", format: "glb" }, "CommPlugin_1").data[0] != undefined){
				  api.scene.toggleGeometry([],[api.scene.get({ name: "Dimensiones", format: "glb" }, "CommPlugin_1").data[0].scenePath]);
			}
	      var globalDiv = document.getElementById("parameters");
	      parameters = api.parameters.get();
	      parameters.data.sort(function(a, b) {
	        return a.order - b.order;
	      });
	      console.log(parameters.data);
	      
	      	window.object0 = api.scene.get({name: "TapaGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object1 = api.scene.get({name: "CostadosGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object2 = api.scene.get({name: "SueloGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object3 = api.scene.get({name: "Tabica geo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object4 = api.scene.get({name: "MolduraGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object5 = api.scene.get({name: "TraseraGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object6 = api.scene.get({name: "FrenteGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object7 = api.scene.get({name: "CostadoIntGeo", format: "glb"},"CommPlugin_1").data[0];

	    	      /**let arrPivot = api.scene.getData({
	    	        name: "frente"
	    	      }).data[0].data;
	    	      leftPivot = {
	    	        x: arrPivot[0],
	    	        y: arrPivot[1],
	    	        z: arrPivot[2]
	    	      };
	    	      leftTrans.scenePaths = [ 
	    	        api.scene.get(
	    	          {
	    	            name: "FrenteGeo",
	    	            format: "glb"
	    	          },
	    	          "CommPlugin_1"
	    	        ).data[0].scenePath
	    	      ];
	    	      leftTrans1.scenePaths = [
		    	        api.scene.get(
		    	          {
		    	            name: "FrenteGeo",
		    	            format: "glb"
		    	          },
		    	          "CommPlugin_1"
		    	        ).data[0].scenePath
		    	      ];
	    	      leftTrans.transformations[0].pivot = leftPivot;
	    	      leftTrans1.transformations[0].pivot = leftPivot;
	    	      api.scene.updateInteractionGroups(selectableGroup);
	    	      var assets = api.scene.get(
	    	        {
	    	          name: "FrenteGeo",
	    	          format: "glb"
	    	        },
	    	        "CommPlugin_1"
	    	      ).data;
	    	      var updateObjects = [];
	    	      let updateObject = {
	    	        id: assets[0].id,
	    	        duration: 0,
	    	        interactionGroup: selectableGroup.id,
	    	        interactionMode: "global"
	    	      };
	    	      updateObjects.push(updateObject);
	    	      api.scene.updatePersistentAsync(updateObjects, "CommPlugin_1");
	    	      window.seadadoclic = 0;
	    	      api.scene.addEventListener(api.scene.EVENTTYPE.SELECT_ON, function(){
	    	        console.log("SELECT_ON");
	    	          if(seadadoclic == 0){
	    	            api.scene.setLiveTransformation([leftTrans]);
	    	            seadadoclic = 1;
	    	          }else{
	    	            api.scene.setLiveTransformation([leftTrans1]);
	    	            seadadoclic = 0;
	    	          }
	    	      });**/
	      

	      var exports = api.exports.get();
	      for (let i = 0; i < exports.data.length; i++) {
	        let exportAsset = exports.data[i];
	        let exportDiv = document.createElement("div");
	        let exportInput = document.createElement("input");
	        exportInput.setAttribute("id", exportAsset.id);
	        exportInput.setAttribute("type", "button");
	        exportInput.setAttribute("name", exportAsset.name);
	        exportInput.setAttribute("value", exportAsset.name);
	        exportInput.onclick = function() {
	          api.exports.requestAsync({
	            id: this.id
	          }).then(
	            function(response) {
	              let link = response.data.content[0].href;
	              window.location = link;
	            }
	          );
	        };
	        exportDiv.appendChild(exportInput);
	        globalDiv.appendChild(exportDiv);
	      }
	      
	      viewerInit = true;
	      
	    }

	  });
	
	
}

function apiShape8(id){
	
	window.textura = 'https://dl.dropboxusercontent.com/s/w62eqw9qyciq4lz/TABAK.png?dl=1';
	window.puertasAca = [];
	window.puertasAca1 = [];
	window.puertasAcaCantos = [];
	window.puertasAcaCantos1 = [];
	$(".divBuscadorArticulos").css({"display":"block"});
	$("#page-heading").css({"display":"none"});
    $("#diviframeprueba").css({"display":"block"});
    $('.divseleccionarcodigoRutaNueva').css({ display: 'none' });
    var _container = document.getElementById('sdv-container');
	// viewer settings
	var _viewerSettings = {
	  // container to use
	  container: _container,
	  // when creating the viewer, we want to get back an API v2 object
	  api: {
	    version: 2
	  },
	  // ticket for a ShapeDiver model
	  ticket: id,
	  //'589fd5f0b47d32a4c0c9f51178e2547d3921c0e137f6f31417ac666ef0456ff50aeab735a16ffd696e90158f0f5d25deec11d207532baa49e0b71f9066037ef12216bba84850e072c837de602f921a62ab50a3de25206525a8fdaf74ca4337e8a71ba5f26622d5950551425af9297df908b8a57ce908-c4735fa91c66bf76053b2e0432c8158e',
	  modelViewUrl: 'eu-central-1',
	  showControlsInitial: true,
	  runtimeId: 'CommPlugin_1',
	  showSettingsInitial: false
	};
	
	// create the viewer, get back an API v2 object
	window.api = new SDVApp.ParametricViewer(_viewerSettings); 
	
	var viewerInit = false;
	var parameters;
	api.plugins.registerCommPluginAsync({
	    deferGeometryLoading: false,
	    ticket: "0ee55579a3c7ab70a54e0ee2e0b35cbd22e5d174fa6a5804ead6c1cce880de76719a258452512b219e14ec8b46a6f47164469b5c838a63db9d050704d0e49aec351cb11d5f7151eb05aad30c0053d59b57a72ab7c071155c06e36d578e06efcb20e6cfe4261eb4b2a3019a1a4668fb365ee484d3808dce189c752e22e7003413-0dd5d2e759b1bc3ebffc1fc3fbe25f61",
	    modelViewUrl: "eu-central-1",
	    runtimeId: 'CommPlugin_2',
	    brandedMode: 'false'
	  });
	api.plugins.refreshPluginAsync('CommPlugin_2');
	api.plugins.registerCommPluginAsync({
	    deferGeometryLoading: false,
	    ticket: "0ee55579a3c7ab70a54e0ee2e0b35cbd22e5d174fa6a5804ead6c1cce880de76719a258452512b219e14ec8b46a6f47164469b5c838a63db9d050704d0e49aec351cb11d5f7151eb05aad30c0053d59b57a72ab7c071155c06e36d578e06efcb20e6cfe4261eb4b2a3019a1a4668fb365ee484d3808dce189c752e22e7003413-0dd5d2e759b1bc3ebffc1fc3fbe25f61",
	    modelViewUrl: "eu-central-1",
	    runtimeId: 'CommPlugin_3',
	    brandedMode: 'false'
	  });
	api.plugins.refreshPluginAsync('CommPlugin_3');
	api.plugins.registerCommPluginAsync({
	    deferGeometryLoading: false,
	    ticket: "0ee55579a3c7ab70a54e0ee2e0b35cbd22e5d174fa6a5804ead6c1cce880de76719a258452512b219e14ec8b46a6f47164469b5c838a63db9d050704d0e49aec351cb11d5f7151eb05aad30c0053d59b57a72ab7c071155c06e36d578e06efcb20e6cfe4261eb4b2a3019a1a4668fb365ee484d3808dce189c752e22e7003413-0dd5d2e759b1bc3ebffc1fc3fbe25f61",
	    modelViewUrl: "eu-central-1",
	    runtimeId: 'CommPlugin_4',
	    brandedMode: 'false'
	  });
	api.plugins.refreshPluginAsync('CommPlugin_4');
	api.plugins.registerCommPluginAsync({
	    deferGeometryLoading: false,
	    ticket: "ca6290e4e7114cdc79ad02dd0202bfb1c7923fcdfb627ae5ddcec0f4c3cbccfc44065d52fa74e5ae5e6b43247b8fda69008c047736f2ddee21dc0ca3ce64f22af3eb066cce4f79411dc4f44c0f67638b7def83a2acc976a1343979b54fac5bace253cb652c1c4c18a9cd953d3bf0c157c6bb53618155d517300520ebf9b53c52-ff381df3612b148d98cc7dcbd832f913",
	    modelViewUrl: "eu-central-1",
	    runtimeId: 'CommPlugin_5',
	    brandedMode: 'false'
	  });
	api.plugins.refreshPluginAsync('CommPlugin_5');
	api.plugins.registerCommPluginAsync({
	    deferGeometryLoading: false,
	    ticket: "ca6290e4e7114cdc79ad02dd0202bfb1c7923fcdfb627ae5ddcec0f4c3cbccfc44065d52fa74e5ae5e6b43247b8fda69008c047736f2ddee21dc0ca3ce64f22af3eb066cce4f79411dc4f44c0f67638b7def83a2acc976a1343979b54fac5bace253cb652c1c4c18a9cd953d3bf0c157c6bb53618155d517300520ebf9b53c52-ff381df3612b148d98cc7dcbd832f913",
	    modelViewUrl: "eu-central-1",
	    runtimeId: 'CommPlugin_6',
	    brandedMode: 'false'
	  });
	api.plugins.refreshPluginAsync('CommPlugin_6');
	
	
	api.scene.addEventListener(api.scene.EVENTTYPE.VISIBILITY_ON, function() {
		
	    if (!viewerInit) {
	    	window.s = new THREE.Matrix4();
	    	var arrayGlobal = [];
	    	for(let k = 0;k<3;k++){
	    	  var valorAncho = api.scene.get({ name: "wardrobeOrientation" }).data[0].content[0].data["wardrobe"][k]["length"];
	    	  //puertasObject["puertas"] = arrayPu ertas;
	    	  var codigo;
	    	  var costado;
	    	  var costado1;
	    	  var costado2;
	    	  var costado3;
	    	  var e = 19;
	    	  var p;
	    	  var h1;
	    	  var h2;
	    	  var h;
	    	  switch (true){
	    	  case valorAncho <= 500:
	    		  armario = 1;
		    	  p = 1;
				  h1 = 1;
				  h2 = 0;
				  h = 1;
	    		  break;
	    	  case valorAncho <= 1000:
	    		  armario = 2;
		    	  p = 2;
				  h1 = 0;
				  h2 = 1;
				  h = 1;
	    		  break;
	    	  case valorAncho <= 1500:
	    		  armario = 3;
		    	  costado = 0.33;
		          costado1 = 0;
		          p = 3;
				  h1 = 1;
				  h2 = 1;
				  h = 2;
	    		  break;
	    	  case valorAncho <= 2000:
	    		  armario = 4;
		    	  costado = 0.5;
		          costado1 = 0;
		          p = 4;
				  h1 = 0;
				  h2 = 2;
				  h = 2;
	    		  break;
	    	  case valorAncho <= 2500:
	    		  armario = 5;
		    	  costado = 0.4;
		          costado1 = 0.6;
		          p = 5;
				  h1 = 1;
				  h2 = 2;
				  h = 3;
	    		  break;
	    	  case valorAncho <= 3000:
	    		  armario = 6;
		    	  costado = 0.333;
		          costado1 = 0.666;
		          p = 6;
				  h1 = 0;
				  h2 = 3;
				  h = 3;
	    		  break;
	    	  case valorAncho <= 3500:
	    		  armario = 7;
		    	  costado = 0.29;
		          costado1 = 0.43;
		          costado2 = 0.71;
		          p = 7;
				  h1 = 1;
				  h2 = 3;
				  h = 4;
	    		  break;
	    	  case valorAncho <= 4000:
	    		  armario = 8;
		    	  costado = 0.25;
		          costado1 = 0.5;
		          costado2 = 0.75;
		          p = 8;
				  h1 = 0;
				  h2 = 4;
				  h = 4;
	    		  break;
	    	  }
	    	  var posint1 = 0;
	    	  var posint2 = 0;
	    	  posint1 = (valorAncho -12 -2*p)/p-17;
	    	  posint2 = (valorAncho - 38-(h-1)*e-h1*posint1)/h2;
	    	  console.log("pos 1 : " +posint1);
	    	  console.log("pos 2 : " +posint2);
	    	  
	    	  var object = {};
	    	  var array = [];
	    	  array[0] = 0;
	    	  if(armario == 1){
	    		  array[array.length] = (valorAncho - 19) ;
	    	  }
	    	  if(armario == 2){
	    		  array[array.length] = (valorAncho - 19) ;
	    	  }
	    	  if(armario == 3){
	    			  array[1] = (posint1 + 19);
	    		  array[array.length] = (valorAncho - 19) ;
	    	  }
	    	  if(armario == 4){
	    			  array[1] = (posint2 + 19);
	    		  array[array.length] = (valorAncho - 19) ;
	    	  }
	    	  if(armario == 5){
	    			  array[1] = (posint2 + 19);
	    			  array[2] = (array[1]+ (posint1 + 19));
	    		  array[array.length] = (valorAncho - 19) ;
	    	  }
	    	  if(armario == 6){
	    			  array[1] = (posint2 + 19);
	    			  array[2] = (array[1]+ (posint2 + 19));

	    		  array[array.length] = (valorAncho - 19) ;
	    	  }
	    	  if(armario == 7){
	    			  array[1] = (posint2 + 19);
	    			  array[2] = (array[1]+ (posint1 + 19));
	    			  array[3] = (array[2]+ (posint2 + 19));
	    		  array[array.length] = (valorAncho - 19) ;
	    	  }
	    	  if(armario == 8){
	    		  
	    			  array[1] = (posint2 + 19);
	    			  array[2] = (array[1]+ (posint2 + 19));
	    			  array[3] = (array[2]+ (posint2 + 19));
	    		  
	    		  array[array.length] = (valorAncho - 19) ;
	    	  }
	    	  object["costados"] = array;
	    	  arrayGlobal[k] = object;
	    	}
	    	  setTimeout(function() {
	            
				        	 var parame = api.parameters.get({name :"CostadosJSON" , plugin: "CommPlugin_2"}).data[0];
				        	 parame.value = JSON.stringify(arrayGlobal[0]);
				        	 var parame5 = api.parameters.get({name :"CostadosJSON" , plugin: "CommPlugin_3"}).data[0];
				        	 parame5.value = JSON.stringify(arrayGlobal[1]);
				        	 var parame6 = api.parameters.get({name :"CostadosJSON" , plugin: "CommPlugin_4"}).data[0];
				        	 parame6.value = JSON.stringify(arrayGlobal[2]);
					    	 
					    	  var parame1 = api.parameters.get({name :"longitud" , plugin: "CommPlugin_5"}).data[0];
					    	  parame1.value = api.scene.get({ name: "wardrobeOrientation" }).data[0].content[0].data["corner"][0]["length"];
						      var parame2 = api.parameters.get({name :"fondo" , plugin: "CommPlugin_5"}).data[0];
					    	  parame2.value = api.scene.get({ name: "wardrobeOrientation" }).data[0].content[0].data["corner"][0]["length"];
					    	  var parame3 = api.parameters.get({name :"longitud" , plugin: "CommPlugin_6"}).data[0];
					    	  parame3.value = api.scene.get({ name: "wardrobeOrientation" }).data[0].content[0].data["corner"][1]["length"];
						      var parame4 = api.parameters.get({name :"fondo" , plugin: "CommPlugin_6"}).data[0];
					    	  parame4.value = api.scene.get({ name: "wardrobeOrientation" }).data[0].content[0].data["corner"][1]["length"];
							  api.parameters.updateAsync([parame,parame1,parame2,parame3,parame4,parame5,parame6]); 
					    	  setTimeout(function() {
					    	  var url = 'https://dl.dropboxusercontent.com/s/qi8vt1fz66riltm/NATURE.png?dl=1';
					    	  var urlCantos = 'https://dl.dropboxusercontent.com/s/yt0r62w1mr3um9u/NATURE_CANTO.png?dl=1';
					    	  api.scene.updatePersistentAsync([{
									id: api.scene.get({ name: "costado", format: "material" }, "CommPlugin_3").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											roughness: 1,
											bitmaptexture: url
										}
									}
									]
								}, {
									id: api.scene.get({ name: "suelotapa", format: "material" }, "CommPlugin_3").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											roughness: 1,
											bitmaptexture: url
										}
									}
									]
								}, {
									id: api.scene.get({ name: "suelotapa1", format: "material" }, "CommPlugin_3").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosSuelo", format: "material" }, "CommPlugin_3").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosTapa", format: "material" }, "CommPlugin_3").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosCostados", format: "material" }, "CommPlugin_3").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								},{
									id: api.scene.get({ name: "costado", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											roughness: 1,
											bitmaptexture: url
										}
									}
									]
								}, {
									id: api.scene.get({ name: "suelotapa", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											roughness: 1,
											bitmaptexture: url
										}
									}
									]
								}, {
									id: api.scene.get({ name: "suelotapa1", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosSuelo", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosTapa", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosCostados", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								},{
									id: api.scene.get({ name: "costado", format: "material" }, "CommPlugin_4").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											roughness: 1,
											bitmaptexture: url
										}
									}
									]
								}, {
									id: api.scene.get({ name: "suelotapa", format: "material" }, "CommPlugin_4").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											roughness: 1,
											bitmaptexture: url
										}
									}
									]
								}, {
									id: api.scene.get({ name: "suelotapa1", format: "material" }, "CommPlugin_4").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosSuelo", format: "material" }, "CommPlugin_4").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosTapa", format: "material" }, "CommPlugin_4").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosCostados", format: "material" }, "CommPlugin_4").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}],"CommPlugin_3");
					    	  api.scene.updatePersistentAsync([{
									id: api.scene.get({ name: "costado", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											roughness: 1,
											bitmaptexture: url
										}
									}
									]
								}, {
									id: api.scene.get({ name: "suelotapa", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											roughness: 1,
											bitmaptexture: url
										}
									}
									]
								}, {
									id: api.scene.get({ name: "suelotapa1", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosSuelo", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosTapa", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosCostados", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}],"CommPlugin_2");
					    	  api.scene.updatePersistentAsync([{
									id: api.scene.get({ name: "costado", format: "material" }, "CommPlugin_4").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											roughness: 1,
											bitmaptexture: url
										}
									}
									]
								}, {
									id: api.scene.get({ name: "suelotapa", format: "material" }, "CommPlugin_4").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											roughness: 1,
											bitmaptexture: url
										}
									}
									]
								}, {
									id: api.scene.get({ name: "suelotapa1", format: "material" }, "CommPlugin_4").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosSuelo", format: "material" }, "CommPlugin_4").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosTapa", format: "material" }, "CommPlugin_4").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosCostados", format: "material" }, "CommPlugin_4").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}],"CommPlugin_4");
					    	  api.scene.updatePersistentAsync([{
									id: api.scene.get({ name: "costado", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											roughness: 1,
											bitmaptexture: url
										}
									}
									]
								}, {
									id: api.scene.get({ name: "suelotapa", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											roughness: 1,
											bitmaptexture: url
										}
									}
									]
								}, {
									id: api.scene.get({ name: "suelotapa1", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosSuelo", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosTapa", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}, {
									id: api.scene.get({ name: "CantosCostados", format: "material" }, "CommPlugin_2").data[0].id,
									content: [
									{
										format: "material",
										data: {
											version: "2.0",
											bitmaptexture: urlCantos
										}
									}
									]
								}],"CommPlugin_2");

					    	  
					    	  					var armario1 = new THREE.Matrix4();
					    	  					var armario2 = new THREE.Matrix4();
					    	  					var armario3 = new THREE.Matrix4();
					    	  					var armario4 = new THREE.Matrix4();
					    	  					var armario5 = new THREE.Matrix4();
					    	  					var war1 = api.scene.get({ name: "wardrobeOrientation" }).data[0].content[0].data["wardrobe"][0]["xform"];
					    	  					var war2 = api.scene.get({ name: "wardrobeOrientation" }).data[0].content[0].data["wardrobe"][1]["xform"];
					    	  					var war3 = api.scene.get({ name: "wardrobeOrientation" }).data[0].content[0].data["wardrobe"][2]["xform"];
					    	  					var war4 = api.scene.get({ name: "wardrobeOrientation" }).data[0].content[0].data["corner"][0]["xform"];
					    	  					var war5 = api.scene.get({ name: "wardrobeOrientation" }).data[0].content[0].data["corner"][1]["xform"];
					    	  					armario1.set(war1[0],war1[1],war1[2],war1[3],war1[4],war1[5],war1[6],war1[7],war1[8],war1[9],war1[10],war1[11],war1[12],war1[13],war1[14],war1[15]);
					    	  					armario2.set(war2[0],war2[1],war2[2],war2[3],war2[4],war2[5],war2[6],war2[7],war2[8],war2[9],war2[10],war2[11],war2[12],war2[13],war2[14],war2[15]);
					    	  					armario3.set(war3[0],war3[1],war3[2],war3[3],war3[4],war3[5],war3[6],war3[7],war3[8],war3[9],war3[10],war3[11],war3[12],war3[13],war3[14],war3[15]);
					    	  					armario4.set(war4[0],war4[1],war4[2],war4[3],war4[4],war4[5],war4[6],war4[7],war4[8],war4[9],war4[10],war4[11],war4[12],war4[13],war4[14],war4[15]);
					    	  					armario5.set(war5[0],war5[1],war5[2],war5[3],war5[4],war5[5],war5[6],war5[7],war5[8],war5[9],war5[10],war5[11],war5[12],war5[13],war5[14],war5[15]);
					    	  					armario1.transpose();
					    	  					armario2.transpose();
					    	  					armario3.transpose();
					    	  					armario4.transpose();
					    	  					armario5.transpose();
					    	  					api.scene.applyTransformation("plugin","CommPlugin_2",armario1);
					    	  					api.scene.applyTransformation("plugin","CommPlugin_3",armario2);
					    	  					api.scene.applyTransformation("plugin","CommPlugin_4",armario3);
					    	  					api.scene.applyTransformation("plugin","CommPlugin_5",armario4);
					    	  					api.scene.applyTransformation("plugin","CommPlugin_6",armario5);
					    	  				
					    	  }, 5000);
	    	  }, 5000);
	    	 
	    	//$('#clicWebNumeroCambio')[0].click();
		  var updatedSettings = {
				  scene : {
					  camera : {
						  rotationSpeed : 0.1,
						  autoAdjust: true,
						  restrictions :{
							  rotation : {
								  minAzimuthAngle: -75,
								  minPolarAngle: 45,
								  maxPolarAngle: 90,
								  maxAzimuthAngle: 75
								  }
		  					}
		  				}
		  			}
		  }
		  
		 var ancho1 = $("#ancho1").text();
		  var parame = api.parameters.get({name :"L"}).data[0];
		 
			api.parameters.updateAsync({
		      id: parame.id,
		      value: (parseFloat(ancho1)*10)
		    }).then(function(response){
		    	 var alto1 = $("#altoDatosDimen").text();
		  	     var parame = api.parameters.get({name :"H"}).data[0];
		  	     if(parame != undefined){
		  	    	api.parameters.updateAsync({
			  	          id: parame.id,
			  	          value: (parseFloat(alto1)*10)
			  	        }) 
		  	     }
		    });
			var updatedSettings = {
				  scene : {
					  camera : {
						  rotationSpeed : 0.1,
						  autoAdjust: true,
						  restrictions :{
							  rotation : {
								  minAzimuthAngle: -75,
								  minPolarAngle: 45,
								  maxPolarAngle: 90,
								  maxAzimuthAngle: 75
								  }
		  					}
		  				}
		  			}
		  }
		api.updateSettingsAsync(updatedSettings); 
			 if(api.scene.get({ name: "Dimensiones", format: "glb" }, "CommPlugin_1").data[0] != undefined){
				  api.scene.toggleGeometry([],[api.scene.get({ name: "Dimensiones", format: "glb" }, "CommPlugin_1").data[0].scenePath]);
			}
	      var globalDiv = document.getElementById("parameters");
	      parameters = api.parameters.get();
	      parameters.data.sort(function(a, b) {
	        return a.order - b.order;
	      });
	      console.log(parameters.data);
	      
	      	window.object0 = api.scene.get({name: "TapaGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object1 = api.scene.get({name: "CostadosGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object2 = api.scene.get({name: "SueloGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object3 = api.scene.get({name: "Tabica geo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object4 = api.scene.get({name: "MolduraGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object5 = api.scene.get({name: "TraseraGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object6 = api.scene.get({name: "FrenteGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object7 = api.scene.get({name: "CostadoIntGeo", format: "glb"},"CommPlugin_1").data[0];

	    	      
	      

	      var exports = api.exports.get();
	      for (let i = 0; i < exports.data.length; i++) {
	        let exportAsset = exports.data[i];
	        let exportDiv = document.createElement("div");
	        let exportInput = document.createElement("input");
	        exportInput.setAttribute("id", exportAsset.id);
	        exportInput.setAttribute("type", "button");
	        exportInput.setAttribute("name", exportAsset.name);
	        exportInput.setAttribute("value", exportAsset.name);
	        exportInput.onclick = function() {
	          api.exports.requestAsync({
	            id: this.id
	          }).then(
	            function(response) {
	              let link = response.data.content[0].href;
	              window.location = link;
	            }
	          );
	        };
	        exportDiv.appendChild(exportInput);
	        globalDiv.appendChild(exportDiv);
	      }
	      
	      viewerInit = true;
	      
	    }

	  });
	
	
}

function apiShape9(id){
	
	window.textura = 'https://dl.dropboxusercontent.com/s/w62eqw9qyciq4lz/TABAK.png?dl=1';
	window.puertasAca = [];
	window.puertasAca1 = [];
	window.puertasAcaCantos = [];
	window.puertasAcaCantos1 = [];
	$(".divBuscadorArticulos").css({"display":"block"});
	$("#page-heading").css({"display":"none"});
    $("#diviframeprueba").css({"display":"block"});
    $('.divseleccionarcodigoRutaNueva').css({ display: 'none' });
    var _container = document.getElementById('sdv-container');
	// viewer settings
	var _viewerSettings = {
	  // container to use
	  container: _container,
	  // when creating the viewer, we want to get back an API v2 object
	  api: {
	    version: 2
	  },
	  // ticket for a ShapeDiver model
	  ticket: '784cdc61239ec332ab0fd0e173a700fa97a62e65fba722e7827b0c14d14ddc0880bc9ece63c8e2c5861c52f4e22fc5c48f8a71d0e742c885470cef9352842bba420c0557eb7c5a53b0f5ebe6238914f4d76c21b4be2ba3c120e38aa494279e0a6590259ede7e33d739ca4c8bb18728fbef037c75ed4274d4228bce34fce17d7a-16b722c51edc64fb8d7afb88274aea74',
	  //'589fd5f0b47d32a4c0c9f51178e2547d3921c0e137f6f31417ac666ef0456ff50aeab735a16ffd696e90158f0f5d25deec11d207532baa49e0b71f9066037ef12216bba84850e072c837de602f921a62ab50a3de25206525a8fdaf74ca4337e8a71ba5f26622d5950551425af9297df908b8a57ce908-c4735fa91c66bf76053b2e0432c8158e',
	  modelViewUrl: 'eu-central-1',
	  showControlsInitial: true,
	  runtimeId: 'CommPlugin_1',
	  showSettingsInitial: false
	};
	
	// create the viewer, get back an API v2 object
	window.api = new SDVApp.ParametricViewer(_viewerSettings); 
	
	var viewerInit = false;
	var parameters;
	api.plugins.registerCommPluginAsync({
	    deferGeometryLoading: false,
	    ticket: "2f6f8ffb73f5957fc97c7d30430bff5d55bef43d0cfc390aedb91385f9acbd08bb96b44dd0bca653c5b68df70389e07228c042979f2f6c6472819d6e4357558e0e5adaf5a9c995da80b1e5a0c0847cc3d0acbb1d20e42ff2828dd6492544ff356ab4361fbbd7d104eac9c7ca9b6a7cb24d9942dbfec4afd16ec1848100a0c55a-e9eb388a0bb4584433b7b731bbb5ff16",
	    modelViewUrl: "eu-central-1",
	    runtimeId: 'CommPlugin_2',
	    brandedMode: 'false'
	  });
	api.plugins.refreshPluginAsync('CommPlugin_2');
	
	api.scene.addEventListener(api.scene.EVENTTYPE.VISIBILITY_ON, function() {
		
	    if (!viewerInit) {
	    	setTimeout(function() {
	    		var armario1 = new THREE.Matrix4();
				
				armario1.set(1,0,0,0,0,1,0,0,0,0,1,0,api.parameters.get({name : "L", plugin: "CommPlugin_1"},"CommPlugin_1").data[0].value,0,0,1);
				
				armario1.transpose();
				
				api.scene.applyTransformation("plugin","CommPlugin_2",armario1);
            }, 2500);
	    		
				
	    	window.s = new THREE.Matrix4();
	    	var arrayGlobal = [];
	    	
	    	 
	    	//$('#clicWebNumeroCambio')[0].click();
		  var updatedSettings = {
				  scene : {
					  camera : {
						  rotationSpeed : 0.1,
						  autoAdjust: true,
						  restrictions :{
							  rotation : {
								  minAzimuthAngle: -75,
								  minPolarAngle: 45,
								  maxPolarAngle: 90,
								  maxAzimuthAngle: 75
								  }
		  					}
		  				}
		  			}
		  }
		  
		 var ancho1 = $("#ancho1").text();
		  var parame = api.parameters.get({name :"L"}).data[0];
		 
			api.parameters.updateAsync({
		      id: parame.id,
		      value: (parseFloat(ancho1)*10)
		    }).then(function(response){
		    	 var alto1 = $("#altoDatosDimen").text();
		  	     var parame = api.parameters.get({name :"H"}).data[0];
		  	     if(parame != undefined){
		  	    	api.parameters.updateAsync({
			  	          id: parame.id,
			  	          value: (parseFloat(alto1)*10)
			  	        }) 
		  	     }
		    });
			var updatedSettings = {
				  scene : {
					  camera : {
						  rotationSpeed : 0.1,
						  autoAdjust: true,
						  restrictions :{
							  rotation : {
								  minAzimuthAngle: -75,
								  minPolarAngle: 45,
								  maxPolarAngle: 90,
								  maxAzimuthAngle: 75
								  }
		  					}
		  				}
		  			}
		  }
		api.updateSettingsAsync(updatedSettings); 
			 if(api.scene.get({ name: "Dimensiones", format: "glb" }, "CommPlugin_1").data[0] != undefined){
				  api.scene.toggleGeometry([],[api.scene.get({ name: "Dimensiones", format: "glb" }, "CommPlugin_1").data[0].scenePath , api.scene.get({ name: "Dimensiones", format: "glb" }, "CommPlugin_2").data[0].scenePath]);
			}
	      var globalDiv = document.getElementById("parameters");
	      parameters = api.parameters.get();
	      parameters.data.sort(function(a, b) {
	        return a.order - b.order;
	      });
	      console.log(parameters.data);
	      
	      	window.object0 = api.scene.get({name: "TapaGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object1 = api.scene.get({name: "CostadosGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object2 = api.scene.get({name: "SueloGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object3 = api.scene.get({name: "Tabica geo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object4 = api.scene.get({name: "MolduraGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object5 = api.scene.get({name: "TraseraGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object6 = api.scene.get({name: "FrenteGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object7 = api.scene.get({name: "CostadoIntGeo", format: "glb"},"CommPlugin_1").data[0];

	    	      
	      

	      var exports = api.exports.get();
	      for (let i = 0; i < exports.data.length; i++) {
	        let exportAsset = exports.data[i];
	        let exportDiv = document.createElement("div");
	        let exportInput = document.createElement("input");
	        exportInput.setAttribute("id", exportAsset.id);
	        exportInput.setAttribute("type", "button");
	        exportInput.setAttribute("name", exportAsset.name);
	        exportInput.setAttribute("value", exportAsset.name);
	        exportInput.onclick = function() {
	          api.exports.requestAsync({
	            id: this.id
	          }).then(
	            function(response) {
	              let link = response.data.content[0].href;
	              window.location = link;
	            }
	          );
	        };
	        exportDiv.appendChild(exportInput);
	        globalDiv.appendChild(exportDiv);
	      }
	      
	      viewerInit = true;
	      
	    }

	  });
	
	
}


function apiShape2(id){
	var rangeSlider = document.getElementById("rs-range-line");
	var rangeSlider1 = document.getElementById("rs-range-line1");
	var rangeSlider2 = document.getElementById("rs-range-line2");
	var rangeBullet = document.getElementById("rs-bullet");

	rangeSlider.addEventListener("input", showSliderValue, false);
	rangeSlider1.addEventListener("input", showSliderValue1, false);
	rangeSlider2.addEventListener("input", showSliderValue2, false);
	$("#rs-range-line").attr("onmouseup","cambiarVistaArmario(1)");
	$("#rs-range-line1").attr("onmouseup","cambiarVistaArmarioAltura()");
	$("#rs-range-line2").attr("onmouseup","cambiarVistaArmarioFondo()");
	$(".divBuscadorArticulos").css({"display":"block"});
	$("#page-heading").css({"display":"none"});
    $("#diviframeprueba").css({"display":"block"});
    $('.divseleccionarcodigoRutaNueva').css({ display: 'none' });
    var _container = document.getElementById('sdv-container');
	// viewer settings
	var _viewerSettings = {
	  // container to use
	  container: _container,
	  // when creating the viewer, we want to get back an API v2 object
	  api: {
	    version: 2
	  },
	  // ticket for a ShapeDiver model
	  ticket: id,
	  //'589fd5f0b47d32a4c0c9f51178e2547d3921c0e137f6f31417ac666ef0456ff50aeab735a16ffd696e90158f0f5d25deec11d207532baa49e0b71f9066037ef12216bba84850e072c837de602f921a62ab50a3de25206525a8fdaf74ca4337e8a71ba5f26622d5950551425af9297df908b8a57ce908-c4735fa91c66bf76053b2e0432c8158e',
	  modelViewUrl: 'eu-central-1',
	  showControlsInitial: true,
	  showSettingsInitial: false
	};
	
	// create the viewer, get back an API v2 object
	window.api = new SDVApp.ParametricViewer(_viewerSettings);
	
	var viewerInit = false;
	var parameters;
	var hoverEffect = {
		active: {
	    name: "colorHighlight",
	    options: {
	      color: [100, 100, 100]
	    }
	  }
	};

	var selectEffect = {
	  active: {
	    name: "colorHighlight",
	    options: {
		     color: [255, 0, 0]
			    }
		 }
	};
	var leftPivot, rightPivot, rotAxis, transVector;
			var leftTrans = {
			  scenePaths: [],
			  transformations: [
			    {
			      delay: 0,
			      duration: 500,
			      type: "rotation",
			      repeat: 0,
			      //yoyo:true,
			      rotationAxis: {
			        x: 1,
			        y: 0,
			        z: 0
			      },
			      rotationDegree: 90,
			      pivot: {}
			    }
			  ],
			  reset: false
			};
			var leftTrans1 = {
					  scenePaths: [],
					  transformations: [
					    {
					      delay: 0,
					      duration: 500,
					      type: "rotation",
					      repeat: 0,
					      //yoyo:true,
					      rotationAxis: {
					        x: 1,
					        y: 0,
					        z: 0
					      },
					      rotationDegree: -90,
					      pivot: {}
					    }
					  ],
					  reset: false
					};
			var puertaIzq = {
					  scenePaths: [],
					  transformations: [
					    {
					      delay: 0,
					      duration: 500,
					      type: "rotation",
					      repeat: 0,
					      //yoyo:true,
					      rotationAxis: {
					        x: 0,
					        y: 1,
					        z: 0
					      },
					      rotationDegree: 90,
					      pivot: {}
					    }
					  ],
					  reset: false
					};
					var puertaIzq1 = {
							  scenePaths: [],
							  transformations: [
							    {
							      delay: 0,
							      duration: 500,
							      type: "rotation",
							      repeat: 0,
							      //yoyo:true,
							      rotationAxis: {
							        x: 0,
							        y: 1,
							        z: 0
							      },
							      rotationDegree: -90,
							      pivot: {}
							    }
							  ],
							  reset: false
							};
				var selectableGroup = {
					  id: "select",
					  hoverable: true,
					  hoverEffect: hoverEffect,
					  //selectionEffect: selectEffect,
					  selectable: true,
					  selectionMode: "single"
					};
	api.scene.addEventListener(api.scene.EVENTTYPE.VISIBILITY_ON, function() {
	    if (!viewerInit) {
	    	window.s = new THREE.Matrix4();
	      var updatedSettings = {
	    		  scene : {
	    			  camera : {
	    				  rotationSpeed : 0.1,
	    				  autoAdjust: true,
	    				  restrictions :{
	    					  rotation : {
	    						  minAzimuthAngle: -75,
	    						  minPolarAngle: 45,
	    						  maxPolarAngle: 90,
	    						  maxAzimuthAngle: 75
	    						  }
	      					}
	      				}
	      			}
	      }
	      
	     
	      api.updateSettingsAsync(updatedSettings);
	      var globalDiv = document.getElementById("parameters");
	      parameters = api.parameters.get();
	      parameters.data.sort(function(a, b) {
	        return a.order - b.order;
	      });
	      console.log(parameters.data);
	      
	      	window.object0 = api.scene.get({name: "TapaGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object1 = api.scene.get({name: "CostadosGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object2 = api.scene.get({name: "SueloGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object3 = api.scene.get({name: "Tabica geo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object4 = api.scene.get({name: "MolduraGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object5 = api.scene.get({name: "TraseraGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object6 = api.scene.get({name: "FrenteGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object7 = api.scene.get({name: "CostadoIntGeo", format: "glb"},"CommPlugin_1").data[0];

	    	      
	      for (let i = 0; i < parameters.data.length; i++) {
	        let paramInput = null;
	        let paramDiv = document.createElement("div");
	        let param = parameters.data[i];
	        let label = document.createElement("label");
	        label.setAttribute("for", param.id);
	        		
	        if(i == 8){
	        	param["hidden"] = false;
	        }
	        if(i == 0){
	        	param["name"] = "ANCHO";
	        }
	        if(i == 1){
	        	param["name"] = "FONDO";
	        }
	        if(i == 2){
	        	param["name"] = "ALTO";
	        }
	        if(i == 3){
	        	param["hidden"] = true;
	        }
	        label.innerHTML = param.name;
	        if (param.type == "Int" || param.type == "Float" || param.type == "Even" || param.type == "Odd") {
	          paramInput = document.createElement("input");
	          paramInput12 = document.createElement("output");
	          paramInput.setAttribute("id", param.id);
	          paramInput.setAttribute("type", "range");
	          paramInput.setAttribute("min", param.min/10);
	          //paramInput.setAttribute("oninput", "this.nextElementSibling.value = this.value");
	          if(i == 0){
	        	  window.currScaleX = param.value / 10;
	        	  paramInput.setAttribute("oninput", "funcionAumentarTamanoAncho(this.value);");
	          }
	          if(i == 1){
	        	  window.currScaleY = param.value / 10;
	        	  paramInput.setAttribute("oninput", "funcionAumentarTamanoFondo(this.value);");
	          }
	          if(i == 2){
	        	  window.currScaleZ = param.value / 10;
	        	  paramInput.setAttribute("oninput", "funcionAumentarTamanoAlto(this.value);");
	          }
	          paramInput.setAttribute("max", (param.max/10));
	          paramInput.setAttribute("class", "rangeInputgg");
	          paramInput.setAttribute("value", (param.value/10));
	          window.valorDef = param.value/10;
	          paramInput12.setAttribute("id", "voydespues"+i);
	          if (param.type == "Int") paramInput.setAttribute("step", 1);
	          else if (param.type == "Even" || param.type == "Odd") paramInput.setAttribute("step", 2);
	          else paramInput.setAttribute("step", 1 / Math.pow(10, param.decimalplaces));
	          paramInput.onchange = function() {
	            
	            if(param["name"] == "ANCHO"){
	            	$("#ancho1").text(this.value);
	            }
	            if(param["name"] == "ALTO"){
	            	$("#altoDatosDimen").text(this.value);
	            }
	            if(param["name"] == "FONDO"){
	            	$("#fondoDatosDimen").text(this.value);
	            }
	            
	            var currScaleX = $("#voydespues0").text();
	            var currScaleY = $("#voydespues1").text();
	            var currScaleZ = $("#voydespues2").text();
	            api.parameters.updateAsync({
		              id: param.id,
		              value: this.value * 10
		            });
	            if(textura2 != undefined && textura2 != null){
	            	for (let i = 0; i < parameters.data.length; i++) {
	    				if(parameters.data[i]["name"] == "textura2"){
	    					api.parameters.updateAsync({
	    			            id: parameters.data[i]["id"],
	    			            value: textura2
	    			          });
	    				}

	    			}
	            	
	            }
				if(textura != undefined && textura != null){
					for (let i = 0; i < parameters.data.length; i++) {
	    				if(parameters.data[i]["name"] == "textura"){
	    					api.parameters.updateAsync({
	    			            id: parameters.data[i]["id"],
	    			            value: textura
	    			          });
	    				}

	    			}            	
						            	
				}
				if(textura6 != undefined && textura6 != null){
					for (let i = 0; i < parameters.data.length; i++) {
	    				if(parameters.data[i]["name"] == "textura6"){
	    					api.parameters.updateAsync({
	    			            id: parameters.data[i]["id"],
	    			            value: textura6
	    			          });
	    				}

	    			}
					
				}
	            

	            
	          };
	        } else if (param.type == "Bool") {
	          paramInput = document.createElement("input");
	          paramInput.setAttribute("id", param.id);
	          paramInput.setAttribute("type", "checkbox");
	          paramInput.setAttribute("checked", param.value);
	          paramInput.onchange = function() {
	            console.log(this);
	            api.scene.camera.zoomAsync()
	          };
	        
	        } else if (param.type == "Color") {
	          paramInput = document.createElement("input");
	          paramInput.setAttribute("id", param.id);
	          paramInput.setAttribute("type", "color");
	          paramInput.setAttribute("value", param.value);
	          paramInput.onchange = function() {
	            api.parameters.updateAsync({
	              id: param.id,
	              value: this.value
	            });
	            api.scene.camera.zoomAsync()
	          };
	        } else if (param.type == "StringList") {
	          paramInput = document.createElement("select");
	          paramInput.setAttribute("id", param.id);
	          for (let j = 0; j < param.choices.length; j++) {
	            let option = document.createElement("option");
	            option.setAttribute("value", j);
	            option.setAttribute("name", param.choices[j]);
	            option.innerHTML = param.choices[j];
	            if (param.value == j) option.setAttribute("selected", "");
	            paramInput.appendChild(option);
	          }
	          paramInput.onchange = function() {
	            api.parameters.updateAsync({
	              id: param.id,
	              value: this.value
	            });
	            api.scene.camera.zoomAsync();
	            
	          };
	        }
	        if (param.hidden) paramDiv.setAttribute("hidden", "");
	        paramDiv.appendChild(label);
	        paramDiv.appendChild(paramInput);
	        paramDiv.appendChild(paramInput12);
	        globalDiv.appendChild(paramDiv);
	        $("#voydespues"+i).append(param.value / 10);
	      }

	      var exports = api.exports.get();
	      for (let i = 0; i < exports.data.length; i++) {
	        let exportAsset = exports.data[i];
	        let exportDiv = document.createElement("div");
	        let exportInput = document.createElement("input");
	        exportInput.setAttribute("id", exportAsset.id);
	        exportInput.setAttribute("type", "button");
	        exportInput.setAttribute("name", exportAsset.name);
	        exportInput.setAttribute("value", exportAsset.name);
	        exportInput.onclick = function() {
	          api.exports.requestAsync({
	            id: this.id
	          }).then(
	            function(response) {
	              let link = response.data.content[0].href;
	              window.location = link;
	            }
	          );
	        };
	        exportDiv.appendChild(exportInput);
	        globalDiv.appendChild(exportDiv);
	      }
	      
	      viewerInit = true;
	      
	    }
	  });
	
	
}

function enviarNumeroWeb(){
	
	var parame = api.parameters.get({'name':'WEB'},"CommPlugin_1").data[0];
	  api.parameters.updateAsync({
	      id: parame.id,
	      value: $("#numeroWebInput").val()
	    });
}
function enviarNumeroWeb1(){
	
	var parame = api.parameters.get({'name':'WEBCASCO'},"CommPlugin_1").data[0];
	  api.parameters.updateAsync({
	      id: parame.id,
	      value: $("#numeroWebInput1").val()
	    });
}
function enviarNumeroWeb2(){
	
	var parame = api.parameters.get({'name':'WEBFRENTE'},"CommPlugin_1").data[0];
	  api.parameters.updateAsync({
	      id: parame.id,
	      value: $("#numeroWebInput2").val()
	    });
}
function clicWebNumeroCambioFuncion(id,id1,id2){
	if(id != '' && id1 != '' && id2 != ''){
		var parame = api.parameters.get({'name':'WEB'},"CommPlugin_1").data[0];
		var parame1 = api.parameters.get({'name':'WEBCASCO'},"CommPlugin_1").data[0];
		var parame2 = api.parameters.get({'name':'WEBFRENTE'},"CommPlugin_1").data[0];
		  api.parameters.updateAsync([{
		      id: parame.id,
		      value: id
		 },{
			      id: parame1.id,
			      value: id1
		},{
				  id: parame2.id,
				  value: id2
		}]);
		
	}
	
	if(id != '' && id1 == '' && id2 == ''){
		var parame = api.parameters.get({'name':'WEB'},"CommPlugin_1").data[0];
		  api.parameters.updateAsync([{
		      id: parame.id,
		      value: id
		 }]);
		
	}

}


function apiShape1(id){
	
	$(".divBuscadorArticulos #acabados").css({"display":"none"});
	$(".divBuscadorArticulos #medidasEspeciales").css({"display":"none"});
	
	/* para añadir reglas CSS  de manera dinámica*/
	var s = document.createElement('style');
	document.head.appendChild(s);
	window.ya1vez = false;
	var inputDiv = document.querySelector('#inputDiv');
	var w = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));
	/* EL INPUT */
	var elInput = document.querySelector("input[type='range']");
	elInput.style.width = "100%";
	var inputMin = elInput.getAttribute('min');
	var inputMax = elInput.getAttribute('max');
	

	/* LA ETIQUETA */
	var etiqueta = document.querySelector('#etiqueta');
	var ew = parseInt(window.getComputedStyle(etiqueta, null).getPropertyValue("width"));
	w = 300;
	var k = 260/(inputMax - inputMin);
	/* el valor de la etiqueta (el tooltip) */
	etiqueta.innerHTML = elInput.value;
	/* calcula la posición inicial de la etiqueta (el tooltip) */
	etiqueta.style.left =  "0px";
	/* establece el estilo inicial del TRACK */
	
	
	//altura Div
	
	var inputDivAltura = document.querySelector('#inputDivAltura');
	var wAltura = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));
	/* EL INPUT */
	var elInputAltura = document.querySelector("#rs-range-line1");
	elInputAltura.style.width = "100%";
	var inputMinAltura = elInputAltura.getAttribute('min');
	var inputMaxAltura = elInputAltura.getAttribute('max');
	

	/* LA ETIQUETA */
	var etiquetaAltura = document.querySelector('#etiquetaAltura');
	var ewAltura = parseInt(window.getComputedStyle(etiquetaAltura, null).getPropertyValue("width"));
	wAltura = 300;
	var kAltura = 260/(inputMaxAltura - inputMinAltura);
	/* el valor de la etiqueta (el tooltip) */
	etiquetaAltura.innerHTML = elInputAltura.value;
	/* calcula la posición inicial de la etiqueta (el tooltip) */
	etiquetaAltura.style.left =  "0px";
	/* establece el estilo inicial del TRACK */
	
	
	elInputAltura.addEventListener('input',function(){
		/* cambia el valor de la etiqueta (el tooltip) */
		etiquetaAltura.innerHTML =(elInputAltura.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		var bulletPosition = 0;
	  	if(elInputAltura.value == 260){
	  		bulletPosition = 286;
	  	}
	  	if(elInputAltura.value == 259){
			bulletPosition = 279;
		}
	  	if(elInputAltura.value == 258){
			bulletPosition = 272;
		}
		if(elInputAltura.value == 257){
				bulletPosition = 265;
			}
		if(elInputAltura.value == 256){
				bulletPosition = 258;
			}
		if(elInputAltura.value == 255){
			bulletPosition = 251;
		}
		if(elInputAltura.value == 254){
				bulletPosition = 244;
			}
		if(elInputAltura.value == 253){
			bulletPosition = 237;
		}
		if(elInputAltura.value == 252){
				bulletPosition = 230;
			}
		if(elInputAltura.value == 251){
			bulletPosition =  223;
		}
		if(elInputAltura.value == 250){
				bulletPosition = 216;
			}
		if(elInputAltura.value == 249){
			bulletPosition = 208;
		}
		if(elInputAltura.value == 248){
			bulletPosition = 200;
		}
		if(elInputAltura.value == 247){
				bulletPosition = 192;
			}
		if(elInputAltura.value == 246){
				bulletPosition = 184;
			}
		if(elInputAltura.value == 245){
			bulletPosition = 176;
		}
		if(elInputAltura.value == 244){
				bulletPosition = 168;
			}
		if(elInputAltura.value == 243){
			bulletPosition = 160;
		}
		if(elInputAltura.value == 242){
				bulletPosition = 152;
			}
		if(elInputAltura.value == 241){
			bulletPosition =  144;
		}
		if(elInputAltura.value == 240){
				bulletPosition = 136;
			}
		if(elInputAltura.value == 239){
			bulletPosition = 128.5;
		}
	  	if(elInputAltura.value == 238){
			bulletPosition = 121;
		}
		if(elInputAltura.value == 237){
				bulletPosition = 113.5;
			}
		if(elInputAltura.value == 236){
				bulletPosition = 106;
			}
		if(elInputAltura.value == 235){
			bulletPosition = 98.5;
		}
		if(elInputAltura.value == 234){
				bulletPosition = 91;
			}
		if(elInputAltura.value == 233){
			bulletPosition = 83.5;
		}
		if(elInputAltura.value == 232){
				bulletPosition = 76;
			}
		if(elInputAltura.value == 231){
			bulletPosition =  68.5;
		}
		if(elInputAltura.value == 230){
				bulletPosition = 61;
			}
		if(elInputAltura.value == 229){
			bulletPosition = 54;
		}
		if(elInputAltura.value == 228){
			bulletPosition = 47;
		}
		if(elInputAltura.value == 227){
				bulletPosition = 40;
			}
		if(elInputAltura.value == 226){
				bulletPosition = 33;
			}
		if(elInputAltura.value == 225){
			bulletPosition = 26;
		}
		if(elInputAltura.value == 224){
				bulletPosition = 19;
			}
		if(elInputAltura.value == 223){
			bulletPosition = 12;
		}
		if(elInputAltura.value == 222){
				bulletPosition = 5;
			}
		if(elInputAltura.value == 221){
			bulletPosition =  -2;
		}
		if(elInputAltura.value == 220){
				bulletPosition = -10;
			}
	  
	  etiquetaAltura.style.left = (bulletPosition) + "px";
		
		/* cambia el estilo del TRACK */
	}, false);
	
	
	//fondo Div
	
	var inputDivFondo = document.querySelector('#inputDivFondo');
	var wFondo = parseInt(window.getComputedStyle(inputDivFondo, null).getPropertyValue("width"));
	/* EL INPUT */
	var elInputFondo = document.querySelector("#rs-range-line2");
	elInputFondo.style.width = "100%";
	var inputMinFondo = elInputFondo.getAttribute('min');
	var inputMaxFondo = elInputFondo.getAttribute('max');
	

	/* LA ETIQUETA */
	var etiquetaFondo = document.querySelector('#etiquetaFondo');
	var ewFondo = parseInt(window.getComputedStyle(etiquetaFondo, null).getPropertyValue("width"));
	wFondo = 300;
	var kFondo = 260/(inputMaxFondo - inputMinFondo);
	/* el valor de la etiqueta (el tooltip) */
	etiquetaFondo.innerHTML = elInputFondo.value;
	/* calcula la posición inicial de la etiqueta (el tooltip) */
	etiquetaFondo.style.left =  "150px";
	/* establece el estilo inicial del TRACK */
	
	
	elInputFondo.addEventListener('input',function(){
		/* cambia el valor de la etiqueta (el tooltip) */
		etiquetaFondo.innerHTML =(elInputFondo.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		 var bulletPosition = 0;
		  if(elInputFondo.value == 70){
				bulletPosition = 286;
			}
		  if(elInputFondo.value == 69){
				bulletPosition = 275;
			}
		  if(elInputFondo.value == 68){
				bulletPosition = 260;
			}
			if(elInputFondo.value == 67){
				bulletPosition = 245;
			}
			if(elInputFondo.value == 66){
				bulletPosition = 230;
			}
			if(elInputFondo.value == 65){
				bulletPosition = 215;
			}
			if(elInputFondo.value == 64){
				bulletPosition = 200;
			}
			if(elInputFondo.value == 63){
				bulletPosition = 185;
			}
			if(elInputFondo.value == 62){
				bulletPosition = 170;
			}
			if(elInputFondo.value == 61){
				bulletPosition = 155;
			}
		  if(elInputFondo.value == 60){
				bulletPosition = 140;
			}
		  if(elInputFondo.value == 59){
				bulletPosition = 125;
			}
		  if(elInputFondo.value == 58){
				bulletPosition = 110;
			}
		  if(elInputFondo.value == 57){
				bulletPosition = 95;
			}
		  if(elInputFondo.value == 56){
				bulletPosition = 80;
			}
		  if(elInputFondo.value == 55){
				bulletPosition = 65;
			}
		  if(elInputFondo.value == 54){
				bulletPosition = 50;
			}
		  if(elInputFondo.value == 53){
				bulletPosition = 35;
			}
		  if(elInputFondo.value == 52){
				bulletPosition = 20;
			}
		  if(elInputFondo.value == 51){
				bulletPosition = 5;
			}
		  if(elInputFondo.value == 50){
				bulletPosition = -10;
			}
		  etiquetaFondo.style.left = (bulletPosition) + "px";
		
		/* cambia el estilo del TRACK */
	}, false);


	elInput.addEventListener('input',function(){
		
	/* cambia el valor de la etiqueta (el tooltip) */
		etiqueta.innerHTML =elInput.value;
		/* cambia la posición de la etiqueta (el tooltip) */
		if(elInput.value >= 390){
			etiqueta.style.left =  ((parseFloat(elInput.value)) - (112))+"px";
		}else{
			if(elInput.value >= 380){
				etiqueta.style.left =  ((parseFloat(elInput.value)) - (117))+"px";
			}else{
				if(elInput.value >= 370){
					etiqueta.style.left =  ((parseFloat(elInput.value)) - (122))+"px";
				}else{
					if(elInput.value >= 360){
						etiqueta.style.left =  ((parseFloat(elInput.value)) - (127))+"px";
					}else{
						if(elInput.value >= 350){
							etiqueta.style.left =  ((parseFloat(elInput.value)) - (132))+"px";
						}else{
							if(elInput.value >= 340){
								etiqueta.style.left =  ((parseFloat(elInput.value)) - (137))+"px";
							}else{
								if(elInput.value >= 330){
									etiqueta.style.left =  ((parseFloat(elInput.value)) - (142))+"px";
								}else{
									if(elInput.value >= 320){
										etiqueta.style.left =  ((parseFloat(elInput.value)) - (147))+"px";
									}else{
										if(elInput.value >= 310){
											etiqueta.style.left =  ((parseFloat(elInput.value)) - (152))+"px";
										}else{
											if(elInput.value >= 300){
												etiqueta.style.left =  ((parseFloat(elInput.value)) - (157))+"px";
											}else{
												if(elInput.value >= 290){
													etiqueta.style.left =  ((parseFloat(elInput.value)) - (162))+"px";
												}else{
													if(elInput.value >= 280){
														etiqueta.style.left =  ((parseFloat(elInput.value)) - (167))+"px";
													}else{
														if(elInput.value >= 260){
															etiqueta.style.left =  ((parseFloat(elInput.value)) - (175))+"px";
														}else{
															if(elInput.value >= 250){
																etiqueta.style.left =  ((parseFloat(elInput.value)) - (182))+"px";
															}else{
															if(elInput.value >= 240){
																etiqueta.style.left =  ((parseFloat(elInput.value)) - (187))+"px";
															}else{
																if(elInput.value >= 220){
																	etiqueta.style.left =  ((parseFloat(elInput.value)) - (195))+"px";
																}else{
																	if(elInput.value >= 210){
																		etiqueta.style.left =  ((parseFloat(elInput.value)) - (200))+"px";
																	}
																	else{
																	if(elInput.value > 200){
																		etiqueta.style.left =  ((parseFloat(elInput.value)) - (205))+"px";
																	}else{
																		if(elInput.value >= 190 && elInput.value < 200){
																			etiqueta.style.left =  ((parseFloat(elInput.value)) + (80))+"px";
																		}else{
																			if(elInput.value >= 180 && elInput.value != 200){
																				etiqueta.style.left =  ((parseFloat(elInput.value)) + (70))+"px";
																			}else{
																				if(elInput.value >= 170 && elInput.value != 200){
																					etiqueta.style.left =  ((parseFloat(elInput.value)) + (60))+"px";
																				}else{
																					if(elInput.value >= 160 && elInput.value != 200){
																						etiqueta.style.left =  ((parseFloat(elInput.value)) + (60))+"px";
																					}else{
																						if(elInput.value >= 150 && elInput.value != 200){
																							etiqueta.style.left =  ((parseFloat(elInput.value)) + (55))+"px";
																						}else{
																							if(elInput.value >= 140 && elInput.value != 200){
																								etiqueta.style.left =  ((parseFloat(elInput.value)) + (48))+"px";
																							}else{
																								if(elInput.value >= 130 && elInput.value != 200){
																									etiqueta.style.left =  ((parseFloat(elInput.value)) + (40))+"px";
																								}else{
																									if(elInput.value >= 120 && elInput.value != 200){
																										etiqueta.style.left =  ((parseFloat(elInput.value)) + (32))+"px";
																									}else{
																										if(elInput.value >= 110 && elInput.value != 200){
																											etiqueta.style.left =  ((parseFloat(elInput.value)) + (24))+"px";
																										}else{
																											if(elInput.value >= 100 && elInput.value != 200){
																												etiqueta.style.left =  ((parseFloat(elInput.value)) + (16))+"px";
																											}else{
																												if(elInput.value >= 90 && elInput.value != 200){
																													etiqueta.style.left =  ((parseFloat(elInput.value)) + (8))+"px";
																												}else{
																													if(elInput.value >= 80 && elInput.value != 200){
																														etiqueta.style.left =  ((parseFloat(elInput.value)) - (2))+"px";
																													}else{
																														if(elInput.value >= 70 && elInput.value != 200){
																															etiqueta.style.left =  ((parseFloat(elInput.value)) - (12))+"px";
																														}else{
																															if(elInput.value >= 60 && elInput.value != 200){
																																etiqueta.style.left =  ((parseFloat(elInput.value)) - (22))+"px";
																															}else{
																																if(elInput.value >= 50 && elInput.value != 200){
																																	etiqueta.style.left =  ((parseFloat(elInput.value)) - (30))+"px";
																																}else{
																																	if(elInput.value >= 40 && elInput.value != 200){
																																		etiqueta.style.left =  ((parseFloat(elInput.value)) - (40))+"px";
																																	}else{
																																		if(elInput.value != 200){
																																			etiqueta.style.left =  ((parseFloat(elInput.value)) - (50))+"px";
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																	}
																}
															}
														}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	

	}, false);
	var rangeSlider = document.getElementById("rs-range-line");
	var rangeSlider1 = document.getElementById("rs-range-line1");
	var rangeSlider2 = document.getElementById("rs-range-line2");
	window.tieneTiradores = 0;
	var rangeBullet = document.getElementById("rs-bullet");
	window.todounarmario = {};
	window.armario = 1;
	rangeSlider.addEventListener("input", showSliderValue, false);
	rangeSlider1.addEventListener("input", showSliderValue1, false);
	rangeSlider2.addEventListener("input", showSliderValue2, false);
	
	window.funcClic = "";
	if(screen.width < 800){
		window.funcClic = "ontouchend";
		$("#sdv-container").css({"position":"fixed"});
	}else{
		window.funcClic = "onmouseup";
	}
	$("#rs-range-line").attr(window.funcClic,"cambiarVistaArmario(1)");
	$("#rs-range-line1").attr(window.funcClic,"cambiarVistaArmarioAltura()");
	$("#rs-range-line2").attr(window.funcClic,"cambiarVistaArmarioFondo()");
	$(".divBuscadorArticulos").css({"display":"block"});
	$("#page-heading").css({"display":"none"});
    $("#diviframeprueba").css({"display":"block"});
    $('.divseleccionarcodigoRutaNueva').css({ display: 'none' });
    var _container = document.getElementById('sdv-container');
	// viewer settings
	var _viewerSettings = {
	  // container to use
	  container: _container,
	  // when creating the viewer, we want to get back an API v2 object
	  api: {
	    version: 2
	  },
	  // ticket for a ShapeDiver model
	  ticket: id,
	  //'589fd5f0b47d32a4c0c9f51178e2547d3921c0e137f6f31417ac666ef0456ff50aeab735a16ffd696e90158f0f5d25deec11d207532baa49e0b71f9066037ef12216bba84850e072c837de602f921a62ab50a3de25206525a8fdaf74ca4337e8a71ba5f26622d5950551425af9297df908b8a57ce908-c4735fa91c66bf76053b2e0432c8158e',
	  modelViewUrl: 'eu-central-1',
	  showControlsInitial: true,
	  showSettingsInitial: false
	};
	
	// create the viewer, get back an API v2 object
	window.api = new SDVApp.ParametricViewer(_viewerSettings);
	window.ultimoDivPuesto = '.divSlider';
	var viewerInit = false;
	var parameters;
		//store door id
	/**
		  var doorsId;
		  var tiradorId;
		  var estantesId;

		  //store state of door;
		  var doorState = [];
		  //define hover effect for doors
		  var hoverEffect = {
		      active: {
		          name: "colorHighlight",
		          options: {
		              color: [255, 0, 0]
		          }
		      }
		  };
		  var effect = {
				    active: {
				        name: "colorHighlight",
				        options: {
				            color: [0, 185, 3]
				        }
				    }
				};
		  //define interaction group for doors. They need to be hoverable and selectable
		  var doorsInteractionGroup = {
		      id: "doorsInteractionGroup",
		      hoverable: true,
		      hoverEffect: hoverEffect,
		      selectable: true,
		      selectionMode: "single"
		  };
		  var shelvesInteractionGroup = {
				  id: "shelvesInteractionGroup",
				  selectable: true,
				  selectionEffect: effect,
				  selectionMode: "multiple"
				};
		  		

		  //define the base animation object
		  var baseAnimation = {
		      scenePaths: [],
		      transformations: [
		          {
		              delay: 0,
		              duration: 500,
		              type: "rotation",
		              repeat: 0,
		              //yoyo:true,
		              rotationAxis: {
		                  x: 0,
		                  y: 0,
		                  z: 1
		              },
		              rotationDegree: 90,
		              pivot: {}
		          }
		      ],
		      reset: false
		  };
		  
		  var animateDoor = function (doorNumber, direction) {
			    //get data from Grasshopper model regarding animations
			  		var animationData = api.scene.getData(
				        {
				            name: "animacionPuertas"
				        }
				    ).data[0].data;

			    //get paths that are relevant for animation
			    var animationPaths = animationData.paths[doorNumber];

			    //create animation objects
			    var finalAnimation = [];
			    var contTira = 0;
		    	   var arrayIdTira = [];
		    	   var tiracont = 0;
			    for (var i = 0; i <window.armario; i++) {
			        //duplicate base animation object
			    	var tiradoresObject = api.scene.get(
					        {
					          name: "Tiradores",
					          format: "glb"
					        },
					        "CommPlugin_1"
					      ).data[0];
			    		 var animation = JSON.parse(JSON.stringify(baseAnimation));

					        //define scene path
					        animation.scenePaths.push("CommPlugin_1." + doorsId + ".content_" + i);
					       if(tiradoresObject != undefined){
					    	  
					    	   var arrayTirador = window.arrayPuertaTirador;
					    	   var tiradorI = arrayTirador[i];
					    	   if(tiradorI != undefined){
					    		   for(let p = contTira;p<arrayTirador.length;p++){
						    		   
						    		   if(i != 0){
						    			   if(arrayTirador[p] == tiradorI && p<i){
						    				   contTira++;
						    				   if(p == (arrayTirador.length - 1)){
						    					   contTira--;
						    				   }
						    			   }
						    			   
						    		   }
						    	   }
						    	   if(i == 0){
					    			   arrayIdTira[arrayTirador[i]] = tiracont;
					    			   tiracont++;
					    		   }
					    		   if(arrayIdTira[arrayTirador[i]] == undefined ){
					    			   arrayIdTira[arrayTirador[i]] = tiracont;
					    			   tiracont++;
					    		   }
					    		   if(p != i && i != 0){
					    			   if(arrayTirador[p] == tiradorI){
					    				   contTira++;
					    				   
					    			   }
					    			   
					    		   }
					    	   
					    		   animation.scenePaths.push("CommPlugin_1." + tiradoresObject.id + ".content_"+arrayIdTira[arrayTirador[i]]+".transformation_0.node_"+(contTira));
					    	   }
					    	   
					        }
					        

					        //define pivot point and direction
					        animation.transformations[0].pivot = animationData.animation[i].pivot;
					        animation.transformations[0].rotationDegree *= animationData.animation[i].direction * doorState[i];
					      
					      //store new state of door
					      doorState[i] *= -1;
					      finalAnimation.push(animation);
			    	
			    }

			    //send animation to model
			    api.scene.setLiveTransformation(finalAnimation);
			};
		 **/
	api.scene.addEventListener(api.scene.EVENTTYPE.VISIBILITY_ON, function() {
	    if (!viewerInit) {
	    	api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
	    	var materialesArray = [];
	    	materialesArray[0] = {
	    		"id" : "tabak",
	    		"opacidad" : 1,
	    		"textura" : "https://dl.dropboxusercontent.com/s/f11t2yhfvwkfndy/TABAK.png?dl=1",
	    		"brillo" : 1
	    	};
	    	materialesArray[1] = {
		    		"id" : "kobe",
		    		"opacidad" : 1,
		    		"textura" : "https://dl.dropboxusercontent.com/s/55g8hd1mxbj7fdo/KOBE.png?dl=1",
		    		"brillo" : 1
		    	};
	    	materialesArray[2] = {
		    		"id" : "noce",
		    		"opacidad" : 1,
		    		"textura" : "https://dl.dropboxusercontent.com/s/xwvi93rzjpixjjt/NOCE.png?dl=1",
		    		"brillo" : "1"
		    	};
	    	materialesArray[3] = {
		    		"id" : "nature",
		    		"opacidad" : 1,
		    		"textura" : "https://dl.dropboxusercontent.com/s/qi8vt1fz66riltm/NATURE.png?dl=1",
		    		"brillo" : 1
		    	};
	    	materialesArray[4] = {
		    		"id" : "blanco",
		    		"opacidad" : 1,
		    		"textura" : "https://dl.dropboxusercontent.com/s/f3ybq7sb89mgqzi/BLANCO.png?dl=1",
		    		"brillo" : "1"
		    	};
		    materialesArray[5] = {
			    	"id" : "beige",
			    	"opacidad" : 1,
			    	"textura" : "https://dl.dropboxusercontent.com/s/sm7nv4v9i7tj9st/BEIGE.png?dl=1",
			    	"brillo" : "1"
			    };
		    materialesArray[6] = {
			    	"id" : "latte",
			    	"opacidad" : 1,
			    	"textura" : "https://dl.dropboxusercontent.com/s/qhpamt0ekwec948/LATTE.png?dl=1",
			    	"brillo" : "1"
			    };
		    materialesArray[7] = {
			    	"id" : "grafeno",
			    	"opacidad" : 1,
			    	"textura" : "https://dl.dropboxusercontent.com/s/gg2ue7mxcnmotb0/GRAFENO.png?dl=1",
			    	"brillo" : "1"
			    };
		    materialesArray[8] = {
			    	"id" : "lago",
			    	"opacidad" : 1,
			    	"textura" : "https://dl.dropboxusercontent.com/s/dbjdchwov6mwai9/LAGO.png?dl=1",
			    	"brillo" : "1"
			    };
		    materialesArray[9] = {
			    	"id" : "mare",
			    	"opacidad" : 1,
			    	"textura" : "https://dl.dropboxusercontent.com/s/tpv55i6b91e0w38/MARE.png?dl=1",
			    	"brillo" : "1"
			    };
		    materialesArray[10] = {
			    	"id" : "cristal1",
			    	"opacidad" : 0.1,
			    	"color":[255,255,255],
			    	"brillo" : "1"
			    };
		    materialesArray[11] = {
			    	"id" : "cristal2",
			    	"opacidad" : 0.2,
			    	"color":[0,0,0],
			    	"brillo" : "1"
			    };
		    materialesArray[12] = {
		    		"id" : "sinpuerta",
		    		"opacidad" : 0,
		    		"color":[255,255,255],
		    		"brillo" : 1
		    	};
	    	var materialesObject = {
	    			"materiales" : materialesArray
	    	}
	    	var parame = api.parameters.get({name :"materialesJSON"}).data[0];
	  	  	api.parameters.updateAsync({
	  	      id: parame.id,
	  	      value: JSON.stringify(materialesObject)
	  	    });
	    	 var doorsObject = api.scene.get(
				        {
				          name: "puertas"
				        },
				        "CommPlugin_1"
				      ).data[0];
	    	 
	    	 	/**var shelves = api.scene.get(
	    		        {
	    		          name: "EstantesGeo",
	    		          format: "glb"
	    		        },
	    		        "CommPlugin_1"
	    		      ).data[0];
	    		      
	    		      var shelvesSides = api.scene.get(
	    		        {
	    		          name: "EstantesCantosGeo",
	    		          format: "glb"
	    		        },
	    		        "CommPlugin_1"
	    		      ).data[0]; **/
				      
				     // doorsId = doorsObject.id;
				      //doorState = Array(doorsObject.content.length).fill(-1);

				        //add doors interaction group to scene
				      //api.scene.updateInteractionGroups([doorsInteractionGroup,shelvesInteractionGroup]);
				      //api.scene.updateInteractionGroups([doorsInteractionGroup]);
				        //apply interaction group to doors
				      /**api.scene.updatePersistentAsync([
				          {
				            id: doorsId,
				            interactionGroup: doorsInteractionGroup.id,
				            interactionMode: api.scene.INTERACTIONMODETYPE.SUB
				          },
				          {
				            id: shelves.id,
				            interactionGroup: shelvesInteractionGroup.id,
				            interactionMode: api.scene.INTERACTIONMODETYPE.SUB
				          },
				          {
				            id: shelvesSides.id,
				            interactionGroup: shelvesInteractionGroup.id,
				            interactionMode: api.scene.INTERACTIONMODETYPE.SUB
				          }
				        ], "CommPlugin_1");
				        **/
				    /**  api.scene.updatePersistentAsync([
				          {
				            id: doorsId,
				            interactionGroup: doorsInteractionGroup.id,
				            interactionMode: api.scene.INTERACTIONMODETYPE.SUB
				          }
				        ], "CommPlugin_1");

				      //add event listener when clicking objects
				      api.scene.addEventListener(
				        api.scene.EVENTTYPE.SELECT_ON,
				        function(res){
				          var scenePathData = res.scenePath.split(".");

				          //check if scene path is door
				          if (scenePathData[1] == doorsId) {
				            //unselect door to be able to trigger animation again
				            api.scene.updateSelected([],[res.scenePath]);

				            //animate door
				            animateDoor(scenePathData[2].split("_")[1]);
				          }
				        }
				      );
				      
				      //add event listener when hovering objects
				      api.scene.addEventListener(
				        api.scene.EVENTTYPE.HOVER_ON,
				        function(res){
				          var scenePathData = res.scenePath.split(".");
				          
				          //check if scene path is door
				          if (scenePathData[1] == doorsId) {
				            //get data from Grasshopper model regarding animations
				            var animationData = api.scene.getData(
				                {
				                    name: "animacionPuertas"
				                }
				            ).data[0].data;

				            //get paths that are relevant for animation
				            var doorNumber = scenePathData[2].split("_")[1];
				            var animationPaths = animationData.paths[doorNumber];
				            
				            //get additional scene paths to ve hovered with doors
				            var addDoorPaths = [];
				            for(var i = 0; i < animationPaths.length; i++){
				              if(animationPaths[i] == doorNumber)continue;
				              addDoorPaths.push("CommPlugin_1." + doorsId + ".content_" + animationPaths[i]);
				            }

				            //hover other doors that are relevant for animation
				            res.additionalInteractionPathsCallBack(addDoorPaths);
				          }
				        }
				      );
				      
				      //add event listener when model finishes to update parameters
				      api.state.addEventListener(
				        api.state.EVENTTYPE.IDLE,
				        function(){
				          //reset door states
				          doorState = Array(
				            api.scene.get(
				              {
				                id: doorsId
				              },
				              "CommPlugin_1"
				            ).data[0].content.length
				          ).fill(-1);
				        }
				      );**/
	    	window.s = new THREE.Matrix4();
	      var updatedSettings = {
	    		  scene : {
	    			  camera : {
	    				  rotationSpeed : 0.1,
	    				  autoAdjust: true,
	    				  restrictions :{
	    					  rotation : {
	    						  minAzimuthAngle: -75,
	    						  minPolarAngle: 45,
	    						  maxPolarAngle: 90,
	    						  maxAzimuthAngle: 75
	    						  }
	      					}
	      				}
	      			}
	      }
	      
	     
	      api.updateSettingsAsync(updatedSettings);
	      var globalDiv = document.getElementById("parameters");
	      parameters = api.parameters.get();
	      parameters.data.sort(function(a, b) {
	        return a.order - b.order;
	      });

	      $("#sdv-container-canvas").attr("onmouseup","saberdondeestapuesto()");
	      	window.object0 = api.scene.get({name: "TapaGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object1 = api.scene.get({name: "CostadosGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object2 = api.scene.get({name: "SueloGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object3 = api.scene.get({name: "Tabica geo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object4 = api.scene.get({name: "MolduraGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object5 = api.scene.get({name: "TraseraGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object6 = api.scene.get({name: "FrenteGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.object7 = api.scene.get({name: "CostadoIntGeo", format: "glb"},"CommPlugin_1").data[0];
	      	window.estantes0 = [];
	      	window.estantes1 = [];
	      	window.estantes2 = [];
	      	window.estantes3 = [];
	    	      
	      for (let i = 0; i < parameters.data.length; i++) {
	        let paramInput = null;
	        let paramDiv = document.createElement("div");
	        let param = parameters.data[i];
	        let label = document.createElement("label");
	        label.setAttribute("for", param.id);
	        		
	        if(i == 8){
	        	param["hidden"] = false;
	        }
	        if(i == 0){
	        	param["name"] = "ANCHO";
	        }
	        if(i == 1){
	        	param["name"] = "FONDO";
	        }
	        if(i == 2){
	        	param["name"] = "ALTO";
	        }
	        if(i == 3){
	        	param["hidden"] = true;
	        }
	        label.innerHTML = param.name;
	        if (param.type == "Int" || param.type == "Float" || param.type == "Even" || param.type == "Odd") {
	          paramInput = document.createElement("input");
	          paramInput12 = document.createElement("output");
	          paramInput.setAttribute("id", param.id);
	          paramInput.setAttribute("type", "range");
	          paramInput.setAttribute("min", param.min/10);
	          //paramInput.setAttribute("oninput", "this.nextElementSibling.value = this.value");
	          if(i == 0){
	        	  window.currScaleX = param.value / 10;
	        	  paramInput.setAttribute("oninput", "funcionAumentarTamanoAncho(this.value);");
	          }
	          if(i == 1){
	        	  window.currScaleY = param.value / 10;
	        	  paramInput.setAttribute("oninput", "funcionAumentarTamanoFondo(this.value);");
	          }
	          if(i == 2){
	        	  window.currScaleZ = param.value / 10;
	        	  paramInput.setAttribute("oninput", "funcionAumentarTamanoAlto(this.value);");
	          }
	          paramInput.setAttribute("max", (param.max/10));
	          paramInput.setAttribute("class", "rangeInputgg");
	          paramInput.setAttribute("value", (param.value/10));
	          window.valorDef = param.value/10;
	          paramInput12.setAttribute("id", "voydespues"+i);
	          if (param.type == "Int") paramInput.setAttribute("step", 1);
	          else if (param.type == "Even" || param.type == "Odd") paramInput.setAttribute("step", 2);
	          else paramInput.setAttribute("step", 1 / Math.pow(10, param.decimalplaces));
	          paramInput.onchange = function() {
	            
	            if(param["name"] == "ANCHO"){
	            	$("#ancho1").text(this.value);
	            }
	            if(param["name"] == "ALTO"){
	            	$("#altoDatosDimen").text(this.value);
	            }
	            if(param["name"] == "FONDO"){
	            	$("#fondoDatosDimen").text(this.value);
	            }
	            
	            var currScaleX = $("#voydespues0").text();
	            var currScaleY = $("#voydespues1").text();
	            var currScaleZ = $("#voydespues2").text();
	            api.parameters.updateAsync({
		              id: param.id,
		              value: this.value * 10
		            });
	            if(textura2 != undefined && textura2 != null){
	            	for (let i = 0; i < parameters.data.length; i++) {
	    				if(parameters.data[i]["name"] == "textura2"){
	    					api.parameters.updateAsync({
	    			            id: parameters.data[i]["id"],
	    			            value: textura2
	    			          });
	    				}

	    			}
	            	
	            }
				if(textura != undefined && textura != null){
					for (let i = 0; i < parameters.data.length; i++) {
	    				if(parameters.data[i]["name"] == "textura"){
	    					api.parameters.updateAsync({
	    			            id: parameters.data[i]["id"],
	    			            value: textura
	    			          });
	    				}

	    			}            	
						            	
				}
				if(textura6 != undefined && textura6 != null){
					for (let i = 0; i < parameters.data.length; i++) {
	    				if(parameters.data[i]["name"] == "textura6"){
	    					api.parameters.updateAsync({
	    			            id: parameters.data[i]["id"],
	    			            value: textura6
	    			          });
	    				}

	    			}
					
				}
	            
	            setTimeout(function() {
	            	window.camaraposition = api.scene.camera.get();
	            }, 1500);
	            
	          };
	        } else if (param.type == "Bool") {
	          paramInput = document.createElement("input");
	          paramInput.setAttribute("id", param.id);
	          paramInput.setAttribute("type", "checkbox");
	          paramInput.setAttribute("checked", param.value);
	          paramInput.onchange = function() {
	            console.log(this);
	            api.scene.camera.zoomAsync()
	          };
	        
	        } else if (param.type == "Color") {
	          paramInput = document.createElement("input");
	          paramInput.setAttribute("id", param.id);
	          paramInput.setAttribute("type", "color");
	          paramInput.setAttribute("value", param.value);
	          paramInput.onchange = function() {
	            api.parameters.updateAsync({
	              id: param.id,
	              value: this.value
	            });
	            api.scene.camera.updateAsync({position:{x:1752.1604577050061,y:-1064.35000980438,z:311.8331380020649}, target:{x:699.6633891813408,y:254.5559136794404,z:59.28410887811541} });
	            api.scene.camera.zoomAsync()
	          };
	        } else if (param.type == "StringList") {
	          paramInput = document.createElement("select");
	          paramInput.setAttribute("id", param.id);
	          for (let j = 0; j < param.choices.length; j++) {
	            let option = document.createElement("option");
	            option.setAttribute("value", j);
	            option.setAttribute("name", param.choices[j]);
	            option.innerHTML = param.choices[j];
	            if (param.value == j) option.setAttribute("selected", "");
	            paramInput.appendChild(option);
	          }
	          paramInput.onchange = function() {
	            api.parameters.updateAsync({
	              id: param.id,
	              value: this.value
	            });
	            api.scene.camera.zoomAsync();
	            api.scene.camera.updateAsync({position:{x:1752.1604577050061,y:-1064.35000980438,z:311.8331380020649}, target:{x:699.6633891813408,y:254.5559136794404,z:59.28410887811541} });
	            
	          };
	        }
	        if (param.hidden) paramDiv.setAttribute("hidden", "");
	        paramDiv.appendChild(label);
	        paramDiv.appendChild(paramInput);
	        paramDiv.appendChild(paramInput12);
	        globalDiv.appendChild(paramDiv);
	        $("#voydespues"+i).append(param.value / 10);
	      }

	      var exports = api.exports.get();
	      for (let i = 0; i < exports.data.length; i++) {
	        let exportAsset = exports.data[i];
	        let exportDiv = document.createElement("div");
	        let exportInput = document.createElement("input");
	        exportInput.setAttribute("id", exportAsset.id);
	        exportInput.setAttribute("type", "button");
	        exportInput.setAttribute("name", exportAsset.name);
	        exportInput.setAttribute("value", exportAsset.name);
	        exportInput.onclick = function() {
	          api.exports.requestAsync({
	            id: this.id
	          }).then(
	            function(response) {
	              let link = response.data.content[0].href;
	              window.location = link;
	            }
	          );
	        };
	        exportDiv.appendChild(exportInput);
	        globalDiv.appendChild(exportDiv);
	      }
	      
	      viewerInit = true;
	      
	    }
	  });
	
	
}
	

var funcionAumentarTamanoAncho = function(val) {
	$("#voydespues0").val(val);
	  s.elements[0] = (val*10) / (currScaleX*10);
	  s.elements[5] = 1;
	  s.elements[10] = 1;
	  
	  let updateObject = {
	    id: object0.id,
	    duration: 0,
	    content: object0.content
	  };
	  for (let i=0; i< updateObject.content.length; i++) {
	    updateObject.content[i].transformations = [s];
	  }
	  let updateObject1 = {
			    id: object1.id,
			    duration: 0,
			    content: object1.content
	  };
	  for (let i=0; i< updateObject1.content.length; i++) {
			    updateObject1.content[i].transformations = [s];
	  }
	  let updateObject2 = {
					    id: object2.id,
					    duration: 0,
					    content: object2.content
	  };
	  for (let i=0; i< updateObject2.content.length; i++) {
		  updateObject2.content[i].transformations = [s];
	  }
	  let updateObject3 = {
			    id: object3.id,
			    duration: 0,
			    content: object3.content
	};
	for (let i=0; i< updateObject3.content.length; i++) {
		updateObject3.content[i].transformations = [s];
	}
	let updateObject4 = {
		    id: object4.id,
		    duration: 0,
		    content: object4.content
	};
	for (let i=0; i< updateObject4.content.length; i++) {
		updateObject4.content[i].transformations = [s];
	}
	let updateObject5 = {
		    id: object5.id,
		    duration: 0,
		    content: object5.content
	};
	for (let i=0; i< updateObject5.content.length; i++) {
		updateObject5.content[i].transformations = [s];
	}
	let updateObject6 = {
		    id: object6.id,
		    duration: 0,
		    content: object6.content
	};
	for (let i=0; i< updateObject6.content.length; i++) {
		updateObject6.content[i].transformations = [s];
	}
	let updateObject7 = {
		    id: object7.id,
		    duration: 0,
		    content: object7.content
	};
	for (let i=0; i< updateObject7.content.length; i++) {
		updateObject7.content[i].transformations = [s];
	}

	  api.scene.updateAsync([updateObject,updateObject1,updateObject2,updateObject3,updateObject4,updateObject5,updateObject6,updateObject7], 'CommPlugin_1');
}
var funcionAumentarTamanoFondo = function(val) {
	$("#voydespues1").val(val);
	  s.elements[0] = 1
	  s.elements[5] = (val*10) / (currScaleY*10);
	  s.elements[10] = 1;
	  
	  let updateObject = {
	    id: object0.id,
	    duration: 0,
	    content: object0.content
	  };
	  for (let i=0; i< updateObject.content.length; i++) {
	    updateObject.content[i].transformations = [s];
	  }
	  let updateObject1 = {
			    id: object1.id,
			    duration: 0,
			    content: object1.content
	  };
	  for (let i=0; i< updateObject1.content.length; i++) {
			    updateObject1.content[i].transformations = [s];
	  }
	  let updateObject2 = {
					    id: object2.id,
					    duration: 0,
					    content: object2.content
	  };
	  for (let i=0; i< updateObject2.content.length; i++) {
		  updateObject2.content[i].transformations = [s];
	  }
	  let updateObject3 = {
			    id: object3.id,
			    duration: 0,
			    content: object3.content
	};
	for (let i=0; i< updateObject3.content.length; i++) {
		updateObject3.content[i].transformations = [s];
	}
	let updateObject4 = {
		    id: object4.id,
		    duration: 0,
		    content: object4.content
	};
	for (let i=0; i< updateObject4.content.length; i++) {
		updateObject4.content[i].transformations = [s];
	}
	let updateObject5 = {
		    id: object5.id,
		    duration: 0,
		    content: object5.content
	};
	for (let i=0; i< updateObject5.content.length; i++) {
		updateObject5.content[i].transformations = [s];
	}
	let updateObject6 = {
		    id: object6.id,
		    duration: 0,
		    content: object6.content
	};
	for (let i=0; i< updateObject6.content.length; i++) {
		updateObject6.content[i].transformations = [s];
	}
	let updateObject7 = {
		    id: object7.id,
		    duration: 0,
		    content: object7.content
	};
	for (let i=0; i< updateObject7.content.length; i++) {
		updateObject7.content[i].transformations = [s];
	}

	  api.scene.updateAsync([updateObject,updateObject1,updateObject2,updateObject3,updateObject4,updateObject5,updateObject6,updateObject7], 'CommPlugin_1');

}
var funcionAumentarTamanoAlto= function(val) {
	$("#voydespues2").val(val);
		s.elements[0] = 1
	  s.elements[5] = 1;
	  s.elements[10] = (val*10) / (currScaleZ*10);
	  
	  let updateObject = {
	    id: object0.id,
	    duration: 0,
	    content: object0.content
	  };
	  for (let i=0; i< updateObject.content.length; i++) {
	    updateObject.content[i].transformations = [s];
	  }
	  let updateObject1 = {
			    id: object1.id,
			    duration: 0,
			    content: object1.content
	  };
	  for (let i=0; i< updateObject1.content.length; i++) {
			    updateObject1.content[i].transformations = [s];
	  }
	  let updateObject2 = {
					    id: object2.id,
					    duration: 0,
					    content: object2.content
	  };
	  for (let i=0; i< updateObject2.content.length; i++) {
		  updateObject2.content[i].transformations = [s];
	  }
	  let updateObject3 = {
			    id: object3.id,
			    duration: 0,
			    content: object3.content
	};
	for (let i=0; i< updateObject3.content.length; i++) {
		updateObject3.content[i].transformations = [s];
	}
	let updateObject4 = {
		    id: object4.id,
		    duration: 0,
		    content: object4.content
	};
	for (let i=0; i< updateObject4.content.length; i++) {
		updateObject4.content[i].transformations = [s];
	}
	let updateObject5 = {
		    id: object5.id,
		    duration: 0,
		    content: object5.content
	};
	for (let i=0; i< updateObject5.content.length; i++) {
		updateObject5.content[i].transformations = [s];
	}
	let updateObject6 = {
		    id: object6.id,
		    duration: 0,
		    content: object6.content
	};
	for (let i=0; i< updateObject6.content.length; i++) {
		updateObject6.content[i].transformations = [s];
	}
	let updateObject7 = {
		    id: object7.id,
		    duration: 0,
		    content: object7.content
	};
	for (let i=0; i< updateObject7.content.length; i++) {
		updateObject7.content[i].transformations = [s];
	}

	  api.scene.updateAsync([updateObject,updateObject1,updateObject2,updateObject3,updateObject4,updateObject5,updateObject6,updateObject7], 'CommPlugin_1');
}

function outputUpdate(vol) {
	  var output = document.querySelector("#volume");
		output.value = vol;
	  output.style.left = (vol - 40) + 'px';
}
function cambiarVistaArmarioAltura(){
	var rangeSlider = document.getElementById("rs-range-line1");
	var valorAncho =  (rangeSlider.value*10);
	todounarmario["altura"] = valorAncho;
	var parame = api.parameters.get({'name':'altura'},"CommPlugin_1").data[0];
	  api.parameters.updateAsync({
	      id: parame.id,
	      value: valorAncho
	    });
	  $("#cambioDeAlturaSitieneInteriores")[0].click();
	  
}
function cambiarVistaArmarioFondo(){
	var rangeSlider = document.getElementById("rs-range-line2");
	var valorAncho =  (rangeSlider.value*10);
	todounarmario["fondo"] = valorAncho;
	var parame = api.parameters.get({'name':'fondo'},"CommPlugin_1").data[0];
	  api.parameters.updateAsync({
	      id: parame.id,
	      value: valorAncho
	    });
}

function niveladoresopcionesarm(id){
	$("#niveladoresOpcion1 #inputOpcion").val("");
	$("#niveladoresOpcion2 #inputOpcion").val("");
	$("#niveladoresOpcion"+id+" #inputOpcion").val("X");
	if(id == 1){
		$("#enlaceclickniveladoresSi")[0].click();
	}
	if(id == 2){
		$("#enlaceclickniveladoresNo")[0].click();
	}
}

//interiores JSON
function interioresNuevoJson(obj){
	window.obj = obj;  
	var parame = api.parameters.get({'name':'InterioresJSON'},"CommPlugin_1").data[0];
	  api.parameters.updateAsync({
	      id: parame.id,
	      value: JSON.stringify(obj)
	    }).then(
	    		  function(response) {
	    			  var arrayDeEstantesMet = [];
	    			  var arrayDeEstantesMetCristal = [];
	    			  var contEst = 0;
	    			  var contEstCristal = 0;
	    			  var contTubo = 0;
	    			  var contEst1 = 0;
	    			  var contEst1Cristal = 0;
	    			  var contCaj = 0;
	    			  
	    			  var objInt = obj["interiores"];
	    			  var hueco0 = [];
	    			  var contHueco = 0;
	    			  var alturaPrueba = parseFloat($('#rs-range-line1').val());
	    		      var alturaValor = alturaPrueba * 10;
	    			  for(let m = 0;m<objInt.length;m++){
	    				  if(objInt[m]["interior"] == 0){
	    					  hueco0[contHueco] = objInt[m];
	    					  contHueco++;
	    				  }
	    			  }
	    			  var numeroDominioPuesto = [];
	    			  hueco0.sort(function (a, b) {
	    				    return (a.posicion - b.posicion)
	    				})
	    				console.log(hueco0);
	    			  var dominios = [];
	    			  var contDom = 0;
	    			  var alturaFin = 0;
	    			 /** for(let x = 0;x<hueco0.length;x++){
	    				  dominios[contDom] = [];
	    				  dominios[contDom]["inicio"] = alturaFin;
	    				  if(x != (hueco0.length - 1)){
	    					  dominios[contDom]["final"] = hueco0[x + 1]["posicion"] - hueco0[x + 1]["tamano"];	    					  
	    				  }else{
	    					  dominios[contDom]["final"] = hueco0[x]["posicion"];	    					  
	    				  }
	    				  dominios[contDom]["array"] = hueco0[x]["array"];
	    				  dominios[contDom]["interior"] = hueco0[x]["interior"];
	    				  alturaFin = hueco0[x]["altura"];
	    				  numeroDominioPuesto[contDom] = hueco0[x]["array"];
	    				  contDom++;
	    			  }
	    			  dominios[dominios.length - 1]["final"] = alturaValor - 90;
	    			  console.log(dominios);
	    			  for(let w = 0;w<dominios.length;w++){
	    				  $("#rs-range-lineAdicional"+(dominios[w]["array"] + 1)+""+dominios[w]["interior"]).attr("min",Math.round(dominios[w]["inicio"] / 10));
						  $("#rs-range-lineAdicional"+(dominios[w]["array"] + 1)+""+dominios[w]["interior"]).attr("max",Math.round(dominios[w]["final"] / 10));
	    			  }
	    			  **/
	    			  window.dominios0 = dominios;
	    			  window.numeroDominioPuesto0 = numeroDominioPuesto;
	    			// var intervalo = setInterval(function(){

	    				/** api.state.addEventListener(api.state.EVENTTYPE.IDLE, function() {
	    				  // now it's safe to read the model parameters
	    				  var dominios = api.scene.getData({
	    					     name: "puntosDimensiones"
	    					}).data[0].data;
	    					let material1 = {
	    						    version: "2.0",
	    						    color: "black" 
	    						  };
	    					const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
	    					var array = [];
	    					var contarray = 0;
	    					var dominiosTamano = api.scene.getData({
	    					     name: "dominios" 
	    					}).data[0].data;
	    										bottom: 1660
	    										id: "TUBO_0"
	    										top: 50
	    					
	    					var tomaDominio = "";
	    					for(let u = 0;u<dominios.length;u++){
	    						for(let b = 0;b<dominiosTamano;b++){
	    							if(dominios[u]['start']['id'] == dominiosTamano[b]["id"]){
	    								tomaDominio =  dominiosTamano[b];
	    							}
	    							if(dominios[u]['end']['id'] == dominiosTamano[b]["id"]){
	    								tomaDominio =  dominiosTamano[b];
	    							}
	    						}
	    						var  points = [];
	    						points.push( new THREE.Vector3( dominios[u]['start']["x"], dominios[u]['start']["y"], dominios[u]['start']["z"] ) );
	    						points.push( new THREE.Vector3( dominios[u]['end']["x"], dominios[u]['end']["y"], dominios[u]['end']["z"] ) );
	    						array[contarray] = points;
	    						array[""]
	    						contarray++;
	    						 
	    					}
	    					var arrayLine = [];
	    					var arrayTag2d = [];
	    					var datosOBJ = [];
	    					var contLine = 0;
	    					var contArrayTodo = 0;
	    					for(let j = 0;j<array.length;j++){
	    						var geometry = new THREE.BufferGeometry().setFromPoints( array[j] );
	    						
	    						var line = new THREE.LineLoop( geometry, material );
	    						
	    						var editCSS = document.createElement('style')
	    						editCSS.innerHTML = ".shapediver-domElement { display: block!important; }";
	    						document.body.appendChild(editCSS);
	    						
	    						  let asset = {
	    						    id: "polyline"+contLine,
	    						    content: [
	    						      {
	    						        format: api.scene.FORMAT.THREE,
	    						        data: {
	    						          threeObject: line
	    						        }
	    						      },
	    						      {
	    						        format: "material",
	    						        data: material1
	    						      }
	    						    ]
	    						  };
	    						  
	    						  var dataOBJ = {};
	    						  var objLoc = {};
	    						  objLoc["x"] = array[j][1]["x"];
	    						  objLoc["y"] = array[j][1]["y"];
	    						  objLoc["z"] = (array[j][0]["z"]); 
	    						   
	    						  
	    						  dataOBJ["version"] = 1.0;
	    						  dataOBJ["color"] = "#000000";
	    						  dataOBJ["text"] = array[j][0]["z"] / 10;
	    						  dataOBJ["location"] = objLoc;
	    						  datosOBJ[contArrayTodo] = dataOBJ;
	    						  
	    						  arrayLine[contArrayTodo] = asset;
	    						  contArrayTodo++;
	    						  
	    						  contLine++;
	    						
	    					
	    					}
	    					let asset1 = {
  	    						    id: "tag2D",
  	    						  
  	    						  content:[ 
	    						      {
	    						    	 format: api.scene.FORMAT.TAG2D,
  	    						         data:datosOBJ
	    						      }
	    						  ]
  	    						  };
	    					arrayLine[contArrayTodo] = asset1;
  						  	contArrayTodo++;
	    					window.arrayline = arrayLine;
	    					api.scene.updateAsync(arrayLine);
	    				//	clearInterval(intervalo);
	    				 }); 
	    					 
	    			  //}, 1000);
	    			  **/
	    			  var length = obj["interiores"].length;
	    			  for(let h = 0;h<length;h++){
	    				  if(obj["interiores"][h]["tipo"] == "estante"){
	    					  if(h>0){
	    						  if(obj["interiores"][h]["interior"] != obj["interiores"][h-1]["interior"]){
	    							  contEst1 = 0;
	    						  }
	    					  }
	    					  arrayDeEstantesMet[contEst]=[];
	    					  arrayDeEstantesMet[contEst]["puesto"] = h;
	    					  arrayDeEstantesMet[contEst]["interior"] = obj["interiores"][h]["interior"];
	    					  arrayDeEstantesMet[contEst]["num"] = contEst1;
	    					  
	    					  if(contEst == 0){ 
	    						  var effect = {
	    								    active: {
	    								        name: "colorHighlight",
	    								        options: {
	    								            color: [0, 185, 3]
	    								        }
	    								    }
	    								};
	    						  		var shelvesInteractionGroup = {
	    								  id: "shelvesInteractionGroup",
	    								  selectable: true,
	    								  selectionEffect: effect,
	    								  selectionMode: "multiple"
	    								};

	    						  			var shelves = api.scene.get(
	    					    		        {
	    					    		          name: "EstantesGeo",
	    					    		          format: "glb"
	    					    		        },
	    					    		        "CommPlugin_1"
	    					    		      ).data[0];
	    					    		      
	    					    		      var shelvesSides = api.scene.get(
	    					    		        {
	    					    		          name: "EstantesCantosGeo",
	    					    		          format: "glb"
	    					    		        },
	    					    		        "CommPlugin_1"
	    					    		      ).data[0];

	    					    		      	api.scene.updateInteractionGroups([shelvesInteractionGroup]);

	    										api.scene.updatePersistentAsync([
	    								          {
	    								            id: shelves.id,
	    								            interactionGroup: shelvesInteractionGroup.id,
	    								            interactionMode: api.scene.INTERACTIONMODETYPE.SUB
	    								          },
	    								          {
	    								            id: shelvesSides.id,
	    								            interactionGroup: shelvesInteractionGroup.id,
	    								            interactionMode: api.scene.INTERACTIONMODETYPE.SUB
	    								          }
	    								        ], "CommPlugin_1");
	    						  
	    					  }
	    					  contEst++;
	    					  contEst1++;
	    				  }
	    				  if(obj["interiores"][h]["tipo"] == "tubo"){
	    					  if(contTubo == 0){
	    							  var effect = {
	    									    active: {
	    									        name: "colorHighlight",
	    									        options: {
	    									            color: [0, 185, 3]
	    									        }
	    									    }
	    									};
	    							  		var tubosInteractionGroup = {
	    									  id: "tubosInteractionGroup",
	    									  selectable: true,
	    									  selectionEffect: effect,
	    									  selectionMode: "multiple"
	    									};

	    							  			var tubos = api.scene.get(
	    						    		        {
	    						    		          name: "tubos",
	    						    		          format: "glb"
	    						    		        },
	    						    		        "CommPlugin_1"
	    						    		      ).data[0];
	    						    		      
	    						    		      

	    						    		      	api.scene.updateInteractionGroups([tubosInteractionGroup]);

	    											api.scene.updatePersistentAsync([
	    									          {
	    									            id: tubos.id,
	    									            interactionGroup: tubosInteractionGroup.id,
	    									            interactionMode: api.scene.INTERACTIONMODETYPE.SUB
	    									          }
	    									        ], "CommPlugin_1");
	    						  
	    					  }
	    					  contTubo++;
	    				  }
	    				  if(obj["interiores"][h]["tipo"] == "cajones"){
	    					  if(contCaj == 0){
	    							  var effect = {
	    									    active: {
	    									        name: "colorHighlight",
	    									        options: {
	    									            color: [0, 185, 3]
	    									        }
	    									    }
	    									};
	    							  		var cajonesInteractionGroup = {
	    									  id: "cajonesInteractionGroup",
	    									  selectable: true,
	    									  selectionEffect: effect,
	    									  selectionMode: "multiple"
	    									};
	    							  			var cajones = api.scene.get(
	    						    		        {
	    						    		          name: "Cajones",
	    						    		          format: "glb"
	    						    		        },
	    						    		        "CommPlugin_1"
	    						    		      ).data[0];
	    							  			var cantosCajones = api.scene.get(
	    						    		        {
	    						    		          name: "CantosCajones",
	    						    		          format: "glb"
	    						    		        },
	    						    		        "CommPlugin_1"
	    						    		      ).data[0];
	    						    		      
	    						    		      

	    						    		      	api.scene.updateInteractionGroups([cajonesInteractionGroup]);

	    											api.scene.updatePersistentAsync([
	    												 {
	    											            id: cajones.id,
	    											            interactionGroup: cajonesInteractionGroup.id,
	    											            interactionMode: api.scene.INTERACTIONMODETYPE.SUB
	    											          },
	    											          {
	    											            id: cantosCajones.id,
	    											            interactionGroup: cajonesInteractionGroup.id,
	    											            interactionMode: api.scene.INTERACTIONMODETYPE.SUB
	    											          }
	    									        ], "CommPlugin_1");
	    						  
	    					  }
	    					  contCaj++;
	    				  }
	    				  
	    				  if(obj["interiores"][h]["tipo"] == "estantecristal"){
	    					  if(h>0){
	    						  if(obj["interiores"][h]["interior"] != obj["interiores"][h-1]["interior"]){
	    							  contEst1Cristal = 0;
	    						  }
	    					  }
	    					  arrayDeEstantesMetCristal[contEstCristal]=[];
	    					  arrayDeEstantesMetCristal[contEstCristal]["puesto"] = h;
	    					  arrayDeEstantesMetCristal[contEstCristal]["interior"] = obj["interiores"][h]["interior"];
	    					  arrayDeEstantesMetCristal[contEstCristal]["num"] = contEst1Cristal;
	    					  if(contEstCristal == 0){
	    							  var effect = {
	    									    active: {
	    									        name: "colorHighlight",
	    									        options: {
	    									            color: [0, 185, 3]
	    									        }
	    									    }
	    									};
	    							  		var estantesCristalInteractionGroup = {
	    									  id: "estanteCristalInteractionGroup",
	    									  selectable: true,
	    									  selectionEffect: effect,
	    									  selectionMode: "multiple"
	    									};
	    							  			var estantesCristal = api.scene.get(
	    						    		        {
	    						    		          name: "EstantesCristal",
	    						    		          format: "glb"
	    						    		        },
	    						    		        "CommPlugin_1"
	    						    		      ).data[0];
	    						    		      

	    						    		      	api.scene.updateInteractionGroups([estantesCristalInteractionGroup]);

	    											api.scene.updatePersistentAsync([
	    												 {
	    											            id: estantesCristal.id,
	    											            interactionGroup: estantesCristalInteractionGroup.id,
	    											            interactionMode: api.scene.INTERACTIONMODETYPE.SUB
	    											          }
	    									        ], "CommPlugin_1");
	    						  
	    					  }
	    					  contEstCristal++;
	    				  }
	    			  }
	    			  window.arrayDeEstantesMetCristal = arrayDeEstantesMetCristal;
	    			  window.arrayDeEstantesMet = arrayDeEstantesMet;
		    		  window.arrayDeEstantesMet1 = arrayDeEstantesMet;
	    			  }
	    		  
	    			);
	  //dominios meter
	/** api.state.addEventListener(api.state.EVENTTYPE.IDLE, function() {
		  var dominios = api.scene.getData({
			     name: "dominios"
			}).data[0].data;
		  var contInt = 0;
		  var arrayHueco0DomInt = [];
		  var contInt1 = 0;
		  var arrayHueco1DomInt = [];
		  var contInt2 = 0;
		  var arrayHueco2DomInt = [];
		  var contInt3 = 0;
		  var arrayHueco3DomInt = [];
		 
		  	for(let h = 0;h<window.obj["interiores"].length;h++){
		  		for(let d = 0;d<dominios.length;d++){
				  if(window.obj["interiores"][h]["interior"] == 0){
					  if(window.obj["interiores"][h]["tipo"].toUpperCase()+"_"+window.obj["interiores"][h]["posicionShape"] == dominios[d]["id"]){
						  arrayHueco0DomInt[contInt] = dominios[d];
						  contInt++;
						  var val = $("#rs-range-lineAdicional"+contInt+"0").val();
						  $("#rs-range-lineAdicional"+contInt+"0").attr("min",(parseFloat(val) - (parseFloat(dominios[d]["bottom"]) / 10 )));
						  $("#rs-range-lineAdicional"+contInt+"0").attr("max",(parseFloat(val) + (parseFloat(dominios[d]["top"]) / 10 )));
						  
					  }
				  }
				  if(window.obj["interiores"][h]["interior"] == 1){
					  if(window.obj["interiores"][h]["tipo"].toUpperCase()+"_"+window.obj["interiores"][h]["posicionShape"] == dominios[d]["id"]){
						  arrayHueco1DomInt[contInt1] = dominios[d];
						  contInt1++;
						  var val = $("#rs-range-lineAdicional"+contInt+"1").val();
						  $("#rs-range-lineAdicional"+contInt+"1").attr("min",(parseFloat(val) - (parseFloat(dominios[d]["bottom"]) / 10 )));
						  $("#rs-range-lineAdicional"+contInt+"1").attr("max",(parseFloat(val) + (parseFloat(dominios[d]["top"]) / 10 )));
						  
					  }
				  }
				  if(window.obj["interiores"][h]["interior"] == 2){
					  if(window.obj["interiores"][h]["tipo"].toUpperCase()+"_"+window.obj["interiores"][h]["posicionShape"] == dominios[d]["id"]){
						  arrayHueco2DomInt[contInt2] = dominios[d];
						  contInt2++;
						  var val = $("#rs-range-lineAdicional"+contInt+"2").val();
						  $("#rs-range-lineAdicional"+contInt+"2").attr("min",(parseFloat(val) - (parseFloat(dominios[d]["bottom"]) / 10 )));
						  $("#rs-range-lineAdicional"+contInt+"2").attr("max",(parseFloat(val) + (parseFloat(dominios[d]["top"]) / 10 )));
						  
					  }
				  }
				  if(window.obj["interiores"][h]["interior"] == 3){
					  if(window.obj["interiores"][h]["tipo"].toUpperCase()+"_"+window.obj["interiores"][h]["posicionShape"] == dominios[d]["id"]){
						  arrayHueco3DomInt[contInt3] = dominios[d];
						  contInt3++;
						  var val = $("#rs-range-lineAdicional"+contInt+"3").val();
						  $("#rs-range-lineAdicional"+contInt+"3").attr("min",(parseFloat(val) - (parseFloat(dominios[d]["bottom"]) / 10 )));
						  $("#rs-range-lineAdicional"+contInt+"3").attr("max",(parseFloat(val) + (parseFloat(dominios[d]["top"]) / 10 )));
						  
					  }
				  }
			  }
		  }
		  	window.arrayHueco0DomInt = arrayHueco0DomInt;
		  	window.arrayHueco1DomInt = arrayHueco1DomInt;
		  	window.arrayHueco2DomInt = arrayHueco2DomInt;
		  	window.arrayHueco3DomInt = arrayHueco3DomInt;

	  });**/
	  
 
	  
	  var rangeSliderAdicional1 = document.getElementById("rs-range-lineAdicional10");
		$("#rs-range-lineAdicional10").attr(window.funcClic,"cambiarArmarioEstantes(1,0,1,0)");
		var inputDiv = document.querySelector('#inputDivAdi10');
		var w = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional1.style.width = "100%";
		var posicionDominiCarga = 10; 
		
		
		var inputMin = rangeSliderAdicional1.getAttribute('min');
		var inputMax = rangeSliderAdicional1.getAttribute('max');
		
		
		/* LA ETIQUETA */
		var etiqueta = document.querySelector('#etiquetaAdi10');
		var ew = parseInt(window.getComputedStyle(etiqueta, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta.innerHTML = (rangeSliderAdicional1.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional1.max)
		etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value) * cuenta) - 10 )+"px";

		rangeSliderAdicional1.addEventListener('input',function(){
			var etihtml = $("#etiquetaAdi10").text();
			var arrayInt0 = [];
			var contArrayInt0 = 0;
			
			for(let k = 0;k<window.obj["interiores"].length;k++){
				if(window.obj["interiores"][k]["interior"] == 0){
					arrayInt0[contArrayInt0] = window.obj["interiores"][k];
					contArrayInt0++
				}
			}
			//var dominios = api.scene.getData({
			  //   name: "puntosDimensiones"
			//}).data[0].data;
			
			var calcu = (parseFloat(rangeSliderAdicional1.value) * 10) - (parseFloat(etihtml)*10);
			/**var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			var comienzoLinea = 0;
			var finalLinea = 0;
			  
			  var dominios = window.dominios0;
			  for(let t = 0;t<dominios.length;t++){
				  if(dominios.length == 2){
					  if(dominios[t]["array"] != 0){
						  if(t == 0){
							  dominios[t]["final"] = dominios[t]["final"] + calcu;
						  }
						  if(t == 1){
							  dominios[t]["inicio"] = dominios[t]["inicio"] - calcu;
						  }
					  }
				  }
			  }
			  for(let w = 0;w<dominios.length;w++){
				  $("#rs-range-lineAdicional"+(dominios[w]["array"] + 1)+""+dominios[w]["interior"]).attr("min",Math.round(dominios[w]["inicio"] / 10));
				  $("#rs-range-lineAdicional"+(dominios[w]["array"] + 1)+""+dominios[w]["interior"]).attr("max",Math.round(dominios[w]["final"] / 10));
			  } 
			  window.dominios0 = dominios; **/
			  if(arrayInt0[0]["tipo"] == "estante"){
				  		
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  
				  //HAY CAMISERO
				  var hayCamisero = 0;
				  var posicionCamisero = 0;
				  for(let a = 0;a<arrayInt0.length;a++){
					  if(arrayInt0[a]["tipo"] == "camisero"){
						  if(arrayInt0[0]["altura"] == arrayInt0[a]["posicion"]){
							  hayCamisero = 1;
							  posicionCamisero = arrayInt0[a]["posicionShape"];
						  }
					  }
				  }
				  
				  /**	for(let u = 0;u<dominios.length;u++){
					
						if(dominios[u]['start']["id"] == "ESTANTE_"+arrayInt0[0]['posicionShape']){
							finalLinea = u;
						}
						if(dominios[u]['end']["id"] == "ESTANTE_"+arrayInt0[0]['posicionShape']){
							comienzoLinea = u;
						}

					}
				  		
				  var objectLinea = api.scene.get({ id: "polyline"+comienzoLinea }).data[0];
			  		var objectLinea1 = api.scene.get({ id: "polyline"+finalLinea }).data[0];
			  		var dominioPuntos = api.scene.getData({
					     name: "puntosDimensiones"
					}).data[0].data;
			  		 
			  		 var puntosInicio = dominioPuntos[comienzoLinea];
			  		 var puntosFinal = dominioPuntos[finalLinea];
			  		 
			  		let material1 = {
						    version: "2.0", 
						    color: "black"
						  };
					const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
					var array = [];
					var contarray = 0;
					
						var  points = [];
						points.push( new THREE.Vector3( puntosInicio['start']["x"], puntosInicio['start']["y"], puntosInicio['start']["z"] ) );
						points.push( new THREE.Vector3( puntosInicio['end']["x"], puntosInicio['end']["y"],  (parseFloat(rangeSliderAdicional1.value) * 10) + 30 ) );
						array[contarray] = points;
						contarray++;
						var  points = [];
						points.push( new THREE.Vector3( puntosFinal['start']["x"], puntosFinal['start']["y"], (parseFloat(rangeSliderAdicional1.value) * 10) + 60)  );
						points.push( new THREE.Vector3( puntosFinal['end']["x"], puntosFinal['end']["y"], puntosFinal['end']["z"] ) );
						array[contarray] = points;
						contarray++;
						 
					var arrayLine = [];
					var contLine = 0;
					for(let x = 0;x<2;x++){
					 
						var geometry = new THREE.BufferGeometry().setFromPoints( array[x] );
						
						var line = new THREE.LineLoop( geometry, material );
						
						var num = 0;
						if(x == 0){
							num = comienzoLinea;
						}else{
							num = finalLinea;
						}
						  let asset = {
						    id: "polyline"+num,
						    content: [
						      {
						        format: api.scene.FORMAT.THREE,
						        data: {
						          threeObject: line
						        }
						      },
						      {
						        format: "material",
						        data: material1
						      }
						    ]
						  };
						  arrayLine[contLine] = asset;
						  contLine++;
					} 						
					api.scene.updateAsync(arrayLine);**/		
				  
				/**  var objectLinea = api.scene.get({ id: "polyline"+finalLinea });
				  var lineDistances = [];
				  objectLinea.data[0].content[0].data.threeObject.geometry.attributes.position.array[5] = parseFloat(rangeSliderAdicional1.value) * 10;
				  api.scene.updatePersistentAsync([objectLinea.data[0]], 'CommPlugin_1');**/
				  	if(hayCamisero == 0){
				  		api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+arrayInt0[0]['posicionShape']],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+arrayInt0[0]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);
				  	}
				  	
				  	if(hayCamisero == 1){
				  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
				  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];
				  		api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+arrayInt0[0]['posicionShape']],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+arrayInt0[0]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },{
						  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       },{
							  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
							  			         transformations: [
							  			           {
							  			             delay: 0,
							  			             duration: 500,
							  			             type: 'translation',
							  			             easing: "Quartic.InOut",
							  			             translationVector: { x: 0, y: 0, z: calcu },
							  			             repeat: 0
							  			           }
							  			         ],reset:false
							  			       }]);
				  	}
						  
				  
			  }
			  
			  if(arrayInt0[0]["tipo"] == "tubo"){
				  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+arrayInt0[0]['posicionShape']],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu }, 
						             repeat: 0
						           }
						         ],reset:false
						       }]);
			  }
			  if(arrayInt0[0]["tipo"] == "cajones"){
				//HAY CAMISERO
				  var hayCamisero = 0;
				  var posicionCamisero = 0;
				  for(let a = 0;a<arrayInt0.length;a++){
					  if(arrayInt0[a]["tipo"] == "camisero"){
						  if(arrayInt0[0]["altura"] == arrayInt0[a]["posicion"]){
							  hayCamisero = 1;
							  posicionCamisero = arrayInt0[a]["posicionShape"];
						  }
					  }
				  }
				  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
				  if(hayCamisero == 0){
					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+arrayInt0[0]['posicionShape']],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+arrayInt0[0]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);
				  }
				  if(hayCamisero == 1){
					  var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
					  var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];
					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+arrayInt0[0]['posicionShape']],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+arrayInt0[0]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },{
						  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       },{
							  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
							  			         transformations: [
							  			           {
							  			             delay: 0,
							  			             duration: 500,
							  			             type: 'translation',
							  			             easing: "Quartic.InOut",
							  			             translationVector: { x: 0, y: 0, z: calcu },
							  			             repeat: 0
							  			           }
							  			         ],reset:false
							  			       }]);
				  		
				  }
				  
			  }
			  
			  if(arrayInt0[0]["tipo"] == "estantecristal"){
			  		var arr = window.arrayDeEstantesMetCristal;
				  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+arrayInt0[0]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);

				  
			  }
			  
		/* cambia el valor de la etiqueta (el tooltip) */
		etiqueta.innerHTML =(rangeSliderAdicional1.value); 
		/* cambia la posición de la etiqueta (el tooltip) */
		
		
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional1.max)
		etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value) * cuenta) - 10 )+"px";
		/*if(rangeSliderAdicional1.value >= 190){
			etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional1.value >= 180){
				etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional1.value >= 170){
					etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional1.value >= 160){
						etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional1.value >= 150){
							etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional1.value >= 140){
								etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional1.value >= 130){
									etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional1.value >= 120){
										etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional1.value >= 110){
											etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional1.value >= 100){
												etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional1.value >= 90){
													etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional1.value >= 80){
														etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional1.value >= 70){
															etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional1.value >= 60){
																etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional1.value >= 50){
																	etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional1.value >= 40){
																		etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (30))+"px";
																	}else{
																		etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}**/
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional2 = document.getElementById("rs-range-lineAdicional20");
		$("#rs-range-lineAdicional20").attr(window.funcClic,"cambiarArmarioEstantes(1,1,2,0)");
		var inputDiv2 = document.querySelector('#inputDivAdi20');
		var w = parseInt(window.getComputedStyle(inputDiv2, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional2.style.width = "100%";
		var inputMin = rangeSliderAdicional2.getAttribute('min');
		var inputMax = rangeSliderAdicional2.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta2 = document.querySelector('#etiquetaAdi20');
		var ew = parseInt(window.getComputedStyle(etiqueta2, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta2.innerHTML = (rangeSliderAdicional2.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional2.max)
		etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value) * cuenta) - 10 )+"px";
		
		/**
		if(rangeSliderAdicional2.value >= 190){
			etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional2.value >= 180){
				etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional2.value >= 170){
					etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional2.value >= 160){
						etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional2.value >= 150){
							etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional2.value >= 140){
								etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional2.value >= 130){
									etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional2.value >= 120){
										etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional2.value >= 110){
											etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional2.value >= 100){
												etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional2.value >= 90){
													etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional2.value >= 80){
														etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional2.value >= 70){
															etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional2.value >= 60){
																etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional2.value >= 50){
																	etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional2.value >= 40){
																		etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (30))+"px";
																	}else{
																		etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}

		 **/

		rangeSliderAdicional2.addEventListener('input',function(){
			var etihtml = $("#etiquetaAdi20").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			
			var contCaj = 0;
			  var calcu = (parseFloat(rangeSliderAdicional2.value) * 10) - (parseFloat(etihtml)*10);
			  /**var dominios = window.dominios0;
			  for(let t = 0;t<dominios.length;t++){
				  
					  if(dominios[t]["array"] != 1){
						  if(t == 0){
							  dominios[t]["final"] = dominios[t]["final"] + calcu;
						  }
						  if(t == 1){
							  dominios[t]["inicio"] = dominios[t]["inicio"] + calcu;
						  }
						  if(t == 2){
							  dominios[t]["inicio"] = dominios[t]["inicio"] + calcu;
						  }
					  }
				  
			  }
			  for(let w = 0;w<dominios.length;w++){
				  $("#rs-range-lineAdicional"+(dominios[w]["array"] + 1)+""+dominios[w]["interior"]).attr("min",Math.round(dominios[w]["inicio"] / 10));
				  $("#rs-range-lineAdicional"+(dominios[w]["array"] + 1)+""+dominios[w]["interior"]).attr("max",Math.round(dominios[w]["final"] / 10));
			  }
			  window.dominios0 = dominios; **/
			  if(window.obj["interiores"][0]["tipo"] == "cajones"){
				  contCaj++;
			  }
			  var hueco1 = [];
			  var cont1Hueco = 0;
				for(let o = 0;o<window.obj["interiores"].length;o++){
					if(window.obj["interiores"][o]["interior"] == 0){
						hueco1[cont1Hueco] = window.obj["interiores"][o];
						cont1Hueco++;
					}
				}
				//HAY CAMISERO
				  var hayCamisero = 0;
				  var posicionCamisero = 0;
				  for(let a = 0;a<hueco1.length;a++){
					  if(hueco1[a]["tipo"] == "camisero"){
						  if(hueco1[1]["altura"] == hueco1[a]["posicion"]){
							  hayCamisero = 1;
							  posicionCamisero = hueco1[a]["posicionShape"];
						  }
					  }
				  }
			  if(hueco1[1]["tipo"] == "estante"){
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  	if(hayCamisero == 0){
						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[1]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco1[1]['posicionShape']],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       }]);
			  	}
						  if(hayCamisero == 1){
						  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
						  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

						  		api.scene.setLiveTransformation(
									     [
									       {
									         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[1]['posicionShape']],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },
									       {
										         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco1[1]['posicionShape']],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       },{
								  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
								  			         transformations: [
								  			           {
								  			             delay: 0,
								  			             duration: 500,
								  			             type: 'translation',
								  			             easing: "Quartic.InOut",
								  			             translationVector: { x: 0, y: 0, z: calcu },
								  			             repeat: 0
								  			           }
								  			         ],reset:false
								  			       },{
									  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
									  			         transformations: [
									  			           {
									  			             delay: 0,
									  			             duration: 500,
									  			             type: 'translation',
									  			             easing: "Quartic.InOut",
									  			             translationVector: { x: 0, y: 0, z: calcu },
									  			             repeat: 0
									  			           }
									  			         ],reset:false
									  			       }]);
						  	}
				  
			  }
			  if(hueco1[1]["tipo"] == "tubo"){
				  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+hueco1[1]['posicionShape']],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
			  }
			  if(hueco1[1]["tipo"] == "cajones"){
				  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
			  if(hayCamisero == 0){
				  	api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[1]['posicionShape']],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco1[1]['posicionShape']],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			  		}
			  	if(hayCamisero == 1){
				  var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
				  var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[1]['posicionShape']],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco1[1]['posicionShape']],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },{
					  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
					  			         transformations: [
					  			           {
					  			             delay: 0,
					  			             duration: 500,
					  			             type: 'translation',
					  			             easing: "Quartic.InOut",
					  			             translationVector: { x: 0, y: 0, z: calcu },
					  			             repeat: 0
					  			           }
					  			         ],reset:false
					  			       },{
						  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       }]);
			  		
			  		}
			  }
			  if(hueco1[1]["tipo"] == "estantecristal"){
			  		var arr = window.arrayDeEstantesMetCristal;
				  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[1]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);

				  
			  }
		/* cambia el valor de la etiqueta (el tooltip) */
		etiqueta2.innerHTML =(rangeSliderAdicional2.value);
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional2.max)
		etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value) * cuenta) - 10 )+"px";
		
		/* cambia la posición de la etiqueta (el tooltip) */
		/**if(rangeSliderAdicional2.value >= 190){
			etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional2.value >= 180){
				etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional2.value >= 170){
					etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional2.value >= 160){
						etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional2.value >= 150){
							etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional2.value >= 140){
								etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional2.value >= 130){
									etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional2.value >= 120){
										etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional2.value >= 110){
											etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional2.value >= 100){
												etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional2.value >= 90){
													etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional2.value >= 80){
														etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional2.value >= 70){
															etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional2.value >= 60){
																etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional2.value >= 50){
																	etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional2.value >= 40){
																		etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (30))+"px";
																	}else{
																		etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}**/
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional3 = document.getElementById("rs-range-lineAdicional30");
		$("#rs-range-lineAdicional30").attr(window.funcClic,"cambiarArmarioEstantes(1,2,3,0)");
		var inputDiv3 = document.querySelector('#inputDivAdi30');
		var w = parseInt(window.getComputedStyle(inputDiv3, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional3.style.width = "100%";
		var inputMin = rangeSliderAdicional3.getAttribute('min');
		var inputMax = rangeSliderAdicional3.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta3 = document.querySelector('#etiquetaAdi30');
		var ew = parseInt(window.getComputedStyle(etiqueta3, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta3.innerHTML = (rangeSliderAdicional3.value);
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional3.max)
		etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value) * cuenta) - 10 )+"px";
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		/**if(rangeSliderAdicional3.value >= 190){
			etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional3.value >= 180){
				etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional3.value >= 170){
					etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional3.value >= 160){
						etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional3.value >= 150){
							etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional3.value >= 140){
								etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional3.value >= 130){
									etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional3.value >= 120){
										etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional3.value >= 110){
											etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional3.value >= 100){
												etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional3.value >= 90){
													etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional3.value >= 80){
														etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional3.value >= 70){
															etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional3.value >= 60){
																etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional3.value >= 50){
																	etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional3.value >= 40){
																		etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (30))+"px";
																	}else{
																		etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}**/



		rangeSliderAdicional3.addEventListener('input',function(){
			var etihtml = $("#etiquetaAdi30").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			  var calcu = (parseFloat(rangeSliderAdicional3.value) * 10) - (parseFloat(etihtml)*10);
			  
			  var hueco1 = [];
			  var cont1Hueco = 0;
				for(let o = 0;o<window.obj["interiores"].length;o++){
					if(window.obj["interiores"][o]["interior"] == 0){
						hueco1[cont1Hueco] = window.obj["interiores"][o];
						cont1Hueco++;
					}
				}
				var hayCamisero = 0;
				  var posicionCamisero = 0;
				  for(let a = 0;a<hueco1.length;a++){
					  if(hueco1[a]["tipo"] == "camisero"){
						  if(hueco1[2]["altura"] == hueco1[a]["posicion"]){
							  hayCamisero = 1;
							  posicionCamisero = hueco1[a]["posicionShape"];
						  }
					  }
				  }
			  if(hueco1[2]["tipo"] == "estante"){
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  		if(hayCamisero == 0){
					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[2]['posicionShape']],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco1[2]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);
			  				}
					  if(hayCamisero == 1){
					  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
					  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

					  		api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[2]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco1[2]['posicionShape']],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },{
							  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
							  			         transformations: [
							  			           {
							  			             delay: 0,
							  			             duration: 500,
							  			             type: 'translation',
							  			             easing: "Quartic.InOut",
							  			             translationVector: { x: 0, y: 0, z: calcu },
							  			             repeat: 0
							  			           }
							  			         ],reset:false
							  			       },{
								  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
								  			         transformations: [
								  			           {
								  			             delay: 0,
								  			             duration: 500,
								  			             type: 'translation',
								  			             easing: "Quartic.InOut",
								  			             translationVector: { x: 0, y: 0, z: calcu },
								  			             repeat: 0
								  			           }
								  			         ],reset:false
								  			       }]);
					  	}

		  }
		  if(hueco1[2]["tipo"] == "tubo"){
			  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+hueco1[2]['posicionShape']],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       }]);
		  }
		  if(hueco1[2]["tipo"] == "cajones"){
			  var contCaj = 0;
			  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
		  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
		  	if(hayCamisero == 0){
			  	api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[2]['posicionShape']],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco1[2]['posicionShape']],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		  		}
		  		if(hayCamisero == 1){
				  var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
				  var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[2]['posicionShape']],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco1[2]['posicionShape']],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },{
					  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
					  			         transformations: [
					  			           {
					  			             delay: 0,
					  			             duration: 500,
					  			             type: 'translation',
					  			             easing: "Quartic.InOut",
					  			             translationVector: { x: 0, y: 0, z: calcu },
					  			             repeat: 0
					  			           }
					  			         ],reset:false
					  			       },{
						  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       }]);
			  		
			  		}
		  } 
		  
		  if(hueco1[2]["tipo"] == "estantecristal"){
		  		var arr = window.arrayDeEstantesMetCristal;
			  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[2]['posicionShape']],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
		  }
		/* cambia el valor de la etiqueta (el tooltip) */
		etiqueta3.innerHTML =(rangeSliderAdicional3.value);
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional3.max)
		etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value) * cuenta) - 10 )+"px";
		
		/* cambia la posición de la etiqueta (el tooltip) */
		/**if(rangeSliderAdicional3.value >= 190){
			etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional3.value >= 180){
				etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional3.value >= 170){
					etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional3.value >= 160){
						etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional3.value >= 150){
							etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional3.value >= 140){
								etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional3.value >= 130){
									etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional3.value >= 120){
										etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional3.value >= 110){
											etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional3.value >= 100){
												etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional3.value >= 90){
													etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional3.value >= 80){
														etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional3.value >= 70){
															etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional3.value >= 60){
																etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional3.value >= 50){
																	etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional3.value >= 40){
																		etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (30))+"px";
																	}else{
																		etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}**/
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional4 = document.getElementById("rs-range-lineAdicional40");
		$("#rs-range-lineAdicional40").attr(window.funcClic,"cambiarArmarioEstantes(1,3,4,0)");
		var inputDiv4 = document.querySelector('#inputDivAdi40');
		var w = parseInt(window.getComputedStyle(inputDiv4, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional4.style.width = "100%";
		var inputMin = rangeSliderAdicional4.getAttribute('min');
		var inputMax = rangeSliderAdicional4.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta4 = document.querySelector('#etiquetaAdi40');
		var ew = parseInt(window.getComputedStyle(etiqueta4, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta4.innerHTML = (rangeSliderAdicional4.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		/**if(rangeSliderAdicional4.value >= 190){
			etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional4.value >= 180){
				etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional4.value >= 170){
					etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional4.value >= 160){
						etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional4.value >= 150){
							etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional4.value >= 140){
								etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional4.value >= 130){
									etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional4.value >= 120){
										etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional4.value >= 110){
											etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional4.value >= 100){
												etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional4.value >= 90){
													etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional4.value >= 80){
														etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional4.value >= 70){
															etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional4.value >= 60){
																etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional4.value >= 50){
																	etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional4.value >= 40){
																		etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (30))+"px";
																	}else{
																		etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}**/

		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional4.max)
		etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value) * cuenta) - 10 )+"px";

		rangeSliderAdicional4.addEventListener('input',function(){
			var etihtml = $("#etiquetaAdi40").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			  var calcu = (parseFloat(rangeSliderAdicional4.value) * 10) - (parseFloat(etihtml)*10); 
			  var hueco1 = [];
			  var cont1Hueco = 0;
				for(let o = 0;o<window.obj["interiores"].length;o++){
					if(window.obj["interiores"][o]["interior"] == 0){
						hueco1[cont1Hueco] = window.obj["interiores"][o];
						cont1Hueco++;
					}
				}
				//HAY CAMISERO
				  var hayCamisero = 0;
				  var posicionCamisero = 0;
				  for(let a = 0;a<hueco1.length;a++){
					  if(hueco1[a]["tipo"] == "camisero"){
						  if(hueco1[3]["altura"] == hueco1[a]["posicion"]){
							  hayCamisero = 1;
							  posicionCamisero = hueco1[a]["posicionShape"];
						  }
					  }
				  }
			  if(hueco1[3]["tipo"] == "estante"){
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  		if(hayCamisero == 0){
						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[3]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco1[3]['posicionShape']],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       }]);
				  			}
						  if(hayCamisero == 1){
						  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
						  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

						  		api.scene.setLiveTransformation(
									     [
									       {
									         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[3]['posicionShape']],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },
									       {
										         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco1[3]['posicionShape']],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       },{
								  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
								  			         transformations: [
								  			           {
								  			             delay: 0,
								  			             duration: 500,
								  			             type: 'translation',
								  			             easing: "Quartic.InOut",
								  			             translationVector: { x: 0, y: 0, z: calcu },
								  			             repeat: 0
								  			           }
								  			         ],reset:false
								  			       },{
									  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
									  			         transformations: [
									  			           {
									  			             delay: 0,
									  			             duration: 500,
									  			             type: 'translation',
									  			             easing: "Quartic.InOut",
									  			             translationVector: { x: 0, y: 0, z: calcu },
									  			             repeat: 0
									  			           }
									  			         ],reset:false
									  			       }]);
						  	}

			  }
			  if(hueco1[3]["tipo"] == "tubo"){
				  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+hueco1[3]['posicionShape']],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
			  }
			  if(hueco1[3]["tipo"] == "cajones"){
				  var contCaj = 0;
				  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
			  	if(hayCamisero == 0){
				  	api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[3]['posicionShape']],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco1[3]['posicionShape']],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			  		}
			  		if(hayCamisero == 1){
					  var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
					  var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];
					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[3]['posicionShape']],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco1[3]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },{
						  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       },{
							  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
							  			         transformations: [
							  			           {
							  			             delay: 0,
							  			             duration: 500,
							  			             type: 'translation',
							  			             easing: "Quartic.InOut",
							  			             translationVector: { x: 0, y: 0, z: calcu },
							  			             repeat: 0
							  			           }
							  			         ],reset:false
							  			       }]);
				  		
				  		}
			  }
			  if(hueco1[3]["tipo"] == "estantecristal"){
			  		var arr = window.arrayDeEstantesMetCristal;
				  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[3]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);

			  }
		/* cambia el valor de la etiqueta (el tooltip) */
		etiqueta4.innerHTML =(rangeSliderAdicional4.value);
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional4.max)
		etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value) * cuenta) - 10 )+"px";
		/* cambia la posición de la etiqueta (el tooltip) */
		/**if(rangeSliderAdicional4.value >= 190){
			etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional4.value >= 180){
				etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional4.value >= 170){
					etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional4.value >= 160){
						etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional4.value >= 150){
							etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional4.value >= 140){
								etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional4.value >= 130){
									etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional4.value >= 120){
										etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional4.value >= 110){
											etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional4.value >= 100){
												etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional4.value >= 90){
													etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional4.value >= 80){
														etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional4.value >= 70){
															etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional4.value >= 60){
																etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional4.value >= 50){
																	etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional4.value >= 40){
																		etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (30))+"px";
																	}else{
																		etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}**/
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional5 = document.getElementById("rs-range-lineAdicional50");
		$("#rs-range-lineAdicional50").attr(window.funcClic,"cambiarArmarioEstantes(1,4,5,0)");
		var inputDiv5 = document.querySelector('#inputDivAdi50');
		var w = parseInt(window.getComputedStyle(inputDiv5, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional5.style.width = "100%";
		var inputMin = rangeSliderAdicional5.getAttribute('min');
		var inputMax = rangeSliderAdicional5.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta5 = document.querySelector('#etiquetaAdi50');
		var ew = parseInt(window.getComputedStyle(etiqueta5, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta5.innerHTML = (rangeSliderAdicional5.value);
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional5.max)
		etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value) * cuenta) - 10 )+"px";
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		/**if(rangeSliderAdicional5.value >= 190){
			etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional5.value >= 180){
				etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional5.value >= 170){
					etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional5.value >= 160){
						etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional5.value >= 150){
							etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional5.value >= 140){
								etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional5.value >= 130){
									etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional5.value >= 120){
										etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional5.value >= 110){
											etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional5.value >= 100){
												etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional5.value >= 90){
													etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional5.value >= 80){
														etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional5.value >= 70){
															etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional5.value >= 60){
																etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional5.value >= 50){
																	etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional5.value >= 40){
																		etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (30))+"px";
																	}else{
																		etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}**/



		rangeSliderAdicional5.addEventListener('input',function(){
			var etihtml = $("#etiquetaAdi50").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			var calcu = (parseFloat(rangeSliderAdicional5.value) * 10) - (parseFloat(etihtml)*10);
			var hueco1 = [];
			var cont1Hueco = 0;
			for(let o = 0;o<window.obj["interiores"].length;o++){
					if(window.obj["interiores"][o]["interior"] == 0){
						hueco1[cont1Hueco] = window.obj["interiores"][o];
						cont1Hueco++;
					}
			}
			//HAY CAMISERO
			  var hayCamisero = 0;
			  var posicionCamisero = 0;
			  for(let a = 0;a<hueco1.length;a++){
				  if(hueco1[a]["tipo"] == "camisero"){
					  if(hueco1[4]["altura"] == hueco1[a]["posicion"]){
						  hayCamisero = 1;
						  posicionCamisero = hueco1[a]["posicionShape"];
					  }
				  }
			  }
			  if(hueco1[4]["tipo"] == "estante"){
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  		if(hayCamisero == 0){
						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[4]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco1[4]['posicionShape']],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       }]);
			  				}
						  if(hayCamisero == 1){
						  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
						  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

						  		api.scene.setLiveTransformation(
									     [
									       {
									         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[4]['posicionShape']],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },
									       {
										         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco1[4]['posicionShape']],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       },{
								  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
								  			         transformations: [
								  			           {
								  			             delay: 0,
								  			             duration: 500,
								  			             type: 'translation',
								  			             easing: "Quartic.InOut",
								  			             translationVector: { x: 0, y: 0, z: calcu },
								  			             repeat: 0
								  			           }
								  			         ],reset:false
								  			       },{
									  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
									  			         transformations: [
									  			           {
									  			             delay: 0,
									  			             duration: 500,
									  			             type: 'translation',
									  			             easing: "Quartic.InOut",
									  			             translationVector: { x: 0, y: 0, z: calcu },
									  			             repeat: 0
									  			           }
									  			         ],reset:false
									  			       }]);
						  	}

			  }
			  if(hueco1[4]["tipo"] == "tubo"){
				  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+hueco1[4]['posicionShape']],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
			  }
			  if(hueco1[4]["tipo"] == "cajones"){
				  var contCaj = 0;
				  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
			  		if(hayCamisero == 0){
			  			api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[4]['posicionShape']],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco1[4]['posicionShape']],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			  			}
			  		if(hayCamisero == 1){
				  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
				  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

				  		api.scene.setLiveTransformation(
							     [
							    	 {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[4]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco1[4]['posicionShape']],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },{
						  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       },{
							  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
							  			         transformations: [
							  			           {
							  			             delay: 0,
							  			             duration: 500,
							  			             type: 'translation',
							  			             easing: "Quartic.InOut",
							  			             translationVector: { x: 0, y: 0, z: calcu },
							  			             repeat: 0
							  			           }
							  			         ],reset:false
							  			       }]);
				  	}
			  }
			  if(hueco1[4]["tipo"] == "estantecristal"){
			  		var arr = window.arrayDeEstantesMetCristal;
				  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco1[4]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);
				  
			  }
		/* cambia el valor de la etiqueta (el tooltip) */
		etiqueta5.innerHTML =(rangeSliderAdicional5.value);
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional5.max)
		etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value) * cuenta) - 10 )+"px";
		/* cambia la posición de la etiqueta (el tooltip) */
		/**if(rangeSliderAdicional5.value >= 190){
			etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional5.value >= 180){
				etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional5.value >= 170){
					etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional5.value >= 160){
						etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional5.value >= 150){
							etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional5.value >= 140){
								etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional5.value >= 130){
									etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional5.value >= 120){
										etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional5.value >= 110){
											etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional5.value >= 100){
												etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional5.value >= 90){
													etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional5.value >= 80){
														etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional5.value >= 70){
															etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional5.value >= 60){
																etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional5.value >= 50){
																	etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional5.value >= 40){
																		etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (30))+"px";
																	}else{
																		etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}**/
		
		/* cambia el estilo del TRACK */
		}, false);
		
		//empieza 2 hueco
		var rangeSliderAdicional6 = document.getElementById("rs-range-lineAdicional11");
		$("#rs-range-lineAdicional11").attr(window.funcClic,"cambiarArmarioEstantes(2,0,1,1)");
		var inputDiv = document.querySelector('#inputDivAdi11');
		var w = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional6.style.width = "100%";
		var inputMin = rangeSliderAdicional6.getAttribute('min');
		var inputMax = rangeSliderAdicional6.getAttribute('max');
		

		/* LA etiqueta6 */
		var etiqueta6 = document.querySelector('#etiquetaAdi11');
		var ew = parseInt(window.getComputedStyle(etiqueta6, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta6 (el tooltip) */
		etiqueta6.innerHTML = (rangeSliderAdicional6.value);
		/* calcula la posición inicial de la etiqueta6 (el tooltip) */
		/* establece el estilo inicial del TRACK */
		
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional6.max)
		etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value) * cuenta) - 10 )+"px";

		rangeSliderAdicional6.addEventListener('input',function(){
			var etihtml = $("#etiquetaAdi11").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			var numParaInt = 0;
			var numParaIntTubo = 0;
			var numParaIntCajones = 0;
			var numParaIntEstantCristal = 0;
			var numParaInt1 = 0;
			var yaPuesto = 0;
			var hueco2 = [];
			var cont2Hueco = 0;
			for(let o = 0;o<window.obj["interiores"].length;o++){
				if(window.obj["interiores"][o]["interior"] == 1){
					hueco2[cont2Hueco] = window.obj["interiores"][o];
					cont2Hueco++;
				}
			} 
			//HAY CAMISERO
			  var hayCamisero = 0;
			  var posicionCamisero = 0;
			  for(let a = 0;a<hueco2.length;a++){
				  if(hueco2[a]["tipo"] == "camisero"){
					  if(hueco2[0]["altura"] == hueco2[a]["posicion"]){
						  hayCamisero = 1;
						  posicionCamisero = hueco2[a]["posicionShape"];
					  }
				  }
			  }
			  var calcu = (parseFloat(rangeSliderAdicional6.value) * 10) - (parseFloat(etihtml)*10);
			  if(hueco2[0]["tipo"] == "estante"){
				  		
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  for(let i = 0;i<arr.length;i++){
					  if(arr[i]["interior"] == 1 && yaPuesto == 0){
						  yaPuesto = 1;
						  if(hayCamisero == 0){
							  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco2[0]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco2[0]['posicionShape']],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       }]);
						  }
						  if(hayCamisero == 1){
						  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
						  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

						  		api.scene.setLiveTransformation(
									     [
									    	 {
										         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco2[0]['posicionShape']],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       },
										       {
											         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco2[0]['posicionShape']],
											         transformations: [
											           {
											             delay: 0,
											             duration: 500,
											             type: 'translation',
											             easing: "Quartic.InOut",
											             translationVector: { x: 0, y: 0, z: calcu },
											             repeat: 0
											           }
											         ],reset:false
											       },{
								  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
								  			         transformations: [
								  			           {
								  			             delay: 0,
								  			             duration: 500,
								  			             type: 'translation',
								  			             easing: "Quartic.InOut",
								  			             translationVector: { x: 0, y: 0, z: calcu },
								  			             repeat: 0
								  			           }
								  			         ],reset:false
								  			       },{
									  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
									  			         transformations: [
									  			           {
									  			             delay: 0,
									  			             duration: 500,
									  			             type: 'translation',
									  			             easing: "Quartic.InOut",
									  			             translationVector: { x: 0, y: 0, z: calcu },
									  			             repeat: 0
									  			           }
									  			         ],reset:false
									  			       }]);
						  	}
					  }
				  }
				  
			  }
			  
			  if(hueco2[0]["tipo"] == "tubo"){
				  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+(hueco2[0]['posicionShape'])],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
			  }
			  if(hueco2[0]["tipo"] == "cajones"){
				  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
			  	 if(hayCamisero == 0){
				  	api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco2[0]['posicionShape']],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco2[0]['posicionShape']],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			  	 }
				  if(hayCamisero == 1){
				  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
				  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

				  		api.scene.setLiveTransformation(
							     [
							    	 {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco2[0]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco2[0]['posicionShape']],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },{
						  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       },{
							  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
							  			         transformations: [
							  			           {
							  			             delay: 0,
							  			             duration: 500,
							  			             type: 'translation',
							  			             easing: "Quartic.InOut",
							  			             translationVector: { x: 0, y: 0, z: calcu },
							  			             repeat: 0
							  			           }
							  			         ],reset:false
							  			       }]);
				  	}
			  }
			  
			  if(hueco2[0]["tipo"] == "estantecristal"){
			  		var arr = window.arrayDeEstantesMetCristal;
				  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco2[0]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);

			  }
		/* cambia el valor de la etiqueta (el tooltip) */
				etiqueta6.innerHTML =(rangeSliderAdicional6.value);
				var tamPX = 0;
				 if (screen.width > 800) {
					 tamPX = 307;
				 }else{
					 tamPX = 252;
				 }
				var cuenta = 0;
				cuenta = tamPX / parseFloat(rangeSliderAdicional6.max)
				etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value) * cuenta) - 10 )+"px";
				/* cambia la posición de la etiqueta6 (el tooltip) */
				
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional7 = document.getElementById("rs-range-lineAdicional21");
		$("#rs-range-lineAdicional21").attr(window.funcClic,"cambiarArmarioEstantes(2,1,2,1)");
		var inputDiv2 = document.querySelector('#inputDivAdi21');
		var w = parseInt(window.getComputedStyle(inputDiv2, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional7.style.width = "100%";
		var inputMin = rangeSliderAdicional7.getAttribute('min');
		var inputMax = rangeSliderAdicional7.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta7 = document.querySelector('#etiquetaAdi21');
		var ew = parseInt(window.getComputedStyle(etiqueta7, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta7.innerHTML = (rangeSliderAdicional7.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional7.max)
		etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value) * cuenta) - 10 )+"px";
		

		rangeSliderAdicional7.addEventListener('input',function(){
			var etihtml = $("#etiquetaAdi21").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			var numParaInt = 0;
			var numParaIntTubo = 0;
			var numParaInt1 = 0;
			var numParaIntEstantCristal = 0;
			var numParaIntCajones = 0;
			var yaPuesto = 0;
			var hueco2 = [];
			var cont2Hueco = 0;
			for(let o = 0;o<window.obj["interiores"].length;o++){
				if(window.obj["interiores"][o]["interior"] == 1){
					hueco2[cont2Hueco] = window.obj["interiores"][o];
					cont2Hueco++;
				}
			}
			//HAY CAMISERO
			  var hayCamisero = 0;
			  var posicionCamisero = 0;
			  for(let a = 0;a<hueco2.length;a++){
				  if(hueco2[a]["tipo"] == "camisero"){
					  if(hueco2[1]["altura"] == hueco2[a]["posicion"]){
						  hayCamisero = 1;
						  posicionCamisero = hueco2[a]["posicionShape"];
					  }
				  }
			  }
			  var calcu = (parseFloat(rangeSliderAdicional7.value) * 10) - (parseFloat(etihtml)*10);
			  if(hueco2[1]["tipo"] == "estante"){
				  		
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
						  yaPuesto = 1;
					if(hayCamisero == 0){
						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco2[1]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco2[1]['posicionShape']],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       }]);
					}
					
					if(hayCamisero == 1){
				  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
				  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

				  		api.scene.setLiveTransformation(
							     [
							    	 {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco2[1]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco2[1]['posicionShape']],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },{
						  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       },{
							  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
							  			         transformations: [
							  			           {
							  			             delay: 0,
							  			             duration: 500,
							  			             type: 'translation',
							  			             easing: "Quartic.InOut",
							  			             translationVector: { x: 0, y: 0, z: calcu },
							  			             repeat: 0
							  			           }
							  			         ],reset:false
							  			       }]);
				  	}
				  
			  }
			  if(hueco2[1]["tipo"] == "tubo"){
				  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+(hueco2[1]['posicionShape'])],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
			  }
			  if(hueco2[1]["tipo"] == "cajones"){
				  var contCaj = 0;
				  if(hueco2[0]["tipo"] == "cajones"){
					  contCaj++;
				  }
				  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
				  if(hayCamisero == 0){
					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[1]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco2[1]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);
				  }
				  if(hayCamisero == 1){
				  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
				  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

				  		api.scene.setLiveTransformation(
							     [
							    	 {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[1]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco2[1]['posicionShape'])],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },{
						  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       },{
							  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
							  			         transformations: [
							  			           {
							  			             delay: 0,
							  			             duration: 500,
							  			             type: 'translation',
							  			             easing: "Quartic.InOut",
							  			             translationVector: { x: 0, y: 0, z: calcu },
							  			             repeat: 0
							  			           }
							  			         ],reset:false
							  			       }]);
				  	}
			  }
			  if(hueco2[1]["tipo"] == "estantecristal"){
				  if(hueco2[0]["tipo"] == 'estantecristal'){
					  var sumCristal = 1;
				  }else{
					  var sumCristal = 0;
				  }
			  		var arr = window.arrayDeEstantesMetCristal;
				  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[1]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);

			  }
		/* cambia el valor de la etiqueta (el tooltip) */
			  etiqueta7.innerHTML =(rangeSliderAdicional7.value);
			  var tamPX = 0;
				 if (screen.width > 800) {
					 tamPX = 307;
				 }else{
					 tamPX = 252;
				 }
				var cuenta = 0;
				cuenta = tamPX / parseFloat(rangeSliderAdicional7.max)
				etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value) * cuenta) - 10 )+"px";
		
		/* cambia el estilo del TRACK */
		}, false);
		 
		var rangeSliderAdicional8 = document.getElementById("rs-range-lineAdicional31");
		$("#rs-range-lineAdicional31").attr(window.funcClic,"cambiarArmarioEstantes(2,2,3,1)");
		var inputDiv3 = document.querySelector('#inputDivAdi31');
		var w = parseInt(window.getComputedStyle(inputDiv3, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional8.style.width = "100%";
		var inputMin = rangeSliderAdicional8.getAttribute('min');
		var inputMax = rangeSliderAdicional8.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta8 = document.querySelector('#etiquetaAdi31');
		var ew = parseInt(window.getComputedStyle(etiqueta8, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta8.innerHTML = (rangeSliderAdicional8.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional8.max)
		etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value) * cuenta) - 10 )+"px";


		rangeSliderAdicional8.addEventListener('input',function(){
			var etihtml = $("#etiquetaAdi31").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			var numParaInt = 0;
			var numParaIntTubo = 0;
			var numParaInt1 = 0;
			var numParaIntEstantCristal = 0;
			var numParaIntCajones = 0;
			var yaPuesto = 0;
			var hueco2 = [];
			var cont2Hueco = 0;
			for(let o = 0;o<window.obj["interiores"].length;o++){
				if(window.obj["interiores"][o]["interior"] == 1){
					hueco2[cont2Hueco] = window.obj["interiores"][o];
					cont2Hueco++;
				}
			}
			//HAY CAMISERO
			  var hayCamisero = 0;
			  var posicionCamisero = 0;
			  for(let a = 0;a<hueco2.length;a++){
				  if(hueco2[a]["tipo"] == "camisero"){
					  if(hueco2[2]["altura"] == hueco2[a]["posicion"]){
						  hayCamisero = 1;
						  posicionCamisero = hueco2[a]["posicionShape"];
					  }
				  }
			  }
			  var calcu = (parseFloat(rangeSliderAdicional8.value) * 10) - (parseFloat(etihtml)*10);
			  if(hueco2[2]["tipo"] == "estante"){
				  		
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
						  if(hueco2[0]["tipo"] == 'estante'){
							  if(hueco2[1]["tipo"] == 'estante'){
								  var sum = 2;
							  }else{
								  var sum = 1;
							  }
						  }else{
							  if(hueco2[1]["tipo"] == 'estante'){
								  var sum = 1;
							  }else{
								  var sum = 0;
							  }
							  
						  }
						  yaPuesto = 1;
						  if(hayCamisero == 0){
							  api.scene.setLiveTransformation(
									     [
									       {
									         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[2]['posicionShape'])],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },
									       {
										         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco2[2]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       }]);
						  }
						  if(hayCamisero == 1){
						  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
						  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

						  		api.scene.setLiveTransformation(
									     [
									    	 {
										         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[2]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       },
										       {
											         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco2[2]['posicionShape'])],
											         transformations: [
											           {
											             delay: 0,
											             duration: 500,
											             type: 'translation',
											             easing: "Quartic.InOut",
											             translationVector: { x: 0, y: 0, z: calcu },
											             repeat: 0
											           }
											         ],reset:false
											       },{
								  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
								  			         transformations: [
								  			           {
								  			             delay: 0,
								  			             duration: 500,
								  			             type: 'translation',
								  			             easing: "Quartic.InOut",
								  			             translationVector: { x: 0, y: 0, z: calcu },
								  			             repeat: 0
								  			           }
								  			         ],reset:false
								  			       },{
									  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
									  			         transformations: [
									  			           {
									  			             delay: 0,
									  			             duration: 500,
									  			             type: 'translation',
									  			             easing: "Quartic.InOut",
									  			             translationVector: { x: 0, y: 0, z: calcu },
									  			             repeat: 0
									  			           }
									  			         ],reset:false
									  			       }]);
						  	}
				  
			  }
		  if(hueco2[2]["tipo"] == "tubo"){
			  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+(hueco2[2]['posicionShape'])],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       }]);
		  }
		  if(hueco2[2]["tipo"] == "cajones"){
			  var contCaj = 0;
			  if(hueco2[0]["tipo"] == "cajones"){
				  contCaj++;
			  }
			  if(hueco2[1]["tipo"] == "cajones"){
				  contCaj++;
			  }
			  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
		  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
				if(hayCamisero == 0){ 
		  		api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[2]['posicionShape'])],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco2[2]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
		  		}
			  if(hayCamisero == 1){
			  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
			  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

			  		api.scene.setLiveTransformation(
						     [
						    	 {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[2]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco2[2]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },{
					  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
					  			         transformations: [
					  			           {
					  			             delay: 0,
					  			             duration: 500,
					  			             type: 'translation',
					  			             easing: "Quartic.InOut",
					  			             translationVector: { x: 0, y: 0, z: calcu },
					  			             repeat: 0
					  			           }
					  			         ],reset:false
					  			       },{
						  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       }]);
			  	}
		  }
		  if(hueco2[2]["tipo"] == "estantecristal"){
			  if(hueco2[0]["tipo"] == 'estantecristal'){
				  if(hueco2[1]["tipo"] == 'estantecristal'){
					  var sumCristal = 2;
				  }else{
					  var sumCristal = 1;
				  }
			  }else{
				  if(hueco2[1]["tipo"] == 'estantecristal'){
					  var sumCristal = 1;
				  }else{
					  var sumCristal = 0;
				  }
				  
			  }
		  		var arr = window.arrayDeEstantesMetCristal;
			  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[2]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);

			  
		  }
		/* cambia el valor de la etiqueta (el tooltip) */
		  etiqueta8.innerHTML =(rangeSliderAdicional8.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			
		  var tamPX = 0;
			 if (screen.width > 800) {
				 tamPX = 307;
			 }else{
				 tamPX = 252;
			 }
			var cuenta = 0;
			cuenta = tamPX / parseFloat(rangeSliderAdicional8.max)
			etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value) * cuenta) - 10 )+"px";
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional9 = document.getElementById("rs-range-lineAdicional41");
		$("#rs-range-lineAdicional41").attr(window.funcClic,"cambiarArmarioEstantes(2,3,4,1)");
		var inputDiv4 = document.querySelector('#inputDivAdi41');
		var w = parseInt(window.getComputedStyle(inputDiv4, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional9.style.width = "100%";
		var inputMin = rangeSliderAdicional9.getAttribute('min');
		var inputMax = rangeSliderAdicional9.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta9 = document.querySelector('#etiquetaAdi41');
		var ew = parseInt(window.getComputedStyle(etiqueta9, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta9.innerHTML = (rangeSliderAdicional9.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional9.max)
		etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value) * cuenta) - 10 )+"px";

		rangeSliderAdicional9.addEventListener('input',function(){
			var etihtml = $("#etiquetaAdi41").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			  var numParaInt = 0;
			  var numParaIntTubo = 0;
				var numParaInt1 = 0;
				var numParaIntEstantCristal = 0;
				var numParaIntCajones = 0;
				var yaPuesto = 0;
				var hueco2 = [];
				var cont2Hueco = 0;
				for(let o = 0;o<window.obj["interiores"].length;o++){
					if(window.obj["interiores"][o]["interior"] == 1){
						hueco2[cont2Hueco] = window.obj["interiores"][o];
						cont2Hueco++;
					}
				}
				//HAY CAMISERO
				  var hayCamisero = 0;
				  var posicionCamisero = 0;
				  for(let a = 0;a<hueco2.length;a++){
					  if(hueco2[a]["tipo"] == "camisero"){
						  if(hueco2[3]["altura"] == hueco2[a]["posicion"]){
							  hayCamisero = 1;
							  posicionCamisero = hueco2[a]["posicionShape"];
						  }
					  }
				  }
				  var calcu = (parseFloat(rangeSliderAdicional9.value) * 10) - (parseFloat(etihtml)*10);
				  if(hueco2[3]["tipo"] == "estante"){
					  		
					  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
					  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
							  
							  yaPuesto = 1;
							  if(hayCamisero == 0){
								  api.scene.setLiveTransformation(
										     [
										       {
										         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[3]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       },
										       {
											         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco2[3]['posicionShape'])],
											         transformations: [
											           {
											             delay: 0,
											             duration: 500,
											             type: 'translation',
											             easing: "Quartic.InOut",
											             translationVector: { x: 0, y: 0, z: calcu },
											             repeat: 0
											           }
											         ],reset:false
											       }]);
							  }
							  if(hayCamisero == 1){
							  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
							  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

							  		api.scene.setLiveTransformation(
										     [
										    	 {
											         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[3]['posicionShape'])],
											         transformations: [
											           {
											             delay: 0,
											             duration: 500,
											             type: 'translation',
											             easing: "Quartic.InOut",
											             translationVector: { x: 0, y: 0, z: calcu },
											             repeat: 0
											           }
											         ],reset:false
											       },
											       {
												         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco2[3]['posicionShape'])],
												         transformations: [
												           {
												             delay: 0,
												             duration: 500,
												             type: 'translation',
												             easing: "Quartic.InOut",
												             translationVector: { x: 0, y: 0, z: calcu },
												             repeat: 0
												           }
												         ],reset:false
												       },{
									  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
									  			         transformations: [
									  			           {
									  			             delay: 0,
									  			             duration: 500,
									  			             type: 'translation',
									  			             easing: "Quartic.InOut",
									  			             translationVector: { x: 0, y: 0, z: calcu },
									  			             repeat: 0
									  			           }
									  			         ],reset:false
									  			       },{
										  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
										  			         transformations: [
										  			           {
										  			             delay: 0,
										  			             duration: 500,
										  			             type: 'translation',
										  			             easing: "Quartic.InOut",
										  			             translationVector: { x: 0, y: 0, z: calcu },
										  			             repeat: 0
										  			           }
										  			         ],reset:false
										  			       }]);
							  	}
					  
				  }
			  if(hueco2[3]["tipo"] == "tubo"){
				  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+(hueco2[3]['posicionShape'])],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
			  }
			  if(hueco2[3]["tipo"] == "cajones"){
				  var contCaj = 0;
				  if(hueco2[0]["tipo"] == "cajones"){
					  contCaj++;
				  }
				  if(hueco2[1]["tipo"] == "cajones"){
					  contCaj++;
				  }
				  if(hueco2[2]["tipo"] == "cajones"){
					  contCaj++;
				  }
				  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
			  if(hayCamisero == 0){
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[3]['posicionShape'])],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco2[3]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			  }
			  if(hayCamisero == 1){
			  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
			  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

			  		api.scene.setLiveTransformation(
						     [
						    	 {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[3]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco2[3]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },{
					  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
					  			         transformations: [
					  			           {
					  			             delay: 0,
					  			             duration: 500,
					  			             type: 'translation',
					  			             easing: "Quartic.InOut",
					  			             translationVector: { x: 0, y: 0, z: calcu },
					  			             repeat: 0
					  			           }
					  			         ],reset:false
					  			       },{
						  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       }]);
			  	}
				  
			  }
			  if(hueco2[3]["tipo"] == "estantecristal"){
				 
			  		var arr = window.arrayDeEstantesMetCristal;
				  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[3]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);
				  
			  }
			  /* cambia el valor de la etiqueta (el tooltip) */
			  etiqueta9.innerHTML =(rangeSliderAdicional9.value);
			  var tamPX = 0;
				 if (screen.width > 800) {
					 tamPX = 307;
				 }else{
					 tamPX = 252;
				 }
				var cuenta = 0;
				cuenta = tamPX / parseFloat(rangeSliderAdicional9.max)
				etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value) * cuenta) - 10 )+"px";
		/* cambia el estilo del TRACK */
		}, false);
		 
		var rangeSliderAdicional10 = document.getElementById("rs-range-lineAdicional51");
		$("#rs-range-lineAdicional51").attr(window.funcClic,"cambiarArmarioEstantes(2,4,5,1)");
		var inputDiv5 = document.querySelector('#inputDivAdi51');
		var w = parseInt(window.getComputedStyle(inputDiv5, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional10.style.width = "100%";
		var inputMin = rangeSliderAdicional10.getAttribute('min');
		var inputMax = rangeSliderAdicional10.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta10 = document.querySelector('#etiquetaAdi51');
		var ew = parseInt(window.getComputedStyle(etiqueta10, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta10.innerHTML = (rangeSliderAdicional10.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional10.max)
		etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value) * cuenta) - 10 )+"px";

		rangeSliderAdicional10.addEventListener('input',function(){
			var etihtml = $("#etiquetaAdi51").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			var numParaInt = 0;
			var numParaIntTubo = 0;
			var numParaInt1 = 0;
			var numParaIntEstantCristal = 0;
			var numParaIntCajones = 0;
			var yaPuesto = 0;
			var hueco2 = [];
			var cont2Hueco = 0;
			for(let o = 0;o<window.obj["interiores"].length;o++){
				if(window.obj["interiores"][o]["interior"] == 1){
					hueco2[cont2Hueco] = window.obj["interiores"][o];
					cont2Hueco++;
				}
			}
			//HAY CAMISERO
			  var hayCamisero = 0;
			  var posicionCamisero = 0;
			  for(let a = 0;a<hueco2.length;a++){
				  if(hueco2[a]["tipo"] == "camisero"){
					  if(hueco2[4]["altura"] == hueco2[a]["posicion"]){
						  hayCamisero = 1;
						  posicionCamisero = hueco2[a]["posicionShape"];
					  }
				  }
			  }
			  var calcu = (parseFloat(rangeSliderAdicional10.value) * 10) - (parseFloat(etihtml)*10);
			  if(hueco2[4]["tipo"] == "estante"){
				  		
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
						  yaPuesto = 1;
						  
						  if(hayCamisero == 0){
							  api.scene.setLiveTransformation(
									     [
									       {
									         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[4]['posicionShape'])],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },
									       {
										         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco2[4]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       }]);
						  }
						  if(hayCamisero == 1){
						  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
						  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

						  		api.scene.setLiveTransformation(
									     [
									    	 {
										         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[4]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       },
										       {
											         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco2[4]['posicionShape'])],
											         transformations: [
											           {
											             delay: 0,
											             duration: 500,
											             type: 'translation',
											             easing: "Quartic.InOut",
											             translationVector: { x: 0, y: 0, z: calcu },
											             repeat: 0
											           }
											         ],reset:false
											       },{
								  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
								  			         transformations: [
								  			           {
								  			             delay: 0,
								  			             duration: 500,
								  			             type: 'translation',
								  			             easing: "Quartic.InOut",
								  			             translationVector: { x: 0, y: 0, z: calcu },
								  			             repeat: 0
								  			           }
								  			         ],reset:false
								  			       },{
									  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
									  			         transformations: [
									  			           {
									  			             delay: 0,
									  			             duration: 500,
									  			             type: 'translation',
									  			             easing: "Quartic.InOut",
									  			             translationVector: { x: 0, y: 0, z: calcu },
									  			             repeat: 0
									  			           }
									  			         ],reset:false
									  			       }]);
						  	}
				  
			  }
			  if(hueco2[4]["tipo"] == "tubo"){
				  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+(hueco2[4]['posicionShape'])],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
			  }
			  if(hueco2[4]["tipo"] == "cajones"){
				  var contCaj = 0;
				  if(hueco2[0]["tipo"] == "cajones"){
					  contCaj++;
				  }
				  if(hueco2[1]["tipo"] == "cajones"){
					  contCaj++;
				  }
				  if(hueco2[2]["tipo"] == "cajones"){
					  contCaj++;
				  }
				  if(hueco2[3]["tipo"] == "cajones"){
					  contCaj++;
				  }
				  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
				  
				  if(hayCamisero == 0){
					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[4]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco2[4]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);
				  }
				  if(hayCamisero == 1){
				  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
				  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

				  		api.scene.setLiveTransformation(
							     [
							    	 {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[4]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco2[4]['posicionShape'])],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },{
						  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       },{
							  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
							  			         transformations: [
							  			           {
							  			             delay: 0,
							  			             duration: 500,
							  			             type: 'translation',
							  			             easing: "Quartic.InOut",
							  			             translationVector: { x: 0, y: 0, z: calcu },
							  			             repeat: 0
							  			           }
							  			         ],reset:false
							  			       }]);
				  	}
			  }
			  if(hueco2[4]["tipo"] == "estantecristal"){
			  		var arr = window.arrayDeEstantesMetCristal;
				  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco2[4]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);

				  
			  }
		/* cambia el valor de la etiqueta (el tooltip) */
			  etiqueta10.innerHTML =(rangeSliderAdicional10.value);
				/* cambia la posición de la etiqueta (el tooltip) */
				
			  var tamPX = 0;
				 if (screen.width > 800) {
					 tamPX = 307;
				 }else{
					 tamPX = 252;
				 }
				var cuenta = 0;
				cuenta = tamPX / parseFloat(rangeSliderAdicional10.max)
				etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value) * cuenta) - 10 )+"px";
		
		/* cambia el estilo del TRACK */
		}, false);
		
		
		var rangeSliderAdicional11 = document.getElementById("rs-range-lineAdicional12");
		$("#rs-range-lineAdicional12").attr(window.funcClic,"cambiarArmarioEstantes(3,0,1,2)");
		var inputDiv = document.querySelector('#inputDivAdi12');
		var w = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional11.style.width = "100%";
		var inputMin = rangeSliderAdicional11.getAttribute('min');
		var inputMax = rangeSliderAdicional11.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta11 = document.querySelector('#etiquetaAdi12');
		var ew = parseInt(window.getComputedStyle(etiqueta11, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta11.innerHTML = (rangeSliderAdicional11.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional11.max)
		etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value) * cuenta) - 10 )+"px";

  
		rangeSliderAdicional11.addEventListener('input',function(){
			var etihtml = $("#etiquetaAdi12").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			var numParaInt = 0;
			var numParaIntTubo = 0;
			var numParaIntCajones = 0;
			var numParaInt1 = 0;
			var yaPuesto = 0;
			var numParaIntEstantCristal = 0;
			var hueco3 = [];
			var cont2Hueco = 0;
			for(let o = 0;o<window.obj["interiores"].length;o++){
				if(window.obj["interiores"][o]["interior"] == 2){
					hueco3[cont2Hueco] = window.obj["interiores"][o];
					cont2Hueco++;
				}
			}
			//HAY CAMISERO
			  var hayCamisero = 0;
			  var posicionCamisero = 0;
			  for(let a = 0;a<hueco3.length;a++){
				  if(hueco3[a]["tipo"] == "camisero"){
					  if(hueco3[0]["altura"] == hueco3[a]["posicion"]){
						  hayCamisero = 1;
						  posicionCamisero = hueco3[a]["posicionShape"];
					  }
				  }
			  }
			  var calcu = (parseFloat(rangeSliderAdicional11.value) * 10) - (parseFloat(etihtml)*10);
			  if(hueco3[0]["tipo"] == "estante"){
				  		
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  
						  yaPuesto = 1;
						  
						  if(hayCamisero == 0){
							  api.scene.setLiveTransformation(
									     [
									       {
									         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco3[0]['posicionShape']],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },
									       {
										         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco3[0]['posicionShape']],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       }]);
						  }
						  if(hayCamisero == 1){
						  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
						  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

						  		api.scene.setLiveTransformation(
									     [
									    	 {
										         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco3[0]['posicionShape']],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       },
										       {
											         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco3[0]['posicionShape']],
											         transformations: [
											           {
											             delay: 0,
											             duration: 500,
											             type: 'translation',
											             easing: "Quartic.InOut",
											             translationVector: { x: 0, y: 0, z: calcu },
											             repeat: 0
											           }
											         ],reset:false
											       },{
								  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
								  			         transformations: [
								  			           {
								  			             delay: 0,
								  			             duration: 500,
								  			             type: 'translation',
								  			             easing: "Quartic.InOut",
								  			             translationVector: { x: 0, y: 0, z: calcu },
								  			             repeat: 0
								  			           }
								  			         ],reset:false
								  			       },{
									  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
									  			         transformations: [
									  			           {
									  			             delay: 0,
									  			             duration: 500,
									  			             type: 'translation',
									  			             easing: "Quartic.InOut",
									  			             translationVector: { x: 0, y: 0, z: calcu },
									  			             repeat: 0
									  			           }
									  			         ],reset:false
									  			       }]);
						  	}
				  
			  }
			  
			  if(hueco3[0]["tipo"] == "tubo"){
				  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+(hueco3[0]['posicionShape'])],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
			  }
			  if(hueco3[0]["tipo"] == "cajones"){
				  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
				  
				  if(hayCamisero == 0){
					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco3[0]['posicionShape']],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco3[0]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);
				  }
				  if(hayCamisero == 1){
				  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
				  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

				  		api.scene.setLiveTransformation(
							     [
							    	 {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco3[0]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco3[0]['posicionShape']],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },{
						  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       },{
							  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
							  			         transformations: [
							  			           {
							  			             delay: 0,
							  			             duration: 500,
							  			             type: 'translation',
							  			             easing: "Quartic.InOut",
							  			             translationVector: { x: 0, y: 0, z: calcu },
							  			             repeat: 0
							  			           }
							  			         ],reset:false
							  			       }]);
				  	}
			  }
			  if(hueco3[0]["tipo"] == "estantecristal"){
			  		var arr = window.arrayDeEstantesMetCristal;
				  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco3[0]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);

			  }
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta11.innerHTML =(rangeSliderAdicional11.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		
			var tamPX = 0;
			 if (screen.width > 800) {
				 tamPX = 307;
			 }else{
				 tamPX = 252;
			 }
			var cuenta = 0;
			cuenta = tamPX / parseFloat(rangeSliderAdicional11.max)
			etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value) * cuenta) - 10 )+"px";
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional12 = document.getElementById("rs-range-lineAdicional22");
		$("#rs-range-lineAdicional22").attr(window.funcClic,"cambiarArmarioEstantes(3,1,2,2)");
		var inputDiv2 = document.querySelector('#inputDivAdi22');
		var w = parseInt(window.getComputedStyle(inputDiv2, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional12.style.width = "100%";
		var inputMin = rangeSliderAdicional12.getAttribute('min');
		var inputMax = rangeSliderAdicional12.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta12 = document.querySelector('#etiquetaAdi22');
		var ew = parseInt(window.getComputedStyle(etiqueta12, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta12.innerHTML = (rangeSliderAdicional12.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional12.max)
		etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value) * cuenta) - 10 )+"px";



		rangeSliderAdicional12.addEventListener('input',function(){
			
			var etihtml = $("#etiquetaAdi22").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			var numParaInt = 0;
			var numParaIntTubo = 0;
			var numParaIntEstantCristal = 0;
			var numParaInt1 = 0;
			var numParaIntCajones = 0;
			var yaPuesto = 0;
			var hueco3 = [];
			var cont2Hueco = 0;
			for(let o = 0;o<window.obj["interiores"].length;o++){
				if(window.obj["interiores"][o]["interior"] == 2){
					hueco3[cont2Hueco] = window.obj["interiores"][o];
					cont2Hueco++;
				}
			}
			//HAY CAMISERO
			  var hayCamisero = 0;
			  var posicionCamisero = 0;
			  for(let a = 0;a<hueco3.length;a++){
				  if(hueco3[a]["tipo"] == "camisero"){
					  if(hueco3[1]["altura"] == hueco3[a]["posicion"]){
						  hayCamisero = 1;
						  posicionCamisero = hueco3[a]["posicionShape"];
					  }
				  }
			  }
			  var calcu = (parseFloat(rangeSliderAdicional12.value) * 10) - (parseFloat(etihtml)*10);
			  if(hueco3[1]["tipo"] == "estante"){
				  		
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
						  yaPuesto = 1;
						  
						  if(hayCamisero == 0){
							  api.scene.setLiveTransformation(
									     [
									       {
									         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[1]['posicionShape'])],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },
									       {
										         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco3[1]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       }]);
						  }
						  if(hayCamisero == 1){
						  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
						  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

						  		api.scene.setLiveTransformation(
									     [
									    	 {
										         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[1]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       },
										       {
											         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco3[1]['posicionShape'])],
											         transformations: [
											           {
											             delay: 0,
											             duration: 500,
											             type: 'translation',
											             easing: "Quartic.InOut",
											             translationVector: { x: 0, y: 0, z: calcu },
											             repeat: 0
											           }
											         ],reset:false
											       },{
								  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
								  			         transformations: [
								  			           {
								  			             delay: 0,
								  			             duration: 500,
								  			             type: 'translation',
								  			             easing: "Quartic.InOut",
								  			             translationVector: { x: 0, y: 0, z: calcu },
								  			             repeat: 0
								  			           }
								  			         ],reset:false
								  			       },{
									  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
									  			         transformations: [
									  			           {
									  			             delay: 0,
									  			             duration: 500,
									  			             type: 'translation',
									  			             easing: "Quartic.InOut",
									  			             translationVector: { x: 0, y: 0, z: calcu },
									  			             repeat: 0
									  			           }
									  			         ],reset:false
									  			       }]);
						  	}
				  
			  }
			  if(hueco3[1]["tipo"] == "tubo"){
				  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+(hueco3[1]['posicionShape'])],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
			  }
			  if(hueco3[1]["tipo"] == "cajones"){
				  var contCaj = 0;
				  if(hueco3[0]["tipo"] == "cajones"){
					  contCaj++;
				  }

				  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
				  
				  if(hayCamisero == 0){
					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[1]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco3[1]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);
				  }
				  if(hayCamisero == 1){
				  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
				  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

				  		api.scene.setLiveTransformation(
							     [
							    	 {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[1]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco3[1]['posicionShape'])],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },{
						  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       },{
							  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
							  			         transformations: [
							  			           {
							  			             delay: 0,
							  			             duration: 500,
							  			             type: 'translation',
							  			             easing: "Quartic.InOut",
							  			             translationVector: { x: 0, y: 0, z: calcu },
							  			             repeat: 0
							  			           }
							  			         ],reset:false
							  			       }]);
				  	}
			  }
			  if(hueco3[1]["tipo"] == "estantecristal"){
			  		var arr = window.arrayDeEstantesMetCristal;
				  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[1]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);

			  }
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta12.innerHTML =(rangeSliderAdicional12.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		
			var tamPX = 0;
			 if (screen.width > 800) {
				 tamPX = 307;
			 }else{
				 tamPX = 252;
			 }
			var cuenta = 0;
			cuenta = tamPX / parseFloat(rangeSliderAdicional12.max)
			etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value) * cuenta) - 10 )+"px";
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional13 = document.getElementById("rs-range-lineAdicional32");
		$("#rs-range-lineAdicional32").attr(window.funcClic,"cambiarArmarioEstantes(3,2,3,2)");
		var inputDiv3 = document.querySelector('#inputDivAdi32');
		var w = parseInt(window.getComputedStyle(inputDiv3, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional13.style.width = "100%";
		var inputMin = rangeSliderAdicional13.getAttribute('min');
		var inputMax = rangeSliderAdicional13.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta13 = document.querySelector('#etiquetaAdi32');
		var ew = parseInt(window.getComputedStyle(etiqueta13, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta13.innerHTML = (rangeSliderAdicional13.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional13.max)
		etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value) * cuenta) - 10 )+"px";


		rangeSliderAdicional13.addEventListener('input',function(){
			var etihtml = $("#etiquetaAdi32").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			var numParaInt = 0;
			var numParaIntTubo = 0;
			var numParaIntCajones = 0;
			var numParaIntEstantCristal = 0;
			var numParaInt1 = 0;
			var yaPuesto = 0;
			var hueco3 = [];
			var cont2Hueco = 0;
			for(let o = 0;o<window.obj["interiores"].length;o++){
				if(window.obj["interiores"][o]["interior"] == 2){
					hueco3[cont2Hueco] = window.obj["interiores"][o];
					cont2Hueco++;
				}
			}
			//HAY CAMISERO
			  var hayCamisero = 0;
			  var posicionCamisero = 0;
			  for(let a = 0;a<hueco3.length;a++){
				  if(hueco3[a]["tipo"] == "camisero"){
					  if(hueco3[2]["altura"] == hueco3[a]["posicion"]){
						  hayCamisero = 1;
						  posicionCamisero = hueco3[a]["posicionShape"];
					  }
				  }
			  }
			  var calcu = (parseFloat(rangeSliderAdicional13.value) * 10) - (parseFloat(etihtml)*10);
			  if(hueco3[2]["tipo"] == "estante"){
				  		
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
						  yaPuesto = 1;
						  
						  if(hayCamisero == 0){
							  api.scene.setLiveTransformation(
									     [
									       {
									         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[2]['posicionShape'])],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },
									       {
										         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco3[2]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       }]);
						  }
						  if(hayCamisero == 1){
						  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
						  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

						  		api.scene.setLiveTransformation(
									     [
									    	 {
										         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[2]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       },
										       {
											         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco3[2]['posicionShape'])],
											         transformations: [
											           {
											             delay: 0,
											             duration: 500,
											             type: 'translation',
											             easing: "Quartic.InOut",
											             translationVector: { x: 0, y: 0, z: calcu },
											             repeat: 0
											           }
											         ],reset:false
											       },{
								  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
								  			         transformations: [
								  			           {
								  			             delay: 0,
								  			             duration: 500,
								  			             type: 'translation',
								  			             easing: "Quartic.InOut",
								  			             translationVector: { x: 0, y: 0, z: calcu },
								  			             repeat: 0
								  			           }
								  			         ],reset:false
								  			       },{
									  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
									  			         transformations: [
									  			           {
									  			             delay: 0,
									  			             duration: 500,
									  			             type: 'translation',
									  			             easing: "Quartic.InOut",
									  			             translationVector: { x: 0, y: 0, z: calcu },
									  			             repeat: 0
									  			           }
									  			         ],reset:false
									  			       }]);
						  	}
				  
			  }
		  if(hueco3[2]["tipo"] == "tubo"){
			  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+(hueco3[2]['posicionShape'])],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       }]);
		  }
		  if(hueco3[2]["tipo"] == "cajones"){
			  var contCaj = 0;
			  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
		  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
			  
			  if(hayCamisero == 0){
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[2]['posicionShape'])],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco3[2]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			  }
			  if(hayCamisero == 1){
			  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
			  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

			  		api.scene.setLiveTransformation(
						     [
						    	 {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[2]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco3[2]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },{
					  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
					  			         transformations: [
					  			           {
					  			             delay: 0,
					  			             duration: 500,
					  			             type: 'translation',
					  			             easing: "Quartic.InOut",
					  			             translationVector: { x: 0, y: 0, z: calcu },
					  			             repeat: 0
					  			           }
					  			         ],reset:false
					  			       },{
						  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       }]);
			  	}
		  }
		  if(hueco3[2]["tipo"] == "estantecristal"){
		  		var arr = window.arrayDeEstantesMetCristal;
			  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[2]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);

			  
		  }
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta13.innerHTML =(rangeSliderAdicional13.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		
			var tamPX = 0;
			 if (screen.width > 800) {
				 tamPX = 307;
			 }else{
				 tamPX = 252;
			 }
			var cuenta = 0;
			cuenta = tamPX / parseFloat(rangeSliderAdicional13.max)
			etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value) * cuenta) - 10 )+"px";
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional14 = document.getElementById("rs-range-lineAdicional42");
		$("#rs-range-lineAdicional42").attr(window.funcClic,"cambiarArmarioEstantes(3,3,4,2)");
		var inputDiv4 = document.querySelector('#inputDivAdi42');
		var w = parseInt(window.getComputedStyle(inputDiv4, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional14.style.width = "100%";
		var inputMin = rangeSliderAdicional14.getAttribute('min');
		var inputMax = rangeSliderAdicional14.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta14 = document.querySelector('#etiquetaAdi42');
		var ew = parseInt(window.getComputedStyle(etiqueta14, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta14.innerHTML = (rangeSliderAdicional14.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional14.max)
		etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value) * cuenta) - 10 )+"px";


		rangeSliderAdicional14.addEventListener('input',function(){ 			
			var etihtml = $("#etiquetaAdi42").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			  var numParaInt = 0;
			  var numParaIntTubo = 0;
				var numParaInt1 = 0;
				var yaPuesto = 0;
				var numParaIntEstantCristal = 0;
				var numParaIntCajones = 0; 
				var hueco3 = [];
				var cont2Hueco = 0;
				for(let o = 0;o<window.obj["interiores"].length;o++){
					if(window.obj["interiores"][o]["interior"] == 2){
						hueco3[cont2Hueco] = window.obj["interiores"][o];
						cont2Hueco++;
					}
				}
				//HAY CAMISERO
				  var hayCamisero = 0;
				  var posicionCamisero = 0;
				  for(let a = 0;a<hueco3.length;a++){
					  if(hueco3[a]["tipo"] == "camisero"){
						  if(hueco3[3]["altura"] == hueco3[a]["posicion"]){
							  hayCamisero = 1;
							  posicionCamisero = hueco3[a]["posicionShape"];
						  }
					  }
				  }
				  var calcu = (parseFloat(rangeSliderAdicional14.value) * 10) - (parseFloat(etihtml)*10);
				  if(hueco3[3]["tipo"] == "estante"){
					  		
					  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
					  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
							  
							  yaPuesto = 1;
							  
							  if(hayCamisero == 0){
								  api.scene.setLiveTransformation(
										     [
										       {
										         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[3]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       },
										       {
											         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco3[3]['posicionShape'])],
											         transformations: [
											           {
											             delay: 0,
											             duration: 500,
											             type: 'translation',
											             easing: "Quartic.InOut",
											             translationVector: { x: 0, y: 0, z: calcu },
											             repeat: 0
											           }
											         ],reset:false
											       }]);
							  }
							  if(hayCamisero == 1){
							  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
							  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

							  		api.scene.setLiveTransformation(
										     [
										    	 {
											         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[3]['posicionShape'])],
											         transformations: [
											           {
											             delay: 0,
											             duration: 500,
											             type: 'translation',
											             easing: "Quartic.InOut",
											             translationVector: { x: 0, y: 0, z: calcu },
											             repeat: 0
											           }
											         ],reset:false
											       },
											       {
												         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco3[3]['posicionShape'])],
												         transformations: [
												           {
												             delay: 0,
												             duration: 500,
												             type: 'translation',
												             easing: "Quartic.InOut",
												             translationVector: { x: 0, y: 0, z: calcu },
												             repeat: 0
												           }
												         ],reset:false
												       },{
									  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
									  			         transformations: [
									  			           {
									  			             delay: 0,
									  			             duration: 500,
									  			             type: 'translation',
									  			             easing: "Quartic.InOut",
									  			             translationVector: { x: 0, y: 0, z: calcu },
									  			             repeat: 0
									  			           }
									  			         ],reset:false
									  			       },{
										  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
										  			         transformations: [
										  			           {
										  			             delay: 0,
										  			             duration: 500,
										  			             type: 'translation',
										  			             easing: "Quartic.InOut",
										  			             translationVector: { x: 0, y: 0, z: calcu },
										  			             repeat: 0
										  			           }
										  			         ],reset:false
										  			       }]);
							  	}
					  
				  }
			  if(hueco3[3]["tipo"] == "tubo"){
				  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+(hueco3[3]['posicionShape'])],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
			  }
			  if(hueco3[3]["tipo"] == "cajones"){
				  var contCaj = 0;

				  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
				  
				  if(hayCamisero == 0){
					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[3]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco3[3]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);
				  }
				  if(hayCamisero == 1){
				  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
				  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

				  		api.scene.setLiveTransformation(
							     [
							    	 {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[3]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco3[3]['posicionShape'])],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },{
						  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       },{
							  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
							  			         transformations: [
							  			           {
							  			             delay: 0,
							  			             duration: 500,
							  			             type: 'translation',
							  			             easing: "Quartic.InOut",
							  			             translationVector: { x: 0, y: 0, z: calcu },
							  			             repeat: 0
							  			           }
							  			         ],reset:false
							  			       }]);
				  	}
			  }
			  if(hueco3[3]["tipo"] == "estantecristal"){
				  
			  		var arr = window.arrayDeEstantesMetCristal;
				  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[3]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);
				  
			  }
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta14.innerHTML =(rangeSliderAdicional14.value);
		/* cambia la posición de la etiqueta (el tooltip) */
			var tamPX = 0;
			 if (screen.width > 800) {
				 tamPX = 307;
			 }else{
				 tamPX = 252;
			 }
			var cuenta = 0;
			cuenta = tamPX / parseFloat(rangeSliderAdicional14.max)
			etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value) * cuenta) - 10 )+"px";
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional15 = document.getElementById("rs-range-lineAdicional52");
		$("#rs-range-lineAdicional52").attr(window.funcClic,"cambiarArmarioEstantes(3,4,5,2)");
		var inputDiv5 = document.querySelector('#inputDivAdi52');
		var w = parseInt(window.getComputedStyle(inputDiv5, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional15.style.width = "100%";
		var inputMin = rangeSliderAdicional15.getAttribute('min');
		var inputMax = rangeSliderAdicional15.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta15 = document.querySelector('#etiquetaAdi52');
		var ew = parseInt(window.getComputedStyle(etiqueta15, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta15.innerHTML = (rangeSliderAdicional15.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional15.max)
		etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value) * cuenta) - 10 )+"px";



		rangeSliderAdicional15.addEventListener('input',function(){
			var etihtml = $("#etiquetaAdi52").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			var numParaInt = 0;
			var numParaIntTubo = 0;
			var numParaIntCajones = 0;
			var numParaIntEstantCristal = 0;
			var numParaInt1 = 0;
			var yaPuesto = 0;
			var hueco3 = [];
			var cont2Hueco = 0;
			for(let o = 0;o<window.obj["interiores"].length;o++){
				if(window.obj["interiores"][o]["interior"] == 2){
					hueco3[cont2Hueco] = window.obj["interiores"][o];
					cont2Hueco++;
				}
			}
			//HAY CAMISERO
			  var hayCamisero = 0;
			  var posicionCamisero = 0;
			  for(let a = 0;a<hueco3.length;a++){
				  if(hueco3[a]["tipo"] == "camisero"){
					  if(hueco3[4]["altura"] == hueco3[a]["posicion"]){
						  hayCamisero = 1;
						  posicionCamisero = hueco3[a]["posicionShape"];
					  }
				  }
			  }
			  var calcu = (parseFloat(rangeSliderAdicional15.value) * 10) - (parseFloat(etihtml)*10);
			  if(hueco3[4]["tipo"] == "estante"){
				  		
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
						  
						  yaPuesto = 1;
						  
						  if(hayCamisero == 0){
							  api.scene.setLiveTransformation(
									     [
									       {
									         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[4]['posicionShape'])],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },
									       {
										         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco3[4]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       }]);
						  }
						  if(hayCamisero == 1){
						  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
						  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];
						  		api.scene.setLiveTransformation(
									     [
									    	 {
										         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[4]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       },
										       {
											         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco3[4]['posicionShape'])],
											         transformations: [
											           {
											             delay: 0,
											             duration: 500,
											             type: 'translation',
											             easing: "Quartic.InOut",
											             translationVector: { x: 0, y: 0, z: calcu },
											             repeat: 0
											           }
											         ],reset:false
											       },{
								  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
								  			         transformations: [
								  			           {
								  			             delay: 0,
								  			             duration: 500,
								  			             type: 'translation',
								  			             easing: "Quartic.InOut",
								  			             translationVector: { x: 0, y: 0, z: calcu },
								  			             repeat: 0
								  			           }
								  			         ],reset:false
								  			       },{
									  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
									  			         transformations: [
									  			           {
									  			             delay: 0,
									  			             duration: 500,
									  			             type: 'translation',
									  			             easing: "Quartic.InOut",
									  			             translationVector: { x: 0, y: 0, z: calcu },
									  			             repeat: 0
									  			           }
									  			         ],reset:false
									  			       }]);
						  	}
				  
			  }
			  if(hueco3[4]["tipo"] == "tubo"){
				  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+(hueco3[4]['posicionShape'])],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
			  }
			  if(hueco3[4]["tipo"] == "cajones"){
				  var contCaj = 0;
				  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
				  
				  if(hayCamisero == 0){
					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[4]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco3[4]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);
				  }
				  if(hayCamisero == 1){
				  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
				  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

				  		api.scene.setLiveTransformation(
							     [
							    	 {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[4]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco3[4]['posicionShape'])],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },{
						  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       },{
							  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
							  			         transformations: [
							  			           {
							  			             delay: 0,
							  			             duration: 500,
							  			             type: 'translation',
							  			             easing: "Quartic.InOut",
							  			             translationVector: { x: 0, y: 0, z: calcu },
							  			             repeat: 0
							  			           }
							  			         ],reset:false
							  			       }]);
				  	}
			  }
			  if(hueco3[4]["tipo"] == "estantecristal"){
				  
			  		var arr = window.arrayDeEstantesMetCristal;
				  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];
						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco3[4]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);

				  
			  }
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta15.innerHTML =(rangeSliderAdicional15.value);
		/* cambia la posición de la etiqueta (el tooltip) */
			var tamPX = 0;
			 if (screen.width > 800) {
				 tamPX = 307;
			 }else{
				 tamPX = 252;
			 }
			var cuenta = 0;
			cuenta = tamPX / parseFloat(rangeSliderAdicional15.max)
			etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value) * cuenta) - 10 )+"px";
		
		/* cambia el estilo del TRACK */
		}, false);
		  
	    var rangeSliderAdicional16 = document.getElementById("rs-range-lineAdicional13");
		$("#rs-range-lineAdicional13").attr(window.funcClic,"cambiarArmarioEstantes(4,0,1,3)");
		var inputDiv = document.querySelector('#inputDivAdi13');
		var w = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional16.style.width = "100%";
		var inputMin = rangeSliderAdicional16.getAttribute('min');
		var inputMax = rangeSliderAdicional16.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta16 = document.querySelector('#etiquetaAdi13');
		var ew = parseInt(window.getComputedStyle(etiqueta16, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta16.innerHTML = (rangeSliderAdicional16.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional16.max)
		etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value) * cuenta) - 10 )+"px";



		rangeSliderAdicional16.addEventListener('input',function(){
			
			var etihtml = $("#etiquetaAdi13").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			var numParaInt = 0;
			var numParaIntTubo = 0;
			var numParaIntCajones = 0;
			var numParaIntEstantCristal = 0;
			var numParaInt1 = 0;
			var yaPuesto = 0;
			var hueco4 = [];
			var cont2Hueco = 0;
			for(let o = 0;o<window.obj["interiores"].length;o++){
				if(window.obj["interiores"][o]["interior"] == 3){
					hueco4[cont2Hueco] = window.obj["interiores"][o];
					cont2Hueco++;
				}
			} 
			//HAY CAMISERO
			  var hayCamisero = 0;
			  var posicionCamisero = 0;
			  for(let a = 0;a<hueco4.length;a++){
				  if(hueco4[a]["tipo"] == "camisero"){
					  if(hueco4[0]["altura"] == hueco4[a]["posicion"]){
						  hayCamisero = 1;
						  posicionCamisero = hueco4[a]["posicionShape"];
					  }
				  }
			  }
			  var calcu = (parseFloat(rangeSliderAdicional16.value) * 10) - (parseFloat(etihtml)*10);
			  if(hueco4[0]["tipo"] == "estante"){
				  		
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  for(let i = 0;i<arr.length;i++){
					  if(arr[i]["interior"] == 3 && yaPuesto == 0){
						  yaPuesto = 1;
						  
						  if(hayCamisero == 0){
							  api.scene.setLiveTransformation(
									     [
									       {
									         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco4[0]['posicionShape']],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },
									       {
										         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco4[0]['posicionShape']],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       }]);
						  }
						  if(hayCamisero == 1){
						  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
						  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

						  		api.scene.setLiveTransformation(
									     [
									    	 {
										         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco4[0]['posicionShape']],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       },
										       {
											         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco4[0]['posicionShape']],
											         transformations: [
											           {
											             delay: 0,
											             duration: 500,
											             type: 'translation',
											             easing: "Quartic.InOut",
											             translationVector: { x: 0, y: 0, z: calcu },
											             repeat: 0
											           }
											         ],reset:false
											       },{
								  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
								  			         transformations: [
								  			           {
								  			             delay: 0,
								  			             duration: 500,
								  			             type: 'translation',
								  			             easing: "Quartic.InOut",
								  			             translationVector: { x: 0, y: 0, z: calcu },
								  			             repeat: 0
								  			           }
								  			         ],reset:false
								  			       },{
									  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
									  			         transformations: [
									  			           {
									  			             delay: 0,
									  			             duration: 500,
									  			             type: 'translation',
									  			             easing: "Quartic.InOut",
									  			             translationVector: { x: 0, y: 0, z: calcu },
									  			             repeat: 0
									  			           }
									  			         ],reset:false
									  			       }]);
						  	}
					  }
				  }
				  
			  }
			  
			  if(hueco4[0]["tipo"] == "tubo"){
				  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+(hueco4[0]['posicionShape'])],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
			  }
			  if(hueco4[0]["tipo"] == "cajones"){
				  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
				  
				  if(hayCamisero == 0){
					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco4[0]['posicionShape']],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco4[0]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);
				  }
				  if(hayCamisero == 1){
				  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
				  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

				  		api.scene.setLiveTransformation(
							     [
							    	 {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco4[0]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+hueco4[0]['posicionShape']],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },{
						  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       },{
							  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
							  			         transformations: [
							  			           {
							  			             delay: 0,
							  			             duration: 500,
							  			             type: 'translation',
							  			             easing: "Quartic.InOut",
							  			             translationVector: { x: 0, y: 0, z: calcu },
							  			             repeat: 0
							  			           }
							  			         ],reset:false
							  			       }]);
				  	}
			  }
			  if(hueco4[0]["tipo"] == "estantecristal"){
			  		var arr = window.arrayDeEstantesMetCristal;
				  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+hueco4[0]['posicionShape']],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);

			  }
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta16.innerHTML =(rangeSliderAdicional16.value);
		/* cambia la posición de la etiqueta (el tooltip) */
			var tamPX = 0;
			 if (screen.width > 800) {
				 tamPX = 307;
			 }else{
				 tamPX = 252;
			 }
			var cuenta = 0;
			cuenta = tamPX / parseFloat(rangeSliderAdicional16.max)
			etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value) * cuenta) - 10 )+"px";
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional17 = document.getElementById("rs-range-lineAdicional23");
		$("#rs-range-lineAdicional23").attr(window.funcClic,"cambiarArmarioEstantes(4,1,2,3)");
		var inputDiv2 = document.querySelector('#inputDivAdi23');
		var w = parseInt(window.getComputedStyle(inputDiv2, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional17.style.width = "100%";
		var inputMin = rangeSliderAdicional17.getAttribute('min');
		var inputMax = rangeSliderAdicional17.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta17 = document.querySelector('#etiquetaAdi23');
		var ew = parseInt(window.getComputedStyle(etiqueta17, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta17.innerHTML = (rangeSliderAdicional17.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional17.max)
		etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value) * cuenta) - 10 )+"px";



		rangeSliderAdicional17.addEventListener('input',function(){
			
			var etihtml = $("#etiquetaAdi23").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			var numParaInt = 0;
			var numParaIntTubo = 0;
			var numParaInt1 = 0;
			var numParaIntCajones = 0;
			var numParaIntEstantCristal = 0;
			var yaPuesto = 0;
			var hueco4 = [];
			var cont2Hueco = 0;
			for(let o = 0;o<window.obj["interiores"].length;o++){
				if(window.obj["interiores"][o]["interior"] == 3){
					hueco4[cont2Hueco] = window.obj["interiores"][o];
					cont2Hueco++;
				}
			}
			//HAY CAMISERO
			  var hayCamisero = 0;
			  var posicionCamisero = 0;
			  for(let a = 0;a<hueco4.length;a++){
				  if(hueco4[a]["tipo"] == "camisero"){
					  if(hueco4[1]["altura"] == hueco4[a]["posicion"]){
						  hayCamisero = 1;
						  posicionCamisero = hueco4[a]["posicionShape"];
					  }
				  }
			  }
			  var calcu = (parseFloat(rangeSliderAdicional17.value) * 10) - (parseFloat(etihtml)*10);
			  if(hueco4[1]["tipo"] == "estante"){
				  		
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];

						  yaPuesto = 1;
						  
						  if(hayCamisero == 0){
							  api.scene.setLiveTransformation(
									     [
									       {
									         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[1]['posicionShape'])],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },
									       {
										         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco4[1]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       }]);
						  }
						  if(hayCamisero == 1){
						  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
						  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

						  		api.scene.setLiveTransformation(
									     [
									    	 {
										         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[1]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       },
										       {
											         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco4[1]['posicionShape'])],
											         transformations: [
											           {
											             delay: 0,
											             duration: 500,
											             type: 'translation',
											             easing: "Quartic.InOut",
											             translationVector: { x: 0, y: 0, z: calcu },
											             repeat: 0
											           }
											         ],reset:false
											       },{
								  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
								  			         transformations: [
								  			           {
								  			             delay: 0,
								  			             duration: 500,
								  			             type: 'translation',
								  			             easing: "Quartic.InOut",
								  			             translationVector: { x: 0, y: 0, z: calcu },
								  			             repeat: 0
								  			           }
								  			         ],reset:false
								  			       },{
									  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
									  			         transformations: [
									  			           {
									  			             delay: 0,
									  			             duration: 500,
									  			             type: 'translation',
									  			             easing: "Quartic.InOut",
									  			             translationVector: { x: 0, y: 0, z: calcu },
									  			             repeat: 0
									  			           }
									  			         ],reset:false
									  			       }]);
						  	}
				  
			  }
			  if(hueco4[1]["tipo"] == "tubo"){
				  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+(hueco4[1]['posicionShape'])],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
			  }
			  if(hueco4[1]["tipo"] == "cajones"){
				  var contCaj = 0;

				  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
				  
				  if(hayCamisero == 0){
					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[1]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco4[1]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);
				  }
				  if(hayCamisero == 1){
				  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
				  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

				  		api.scene.setLiveTransformation(
							     [
							    	 {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[1]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco4[1]['posicionShape'])],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },{
						  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       },{
							  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
							  			         transformations: [
							  			           {
							  			             delay: 0,
							  			             duration: 500,
							  			             type: 'translation',
							  			             easing: "Quartic.InOut",
							  			             translationVector: { x: 0, y: 0, z: calcu },
							  			             repeat: 0
							  			           }
							  			         ],reset:false
							  			       }]);
				  	}
			  }
			  if(hueco4[1]["tipo"] == "estantecristal"){
			  		var arr = window.arrayDeEstantesMetCristal;
				  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[1]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);

			  }
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta17.innerHTML =(rangeSliderAdicional17.value);
		/* cambia la posición de la etiqueta (el tooltip) */
			var tamPX = 0;
			 if (screen.width > 800) {
				 tamPX = 307;
			 }else{
				 tamPX = 252;
			 }
			var cuenta = 0;
			cuenta = tamPX / parseFloat(rangeSliderAdicional17.max)
			etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value) * cuenta) - 10 )+"px";
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional18 = document.getElementById("rs-range-lineAdicional33");
		$("#rs-range-lineAdicional33").attr(window.funcClic,"cambiarArmarioEstantes(4,2,3,3)");
		var inputDiv3 = document.querySelector('#inputDivAdi33');
		var w = parseInt(window.getComputedStyle(inputDiv3, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional18.style.width = "100%";
		var inputMin = rangeSliderAdicional18.getAttribute('min');
		var inputMax = rangeSliderAdicional18.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta18 = document.querySelector('#etiquetaAdi33');
		var ew = parseInt(window.getComputedStyle(etiqueta18, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta18.innerHTML = (rangeSliderAdicional18.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional18.max)
		etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value) * cuenta) - 10 )+"px";


		rangeSliderAdicional18.addEventListener('input',function(){
			
			var etihtml = $("#etiquetaAdi33").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			var numParaInt = 0;
			var numParaIntTubo = 0;
			var numParaIntCajones = 0;
			var numParaIntEstantCristal = 0;
			var numParaInt1 = 0;
			var yaPuesto = 0;
			var hueco4 = [];
			var cont2Hueco = 0;
			for(let o = 0;o<window.obj["interiores"].length;o++){
				if(window.obj["interiores"][o]["interior"] == 3){
					hueco4[cont2Hueco] = window.obj["interiores"][o];
					cont2Hueco++;
				}
			}
			//HAY CAMISERO
			  var hayCamisero = 0;
			  var posicionCamisero = 0;
			  for(let a = 0;a<hueco4.length;a++){
				  if(hueco4[a]["tipo"] == "camisero"){
					  if(hueco4[2]["altura"] == hueco4[a]["posicion"]){
						  hayCamisero = 1;
						  posicionCamisero = hueco4[a]["posicionShape"];
					  }
				  }
			  }
			  var calcu = (parseFloat(rangeSliderAdicional18.value) * 10) - (parseFloat(etihtml)*10);
			  if(hueco4[2]["tipo"] == "estante"){
				  		
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];

						  yaPuesto = 1;
						 
						  if(hayCamisero == 0){
							  api.scene.setLiveTransformation(
									     [
									       {
									         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[2]['posicionShape'])],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },
									       {
										         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco4[2]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       }]);
						  }
						  if(hayCamisero == 1){
						  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
						  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

						  		api.scene.setLiveTransformation(
									     [
									    	 {
										         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[2]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       },
										       {
											         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco4[2]['posicionShape'])],
											         transformations: [
											           {
											             delay: 0,
											             duration: 500,
											             type: 'translation',
											             easing: "Quartic.InOut",
											             translationVector: { x: 0, y: 0, z: calcu },
											             repeat: 0
											           }
											         ],reset:false
											       },{
								  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
								  			         transformations: [
								  			           {
								  			             delay: 0,
								  			             duration: 500,
								  			             type: 'translation',
								  			             easing: "Quartic.InOut",
								  			             translationVector: { x: 0, y: 0, z: calcu },
								  			             repeat: 0
								  			           }
								  			         ],reset:false
								  			       },{
									  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
									  			         transformations: [
									  			           {
									  			             delay: 0,
									  			             duration: 500,
									  			             type: 'translation',
									  			             easing: "Quartic.InOut",
									  			             translationVector: { x: 0, y: 0, z: calcu },
									  			             repeat: 0
									  			           }
									  			         ],reset:false
									  			       }]);
						  	}
				  
			  }
		  if(hueco4[2]["tipo"] == "tubo"){
			  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+(hueco4[2]['posicionShape'])],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       }]);
		  }
		  if(hueco4[2]["tipo"] == "cajones"){
			  var contCaj = 0;

			  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
		  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
			  
			  if(hayCamisero == 0){
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[2]['posicionShape'])],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco4[2]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			  }
			  if(hayCamisero == 1){
			  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
			  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

			  		api.scene.setLiveTransformation(
						     [
						    	 {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[2]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco4[2]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },{
					  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
					  			         transformations: [
					  			           {
					  			             delay: 0,
					  			             duration: 500,
					  			             type: 'translation',
					  			             easing: "Quartic.InOut",
					  			             translationVector: { x: 0, y: 0, z: calcu },
					  			             repeat: 0
					  			           }
					  			         ],reset:false
					  			       },{
						  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       }]);
			  	}
		  }
		  if(hueco4[2]["tipo"] == "estantecristal"){
		  		var arr = window.arrayDeEstantesMetCristal;
			  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[2]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);

			  
		  }
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta18.innerHTML =(rangeSliderAdicional18.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		
			var tamPX = 0;
			 if (screen.width > 800) {
				 tamPX = 307;
			 }else{
				 tamPX = 252;
			 }
			var cuenta = 0;
			cuenta = tamPX / parseFloat(rangeSliderAdicional18.max)
			etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value) * cuenta) - 10 )+"px";
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional19 = document.getElementById("rs-range-lineAdicional43");
		$("#rs-range-lineAdicional43").attr(window.funcClic,"cambiarArmarioEstantes(4,3,4,3)");
		var inputDiv4 = document.querySelector('#inputDivAdi43');
		var w = parseInt(window.getComputedStyle(inputDiv4, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional19.style.width = "100%";
		var inputMin = rangeSliderAdicional19.getAttribute('min');
		var inputMax = rangeSliderAdicional19.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta19 = document.querySelector('#etiquetaAdi43');
		var ew = parseInt(window.getComputedStyle(etiqueta19, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta19.innerHTML = (rangeSliderAdicional19.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional19.max)
		etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value) * cuenta) - 10 )+"px";


		rangeSliderAdicional19.addEventListener('input',function(){
			
			var etihtml = $("#etiquetaAdi43").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			  var numParaInt = 0;
			  var numParaIntTubo = 0;
				var numParaInt1 = 0;
				var yaPuesto = 0;
				var numParaIntCajones = 0;
				var numParaIntEstantCristal = 0;
				var hueco4 = [];
				var cont2Hueco = 0;
				for(let o = 0;o<window.obj["interiores"].length;o++){
					if(window.obj["interiores"][o]["interior"] == 3){
						hueco4[cont2Hueco] = window.obj["interiores"][o];
						cont2Hueco++;
					}
				}
				//HAY CAMISERO
				  var hayCamisero = 0;
				  var posicionCamisero = 0;
				  for(let a = 0;a<hueco4.length;a++){
					  if(hueco4[a]["tipo"] == "camisero"){
						  if(hueco4[3]["altura"] == hueco4[a]["posicion"]){
							  hayCamisero = 1;
							  posicionCamisero = hueco4[a]["posicionShape"];
						  }
					  }
				  }
				  var calcu = (parseFloat(rangeSliderAdicional19.value) * 10) - (parseFloat(etihtml)*10);
				  if(hueco4[3]["tipo"] == "estante"){
					  		
					  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
					  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
							  
							  yaPuesto = 1;
							  
							  if(hayCamisero == 0){
								  api.scene.setLiveTransformation(
										     [
										       {
										         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[3]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       },
										       {
											         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco4[3]['posicionShape'])],
											         transformations: [
											           {
											             delay: 0,
											             duration: 500,
											             type: 'translation',
											             easing: "Quartic.InOut",
											             translationVector: { x: 0, y: 0, z: calcu },
											             repeat: 0
											           }
											         ],reset:false
											       }]);
							  }
							  if(hayCamisero == 1){
							  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
							  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

							  		api.scene.setLiveTransformation(
										     [
										    	 {
											         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[3]['posicionShape'])],
											         transformations: [
											           {
											             delay: 0,
											             duration: 500,
											             type: 'translation',
											             easing: "Quartic.InOut",
											             translationVector: { x: 0, y: 0, z: calcu },
											             repeat: 0
											           }
											         ],reset:false
											       },
											       {
												         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco4[3]['posicionShape'])],
												         transformations: [
												           {
												             delay: 0,
												             duration: 500,
												             type: 'translation',
												             easing: "Quartic.InOut",
												             translationVector: { x: 0, y: 0, z: calcu },
												             repeat: 0
												           }
												         ],reset:false
												       },{
									  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
									  			         transformations: [
									  			           {
									  			             delay: 0,
									  			             duration: 500,
									  			             type: 'translation',
									  			             easing: "Quartic.InOut",
									  			             translationVector: { x: 0, y: 0, z: calcu },
									  			             repeat: 0
									  			           }
									  			         ],reset:false
									  			       },{
										  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
										  			         transformations: [
										  			           {
										  			             delay: 0,
										  			             duration: 500,
										  			             type: 'translation',
										  			             easing: "Quartic.InOut",
										  			             translationVector: { x: 0, y: 0, z: calcu },
										  			             repeat: 0
										  			           }
										  			         ],reset:false
										  			       }]);
							  	}
					  
				  }
			  if(hueco4[3]["tipo"] == "tubo"){
				  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+(hueco4[3]['posicionShape'])],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
			  }
			  if(hueco4[3]["tipo"] == "cajones"){
				  var contCaj = 0;

				  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
				  
				  if(hayCamisero == 0){
					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[3]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco4[3]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);
				  }
				  if(hayCamisero == 1){
				  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
				  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

				  		api.scene.setLiveTransformation(
							     [
							    	 {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[3]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco4[3]['posicionShape'])],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },{
						  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       },{
							  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
							  			         transformations: [
							  			           {
							  			             delay: 0,
							  			             duration: 500,
							  			             type: 'translation',
							  			             easing: "Quartic.InOut",
							  			             translationVector: { x: 0, y: 0, z: calcu },
							  			             repeat: 0
							  			           }
							  			         ],reset:false
							  			       }]);
				  	}
			  }
			  if(hueco4[3]["tipo"] == "estantecristal"){
				 
			  		var arr = window.arrayDeEstantesMetCristal;
				  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[3]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);
				  
			  }
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta19.innerHTML =(rangeSliderAdicional19.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		
			var tamPX = 0;
			 if (screen.width > 800) {
				 tamPX = 307;
			 }else{
				 tamPX = 252;
			 }
			var cuenta = 0;
			cuenta = tamPX / parseFloat(rangeSliderAdicional19.max)
			etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value) * cuenta) - 10 )+"px";
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional20 = document.getElementById("rs-range-lineAdicional53");
		$("#rs-range-lineAdicional53").attr(window.funcClic,"cambiarArmarioEstantes(4,4,5,3)");
		var inputDiv5 = document.querySelector('#inputDivAdi53');
		var w = parseInt(window.getComputedStyle(inputDiv5, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional20.style.width = "100%";
		var inputMin = rangeSliderAdicional20.getAttribute('min');
		var inputMax = rangeSliderAdicional20.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta20 = document.querySelector('#etiquetaAdi53');
		var ew = parseInt(window.getComputedStyle(etiqueta20, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta20.innerHTML = (rangeSliderAdicional20.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		
		var tamPX = 0;
		 if (screen.width > 800) {
			 tamPX = 307;
		 }else{
			 tamPX = 252;
		 }
		var cuenta = 0;
		cuenta = tamPX / parseFloat(rangeSliderAdicional20.max)
		etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value) * cuenta) - 10 )+"px";


		rangeSliderAdicional20.addEventListener('input',function(){
			
			var etihtml = $("#etiquetaAdi53").text();
			var arr = window.arrayDeEstantesMet;
			var arr1 = window.arrayDeEstantesMet;
			var numParaInt = 0;
			var numParaIntTubo = 0;
			var numParaIntCajones = 0;
			var numParaIntEstantCristal = 0;
			var numParaInt1 = 0;
			var yaPuesto = 0;
			var hueco4 = [];
			var cont2Hueco = 0;
			for(let o = 0;o<window.obj["interiores"].length;o++){
				if(window.obj["interiores"][o]["interior"] == 3){
					hueco4[cont2Hueco] = window.obj["interiores"][o];
					cont2Hueco++;
				}
			}
			//HAY CAMISERO
			  var hayCamisero = 0;
			  var posicionCamisero = 0;
			  for(let a = 0;a<hueco4.length;a++){
				  if(hueco4[a]["tipo"] == "camisero"){
					  if(hueco4[4]["altura"] == hueco4[a]["posicion"]){
						  hayCamisero = 1;
						  posicionCamisero = hueco4[a]["posicionShape"];
					  }
				  }
			  }
			  var calcu = (parseFloat(rangeSliderAdicional20.value) * 10) - (parseFloat(etihtml)*10);
			  if(hueco4[4]["tipo"] == "estante"){
				  		
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
						  
						  yaPuesto = 1;
						  
						  if(hayCamisero == 0){
							  api.scene.setLiveTransformation(
									     [
									       {
									         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[4]['posicionShape'])],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },
									       {
										         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco4[4]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       }]);
						  }
						  if(hayCamisero == 1){
						  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
						  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

						  		api.scene.setLiveTransformation(
									     [
									    	 {
										         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[4]['posicionShape'])],
										         transformations: [
										           {
										             delay: 0,
										             duration: 500,
										             type: 'translation',
										             easing: "Quartic.InOut",
										             translationVector: { x: 0, y: 0, z: calcu },
										             repeat: 0
										           }
										         ],reset:false
										       },
										       {
											         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco4[4]['posicionShape'])],
											         transformations: [
											           {
											             delay: 0,
											             duration: 500,
											             type: 'translation',
											             easing: "Quartic.InOut",
											             translationVector: { x: 0, y: 0, z: calcu },
											             repeat: 0
											           }
											         ],reset:false
											       },{
								  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
								  			         transformations: [
								  			           {
								  			             delay: 0,
								  			             duration: 500,
								  			             type: 'translation',
								  			             easing: "Quartic.InOut",
								  			             translationVector: { x: 0, y: 0, z: calcu },
								  			             repeat: 0
								  			           }
								  			         ],reset:false
								  			       },{
									  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
									  			         transformations: [
									  			           {
									  			             delay: 0,
									  			             duration: 500,
									  			             type: 'translation',
									  			             easing: "Quartic.InOut",
									  			             translationVector: { x: 0, y: 0, z: calcu },
									  			             repeat: 0
									  			           }
									  			         ],reset:false
									  			       }]);
						  	}
				  
			  }
			  if(hueco4[4]["tipo"] == "tubo"){
				  window.object0 = api.scene.get({name: "tubos", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_0.transformation_0.node_"+(hueco4[4]['posicionShape'])],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
			  }
			  if(hueco4[4]["tipo"] == "cajones"){
				  var contCaj = 0;
				  window.object0 = api.scene.get({name: "Cajones", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "CantosCajones", format: "glb"},"CommPlugin_1").data[0];
				  
				  if(hayCamisero == 0){
					  api.scene.setLiveTransformation(
							     [
							       {
							         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[4]['posicionShape'])],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       },
							       {
								         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco4[4]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);
				  }
				  if(hayCamisero == 1){
				  		var object5 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
				  		var object6 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];

				  		api.scene.setLiveTransformation(
							     [
							    	 {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[4]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       },
								       {
									         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(hueco4[4]['posicionShape'])],
									         transformations: [
									           {
									             delay: 0,
									             duration: 500,
									             type: 'translation',
									             easing: "Quartic.InOut",
									             translationVector: { x: 0, y: 0, z: calcu },
									             repeat: 0
									           }
									         ],reset:false
									       },{
						  			         scenePaths: ["CommPlugin_1."+object5.id +".content_"+posicionCamisero+".transformation_0"],
						  			         transformations: [
						  			           {
						  			             delay: 0,
						  			             duration: 500,
						  			             type: 'translation',
						  			             easing: "Quartic.InOut",
						  			             translationVector: { x: 0, y: 0, z: calcu },
						  			             repeat: 0
						  			           }
						  			         ],reset:false
						  			       },{
							  			         scenePaths: ["CommPlugin_1."+object6.id +".content_"+posicionCamisero+".transformation_0"],
							  			         transformations: [
							  			           {
							  			             delay: 0,
							  			             duration: 500,
							  			             type: 'translation',
							  			             easing: "Quartic.InOut",
							  			             translationVector: { x: 0, y: 0, z: calcu },
							  			             repeat: 0
							  			           }
							  			         ],reset:false
							  			       }]);
				  	}
			  }
			  if(hueco4[4]["tipo"] == "estantecristal"){
				  
			  		var arr = window.arrayDeEstantesMetCristal;
				  window.object0 = api.scene.get({name: "EstantesCristal", format: "glb"},"CommPlugin_1").data[0];

						  api.scene.setLiveTransformation(
								     [
								       {
								         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(hueco4[4]['posicionShape'])],
								         transformations: [
								           {
								             delay: 0,
								             duration: 500,
								             type: 'translation',
								             easing: "Quartic.InOut",
								             translationVector: { x: 0, y: 0, z: calcu },
								             repeat: 0
								           }
								         ],reset:false
								       }]);

				  
			  }
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta20.innerHTML =(rangeSliderAdicional20.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		
			var tamPX = 0;
			 if (screen.width > 800) {
				 tamPX = 307;
			 }else{
				 tamPX = 252;
			 }
			var cuenta = 0;
			cuenta = tamPX / parseFloat(rangeSliderAdicional20.max)
			etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value) * cuenta) - 10 )+"px";
		
		/* cambia el estilo del TRACK */
		}, false);
		
  
		
}

function dragCallback(){
	var dominios = api.scene.getData({
	     name: "puntosDimensiones"
	}).data[0].data;
	let material1 = {
		    version: "2.0",
		    color: "black"
		  };
	const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
	for(let u = 0;u<dominios.length;u++){
		
		var  points = [];
		points.push( new THREE.Vector3( dominios[u]['start']["x"], dominios[u]['start']["y"], dominios[u]['start']["z"] ) );
		points.push( new THREE.Vector3( dominios[u]['end']["x"], dominios[u]['end']["y"], dominios[u]['end']["z"] ) );

		var geometry = new THREE.BufferGeometry().setFromPoints( points );
		
		var line = new THREE.Line( geometry, material );
		
		
		  let asset = {
		    id: "polyline",
		    content: [
		      {
		        format: api.scene.FORMAT.THREE,
		        data: {
		          threeObject: line
		        }
		      },
		      {
		        format: "material",
		        data: material1
		      }
		    ]
		  };
		
		api.scene.updateAsync([asset]);
	}
	var interiores =  window.obj["interiores"];

	
}
function bajarRangoSlider(id,id1,intArm){
	var obj = {};
	obj["interiores"] = intArm;
	var parame = api.parameters.get({'name':'InterioresJSON'},"CommPlugin_1").data[0];
	  api.parameters.updateAsync({
	      id: parame.id,
	      value: JSON.stringify(obj)
	    })
	    api.state.addEventListener(api.state.EVENTTYPE.IDLE, function() {
	    	var dominios = api.scene.getData({
			     name: "puntosDimensiones"
			}).data[0].data;
	if(id1 == 0){
		var array0 = window.arrayHueco0DomInt;
		
		var obj = window.obj["interiores"];
		var hueco0 = [];
		var contHueco0 = 0;
		for(let k = 0;k<obj.length;k++){
			if(obj[k]["interior"] == 0){
				hueco0[contHueco0] = obj[k];
				contHueco0++;
			}
		}
		var puesto = 0;
		var valor = parseFloat(hueco0[id - 1]["posicion"]);
		for(let k = 0;k<hueco0.length;k++){
			if(k != id - 1){
				console.log(hueco0[id - 1]);
				if(hueco0[k]["posicion"] <= valor && puesto == 0){
					for(let w = 0;w<array0.length;w++){
						if(hueco0[k]["tipo"].toUpperCase()+"_"+hueco0[k]["posicionShape"] == array0[w]["id"]){
							
							var val = $("#rs-range-lineAdicional"+id+"0").val();
							var min = $("#rs-range-lineAdicional"+id+"0").attr("min");
							var max = $("#rs-range-lineAdicional"+id+"0").attr("max");
							var minBien = 0;
							minBien = parseFloat(min) - (parseFloat(array0[w]["bottom"]) / 10 );
							if(minBien < 0){
								minBien = 0;
							}
							$("#rs-range-lineAdicional"+id+"0").attr("min",minBien);
							$("#rs-range-lineAdicional"+id+"0").attr("max",((parseFloat(array0[w]["bottom"]) / 10 ) ));
							$("#rs-range-lineAdicional"+id+"0").val((parseFloat(array0[w]["bottom"]) / 10 ) );
							puesto = 1;
						}
					}
				}
			}
		}
	}
	if(id1 == 1){
		var array0 = window.arrayHueco1DomInt;
		var obj = window.obj["interiores"];
		var hueco0 = [];
		var contHueco0 = 0;
		for(let k = 0;k<obj.length;k++){
			if(obj[k]["interior"] == 1){
				hueco0[contHueco0] = obj[k];
				contHueco0++;
			}
		}
		var puesto = 0;
		var valor = parseFloat(hueco0[id - 1]["posicion"]);
		for(let k = 0;k<hueco0.length;k++){
			if(k != id - 1){
				if(hueco0[k]["posicion"] <= valor && puesto == 0){
					for(let w = 0;w<array0.length;w++){
						if(hueco0[k]["tipo"].toUpperCase()+"_"+hueco0[k]["posicionShape"] == array0[w]["id"]){
							var val = $("#rs-range-lineAdicional"+id+"1").val();
							$("#rs-range-lineAdicional"+id+"1").attr("min",(parseFloat(val) - (parseFloat(array0[w]["bottom"]) / 10 )));
							$("#rs-range-lineAdicional"+id+"1").attr("max",(parseFloat(val) + (parseFloat(array0[w]["top"]) / 10 )));
							puesto = 1;
						}
					}
				}
			}
		}
	}

	});
}
function subirRangoSlider(id,id1){
	
	if(id1 == 0){
		var array0 = window.arrayHueco0DomInt;
		var obj = window.obj["interiores"];
		var hueco0 = [];
		var contHueco0 = 0;
		for(let k = 0;k<obj.length;k++){
			if(obj[k]["interior"] == 0){
				hueco0[contHueco0] = obj[k];
				contHueco0++;
			}
		}
		hueco0.sort(function (a, b) {
		    return (a.posicion - b.posicion)
		})
		console.log(hueco0);
	  var dominios = [];
	  var contDom = 0;
	  var alturaFin = 0;
	  var alturaPrueba = parseFloat($('#rs-range-line1').val());
      var alturaValor = alturaPrueba * 10;
	  for(let x = 0;x<hueco0.length;x++){
		  dominios[contDom] = [];
		  dominios[contDom]["inicio"] = alturaFin;
		  if(x != (hueco0.length - 1)){
			  dominios[contDom]["final"] = hueco0[x + 1]["posicion"] - hueco0[x + 1]["tamano"];	    					  
		  }else{
			  dominios[contDom]["final"] = hueco0[x]["posicion"];	    					  
		  }
		  dominios[contDom]["array"] = hueco0[x]["array"];
		  dominios[contDom]["interior"] = hueco0[x]["interior"];
		  alturaFin = hueco0[x]["altura"];
		  contDom++;
	  }
	  	var numeroPuesto = window.numeroDominioPuesto0;
	  	var pus = numeroPuesto[id - 1];
	  	pus = pus + 1;
	  	numeroPuesto[id-1] = id;
		numeroPuesto[id] = id - 1;
		window.numeroDominioPuesto0 = numeroPuesto;
		 var posini =  dominios[pus - 1]["inicio"];
		  if( (id - 1) == 0){
			  dominios[pus - 1]["inicio"] = hueco0[pus]["altura"];
			  dominios[pus - 1]["final"] = dominios[pus]["final"];
		  }
		 
		  
		  if(pus == (dominios.length - 1)){
			  dominios[pus - 1]["final"] =  alturaValor - 90;
		  }
		  dominios[pus]["inicio"] = posini;
		  dominios[pus]["final"] = hueco0[pus]["posicion"] - hueco0[pus]["tamano"];
			
	  
		  //dominios[dominios.length - 1]["final"] = alturaValor - 90;
		  console.log(dominios);
		  for(let w = 0;w<dominios.length;w++){
			  $("#rs-range-lineAdicional"+(dominios[w]["array"] + 1)+""+dominios[w]["interior"]).attr("min",Math.round(dominios[w]["inicio"] / 10));
			  $("#rs-range-lineAdicional"+(dominios[w]["array"] + 1)+""+dominios[w]["interior"]).attr("max",Math.round(dominios[w]["final"] / 10));
		  }
	  window.dominios0 = dominios;
	  /**var dominios0 = window.dominios0;
		var num1 = dominios0[id-1];
		var num2 = dominios0[id];
		dominios0[id - 1]["final"] = num2["final"];
		dominios0[id - 1]["inicio"] = num2["inicio"];
		dominios0[id]["final"] = num1["final"];
		dominios0[id]["inicio"] = num1["inicio"]; 
		console.log(dominios0);
		var puesto = 0;
		
		var valor = parseFloat(hueco0[id - 1]["posicion"]);
		for(let k = 0;k<hueco0.length;k++){
				if(hueco0[k]["posicion"] >= valor && puesto == 0){
					for(let w = 0;w<array0.length;w++){
						if(hueco0[k]["tipo"].toUpperCase()+"_"+hueco0[k]["posicionShape"] == array0[w]["id"]){
							var val = $("#rs-range-lineAdicional"+id+"0").val();
							$("#rs-range-lineAdicional"+id+"0").attr("min",(parseFloat(val) - (parseFloat(array0[w]["bottom"]) / 10 )));
							$("#rs-range-lineAdicional"+id+"0").attr("max",(parseFloat(val) + (parseFloat(array0[w]["top"]) / 10 )));
							puesto = 1;
						}
					}
				}
		}
		**/
		
	}
	
}
function interiorDefinidoMostrarArm(u,id){
	
	
	$("#divInterioresTdoPrincipal"+u+" #opcionInteriorEst #inputOpcion").val("");
	$("#divInterioresTdoPrincipal"+u+" #opcionInteriorMedida #inputOpcion").val("");
	$("#divInterioresTdoPrincipal"+u+" #"+id+" #inputOpcion").val("X");
	$("#divInterioresTdoPrincipal"+u+" #estanquitadosLosInteriores").css({"display":"block"});
}
var timeOutAncho;
function cambiarVistaArmario(tipo){
	$("#rs-range-line").attr(window.funcClic,"cambiarVistaArmario("+tipo+")");
	//ya1vez = false;
	var rangeSlider = document.getElementById("rs-range-line");
	var rangeSlider1 = document.getElementById("rs-range-line1");
	var rangeSlider2 = document.getElementById("rs-range-line2");
	$("#sdv-container-canvas").removeAttr("onmouseup");
	$("#inputAlturaArmario").val(rangeSlider1.value * 10);
	
  var valorAncho =  (rangeSlider.value*10);
  var alto = (rangeSlider1.value);
  var fondo = (rangeSlider2.value);
  //var tipo = 1;
  var codigo;
  var codigoNuevo;
  var costado;
  var costado1;
  var costado2;
  var costado3;
  var e = 19;
  var p;
  var h1;
  var h2;
  var h;
  $("#opcionSliderDiv1 #inputOpcion").val("");
  $("#opcionSliderDiv2 #inputOpcion").val("");
  $("#opcionSliderDiv3 #inputOpcion").val("");
  $("#opcionSliderDiv"+tipo+" #inputOpcion").val("X");
  var armario;
  var arrayPuertas = [];
  var costadoFinal = valorAncho - 19;
  switch (true){
	  case valorAncho <= 500:
		  armario = 1;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB001";
				  cogidoNuevo = "AB1P";
			  }else{
				  if(alto <= 240){
					  codigo = "NB002";
					  cogidoNuevo = "AB1P";
				  }else{
					  if(alto <= 250){
						  codigo = "NB003";
						  cogidoNuevo = "AB1P";
					  }else{
						  if(alto <= 260){
							  codigo = "NB004";
							  cogidoNuevo = "AB1P";
						  }   
					  }
				  }
			  }
			  p = 1;
			  h1 = 1;
			  h2 = 0;
			  h = 1;
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }

			  arrayPuertas[0] = objPuer1;

			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }else{
			  if(alto <= 230){
				  codigo = "NB005";
				  cogidoNuevo = "AB1P";
			  }else{
				  if(alto <= 240){
					  codigo = "NB006";
					  cogidoNuevo = "AB1P";
				  }else{
					  if(alto <= 250){
						  codigo = "NB007";
						  cogidoNuevo = "AB1P";
					  }else{
						  if(alto <= 260){
							  codigo = "NB008";
							  cogidoNuevo = "AB1P";
						  }   
					  }
				  }
			  }
			  p = 1;
			  h1 = 1;
			  h2 = 0;
			  h = 1;
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }

			  arrayPuertas[0] = objPuer1;

			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <=900:
		  armario = 2;
		  if(alto <= 230){
			  codigo = "NB009";
			  cogidoNuevo = "AB2P";
		  }else{
			  if(alto <= 240){
				  codigo = "NB010";
				  cogidoNuevo = "AB2P";
			  }else{
				  if(alto <= 250){
					  codigo = "NB011";
					  cogidoNuevo = "AB2P";
				  }else{
					  if(alto <= 260){
						  codigo = "NB012";
						  cogidoNuevo = "AB2P";
					  }   
				  }
			  }
		  }
		  p = 2;
		  h1 = 0;
		  h2 = 1;
		  h = 1;
		  var objPuer1 = {
				  "interior": 0,
			      "tipo": "doble",
			      "material": ["blanco","blanco"],
			      "tirador":["none","none"]
		  }
		  arrayPuertas[0] = objPuer1;
		  $("#opcionSliderDiv1").css({"display":"block"});
		  $("#opcionSliderDiv2").css({"display":"none"});
		  $("#opcionSliderDiv3").css({"display":"none"});
		  break;
	  case valorAncho <=1000:
		  armario = 2;
		  if(alto <= 230){
			  codigo = "NB013";
			  cogidoNuevo = "AB2P";
		  }else{
			  if(alto <= 240){
				  codigo = "NB014";
				  cogidoNuevo = "AB2P";
			  }else{
				  if(alto <= 250){
					  codigo = "NB015";
					  cogidoNuevo = "AB2P";
				  }else{
					  if(alto <= 260){
						  codigo = "NB016";
						  cogidoNuevo = "AB2P";
					  }   
				  }
			  }
		  }
		  p = 2;
		  h1 = 0;
		  h2 = 1;
		  h = 1;
		  var objPuer1 = {
				  "interior": 0,
			      "tipo": "doble",
			      "material": ["blanco","blanco"],
			      "tirador":["none","none"]
		  }
		  arrayPuertas[0] = objPuer1;
		  $("#opcionSliderDiv1").css({"display":"block"});
		  $("#opcionSliderDiv2").css({"display":"none"});
		  $("#opcionSliderDiv3").css({"display":"none"});
		  break;
	  case valorAncho <= 1100:
		  armario = 3;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB017";
				  cogidoNuevo = "AB3PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB018";
					  cogidoNuevo = "AB3PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB019";
						  cogidoNuevo = "AB3PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB020";
							  cogidoNuevo = "AB3PA";
						  }   
					  }
				  }
			  }
	          costado = 0.33;
	          costado1 = 0;
	          p = 3;
			  h1 = 1;
			  h2 = 1;
			  h = 2;
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }else{
			  if(alto <= 230){
				  codigo = "NB021";
				  cogidoNuevo = "AB3PB";
			  }else{
				  if(alto <= 240){
					  codigo = "NB022";
					  cogidoNuevo = "AB3PB";
				  }else{
					  if(alto <= 250){
						  codigo = "NB023";
						  cogidoNuevo = "AB3PB";
					  }else{
						  if(alto <= 260){
							  codigo = "NB024";
							  cogidoNuevo = "AB3PB";
						  }   
					  }
				  }
			  }
			  p = 3;
			  h1 = 1;
			  h2 = 1;
			  h = 2;
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"				      
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
			  costado = 0.75;
	          costado1 = 0;
		  }
		  break;
	  case valorAncho <= 1200:
		  armario = 3;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB025";
				  cogidoNuevo = "AB3PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB026";
					  cogidoNuevo = "AB3PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB027";
						  cogidoNuevo = "AB3PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB028";
							  cogidoNuevo = "AB3PA";
						  }   
					  }
				  }
			  }
			  p = 3;
			  h1 = 1;
			  h2 = 1;
			  h = 2;
	          costado = 0.33;
	          costado1 = 0;
	          var objPuer1 = {
					  "interior": 0,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
	          $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }else{
			  if(alto <= 230){
				  codigo = "NB029";
				  cogidoNuevo = "AB3PB";
			  }else{
				  if(alto <= 240){
					  codigo = "NB030";
					  cogidoNuevo = "AB3PB";
				  }else{
					  if(alto <= 250){
						  codigo = "NB031";
						  cogidoNuevo = "AB3PB";
					  }else{
						  if(alto <= 260){
							  codigo = "NB032";
							  cogidoNuevo = "AB3PB";
						  }   
					  }
				  }
			  }
			  p = 3;
			  h1 = 1;
			  h2 = 1;
			  h = 2;
			  costado = 0.75;
	          costado1 = 0;
	          var objPuer2 = {
					  "interior": 1,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
	          $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <= 1300:
		  armario = 3;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB033";
				  cogidoNuevo = "AB3PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB034";
					  cogidoNuevo = "AB3PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB035";
						  cogidoNuevo = "AB3PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB036";
							  cogidoNuevo = "AB3PA";
						  }   
					  }
				  }
			  }
			  p = 3;
			  h1 = 1;
			  h2 = 1;
			  h = 2;
	          costado = 0.33;
	          costado1 = 0;
	          var objPuer1 = {
					  "interior": 0,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
	          $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }else{
			  if(alto <= 230){
				  codigo = "NB037";
				  cogidoNuevo = "AB3PB";
			  }else{
				  if(alto <= 240){
					  codigo = "NB038";
					  cogidoNuevo = "AB3PB";
				  }else{
					  if(alto <= 250){
						  codigo = "NB039";
						  cogidoNuevo = "AB3PB";
					  }else{
						  if(alto <= 260){
							  codigo = "NB040";
							  cogidoNuevo = "AB3PB";
						  }   
					  }
				  }
			  }
			  p = 3;
			  h1 = 1;
			  h2 = 1;
			  h = 2;
			  costado = 0.75;
	          costado1 = 0;
	          var objPuer2 = {
					  "interior": 1,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
	          $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <= 1400:
		  armario = 3;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB041";
				  cogidoNuevo = "AB3PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB042";
					  cogidoNuevo = "AB3PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB043";
						  cogidoNuevo = "AB3PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB044";
							  cogidoNuevo = "AB3PA";
						  }   
					  }
				  }
			  }
	          costado = 0.33;
	          costado1 = 0;
	          p = 3;
			  h1 = 1;
			  h2 = 1;
			  h = 2;
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }else{
			  if(alto <= 230){
				  codigo = "NB045";
				  cogidoNuevo = "AB3PB";
			  }else{
				  if(alto <= 240){
					  codigo = "NB046";
					  cogidoNuevo = "AB3PB";
				  }else{
					  if(alto <= 250){
						  codigo = "NB047";
						  cogidoNuevo = "AB3PB";
					  }else{
						  if(alto <= 260){
							  codigo = "NB048";
							  cogidoNuevo = "AB3PB";
						  }   
					  }
				  }
			  }
			  costado = 0.75;
	          costado1 = 0;
	          p = 3;
			  h1 = 1;
			  h2 = 1;
			  h = 2;
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <= 1500:
		  armario = 3;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB049";
				  cogidoNuevo = "AB3PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB050";
					  cogidoNuevo = "AB3PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB051";
						  cogidoNuevo = "AB3PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB052";
							  cogidoNuevo = "AB3PA";
						  }   
					  }
				  }
			  }
	          costado = 0.33;
	          costado1 = 0;
	          p = 3;
			  h1 = 1;
			  h2 = 1;
			  h = 2;
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }else{
			  if(alto <= 230){
				  codigo = "NB053";
				  cogidoNuevo = "AB3PB";
			  }else{
				  if(alto <= 240){
					  codigo = "NB054";
					  cogidoNuevo = "AB3PB";
				  }else{
					  if(alto <= 250){
						  codigo = "NB055";
						  cogidoNuevo = "AB3PB";
					  }else{
						  if(alto <= 260){
							  codigo = "NB056";
							  cogidoNuevo = "AB3PB";
						  }   
					  }
				  }
			  }
			  costado = 0.75;
	          costado1 = 0;
	          p = 3;
			  h1 = 1;
			  h2 = 1;
			  h = 2;
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador": "none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador": "none"
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <= 1600:
		  armario = 4;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB057";
				  cogidoNuevo = "AB4PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB058";
					  cogidoNuevo = "AB4PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB059";
						  cogidoNuevo = "AB4PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB060";
							  cogidoNuevo = "AB4PA";
						  }   
					  }
				  }
			  }
	          costado = 0.5;
	          costado1 = 0;
	          p = 4;
			  h1 = 0;
			  h2 = 2;
			  h = 2;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }else{
			  if(alto <= 230){
				  codigo = "NB061";
				  cogidoNuevo = "AB4PB";
			  }else{
				  if(alto <= 240){
					  codigo = "NB062";
					  cogidoNuevo = "AB4PB";
				  }else{
					  if(alto <= 250){
						  codigo = "NB063";
						  cogidoNuevo = "AB4PB";
					  }else{
						  if(alto <= 260){
							  codigo = "NB064";
							  cogidoNuevo = "AB4PB";
						  }   
					  }
				  }
			  }
			  costado = 0.25;
	          costado1 = 0.75;
	          p = 4;
			  h1 = 2;
			  h2 = 1;
			  h = 3;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador": "none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador": "none"
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <= 1700:
		  armario = 4;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB065";
				  cogidoNuevo = "AB4PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB066";
					  cogidoNuevo = "AB4PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB067";
						  cogidoNuevo = "AB4PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB068";
							  cogidoNuevo = "AB4PA";
						  }   
					  }
				  }
			  }
	          costado = 0.5;
	          costado1 = 0;
	          p = 4;
			  h1 = 0;
			  h2 = 2;
			  h = 2;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }else{
			  if(alto <= 230){
				  codigo = "NB069";
				  cogidoNuevo = "AB4PB";
			  }else{
				  if(alto <= 240){
					  codigo = "NB070";
					  cogidoNuevo = "AB4PB";
				  }else{
					  if(alto <= 250){
						  codigo = "NB071";
						  cogidoNuevo = "AB4PB";
					  }else{
						  if(alto <= 260){
							  codigo = "NB072";
							  cogidoNuevo = "AB4PB";
						  }   
					  }
				  }
			  }
			  costado = 0.25;
	          costado1 = 0.75;
	          p = 4;
			  h1 = 2;
			  h2 = 1;
			  h = 3;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador": "none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador": "none"
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <= 1800:
		  armario = 4;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB073";
				  cogidoNuevo = "AB4PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB074";
					  cogidoNuevo = "AB4PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB075";
						  cogidoNuevo = "AB4PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB076";
							  cogidoNuevo = "AB4PA";
						  }   
					  }
				  }
			  }
	          costado = 0.5;
	          costado1 = 0;
	          p = 4;
			  h1 = 0;
			  h2 = 2;
			  h = 2;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }else{
			  if(alto <= 230){
				  codigo = "NB077";
				  cogidoNuevo = "AB4PB";
			  }else{
				  if(alto <= 240){
					  codigo = "NB078";
					  cogidoNuevo = "AB4PB";
				  }else{
					  if(alto <= 250){
						  codigo = "NB079";
						  cogidoNuevo = "AB4PB";
					  }else{
						  if(alto <= 260){
							  codigo = "NB080";
							  cogidoNuevo = "AB4PB";
						  }   
					  }
				  }
			  }
			  costado = 0.25;
	          costado1 = 0.75;
	          p = 4;
			  h1 = 2;
			  h2 = 1;
			  h = 3;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador": "none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador": "none"
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <= 1900:
		  armario = 4;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB081";
				  cogidoNuevo = "AB4PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB082";
					  cogidoNuevo = "AB4PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB083";
						  cogidoNuevo = "AB4PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB084";
							  cogidoNuevo = "AB4PA";
						  }   
					  }
				  }
			  }
	          costado = 0.5;
	          costado1 = 0;
	          p = 4;
			  h1 = 0;
			  h2 = 2;
			  h = 2;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
	          
		  }else{
			  if(alto <= 230){
				  codigo = "NB085";
				  cogidoNuevo = "AB4PB";
			  }else{
				  if(alto <= 240){
					  codigo = "NB086";
					  cogidoNuevo = "AB4PB";
				  }else{
					  if(alto <= 250){
						  codigo = "NB087";
						  cogidoNuevo = "AB4PB";
					  }else{
						  if(alto <= 260){
							  codigo = "NB088";
							  cogidoNuevo = "AB4PB";
						  }   
					  }
				  }
			  }
			  costado = 0.25;
	          costado1 = 0.75;
	          p = 4;
			  h1 = 2;
			  h2 = 1;
			  h = 3;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador": "none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador": "none"
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <= 2000:
		  armario = 4;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB089";
				  cogidoNuevo = "AB4PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB090";
					  cogidoNuevo = "AB4PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB091";
						  cogidoNuevo = "AB4PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB092";
							  cogidoNuevo = "AB4PA";
						  }   
					  }
				  }
			  }
	          costado = 0.5;
	          costado1 = 0;
	          p = 4;
			  h1 = 0;
			  h2 = 2;
			  h = 2;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }else{
			  if(alto <= 230){
				  codigo = "NB093";
				  cogidoNuevo = "AB4PB";
			  }else{
				  if(alto <= 240){
					  codigo = "NB094";
					  cogidoNuevo = "AB4PB";
				  }else{
					  if(alto <= 250){
						  codigo = "NB095";
						  cogidoNuevo = "AB4PB";
					  }else{
						  if(alto <= 260){
							  codigo = "NB096";
							  cogidoNuevo = "AB4PB";
						  }   
					  }
				  }
			  }
			  costado = 0.25;
	          costado1 = 0.75;
	          p = 4;
			  h1 = 2;
			  h2 = 1;
			  h = 3;
			  arrayPuertas[0] = 0;
			  arrayPuertas[1] = 2;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador": "none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
				      "tipo": "simple",
				      "material": "blanco",
				      "tirador": "none"
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <= 2100:
		  armario = 5;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB097";
				  cogidoNuevo = "AB5PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB098";
					  cogidoNuevo = "AB5PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB099";
						  cogidoNuevo = "AB5PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB100";
							  cogidoNuevo = "AB5PA";
						  }   
					  }
				  }
			  }
	          costado = 0.4;
	          costado1 = 0.6;
	          p = 5;
			  h1 = 1;
			  h2 = 2;
			  h = 3;
			  var objPuer2 = {
					  "interior": 1,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador": "none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"block"});
		  }else{
			  if(tipo == 2){
				  if(alto <= 230){
					  codigo = "NB101";
					  cogidoNuevo = "AB5PB";
				  }else{
					  if(alto <= 240){
						  codigo = "NB102";
						  cogidoNuevo = "AB5PB";
					  }else{
						  if(alto <= 250){
							  codigo = "NB103";
							  cogidoNuevo = "AB5PB";
						  }else{
							  if(alto <= 260){
								  codigo = "NB104";
								  cogidoNuevo = "AB5PB";
							  }   
						  }
					  }
				  }
				  costado = 0.2;
		          costado1 = 0.6;
		          p = 5;
				  h1 = 1;
				  h2 = 2;
				  h = 3;
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
				  
			  }else{
				  if(alto <= 230){
					  codigo = "NB105";
					  cogidoNuevo = "AB5PC";
				  }else{
					  if(alto <= 240){
						  codigo = "NB106";
						  cogidoNuevo = "AB5PC";
					  }else{
						  if(alto <= 250){
							  codigo = "NB107";
							  cogidoNuevo = "AB5PC";
						  }else{
							  if(alto <= 260){
								  codigo = "NB108";
								  cogidoNuevo = "AB5PC";
							  }   
						  }
					  }
				  }
				  costado = 0.4;
		          costado1 = 0.8; 
		          p = 5;
				  h1 = 1;
				  h2 = 2;
				  h = 3;
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
			  }
		  }
		  break;
	  case valorAncho <= 2200:
		  armario = 5;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB109";
				  cogidoNuevo = "AB5PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB110";
					  cogidoNuevo = "AB5PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB111";
						  cogidoNuevo = "AB5PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB112";
							  cogidoNuevo = "AB5PA";
						  }   
					  }
				  }
			  }
	          costado = 0.4;
	          costado1 = 0.6;
	          p = 5;
			  h1 = 1;
			  h2 = 2;
			  h = 3;
			  var objPuer2 = {
					  "interior": 1,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador": "none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"block"});
		  }else{
			  if(tipo == 2){
				  if(alto <= 230){
					  codigo = "NB113";
					  cogidoNuevo = "AB5PB";
				  }else{
					  if(alto <= 240){
						  codigo = "NB114";
						  cogidoNuevo = "AB5PB";
					  }else{
						  if(alto <= 250){
							  codigo = "NB115";
							  cogidoNuevo = "AB5PB";
						  }else{
							  if(alto <= 260){
								  codigo = "NB116";
								  cogidoNuevo = "AB5PB";
							  }   
						  }
					  }
				  }
				  costado = 0.2;
		          costado1 = 0.6;
		          p = 5;
				  h1 = 1;
				  h2 = 2;
				  h = 3;
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
				  
			  }else{
				  if(alto <= 230){
					  codigo = "NB117";
					  cogidoNuevo = "AB5PC";
				  }else{
					  if(alto <= 240){
						  codigo = "NB118";
						  cogidoNuevo = "AB5PC";
					  }else{
						  if(alto <= 250){
							  codigo = "NB119";
							  cogidoNuevo = "AB5PC";
						  }else{
							  if(alto <= 260){
								  codigo = "NB120";
								  cogidoNuevo = "AB5PC";
							  }   
						  }
					  }
				  }
				  costado = 0.4;
		          costado1 = 0.8; 
		          p = 5;
				  h1 = 1;
				  h2 = 2;
				  h = 3;
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
			  }
		  }
		  break;
	  case valorAncho <= 2300:
		  armario = 5;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB121";
				  cogidoNuevo = "AB5PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB122";
					  cogidoNuevo = "AB5PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB123";
						  cogidoNuevo = "AB5PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB124";
							  cogidoNuevo = "AB5PA";
						  }   
					  }
				  }
			  }
	          costado = 0.4;
	          costado1 = 0.6;
	          p = 5;
			  h1 = 1;
			  h2 = 2;
			  h = 3;
			  var objPuer2 = {
					  "interior": 1,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador": "none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"block"});
		  }else{
			  if(tipo == 2){
				  if(alto <= 230){
					  codigo = "NB125";
					  cogidoNuevo = "AB5PB";
				  }else{
					  if(alto <= 240){
						  codigo = "NB126";
						  cogidoNuevo = "AB5PB";
					  }else{
						  if(alto <= 250){
							  codigo = "NB127";
							  cogidoNuevo = "AB5PB";
						  }else{
							  if(alto <= 260){
								  codigo = "NB128";
								  cogidoNuevo = "AB5PB";
							  }   
						  }
					  }
				  }
				  costado = 0.2;
		          costado1 = 0.6;
		          p = 5;
				  h1 = 1;
				  h2 = 2;
				  h = 3;
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
				  
			  }else{
				  if(alto <= 230){
					  codigo = "NB129";
					  cogidoNuevo = "AB5PC";
				  }else{
					  if(alto <= 240){
						  codigo = "NB130";
						  cogidoNuevo = "AB5PC";
					  }else{
						  if(alto <= 250){
							  codigo = "NB131";
							  cogidoNuevo = "AB5PC";
						  }else{
							  if(alto <= 260){
								  codigo = "NB132";
								  cogidoNuevo = "AB5PC";
							  }   
						  }
					  }
				  }
				  costado = 0.4;
		          costado1 = 0.8; 
		          p = 5;
				  h1 = 1;
				  h2 = 2;
				  h = 3;
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
			  }
		  }
		  break;
	  case valorAncho <= 2400:
		  armario = 5;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB133";
				  cogidoNuevo = "AB5PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB134";
					  cogidoNuevo = "AB5PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB135";
						  cogidoNuevo = "AB5PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB136";
							  cogidoNuevo = "AB5PA";
						  }   
					  }
				  }
			  }
	          costado = 0.4;
	          costado1 = 0.6;
	          p = 5;
			  h1 = 1;
			  h2 = 2;
			  h = 3;
			  var objPuer2 = {
					  "interior": 1,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador": "none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"block"});
		  }else{
			  if(tipo == 2){
				  if(alto <= 230){
					  codigo = "NB137";
					  cogidoNuevo = "AB5PB";
				  }else{
					  if(alto <= 240){
						  codigo = "NB138";
						  cogidoNuevo = "AB5PB";
					  }else{
						  if(alto <= 250){
							  codigo = "NB139";
							  cogidoNuevo = "AB5PB";
						  }else{
							  if(alto <= 260){
								  codigo = "NB140";
								  cogidoNuevo = "AB5PB";
							  }   
						  }
					  }
				  }
				  costado = 0.2;
		          costado1 = 0.6;
		          p = 5;
				  h1 = 1;
				  h2 = 2;
				  h = 3;
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
				  
			  }else{
				  if(alto <= 230){
					  codigo = "NB141";
					  cogidoNuevo = "AB5PC";
				  }else{
					  if(alto <= 240){
						  codigo = "NB142";
						  cogidoNuevo = "AB5PC";
					  }else{
						  if(alto <= 250){
							  codigo = "NB143";
							  cogidoNuevo = "AB5PC";
						  }else{
							  if(alto <= 260){
								  codigo = "NB144";
								  cogidoNuevo = "AB5PC";
							  }   
						  }
					  }
				  }
				  costado = 0.4;
		          costado1 = 0.8; 
		          p = 5;
				  h1 = 1;
				  h2 = 2;
				  h = 3;
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
			  }
		  }
		  break;
	  case valorAncho <= 2500:
		  armario = 5;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB145";
				  cogidoNuevo = "AB5PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB146";
					  cogidoNuevo = "AB5PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB147";
						  cogidoNuevo = "AB5PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB148";
							  cogidoNuevo = "AB5PA";
						  }   
					  }
				  }
			  }
	          costado = 0.4;
	          costado1 = 0.6;
	          p = 5;
			  h1 = 1;
			  h2 = 2;
			  h = 3;
			  var objPuer2 = {
					  "interior": 1,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador": "none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"block"});
		  }else{
			  if(tipo == 2){
				  if(alto <= 230){
					  codigo = "NB149";
					  cogidoNuevo = "AB5PB";
				  }else{
					  if(alto <= 240){
						  codigo = "NB150";
						  cogidoNuevo = "AB5PB";
					  }else{
						  if(alto <= 250){
							  codigo = "NB151";
							  cogidoNuevo = "AB5PB";
						  }else{
							  if(alto <= 260){
								  codigo = "NB152";
								  cogidoNuevo = "AB5PB";
							  }   
						  }
					  }
				  }
				  costado = 0.2;
		          costado1 = 0.6;
		          p = 5;
				  h1 = 1;
				  h2 = 2;
				  h = 3;
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
				  
			  }else{
				  if(alto <= 230){
					  codigo = "NB153";
					  cogidoNuevo = "AB5PC";
				  }else{
					  if(alto <= 240){
						  codigo = "NB154";
						  cogidoNuevo = "AB5PC";
					  }else{
						  if(alto <= 250){
							  codigo = "NB155";
							  cogidoNuevo = "AB5PC";
						  }else{
							  if(alto <= 260){
								  codigo = "NB156";
								  cogidoNuevo = "AB5PC";
							  }   
						  }
					  }
				  }
				  costado = 0.4;
		          costado1 = 0.8;
		          p = 5;
				  h1 = 1;
				  h2 = 2;
				  h = 3;
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
			  }
		  }
		  break;
	  case valorAncho <= 2600:
		  armario = 6;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB157";
				  cogidoNuevo = "AB6PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB158";
					  cogidoNuevo = "AB6PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB159";
						  cogidoNuevo = "AB6PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB160";
							  cogidoNuevo = "AB6PA";
						  }   
					  }
				  }
			  }
	          costado = 0.333;
	          costado1 = 0.666;
	          p = 6;
			  h1 = 0;
			  h2 = 3;
			  h = 3;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }else{
			  if(alto <= 230){
				  codigo = "NB161";
				  cogidoNuevo = "AB6PB";
			  }else{
				  if(alto <= 240){
					  codigo = "NB162";
					  cogidoNuevo = "AB6PB";
				  }else{
					  if(alto <= 250){
						  codigo = "NB163";
						  cogidoNuevo = "AB6PB";
					  }else{
						  if(alto <= 260){
							  codigo = "NB164";
							  cogidoNuevo = "AB6PB";
						  }   
					  }
				  }
			  }
			  costado = 0.166;
	          costado1 = 0.498;
	          costado1 = 0.83;
	          p = 6;
			  h1 = 2;
			  h2 = 2;
			  h = 4;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  arrayPuertas[3] = objPuer4;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <= 2700:
		  armario = 6;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB165";
				  cogidoNuevo = "AB6PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB166";
					  cogidoNuevo = "AB6PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB167";
						  cogidoNuevo = "AB6PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB168";
							  cogidoNuevo = "AB6PA";
						  }   
					  }
				  }
			  }
	          costado = 0.333;
	          costado1 = 0.666;
	          p = 6;
			  h1 = 0;
			  h2 = 3;
			  h = 3;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }else{
			  if(alto <= 230){
				  codigo = "NB169";
				  cogidoNuevo = "AB6PB";
			  }else{
				  if(alto <= 240){
					  codigo = "NB170";
					  cogidoNuevo = "AB6PB";
				  }else{
					  if(alto <= 250){
						  codigo = "NB171";
						  cogidoNuevo = "AB6PB";
					  }else{
						  if(alto <= 260){
							  codigo = "NB172";
							  cogidoNuevo = "AB6PB";
						  }   
					  }
				  }
			  }
			  costado = 0.166;
	          costado1 = 0.498;
	          costado1 = 0.83;
	          p = 6;
			  h1 = 2;
			  h2 = 2;
			  h = 4;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  arrayPuertas[3] = objPuer4;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <= 2800:
		  armario = 6;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB173";
				  cogidoNuevo = "AB6PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB174";
					  cogidoNuevo = "AB6PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB175";
						  cogidoNuevo = "AB6PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB176";
							  cogidoNuevo = "AB6PA";
						  }   
					  }
				  }
			  }
	          costado = 0.333;
	          costado1 = 0.666;
	          p = 6;
			  h1 = 0;
			  h2 = 3;
			  h = 3;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }else{
			  if(alto <= 230){
				  codigo = "NB177";
				  cogidoNuevo = "AB6PB";
			  }else{
				  if(alto <= 240){
					  codigo = "NB178";
					  cogidoNuevo = "AB6PB";
				  }else{
					  if(alto <= 250){
						  codigo = "NB179";
						  cogidoNuevo = "AB6PB";
					  }else{
						  if(alto <= 260){
							  codigo = "NB180";
							  cogidoNuevo = "AB6PB";
						  }   
					  }
				  }
			  }
			  costado = 0.166;
	          costado1 = 0.498;
	          costado1 = 0.83;
	          p = 6;
			  h1 = 2;
			  h2 = 2;
			  h = 4;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  arrayPuertas[3] = objPuer4;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <= 2900:
		  armario = 6;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB181";
				  cogidoNuevo = "AB6PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB182";
					  cogidoNuevo = "AB6PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB183";
						  cogidoNuevo = "AB6PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB184";
							  cogidoNuevo = "AB6PA";
						  }   
					  }
				  }
			  }
	          costado = 0.333;
	          costado1 = 0.666;
	          p = 6;
			  h1 = 0;
			  h2 = 3;
			  h = 3;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }else{
			  if(alto <= 230){
				  codigo = "NB185";
				  cogidoNuevo = "AB6PB";
			  }else{
				  if(alto <= 240){
					  codigo = "NB186";
					  cogidoNuevo = "AB6PB";
				  }else{
					  if(alto <= 250){
						  codigo = "NB187";
						  cogidoNuevo = "AB6PB";
					  }else{
						  if(alto <= 260){
							  codigo = "NB188";
							  cogidoNuevo = "AB6PB";
						  }   
					  }
				  }
			  }
			  costado = 0.166;
	          costado1 = 0.498;
	          costado1 = 0.83;
	          p = 6;
			  h1 = 2;
			  h2 = 2;
			  h = 4;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  arrayPuertas[3] = objPuer4;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <= 3000:
		  armario = 6;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB189";
				  cogidoNuevo = "AB6PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB190";
					  cogidoNuevo = "AB6PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB191";
						  cogidoNuevo = "AB6PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB192";
							  cogidoNuevo = "AB6PA";
						  }   
					  }
				  }
			  }
	          costado = 0.333;
	          costado1 = 0.666;
	          p = 6;
			  h1 = 0;
			  h2 = 3;
			  h = 3;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }else{
			  if(alto <= 230){
				  codigo = "NB193";
				  cogidoNuevo = "AB6PB";
			  }else{
				  if(alto <= 240){
					  codigo = "NB194";
					  cogidoNuevo = "AB6PB";
				  }else{
					  if(alto <= 250){
						  codigo = "NB195";
						  cogidoNuevo = "AB6PB";
					  }else{
						  if(alto <= 260){
							  codigo = "NB196";
							  cogidoNuevo = "AB6PB";
						  }   
					  }
				  }
			  }
			  costado = 0.166;
	          costado1 = 0.498;
	          costado1 = 0.83;
	          p = 6;
			  h1 = 2;
			  h2 = 2;
			  h = 4;
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "simple",
					  "material": ["blanco","blanco"],
				      "tirador":"none"
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  arrayPuertas[3] = objPuer4;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
	          
		  }
		  break;
	  case valorAncho <= 3100:
		  armario = 7;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB197";
				  cogidoNuevo = "AB7PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB198";
					  cogidoNuevo = "AB7PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB199";
						  cogidoNuevo = "AB7PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB200";
							  cogidoNuevo = "AB7PA";
						  }   
					  }
				  }
			  }
	          costado = 0.29;
	          costado1 = 0.43;
	          costado2 = 0.71;
	          p = 7;
			  h1 = 1;
			  h2 = 3;
			  h = 4;
			  var objPuer2 = {
					  "interior": 1,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  arrayPuertas[3] = objPuer4;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"block"});
		  }else{
			  if(tipo == 2){
				  if(alto <= 230){
					  codigo = "NB201";
					  cogidoNuevo = "AB7PB";
				  }else{
					  if(alto <= 240){
						  codigo = "NB202";
						  cogidoNuevo = "AB7PB";
					  }else{
						  if(alto <= 250){
							  codigo = "NB203";
							  cogidoNuevo = "AB7PB";
						  }else{
							  if(alto <= 260){
								  codigo = "NB204";
								  cogidoNuevo = "AB7PB";
							  }   
						  }
					  }
				  }
				  costado = 0.14;
		          costado1 = 0.43;
		          costado2 = 0.71;
		          p = 7;
				  h1 = 1;
				  h2 = 3;
				  h = 4;
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer4 = {
						  "interior": 3,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  arrayPuertas[3] = objPuer4;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
				  
			  }else{
				  if(alto <= 230){
					  codigo = "NB205";
					  cogidoNuevo = "AB7PC";
				  }else{
					  if(alto <= 240){
						  codigo = "NB206";
						  cogidoNuevo = "AB7PC";
					  }else{
						  if(alto <= 250){
							  codigo = "NB207";
							  cogidoNuevo = "AB7PC";
						  }else{
							  if(alto <= 260){
								  codigo = "NB208";
								  cogidoNuevo = "AB7PC";
							  }   
						  }
					  }
				  }
				  costado = 0.29;
		          costado1 = 0.57;
		          costado2 = 0.86;
		          p = 7;
				  h1 = 1;
				  h2 = 3;
				  h = 4;
				  var objPuer4 = {
						  "interior": 3,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  arrayPuertas[3] = objPuer4;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
			  }
		  }
		  break;
	  case valorAncho <= 3200:
		  armario = 7;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB209";
				  cogidoNuevo = "AB7PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB210";
					  cogidoNuevo = "AB7PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB211";
						  cogidoNuevo = "AB7PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB212";
							  cogidoNuevo = "AB7PA";
						  }   
					  }
				  }
			  }
	          costado = 0.29;
	          costado1 = 0.43;
	          costado2 = 0.71;
	          p = 7;
			  h1 = 1;
			  h2 = 3;
			  h = 4;
			  var objPuer2 = {
					  "interior": 1,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  arrayPuertas[3] = objPuer4;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"block"});
		  }else{
			  if(tipo == 2){
				  if(alto <= 230){
					  codigo = "NB213";
					  cogidoNuevo = "AB7PB";
				  }else{
					  if(alto <= 240){
						  codigo = "NB214";
						  cogidoNuevo = "AB7PB";
					  }else{
						  if(alto <= 250){
							  codigo = "NB215";
							  cogidoNuevo = "AB7PB";
						  }else{
							  if(alto <= 260){
								  codigo = "NB216";
								  cogidoNuevo = "AB7PB";
							  }   
						  }
					  }
				  }
				  costado = 0.14;
		          costado1 = 0.43;
		          costado2 = 0.71;
		          p = 7;
				  h1 = 1;
				  h2 = 3;
				  h = 4;
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer4 = {
						  "interior": 3,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  arrayPuertas[3] = objPuer4;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
				  
			  }else{
				  if(alto <= 230){
					  codigo = "NB217";
					  cogidoNuevo = "AB7PC";
				  }else{
					  if(alto <= 240){
						  codigo = "NB218";
						  cogidoNuevo = "AB7PC";
					  }else{
						  if(alto <= 250){
							  codigo = "NB219";
							  cogidoNuevo = "AB7PC";
						  }else{
							  if(alto <= 260){
								  codigo = "NB220";
								  cogidoNuevo = "AB7PC";
							  }   
						  }
					  }
				  }
				  costado = 0.29;
		          costado1 = 0.57;
		          costado2 = 0.86; 
		          p = 7;
				  h1 = 1;
				  h2 = 3;
				  h = 4;
				  var objPuer4 = {
						  "interior": 3,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  arrayPuertas[3] = objPuer4;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
			  }
		  }
		  break;
	  case valorAncho <= 3300:
		  armario = 7;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB221";
				  cogidoNuevo = "AB7PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB222";
					  cogidoNuevo = "AB7PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB223";
						  cogidoNuevo = "AB7PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB224";
							  cogidoNuevo = "AB7PA";
						  }   
					  }
				  }
			  }
	          costado = 0.29;
	          costado1 = 0.43;
	          costado2 = 0.71;
	          p = 7;
			  h1 = 1;
			  h2 = 3;
			  h = 4;
			  var objPuer2 = {
					  "interior": 1,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  arrayPuertas[3] = objPuer4;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"block"});
		  }else{
			  if(tipo == 2){
				  if(alto <= 230){
					  codigo = "NB225";
					  cogidoNuevo = "AB7PB";
				  }else{
					  if(alto <= 240){
						  codigo = "NB226";
						  cogidoNuevo = "AB7PB";
					  }else{
						  if(alto <= 250){
							  codigo = "NB227";
							  cogidoNuevo = "AB7PB";
						  }else{
							  if(alto <= 260){
								  codigo = "NB228";
								  cogidoNuevo = "AB7PB";
							  }   
						  }
					  }
				  }
				  costado = 0.14;
		          costado1 = 0.43;
		          costado2 = 0.71;
		          p = 7;
				  h1 = 1;
				  h2 = 3;
				  h = 4;
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer4 = {
						  "interior": 3,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  arrayPuertas[3] = objPuer4;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
				  
			  }else{
				  if(alto <= 230){
					  codigo = "NB229";
					  cogidoNuevo = "AB7PC";
				  }else{
					  if(alto <= 240){
						  codigo = "NB230";
						  cogidoNuevo = "AB7PC";
					  }else{
						  if(alto <= 250){
							  codigo = "NB231";
							  cogidoNuevo = "AB7PC";
						  }else{
							  if(alto <= 260){
								  codigo = "NB232";
								  cogidoNuevo = "AB7PC";
							  }   
						  }
					  }
				  }
				  costado = 0.29;
		          costado1 = 0.57;
		          costado2 = 0.86; 
		          p = 7;
				  h1 = 1;
				  h2 = 3;
				  h = 4;
				  var objPuer4 = {
						  "interior": 3,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  arrayPuertas[3] = objPuer4;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
			  }
		  }
		  break;
	  case valorAncho <= 3400:
		  armario = 7;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB233";
				  cogidoNuevo = "AB7PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB234";
					  cogidoNuevo = "AB7PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB235";
						  cogidoNuevo = "AB7PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB236";
							  cogidoNuevo = "AB7PA";
						  }   
					  }
				  }
			  }
	          costado = 0.29;
	          costado1 = 0.43;
	          costado2 = 0.71;
	          p = 7;
			  h1 = 1;
			  h2 = 3;
			  h = 4;
			  var objPuer2 = {
					  "interior": 1,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  arrayPuertas[3] = objPuer4;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"block"});
		  }else{
			  if(tipo == 2){
				  if(alto <= 230){
					  codigo = "NB237";
					  cogidoNuevo = "AB7PB";
				  }else{
					  if(alto <= 240){
						  codigo = "NB238";
						  cogidoNuevo = "AB7PB";
					  }else{
						  if(alto <= 250){
							  codigo = "NB239";
							  cogidoNuevo = "AB7PB";
						  }else{
							  if(alto <= 260){
								  codigo = "NB240";
								  cogidoNuevo = "AB7PB";
							  }   
						  }
					  }
				  }
				  costado = 0.14;
		          costado1 = 0.43;
		          costado2 = 0.71;
		          p = 7;
				  h1 = 1;
				  h2 = 3;
				  h = 4;
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer4 = {
						  "interior": 3,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  arrayPuertas[3] = objPuer4;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
				  
			  }else{
				  if(alto <= 230){
					  codigo = "NB241";
					  cogidoNuevo = "AB7PC";
				  }else{
					  if(alto <= 240){
						  codigo = "NB242";
						  cogidoNuevo = "AB7PC";
					  }else{
						  if(alto <= 250){
							  codigo = "NB243";
							  cogidoNuevo = "AB7PC";
						  }else{
							  if(alto <= 260){
								  codigo = "NB244";
								  cogidoNuevo = "AB7PC";
							  }   
						  }
					  }
				  }
				  costado = 0.29;
		          costado1 = 0.57;
		          costado2 = 0.86; 
		          p = 7;
				  h1 = 1;
				  h2 = 3;
				  h = 4;
				  var objPuer4 = {
						  "interior": 3,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  arrayPuertas[3] = objPuer4;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
			  }
		  }
		  break;
	  case valorAncho <= 3500:
		  armario = 7;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB245";
				  cogidoNuevo = "AB7PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB246";
					  cogidoNuevo = "AB7PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB247";
						  cogidoNuevo = "AB7PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB248";
							  cogidoNuevo = "AB7PA";
						  }   
					  }
				  }
			  }
	          costado = 0.29;
	          costado1 = 0.43;
	          costado2 = 0.71;
	          p = 7;
			  h1 = 1;
			  h2 = 3;
			  h = 4;
			  var objPuer2 = {
					  "interior": 1,
					  "tipo": "simple",
				      "material": "blanco",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  arrayPuertas[3] = objPuer4;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"block"});
		  }else{
			  if(tipo == 2){
				  if(alto <= 230){
					  codigo = "NB249";
					  cogidoNuevo = "AB7PB";
				  }else{
					  if(alto <= 240){
						  codigo = "NB250";
						  cogidoNuevo = "AB7PB";
					  }else{
						  if(alto <= 250){
							  codigo = "NB251";
							  cogidoNuevo = "AB7PB";
						  }else{
							  if(alto <= 260){
								  codigo = "NB252";
								  cogidoNuevo = "AB7PB";
							  }   
						  }
					  }
				  }
				  costado = 0.14;
		          costado1 = 0.43;
		          costado2 = 0.71;
		          p = 7;
				  h1 = 1;
				  h2 = 3;
				  h = 4;
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer4 = {
						  "interior": 3,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  arrayPuertas[3] = objPuer4;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
			  }else{
				  if(alto <= 230){
					  codigo = "NB253";
					  cogidoNuevo = "AB7PC";
				  }else{
					  if(alto <= 240){
						  codigo = "NB254";
						  cogidoNuevo = "AB7PC";
					  }else{
						  if(alto <= 250){
							  codigo = "NB255";
							  cogidoNuevo = "AB7PC";
						  }else{
							  if(alto <= 260){
								  codigo = "NB256";
								  cogidoNuevo = "AB7PC";
							  }   
						  }
					  }
				  }
				  costado = 0.29;
		          costado1 = 0.57;
		          costado2 = 0.86;
		          p = 7;
				  h1 = 1;
				  h2 = 3;
				  h = 4;
				  var objPuer4 = {
						  "interior": 3,
						  "tipo": "simple",
					      "material": "blanco",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
						  "material": ["blanco","blanco"],
					      "tirador":["none","none"]
				  }
				  arrayPuertas[0] = objPuer1;
				  arrayPuertas[1] = objPuer2;
				  arrayPuertas[2] = objPuer3;
				  arrayPuertas[3] = objPuer4;
				  $("#opcionSliderDiv1").css({"display":"block"});
				  $("#opcionSliderDiv2").css({"display":"block"});
				  $("#opcionSliderDiv3").css({"display":"block"});
			  }
		  }
		  break;
	  case valorAncho <= 3600:
		  armario = 8;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB257";
				  cogidoNuevo = "AB8PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB258";
					  cogidoNuevo = "AB8PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB259";
						  cogidoNuevo = "AB8PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB260";
							  cogidoNuevo = "AB8PA";
						  }   
					  }
				  }
			  }
	          costado = 0.25;
	          costado1 = 0.5;
	          costado2 = 0.75;
	          p = 8;
			  h1 = 0;
			  h2 = 4;
			  h = 4;
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  arrayPuertas[3] = objPuer4;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"none"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <= 3700:
		  armario = 8;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB261";
				  cogidoNuevo = "AB8PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB262";
					  cogidoNuevo = "AB8PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB263";
						  cogidoNuevo = "AB8PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB264";
							  cogidoNuevo = "AB8PA";
						  }   
					  }
				  }
			  }
	          costado = 0.25;
	          costado1 = 0.5;
	          costado2 = 0.75;
	          p = 8;
			  h1 = 0;
			  h2 = 4;
			  h = 4;
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  arrayPuertas[3] = objPuer4;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"none"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <= 3800:
		  armario = 8;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB265";
				  cogidoNuevo = "AB8PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB266";
					  cogidoNuevo = "AB8PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB267";
						  cogidoNuevo = "AB8PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB268";
							  cogidoNuevo = "AB8PA";
						  }   
					  }
				  }
			  }
	          costado = 0.25;
	          costado1 = 0.5;
	          costado2 = 0.75;
	          p = 8;
			  h1 = 0;
			  h2 = 4;
			  h = 4;
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  arrayPuertas[3] = objPuer4;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"none"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <= 3900:
		  armario = 8;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB269";
				  cogidoNuevo = "AB8PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB270";
					  cogidoNuevo = "AB8PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB271";
						  cogidoNuevo = "AB8PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB272";
							  cogidoNuevo = "AB8PA";
						  }   
					  }
				  }
			  }
	          costado = 0.25;
	          costado1 = 0.5;
	          costado2 = 0.75;
	          p = 8;
			  h1 = 0;
			  h2 = 4;
			  h = 4;
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  arrayPuertas[3] = objPuer4;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"none"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
	  case valorAncho <= 4000:
		  armario = 8;
		  if(tipo == 1){
			  if(alto <= 230){
				  codigo = "NB273";
				  cogidoNuevo = "AB8PA";
			  }else{
				  if(alto <= 240){
					  codigo = "NB274";
					  cogidoNuevo = "AB8PA";
				  }else{
					  if(alto <= 250){
						  codigo = "NB275";
						  cogidoNuevo = "AB8PA";
					  }else{
						  if(alto <= 260){
							  codigo = "NB276";
							  cogidoNuevo = "AB8PA";
						  }   
					  }
				  }
			  }
	          costado = 0.25;
	          costado1 = 0.5;
	          costado2 = 0.75;
	          p = 8;
			  h1 = 0;
			  h2 = 4;
			  h = 4;
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
					  "material": ["blanco","blanco"],
				      "tirador":["none","none"]
			  }
			  arrayPuertas[0] = objPuer1;
			  arrayPuertas[1] = objPuer2;
			  arrayPuertas[2] = objPuer3;
			  arrayPuertas[3] = objPuer4;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"none"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }
		  break;
  }
  console.log("Costado : " +costado);
  console.log("Costado1 : " +costado1);
  console.log("Costado2 : " +costado2);
  if(costado < 1){
	  costado = valorAncho * costado;
  }
  if(costado1 != undefined){
	  costado1 = valorAncho * costado1;
  }
  if(costado2 != undefined){
	  costado2 = valorAncho * costado2;
  }
  var posint1 = 0;
  var posint2 = 0;
  posint1 = (valorAncho -12 -2*p)/p-17;
  posint2 = (valorAncho - 38-(h-1)*e-h1*posint1)/h2;
  console.log("pos 1 : " +posint1);
  console.log("pos 2 : " +posint2);
  
  var object = {};
  var array = [];
  array[0] = 0;
  if(armario == 1){
	  array[array.length] = (valorAncho - 19) ;
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
  }
  if(armario == 2){
	  array[array.length] = (valorAncho - 19) ;
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
  }
  if(armario == 3){
	  if(tipo == 1){
		  array[1] = (posint1 + 19);
	  }else{
		  array[1] = (posint2 + 19);
	  }
	  array[array.length] = (valorAncho - 19) ;
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
  }
  if(armario == 4){
	  if(tipo == 1){
		  array[1] = (posint2 + 19);
	  }else{
		  array[1] = (posint1 + 19);
		  array[2] = (array[1]+ (posint2 + 19));
	  }
	  array[array.length] = (valorAncho - 19) ;
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
  }
  if(armario == 5){
	  if(tipo == 1){
		  array[1] = (posint2 + 19);
		  array[2] = (array[1]+ (posint1 + 19));
	  }else{
		  if(tipo == 2){
			  array[1] = (posint1 + 19);
			  array[2] = (array[1]+ (posint2 + 19));
		  }else{
			  array[1] = (posint2 + 19);
			  array[2] = (array[1]+ (posint2 + 19));
		  }
	  }
	  array[array.length] = (valorAncho - 19) ;
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
  }
  if(armario == 6){
	  if(tipo == 1){
		  array[1] = (posint2 + 19);
		  array[2] = (array[1]+ (posint2 + 19));
	  }else{
		  if(tipo == 2){
			  array[1] = (posint1 + 19);
			  array[2] = (array[1]+ (posint2 + 19));
			  array[3] = (array[2]+ (posint2 + 19));
		  }
	  }
	  array[array.length] = (valorAncho - 19) ;
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
  }
  if(armario == 7){
	  if(tipo == 1){
		  array[1] = (posint2 + 19);
		  array[2] = (array[1]+ (posint1 + 19));
		  array[3] = (array[2]+ (posint2 + 19));
	  }else{
		  if(tipo == 2){
			  array[1] = (posint1 + 19);
			  array[2] = (array[1]+ (posint2 + 19));
			  array[3] = (array[2]+ (posint2 + 19));
		  }else{
			  array[1] = (posint2 + 19);
			  array[2] = (array[1]+ (posint2 + 19));
			  array[3] = (array[2]+ (posint2 + 19));
		  }
	  }
	  array[array.length] = (valorAncho - 19) ;
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_6"]);
  }
  if(armario == 8){
	  
		  array[1] = (posint2 + 19);
		  array[2] = (array[1]+ (posint2 + 19));
		  array[3] = (array[2]+ (posint2 + 19));
	  
	  array[array.length] = (valorAncho - 19) ;
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_6"]);
	  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_7"]);
  }
  /**
  if(costado != undefined && costado != 0){
	  array[1] = costado;
  }
  if(costado1 != undefined && costado1 != 0){
	  array[2] = costado1;
  }
  if(costado2 != undefined && costado2 != 0){
	  array[3] = costado2;
  }
  if(costadoFinal != undefined && costadoFinal != 0){
	  array[array.length] = costadoFinal;
  }
  **/
  object = window.todounarmario;
  
  /**
  if(object.estantes != undefined){
	  if(h == 1){
		  if(window.estantes0.length != 0){
			  object.estantes[0] = window.estantes0;
		  }
		  object.estantes[1] = [];
		  object.estantes[2] = [];
		  object.estantes[3] = [];
	  }
	  if(h == 2){
		  if(armario == 3){
			  if(tipo == 1){
				var numInteriores =  $("#inputInterior0").text();
				if(numInteriores != "interior 2" && numInteriores != "interior 7" && numInteriores != "interior 15" && numInteriores != "interior 16" && numInteriores != "interior 17" && numInteriores != "interior 18" && numInteriores != "interior 19" && numInteriores != "interior 20" && numInteriores != "interior 21"){
					if(window.estantes0.length != 0){
						  object.estantes[0] = window.estantes0;
					  }
					 if(window.estantes1.length != 0){
						  object.estantes[1] = window.estantes1;
					  }
					  object.estantes[2] = [];
					  object.estantes[3] = [];
				}else{
					window.estantes0 = [];
					object.estantes[0] = [];
					 if(window.estantes1.length != 0){
						  object.estantes[1] = window.estantes1;
					  }
					object.estantes[2] = [];
					object.estantes[3] = [];
				}
			  }
			  if(tipo == 2){
				  var numInteriores =  $("#inputInterior1").text();
					if(numInteriores != "interior 2" && numInteriores != "interior 7" && numInteriores != "interior 15" && numInteriores != "interior 16" && numInteriores != "interior 17" && numInteriores != "interior 18" && numInteriores != "interior 19" && numInteriores != "interior 20" && numInteriores != "interior 21"){
						if(window.estantes1.length != 0){
							  object.estantes[1] = window.estantes1;
						  }
						if(window.estantes0.length != 0){
							  object.estantes[0] = window.estantes0;
						  }
						  object.estantes[2] = [];
						  object.estantes[3] = [];
					}else{
						window.estantes1 = [];
						object.estantes[1] = [];
						 if(window.estantes0.length != 0){
							  object.estantes[0] = window.estantes0;
						  }
						object.estantes[2] = [];
						object.estantes[3] = [];
					}
			  }
		  }else{
			  if(window.estantes0.length != 0){
				  object.estantes[0] = window.estantes0;
			  }
			  if(window.estantes1.length != 0){
				  object.estantes[1] = window.estantes1;
			  }
			  object.estantes[2] = [];
			  object.estantes[3] = [];
		  }
		  
	  }
	  if(h == 3){
		  if(armario == 4){
			  if(tipo == 2){
				  var numInteriores =  $("#inputInterior0").text();
					if(numInteriores != "interior 2" && numInteriores != "interior 7" && numInteriores != "interior 15" && numInteriores != "interior 16" && numInteriores != "interior 17" && numInteriores != "interior 18" && numInteriores != "interior 19" && numInteriores != "interior 20" && numInteriores != "interior 21"){
						if(window.estantes1.length != 0){
							  object.estantes[1] = window.estantes1;
						  }
						if(window.estantes0.length != 0){
							  object.estantes[0] = window.estantes0;
						  }
						if(window.estantes2.length != 0){
							  object.estantes[2] = window.estantes2;
						  }
						  object.estantes[3] = [];
					}else{
						window.estantes0 = [];
						object.estantes[0] = [];
						 if(window.estantes1.length != 0){
							  object.estantes[1] = window.estantes1;
						  }
						 if(window.estantes2.length != 0){
							  object.estantes[2] = window.estantes2;
						  }
						object.estantes[3] = [];
					}
			  }
		  }else{
			  if(window.estantes0.length != 0){
				  object.estantes[0] = window.estantes0;
			  }
			  if(window.estantes1.length != 0){
				  object.estantes[1] = window.estantes1;
			  }
			  if(window.estantes2.length != 0){
				  object.estantes[2] = window.estantes2;
			  }
			  object.estantes[3] = [];
		  }
		  
	  }
	  if(h == 4){
		  if(window.estantes0.length != 0){
			  object.estantes[0] = window.estantes0;
		  }
		  if(window.estantes1.length != 0){
			  object.estantes[1] = window.estantes1;
		  }
		  if(window.estantes2.length != 0){
			  object.estantes[2] = window.estantes2;
		  }
		  if(window.estantes3.length != 0){
			  object.estantes[3] = window.estantes3;
		  }
	  }
  }
  
  if(object.cajones != undefined){
	  if(h == 1){
		  if(window.cajones0.length != 0){
			  object.cajones[0] = window.cajones0;
		  }
		  object.cajones[1] = [];
		  object.cajones[2] = [];
		  object.cajones[3] = [];
	  }
	  if(h == 2){
		  if(window.cajones0.length != 0){
			  object.cajones[0] = window.cajones0;
		  }
		  if(window.cajones1.length != 0){
			  object.cajones[1] = window.cajones1;
		  }
		  object.cajones[2] = [];
		  object.cajones[3] = [];
	  }
	  if(h == 3){
		  if(window.cajones0.length != 0){
			  object.cajones[0] = window.cajones0;
		  }
		  if(window.cajones1.length != 0){
			  object.cajones[1] = window.cajones1;
		  }
		  if(window.cajones2.length != 0){
			  object.cajones[2] = window.cajones2;
		  }
		  object.cajones[3] = [];
	  }
	  if(h == 4){
		  if(window.cajones0.length != 0){
			  object.cajones[0] = window.cajones0;
		  }
		  if(window.cajones1.length != 0){
			  object.cajones[1] = window.cajones1;
		  }
		  if(window.cajones2.length != 0){
			  object.cajones[2] = window.cajones2;
		  }
		  if(window.cajones3.length != 0){
			  object.cajones[3] = window.cajones3;
		  }
	  }
  }
  if(object.tubos != undefined){
	  var arrayTub = [];
	  for(var p = 0;p<window.tuboArray.length;p++){
		  if(h == 1){
			  if(p == 0){
				  arrayTub[0] = window.tuboArray[p];
			  }
			  
		  }
		  if(h == 2){
			  if(p == 0){
				  arrayTub[0] = window.tuboArray[p];
			  }
			  if(p == 1){
				  arrayTub[1] = window.tuboArray[p];
			  }
		  }
		  if(h == 3){
			  if(p == 0){
				  arrayTub[0] = window.tuboArray[p];
			  }
			  if(p == 1){
				  arrayTub[1] = window.tuboArray[p];
			  }
			  if(p == 2){
				  arrayTub[2] = window.tuboArray[p];
			  }  
		  }
		  if(h == 4){
			  if(p == 0){
				  arrayTub[0] = window.tuboArray[p];
			  }
			  if(p == 1){
				  arrayTub[1] = window.tuboArray[p];
			  }
			  if(p == 2){
				  arrayTub[2] = window.tuboArray[p];
			  }
			  if(p == 3){
				  arrayTub[3] = window.tuboArray[p];
			  }  
		  }
	  }
	  object.tubos = arrayTub;
  }
  **/
  var costadosObject = {};
  var puertasObject = {};
  costadosObject["costados"] = array;
  puertasObject["puertas"] = arrayPuertas;
  object["costados"] = array;
  window.armario = armario;
  window.tipo = tipo;
  object["altura"] = alto * 10;
  object["codigoNuevo"] = cogidoNuevo;
  object["huecos"] = h;
  object["web"] = 1;
  object["fondo"] = fondo * 10;
  object["puertas"] = arrayPuertas;
  window.todounarmario = object;
  var parame = api.parameters.get({name :"CostadosJSON"}).data[0];
  var parame1 = api.parameters.get({name :"PuertasJSON"}).data[0];
  api.parameters.updateAsync([{
      id: parame.id,
      value: JSON.stringify(costadosObject)
    },{
        id: parame1.id,
        value: JSON.stringify(puertasObject)
      }]);
  
  window.puertas = puertasObject;
  
  $("#codigodepsArm"+ codigo)[0].click();
  console.log(JSON.stringify(object));
  
  $("#clicParaGuardarCodNuevo").attr("class",JSON.stringify(object));
  $("#clicParaGuardarCodNuevo")[0].click();
   
}



function pintarinterioresArmarioShape(array1,array2,array3,array4,cajones1,cajones2,cajones3,cajones4,tubo1,tubo2,tubo3,tubo4,cajonSuelo1,cajonSuelo2,cajonSuelo3,cajonSuelo4,camisero1,camisero2,camisero3,camisero4,arrayInterior){
	var arrayHueco1 = [];
	var arrayHueco2 = [];
	var arrayHueco3 = [];
	var arrayHueco4 = [];

	var armario = window.todounarmario;
	if(array1 != ""){
		arrayHueco1 = array1.split(",");
	}
	if(array2 != ""){
		arrayHueco2 = array2.split(",");
	}
	if(array3 != ""){
		arrayHueco3 = array3.split(",");
	}
	if(array4 != ""){ 
		arrayHueco4 = array4.split(",");
	}
	var arraytubo1 = [];
	var arraytubo2 = [];
	var arraytubo3 = [];
	var arraytubo4 = [];
	if(tubo1 != ""){
		arraytubo1 = tubo1.split(",");
	}
	if(tubo2 != ""){
		arraytubo2 = tubo2.split(",");
	}
	if(tubo3 != ""){
		arraytubo3 = tubo3.split(",");
	}
	if(tubo4 != ""){
		arraytubo4 = tubo4.split(",");
	}
	var estantes = [];
	estantes[0]=arrayHueco1;
	estantes[1]=arrayHueco2;
	estantes[2]=arrayHueco3;
	estantes[3]=arrayHueco4;
	var arrayCajones = [];
	arrayCajones[0] = JSON.parse(cajones1);
	arrayCajones[1] = JSON.parse(cajones2);
	arrayCajones[2] = JSON.parse(cajones3);
	arrayCajones[3] = JSON.parse(cajones4);
	var arrayCajonesSuelo = [];
	arrayCajonesSuelo[0] = JSON.parse(cajonSuelo1);
	arrayCajonesSuelo[1] = JSON.parse(cajonSuelo2);
	arrayCajonesSuelo[2] = JSON.parse(cajonSuelo3);
	arrayCajonesSuelo[3] = JSON.parse(cajonSuelo4);
	var arrayCamisero = [];
	arrayCamisero[0] = JSON.parse(camisero1);
	arrayCamisero[1] = JSON.parse(camisero2);
	arrayCamisero[2] = JSON.parse(camisero3);
	arrayCamisero[3] = JSON.parse(camisero4);
	var arrayTubo = [];
	var cont = 0;
	if(arraytubo1.length != 0){
		arrayTubo[cont] = arraytubo1;
		cont++;
	}
	if(arraytubo2.length != 0){
		arrayTubo[cont] = arraytubo2;
		cont++;
	}
	if(arraytubo3.length != 0){
		arrayTubo[cont] = arraytubo3;
		cont++;
	}
	if(arraytubo4.length != 0){
		arrayTubo[cont] = arraytubo4;
		cont++;
	}
	
	
	armario["estantes"] = estantes;
	armario["tubo"] = arrayTubo;
	armario["cajonesVolados"] = arrayCajones;
	armario["cajonesSuelo"] = arrayCajonesSuelo;
	armario["camisero"] = arrayCamisero;
	window.estantes0 = estantes[0];
	window.estantes1 = estantes[1];
	window.estantes2 = estantes[2];
	window.estantes3 = estantes[3];
	window.cajones0 = arrayCajones[0];
	window.cajones1 = arrayCajones[1];
	window.cajones2 = arrayCajones[2];
	window.cajones3 = arrayCajones[3];
	window.cajonesSuelo0 = arrayCajonesSuelo[0];
	window.cajonesSuelo1 = arrayCajonesSuelo[1];
	window.cajonesSuelo2 = arrayCajonesSuelo[2];
	window.cajonesSuelo3 = arrayCajonesSuelo[3];
	window.camisero0 = arrayCamisero[0];
	window.camisero1 = arrayCamisero[1];
	window.camisero2 = arrayCamisero[2];
	window.camisero3 = arrayCamisero[3];
	window.tuboArray = arrayTubo;
	window.todounarmario = armario;
	var parame = api.parameters.get({name :"armarioJSON"}).data[0];
	  api.parameters.updateAsync({
	      id: parame.id,
	      value: JSON.stringify(armario)
	    });
	  console.log(JSON.stringify(armario));
	  if(arrayCajones[0]["posicion"] != undefined){
		    var rangeSliderAdicional1 = document.getElementById("rs-range-lineAdicional10");
			$("#rs-range-lineAdicional10").attr(window.funcClic,"cambiarArmarioEstantes(1,0,1,0)");
			var inputDiv = document.querySelector('#inputDivAdi10');
			var w = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional1.style.width = "100%";
			var inputMin = rangeSliderAdicional1.getAttribute('min');
			var inputMax = rangeSliderAdicional1.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta = document.querySelector('#etiquetaAdi10');
			var ew = parseInt(window.getComputedStyle(etiqueta, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta.innerHTML = (rangeSliderAdicional1.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional1.value >= 190){
				etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional1.value >= 180){
					etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional1.value >= 170){
						etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional1.value >= 160){
							etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional1.value >= 150){
								etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional1.value >= 140){
									etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional1.value >= 130){
										etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional1.value >= 120){
											etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional1.value >= 110){
												etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional1.value >= 100){
													etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional1.value >= 90){
														etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional1.value >= 80){
															etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional1.value >= 70){
																etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional1.value >= 60){
																	etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional1.value >= 50){
																		etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional1.value >= 40){
																			etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (30))+"px";
																		}else{
																			etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
	  }
	  if(estantes[0].length != 0){
		  
		    var rangeSliderAdicional1 = document.getElementById("rs-range-lineAdicional10");
			$("#rs-range-lineAdicional10").attr(window.funcClic,"cambiarArmarioEstantes(1,0,1,0)");
			var inputDiv = document.querySelector('#inputDivAdi10');
			var w = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional1.style.width = "100%";
			var inputMin = rangeSliderAdicional1.getAttribute('min');
			var inputMax = rangeSliderAdicional1.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta = document.querySelector('#etiquetaAdi10');
			var ew = parseInt(window.getComputedStyle(etiqueta, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta.innerHTML = (rangeSliderAdicional1.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional1.value >= 190){
				etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional1.value >= 180){
					etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional1.value >= 170){
						etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional1.value >= 160){
							etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional1.value >= 150){
								etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional1.value >= 140){
									etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional1.value >= 130){
										etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional1.value >= 120){
											etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional1.value >= 110){
												etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional1.value >= 100){
													etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional1.value >= 90){
														etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional1.value >= 80){
															etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional1.value >= 70){
																etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional1.value >= 60){
																	etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional1.value >= 50){
																		etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional1.value >= 40){
																			etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (30))+"px";
																		}else{
																			etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional1.addEventListener('input',function(){
				var etihtml = $("#etiquetaAdi10").text();
				  var calcu = (parseFloat(rangeSliderAdicional1.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_0"],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_0"],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta.innerHTML =(rangeSliderAdicional1.value); 
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional1.value >= 190){
				etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional1.value >= 180){
					etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional1.value >= 170){
						etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional1.value >= 160){
							etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional1.value >= 150){
								etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional1.value >= 140){
									etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional1.value >= 130){
										etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional1.value >= 120){
											etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional1.value >= 110){
												etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional1.value >= 100){
													etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional1.value >= 90){
														etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional1.value >= 80){
															etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional1.value >= 70){
																etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional1.value >= 60){
																	etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional1.value >= 50){
																		etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional1.value >= 40){
																			etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (30))+"px";
																		}else{
																			etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
			var rangeSliderAdicional2 = document.getElementById("rs-range-lineAdicional20");
			$("#rs-range-lineAdicional20").attr("onmouseup","cambiarArmarioEstantes(1,1,2,0)");
			var inputDiv2 = document.querySelector('#inputDivAdi20');
			var w = parseInt(window.getComputedStyle(inputDiv2, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional2.style.width = "100%";
			var inputMin = rangeSliderAdicional2.getAttribute('min');
			var inputMax = rangeSliderAdicional2.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta2 = document.querySelector('#etiquetaAdi20');
			var ew = parseInt(window.getComputedStyle(etiqueta2, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta2.innerHTML = (rangeSliderAdicional2.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional2.value >= 190){
				etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional2.value >= 180){
					etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional2.value >= 170){
						etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional2.value >= 160){
							etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional2.value >= 150){
								etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional2.value >= 140){
									etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional2.value >= 130){
										etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional2.value >= 120){
											etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional2.value >= 110){
												etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional2.value >= 100){
													etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional2.value >= 90){
														etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional2.value >= 80){
															etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional2.value >= 70){
																etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional2.value >= 60){
																	etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional2.value >= 50){
																		etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional2.value >= 40){
																			etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (30))+"px";
																		}else{
																			etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional2.addEventListener('input',function(){
				var etihtml = $("#etiquetaAdi20").text();
				  var calcu = (parseFloat(rangeSliderAdicional2.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_1"],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_1"],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta2.innerHTML =(rangeSliderAdicional2.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional2.value >= 190){
				etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional2.value >= 180){
					etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional2.value >= 170){
						etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional2.value >= 160){
							etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional2.value >= 150){
								etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional2.value >= 140){
									etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional2.value >= 130){
										etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional2.value >= 120){
											etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional2.value >= 110){
												etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional2.value >= 100){
													etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional2.value >= 90){
														etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional2.value >= 80){
															etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional2.value >= 70){
																etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional2.value >= 60){
																	etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional2.value >= 50){
																		etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional2.value >= 40){
																			etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (30))+"px";
																		}else{
																			etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
			var rangeSliderAdicional3 = document.getElementById("rs-range-lineAdicional30");
			$("#rs-range-lineAdicional30").attr("onmouseup","cambiarArmarioEstantes(1,2,3,0)");
			var inputDiv3 = document.querySelector('#inputDivAdi30');
			var w = parseInt(window.getComputedStyle(inputDiv3, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional3.style.width = "100%";
			var inputMin = rangeSliderAdicional3.getAttribute('min');
			var inputMax = rangeSliderAdicional3.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta3 = document.querySelector('#etiquetaAdi30');
			var ew = parseInt(window.getComputedStyle(etiqueta3, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta3.innerHTML = (rangeSliderAdicional3.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional3.value >= 190){
				etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional3.value >= 180){
					etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional3.value >= 170){
						etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional3.value >= 160){
							etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional3.value >= 150){
								etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional3.value >= 140){
									etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional3.value >= 130){
										etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional3.value >= 120){
											etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional3.value >= 110){
												etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional3.value >= 100){
													etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional3.value >= 90){
														etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional3.value >= 80){
															etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional3.value >= 70){
																etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional3.value >= 60){
																	etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional3.value >= 50){
																		etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional3.value >= 40){
																			etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (30))+"px";
																		}else{
																			etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional3.addEventListener('input',function(){
				var etihtml = $("#etiquetaAdi30").text();
				  var calcu = (parseFloat(rangeSliderAdicional3.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_2"],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_2"],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta3.innerHTML =(rangeSliderAdicional3.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional3.value >= 190){
				etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional3.value >= 180){
					etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional3.value >= 170){
						etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional3.value >= 160){
							etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional3.value >= 150){
								etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional3.value >= 140){
									etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional3.value >= 130){
										etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional3.value >= 120){
											etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional3.value >= 110){
												etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional3.value >= 100){
													etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional3.value >= 90){
														etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional3.value >= 80){
															etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional3.value >= 70){
																etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional3.value >= 60){
																	etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional3.value >= 50){
																		etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional3.value >= 40){
																			etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (30))+"px";
																		}else{
																			etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
			var rangeSliderAdicional4 = document.getElementById("rs-range-lineAdicional40");
			$("#rs-range-lineAdicional40").attr("onmouseup","cambiarArmarioEstantes(1,3,4,0)");
			var inputDiv4 = document.querySelector('#inputDivAdi40');
			var w = parseInt(window.getComputedStyle(inputDiv4, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional4.style.width = "100%";
			var inputMin = rangeSliderAdicional4.getAttribute('min');
			var inputMax = rangeSliderAdicional4.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta4 = document.querySelector('#etiquetaAdi40');
			var ew = parseInt(window.getComputedStyle(etiqueta4, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta4.innerHTML = (rangeSliderAdicional4.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional4.value >= 190){
				etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional4.value >= 180){
					etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional4.value >= 170){
						etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional4.value >= 160){
							etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional4.value >= 150){
								etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional4.value >= 140){
									etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional4.value >= 130){
										etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional4.value >= 120){
											etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional4.value >= 110){
												etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional4.value >= 100){
													etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional4.value >= 90){
														etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional4.value >= 80){
															etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional4.value >= 70){
																etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional4.value >= 60){
																	etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional4.value >= 50){
																		etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional4.value >= 40){
																			etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (30))+"px";
																		}else{
																			etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional4.addEventListener('input',function(){
				var etihtml = $("#etiquetaAdi40").text();
				  var calcu = (parseFloat(rangeSliderAdicional4.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_3"],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_3"],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta4.innerHTML =(rangeSliderAdicional4.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional4.value >= 190){
				etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional4.value >= 180){
					etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional4.value >= 170){
						etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional4.value >= 160){
							etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional4.value >= 150){
								etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional4.value >= 140){
									etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional4.value >= 130){
										etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional4.value >= 120){
											etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional4.value >= 110){
												etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional4.value >= 100){
													etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional4.value >= 90){
														etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional4.value >= 80){
															etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional4.value >= 70){
																etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional4.value >= 60){
																	etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional4.value >= 50){
																		etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional4.value >= 40){
																			etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (30))+"px";
																		}else{
																			etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
			var rangeSliderAdicional5 = document.getElementById("rs-range-lineAdicional50");
			$("#rs-range-lineAdicional50").attr("onmouseup","cambiarArmarioEstantes(1,4,5,0)");
			var inputDiv5 = document.querySelector('#inputDivAdi50');
			var w = parseInt(window.getComputedStyle(inputDiv5, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional5.style.width = "100%";
			var inputMin = rangeSliderAdicional5.getAttribute('min');
			var inputMax = rangeSliderAdicional5.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta5 = document.querySelector('#etiquetaAdi50');
			var ew = parseInt(window.getComputedStyle(etiqueta5, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta5.innerHTML = (rangeSliderAdicional5.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional5.value >= 190){
				etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional5.value >= 180){
					etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional5.value >= 170){
						etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional5.value >= 160){
							etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional5.value >= 150){
								etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional5.value >= 140){
									etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional5.value >= 130){
										etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional5.value >= 120){
											etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional5.value >= 110){
												etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional5.value >= 100){
													etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional5.value >= 90){
														etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional5.value >= 80){
															etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional5.value >= 70){
																etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional5.value >= 60){
																	etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional5.value >= 50){
																		etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional5.value >= 40){
																			etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (30))+"px";
																		}else{
																			etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional5.addEventListener('input',function(){
				var etihtml = $("#etiquetaAdi50").text();
				  var calcu = (parseFloat(rangeSliderAdicional5.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_4"],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_4"],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta5.innerHTML =(rangeSliderAdicional5.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional5.value >= 190){
				etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional5.value >= 180){
					etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional5.value >= 170){
						etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional5.value >= 160){
							etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional5.value >= 150){
								etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional5.value >= 140){
									etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional5.value >= 130){
										etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional5.value >= 120){
											etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional5.value >= 110){
												etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional5.value >= 100){
													etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional5.value >= 90){
														etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional5.value >= 80){
															etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional5.value >= 70){
																etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional5.value >= 60){
																	etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional5.value >= 50){
																		etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional5.value >= 40){
																			etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (30))+"px";
																		}else{
																			etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
	  }
	  
	  if(estantes[1].length != 0){
		  
		    var rangeSliderAdicional6 = document.getElementById("rs-range-lineAdicional11");
			$("#rs-range-lineAdicional11").attr("onmouseup","cambiarArmarioEstantes(2,0,1,1)");
			var inputDiv = document.querySelector('#inputDivAdi11');
			var w = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional6.style.width = "100%";
			var inputMin = rangeSliderAdicional6.getAttribute('min');
			var inputMax = rangeSliderAdicional6.getAttribute('max');
			

			/* LA etiqueta6 */
			var etiqueta6 = document.querySelector('#etiquetaAdi11');
			var ew = parseInt(window.getComputedStyle(etiqueta6, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta6 (el tooltip) */
			etiqueta6.innerHTML = (rangeSliderAdicional6.value);
			/* calcula la posición inicial de la etiqueta6 (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional6.value >= 190){
				etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional6.value >= 180){
					etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional6.value >= 170){
						etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional6.value >= 160){
							etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional6.value >= 150){
								etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional6.value >= 140){
									etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional6.value >= 130){
										etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional6.value >= 120){
											etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional6.value >= 110){
												etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional6.value >= 100){
													etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional6.value >= 90){
														etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional6.value >= 80){
															etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional6.value >= 70){
																etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional6.value >= 60){
																	etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional6.value >= 50){
																		etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional6.value >= 40){
																			etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (30))+"px";
																		}else{
																			etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional6.addEventListener('input',function(){
				var estantes0 = window.estantes0;
				var num = estantes0.length - 1;
				if(num == -1){
					var sum = 2;
				}else{
					sum = 1;
				}
				var etihtml = $("#etiquetaAdi11").text();
				  var calcu = (parseFloat(rangeSliderAdicional6.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+sum)],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta6 (el tooltip) */
			etiqueta6.innerHTML =(rangeSliderAdicional6.value);
			/* cambia la posición de la etiqueta6 (el tooltip) */
			if(rangeSliderAdicional6.value >= 190){
				etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional6.value >= 180){
					etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional6.value >= 170){
						etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional6.value >= 160){
							etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional6.value >= 150){
								etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional6.value >= 140){
									etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional6.value >= 130){
										etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional6.value >= 120){
											etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional6.value >= 110){
												etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional6.value >= 100){
													etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional6.value >= 90){
														etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional6.value >= 80){
															etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional6.value >= 70){
																etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional6.value >= 60){
																	etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional6.value >= 50){
																		etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional6.value >= 40){
																			etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (30))+"px";
																		}else{
																			etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
			var rangeSliderAdicional7 = document.getElementById("rs-range-lineAdicional21");
			$("#rs-range-lineAdicional21").attr("onmouseup","cambiarArmarioEstantes(2,1,2,1)");
			var inputDiv2 = document.querySelector('#inputDivAdi21');
			var w = parseInt(window.getComputedStyle(inputDiv2, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional7.style.width = "100%";
			var inputMin = rangeSliderAdicional7.getAttribute('min');
			var inputMax = rangeSliderAdicional7.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta7 = document.querySelector('#etiquetaAdi21');
			var ew = parseInt(window.getComputedStyle(etiqueta7, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta7.innerHTML = (rangeSliderAdicional7.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional7.value >= 190){
				etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7)) + (90))+"px";
			}else{
				if(rangeSliderAdicional7.value >= 180){
					etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional7.value >= 170){
						etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional7.value >= 160){
							etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional7.value >= 150){
								etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional7.value >= 140){
									etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional7.value >= 130){
										etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional7.value >= 120){
											etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional7.value >= 110){
												etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional7.value >= 100){
													etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional7.value >= 90){
														etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional7.value >= 80){
															etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional7.value >= 70){
																etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional7.value >= 60){
																	etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional7.value >= 50){
																		etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional7.value >= 40){
																			etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (30))+"px";
																		}else{
																			etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional7.addEventListener('input',function(){
				var estantes0 = window.estantes0;
				var num = estantes0.length - 1;
				if(num == -1){
					var sum = 3;
				}else{
					sum = 2;
				}
				var etihtml = $("#etiquetaAdi21").text();
				  var calcu = (parseFloat(rangeSliderAdicional7.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+sum)],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
				etiqueta7.innerHTML =(rangeSliderAdicional7.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional7.value >= 190){
				etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional7.value >= 180){
					etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional7.value >= 170){
						etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional7.value >= 160){
							etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional7.value >= 150){
								etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional7.value >= 140){
									etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional7.value >= 130){
										etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional7.value >= 120){
											etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional7.value >= 110){
												etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional7.value >= 100){
													etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional7.value >= 90){
														etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional7.value >= 80){
															etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional7.value >= 70){
																etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional7.value >= 60){
																	etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional7.value >= 50){
																		etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional7.value >= 40){
																			etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (30))+"px";
																		}else{
																			etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			 
			var rangeSliderAdicional8 = document.getElementById("rs-range-lineAdicional31");
			$("#rs-range-lineAdicional31").attr("onmouseup","cambiarArmarioEstantes(2,2,3,1)");
			var inputDiv3 = document.querySelector('#inputDivAdi31');
			var w = parseInt(window.getComputedStyle(inputDiv3, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional8.style.width = "100%";
			var inputMin = rangeSliderAdicional8.getAttribute('min');
			var inputMax = rangeSliderAdicional8.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta8 = document.querySelector('#etiquetaAdi31');
			var ew = parseInt(window.getComputedStyle(etiqueta8, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta8.innerHTML = (rangeSliderAdicional8.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional8.value >= 190){
				etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional8.value >= 180){
					etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional8.value >= 170){
						etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional8.value >= 160){
							etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional8.value >= 150){
								etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional8.value >= 140){
									etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional8.value >= 130){
										etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional8.value >= 120){
											etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional8.value >= 110){
												etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional8.value >= 100){
													etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional8.value >= 90){
														etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional8.value >= 80){
															etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional8.value >= 70){
																etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional8.value >= 60){
																	etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional8.value >= 50){
																		etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional8.value >= 40){
																			etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (30))+"px";
																		}else{
																			etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional8.addEventListener('input',function(){
				var estantes0 = window.estantes0;
				var num = estantes0.length - 1;
				if(num == -1){
					var sum = 4;
				}else{
					sum = 3;
				}
				var etihtml = $("#etiquetaAdi31").text();
				  var calcu = (parseFloat(rangeSliderAdicional8.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+sum)],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
				  etiqueta8.innerHTML =(rangeSliderAdicional8.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional8.value >= 190){
				etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional8.value >= 180){
					etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional8.value >= 170){
						etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional8.value >= 160){
							etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional8.value >= 150){
								etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional8.value >= 140){
									etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional8.value >= 130){
										etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional8.value >= 120){
											etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional8.value >= 110){
												etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional8.value >= 100){
													etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional8.value >= 90){
														etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional8.value >= 80){
															etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional8.value >= 70){
																etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional8.value >= 60){
																	etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional8.value >= 50){
																		etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional8.value >= 40){
																			etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (30))+"px";
																		}else{
																			etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
			var rangeSliderAdicional9 = document.getElementById("rs-range-lineAdicional41");
			$("#rs-range-lineAdicional41").attr("onmouseup","cambiarArmarioEstantes(2,3,4,1)");
			var inputDiv4 = document.querySelector('#inputDivAdi41');
			var w = parseInt(window.getComputedStyle(inputDiv4, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional9.style.width = "100%";
			var inputMin = rangeSliderAdicional9.getAttribute('min');
			var inputMax = rangeSliderAdicional9.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta9 = document.querySelector('#etiquetaAdi41');
			var ew = parseInt(window.getComputedStyle(etiqueta9, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta9.innerHTML = (rangeSliderAdicional9.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional9.value >= 190){
				etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional9.value >= 180){
					etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional9.value >= 170){
						etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional9.value >= 160){
							etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional9.value >= 150){
								etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional9.value >= 140){
									etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional9.value >= 130){
										etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional9.value >= 120){
											etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional9.value >= 110){
												etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional9.value >= 100){
													etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional9.value >= 90){
														etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional9.value >= 80){
															etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional9.value >= 70){
																etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional9.value >= 60){
																	etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional9.value >= 50){
																		etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional9.value >= 40){
																			etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (30))+"px";
																		}else{
																			etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional9.addEventListener('input',function(){
				var estantes0 = window.estantes0;
				var num = estantes0.length - 1;
				if(num == -1){
					var sum = 5;
				}else{
					sum = 4;
				}
				var etihtml = $("#etiquetaAdi41").text();
				  var calcu = (parseFloat(rangeSliderAdicional9.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+sum)],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
				  etiqueta9.innerHTML =(rangeSliderAdicional9.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional9.value >= 190){
				etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional9.value >= 180){
					etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional9.value >= 170){
						etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional9.value >= 160){
							etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional9.value >= 150){
								etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional9.value >= 140){
									etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional9.value >= 130){
										etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional9.value >= 120){
											etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional9.value >= 110){
												etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional9.value >= 100){
													etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional9.value >= 90){
														etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional9.value >= 80){
															etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional9.value >= 70){
																etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional9.value >= 60){
																	etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional9.value >= 50){
																		etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional9.value >= 40){
																			etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (30))+"px";
																		}else{
																			etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
			var rangeSliderAdicional10 = document.getElementById("rs-range-lineAdicional51");
			$("#rs-range-lineAdicional51").attr("onmouseup","cambiarArmarioEstantes(2,4,5,1)");
			var inputDiv5 = document.querySelector('#inputDivAdi51');
			var w = parseInt(window.getComputedStyle(inputDiv5, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional10.style.width = "100%";
			var inputMin = rangeSliderAdicional10.getAttribute('min');
			var inputMax = rangeSliderAdicional10.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta10 = document.querySelector('#etiquetaAdi51');
			var ew = parseInt(window.getComputedStyle(etiqueta10, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta10.innerHTML = (rangeSliderAdicional10.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional10.value >= 190){
				etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional10.value >= 180){
					etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional10.value >= 170){
						etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional10.value >= 160){
							etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional10.value >= 150){
								etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional10.value >= 140){
									etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional10.value >= 130){
										etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional10.value >= 120){
											etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional10.value >= 110){
												etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional10.value >= 100){
													etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional10.value >= 90){
														etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional10.value >= 80){
															etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional10.value >= 70){
																etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional10.value >= 60){
																	etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional10.value >= 50){
																		etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional10.value >= 40){
																			etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (30))+"px";
																		}else{
																			etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional10.addEventListener('input',function(){
				var estantes0 = window.estantes0;
				var num = estantes0.length - 1;
				if(num == -1){
					var sum = 6;
				}else{
					sum = 5;
				}
				var etihtml = $("#etiquetaAdi51").text();
				  var calcu = (parseFloat(rangeSliderAdicional10.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+sum)],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
				etiqueta10.innerHTML =(rangeSliderAdicional10.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional10.value >= 190){
				etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional10.value >= 180){
					etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional10.value >= 170){
						etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional10.value >= 160){
							etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional10.value >= 150){
								etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional10.value >= 140){
									etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional10.value >= 130){
										etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional10.value >= 120){
											etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional10.value >= 110){
												etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional10.value >= 100){
													etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional10.value >= 90){
														etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional10.value >= 80){
															etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional10.value >= 70){
																etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional10.value >= 60){
																	etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional10.value >= 50){
																		etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional10.value >= 40){
																			etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (30))+"px";
																		}else{
																			etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
	  }
	  
	  if(estantes[2].length != 0){
		  
		    var rangeSliderAdicional11 = document.getElementById("rs-range-lineAdicional12");
			$("#rs-range-lineAdicional12").attr("onmouseup","cambiarArmarioEstantes(3,0,1,2)");
			var inputDiv = document.querySelector('#inputDivAdi12');
			var w = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional11.style.width = "100%";
			var inputMin = rangeSliderAdicional11.getAttribute('min');
			var inputMax = rangeSliderAdicional11.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta11 = document.querySelector('#etiquetaAdi12');
			var ew = parseInt(window.getComputedStyle(etiqueta11, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta11.innerHTML = (rangeSliderAdicional11.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional11.value >= 190){
				etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional11.value >= 180){
					etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional11.value >= 170){
						etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional11.value >= 160){
							etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional11.value >= 150){
								etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional11.value >= 140){
									etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional11.value >= 130){
										etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional11.value >= 120){
											etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional11.value >= 110){
												etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional11.value >= 100){
													etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional11.value >= 90){
														etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional11.value >= 80){
															etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional11.value >= 70){
																etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional11.value >= 60){
																	etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional11.value >= 50){
																		etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional11.value >= 40){
																			etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (30))+"px";
																		}else{
																			etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional11.addEventListener('input',function(){
				var estantes0 = window.estantes0;
				var estantes1 = window.estantes1;
				var num = estantes0.length - 1;
				var num1 = estantes1.length - 1;
				var sum = 0;
				if(num == -1){
					if(num1 == -1){
						sum = 4;
					}else{
						sum = 3;
					}
				}else{
					if(num1 == -1){
						sum = 3;
					}else{
						sum = 2;
					}
				}
				var etihtml = $("#etiquetaAdi12").text();
				  var calcu = (parseFloat(rangeSliderAdicional11.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+sum)],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
				etiqueta11.innerHTML =(rangeSliderAdicional11.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional11.value >= 190){
				etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional11.value >= 180){
					etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional11.value >= 170){
						etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional11.value >= 160){
							etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional11.value >= 150){
								etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional11.value >= 140){
									etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional11.value >= 130){
										etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional11.value >= 120){
											etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional11.value >= 110){
												etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional11.value >= 100){
													etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional11.value >= 90){
														etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional11.value >= 80){
															etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional11.value >= 70){
																etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional11.value >= 60){
																	etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional11.value >= 50){
																		etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional11.value >= 40){
																			etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (30))+"px";
																		}else{
																			etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
			var rangeSliderAdicional12 = document.getElementById("rs-range-lineAdicional22");
			$("#rs-range-lineAdicional22").attr("onmouseup","cambiarArmarioEstantes(3,1,2,2)");
			var inputDiv2 = document.querySelector('#inputDivAdi22');
			var w = parseInt(window.getComputedStyle(inputDiv2, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional12.style.width = "100%";
			var inputMin = rangeSliderAdicional12.getAttribute('min');
			var inputMax = rangeSliderAdicional12.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta12 = document.querySelector('#etiquetaAdi22');
			var ew = parseInt(window.getComputedStyle(etiqueta12, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta12.innerHTML = (rangeSliderAdicional12.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional12.value >= 190){
				etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional12.value >= 180){
					etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional12.value >= 170){
						etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional12.value >= 160){
							etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional12.value >= 150){
								etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional12.value >= 140){
									etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional12.value >= 130){
										etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional12.value >= 120){
											etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional12.value >= 110){
												etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional12.value >= 100){
													etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional12.value >= 90){
														etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional12.value >= 80){
															etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional12.value >= 70){
																etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional12.value >= 60){
																	etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional12.value >= 50){
																		etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional12.value >= 40){
																			etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (30))+"px";
																		}else{
																			etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional12.addEventListener('input',function(){
				var estantes0 = window.estantes0;
				var estantes1 = window.estantes1;
				var num = estantes0.length - 1;
				var num1 = estantes1.length - 1;
				var sum = 0;
				if(num == -1){
					if(num1 == -1){
						sum = 5;
					}else{
						sum = 3;
					}
				}else{
					if(num1 == -1){
						sum = 4;
					}else{
						sum = 3;
					}
				}
				var etihtml = $("#etiquetaAdi22").text();
				  var calcu = (parseFloat(rangeSliderAdicional12.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+sum)],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
				etiqueta12.innerHTML =(rangeSliderAdicional12.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional12.value >= 190){
				etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional12.value >= 180){
					etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional12.value >= 170){
						etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional12.value >= 160){
							etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional12.value >= 150){
								etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional12.value >= 140){
									etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional12.value >= 130){
										etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional12.value >= 120){
											etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional12.value >= 110){
												etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional12.value >= 100){
													etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional12.value >= 90){
														etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional12.value >= 80){
															etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional12.value >= 70){
																etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional12.value >= 60){
																	etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional12.value >= 50){
																		etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional12.value >= 40){
																			etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (30))+"px";
																		}else{
																			etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
			var rangeSliderAdicional13 = document.getElementById("rs-range-lineAdicional32");
			$("#rs-range-lineAdicional32").attr("onmouseup","cambiarArmarioEstantes(3,2,3,2)");
			var inputDiv3 = document.querySelector('#inputDivAdi32');
			var w = parseInt(window.getComputedStyle(inputDiv3, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional13.style.width = "100%";
			var inputMin = rangeSliderAdicional13.getAttribute('min');
			var inputMax = rangeSliderAdicional13.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta13 = document.querySelector('#etiquetaAdi32');
			var ew = parseInt(window.getComputedStyle(etiqueta13, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta13.innerHTML = (rangeSliderAdicional13.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional13.value >= 190){
				etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional13.value >= 180){
					etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional13.value >= 170){
						etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional13.value >= 160){
							etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional13.value >= 150){
								etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional13.value >= 140){
									etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional13.value >= 130){
										etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional13.value >= 120){
											etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional13.value >= 110){
												etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional13.value >= 100){
													etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional13.value >= 90){
														etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional13.value >= 80){
															etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional13.value >= 70){
																etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional13.value >= 60){
																	etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional13.value >= 50){
																		etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional13.value >= 40){
																			etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (30))+"px";
																		}else{
																			etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional13.addEventListener('input',function(){
				var estantes0 = window.estantes0;
				var estantes1 = window.estantes1;
				var num = estantes0.length - 1;
				var num1 = estantes1.length - 1;
				var sum = 0;
				if(num == -1){
					if(num1 == -1){
						sum = 6;
					}else{
						sum = 3;
					}
				}else{
					if(num1 == -1){
						sum = 5;
					}else{
						sum = 4;
					}
				}
				var etihtml = $("#etiquetaAdi32").text();
				  var calcu = (parseFloat(rangeSliderAdicional13.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+sum)],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
				etiqueta13.innerHTML =(rangeSliderAdicional13.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional13.value >= 190){
				etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional13.value >= 180){
					etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional13.value >= 170){
						etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional13.value >= 160){
							etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional13.value >= 150){
								etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional13.value >= 140){
									etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional13.value >= 130){
										etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional13.value >= 120){
											etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional13.value >= 110){
												etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional13.value >= 100){
													etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional13.value >= 90){
														etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional13.value >= 80){
															etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional13.value >= 70){
																etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional13.value >= 60){
																	etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional13.value >= 50){
																		etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional13.value >= 40){
																			etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (30))+"px";
																		}else{
																			etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
			var rangeSliderAdicional14 = document.getElementById("rs-range-lineAdicional42");
			$("#rs-range-lineAdicional42").attr("onmouseup","cambiarArmarioEstantes(3,3,4,2)");
			var inputDiv4 = document.querySelector('#inputDivAdi42');
			var w = parseInt(window.getComputedStyle(inputDiv4, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional14.style.width = "100%";
			var inputMin = rangeSliderAdicional14.getAttribute('min');
			var inputMax = rangeSliderAdicional14.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta14 = document.querySelector('#etiquetaAdi42');
			var ew = parseInt(window.getComputedStyle(etiqueta14, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta14.innerHTML = (rangeSliderAdicional14.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional14.value >= 190){
				etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional14.value >= 180){
					etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional14.value >= 170){
						etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional14.value >= 160){
							etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional14.value >= 150){
								etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional14.value >= 140){
									etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional14.value >= 130){
										etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional14.value >= 120){
											etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional14.value >= 110){
												etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional14.value >= 100){
													etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional14.value >= 90){
														etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional14.value >= 80){
															etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional14.value >= 70){
																etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional14.value >= 60){
																	etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional14.value >= 50){
																		etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional14.value >= 40){
																			etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (30))+"px";
																		}else{
																			etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional14.addEventListener('input',function(){
				var estantes0 = window.estantes0;
				var estantes1 = window.estantes1;
				var num = estantes0.length - 1;
				var num1 = estantes1.length - 1;
				var sum = 0;
				if(num == -1){
					if(num1 == -1){
						sum = 7;
					}else{
						sum = 3;
					}
				}else{
					if(num1 == -1){
						sum = 6;
					}else{
						sum = 5;
					}
				}
				var etihtml = $("#etiquetaAdi42").text();
				  var calcu = (parseFloat(rangeSliderAdicional14.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+sum)],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
				etiqueta14.innerHTML =(rangeSliderAdicional14.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional14.value >= 190){
				etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional14.value >= 180){
					etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional14.value >= 170){
						etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional14.value >= 160){
							etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional14.value >= 150){
								etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional14.value >= 140){
									etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional14.value >= 130){
										etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional14.value >= 120){
											etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional14.value >= 110){
												etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional14.value >= 100){
													etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional14.value >= 90){
														etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional14.value >= 80){
															etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional14.value >= 70){
																etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional14.value >= 60){
																	etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional14.value >= 50){
																		etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional14.value >= 40){
																			etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (30))+"px";
																		}else{
																			etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
			var rangeSliderAdicional15 = document.getElementById("rs-range-lineAdicional52");
			$("#rs-range-lineAdicional52").attr("onmouseup","cambiarArmarioEstantes(3,4,5,2)");
			var inputDiv5 = document.querySelector('#inputDivAdi52');
			var w = parseInt(window.getComputedStyle(inputDiv5, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional15.style.width = "100%";
			var inputMin = rangeSliderAdicional15.getAttribute('min');
			var inputMax = rangeSliderAdicional15.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta15 = document.querySelector('#etiquetaAdi52');
			var ew = parseInt(window.getComputedStyle(etiqueta15, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta15.innerHTML = (rangeSliderAdicional15.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional15.value >= 190){
				etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional15.value >= 180){
					etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional15.value >= 170){
						etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional15.value >= 160){
							etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional15.value >= 150){
								etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional15.value >= 140){
									etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional15.value >= 130){
										etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional15.value >= 120){
											etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional15.value >= 110){
												etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional15.value >= 100){
													etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional15.value >= 90){
														etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional15.value >= 80){
															etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional15.value >= 70){
																etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional15.value >= 60){
																	etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional15.value >= 50){
																		etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional15.value >= 40){
																			etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (30))+"px";
																		}else{
																			etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional15.addEventListener('input',function(){
				var estantes0 = window.estantes0;
				var estantes1 = window.estantes1;
				var num = estantes0.length - 1;
				var num1 = estantes1.length - 1;
				var sum = 0;
				if(num == -1){
					if(num1 == -1){
						sum = 8;
					}else{
						sum = 3;
					}
				}else{
					if(num1 == -1){
						sum = 7;
					}else{
						sum = 6;
					}
				}
				var etihtml = $("#etiquetaAdi52").text();
				  var calcu = (parseFloat(rangeSliderAdicional15.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+sum)],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
				etiqueta15.innerHTML =(rangeSliderAdicional15.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional15.value >= 190){
				etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional15.value >= 180){
					etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional15.value >= 170){
						etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional15.value >= 160){
							etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional15.value >= 150){
								etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional15.value >= 140){
									etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional15.value >= 130){
										etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional15.value >= 120){
											etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional15.value >= 110){
												etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional15.value >= 100){
													etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional15.value >= 90){
														etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional15.value >= 80){
															etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional15.value >= 70){
																etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional15.value >= 60){
																	etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional15.value >= 50){
																		etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional15.value >= 40){
																			etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (30))+"px";
																		}else{
																			etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
	  }
	  
	  if(estantes[3].length != 0){
		  
		    var rangeSliderAdicional16 = document.getElementById("rs-range-lineAdicional13");
			$("#rs-range-lineAdicional13").attr("onmouseup","cambiarArmarioEstantes(4,0,1,3)");
			var inputDiv = document.querySelector('#inputDivAdi13');
			var w = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional16.style.width = "100%";
			var inputMin = rangeSliderAdicional16.getAttribute('min');
			var inputMax = rangeSliderAdicional16.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta16 = document.querySelector('#etiquetaAdi13');
			var ew = parseInt(window.getComputedStyle(etiqueta16, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta16.innerHTML = (rangeSliderAdicional16.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional16.value >= 190){
				etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional16.value >= 180){
					etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional16.value >= 170){
						etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional16.value >= 160){
							etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional16.value >= 150){
								etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional16.value >= 140){
									etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional16.value >= 130){
										etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional16.value >= 120){
											etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional16.value >= 110){
												etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional16.value >= 100){
													etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional16.value >= 90){
														etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional16.value >= 80){
															etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional16.value >= 70){
																etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional16.value >= 60){
																	etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional16.value >= 50){
																		etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional16.value >= 40){
																			etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (30))+"px";
																		}else{
																			etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional16.addEventListener('input',function(){
				var estantes0 = window.estantes0;
				var estantes1 = window.estantes1;
				var estantes2 = window.estantes2;
				var num = estantes0.length - 1;
				var num1 = estantes1.length - 1;
				var num2 = estantes2.length - 1;
				var sum = 0;
				if(num == -1){
					if(num1 == -1 && num2 != -1){
						sum = 5;
					}
					if(num2 == -1 && num1 != -1){
						sum = 5;
					}
					if(num2 != -1 && num1 != -1){
						sum = 4;
					}
					if(num2 == -1 && num1 == -1){
						sum = 4;
					}
				}else{
					if(num1 == -1 && num2 != -1){
						sum = 4;
					}
					if(num2 != -1 && num1 == -1){
						sum = 4;
					}
					if(num2 != -1 && num1 != -1){
						sum = 3;
					}
					if(num2 == -1 && num1 == -1){
						sum = 5;
					}
				}
				var etihtml = $("#etiquetaAdi13").text();
				  var calcu = (parseFloat(rangeSliderAdicional16.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+num2+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+num2+sum)],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
				etiqueta16.innerHTML =(rangeSliderAdicional16.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional16.value >= 190){
				etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional16.value >= 180){
					etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional16.value >= 170){
						etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional16.value >= 160){
							etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional16.value >= 150){
								etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional16.value >= 140){
									etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional16.value >= 130){
										etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional16.value >= 120){
											etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional16.value >= 110){
												etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional16.value >= 100){
													etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional16.value >= 90){
														etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional16.value >= 80){
															etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional16.value >= 70){
																etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional16.value >= 60){
																	etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional16.value >= 50){
																		etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional16.value >= 40){
																			etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (30))+"px";
																		}else{
																			etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
			var rangeSliderAdicional17 = document.getElementById("rs-range-lineAdicional23");
			$("#rs-range-lineAdicional23").attr("onmouseup","cambiarArmarioEstantes(4,1,2,3)");
			var inputDiv2 = document.querySelector('#inputDivAdi23');
			var w = parseInt(window.getComputedStyle(inputDiv2, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional17.style.width = "100%";
			var inputMin = rangeSliderAdicional17.getAttribute('min');
			var inputMax = rangeSliderAdicional17.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta17 = document.querySelector('#etiquetaAdi23');
			var ew = parseInt(window.getComputedStyle(etiqueta17, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta17.innerHTML = (rangeSliderAdicional17.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional17.value >= 190){
				etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional17.value >= 180){
					etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional17.value >= 170){
						etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional17.value >= 160){
							etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional17.value >= 150){
								etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional17.value >= 140){
									etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional17.value >= 130){
										etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional17.value >= 120){
											etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional17.value >= 110){
												etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional17.value >= 100){
													etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional17.value >= 90){
														etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional17.value >= 80){
															etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional17.value >= 70){
																etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional17.value >= 60){
																	etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional17.value >= 50){
																		etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional17.value >= 40){
																			etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (30))+"px";
																		}else{
																			etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional17.addEventListener('input',function(){
				var estantes0 = window.estantes0;
				var estantes1 = window.estantes1;
				var estantes2 = window.estantes2;
				var num = estantes0.length - 1;
				var num1 = estantes1.length - 1;
				var num2 = estantes2.length - 1;
				var sum = 0;
				if(num == -1){
					if(num1 == -1 && num2 != -1){
						sum = 6;
					}
					if(num2 == -1 && num1 != -1){
						sum = 6;
					}
					if(num2 != -1 && num1 != -1){
						sum = 5;
					}
					if(num2 == -1 && num1 == -1){
						sum = 5;
					}
				}else{
					if(num1 == -1 && num2 != -1){
						sum = 5;
					}
					if(num2 != -1 && num1 == -1){
						sum = 5;
					}
					if(num2 != -1 && num1 != -1){
						sum = 4;
					}
					if(num2 == -1 && num1 == -1){
						sum = 6;
					}
				}
				var etihtml = $("#etiquetaAdi23").text();
				  var calcu = (parseFloat(rangeSliderAdicional17.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+num2+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+num2+sum)],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
				etiqueta17.innerHTML =(rangeSliderAdicional17.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional17.value >= 190){
				etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional17.value >= 180){
					etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional17.value >= 170){
						etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional17.value >= 160){
							etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional17.value >= 150){
								etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional17.value >= 140){
									etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional17.value >= 130){
										etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional17.value >= 120){
											etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional17.value >= 110){
												etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional17.value >= 100){
													etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional17.value >= 90){
														etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional17.value >= 80){
															etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional17.value >= 70){
																etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional17.value >= 60){
																	etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional17.value >= 50){
																		etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional17.value >= 40){
																			etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (30))+"px";
																		}else{
																			etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
			var rangeSliderAdicional18 = document.getElementById("rs-range-lineAdicional33");
			$("#rs-range-lineAdicional33").attr("onmouseup","cambiarArmarioEstantes(4,2,3,3)");
			var inputDiv3 = document.querySelector('#inputDivAdi33');
			var w = parseInt(window.getComputedStyle(inputDiv3, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional18.style.width = "100%";
			var inputMin = rangeSliderAdicional18.getAttribute('min');
			var inputMax = rangeSliderAdicional18.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta18 = document.querySelector('#etiquetaAdi33');
			var ew = parseInt(window.getComputedStyle(etiqueta18, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta18.innerHTML = (rangeSliderAdicional18.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional18.value >= 190){
				etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional18.value >= 180){
					etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional18.value >= 170){
						etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional18.value >= 160){
							etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional18.value >= 150){
								etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional18.value >= 140){
									etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional18.value >= 130){
										etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional18.value >= 120){
											etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional18.value >= 110){
												etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional18.value >= 100){
													etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional18.value >= 90){
														etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional18.value >= 80){
															etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional18.value >= 70){
																etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional18.value >= 60){
																	etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional18.value >= 50){
																		etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional18.value >= 40){
																			etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (30))+"px";
																		}else{
																			etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional18.addEventListener('input',function(){
				var estantes0 = window.estantes0;
				var estantes1 = window.estantes1;
				var estantes2 = window.estantes2;
				var num = estantes0.length - 1;
				var num1 = estantes1.length - 1;
				var num2 = estantes2.length - 1;
				var sum = 0;
				if(num == -1){
					if(num1 == -1 && num2 != -1){
						sum = 7;
					}
					if(num2 == -1 && num1 != -1){
						sum = 7;
					}
					if(num2 != -1 && num1 != -1){
						sum = 6;
					}
					if(num2 == -1 && num1 == -1){
						sum = 6;
					}
				}else{
					if(num1 == -1 && num2 != -1){
						sum = 6;
					}
					if(num2 != -1 && num1 == -1){
						sum = 6;
					}
					if(num2 != -1 && num1 != -1){
						sum = 5;
					}
					if(num2 == -1 && num1 == -1){
						sum = 7;
					}
				}
				var etihtml = $("#etiquetaAdi33").text();
				  var calcu = (parseFloat(rangeSliderAdicional18.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+num2+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+num2+sum)],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
				etiqueta18.innerHTML =(rangeSliderAdicional18.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional18.value >= 190){
				etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional18.value >= 180){
					etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional18.value >= 170){
						etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional18.value >= 160){
							etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional18.value >= 150){
								etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional18.value >= 140){
									etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional18.value >= 130){
										etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional18.value >= 120){
											etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional18.value >= 110){
												etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional18.value >= 100){
													etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional18.value >= 90){
														etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional18.value >= 80){
															etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional18.value >= 70){
																etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional18.value >= 60){
																	etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional18.value >= 50){
																		etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional18.value >= 40){
																			etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (30))+"px";
																		}else{
																			etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
			var rangeSliderAdicional19 = document.getElementById("rs-range-lineAdicional43");
			$("#rs-range-lineAdicional43").attr("onmouseup","cambiarArmarioEstantes(4,3,4,3)");
			var inputDiv4 = document.querySelector('#inputDivAdi43');
			var w = parseInt(window.getComputedStyle(inputDiv4, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional19.style.width = "100%";
			var inputMin = rangeSliderAdicional19.getAttribute('min');
			var inputMax = rangeSliderAdicional19.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta19 = document.querySelector('#etiquetaAdi43');
			var ew = parseInt(window.getComputedStyle(etiqueta19, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta19.innerHTML = (rangeSliderAdicional19.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional19.value >= 190){
				etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional19.value >= 180){
					etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional19.value >= 170){
						etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional19.value >= 160){
							etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional19.value >= 150){
								etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional19.value >= 140){
									etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional19.value >= 130){
										etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional19.value >= 120){
											etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional19.value >= 110){
												etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional19.value >= 100){
													etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional19.value >= 90){
														etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional19.value >= 80){
															etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional19.value >= 70){
																etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional19.value >= 60){
																	etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional19.value >= 50){
																		etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional19.value >= 40){
																			etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (30))+"px";
																		}else{
																			etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional19.addEventListener('input',function(){
				var estantes0 = window.estantes0;
				var estantes1 = window.estantes1;
				var estantes2 = window.estantes2;
				var num = estantes0.length - 1;
				var num1 = estantes1.length - 1;
				var num2 = estantes2.length - 1;
				var sum = 0;
				if(num == -1){
					if(num1 == -1 && num2 != -1){
						sum = 8;
					}
					if(num2 == -1 && num1 != -1){
						sum = 8;
					}
					if(num2 != -1 && num1 != -1){
						sum = 7;
					}
					if(num2 == -1 && num1 == -1){
						sum = 7;
					}
				}else{
					if(num1 == -1 && num2 != -1){
						sum = 7;
					}
					if(num2 != -1 && num1 == -1){
						sum = 7;
					}
					if(num2 != -1 && num1 != -1){
						sum = 6;
					}
					if(num2 == -1 && num1 == -1){
						sum = 8;
					}
				}
				var etihtml = $("#etiquetaAdi43").text();
				  var calcu = (parseFloat(rangeSliderAdicional19.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+num2+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+num2+sum)],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
				etiqueta19.innerHTML =(rangeSliderAdicional19.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional19.value >= 190){
				etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional19.value >= 180){
					etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional19.value >= 170){
						etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional19.value >= 160){
							etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional19.value >= 150){
								etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional19.value >= 140){
									etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional19.value >= 130){
										etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional19.value >= 120){
											etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional19.value >= 110){
												etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional19.value >= 100){
													etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional19.value >= 90){
														etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional19.value >= 80){
															etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional19.value >= 70){
																etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional19.value >= 60){
																	etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional19.value >= 50){
																		etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional19.value >= 40){
																			etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (30))+"px";
																		}else{
																			etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
			var rangeSliderAdicional20 = document.getElementById("rs-range-lineAdicional53");
			$("#rs-range-lineAdicional53").attr("onmouseup","cambiarArmarioEstantes(4,4,5,3)");
			var inputDiv5 = document.querySelector('#inputDivAdi53');
			var w = parseInt(window.getComputedStyle(inputDiv5, null).getPropertyValue("width"));
			/* EL INPUT */
			rangeSliderAdicional20.style.width = "100%";
			var inputMin = rangeSliderAdicional20.getAttribute('min');
			var inputMax = rangeSliderAdicional20.getAttribute('max');
			

			/* LA ETIQUETA */
			var etiqueta20 = document.querySelector('#etiquetaAdi53');
			var ew = parseInt(window.getComputedStyle(etiqueta20, null).getPropertyValue("width"));
			w = 300;
			var k = 260/(inputMax - inputMin);
			/* el valor de la etiqueta (el tooltip) */
			etiqueta20.innerHTML = (rangeSliderAdicional20.value);
			/* calcula la posición inicial de la etiqueta (el tooltip) */
			/* establece el estilo inicial del TRACK */
			if(rangeSliderAdicional20.value >= 190){
				etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional20.value >= 180){
					etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional20.value >= 170){
						etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional20.value >= 160){
							etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional20.value >= 150){
								etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional20.value >= 140){
									etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional20.value >= 130){
										etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional20.value >= 120){
											etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional20.value >= 110){
												etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional20.value >= 100){
													etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional20.value >= 90){
														etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional20.value >= 80){
															etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional20.value >= 70){
																etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional20.value >= 60){
																	etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional20.value >= 50){
																		etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional20.value >= 40){
																			etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (30))+"px";
																		}else{
																			etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}



			rangeSliderAdicional20.addEventListener('input',function(){
				var estantes0 = window.estantes0;
				var estantes1 = window.estantes1;
				var estantes2 = window.estantes2;
				var num = estantes0.length - 1;
				var num1 = estantes1.length - 1;
				var num2 = estantes2.length - 1;
				var sum = 0;
				if(num == -1){
					if(num1 == -1 && num2 != -1){
						sum = 9;
					}
					if(num2 == -1 && num1 != -1){
						sum = 9;
					}
					if(num2 != -1 && num1 != -1){
						sum = 8;
					}
					if(num2 == -1 && num1 == -1){
						sum = 8;
					}
				}else{
					if(num1 == -1 && num2 != -1){
						sum = 8;
					}
					if(num2 != -1 && num1 == -1){
						sum = 8;
					}
					if(num2 != -1 && num1 != -1){
						sum = 7;
					}
					if(num2 == -1 && num1 == -1){
						sum = 9;
					}
				}
				var etihtml = $("#etiquetaAdi53").text();
				  var calcu = (parseFloat(rangeSliderAdicional20.value) * 10) - (parseFloat(etihtml)*10); 
				  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
				  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
				  api.scene.setLiveTransformation(
						     [
						       {
						         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+num2+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       },
						       {
							         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+num2+sum)],
							         transformations: [
							           {
							             delay: 0,
							             duration: 500,
							             type: 'translation',
							             easing: "Quartic.InOut",
							             translationVector: { x: 0, y: 0, z: calcu },
							             repeat: 0
							           }
							         ],reset:false
							       }]);
			/* cambia el valor de la etiqueta (el tooltip) */
				etiqueta20.innerHTML =(rangeSliderAdicional20.value);
			/* cambia la posición de la etiqueta (el tooltip) */
			if(rangeSliderAdicional20.value >= 190){
				etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (90))+"px";
			}else{
				if(rangeSliderAdicional20.value >= 180){
					etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (80))+"px";
				}else{
					if(rangeSliderAdicional20.value >= 170){
						etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (70))+"px";
					}else{
						if(rangeSliderAdicional20.value >= 160){
							etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (65))+"px";
						}else{
							if(rangeSliderAdicional20.value >= 150){
								etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (60))+"px";
							}else{
								if(rangeSliderAdicional20.value >= 140){
									etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (55))+"px";
								}else{
									if(rangeSliderAdicional20.value >= 130){
										etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (48))+"px";
									}else{
										if(rangeSliderAdicional20.value >= 120){
											etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (40))+"px";
										}else{
											if(rangeSliderAdicional20.value >= 110){
												etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (32))+"px";
											}else{
												if(rangeSliderAdicional20.value >= 100){
													etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (24))+"px";
												}else{
													if(rangeSliderAdicional20.value >= 90){
														etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (16))+"px";
													}else{
														if(rangeSliderAdicional20.value >= 80){
															etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (8))+"px";
														}else{
															if(rangeSliderAdicional20.value >= 70){
																etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (2))+"px";
															}else{
																if(rangeSliderAdicional20.value >= 60){
																	etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (12))+"px";
																}else{
																	if(rangeSliderAdicional20.value >= 50){
																		etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (22))+"px";
																	}else{
																		if(rangeSliderAdicional20.value >= 40){
																			etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (30))+"px";
																		}else{
																			etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (40))+"px";
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			
			/* cambia el estilo del TRACK */
			}, false);
			
	  }
	   
}



function pintarinterioresArmarioShape1(array1,array2,array3,array4,cajones1,cajones2,cajones3,cajones4,tubo1,tubo2,tubo3,tubo4,cajonSuelo1,cajonSuelo2,cajonSuelo3,cajonSuelo4,camisero1,camisero2,camisero3,camisero4,huecoPinta,orden,arrayInterior){

var arrayHueco1 = [];
var arrayHueco2 = [];
var arrayHueco3 = [];
var arrayHueco4 = [];
console.log(orden);
var armario = window.todounarmario
if(array1 != ""){
	arrayHueco1 = array1.split(",");
}
if(array2 != ""){
	arrayHueco2 = array2.split(",");
}
if(array3 != ""){
	arrayHueco3 = array3.split(",");
}
if(array4 != ""){ 
	arrayHueco4 = array4.split(",");
}
var arraytubo1 = [];
var arraytubo2 = [];
var arraytubo3 = [];
var arraytubo4 = [];
if(tubo1 != ""){
	arraytubo1 = tubo1.split(",");
}
if(tubo2 != ""){
	arraytubo2 = tubo2.split(",");
}
if(tubo3 != ""){
	arraytubo3 = tubo3.split(",");
}
if(tubo4 != ""){
	arraytubo4 = tubo4.split(",");
}
var estantes = [];
estantes[0]=arrayHueco1;
estantes[1]=arrayHueco2;
estantes[2]=arrayHueco3;
estantes[3]=arrayHueco4;
var arrayCajones = [];
arrayCajones[0] = JSON.parse(cajones1);
arrayCajones[1] = JSON.parse(cajones2);
arrayCajones[2] = JSON.parse(cajones3);
arrayCajones[3] = JSON.parse(cajones4);
var arrayCajonesSuelo = [];
arrayCajonesSuelo[0] = JSON.parse(cajonSuelo1);
arrayCajonesSuelo[1] = JSON.parse(cajonSuelo2);
arrayCajonesSuelo[2] = JSON.parse(cajonSuelo3);
arrayCajonesSuelo[3] = JSON.parse(cajonSuelo4);
var arrayCamisero = [];
arrayCamisero[0] = JSON.parse(camisero1);
arrayCamisero[1] = JSON.parse(camisero2);
arrayCamisero[2] = JSON.parse(camisero3);
arrayCamisero[3] = JSON.parse(camisero4);
var arrayTubo = [];
var cont = 0;
if(arraytubo1.length != 0){
	arrayTubo[cont] = arraytubo1;
	cont++;
}
if(arraytubo2.length != 0){
	arrayTubo[cont] = arraytubo2;
	cont++;
}
if(arraytubo3.length != 0){
	arrayTubo[cont] = arraytubo3;
	cont++;
}
if(arraytubo4.length != 0){
	arrayTubo[cont] = arraytubo4;
	cont++;
}


armario["estantes"] = estantes;
armario["tubo"] = arrayTubo;
armario["cajonesVolados"] = arrayCajones;
armario["cajonesSuelo"] = arrayCajonesSuelo;
armario["camisero"] = arrayCamisero;
window.estantes0 = estantes[0];
window.estantes1 = estantes[1];
window.estantes2 = estantes[2];
window.estantes3 = estantes[3];
window.cajones0 = arrayCajones[0];
window.cajones1 = arrayCajones[1];
window.cajones2 = arrayCajones[2];
window.cajones3 = arrayCajones[3];
window.cajonesSuelo0 = arrayCajonesSuelo[0];
window.cajonesSuelo1 = arrayCajonesSuelo[1];
window.cajonesSuelo2 = arrayCajonesSuelo[2];
window.cajonesSuelo3 = arrayCajonesSuelo[3];
window.camisero0 = arrayCamisero[0];
window.camisero1 = arrayCamisero[1];
window.camisero2 = arrayCamisero[2];
window.camisero3 = arrayCamisero[3];
window.tuboArray = arrayTubo;
window.todounarmario = armario;
var parame = api.parameters.get({name :"armarioJSON"}).data[0];
  api.parameters.updateAsync({
      id: parame.id,
      value: JSON.stringify(armario)
    });
  console.log(JSON.stringify(armario));

  if(huecoPinta == 1){
	    var rangeSliderAdicional1 = document.getElementById("rs-range-lineAdicional10");
		$("#rs-range-lineAdicional10").attr("onmouseup","cambiarArmarioEstantes(1,0,1,0)");
		var inputDiv = document.querySelector('#inputDivAdi10');
		var w = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional1.style.width = "100%";
		var inputMin = rangeSliderAdicional1.getAttribute('min');
		var inputMax = rangeSliderAdicional1.getAttribute('max');
		window.orden1 = JSON.parse(orden);

		/* LA ETIQUETA */
		var etiqueta = document.querySelector('#etiquetaAdi10');
		var ew = parseInt(window.getComputedStyle(etiqueta, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta.innerHTML = (rangeSliderAdicional1.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional1.value >= 190){
			etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional1.value >= 180){
				etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional1.value >= 170){
					etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional1.value >= 160){
						etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional1.value >= 150){
							etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional1.value >= 140){
								etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional1.value >= 130){
									etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional1.value >= 120){
										etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional1.value >= 110){
											etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional1.value >= 100){
												etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional1.value >= 90){
													etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional1.value >= 80){
														etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional1.value >= 70){
															etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional1.value >= 60){
																etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional1.value >= 50){
																	etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional1.value >= 40){
																		etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (30))+"px";
																	}else{
																		etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}

		rangeSliderAdicional1.addEventListener('input',function(){
			var etihtml = $("#etiquetaAdi10").text();
			var orden = window.orden1;
			 var contEstant = 0;
			 if(orden[0] != "ESTANTE MADERA ADICIONAL" ){
				 contEstant = 0;
			 }
			  var calcu = (parseFloat(rangeSliderAdicional1.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(contEstant)],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(contEstant)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
		etiqueta.innerHTML =(rangeSliderAdicional1.value); 
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional1.value >= 190){
			etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional1.value >= 180){
				etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional1.value >= 170){
					etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional1.value >= 160){
						etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional1.value >= 150){
							etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional1.value >= 140){
								etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional1.value >= 130){
									etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional1.value >= 120){
										etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional1.value >= 110){
											etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional1.value >= 100){
												etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional1.value >= 90){
													etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional1.value >= 80){
														etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional1.value >= 70){
															etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional1.value >= 60){
																etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional1.value >= 50){
																	etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional1.value >= 40){
																		etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (30))+"px";
																	}else{
																		etiqueta.style.left =  ((parseFloat(rangeSliderAdicional1.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional2 = document.getElementById("rs-range-lineAdicional20");
		$("#rs-range-lineAdicional20").attr("onmouseup","cambiarArmarioEstantes(1,1,2,0)");
		var inputDiv2 = document.querySelector('#inputDivAdi20');
		var w = parseInt(window.getComputedStyle(inputDiv2, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional2.style.width = "100%";
		var inputMin = rangeSliderAdicional2.getAttribute('min');
		var inputMax = rangeSliderAdicional2.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta2 = document.querySelector('#etiquetaAdi20');
		var ew = parseInt(window.getComputedStyle(etiqueta2, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta2.innerHTML = (rangeSliderAdicional2.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional2.value >= 190){
			etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional2.value >= 180){
				etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional2.value >= 170){
					etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional2.value >= 160){
						etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional2.value >= 150){
							etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional2.value >= 140){
								etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional2.value >= 130){
									etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional2.value >= 120){
										etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional2.value >= 110){
											etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional2.value >= 100){
												etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional2.value >= 90){
													etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional2.value >= 80){
														etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional2.value >= 70){
															etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional2.value >= 60){
																etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional2.value >= 50){
																	etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional2.value >= 40){
																		etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (30))+"px";
																	}else{
																		etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}

		rangeSliderAdicional2.addEventListener('input',function(){
			 var orden = window.orden1;
			 var contEstant = 0;
			 if(orden[0] != "ESTANTE MADERA ADICIONAL" ){
				 contEstant = 0;
			 }else{
				 contEstant = 1;
			 }
			var etihtml = $("#etiquetaAdi20").text();
			  var calcu = (parseFloat(rangeSliderAdicional2.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(contEstant)],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(contEstant)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
		etiqueta2.innerHTML =(rangeSliderAdicional2.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional2.value >= 190){
			etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional2.value >= 180){
				etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional2.value >= 170){
					etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional2.value >= 160){
						etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional2.value >= 150){
							etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional2.value >= 140){
								etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional2.value >= 130){
									etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional2.value >= 120){
										etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional2.value >= 110){
											etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional2.value >= 100){
												etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional2.value >= 90){
													etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional2.value >= 80){
														etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional2.value >= 70){
															etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional2.value >= 60){
																etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional2.value >= 50){
																	etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional2.value >= 40){
																		etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (30))+"px";
																	}else{
																		etiqueta2.style.left =  ((parseFloat(rangeSliderAdicional2.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional3 = document.getElementById("rs-range-lineAdicional30");
		$("#rs-range-lineAdicional30").attr("onmouseup","cambiarArmarioEstantes(1,2,3,0)");
		var inputDiv3 = document.querySelector('#inputDivAdi30');
		var w = parseInt(window.getComputedStyle(inputDiv3, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional3.style.width = "100%";
		var inputMin = rangeSliderAdicional3.getAttribute('min');
		var inputMax = rangeSliderAdicional3.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta3 = document.querySelector('#etiquetaAdi30');
		var ew = parseInt(window.getComputedStyle(etiqueta3, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta3.innerHTML = (rangeSliderAdicional3.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional3.value >= 190){
			etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional3.value >= 180){
				etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional3.value >= 170){
					etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional3.value >= 160){
						etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional3.value >= 150){
							etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional3.value >= 140){
								etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional3.value >= 130){
									etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional3.value >= 120){
										etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional3.value >= 110){
											etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional3.value >= 100){
												etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional3.value >= 90){
													etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional3.value >= 80){
														etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional3.value >= 70){
															etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional3.value >= 60){
																etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional3.value >= 50){
																	etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional3.value >= 40){
																		etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (30))+"px";
																	}else{
																		etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional3.addEventListener('input',function(){
			var etihtml = $("#etiquetaAdi30").text();
			 var orden = window.orden1;
			 var contEstant = 0;
			 if(orden[0] != "ESTANTE MADERA ADICIONAL" && orden[1] != "ESTANTE MADERA ADICIONAL"){
				 contEstant = 0;
			 }else{
				 if(orden[1] != "ESTANTE MADERA ADICIONAL" && orden[0] == "ESTANTE MADERA ADICIONAL"){
					 contEstant = 1;
				 }
				 if(orden[1] == "ESTANTE MADERA ADICIONAL" && orden[0] != "ESTANTE MADERA ADICIONAL"){
					 contEstant = 1;
				 }
				 if(orden[1] == "ESTANTE MADERA ADICIONAL" && orden[0] == "ESTANTE MADERA ADICIONAL"){
					contEstant = 2;
				 }
			 } 
			  var calcu = (parseFloat(rangeSliderAdicional3.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+contEstant],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+contEstant],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
		etiqueta3.innerHTML =(rangeSliderAdicional3.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional3.value >= 190){
			etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional3.value >= 180){
				etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional3.value >= 170){
					etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional3.value >= 160){
						etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional3.value >= 150){
							etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional3.value >= 140){
								etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional3.value >= 130){
									etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional3.value >= 120){
										etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional3.value >= 110){
											etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional3.value >= 100){
												etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional3.value >= 90){
													etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional3.value >= 80){
														etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional3.value >= 70){
															etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional3.value >= 60){
																etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional3.value >= 50){
																	etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional3.value >= 40){
																		etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (30))+"px";
																	}else{
																		etiqueta3.style.left =  ((parseFloat(rangeSliderAdicional3.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional4 = document.getElementById("rs-range-lineAdicional40");
		$("#rs-range-lineAdicional40").attr("onmouseup","cambiarArmarioEstantes(1,3,4,0)");
		var inputDiv4 = document.querySelector('#inputDivAdi40');
		var w = parseInt(window.getComputedStyle(inputDiv4, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional4.style.width = "100%";
		var inputMin = rangeSliderAdicional4.getAttribute('min');
		var inputMax = rangeSliderAdicional4.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta4 = document.querySelector('#etiquetaAdi40');
		var ew = parseInt(window.getComputedStyle(etiqueta4, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta4.innerHTML = (rangeSliderAdicional4.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional4.value >= 190){
			etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional4.value >= 180){
				etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional4.value >= 170){
					etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional4.value >= 160){
						etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional4.value >= 150){
							etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional4.value >= 140){
								etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional4.value >= 130){
									etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional4.value >= 120){
										etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional4.value >= 110){
											etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional4.value >= 100){
												etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional4.value >= 90){
													etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional4.value >= 80){
														etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional4.value >= 70){
															etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional4.value >= 60){
																etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional4.value >= 50){
																	etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional4.value >= 40){
																		etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (30))+"px";
																	}else{
																		etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional4.addEventListener('input',function(){
			 var orden = window.orden1;
			 var contEstant = 0;
			 if(orden[0] != "ESTANTE MADERA ADICIONAL" && orden[1] != "ESTANTE MADERA ADICIONAL" && orden[2] != "ESTANTE MADERA ADICIONAL"){
				 contEstant = 0;
			 }else{
				 if(orden[1] != "ESTANTE MADERA ADICIONAL" && orden[0] == "ESTANTE MADERA ADICIONAL" && orden[2] != "ESTANTE MADERA ADICIONAL"){
					 contEstant = 1;
				 }
				 if(orden[1] == "ESTANTE MADERA ADICIONAL" && orden[0] != "ESTANTE MADERA ADICIONAL" && orden[2] != "ESTANTE MADERA ADICIONAL"){
					 contEstant = 1;
				 }
				 if(orden[1] == "ESTANTE MADERA ADICIONAL" && orden[0] == "ESTANTE MADERA ADICIONAL" && orden[2] != "ESTANTE MADERA ADICIONAL"){
					contEstant = 2;
				 }
				 
				 if(orden[1] != "ESTANTE MADERA ADICIONAL" && orden[0] == "ESTANTE MADERA ADICIONAL" && orden[2] == "ESTANTE MADERA ADICIONAL"){
					 contEstant = 2;
				 }
				 if(orden[1] == "ESTANTE MADERA ADICIONAL" && orden[0] != "ESTANTE MADERA ADICIONAL" && orden[2] == "ESTANTE MADERA ADICIONAL"){
					 contEstant = 2;
				 }
				 if(orden[1] == "ESTANTE MADERA ADICIONAL" && orden[0] == "ESTANTE MADERA ADICIONAL" && orden[2] == "ESTANTE MADERA ADICIONAL"){
					contEstant = 3;
				 }
				 if(orden[1] != "ESTANTE MADERA ADICIONAL" && orden[0] != "ESTANTE MADERA ADICIONAL" && orden[2] == "ESTANTE MADERA ADICIONAL"){
					 contEstant = 1;
				 }
				 
			 } 
			var etihtml = $("#etiquetaAdi40").text();
			  var calcu = (parseFloat(rangeSliderAdicional4.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+contEstant],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+contEstant],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
		etiqueta4.innerHTML =(rangeSliderAdicional4.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional4.value >= 190){
			etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional4.value >= 180){
				etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional4.value >= 170){
					etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional4.value >= 160){
						etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional4.value >= 150){
							etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional4.value >= 140){
								etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional4.value >= 130){
									etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional4.value >= 120){
										etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional4.value >= 110){
											etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional4.value >= 100){
												etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional4.value >= 90){
													etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional4.value >= 80){
														etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional4.value >= 70){
															etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional4.value >= 60){
																etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional4.value >= 50){
																	etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional4.value >= 40){
																		etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (30))+"px";
																	}else{
																		etiqueta4.style.left =  ((parseFloat(rangeSliderAdicional4.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional5 = document.getElementById("rs-range-lineAdicional50");
		$("#rs-range-lineAdicional50").attr("onmouseup","cambiarArmarioEstantes(1,4,5,0)");
		var inputDiv5 = document.querySelector('#inputDivAdi50');
		var w = parseInt(window.getComputedStyle(inputDiv5, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional5.style.width = "100%";
		var inputMin = rangeSliderAdicional5.getAttribute('min');
		var inputMax = rangeSliderAdicional5.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta5 = document.querySelector('#etiquetaAdi50');
		var ew = parseInt(window.getComputedStyle(etiqueta5, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta5.innerHTML = (rangeSliderAdicional5.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional5.value >= 190){
			etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional5.value >= 180){
				etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional5.value >= 170){
					etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional5.value >= 160){
						etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional5.value >= 150){
							etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional5.value >= 140){
								etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional5.value >= 130){
									etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional5.value >= 120){
										etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional5.value >= 110){
											etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional5.value >= 100){
												etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional5.value >= 90){
													etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional5.value >= 80){
														etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional5.value >= 70){
															etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional5.value >= 60){
																etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional5.value >= 50){
																	etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional5.value >= 40){
																		etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (30))+"px";
																	}else{
																		etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional5.addEventListener('input',function(){
			var orden = window.orden1;
			 var contEstant = 0;
			 if(orden[0] != "ESTANTE MADERA ADICIONAL" && orden[1] != "ESTANTE MADERA ADICIONAL" && orden[2] != "ESTANTE MADERA ADICIONAL" && orden[3] != "ESTANTE MADERA ADICIONAL"){
				 contEstant = 0;
			 }else{
				 if(orden[1] != "ESTANTE MADERA ADICIONAL" && orden[0] == "ESTANTE MADERA ADICIONAL" && orden[2] != "ESTANTE MADERA ADICIONAL" && orden[3] != "ESTANTE MADERA ADICIONAL"){
					 contEstant = 1;
				 }
				 if(orden[1] == "ESTANTE MADERA ADICIONAL" && orden[0] != "ESTANTE MADERA ADICIONAL" && orden[2] != "ESTANTE MADERA ADICIONAL" && orden[3] != "ESTANTE MADERA ADICIONAL"){
					 contEstant = 1;
				 }
				 if(orden[1] == "ESTANTE MADERA ADICIONAL" && orden[0] == "ESTANTE MADERA ADICIONAL" && orden[2] != "ESTANTE MADERA ADICIONAL" && orden[3] != "ESTANTE MADERA ADICIONAL"){
					contEstant = 2;
				 }
				 
				 if(orden[1] != "ESTANTE MADERA ADICIONAL" && orden[0] == "ESTANTE MADERA ADICIONAL" && orden[2] == "ESTANTE MADERA ADICIONAL" && orden[3] != "ESTANTE MADERA ADICIONAL"){
					 contEstant = 2
				 }
				 if(orden[1] == "ESTANTE MADERA ADICIONAL" && orden[0] != "ESTANTE MADERA ADICIONAL" && orden[2] == "ESTANTE MADERA ADICIONAL" && orden[3] != "ESTANTE MADERA ADICIONAL"){
					 contEstant = 2;
				 }
				 if(orden[1] == "ESTANTE MADERA ADICIONAL" && orden[0] == "ESTANTE MADERA ADICIONAL" && orden[2] == "ESTANTE MADERA ADICIONAL" && orden[3] != "ESTANTE MADERA ADICIONAL"){
					contEstant = 3;
				 }
				 
				 if(orden[1] != "ESTANTE MADERA ADICIONAL" && orden[0] == "ESTANTE MADERA ADICIONAL" && orden[2] == "ESTANTE MADERA ADICIONAL" && orden[3] == "ESTANTE MADERA ADICIONAL"){
					 contEstant = 3;
				 }
				 if(orden[1] == "ESTANTE MADERA ADICIONAL" && orden[0] != "ESTANTE MADERA ADICIONAL" && orden[2] == "ESTANTE MADERA ADICIONAL" && orden[3] == "ESTANTE MADERA ADICIONAL"){
					 contEstant = 3;
				 }
				 if(orden[1] == "ESTANTE MADERA ADICIONAL" && orden[0] == "ESTANTE MADERA ADICIONAL" && orden[2] == "ESTANTE MADERA ADICIONAL" && orden[3] == "ESTANTE MADERA ADICIONAL"){
					contEstant = 4;
				 }
			 }
			var etihtml = $("#etiquetaAdi50").text();
			  var calcu = (parseFloat(rangeSliderAdicional5.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_4"],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_4"],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
		etiqueta5.innerHTML =(rangeSliderAdicional5.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional5.value >= 190){
			etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional5.value >= 180){
				etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional5.value >= 170){
					etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional5.value >= 160){
						etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional5.value >= 150){
							etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional5.value >= 140){
								etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional5.value >= 130){
									etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional5.value >= 120){
										etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional5.value >= 110){
											etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional5.value >= 100){
												etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional5.value >= 90){
													etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional5.value >= 80){
														etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional5.value >= 70){
															etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional5.value >= 60){
																etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional5.value >= 50){
																	etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional5.value >= 40){
																		etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (30))+"px";
																	}else{
																		etiqueta5.style.left =  ((parseFloat(rangeSliderAdicional5.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
  }
  
  if(estantes[1].length != 0){
	  
	    var rangeSliderAdicional6 = document.getElementById("rs-range-lineAdicional11");
		$("#rs-range-lineAdicional11").attr("onmouseup","cambiarArmarioEstantes(2,0,1,1)");
		var inputDiv = document.querySelector('#inputDivAdi11');
		var w = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional6.style.width = "100%";
		var inputMin = rangeSliderAdicional6.getAttribute('min');
		var inputMax = rangeSliderAdicional6.getAttribute('max');
		

		/* LA etiqueta6 */
		var etiqueta6 = document.querySelector('#etiquetaAdi11');
		var ew = parseInt(window.getComputedStyle(etiqueta6, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta6 (el tooltip) */
		etiqueta6.innerHTML = (rangeSliderAdicional6.value);
		/* calcula la posición inicial de la etiqueta6 (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional6.value >= 190){
			etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional6.value >= 180){
				etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional6.value >= 170){
					etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional6.value >= 160){
						etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional6.value >= 150){
							etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional6.value >= 140){
								etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional6.value >= 130){
									etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional6.value >= 120){
										etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional6.value >= 110){
											etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional6.value >= 100){
												etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional6.value >= 90){
													etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional6.value >= 80){
														etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional6.value >= 70){
															etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional6.value >= 60){
																etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional6.value >= 50){
																	etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional6.value >= 40){
																		etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (30))+"px";
																	}else{
																		etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional6.addEventListener('input',function(){
			var estantes0 = window.estantes0;
			var num = estantes0.length - 1;
			if(num == -1){
				var sum = 2;
			}else{
				sum = 1;
			}
			var etihtml = $("#etiquetaAdi11").text();
			  var calcu = (parseFloat(rangeSliderAdicional6.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+sum)],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta6 (el tooltip) */
		etiqueta6.innerHTML =(rangeSliderAdicional6.value);
		/* cambia la posición de la etiqueta6 (el tooltip) */
		if(rangeSliderAdicional6.value >= 190){
			etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional6.value >= 180){
				etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional6.value >= 170){
					etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional6.value >= 160){
						etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional6.value >= 150){
							etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional6.value >= 140){
								etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional6.value >= 130){
									etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional6.value >= 120){
										etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional6.value >= 110){
											etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional6.value >= 100){
												etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional6.value >= 90){
													etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional6.value >= 80){
														etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional6.value >= 70){
															etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional6.value >= 60){
																etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional6.value >= 50){
																	etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional6.value >= 40){
																		etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (30))+"px";
																	}else{
																		etiqueta6.style.left =  ((parseFloat(rangeSliderAdicional6.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional7 = document.getElementById("rs-range-lineAdicional21");
		$("#rs-range-lineAdicional21").attr("onmouseup","cambiarArmarioEstantes(2,1,2,1)");
		var inputDiv2 = document.querySelector('#inputDivAdi21');
		var w = parseInt(window.getComputedStyle(inputDiv2, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional7.style.width = "100%";
		var inputMin = rangeSliderAdicional7.getAttribute('min');
		var inputMax = rangeSliderAdicional7.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta7 = document.querySelector('#etiquetaAdi21');
		var ew = parseInt(window.getComputedStyle(etiqueta7, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta7.innerHTML = (rangeSliderAdicional7.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional7.value >= 190){
			etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7)) + (90))+"px";
		}else{
			if(rangeSliderAdicional7.value >= 180){
				etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional7.value >= 170){
					etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional7.value >= 160){
						etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional7.value >= 150){
							etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional7.value >= 140){
								etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional7.value >= 130){
									etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional7.value >= 120){
										etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional7.value >= 110){
											etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional7.value >= 100){
												etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional7.value >= 90){
													etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional7.value >= 80){
														etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional7.value >= 70){
															etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional7.value >= 60){
																etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional7.value >= 50){
																	etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional7.value >= 40){
																		etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (30))+"px";
																	}else{
																		etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional7.addEventListener('input',function(){
			var estantes0 = window.estantes0;
			var num = estantes0.length - 1;
			if(num == -1){
				var sum = 3;
			}else{
				sum = 2;
			}
			var etihtml = $("#etiquetaAdi21").text();
			  var calcu = (parseFloat(rangeSliderAdicional7.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+sum)],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta7.innerHTML =(rangeSliderAdicional7.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional7.value >= 190){
			etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional7.value >= 180){
				etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional7.value >= 170){
					etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional7.value >= 160){
						etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional7.value >= 150){
							etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional7.value >= 140){
								etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional7.value >= 130){
									etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional7.value >= 120){
										etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional7.value >= 110){
											etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional7.value >= 100){
												etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional7.value >= 90){
													etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional7.value >= 80){
														etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional7.value >= 70){
															etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional7.value >= 60){
																etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional7.value >= 50){
																	etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional7.value >= 40){
																		etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (30))+"px";
																	}else{
																		etiqueta7.style.left =  ((parseFloat(rangeSliderAdicional7.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional8 = document.getElementById("rs-range-lineAdicional31");
		$("#rs-range-lineAdicional31").attr("onmouseup","cambiarArmarioEstantes(2,2,3,1)");
		var inputDiv3 = document.querySelector('#inputDivAdi31');
		var w = parseInt(window.getComputedStyle(inputDiv3, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional8.style.width = "100%";
		var inputMin = rangeSliderAdicional8.getAttribute('min');
		var inputMax = rangeSliderAdicional8.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta8 = document.querySelector('#etiquetaAdi31');
		var ew = parseInt(window.getComputedStyle(etiqueta8, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta8.innerHTML = (rangeSliderAdicional8.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional8.value >= 190){
			etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional8.value >= 180){
				etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional8.value >= 170){
					etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional8.value >= 160){
						etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional8.value >= 150){
							etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional8.value >= 140){
								etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional8.value >= 130){
									etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional8.value >= 120){
										etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional8.value >= 110){
											etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional8.value >= 100){
												etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional8.value >= 90){
													etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional8.value >= 80){
														etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional8.value >= 70){
															etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional8.value >= 60){
																etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional8.value >= 50){
																	etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional8.value >= 40){
																		etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (30))+"px";
																	}else{
																		etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional8.addEventListener('input',function(){
			var estantes0 = window.estantes0;
			var num = estantes0.length - 1;
			if(num == -1){
				var sum = 4;
			}else{
				sum = 3;
			}
			var etihtml = $("#etiquetaAdi31").text();
			  var calcu = (parseFloat(rangeSliderAdicional8.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+sum)],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
			  etiqueta8.innerHTML =(rangeSliderAdicional8.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional8.value >= 190){
			etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional8.value >= 180){
				etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional8.value >= 170){
					etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional8.value >= 160){
						etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional8.value >= 150){
							etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional8.value >= 140){
								etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional8.value >= 130){
									etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional8.value >= 120){
										etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional8.value >= 110){
											etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional8.value >= 100){
												etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional8.value >= 90){
													etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional8.value >= 80){
														etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional8.value >= 70){
															etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional8.value >= 60){
																etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional8.value >= 50){
																	etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional8.value >= 40){
																		etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (30))+"px";
																	}else{
																		etiqueta8.style.left =  ((parseFloat(rangeSliderAdicional8.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional9 = document.getElementById("rs-range-lineAdicional41");
		$("#rs-range-lineAdicional41").attr("onmouseup","cambiarArmarioEstantes(2,3,4,1)");
		var inputDiv4 = document.querySelector('#inputDivAdi41');
		var w = parseInt(window.getComputedStyle(inputDiv4, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional9.style.width = "100%";
		var inputMin = rangeSliderAdicional9.getAttribute('min');
		var inputMax = rangeSliderAdicional9.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta9 = document.querySelector('#etiquetaAdi41');
		var ew = parseInt(window.getComputedStyle(etiqueta9, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta9.innerHTML = (rangeSliderAdicional9.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional9.value >= 190){
			etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional9.value >= 180){
				etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional9.value >= 170){
					etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional9.value >= 160){
						etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional9.value >= 150){
							etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional9.value >= 140){
								etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional9.value >= 130){
									etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional9.value >= 120){
										etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional9.value >= 110){
											etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional9.value >= 100){
												etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional9.value >= 90){
													etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional9.value >= 80){
														etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional9.value >= 70){
															etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional9.value >= 60){
																etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional9.value >= 50){
																	etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional9.value >= 40){
																		etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (30))+"px";
																	}else{
																		etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional9.addEventListener('input',function(){
			var estantes0 = window.estantes0;
			var num = estantes0.length - 1;
			if(num == -1){
				var sum = 5;
			}else{
				sum = 4;
			}
			var etihtml = $("#etiquetaAdi41").text();
			  var calcu = (parseFloat(rangeSliderAdicional9.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+sum)],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
			  etiqueta9.innerHTML =(rangeSliderAdicional9.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional9.value >= 190){
			etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional9.value >= 180){
				etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional9.value >= 170){
					etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional9.value >= 160){
						etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional9.value >= 150){
							etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional9.value >= 140){
								etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional9.value >= 130){
									etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional9.value >= 120){
										etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional9.value >= 110){
											etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional9.value >= 100){
												etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional9.value >= 90){
													etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional9.value >= 80){
														etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional9.value >= 70){
															etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional9.value >= 60){
																etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional9.value >= 50){
																	etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional9.value >= 40){
																		etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (30))+"px";
																	}else{
																		etiqueta9.style.left =  ((parseFloat(rangeSliderAdicional9.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional10 = document.getElementById("rs-range-lineAdicional51");
		$("#rs-range-lineAdicional51").attr("onmouseup","cambiarArmarioEstantes(2,4,5,1)");
		var inputDiv5 = document.querySelector('#inputDivAdi51');
		var w = parseInt(window.getComputedStyle(inputDiv5, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional10.style.width = "100%";
		var inputMin = rangeSliderAdicional10.getAttribute('min');
		var inputMax = rangeSliderAdicional10.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta10 = document.querySelector('#etiquetaAdi51');
		var ew = parseInt(window.getComputedStyle(etiqueta10, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta10.innerHTML = (rangeSliderAdicional10.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional10.value >= 190){
			etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional10.value >= 180){
				etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional10.value >= 170){
					etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional10.value >= 160){
						etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional10.value >= 150){
							etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional10.value >= 140){
								etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional10.value >= 130){
									etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional10.value >= 120){
										etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional10.value >= 110){
											etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional10.value >= 100){
												etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional10.value >= 90){
													etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional10.value >= 80){
														etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional10.value >= 70){
															etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional10.value >= 60){
																etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional10.value >= 50){
																	etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional10.value >= 40){
																		etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (30))+"px";
																	}else{
																		etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional10.addEventListener('input',function(){
			var estantes0 = window.estantes0;
			var num = estantes0.length - 1;
			if(num == -1){
				var sum = 6;
			}else{
				sum = 5;
			}
			var etihtml = $("#etiquetaAdi51").text();
			  var calcu = (parseFloat(rangeSliderAdicional10.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+sum)],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta10.innerHTML =(rangeSliderAdicional10.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional10.value >= 190){
			etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional10.value >= 180){
				etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional10.value >= 170){
					etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional10.value >= 160){
						etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional10.value >= 150){
							etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional10.value >= 140){
								etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional10.value >= 130){
									etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional10.value >= 120){
										etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional10.value >= 110){
											etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional10.value >= 100){
												etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional10.value >= 90){
													etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional10.value >= 80){
														etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional10.value >= 70){
															etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional10.value >= 60){
																etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional10.value >= 50){
																	etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional10.value >= 40){
																		etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (30))+"px";
																	}else{
																		etiqueta10.style.left =  ((parseFloat(rangeSliderAdicional10.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
  }
  
  if(estantes[2].length != 0){
	  
	    var rangeSliderAdicional11 = document.getElementById("rs-range-lineAdicional12");
		$("#rs-range-lineAdicional12").attr("onmouseup","cambiarArmarioEstantes(3,0,1,2)");
		var inputDiv = document.querySelector('#inputDivAdi12');
		var w = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional11.style.width = "100%";
		var inputMin = rangeSliderAdicional11.getAttribute('min');
		var inputMax = rangeSliderAdicional11.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta11 = document.querySelector('#etiquetaAdi12');
		var ew = parseInt(window.getComputedStyle(etiqueta11, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta11.innerHTML = (rangeSliderAdicional11.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional11.value >= 190){
			etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional11.value >= 180){
				etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional11.value >= 170){
					etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional11.value >= 160){
						etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional11.value >= 150){
							etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional11.value >= 140){
								etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional11.value >= 130){
									etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional11.value >= 120){
										etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional11.value >= 110){
											etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional11.value >= 100){
												etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional11.value >= 90){
													etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional11.value >= 80){
														etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional11.value >= 70){
															etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional11.value >= 60){
																etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional11.value >= 50){
																	etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional11.value >= 40){
																		etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (30))+"px";
																	}else{
																		etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional11.addEventListener('input',function(){
			var estantes0 = window.estantes0;
			var estantes1 = window.estantes1;
			var num = estantes0.length - 1;
			var num1 = estantes1.length - 1;
			var sum = 0;
			if(num == -1){
				if(num1 == -1){
					sum = 4;
				}else{
					sum = 3;
				}
			}else{
				if(num1 == -1){
					sum = 3;
				}else{
					sum = 2;
				}
			}
			var etihtml = $("#etiquetaAdi12").text();
			  var calcu = (parseFloat(rangeSliderAdicional11.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+sum)],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta11.innerHTML =(rangeSliderAdicional11.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional11.value >= 190){
			etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional11.value >= 180){
				etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional11.value >= 170){
					etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional11.value >= 160){
						etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional11.value >= 150){
							etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional11.value >= 140){
								etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional11.value >= 130){
									etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional11.value >= 120){
										etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional11.value >= 110){
											etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional11.value >= 100){
												etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional11.value >= 90){
													etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional11.value >= 80){
														etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional11.value >= 70){
															etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional11.value >= 60){
																etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional11.value >= 50){
																	etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional11.value >= 40){
																		etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (30))+"px";
																	}else{
																		etiqueta11.style.left =  ((parseFloat(rangeSliderAdicional11.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional12 = document.getElementById("rs-range-lineAdicional22");
		$("#rs-range-lineAdicional22").attr("onmouseup","cambiarArmarioEstantes(3,1,2,2)");
		var inputDiv2 = document.querySelector('#inputDivAdi22');
		var w = parseInt(window.getComputedStyle(inputDiv2, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional12.style.width = "100%";
		var inputMin = rangeSliderAdicional12.getAttribute('min');
		var inputMax = rangeSliderAdicional12.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta12 = document.querySelector('#etiquetaAdi22');
		var ew = parseInt(window.getComputedStyle(etiqueta12, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta12.innerHTML = (rangeSliderAdicional12.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional12.value >= 190){
			etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional12.value >= 180){
				etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional12.value >= 170){
					etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional12.value >= 160){
						etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional12.value >= 150){
							etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional12.value >= 140){
								etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional12.value >= 130){
									etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional12.value >= 120){
										etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional12.value >= 110){
											etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional12.value >= 100){
												etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional12.value >= 90){
													etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional12.value >= 80){
														etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional12.value >= 70){
															etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional12.value >= 60){
																etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional12.value >= 50){
																	etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional12.value >= 40){
																		etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (30))+"px";
																	}else{
																		etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional12.addEventListener('input',function(){
			var estantes0 = window.estantes0;
			var estantes1 = window.estantes1;
			var num = estantes0.length - 1;
			var num1 = estantes1.length - 1;
			var sum = 0;
			if(num == -1){
				if(num1 == -1){
					sum = 5;
				}else{
					sum = 3;
				}
			}else{
				if(num1 == -1){
					sum = 4;
				}else{
					sum = 3;
				}
			}
			var etihtml = $("#etiquetaAdi22").text();
			  var calcu = (parseFloat(rangeSliderAdicional12.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+sum)],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta12.innerHTML =(rangeSliderAdicional12.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional12.value >= 190){
			etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional12.value >= 180){
				etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional12.value >= 170){
					etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional12.value >= 160){
						etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional12.value >= 150){
							etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional12.value >= 140){
								etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional12.value >= 130){
									etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional12.value >= 120){
										etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional12.value >= 110){
											etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional12.value >= 100){
												etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional12.value >= 90){
													etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional12.value >= 80){
														etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional12.value >= 70){
															etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional12.value >= 60){
																etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional12.value >= 50){
																	etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional12.value >= 40){
																		etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (30))+"px";
																	}else{
																		etiqueta12.style.left =  ((parseFloat(rangeSliderAdicional12.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional13 = document.getElementById("rs-range-lineAdicional32");
		$("#rs-range-lineAdicional32").attr("onmouseup","cambiarArmarioEstantes(3,2,3,2)");
		var inputDiv3 = document.querySelector('#inputDivAdi32');
		var w = parseInt(window.getComputedStyle(inputDiv3, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional13.style.width = "100%";
		var inputMin = rangeSliderAdicional13.getAttribute('min');
		var inputMax = rangeSliderAdicional13.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta13 = document.querySelector('#etiquetaAdi32');
		var ew = parseInt(window.getComputedStyle(etiqueta13, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta13.innerHTML = (rangeSliderAdicional13.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional13.value >= 190){
			etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional13.value >= 180){
				etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional13.value >= 170){
					etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional13.value >= 160){
						etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional13.value >= 150){
							etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional13.value >= 140){
								etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional13.value >= 130){
									etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional13.value >= 120){
										etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional13.value >= 110){
											etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional13.value >= 100){
												etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional13.value >= 90){
													etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional13.value >= 80){
														etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional13.value >= 70){
															etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional13.value >= 60){
																etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional13.value >= 50){
																	etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional13.value >= 40){
																		etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (30))+"px";
																	}else{
																		etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional13.addEventListener('input',function(){
			var estantes0 = window.estantes0;
			var estantes1 = window.estantes1;
			var num = estantes0.length - 1;
			var num1 = estantes1.length - 1;
			var sum = 0;
			if(num == -1){
				if(num1 == -1){
					sum = 6;
				}else{
					sum = 3;
				}
			}else{
				if(num1 == -1){
					sum = 5;
				}else{
					sum = 4;
				}
			}
			var etihtml = $("#etiquetaAdi32").text();
			  var calcu = (parseFloat(rangeSliderAdicional13.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+sum)],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta13.innerHTML =(rangeSliderAdicional13.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional13.value >= 190){
			etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional13.value >= 180){
				etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional13.value >= 170){
					etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional13.value >= 160){
						etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional13.value >= 150){
							etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional13.value >= 140){
								etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional13.value >= 130){
									etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional13.value >= 120){
										etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional13.value >= 110){
											etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional13.value >= 100){
												etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional13.value >= 90){
													etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional13.value >= 80){
														etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional13.value >= 70){
															etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional13.value >= 60){
																etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional13.value >= 50){
																	etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional13.value >= 40){
																		etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (30))+"px";
																	}else{
																		etiqueta13.style.left =  ((parseFloat(rangeSliderAdicional13.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional14 = document.getElementById("rs-range-lineAdicional42");
		$("#rs-range-lineAdicional42").attr("onmouseup","cambiarArmarioEstantes(3,3,4,2)");
		var inputDiv4 = document.querySelector('#inputDivAdi42');
		var w = parseInt(window.getComputedStyle(inputDiv4, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional14.style.width = "100%";
		var inputMin = rangeSliderAdicional14.getAttribute('min');
		var inputMax = rangeSliderAdicional14.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta14 = document.querySelector('#etiquetaAdi42');
		var ew = parseInt(window.getComputedStyle(etiqueta14, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta14.innerHTML = (rangeSliderAdicional14.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional14.value >= 190){
			etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional14.value >= 180){
				etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional14.value >= 170){
					etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional14.value >= 160){
						etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional14.value >= 150){
							etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional14.value >= 140){
								etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional14.value >= 130){
									etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional14.value >= 120){
										etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional14.value >= 110){
											etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional14.value >= 100){
												etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional14.value >= 90){
													etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional14.value >= 80){
														etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional14.value >= 70){
															etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional14.value >= 60){
																etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional14.value >= 50){
																	etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional14.value >= 40){
																		etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (30))+"px";
																	}else{
																		etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional14.addEventListener('input',function(){
			var estantes0 = window.estantes0;
			var estantes1 = window.estantes1;
			var num = estantes0.length - 1;
			var num1 = estantes1.length - 1;
			var sum = 0;
			if(num == -1){
				if(num1 == -1){
					sum = 7;
				}else{
					sum = 3;
				}
			}else{
				if(num1 == -1){
					sum = 6;
				}else{
					sum = 5;
				}
			}
			var etihtml = $("#etiquetaAdi42").text();
			  var calcu = (parseFloat(rangeSliderAdicional14.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+sum)],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta14.innerHTML =(rangeSliderAdicional14.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional14.value >= 190){
			etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional14.value >= 180){
				etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional14.value >= 170){
					etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional14.value >= 160){
						etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional14.value >= 150){
							etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional14.value >= 140){
								etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional14.value >= 130){
									etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional14.value >= 120){
										etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional14.value >= 110){
											etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional14.value >= 100){
												etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional14.value >= 90){
													etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional14.value >= 80){
														etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional14.value >= 70){
															etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional14.value >= 60){
																etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional14.value >= 50){
																	etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional14.value >= 40){
																		etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (30))+"px";
																	}else{
																		etiqueta14.style.left =  ((parseFloat(rangeSliderAdicional14.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional15 = document.getElementById("rs-range-lineAdicional52");
		$("#rs-range-lineAdicional52").attr("onmouseup","cambiarArmarioEstantes(3,4,5,2)");
		var inputDiv5 = document.querySelector('#inputDivAdi52');
		var w = parseInt(window.getComputedStyle(inputDiv5, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional15.style.width = "100%";
		var inputMin = rangeSliderAdicional15.getAttribute('min');
		var inputMax = rangeSliderAdicional15.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta15 = document.querySelector('#etiquetaAdi52');
		var ew = parseInt(window.getComputedStyle(etiqueta15, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta15.innerHTML = (rangeSliderAdicional15.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional15.value >= 190){
			etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional15.value >= 180){
				etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional15.value >= 170){
					etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional15.value >= 160){
						etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional15.value >= 150){
							etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional15.value >= 140){
								etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional15.value >= 130){
									etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional15.value >= 120){
										etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional15.value >= 110){
											etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional15.value >= 100){
												etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional15.value >= 90){
													etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional15.value >= 80){
														etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional15.value >= 70){
															etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional15.value >= 60){
																etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional15.value >= 50){
																	etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional15.value >= 40){
																		etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (30))+"px";
																	}else{
																		etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional15.addEventListener('input',function(){
			var estantes0 = window.estantes0;
			var estantes1 = window.estantes1;
			var num = estantes0.length - 1;
			var num1 = estantes1.length - 1;
			var sum = 0;
			if(num == -1){
				if(num1 == -1){
					sum = 8;
				}else{
					sum = 3;
				}
			}else{
				if(num1 == -1){
					sum = 7;
				}else{
					sum = 6;
				}
			}
			var etihtml = $("#etiquetaAdi52").text();
			  var calcu = (parseFloat(rangeSliderAdicional15.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+sum)],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta15.innerHTML =(rangeSliderAdicional15.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional15.value >= 190){
			etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional15.value >= 180){
				etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional15.value >= 170){
					etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional15.value >= 160){
						etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional15.value >= 150){
							etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional15.value >= 140){
								etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional15.value >= 130){
									etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional15.value >= 120){
										etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional15.value >= 110){
											etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional15.value >= 100){
												etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional15.value >= 90){
													etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional15.value >= 80){
														etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional15.value >= 70){
															etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional15.value >= 60){
																etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional15.value >= 50){
																	etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional15.value >= 40){
																		etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (30))+"px";
																	}else{
																		etiqueta15.style.left =  ((parseFloat(rangeSliderAdicional15.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
  }
  
  if(estantes[3].length != 0){
	  
	    var rangeSliderAdicional16 = document.getElementById("rs-range-lineAdicional13");
		$("#rs-range-lineAdicional13").attr("onmouseup","cambiarArmarioEstantes(4,0,1,3)");
		var inputDiv = document.querySelector('#inputDivAdi13');
		var w = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional16.style.width = "100%";
		var inputMin = rangeSliderAdicional16.getAttribute('min');
		var inputMax = rangeSliderAdicional16.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta16 = document.querySelector('#etiquetaAdi13');
		var ew = parseInt(window.getComputedStyle(etiqueta16, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta16.innerHTML = (rangeSliderAdicional16.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional16.value >= 190){
			etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional16.value >= 180){
				etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional16.value >= 170){
					etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional16.value >= 160){
						etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional16.value >= 150){
							etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional16.value >= 140){
								etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional16.value >= 130){
									etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional16.value >= 120){
										etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional16.value >= 110){
											etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional16.value >= 100){
												etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional16.value >= 90){
													etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional16.value >= 80){
														etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional16.value >= 70){
															etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional16.value >= 60){
																etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional16.value >= 50){
																	etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional16.value >= 40){
																		etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (30))+"px";
																	}else{
																		etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional16.addEventListener('input',function(){
			var estantes0 = window.estantes0;
			var estantes1 = window.estantes1;
			var estantes2 = window.estantes2;
			var num = estantes0.length - 1;
			var num1 = estantes1.length - 1;
			var num2 = estantes2.length - 1;
			var sum = 0;
			if(num == -1){
				if(num1 == -1 && num2 != -1){
					sum = 5;
				}
				if(num2 == -1 && num1 != -1){
					sum = 5;
				}
				if(num2 != -1 && num1 != -1){
					sum = 4;
				}
				if(num2 == -1 && num1 == -1){
					sum = 4;
				}
			}else{
				if(num1 == -1 && num2 != -1){
					sum = 4;
				}
				if(num2 != -1 && num1 == -1){
					sum = 4;
				}
				if(num2 != -1 && num1 != -1){
					sum = 3;
				}
				if(num2 == -1 && num1 == -1){
					sum = 5;
				}
			}
			var etihtml = $("#etiquetaAdi13").text();
			  var calcu = (parseFloat(rangeSliderAdicional16.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+num2+sum)],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+num2+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta16.innerHTML =(rangeSliderAdicional16.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional16.value >= 190){
			etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional16.value >= 180){
				etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional16.value >= 170){
					etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional16.value >= 160){
						etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional16.value >= 150){
							etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional16.value >= 140){
								etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional16.value >= 130){
									etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional16.value >= 120){
										etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional16.value >= 110){
											etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional16.value >= 100){
												etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional16.value >= 90){
													etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional16.value >= 80){
														etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional16.value >= 70){
															etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional16.value >= 60){
																etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional16.value >= 50){
																	etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional16.value >= 40){
																		etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (30))+"px";
																	}else{
																		etiqueta16.style.left =  ((parseFloat(rangeSliderAdicional16.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional17 = document.getElementById("rs-range-lineAdicional23");
		$("#rs-range-lineAdicional23").attr("onmouseup","cambiarArmarioEstantes(4,1,2,3)");
		var inputDiv2 = document.querySelector('#inputDivAdi23');
		var w = parseInt(window.getComputedStyle(inputDiv2, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional17.style.width = "100%";
		var inputMin = rangeSliderAdicional17.getAttribute('min');
		var inputMax = rangeSliderAdicional17.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta17 = document.querySelector('#etiquetaAdi23');
		var ew = parseInt(window.getComputedStyle(etiqueta17, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta17.innerHTML = (rangeSliderAdicional17.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional17.value >= 190){
			etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional17.value >= 180){
				etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional17.value >= 170){
					etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional17.value >= 160){
						etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional17.value >= 150){
							etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional17.value >= 140){
								etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional17.value >= 130){
									etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional17.value >= 120){
										etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional17.value >= 110){
											etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional17.value >= 100){
												etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional17.value >= 90){
													etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional17.value >= 80){
														etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional17.value >= 70){
															etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional17.value >= 60){
																etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional17.value >= 50){
																	etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional17.value >= 40){
																		etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (30))+"px";
																	}else{
																		etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional17.addEventListener('input',function(){
			var estantes0 = window.estantes0;
			var estantes1 = window.estantes1;
			var estantes2 = window.estantes2;
			var num = estantes0.length - 1;
			var num1 = estantes1.length - 1;
			var num2 = estantes2.length - 1;
			var sum = 0;
			if(num == -1){
				if(num1 == -1 && num2 != -1){
					sum = 6;
				}
				if(num2 == -1 && num1 != -1){
					sum = 6;
				}
				if(num2 != -1 && num1 != -1){
					sum = 5;
				}
				if(num2 == -1 && num1 == -1){
					sum = 5;
				}
			}else{
				if(num1 == -1 && num2 != -1){
					sum = 5;
				}
				if(num2 != -1 && num1 == -1){
					sum = 5;
				}
				if(num2 != -1 && num1 != -1){
					sum = 4;
				}
				if(num2 == -1 && num1 == -1){
					sum = 6;
				}
			}
			var etihtml = $("#etiquetaAdi23").text();
			  var calcu = (parseFloat(rangeSliderAdicional17.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+num2+sum)],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+num2+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta17.innerHTML =(rangeSliderAdicional17.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional17.value >= 190){
			etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional17.value >= 180){
				etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional17.value >= 170){
					etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional17.value >= 160){
						etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional17.value >= 150){
							etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional17.value >= 140){
								etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional17.value >= 130){
									etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional17.value >= 120){
										etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional17.value >= 110){
											etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional17.value >= 100){
												etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional17.value >= 90){
													etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional17.value >= 80){
														etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional17.value >= 70){
															etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional17.value >= 60){
																etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional17.value >= 50){
																	etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional17.value >= 40){
																		etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (30))+"px";
																	}else{
																		etiqueta17.style.left =  ((parseFloat(rangeSliderAdicional17.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional18 = document.getElementById("rs-range-lineAdicional33");
		$("#rs-range-lineAdicional33").attr("onmouseup","cambiarArmarioEstantes(4,2,3,3)");
		var inputDiv3 = document.querySelector('#inputDivAdi33');
		var w = parseInt(window.getComputedStyle(inputDiv3, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional18.style.width = "100%";
		var inputMin = rangeSliderAdicional18.getAttribute('min');
		var inputMax = rangeSliderAdicional18.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta18 = document.querySelector('#etiquetaAdi33');
		var ew = parseInt(window.getComputedStyle(etiqueta18, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta18.innerHTML = (rangeSliderAdicional18.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional18.value >= 190){
			etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional18.value >= 180){
				etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional18.value >= 170){
					etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional18.value >= 160){
						etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional18.value >= 150){
							etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional18.value >= 140){
								etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional18.value >= 130){
									etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional18.value >= 120){
										etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional18.value >= 110){
											etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional18.value >= 100){
												etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional18.value >= 90){
													etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional18.value >= 80){
														etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional18.value >= 70){
															etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional18.value >= 60){
																etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional18.value >= 50){
																	etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional18.value >= 40){
																		etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (30))+"px";
																	}else{
																		etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional18.addEventListener('input',function(){
			var estantes0 = window.estantes0;
			var estantes1 = window.estantes1;
			var estantes2 = window.estantes2;
			var num = estantes0.length - 1;
			var num1 = estantes1.length - 1;
			var num2 = estantes2.length - 1;
			var sum = 0;
			if(num == -1){
				if(num1 == -1 && num2 != -1){
					sum = 7;
				}
				if(num2 == -1 && num1 != -1){
					sum = 7;
				}
				if(num2 != -1 && num1 != -1){
					sum = 6;
				}
				if(num2 == -1 && num1 == -1){
					sum = 6;
				}
			}else{
				if(num1 == -1 && num2 != -1){
					sum = 6;
				}
				if(num2 != -1 && num1 == -1){
					sum = 6;
				}
				if(num2 != -1 && num1 != -1){
					sum = 5;
				}
				if(num2 == -1 && num1 == -1){
					sum = 7;
				}
			}
			var etihtml = $("#etiquetaAdi33").text();
			  var calcu = (parseFloat(rangeSliderAdicional18.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+num2+sum)],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+num2+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta18.innerHTML =(rangeSliderAdicional18.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional18.value >= 190){
			etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional18.value >= 180){
				etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional18.value >= 170){
					etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional18.value >= 160){
						etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional18.value >= 150){
							etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional18.value >= 140){
								etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional18.value >= 130){
									etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional18.value >= 120){
										etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional18.value >= 110){
											etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional18.value >= 100){
												etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional18.value >= 90){
													etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional18.value >= 80){
														etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional18.value >= 70){
															etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional18.value >= 60){
																etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional18.value >= 50){
																	etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional18.value >= 40){
																		etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (30))+"px";
																	}else{
																		etiqueta18.style.left =  ((parseFloat(rangeSliderAdicional18.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional19 = document.getElementById("rs-range-lineAdicional43");
		$("#rs-range-lineAdicional43").attr("onmouseup","cambiarArmarioEstantes(4,3,4,3)");
		var inputDiv4 = document.querySelector('#inputDivAdi43');
		var w = parseInt(window.getComputedStyle(inputDiv4, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional19.style.width = "100%";
		var inputMin = rangeSliderAdicional19.getAttribute('min');
		var inputMax = rangeSliderAdicional19.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta19 = document.querySelector('#etiquetaAdi43');
		var ew = parseInt(window.getComputedStyle(etiqueta19, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta19.innerHTML = (rangeSliderAdicional19.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional19.value >= 190){
			etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional19.value >= 180){
				etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional19.value >= 170){
					etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional19.value >= 160){
						etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional19.value >= 150){
							etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional19.value >= 140){
								etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional19.value >= 130){
									etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional19.value >= 120){
										etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional19.value >= 110){
											etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional19.value >= 100){
												etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional19.value >= 90){
													etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional19.value >= 80){
														etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional19.value >= 70){
															etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional19.value >= 60){
																etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional19.value >= 50){
																	etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional19.value >= 40){
																		etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (30))+"px";
																	}else{
																		etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional19.addEventListener('input',function(){
			var estantes0 = window.estantes0;
			var estantes1 = window.estantes1;
			var estantes2 = window.estantes2;
			var num = estantes0.length - 1;
			var num1 = estantes1.length - 1;
			var num2 = estantes2.length - 1;
			var sum = 0;
			if(num == -1){
				if(num1 == -1 && num2 != -1){
					sum = 8;
				}
				if(num2 == -1 && num1 != -1){
					sum = 8;
				}
				if(num2 != -1 && num1 != -1){
					sum = 7;
				}
				if(num2 == -1 && num1 == -1){
					sum = 7;
				}
			}else{
				if(num1 == -1 && num2 != -1){
					sum = 7;
				}
				if(num2 != -1 && num1 == -1){
					sum = 7;
				}
				if(num2 != -1 && num1 != -1){
					sum = 6;
				}
				if(num2 == -1 && num1 == -1){
					sum = 8;
				}
			}
			var etihtml = $("#etiquetaAdi43").text();
			  var calcu = (parseFloat(rangeSliderAdicional19.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+num2+sum)],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+num2+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta19.innerHTML =(rangeSliderAdicional19.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional19.value >= 190){
			etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional19.value >= 180){
				etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional19.value >= 170){
					etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional19.value >= 160){
						etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional19.value >= 150){
							etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional19.value >= 140){
								etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional19.value >= 130){
									etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional19.value >= 120){
										etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional19.value >= 110){
											etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional19.value >= 100){
												etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional19.value >= 90){
													etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional19.value >= 80){
														etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional19.value >= 70){
															etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional19.value >= 60){
																etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional19.value >= 50){
																	etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional19.value >= 40){
																		etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (30))+"px";
																	}else{
																		etiqueta19.style.left =  ((parseFloat(rangeSliderAdicional19.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
		var rangeSliderAdicional20 = document.getElementById("rs-range-lineAdicional53");
		$("#rs-range-lineAdicional53").attr("onmouseup","cambiarArmarioEstantes(4,4,5,3)");
		var inputDiv5 = document.querySelector('#inputDivAdi53');
		var w = parseInt(window.getComputedStyle(inputDiv5, null).getPropertyValue("width"));
		/* EL INPUT */
		rangeSliderAdicional20.style.width = "100%";
		var inputMin = rangeSliderAdicional20.getAttribute('min');
		var inputMax = rangeSliderAdicional20.getAttribute('max');
		

		/* LA ETIQUETA */
		var etiqueta20 = document.querySelector('#etiquetaAdi53');
		var ew = parseInt(window.getComputedStyle(etiqueta20, null).getPropertyValue("width"));
		w = 300;
		var k = 260/(inputMax - inputMin);
		/* el valor de la etiqueta (el tooltip) */
		etiqueta20.innerHTML = (rangeSliderAdicional20.value);
		/* calcula la posición inicial de la etiqueta (el tooltip) */
		/* establece el estilo inicial del TRACK */
		if(rangeSliderAdicional20.value >= 190){
			etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional20.value >= 180){
				etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional20.value >= 170){
					etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional20.value >= 160){
						etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional20.value >= 150){
							etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional20.value >= 140){
								etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional20.value >= 130){
									etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional20.value >= 120){
										etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional20.value >= 110){
											etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional20.value >= 100){
												etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional20.value >= 90){
													etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional20.value >= 80){
														etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional20.value >= 70){
															etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional20.value >= 60){
																etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional20.value >= 50){
																	etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional20.value >= 40){
																		etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (30))+"px";
																	}else{
																		etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}



		rangeSliderAdicional20.addEventListener('input',function(){
			var estantes0 = window.estantes0;
			var estantes1 = window.estantes1;
			var estantes2 = window.estantes2;
			var num = estantes0.length - 1;
			var num1 = estantes1.length - 1;
			var num2 = estantes2.length - 1;
			var sum = 0;
			if(num == -1){
				if(num1 == -1 && num2 != -1){
					sum = 9;
				}
				if(num2 == -1 && num1 != -1){
					sum = 9;
				}
				if(num2 != -1 && num1 != -1){
					sum = 8;
				}
				if(num2 == -1 && num1 == -1){
					sum = 8;
				}
			}else{
				if(num1 == -1 && num2 != -1){
					sum = 8;
				}
				if(num2 != -1 && num1 == -1){
					sum = 8;
				}
				if(num2 != -1 && num1 != -1){
					sum = 7;
				}
				if(num2 == -1 && num1 == -1){
					sum = 9;
				}
			}
			var etihtml = $("#etiquetaAdi53").text();
			  var calcu = (parseFloat(rangeSliderAdicional20.value) * 10) - (parseFloat(etihtml)*10); 
			  window.object0 = api.scene.get({name: "EstantesGeo", format: "glb"},"CommPlugin_1").data[0];
			  window.object1 = api.scene.get({name: "EstantesCantosGeo", format: "glb"},"CommPlugin_1").data[0];
			  api.scene.setLiveTransformation(
					     [
					       {
					         scenePaths: ["CommPlugin_1."+object0.id +".content_"+(num+num1+num2+sum)],
					         transformations: [
					           {
					             delay: 0,
					             duration: 500,
					             type: 'translation',
					             easing: "Quartic.InOut",
					             translationVector: { x: 0, y: 0, z: calcu },
					             repeat: 0
					           }
					         ],reset:false
					       },
					       {
						         scenePaths: ["CommPlugin_1."+object1.id +".content_"+(num+num1+num2+sum)],
						         transformations: [
						           {
						             delay: 0,
						             duration: 500,
						             type: 'translation',
						             easing: "Quartic.InOut",
						             translationVector: { x: 0, y: 0, z: calcu },
						             repeat: 0
						           }
						         ],reset:false
						       }]);
		/* cambia el valor de la etiqueta (el tooltip) */
			etiqueta20.innerHTML =(rangeSliderAdicional20.value);
		/* cambia la posición de la etiqueta (el tooltip) */
		if(rangeSliderAdicional20.value >= 190){
			etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (90))+"px";
		}else{
			if(rangeSliderAdicional20.value >= 180){
				etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (80))+"px";
			}else{
				if(rangeSliderAdicional20.value >= 170){
					etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (70))+"px";
				}else{
					if(rangeSliderAdicional20.value >= 160){
						etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (65))+"px";
					}else{
						if(rangeSliderAdicional20.value >= 150){
							etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (60))+"px";
						}else{
							if(rangeSliderAdicional20.value >= 140){
								etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (55))+"px";
							}else{
								if(rangeSliderAdicional20.value >= 130){
									etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (48))+"px";
								}else{
									if(rangeSliderAdicional20.value >= 120){
										etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (40))+"px";
									}else{
										if(rangeSliderAdicional20.value >= 110){
											etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (32))+"px";
										}else{
											if(rangeSliderAdicional20.value >= 100){
												etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (24))+"px";
											}else{
												if(rangeSliderAdicional20.value >= 90){
													etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (16))+"px";
												}else{
													if(rangeSliderAdicional20.value >= 80){
														etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) + (8))+"px";
													}else{
														if(rangeSliderAdicional20.value >= 70){
															etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (2))+"px";
														}else{
															if(rangeSliderAdicional20.value >= 60){
																etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (12))+"px";
															}else{
																if(rangeSliderAdicional20.value >= 50){
																	etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (22))+"px";
																}else{
																	if(rangeSliderAdicional20.value >= 40){
																		etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (30))+"px";
																	}else{
																		etiqueta20.style.left =  ((parseFloat(rangeSliderAdicional20.value)) - (40))+"px";
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		/* cambia el estilo del TRACK */
		}, false);
		
  }
   
}




var arrayTimeOut = [];
var ya1vez = false;
var valorBullet = 0;
function showSliderValue() {
		$("#masgrandeBoton").css({"display":"none"});
		$("#maschicoBoton").css({"display":"none"});
		var rangeSlider = document.getElementById("rs-range-line");
		if(rangeSlider.value == rangeSlider.max && rangeSlider.value != 400){
			$("#masgrandeBoton").css({"display":"block"});
		}
		if(rangeSlider.value == rangeSlider.min && rangeSlider.value != 40){
			$("#maschicoBoton").css({"display":"block"});
		}
}
function masgrandebotonancho(){
	$("#rs-range-line").attr(window.funcClic,"cambiarVistaArmario(1)");
	if(window.obj != undefined){
		window.obj = undefined;
		var parame = api.parameters.get({'name':'InterioresJSON'},"CommPlugin_1").data[0];
		api.parameters.updateAsync({
			id: parame.id,
		    value: '{}'
		}).then(
	            function(response) {
	            	$("#clicinterioresAumentarInt")[0].click();
	            }
		);
		for(let u = 0; u<5;u++){
			for(let o = 0;o<9;o++){
				$('#divAdicionalesInterior' + u + ' .divSliderAdi' + (o + 1) + '' + u).css({ display: 'none' });
		        $('#divAdicionalesInterior' + u + ' #divContenidoMeter' + (o + 1) + '' + u).css({ display: 'none' });
		        $('#divAdicionalesInterior' + u + ' #textoadicional' + (o + 1)).css({ display: 'none' });
		        $('#inputInterior' + o).empty();
			}
			$('#divInterioresTdoPrincipal' + u + ' #interiorpredefinidoadicional1').css({ display: 'none' });
			$('#divInterioresTdoPrincipal' + u + ' #interiorpredefinidoadicional2').css({ display: 'none' });
			$("#divInterioresTdoPrincipal"+u+" #opcionInteriorEst #inputOpcion").val("");
			$("#divInterioresTdoPrincipal"+u+" #opcionInteriorMedida #inputOpcion").val("");
			$("#divInterioresTdoPrincipal"+u+" #opcionInteriorEst #inputOpcion").val("");
			$("#divInterioresTdoPrincipal"+u+" #opcionInteriorMedida #inputOpcion").val("");
			$("#divInterioresTdoPrincipal"+u+" #estanquitadosLosInteriores").css({"display":"none"});
			$('#divInterioresTdoPrincipal' + (u)).css({ border: '3px solid #EC1C1C' });
		}
		
		
	}
	var etiqueta = document.querySelector('#etiqueta');
	etiqueta.style.left =  "0px";
	$("#masgrandeBoton").css({"display":"none"});
	$("#maschicoBoton").css({"display":"block"});
	var rangeSlider = document.getElementById("rs-range-line");
	rangeSlider.min = 200;
	rangeSlider.max = 400;
	$("#valorMinDeAncho").text("200");
	$("#valorMaxDeAncho").text("400");
}
function maschicobotonancho(){
	$("#rs-range-line").attr(window.funcClic,"cambiarVistaArmario(1)");
	if(window.obj != undefined){
		window.obj = undefined;
		var parame = api.parameters.get({'name':'InterioresJSON'},"CommPlugin_1").data[0];
		api.parameters.updateAsync({
			id: parame.id,
		    value: '{}'
		}).then(
	            function(response) {
	            	$("#clicinterioresAumentarInt")[0].click();
	            }
		);
		for(let u = 0; u<5;u++){
			for(let o = 0;o<9;o++){
				$('#divAdicionalesInterior' + u + ' .divSliderAdi' + (o + 1) + '' + u).css({ display: 'none' });
		        $('#divAdicionalesInterior' + u + ' #divContenidoMeter' + (o + 1) + '' + u).css({ display: 'none' });
		        $('#divAdicionalesInterior' + u + ' #textoadicional' + (o + 1)).css({ display: 'none' });
			}
		}
	}
	var etiqueta = document.querySelector('#etiqueta');
	etiqueta.style.left =  "280px";
	$("#masgrandeBoton").css({"display":"block"});
	$("#maschicoBoton").css({"display":"none"});
	var rangeSlider = document.getElementById("rs-range-line");
	rangeSlider.min = 40;
	rangeSlider.max = 200;
	$("#valorMinDeAncho").text("40");
	$("#valorMaxDeAncho").text("200");
}

function cambiarArmarioEstantes(id,id1,posicion,num){
	var rangeSlider = document.getElementById("rs-range-lineAdicional"+posicion+""+num);
	var obj = window.obj;
	var cont = 0;
	var contDef = 0;
	var length = obj["interiores"].length;
	var array = [];
	var arrayDef = [];
	for(let i = 0;i<length;i++){
		if(obj["interiores"][i]["interior"] == (id - 1)){
			array[cont] = obj["interiores"][i];
			arrayDef[cont] = i
			cont++;
		}
		
	}
		var pos = 100;
		for(let e = 0;e < array.length;e++){
			if(array[e]["tipo"] == "camisero"){
				if(array[id1]["altura"] == array[e]["posicion"]){
					pos = e;
				}
			}
		}
		array[id1]["posicion"] = parseFloat(rangeSlider.value) * 10; 
		array[id1]["altura"] = ( parseFloat(rangeSlider.value) * 10 ) + (array[id1]["tamano"]);
		if(pos != 100){
			array[pos]["posicion"] = ( parseFloat(rangeSlider.value) * 10 ) + (array[id1]["tamano"]);
			obj["interiores"][arrayDef[pos]] = array[pos];
		}
		obj["interiores"][arrayDef[id1]] = array[id1];
		
	
	window.obj = obj;
	$("#clicparaConfirmarMoverInteriores").attr("class",""+JSON.stringify(obj)+"");
	$("#clicparaConfirmarMoverInteriores")[0].click();
}


function showSliderValue1() {
	var rangeSlider = document.getElementById("rs-range-line1");
	//var rangeBullet = document.getElementById("rs-bullet1");
	var rangeSlider1 = document.getElementById("rs-range-line");
  //rangeBullet.innerHTML = rangeSlider.value;
  $("#inputAlturaArmario").val(parseFloat(rangeSlider.value) * 10);
  var bulletPosition = (rangeSlider.value /rangeSlider.max);
  	if(rangeSlider.value == 260){
  		bulletPosition = 416.16;
  	}
  	if(rangeSlider.value == 259){
		bulletPosition = 408.8;
	}
  	if(rangeSlider.value == 258){
		bulletPosition = 402.01;
	}
	if(rangeSlider.value == 257){
			bulletPosition = 395.352;
		}
	if(rangeSlider.value == 256){
			bulletPosition = 384.948;
		}
	if(rangeSlider.value == 255){
		bulletPosition = 374.544;
	}
	if(rangeSlider.value == 254){
			bulletPosition = 364.14;
		}
	if(rangeSlider.value == 253){
		bulletPosition = 353.736;
	}
	if(rangeSlider.value == 252){
			bulletPosition = 343.332;
		}
	if(rangeSlider.value == 251){
		bulletPosition =  332.928;
	}
	if(rangeSlider.value == 250){
			bulletPosition = 322.524;
		}
	if(rangeSlider.value == 249){
		bulletPosition = 312.12;
	}
	if(rangeSlider.value == 248){
		bulletPosition = 291.312;
	}
	if(rangeSlider.value == 247){
			bulletPosition = 280.908;
		}
	if(rangeSlider.value == 246){
			bulletPosition = 270.504;
		}
	if(rangeSlider.value == 245){
		bulletPosition = 260.1;
	}
	if(rangeSlider.value == 244){
			bulletPosition = 249.696;
		}
	if(rangeSlider.value == 243){
		bulletPosition = 239.292;
	}
	if(rangeSlider.value == 242){
			bulletPosition = 228.888;
		}
	if(rangeSlider.value == 241){
		bulletPosition =  218.484;
	}
	if(rangeSlider.value == 240){
			bulletPosition = 208.08;
		}
	if(rangeSlider.value == 239){
		bulletPosition = 200.8;
	}
  	if(rangeSlider.value == 238){
		bulletPosition = 192.01;
	}
	if(rangeSlider.value == 237){
			bulletPosition = 184.352;
		}
	if(rangeSlider.value == 236){
			bulletPosition = 172.948;
		}
	if(rangeSlider.value == 235){
		bulletPosition = 164.544;
	}
	if(rangeSlider.value == 234){
			bulletPosition = 159.14;
		}
	if(rangeSlider.value == 233){
		bulletPosition = 153.736;
	}
	if(rangeSlider.value == 232){
			bulletPosition = 143.332;
		}
	if(rangeSlider.value == 231){
		bulletPosition =  145.928;
	}
	if(rangeSlider.value == 230){
			bulletPosition = 137.4;
		}
	if(rangeSlider.value == 229){
		bulletPosition = 129.3;
	}
	if(rangeSlider.value == 228){
		bulletPosition = 121.2;
	}
	if(rangeSlider.value == 227){
			bulletPosition = 113.01;
		}
	if(rangeSlider.value == 226){
			bulletPosition = 105.7;
		}
	if(rangeSlider.value == 225){
		bulletPosition = 97.5;
	}
	if(rangeSlider.value == 224){
			bulletPosition = 89.5;
		}
	if(rangeSlider.value == 223){
		bulletPosition = 81.8;
	}
	if(rangeSlider.value == 222){
			bulletPosition = 73.8;
		}
	if(rangeSlider.value == 221){
		bulletPosition =  65.8;
	}
	if(rangeSlider.value == 220){
			bulletPosition = 57,8;
		}
  
  //rangeBullet.style.left = (bulletPosition) + "px";
}

function ocultarPuertasFuncion(){
	api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath +".content_0"]);
}
function mostrarPuertasFuncion(){
	api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath +".content_0"],[]);
}
function showSliderValue2() {
	var rangeSlider = document.getElementById("rs-range-line2");
	var rangeSlider1 = document.getElementById("rs-range-line");
	var rangeBullet = document.getElementById("rs-bullet2");

  rangeBullet.innerHTML = rangeSlider.value;
  var bulletPosition = (rangeSlider1.value /rangeSlider1.max);
  if(rangeSlider.value == 70){
		bulletPosition = 416.16;
	}
  if(rangeSlider.value == 69){
		bulletPosition = 393.8;
	}
  if(rangeSlider.value == 68){
		bulletPosition = 368.8;
	}
	if(rangeSlider.value == 67){
		bulletPosition = 348.8;
	}
	if(rangeSlider.value == 66){
		bulletPosition = 328.8;
	}
	if(rangeSlider.value == 65){
		bulletPosition = 308.8;
	}
	if(rangeSlider.value == 64){
		bulletPosition = 288.8;
	}
	if(rangeSlider.value == 63){
		bulletPosition = 268.8;
	}
	if(rangeSlider.value == 62){
		bulletPosition = 248.8;
	}
	if(rangeSlider.value == 61){
		bulletPosition = 228.8;
	}
  if(rangeSlider.value == 60){
		bulletPosition = 208.08;
	}
  if(rangeSlider.value == 59){
		bulletPosition = 185.8;
	}
  if(rangeSlider.value == 58){
		bulletPosition = 167.8;
	}
  if(rangeSlider.value == 57){
		bulletPosition = 142.8;
	}
  if(rangeSlider.value == 56){
		bulletPosition = 125.8;
	}
  if(rangeSlider.value == 55){
		bulletPosition = 112.8;
	}
  if(rangeSlider.value == 54){
		bulletPosition = 103.8;
	}
  if(rangeSlider.value == 53){
		bulletPosition = 89.8;
	}
  if(rangeSlider.value == 52){
		bulletPosition = 78.8;
	}
  if(rangeSlider.value == 51){
		bulletPosition = 68.8;
	}
  if(rangeSlider.value == 50){
		bulletPosition = 57.8;
	}
  rangeBullet.style.left = (bulletPosition) + "px";
  
  
}
//funcion mover
function divcontenidometerfuncion(u,id){
	var shelves = api.scene.get(
	        { 
	          name: "EstantesGeo",
	          format: "glb"
	        },
	        "CommPlugin_1"
	      ).data[0];
	var tubos = api.scene.get(
	        { 
	          name: "tubos",
	          format: "glb"
	        },
	        "CommPlugin_1"
	      ).data[0];
	      
	 var shelvesSides = api.scene.get(
	        {
	          name: "EstantesCantosGeo",
	          format: "glb"
	        },
	        "CommPlugin_1"
	      ).data[0];
	 var cantosCajones = api.scene.get(
		        { 
		          name: "CantosCajones",
		          format: "glb"
		        },
		        "CommPlugin_1"
		      ).data[0];
	 var cajones = api.scene.get(
		        { 
		          name: "Cajones",
		          format: "glb"
		        },
		        "CommPlugin_1"
		      ).data[0];
	 var camiseros = api.scene.get(
		        { 
		          name: "Camiseros",
		          format: "glb"
		        },
		        "CommPlugin_1"
		      ).data[0];
	 var estantesCristal = api.scene.get(
		        { 
		          name: "EstantesCristal",
		          format: "glb"
		        },
		        "CommPlugin_1"
		      ).data[0];
	 
	 
	 
	var obj = window.obj;
	var array = [];
	var contg = 0;
	var length = obj["interiores"].length;
	 for(let h = 0;h<length;h++){

			  array[contg] = obj["interiores"][h];
			  contg++;
		  
	 }
	 var contTubo = 0;
	 var contEst = 0;
	 var contCaj = 0;
	 var contCami = 0;
	 var contCris = 0;
	 for(let l = 0;l<25;l++){
		 if(shelvesSides != undefined){
			 shelvesScenePaths = [shelvesSides.scenePath + ".content_"+l+".transformation_0.node_0.mesh_0.primitive_0",shelves.scenePath + ".content_"+l+".transformation_0.node_0.mesh_0.primitive_0"];
			 api.scene.updateSelected([],shelvesScenePaths);
		 }
	   	 
		 if(cajones != undefined){
			 cajonesScenePaths = [cajones.scenePath + ".content_"+(l)+".transformation_0.node_0.mesh_0.primitive_0",cantosCajones.scenePath + ".content_"+(l)+".transformation_0.node_0.mesh_0.primitive_0"];
			 api.scene.updateSelected([],cajonesScenePaths);
		 }
		 
		 if(tubos != undefined){
			 tubosScenePaths = [tubos.scenePath + ".content_"+(contTubo)+".transformation_0.node_0.mesh_0.primitive_0"];
			 api.scene.updateSelected([],tubosScenePaths);
		 }
		 
		 if(camiseros != undefined){
			 camiserosScenePaths = [camiseros.scenePath + ".content_"+(0)+".transformation_0.node_0.mesh_0.primitive_0"];
			 api.scene.updateSelected([],camiserosScenePaths);
		 }
		 
		 if(estantesCristal != undefined){
			 estantesCristalScenePaths = [estantesCristal.scenePath + ".content_"+(0)+".transformation_0.node_0.mesh_0.primitive_0"];
			 api.scene.updateSelected([],estantesCristalScenePaths);
		 }
		 
		 
     }
	 
	 
	 if(id == 0){
		 var arrayIntTodo = [];
		 var contArray1 = 0;
		 for(let i = 0;i<array.length;i++){
			 if(array[i]["interior"] == 0){
				 arrayIntTodo[contArray1] = array[i];
				 contArray1++;
			 }
		 }
		 
				 if(arrayIntTodo[u-1]["tipo"] == "estante"){
					 shelvesScenePaths = [shelvesSides.scenePath + ".content_"+arrayIntTodo[u-1]["posicionShape"]+".transformation_0.node_0.mesh_0.primitive_0",shelves.scenePath + ".content_"+arrayIntTodo[u-1]["posicionShape"]+".transformation_0.node_0.mesh_0.primitive_0"];
					  api.scene.updateSelected(shelvesScenePaths);
					  contEst++;
				 }
				 if(arrayIntTodo[u-1]["tipo"] == "tubo"){
					 tubosScenePaths = [tubos.scenePath + ".content_0.transformation_0.node_"+arrayIntTodo[u-1]["posicionShape"]+".mesh_0.primitive_0"];
					  api.scene.updateSelected(tubosScenePaths);
					  contTubo++;
				 }
				 if(arrayIntTodo[u-1]["tipo"] == "cajones"){
					 cajonesScenePaths = [cajones.scenePath + ".content_"+ arrayIntTodo[u-1]["posicionShape"]+".transformation_0.node_0.mesh_0.primitive_0",cantosCajones.scenePath + ".content_"+ arrayIntTodo[u-1]["posicionShape"]+".transformation_0.node_0.mesh_0.primitive_0"];
					  api.scene.updateSelected(cajonesScenePaths);
					  contCaj++;
				 }
				 if(arrayIntTodo[u-1]["tipo"] == "camisero"){
					 camiserosScenePaths = [camiseros.scenePath + ".content_0.transformation_0.node_"+arrayIntTodo[u-1]["posicionShape"]+".mesh_0.primitive_0"];
					  api.scene.updateSelected(camiserosScenePaths);
					  contCami++;
				 }
				 if(arrayIntTodo[u-1]["tipo"] == "estantecristal"){
					 estantesCristalScenePaths = [estantesCristal.scenePath + ".content_0.transformation_0.node_"+arrayIntTodo[u-1]["posicionShape"]+".mesh_0.primitive_0"];
					  api.scene.updateSelected(estantesCristalScenePaths);
					  contCris++;
				 }
			 
	 }
	 var cont1 = 0;
	 var cont1Tubo = 0;
	 var cont1Cajones = 0;
	 var contTotal = 0;
	 var arrayIntTodo = [];
	 var contArray1 = 0;
	 if(id == 1){
		 for(let i = 0;i<array.length;i++){
			 if(array[i]["interior"] == 1){
				 arrayIntTodo[contArray1] = array[i];
				 contArray1++;
			 }
		 }
				 if(arrayIntTodo[u-1]["tipo"] == "estante"){
					 shelvesScenePaths = [shelvesSides.scenePath + ".content_"+arrayIntTodo[u-1]["posicionShape"]+".transformation_0.node_0.mesh_0.primitive_0",shelves.scenePath + ".content_"+ arrayIntTodo[u-1]["posicionShape"]+".transformation_0.node_0.mesh_0.primitive_0"];
					  api.scene.updateSelected(shelvesScenePaths);
					  contEst++;
				 }
				 if(arrayIntTodo[u-1]["tipo"] == "tubo"){
					 tubosScenePaths = [tubos.scenePath + ".content_0.transformation_0.node_"+arrayIntTodo[u-1]["posicionShape"]+".mesh_0.primitive_0"];
					  api.scene.updateSelected(tubosScenePaths);
				 }
				 if(arrayIntTodo[u-1]["tipo"] == "cajones"){
					 cajonesScenePaths = [cajones.scenePath + ".content_"+arrayIntTodo[u-1]["posicionShape"]+".transformation_0.node_0.mesh_0.primitive_0",cantosCajones.scenePath + ".content_"+arrayIntTodo[u-1]["posicionShape"]+".transformation_0.node_0.mesh_0.primitive_0"];
					  api.scene.updateSelected(cajonesScenePaths);
					  contCaj++;
				 }
				 if(arrayIntTodo[u-1]["tipo"] == "estantecristal"){
					 estantesCristalScenePaths = [estantesCristal.scenePath + ".content_0.transformation_0.node_"+arrayIntTodo[u-1]["posicionShape"]+".mesh_0.primitive_0"];
					  api.scene.updateSelected(estantesCristalScenePaths);
					  contCris++;
				 }
	 }
	 
	 var cont1 = 0;
	 var cont1Tubo = 0;
	 var cont1Cajones = 0;
	 var contTotal = 0;
	 var arrayIntTodo = [];
	 var contArray1 = 0;
	 if(id == 2){
		 for(let i = 0;i<array.length;i++){
			 if(array[i]["interior"] == 2){
				 arrayIntTodo[contArray1] = array[i];
				 contArray1++;
			 }
		 }
				 if(arrayIntTodo[u-1]["tipo"] == "estante"){
					 shelvesScenePaths = [shelvesSides.scenePath + ".content_"+arrayIntTodo[u-1]["posicionShape"]+".transformation_0.node_0.mesh_0.primitive_0",shelves.scenePath + ".content_"+arrayIntTodo[u-1]["posicionShape"]+".transformation_0.node_0.mesh_0.primitive_0"];
					  api.scene.updateSelected(shelvesScenePaths);
					  contEst++;
				 }
				 if(arrayIntTodo[u-1]["tipo"] == "tubo"){
					 tubosScenePaths = [tubos.scenePath + ".content_0.transformation_0.node_"+arrayIntTodo[u-1]["posicionShape"]+".mesh_0.primitive_0"];
					  api.scene.updateSelected(tubosScenePaths);
				 }
				 if(arrayIntTodo[u-1]["tipo"] == "cajones"){
					 cajonesScenePaths = [cajones.scenePath + ".content_"+arrayIntTodo[u-1]["posicionShape"]+".transformation_0.node_0.mesh_0.primitive_0",cantosCajones.scenePath + ".content_"+arrayIntTodo[u-1]["posicionShape"]+".transformation_0.node_0.mesh_0.primitive_0"];
					  api.scene.updateSelected(cajonesScenePaths);
					  contCaj++;
				 }
				 if(arrayIntTodo[u-1]["tipo"] == "estantecristal"){
					 estantesCristalScenePaths = [estantesCristal.scenePath + ".content_0.transformation_0.node_"+arrayIntTodo[u-1]["posicionShape"]+".mesh_0.primitive_0"];
					  api.scene.updateSelected(estantesCristalScenePaths);
					  contCris++;
				 }
	 }
	 
	 var cont1 = 0;
	 var cont1Tubo = 0;
	 var cont1Cajones = 0;
	 var contTotal = 0;
	 var arrayIntTodo = [];
	 var contArray1 = 0;
	 if(id == 3){
		 for(let i = 0;i<array.length;i++){
			 if(array[i]["interior"] == 3){
				 arrayIntTodo[contArray1] = array[i];
				 contArray1++;
			 }
		 }
				 if(arrayIntTodo[u-1]["tipo"] == "estante"){
					 shelvesScenePaths = [shelvesSides.scenePath + ".content_"+arrayIntTodo[u-1]["posicionShape"]+".transformation_0.node_0.mesh_0.primitive_0",shelves.scenePath + ".content_"+arrayIntTodo[u-1]["posicionShape"]+".transformation_0.node_0.mesh_0.primitive_0"];
					  api.scene.updateSelected(shelvesScenePaths);
					  contEst++;
				 }
				 if(arrayIntTodo[u-1]["tipo"] == "tubo"){
					 tubosScenePaths = [tubos.scenePath + ".content_0.transformation_0.node_"+arrayIntTodo[u-1]["posicionShape"]+".mesh_0.primitive_0"];
					  api.scene.updateSelected(tubosScenePaths);
				 }
				 if(arrayIntTodo[u-1]["tipo"] == "cajones"){
					 cajonesScenePaths = [cajones.scenePath + ".content_"+arrayIntTodo[u-1]["posicionShape"]+".transformation_0.node_0.mesh_0.primitive_0",cantosCajones.scenePath + ".content_"+arrayIntTodo[u-1]["posicionShape"]+".transformation_0.node_0.mesh_0.primitive_0"];
					  api.scene.updateSelected(cajonesScenePaths);
					  contCaj++;
				 }
				 if(arrayIntTodo[u-1]["tipo"] == "estantecristal"){
					 estantesCristalScenePaths = [estantesCristal.scenePath + ".content_0.transformation_0.node_"+arrayIntTodo[u-1]["posicionShape"]+".mesh_0.primitive_0"];
					  api.scene.updateSelected(estantesCristalScenePaths);
					  contCris++;
				 }
	 }
	
	      
	for(let o = 0;o<9;o++){
		$("#divAdicionalesInterior0 #divContenidoMeter"+o+"0 #divOscuroOpOpcionesSlider").remove();
		$("#divAdicionalesInterior1 #divContenidoMeter"+o+"1 #divOscuroOpOpcionesSlider").remove();
		$("#divAdicionalesInterior2 #divContenidoMeter"+o+"2 #divOscuroOpOpcionesSlider").remove();
		$("#divAdicionalesInterior3 #divContenidoMeter"+o+"3 #divOscuroOpOpcionesSlider").remove();
		$("#divAdicionalesInterior0 #divContenidoMeter"+o+"0").attr("onclick","divcontenidometerfuncion("+o+",0)");
		$("#divAdicionalesInterior0 #divContenidoMeter"+o+"0").append('<div id="divOscuroOpOpcionesSlider" style="width:88%;height:165px;position:absolute;opacity: 0.6;background-color: white;z-index: 20;"></div>');
		$("#divAdicionalesInterior1 #divContenidoMeter"+o+"1").attr("onclick","divcontenidometerfuncion("+o+",1)");
		$("#divAdicionalesInterior1 #divContenidoMeter"+o+"1").append('<div id="divOscuroOpOpcionesSlider" style="width:88%;height:165px;position:absolute;opacity: 0.6;background-color: white;z-index: 20;"></div>');
		$("#divAdicionalesInterior2 #divContenidoMeter"+o+"2").attr("onclick","divcontenidometerfuncion("+o+",2)");
		$("#divAdicionalesInterior2 #divContenidoMeter"+o+"2").append('<div id="divOscuroOpOpcionesSlider" style="width:88%;height:165px;position:absolute;opacity: 0.6;background-color: white;z-index: 20;"></div>');
		$("#divAdicionalesInterior3 #divContenidoMeter"+o+"3").attr("onclick","divcontenidometerfuncion("+o+",3)");
		$("#divAdicionalesInterior3 #divContenidoMeter"+o+"3").append('<div id="divOscuroOpOpcionesSlider" style="width:88%;height:165px;position:absolute;opacity: 0.6;background-color: white;z-index: 20;"></div>');
	}
	
	$("#divAdicionalesInterior"+id+" #divContenidoMeter"+u+""+id).removeAttr("onclick");
	$("#divAdicionalesInterior"+id+" #divContenidoMeter"+u+""+id+" #divOscuroOpOpcionesSlider").remove();
	
	var estantes0 = window.estantes0;
	var estantes1 = window.estantes1;
	var estantes2 = window.estantes2;
	var estantes3 = window.estantes3;	
	
}
function estaMarcadoDivArm(div){
	//if(div == 'divElegirOpcionSlider'){
	document.querySelector(div).scrollIntoView(true);
		if(div == "#divPuerta0" || div == "#divPuerta1" || div == "#divPuerta2" || div == "#divPuerta3" || div == "#divPuerta4" || div == "#divPuerta5" || div == "#divPuerta6" || div == "#divPuerta7"){
			if(armario == 1){
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"],[]);
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"],[]);
				  }
				  

			  }
			  if(armario == 2){
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"],[]);
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"],[]);
				  }
				  
			  }
			  if(armario == 3){

				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"],[]);
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"],[]);
				  }
				  
			  }
			  if(armario == 4){

				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"],[]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"],[]);
				  }
				 
			  }
			  if(armario == 5){

				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"],[]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_4"],[]);
				  }
				  
			  }
			  if(armario == 6){

				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_5"],[]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_4"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_5"],[]);
				  }
				  
			  }
			  if(armario == 7){

				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_5"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_6"],[]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_4"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_5"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_6"],[]);
				  }
				  
			  }
			  if(armario == 8){

				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_5"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_6"],[]);
				  api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_7"],[]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_4"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_5"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_6"],[]);
					  api.scene.toggleGeometry([api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_7"],[]);
				  }
				  
			  }
			
		}else{
			if(armario == 1){
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "material" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  }
			  }
			  if(armario == 2){
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
				  }
				  
			  }
			  if(armario == 3){

				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
				  }

			  }
			  if(armario == 4){

				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
				  }

			  }
			  if(armario == 5){

				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
					  
				  }

			  }
			  if(armario == 6){

				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
					  
				  }
				  
			  }
			  if(armario == 7){

				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_6"]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_6"]);
					  
				  }
				  
			  }
			  if(armario == 8){

				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_6"]);
				  api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath+".content_7"]);
				  
				  if(window.tieneTiradores == 1){
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_0"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_1"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_2"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_3"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_4"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_5"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_6"]);
					  api.scene.toggleGeometry([],[api.scene.get({ name: "Tiradores" , format: "glb" }, "CommPlugin_1").data[0].scenePath+".content_7"]);
				  }
				  
			  }
			
		}
		$(div).removeAttr("onclick");
		var parts = [];
		if(div != ".divElegirOpcionSlider" && div != ".divSlider"){
			parts = div.split("#");
		}else{
			parts = div.split(".");
		}
		if(div == ".divSlider"){
			$(".divSlider").css({"height":"565px"});
		}
		
		var shelves = api.scene.get(
		        { 
		          name: "EstantesGeo",
		          format: "glb"
		        },
		        "CommPlugin_1"
		      ).data[0];
		var tubos = api.scene.get(
		        { 
		          name: "tubos",
		          format: "glb"
		        },
		        "CommPlugin_1"
		      ).data[0];
		      
		 var shelvesSides = api.scene.get(
		        {
		          name: "EstantesCantosGeo",
		          format: "glb"
		        },
		        "CommPlugin_1"
		      ).data[0];
		 var cantosCajones = api.scene.get(
			        { 
			          name: "CantosCajones",
			          format: "glb"
			        },
			        "CommPlugin_1"
			      ).data[0];
		 var cajones = api.scene.get(
			        { 
			          name: "Cajones",
			          format: "glb"
			        },
			        "CommPlugin_1"
			      ).data[0];
		 var camiseros = api.scene.get(
			        { 
			          name: "Camiseros",
			          format: "glb"
			        },
			        "CommPlugin_1"
			      ).data[0];
		 var estantesCristal = api.scene.get(
			        { 
			          name: "EstantesCristal",
			          format: "glb"
			        },
			        "CommPlugin_1"
			      ).data[0];
		 for(let l = 0;l<25;l++){
			 if(shelvesSides != undefined){
				 shelvesScenePaths = [shelvesSides.scenePath + ".content_"+l+".transformation_0.node_0.mesh_0.primitive_0",shelves.scenePath + ".content_"+l+".transformation_0.node_0.mesh_0.primitive_0"];
				 api.scene.updateSelected([],shelvesScenePaths);
			 }
		   	 
			 if(cajones != undefined){
				 cajonesScenePaths = [cajones.scenePath + ".content_"+(l)+".transformation_0.node_0.mesh_0.primitive_0",cantosCajones.scenePath + ".content_"+(l)+".transformation_0.node_0.mesh_0.primitive_0"];
				 api.scene.updateSelected([],cajonesScenePaths);
			 }
			 
			 if(tubos != undefined){
				 tubosScenePaths = [tubos.scenePath + ".content_"+(l)+".transformation_0.node_0.mesh_0.primitive_0"];
				 api.scene.updateSelected([],tubosScenePaths);
			 }
			 
			 if(camiseros != undefined){
				 camiserosScenePaths = [camiseros.scenePath + ".content_"+(l)+".transformation_0.node_0.mesh_0.primitive_0"];
				 api.scene.updateSelected([],camiserosScenePaths);
			 }
			 
			 if(estantesCristal != undefined){
				 estantesCristalScenePaths = [estantesCristal.scenePath + ".content_"+(l)+".transformation_0.node_0.mesh_0.primitive_0"];
				 api.scene.updateSelected([],estantesCristalScenePaths);
			 }
			 
			 
	     }
		 
		$('#divEscondido' +parts[1]).css({"display":"block"});
		$(div+" #textoParaMeterCss").css({"margin-bottom":"20px"});
		$(div+" #textoParaMeterCss").css({"border-bottom":"1px solid #B3B2B2"}); 
		$(div+" #textoParaMeterCss").css({"padding-bottom":"10px"});
		$(div+" #divOscuroOpOpcionesSlider").remove();
		$(""+window.ultimoDivPuesto).append('<div id="divOscuroOpOpcionesSlider" style="width:100%;height:100%;position:absolute;opacity: 0.6;background-color: white;z-index: 20;"></div>');
		if('#botonesAcabadosCuerpo' == window.ultimoDivPuesto){
			$(""+window.ultimoDivPuesto+" #divOscuroOpOpcionesSlider").css({"margin-top":"-16px"});
		}
		var parts1 = [];
		if(window.ultimoDivPuesto != ".divElegirOpcionSlider" && window.ultimoDivPuesto != ".divSlider"){
			parts1 = window.ultimoDivPuesto.split("#");
		}else{
			parts1 = window.ultimoDivPuesto.split(".");
		}
		if(window.ultimoDivPuesto == ".divSlider"){
			$(".divSlider").css({"height":"56px"});
		}
		$('#divEscondido' +parts1[1]).css({"display":"none"});
		$(window.ultimoDivPuesto+" #textoParaMeterCss").css({"margin-bottom":"10px"});
		$(window.ultimoDivPuesto+" #textoParaMeterCss").css({"border-bottom":"0px solid #B3B2B2"});
		$(window.ultimoDivPuesto+" #textoParaMeterCss").css({"padding-bottom":"0px"});
		$(""+window.ultimoDivPuesto).attr("onclick","estaMarcadoDivArm('"+window.ultimoDivPuesto+"')");
		window.ultimoDivPuesto = div;
		for(let o = 0;o<9;o++){
			$("#divAdicionalesInterior0 #divContenidoMeter"+o+"0 #divOscuroOpOpcionesSlider").remove();
			$("#divAdicionalesInterior1 #divContenidoMeter"+o+"1 #divOscuroOpOpcionesSlider").remove();
			$("#divAdicionalesInterior2 #divContenidoMeter"+o+"2 #divOscuroOpOpcionesSlider").remove();
			$("#divAdicionalesInterior3 #divContenidoMeter"+o+"3 #divOscuroOpOpcionesSlider").remove();
			$("#divAdicionalesInterior0 #divContenidoMeter"+o+"0").attr("onclick","divcontenidometerfuncion("+o+",0)");
			$("#divAdicionalesInterior0 #divContenidoMeter"+o+"0").append('<div id="divOscuroOpOpcionesSlider" style="width:88%;height:165px;position:absolute;opacity: 0.6;background-color: white;z-index: 20;"></div>');
			$("#divAdicionalesInterior1 #divContenidoMeter"+o+"1").attr("onclick","divcontenidometerfuncion("+o+",1)");
			$("#divAdicionalesInterior1 #divContenidoMeter"+o+"1").append('<div id="divOscuroOpOpcionesSlider" style="width:88%;height:165px;position:absolute;opacity: 0.6;background-color: white;z-index: 20;"></div>');
			$("#divAdicionalesInterior2 #divContenidoMeter"+o+"2").attr("onclick","divcontenidometerfuncion("+o+",2)");
			$("#divAdicionalesInterior2 #divContenidoMeter"+o+"2").append('<div id="divOscuroOpOpcionesSlider" style="width:88%;height:165px;position:absolute;opacity: 0.6;background-color: white;z-index: 20;"></div>');
			$("#divAdicionalesInterior3 #divContenidoMeter"+o+"3").attr("onclick","divcontenidometerfuncion("+o+",3)");
			$("#divAdicionalesInterior3 #divContenidoMeter"+o+"3").append('<div id="divOscuroOpOpcionesSlider" style="width:88%;height:165px;position:absolute;opacity: 0.6;background-color: white;z-index: 20;"></div>');
		}
		
	//}
}
function armarioPuertaCambiar(idPuerta,idTipo,num,acabado){
	var armario = window.puertas;
	 var armNum = window.armario;
	 var tipo = window.tipo; 
	 
	if(armario["puertas"][idPuerta]["tipo"] == "simple"){
		if(idTipo == "381"){
			armario["puertas"][idPuerta]["material"] = "cristal1";
			armario["puertas"][idPuerta]["tirador"] = "none";
		}
		if(idTipo == "382"){
			armario["puertas"][idPuerta]["material"] = "cristal2";
			armario["puertas"][idPuerta]["tirador"] = "none";
		}
		if(idTipo == "383"){
			armario["puertas"][idPuerta]["material"] = acabado.toLowerCase();
			armario["puertas"][idPuerta]["tirador"] = "none";
		}
		if(idTipo == "384"){
			armario["puertas"][idPuerta]["material"] = acabado.toLowerCase();
			armario["puertas"][idPuerta]["tirador"] = "tim";
			window.tieneTiradores = 1;
		}
		if(idTipo == "385"){
			armario["puertas"][idPuerta]["material"] = acabado.toLowerCase();
			armario["puertas"][idPuerta]["tirador"] = "nye";
			window.tieneTiradores = 1;
		}
		if(idTipo == "386"){
			armario["puertas"][idPuerta]["material"] = acabado.toLowerCase();
			armario["puertas"][idPuerta]["tirador"] = "draw";
			window.tieneTiradores = 1;
		}
		if(idTipo == "391"){
			armario["puertas"][idPuerta]["material"] = "sinpuerta";
			armario["puertas"][idPuerta]["tirador"] = "none";
		}
	}
	if(armario["puertas"][idPuerta]["tipo"] == "doble"){
		
				if(idTipo == "381"){
					armario["puertas"][idPuerta]["material"][num] = "cristal1";
					armario["puertas"][idPuerta]["tirador"][num] = "none";
				}
				if(idTipo == "382"){
					armario["puertas"][idPuerta]["material"][num] = "cristal2";
					armario["puertas"][idPuerta]["tirador"][num] = "none";
				}
				if(idTipo == "383"){
					armario["puertas"][idPuerta]["material"][num] = acabado.toLowerCase();
					armario["puertas"][idPuerta]["tirador"][num] = "none";
					
				}
				if(idTipo == "384"){
					armario["puertas"][idPuerta]["material"][num] = acabado.toLowerCase();
					armario["puertas"][idPuerta]["tirador"][num] = "tim";
					window.tieneTiradores = 1;
				}
				if(idTipo == "385"){
					armario["puertas"][idPuerta]["material"][num] = acabado.toLowerCase();
					armario["puertas"][idPuerta]["tirador"][num] = "nye";
					window.tieneTiradores = 1;
				}
				if(idTipo == "386"){
					armario["puertas"][idPuerta]["material"][num] = acabado.toLowerCase();
					armario["puertas"][idPuerta]["tirador"][num] = "draw";
					window.tieneTiradores = 1;
				}
				if(idTipo == "387"){
					armario["puertas"][idPuerta]["material"] = [acabado.toLowerCase(),acabado.toLowerCase()];
					armario["puertas"][idPuerta]["tirador"] = ["tim","tim"];
					window.tieneTiradores = 1;
				}
				if(idTipo == "388"){
					armario["puertas"][idPuerta]["material"] = [acabado.toLowerCase(),acabado.toLowerCase()];
					armario["puertas"][idPuerta]["tirador"] = ["tim","tim"];
					window.tieneTiradores = 1;
				}
				if(idTipo == "389"){
					armario["puertas"][idPuerta]["material"] = [acabado.toLowerCase(),acabado.toLowerCase()];
					armario["puertas"][idPuerta]["tirador"] = ["nye","none"];
					window.tieneTiradores = 1;
				}
				if(idTipo == "390"){
					armario["puertas"][idPuerta]["material"] = [acabado.toLowerCase(),acabado.toLowerCase()];
					armario["puertas"][idPuerta]["tirador"] = ["none","nye"];
					window.tieneTiradores = 1;
				}
				if(idTipo == "391"){
					armario["puertas"][idPuerta]["material"][num] = "sinpuerta";
					armario["puertas"][idPuerta]["tirador"][num] = "none";
				}
		}
	
	
		
	
	window.puertas = armario;
	var color = $("#inputAcabadoTirador").text();
	var url = "";
	if(color == "Blanco"){
		url = "https://dl.dropboxusercontent.com/s/f3ybq7sb89mgqzi/BLANCO.png?dl=1";
	}else{
		
		url = "https://dl.dropboxusercontent.com/s/gg2ue7mxcnmotb0/GRAFENO.png?dl=1";
	}
	
	
	var parame = api.parameters.get({name :"PuertasJSON"}).data[0];
	var parame1 = api.parameters.get({name :"texturaTiradores"}).data[0];
	  api.parameters.updateAsync({
	      id: parame.id,
	      value: JSON.stringify(armario)
	    },{
		      id: parame1.id,
		      value: url
		});
	  var intervalo = setInterval(function(){

			 api.state.addEventListener(api.state.EVENTTYPE.IDLE, function() {
				 var arrayPuertaTirador1 = window.arrayPuertaTirador;
	           	 arrayPuertaTirador1[idPuerta + num] = idTipo;
	           	 window.arrayPuertaTirador = arrayPuertaTirador1;
	           	
            	// api.scene.toggleGeometry([api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath + ".content_"+(idPuerta+num)],[]);
            	 /*api.scene.updatePersistentAsync([{
            			id: api.scene.get({ name: "Tiradores", format: "material" }, "CommPlugin_1").data[0].id,
            			content: [
            			{
            				format: "material",
            				data: {
            					version: "2.0",
            					roughness: 1,
            					bitmaptexture: url
            				}
            			}
            			]
            		}], "CommPlugin_1");*/
				 clearInterval(intervalo);
			 }); 
				 
		  }, 1000);
			 
}

window.arrayPuertaTirador = [];

function apoyoDeLosModulos(id){
	window.apoyoIdGrass = id;
	var idBuena = 0;
	var idMetal = 0;
	if(id == 15){
		idBuena = 3;
		idMetal = 1;
		var url = 'https://dl.dropboxusercontent.com/s/52j9xalya66pp0g/negro.jpg?dl=1';
	}
	if(id == 16){
		idBuena = 2;
		idMetal = 1;
		var url = 'https://dl.dropboxusercontent.com/s/52j9xalya66pp0g/negro.jpg?dl=1';
	}
	if(id == 403){
		idBuena = 6;
		idMetal = 1;
		var url = 'https://dl.dropboxusercontent.com/s/q196gdhabe3zemo/BLANCO_CANTO.png?dl=1';
	}
	if(id == 18){
		idBuena = 0;
		idMetal = 0;
		var url = window.textura;
	}
	if(id == 412){
		idBuena = 8;
		idMetal = 0;
		var url = window.textura;
	}
	if(id == 17){
		idBuena = 5;
		idMetal = 0;
		var url = window.textura;
	}
	if(id == 411){
		idBuena = 7;
		idMetal = 0;
		var url = window.textura;
	}
	if(id == 32){
		idBuena = 4;
		idMetal = 0;
	}
	if(id == 212){
		idBuena = 1;
		idMetal = 0;
	}
	var parame = api.parameters.get({'name':'apy'},"CommPlugin_1").data[0];
	var parame1 = api.parameters.get({'name':'metalApoyo'},"CommPlugin_1").data[0];
	var parame2 = api.parameters.get({'name':'texturaApoyo'},"CommPlugin_1").data[0];
	api.parameters.updateAsync({
	      id: parame.id,
	      value: idBuena
	    }).then(
	            function(response) {
	            	api.scene.updatePersistentAsync({
	            		id: api.scene.get({ name: "apoyoGeo", format: "material" }, "CommPlugin_1").data[0].id,
	            			content: [
	            			{
	            				format: "material",
	            				data: {
	            					version: "2.0",
	            					roughness: 1,
	            					bitmaptexture: url
	            				}
	            			}
	            			]
	            		}, "CommPlugin_1");
		            }
		          );
	/**api.parameters.updateAsync({
	      id: parame1.id,
	      value: idMetal
	    }); **/
}


function camiseroFuncionMover(hueco,id,input,tipo){
	
	var array = window.obj["interiores"];
	var length = array.length;
	var arrayHueco = [];
	var cont = 0;
	var arrayDef = [];
	var contDef = 0;
	arrayHueco = array;
	var pos = 0;
	for(let i = 0;i<length;i++){ 
		if(array[i]["interior"] == hueco){
				arrayHueco[cont]=array[i];
				if(array[i]["tipo"] == "camisero" ){
					pos = cont;
				}
				cont++;
		}
	}
	var med1 = arrayHueco[tipo]["altura"];
	var medCami = arrayHueco[id]["posicion"];
	var calcu = med1 - medCami;
	window.obj["interiores"][pos]["posicion"] = arrayHueco[tipo]["altura"];
	window.object0 = api.scene.get({name: "Camiseros", format: "glb"},"CommPlugin_1").data[0];
	window.object1 = api.scene.get({name: "CamiserosCantos", format: "glb"},"CommPlugin_1").data[0];
	  api.scene.setLiveTransformation(
			     [
			       {
			         scenePaths: ["CommPlugin_1."+object0.id +".content_"+input+".transformation_0"],
			         transformations: [
			           {
			             delay: 0,
			             duration: 500,
			             type: 'translation',
			             easing: "Quartic.InOut",
			             translationVector: { x: 0, y: 0, z: calcu },
			             repeat: 0
			           }
			         ],reset:false
			       },{
				         scenePaths: ["CommPlugin_1."+object1.id +".content_"+input+".transformation_0"],
				         transformations: [
				           {
				             delay: 0,
				             duration: 500,
				             type: 'translation',
				             easing: "Quartic.InOut",
				             translationVector: { x: 0, y: 0, z: calcu },
				             repeat: 0
				           }
				         ],reset:false
				       }]);
	  $("#clicparaConfirmarMoverInteriores").attr("class",""+JSON.stringify(window.obj)+"");
		$("#clicparaConfirmarMoverInteriores")[0].click();
}