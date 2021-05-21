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
		var max = $("#rs-range-line").attr("max");
		if(elInput.value == 200){
			if(max == 200){
				etiqueta.style.left =  ((parseFloat(elInput.value)) + (80))+"px";
			}else{
				etiqueta.style.left =  ((parseFloat(elInput.value)) - (205))+"px";
			}
		}
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
	
	/* cambia el estilo del TRACK */
	

	}, false);
	var rangeSlider = document.getElementById("rs-range-line");
	var rangeSlider1 = document.getElementById("rs-range-line1");
	var rangeSlider2 = document.getElementById("rs-range-line2");
	
	var rangeBullet = document.getElementById("rs-bullet");
	window.todounarmario = {};
	window.armario = 1;
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
	window.ultimoDivPuesto = '.divSlider';
	var viewerInit = false;
	var parameters;
		//store door id
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
					        	animation.scenePaths.push("CommPlugin_1." + tiradoresObject.id + ".content_" + i);
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
		 
	api.scene.addEventListener(api.scene.EVENTTYPE.VISIBILITY_ON, function() {
	    if (!viewerInit) {
	    	api.scene.toggleGeometry([],[api.scene.get({ name: "puertas" }, "CommPlugin_1").data[0].scenePath +".content_0"]);
	    	var materialesArray = [];
	    	materialesArray[0] = {
	    		"id" : "tabak",
	    		"opacidad" : 1,
	    		"textura" : "https://www.dropbox.com/s/w62eqw9qyciq4lz/TABAK.png?dl=1",
	    		"brillo" : "https://www.dropbox.com/s/kcwfr7h0l1jm1iv/BRILLO%20TABAK.png?dl=1",
	    		"normalMap" : "https://www.dropbox.com/s/30zqhxphjldjmaq/NORMALMAP%20TABAK.png?dl=1"
	    	};
	    	materialesArray[1] = {
		    		"id" : "kobe",
		    		"opacidad" : 1,
		    		"textura" : "https://www.dropbox.com/s/a40x79bngq87z6h/KOBE.png?dl=1",
		    		"brillo" : "https://www.dropbox.com/s/9ctsrw8flf47oab/BRILLO%20KOBE.png?dl=1",
		    		"normalMap" : "https://www.dropbox.com/s/4ub7j3an6xg9kkg/NORMALMAP%20KOBE.png?dl=1"
		    	};
	    	materialesArray[2] = {
		    		"id" : "noce",
		    		"opacidad" : 1,
		    		"textura" : "https://www.dropbox.com/s/bwvlyhe58utxt1s/NOCE.png?dl=1",
		    		"brillo" : "https://www.dropbox.com/s/bh5t65woh9vyh57/BRILLO%20NOCE.png?dl=1",
		    		"normalMap" : "https://www.dropbox.com/s/ce1nyy2082jftar/NORMALMAP%20NOCE.png?dl=1"
		    	};
	    	materialesArray[3] = {
		    		"id" : "nature",
		    		"opacidad" : 1,
		    		"textura" : "https://www.dropbox.com/s/q7gynxdxxy7xcnx/NATURE.png?dl=1",
		    		"brillo" : "https://www.dropbox.com/s/4r4iipjs76z8b6t/BRILLO%20NATURE.png?dl=1",
		    		"normalMap" : "https://www.dropbox.com/s/c51d1vom3t1li8p/NORMALMAP%20NATURE.png?dl=1"
		    	};
	    	materialesArray[4] = {
		    		"id" : "blanco",
		    		"opacidad" : 1,
		    		"textura" : "https://www.dropbox.com/s/bmgwlmwee9p6ma7/BLANCO.png?dl=1",
		    		"brillo" : "1"
		    	};
		    materialesArray[5] = {
			    	"id" : "beige",
			    	"opacidad" : 1,
			    	"textura" : "https://www.dropbox.com/s/x36v5wl163xhpu3/BEIGE.png?dl=1",
			    	"brillo" : "1"
			    };
		    materialesArray[6] = {
			    	"id" : "latte",
			    	"opacidad" : 1,
			    	"textura" : "https://www.dropbox.com/s/78o5gnpv8j8kccn/LATTE.png?dl=1",
			    	"brillo" : "1"
			    };
		    materialesArray[7] = {
			    	"id" : "grafeno",
			    	"opacidad" : 1,
			    	"textura" : "https://www.dropbox.com/s/d883ro3dcdynz2r/GRAFENO.png?dl=1",
			    	"brillo" : "1"
			    };
		    materialesArray[8] = {
			    	"id" : "lago",
			    	"opacidad" : 1,
			    	"textura" : "https://www.dropbox.com/s/wd230dbsa0wo7gr/LAGO.png?dl=1",
			    	"brillo" : "1"
			    };
		    materialesArray[9] = {
			    	"id" : "mare",
			    	"opacidad" : 1,
			    	"textura" : "https://www.dropbox.com/s/2abgzsz3rjzpo4j/MARE.png?dl=1",
			    	"brillo" : "1"
			    };
		    materialesArray[10] = {
			    	"id" : "cristal1",
			    	"opacidad" : 1,
			    	"color":[255,255,255],
			    	"brillo" : "1"
			    };
		    materialesArray[11] = {
			    	"id" : "cristal2",
			    	"opacidad" : 1,
			    	"color":[0,0,0],
			    	"brillo" : "1"
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
				      
				      doorsId = doorsObject.id;
				      doorState = Array(doorsObject.content.length).fill(-1);

				        //add doors interaction group to scene
				      api.scene.updateInteractionGroups([doorsInteractionGroup,shelvesInteractionGroup]);

				        //apply interaction group to doors
				      api.scene.updatePersistentAsync([
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
				      );
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
	      
	      setTimeout(function() {
            	window.camaraposition = api.scene.camera.get();
            }, 1500);
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
	var parame = api.parameters.get({name :"armarioJSON"}).data[0];
	  api.parameters.updateAsync({
	      id: parame.id,
	      value: JSON.stringify(todounarmario)
	    });
	  $("#cambioDeAlturaSitieneInteriores")[0].click();
	  
}
function cambiarVistaArmarioFondo(){
	var rangeSlider = document.getElementById("rs-range-line2");
	var valorAncho =  (rangeSlider.value*10);
	todounarmario["fondo"] = valorAncho;
	var parame = api.parameters.get({name :"armarioJSON"}).data[0];
	  api.parameters.updateAsync({
	      id: parame.id,
	      value: JSON.stringify(todounarmario)
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

function interiorDefinidoMostrarArm(u,id){
	
	
	$("#divInterioresTdoPrincipal"+u+" #opcionInteriorEst #inputOpcion").val("");
	$("#divInterioresTdoPrincipal"+u+" #opcionInteriorMedida #inputOpcion").val("");
	$("#divInterioresTdoPrincipal"+u+" #"+id+" #inputOpcion").val("X");
	$("#divInterioresTdoPrincipal"+u+" #estanquitadosLosInteriores").css({"display":"block"});
}
var timeOutAncho;
function cambiarVistaArmario(tipo){

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
			  }else{
				  if(alto <= 240){
					  codigo = "NB002";
				  }else{
					  if(alto <= 250){
						  codigo = "NB003";
					  }else{
						  if(alto <= 260){
							  codigo = "NB004";
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
				      "material": "madera1",
				      "tirador":"none"
			  }

			  arrayPuertas[0] = objPuer1;

			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
		  }else{
			  if(alto <= 230){
				  codigo = "NB005";
			  }else{
				  if(alto <= 240){
					  codigo = "NB006";
				  }else{
					  if(alto <= 250){
						  codigo = "NB007";
					  }else{
						  if(alto <= 260){
							  codigo = "NB008";
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
				      "material": "madera1",
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
		  }else{
			  if(alto <= 240){
				  codigo = "NB010";
			  }else{
				  if(alto <= 250){
					  codigo = "NB011";
				  }else{
					  if(alto <= 260){
						  codigo = "NB012";
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
			      "material": "madera1",
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
		  }else{
			  if(alto <= 240){
				  codigo = "NB014";
			  }else{
				  if(alto <= 250){
					  codigo = "NB015";
				  }else{
					  if(alto <= 260){
						  codigo = "NB016";
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
			      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB018";
				  }else{
					  if(alto <= 250){
						  codigo = "NB019";
					  }else{
						  if(alto <= 260){
							  codigo = "NB020";
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
				      "material": "tabak",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "tabak",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB022";
				  }else{
					  if(alto <= 250){
						  codigo = "NB023";
					  }else{
						  if(alto <= 260){
							  codigo = "NB024";
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
				      "material": "tabak",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": "tabak",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB026";
				  }else{
					  if(alto <= 250){
						  codigo = "NB027";
					  }else{
						  if(alto <= 260){
							  codigo = "NB028";
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
				      "material": "tabak",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "tabak",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB030";
				  }else{
					  if(alto <= 250){
						  codigo = "NB031";
					  }else{
						  if(alto <= 260){
							  codigo = "NB032";
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
				      "material": "madera1",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB034";
				  }else{
					  if(alto <= 250){
						  codigo = "NB035";
					  }else{
						  if(alto <= 260){
							  codigo = "NB036";
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
				      "material": "madera1",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB038";
				  }else{
					  if(alto <= 250){
						  codigo = "NB039";
					  }else{
						  if(alto <= 260){
							  codigo = "NB040";
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
				      "material": "madera1",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB042";
				  }else{
					  if(alto <= 250){
						  codigo = "NB043";
					  }else{
						  if(alto <= 260){
							  codigo = "NB044";
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
				      "material": "madera1",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB046";
				  }else{
					  if(alto <= 250){
						  codigo = "NB047";
					  }else{
						  if(alto <= 260){
							  codigo = "NB048";
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
				      "material": "madera1",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB050";
				  }else{
					  if(alto <= 250){
						  codigo = "NB051";
					  }else{
						  if(alto <= 260){
							  codigo = "NB052";
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
				      "material": "madera1",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB054";
				  }else{
					  if(alto <= 250){
						  codigo = "NB055";
					  }else{
						  if(alto <= 260){
							  codigo = "NB056";
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
				      "material": "madera1",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "simple",
				      "material": "madera1",
				      "tirador": "none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
				      "tipo": "simple",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB058";
				  }else{
					  if(alto <= 250){
						  codigo = "NB059";
					  }else{
						  if(alto <= 260){
							  codigo = "NB060";
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
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB062";
				  }else{
					  if(alto <= 250){
						  codigo = "NB063";
					  }else{
						  if(alto <= 260){
							  codigo = "NB064";
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
				      "material": "madera1",
				      "tirador": "none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
				      "tipo": "simple",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB066";
				  }else{
					  if(alto <= 250){
						  codigo = "NB067";
					  }else{
						  if(alto <= 260){
							  codigo = "NB068";
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
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB070";
				  }else{
					  if(alto <= 250){
						  codigo = "NB071";
					  }else{
						  if(alto <= 260){
							  codigo = "NB072";
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
				      "material": "madera1",
				      "tirador": "none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
				      "tipo": "simple",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB074";
				  }else{
					  if(alto <= 250){
						  codigo = "NB075";
					  }else{
						  if(alto <= 260){
							  codigo = "NB076";
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
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB078";
				  }else{
					  if(alto <= 250){
						  codigo = "NB079";
					  }else{
						  if(alto <= 260){
							  codigo = "NB080";
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
				      "material": "madera1",
				      "tirador": "none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
				      "tipo": "simple",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB082";
				  }else{
					  if(alto <= 250){
						  codigo = "NB083";
					  }else{
						  if(alto <= 260){
							  codigo = "NB084";
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
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB086";
				  }else{
					  if(alto <= 250){
						  codigo = "NB087";
					  }else{
						  if(alto <= 260){
							  codigo = "NB088";
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
				      "material": "madera1",
				      "tirador": "none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
				      "tipo": "simple",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB090";
				  }else{
					  if(alto <= 250){
						  codigo = "NB091";
					  }else{
						  if(alto <= 260){
							  codigo = "NB092";
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
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB094";
				  }else{
					  if(alto <= 250){
						  codigo = "NB095";
					  }else{
						  if(alto <= 260){
							  codigo = "NB096";
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
				      "material": "madera1",
				      "tirador": "none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
				      "tipo": "simple",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB098";
				  }else{
					  if(alto <= 250){
						  codigo = "NB099";
					  }else{
						  if(alto <= 260){
							  codigo = "NB100";
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
				      "material": "madera1",
				      "tirador": "none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB102";
					  }else{
						  if(alto <= 250){
							  codigo = "NB103";
						  }else{
							  if(alto <= 260){
								  codigo = "NB104";
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
					      "material": "madera1",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
					      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB106";
					  }else{
						  if(alto <= 250){
							  codigo = "NB107";
						  }else{
							  if(alto <= 260){
								  codigo = "NB108";
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
					      "material": "madera1",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
					      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB110";
				  }else{
					  if(alto <= 250){
						  codigo = "NB111";
					  }else{
						  if(alto <= 260){
							  codigo = "NB112";
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
				      "material": "madera1",
				      "tirador": "none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB114";
					  }else{
						  if(alto <= 250){
							  codigo = "NB115";
						  }else{
							  if(alto <= 260){
								  codigo = "NB116";
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
					      "material": "madera1",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
					      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB118";
					  }else{
						  if(alto <= 250){
							  codigo = "NB119";
						  }else{
							  if(alto <= 260){
								  codigo = "NB120";
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
					      "material": "madera1",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
					      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB122";
				  }else{
					  if(alto <= 250){
						  codigo = "NB123";
					  }else{
						  if(alto <= 260){
							  codigo = "NB124";
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
				      "material": "madera1",
				      "tirador": "none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB126";
					  }else{
						  if(alto <= 250){
							  codigo = "NB127";
						  }else{
							  if(alto <= 260){
								  codigo = "NB128";
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
					      "material": "madera1",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
					      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB130";
					  }else{
						  if(alto <= 250){
							  codigo = "NB131";
						  }else{
							  if(alto <= 260){
								  codigo = "NB132";
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
					      "material": "madera1",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
					      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB134";
				  }else{
					  if(alto <= 250){
						  codigo = "NB135";
					  }else{
						  if(alto <= 260){
							  codigo = "NB136";
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
				      "material": "madera1",
				      "tirador": "none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB138";
					  }else{
						  if(alto <= 250){
							  codigo = "NB139";
						  }else{
							  if(alto <= 260){
								  codigo = "NB140";
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
					      "material": "madera1",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
					      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB142";
					  }else{
						  if(alto <= 250){
							  codigo = "NB143";
						  }else{
							  if(alto <= 260){
								  codigo = "NB144";
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
					      "material": "madera1",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
					      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB146";
				  }else{
					  if(alto <= 250){
						  codigo = "NB147";
					  }else{
						  if(alto <= 260){
							  codigo = "NB148";
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
				      "material": "madera1",
				      "tirador": "none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB150";
					  }else{
						  if(alto <= 250){
							  codigo = "NB151";
						  }else{
							  if(alto <= 260){
								  codigo = "NB152";
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
					      "material": "madera1",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
					      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB154";
					  }else{
						  if(alto <= 250){
							  codigo = "NB155";
						  }else{
							  if(alto <= 260){
								  codigo = "NB156";
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
					      "material": "madera1",
					      "tirador": "none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
					      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB158";
				  }else{
					  if(alto <= 250){
						  codigo = "NB159";
					  }else{
						  if(alto <= 260){
							  codigo = "NB160";
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
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB162";
				  }else{
					  if(alto <= 250){
						  codigo = "NB163";
					  }else{
						  if(alto <= 260){
							  codigo = "NB164";
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
				      "material": "madera1",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "simple",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB166";
				  }else{
					  if(alto <= 250){
						  codigo = "NB167";
					  }else{
						  if(alto <= 260){
							  codigo = "NB168";
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
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB170";
				  }else{
					  if(alto <= 250){
						  codigo = "NB171";
					  }else{
						  if(alto <= 260){
							  codigo = "NB172";
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
				      "material": "madera1",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "simple",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB174";
				  }else{
					  if(alto <= 250){
						  codigo = "NB175";
					  }else{
						  if(alto <= 260){
							  codigo = "NB176";
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
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB178";
				  }else{
					  if(alto <= 250){
						  codigo = "NB179";
					  }else{
						  if(alto <= 260){
							  codigo = "NB180";
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
				      "material": "madera1",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "simple",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB182";
				  }else{
					  if(alto <= 250){
						  codigo = "NB183";
					  }else{
						  if(alto <= 260){
							  codigo = "NB184";
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
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB186";
				  }else{
					  if(alto <= 250){
						  codigo = "NB187";
					  }else{
						  if(alto <= 260){
							  codigo = "NB188";
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
				      "material": "madera1",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "simple",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB190";
				  }else{
					  if(alto <= 250){
						  codigo = "NB191";
					  }else{
						  if(alto <= 260){
							  codigo = "NB192";
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
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB194";
				  }else{
					  if(alto <= 250){
						  codigo = "NB195";
					  }else{
						  if(alto <= 260){
							  codigo = "NB196";
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
				      "material": "madera1",
				      "tirador":"none"
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "simple",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB198";
				  }else{
					  if(alto <= 250){
						  codigo = "NB199";
					  }else{
						  if(alto <= 260){
							  codigo = "NB200";
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
				      "material": "madera1",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "doble",
				      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB202";
					  }else{
						  if(alto <= 250){
							  codigo = "NB203";
						  }else{
							  if(alto <= 260){
								  codigo = "NB204";
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
					      "material": "madera1",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer4 = {
						  "interior": 3,
						  "tipo": "doble",
					      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB206";
					  }else{
						  if(alto <= 250){
							  codigo = "NB207";
						  }else{
							  if(alto <= 260){
								  codigo = "NB208";
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
					      "material": "madera1",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
					      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB210";
				  }else{
					  if(alto <= 250){
						  codigo = "NB211";
					  }else{
						  if(alto <= 260){
							  codigo = "NB212";
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
				      "material": "madera1",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "doble",
				      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB214";
					  }else{
						  if(alto <= 250){
							  codigo = "NB215";
						  }else{
							  if(alto <= 260){
								  codigo = "NB216";
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
					      "material": "madera1",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer4 = {
						  "interior": 3,
						  "tipo": "doble",
					      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB218";
					  }else{
						  if(alto <= 250){
							  codigo = "NB219";
						  }else{
							  if(alto <= 260){
								  codigo = "NB220";
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
					      "material": "madera1",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
					      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB222";
				  }else{
					  if(alto <= 250){
						  codigo = "NB223";
					  }else{
						  if(alto <= 260){
							  codigo = "NB224";
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
				      "material": "madera1",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "doble",
				      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB226";
					  }else{
						  if(alto <= 250){
							  codigo = "NB227";
						  }else{
							  if(alto <= 260){
								  codigo = "NB228";
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
					      "material": "madera1",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer4 = {
						  "interior": 3,
						  "tipo": "doble",
					      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB230";
					  }else{
						  if(alto <= 250){
							  codigo = "NB231";
						  }else{
							  if(alto <= 260){
								  codigo = "NB232";
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
					      "material": "madera1",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
					      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB234";
				  }else{
					  if(alto <= 250){
						  codigo = "NB235";
					  }else{
						  if(alto <= 260){
							  codigo = "NB236";
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
				      "material": "madera1",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "doble",
				      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB238";
					  }else{
						  if(alto <= 250){
							  codigo = "NB239";
						  }else{
							  if(alto <= 260){
								  codigo = "NB240";
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
					      "material": "madera1",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer4 = {
						  "interior": 3,
						  "tipo": "doble",
					      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB242";
					  }else{
						  if(alto <= 250){
							  codigo = "NB243";
						  }else{
							  if(alto <= 260){
								  codigo = "NB244";
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
					      "material": "madera1",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
					      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB246";
				  }else{
					  if(alto <= 250){
						  codigo = "NB247";
					  }else{
						  if(alto <= 260){
							  codigo = "NB248";
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
				      "material": "madera1",
				      "tirador":"none"
			  }
			  var objPuer1 = {
					  "interior": 0,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer4 = {
					  "interior": 3,
					  "tipo": "doble",
				      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB250";
					  }else{
						  if(alto <= 250){
							  codigo = "NB251";
						  }else{
							  if(alto <= 260){
								  codigo = "NB252";
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
					      "material": "madera1",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer4 = {
						  "interior": 3,
						  "tipo": "doble",
					      "material": "madera1",
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
				  }else{
					  if(alto <= 240){
						  codigo = "NB254";
					  }else{
						  if(alto <= 250){
							  codigo = "NB255";
						  }else{
							  if(alto <= 260){
								  codigo = "NB256";
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
					      "material": "madera1",
					      "tirador":"none"
				  }
				  var objPuer2 = {
						  "interior": 1,
					      "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer3 = {
						  "interior": 2,
						  "tipo": "doble",
					      "material": "madera1",
					      "tirador":["none","none"]
				  }
				  var objPuer1 = {
						  "interior": 0,
						  "tipo": "doble",
					      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB258";
				  }else{
					  if(alto <= 250){
						  codigo = "NB259";
					  }else{
						  if(alto <= 260){
							  codigo = "NB260";
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
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB262";
				  }else{
					  if(alto <= 250){
						  codigo = "NB263";
					  }else{
						  if(alto <= 260){
							  codigo = "NB264";
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
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB266";
				  }else{
					  if(alto <= 250){
						  codigo = "NB267";
					  }else{
						  if(alto <= 260){
							  codigo = "NB268";
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
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB270";
				  }else{
					  if(alto <= 250){
						  codigo = "NB271";
					  }else{
						  if(alto <= 260){
							  codigo = "NB272";
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
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
				      "material": "madera1",
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
			  }else{
				  if(alto <= 240){
					  codigo = "NB274";
				  }else{
					  if(alto <= 250){
						  codigo = "NB275";
					  }else{
						  if(alto <= 260){
							  codigo = "NB276";
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
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer2 = {
					  "interior": 1,
				      "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer3 = {
					  "interior": 2,
					  "tipo": "doble",
				      "material": "madera1",
				      "tirador":["none","none"]
			  }
			  var objPuer1 = {
					  "interior": 0,
					  "tipo": "doble",
				      "material": "madera1",
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
  }
  if(armario == 2){
	  array[array.length] = (valorAncho - 19) ;
  }
  if(armario == 3){
	  if(tipo == 1){
		  array[1] = (posint1 + 19);
	  }else{
		  array[1] = (posint2 + 19);
	  }
	  array[array.length] = (valorAncho - 19) ;
  }
  if(armario == 4){
	  if(tipo == 1){
		  array[1] = (posint2 + 19);
	  }else{
		  array[1] = (posint1 + 19);
		  array[2] = (array[1]+ (posint2 + 19));
	  }
	  array[array.length] = (valorAncho - 19) ;
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
  }
  if(armario == 8){
	  
		  array[1] = (posint2 + 19);
		  array[2] = (array[1]+ (posint2 + 19));
		  array[3] = (array[2]+ (posint2 + 19));
	  
	  array[array.length] = (valorAncho - 19) ;
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
  
  
  
  object["costados"] = array;
  window.armario = armario;
  window.tipo = tipo;
  object["altura"] = alto * 10;
  object["fondo"] = fondo * 10;
  object["puertas"] = arrayPuertas;
  window.todounarmario = object;
  var parame = api.parameters.get({name :"armarioJSON"}).data[0];
  api.parameters.updateAsync({
      id: parame.id,
      value: JSON.stringify(object)
    });
  $("#codigodepsArm"+ codigo)[0].click();
  console.log(JSON.stringify(object));
  
  
  /**setTimeout(function() {
	  api.scene.render();
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
		if(window.armario == 2 || window.armario == 3){
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
				        y: 0,
				        z: 1
				      },
				      rotationDegree: 90,
				      pivot: {}
				    }
				  ],
				  reset: false
		};
		var rightTrans = {
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
				      rotationDegree: -90,
				      pivot: {}
				    }
				  ],
				  reset: false
				};
		if(window.armario == 3){
			var puerta1 = {
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
		}
		
			var selectableGroup = {
				  id: "select",
				  hoverable: true,
				  hoverEffect: hoverEffect,
				  //selectionEffect: selectEffect,
				  selectable: true,
				  selectionMode: "single"
				};
			
			let arrPivot = api.scene.getData({
    	        name: "puntoIzqPuertasIzquierda"
    	      }).data[0].data;
    	      var leftPivot = {
    	        x: arrPivot[0],
    	        y: arrPivot[1],
    	        z: arrPivot[2]
    	      };
    	      
    	      let arrPivot1 = api.scene.getData({
      	        name: "puntoDerPuertasDerecha"
      	      }).data[0].data;
      	      var derPivot = {
      	        x: arrPivot1[0],
      	        y: arrPivot1[1],
      	        z: arrPivot1[2]
      	      };
	      	    if(window.armario == 3){
	      	    	if(tipo == 1){
	      	    		let arrPivot2 = api.scene.getData({
	          	        name: "puntoIzq1Puerta"
	          	      }).data[0].data;
	          	      var derPivot1 = {
	          	        x: arrPivot2[0],
	          	        y: arrPivot2[1],
	          	        z: arrPivot2[2]
	          	      };
	      	    	}else{
	      	    		let arrPivot2 = api.scene.getData({
		          	        name: "puntoDer1puerta"
		          	      }).data[0].data;
		          	      var derPivot1 = {
		          	        x: arrPivot2[0],
		          	        y: arrPivot2[1],
		          	        z: arrPivot2[2]
		          	      };
	      	    	}
	    		}

    	      puertaIzq.scenePaths = [
    	        api.scene.get(
    	          {
    	            name: "PuertaIzquierda",
    	            format: "glb"
    	          },
    	          "CommPlugin_1"
    	        ).data[0].scenePath
    	      ];
    	      
    	      rightTrans.scenePaths = [
      	        api.scene.get(
      	          {
      	            name: "PuertaDerecha",
      	            format: "glb"
      	          },
      	          "CommPlugin_1"
      	        ).data[0].scenePath
      	      ];
    	      
    	      if(window.armario == 3){
    	    	  puerta1.scenePaths = [
    	      	        api.scene.get(
    	      	          {
    	      	            name: "1Puerta",
    	      	            format: "glb"
    	      	          },
    	      	          "CommPlugin_1"
    	      	        ).data[0].scenePath
    	      	      ];
    	      }
    	      
    	       
    	      puertaIzq.transformations[0].pivot = leftPivot;
    	      rightTrans.transformations[0].pivot = derPivot;
    	      if(window.armario == 3){
    	    	  puerta1.transformations[0].pivot = derPivot1;
    	      }
    	      api.scene.updateInteractionGroups(selectableGroup);
    	      
    	      var assets = api.scene.get(null, "CommPlugin_1");
    	      var updateObjects = [];
    	      for (let assetnum in assets.data) {
    	        var asset = assets.data[assetnum];
    	        if (
    	          (asset.name == "PuertaIzquierda" ||
    	          asset.name == "PuertaDerecha") && asset.format == "glb" 
    	        ) {
    	          let updateObject = {
    	            id: asset.id,
    	            duration: 0,
    	            interactionGroup: selectableGroup.id,
    	            interactionMode: 'SUB'
    	          };
    	          updateObjects.push(updateObject);
    	        }
    	        if(window.armario == 3){
    	        	if (asset.name == "1Puerta" && asset.format == "glb"){
    	        		let updateObject = {
    	        	            id: asset.id,
    	        	            duration: 0,
    	        	            interactionGroup: selectableGroup.id,
    	        	            interactionMode: 'SUB'
    	        	          };
    	        	          updateObjects.push(updateObject);
    	        	}
    	        }
    	      }
		}	
		
		if(window.armario == 4 || window.armario == 5){
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
					        y: 0,
					        z: 1
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
					        y: 0,
					        z: 1
					      },
					      rotationDegree: 90,
					      pivot: {}
					    }
					  ],
					  reset: false
			};
			var rightTrans = {
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
					      rotationDegree: -90,
					      pivot: {}
					    }
					  ],
					  reset: false
					};
			var rightTrans1 = {
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
					      rotationDegree: -90,
					      pivot: {}
					    }
					  ],
					  reset: false
					};
			if(window.armario == 5){
				var puerta1 = {
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
						      rotationDegree: -90,
						      pivot: {}
						    }
						  ],
						  reset: false
				};
			}
				var selectableGroup = {
					  id: "select",
					  hoverable: true,
					  hoverEffect: hoverEffect,
					  //selectionEffect: selectEffect,
					  selectable: true,
					  selectionMode: "single"
					};
				
				let arrPivot = api.scene.getData({
	    	        name: "puntoIzqPuertasIzquierda"
	    	      }).data[0].data;
	    	      var leftPivot = {
	    	        x: arrPivot[0][0],
	    	        y: arrPivot[0][1],
	    	        z: arrPivot[0][2]
	    	      };
	    	      var leftPivot1 = {
	  	    	        x: arrPivot[1][0],
	  	    	        y: arrPivot[1][1],
	  	    	        z: arrPivot[1][2]
	  	    	      };
	    	      
	    	      let arrPivot1 = api.scene.getData({
	      	        name: "puntoDerPuertasDerecha"
	      	      }).data[0].data;
	      	      var derPivot = {
	      	        x: arrPivot1[0][0],
	      	        y: arrPivot1[0][1],
	      	        z: arrPivot1[0][2]
	      	      };
	      	    var derPivot1 = {
		      	        x: arrPivot1[1][0],
		      	        y: arrPivot1[1][1],
		      	        z: arrPivot1[1][2]
		      	      };
	      	  if(window.armario == 5){
	      	    	if(tipo == 1 || tipo == 3){
	      	    		let arrPivot2 = api.scene.getData({
		          	        name: "puntoDer1puerta"
		          	      }).data[0].data;
		          	      var derPivot2 = {
		          	        x: arrPivot2[0],
		          	        y: arrPivot2[1],
		          	        z: arrPivot2[2]
		          	      };
	      	    	}else{
		          	    let arrPivot2 = api.scene.getData({
		          	        name: "puntoIzq1Puerta"
		          	      }).data[0].data;
		          	      var derPivot2 = {
		          	        x: arrPivot2[0],
		          	        y: arrPivot2[1],
		          	        z: arrPivot2[2]
		          	      };
	      	    	}
	    		}
	    	      puertaIzq.scenePaths = [
	    	        api.scene.get(
	    	          {
	    	            name: "PuertaIzquierda",
	    	            format: "glb"
	    	          },
	    	          "CommPlugin_1"
	    	        ).data[0].scenePath
	    	      ];
	    	      
	    	      rightTrans.scenePaths = [
	      	        api.scene.get(
	      	          {
	      	            name: "PuertaDerecha",
	      	            format: "glb"
	      	          },
	      	          "CommPlugin_1"
	      	        ).data[0].scenePath
	      	      ];
	    	      
	    	      puertaIzq1.scenePaths = [
		    	        api.scene.get(
		    	          {
		    	            name: "PuertaIzquierda",
		    	            format: "glb"
		    	          },
		    	          "CommPlugin_1"
		    	        ).data[0].scenePath
		    	      ];
		    	      
		    	      rightTrans1.scenePaths = [
		      	        api.scene.get(
		      	          {
		      	            name: "PuertaDerecha",
		      	            format: "glb"
		      	          },
		      	          "CommPlugin_1"
		      	        ).data[0].scenePath
		      	      ];
		    	      if(window.armario == 5){
		    	    	  puerta1.scenePaths = [
		    	      	        api.scene.get(
		    	      	          {
		    	      	            name: "1Puerta",
		    	      	            format: "glb"
		    	      	          },
		    	      	          "CommPlugin_1"
		    	      	        ).data[0].scenePath
		    	      	      ];
		    	      }
	    	      puertaIzq.transformations[0].pivot = leftPivot;
	    	      rightTrans.transformations[0].pivot = derPivot;
	    	      puertaIzq1.transformations[0].pivot = leftPivot1;
	    	      rightTrans1.transformations[0].pivot = derPivot1;
	    	      if(window.armario == 5){
	    	    	  puerta1.transformations[0].pivot = derPivot2;
	    	      } 
	    	      api.scene.updateInteractionGroups(selectableGroup);
	    	      
	    	      var assets = api.scene.get(null, "CommPlugin_1");
	    	      var updateObjects = [];
	    	      for (let assetnum in assets.data) {
	    	        var asset = assets.data[assetnum];
	    	        if (
	    	          (asset.name == "PuertaIzquierda" ||
	    	          asset.name == "PuertaDerecha") && asset.format == "glb" 
	    	        ) {
	    	          let updateObject = {
	    	            id: asset.id,
	    	            duration: 0,
	    	            interactionGroup: selectableGroup.id,
	    	            interactionMode: 'SUB'
	    	          };
	    	          updateObjects.push(updateObject);
	    	        }
	    	        if(window.armario == 5){
	    	        	if (asset.name == "1Puerta" && asset.format == "glb"){
	    	        		let updateObject = {
	    	        	            id: asset.id,
	    	        	            duration: 0,
	    	        	            interactionGroup: selectableGroup.id,
	    	        	            interactionMode: 'SUB'
	    	        	          };
	    	        	          updateObjects.push(updateObject);
	    	        	}
	    	        }
	    	      }
			}
		
		if(window.armario == 6 || window.armario == 7){
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
					        y: 0,
					        z: 1
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
					        y: 0,
					        z: 1
					      },
					      rotationDegree: 90,
					      pivot: {}
					    }
					  ],
					  reset: false
			};
			var puertaIzq2 = {
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
			var rightTrans = {
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
					      rotationDegree: -90,
					      pivot: {}
					    }
					  ],
					  reset: false
					};
			var rightTrans1 = {
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
					      rotationDegree: -90,
					      pivot: {}
					    }
					  ],
					  reset: false
					};
			
			var rightTrans2 = {
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
					      rotationDegree: -90,
					      pivot: {}
					    }
					  ],
					  reset: false
					};
			if(window.armario == 7){
				var puerta1 = {
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
						      rotationDegree: -90,
						      pivot: {}
						    }
						  ],
						  reset: false
				};
			}
				var selectableGroup = {
					  id: "select",
					  hoverable: true,
					  hoverEffect: hoverEffect,
					  //selectionEffect: selectEffect,
					  selectable: true,
					  selectionMode: "single"
					};
				
				let arrPivot = api.scene.getData({
	    	        name: "puntoIzqPuertasIzquierda"
	    	      }).data[0].data;
	    	      var leftPivot = {
	    	        x: arrPivot[0][0],
	    	        y: arrPivot[0][1],
	    	        z: arrPivot[0][2]
	    	      };
	    	      var leftPivot1 = {
	  	    	        x: arrPivot[1][0],
	  	    	        y: arrPivot[1][1],
	  	    	        z: arrPivot[1][2]
	  	    	      };
	    	      var leftPivot2 = {
		  	    	        x: arrPivot[2][0],
		  	    	        y: arrPivot[2][1],
		  	    	        z: arrPivot[2][2]
		  	    	      };
	    	      let arrPivot1 = api.scene.getData({
	      	        name: "puntoDerPuertasDerecha"
	      	      }).data[0].data;
	      	      var derPivot = {
	      	        x: arrPivot1[0][0],
	      	        y: arrPivot1[0][1],
	      	        z: arrPivot1[0][2]
	      	      };
	      	    var derPivot1 = {
		      	        x: arrPivot1[1][0],
		      	        y: arrPivot1[1][1],
		      	        z: arrPivot1[1][2]
		      	      };
	      	  var derPivot2 = {
		      	        x: arrPivot1[2][0],
		      	        y: arrPivot1[2][1],
		      	        z: arrPivot1[2][2]
		      	      };
	      	if(window.armario == 7){
      	    	if(tipo == 1 || tipo == 3){
      	    		let arrPivot2 = api.scene.getData({
	          	        name: "puntoDer1puerta"
	          	      }).data[0].data;
	          	      var derPivot4 = {
	          	        x: arrPivot2[0],
	          	        y: arrPivot2[1],
	          	        z: arrPivot2[2]
	          	      };
      	    	}else{
	          	    let arrPivot2 = api.scene.getData({
	          	        name: "puntoIzq1Puerta"
	          	      }).data[0].data;
	          	      var derPivot4 = {
	          	        x: arrPivot2[0],
	          	        y: arrPivot2[1],
	          	        z: arrPivot2[2]
	          	      };
      	    	}
    		}
	    	      puertaIzq.scenePaths = [
	    	        api.scene.get(
	    	          {
	    	            name: "PuertaIzquierda",
	    	            format: "glb"
	    	          },
	    	          "CommPlugin_1"
	    	        ).data[0].scenePath
	    	      ];
	    	      
	    	      rightTrans.scenePaths = [
	      	        api.scene.get(
	      	          {
	      	            name: "PuertaDerecha",
	      	            format: "glb"
	      	          },
	      	          "CommPlugin_1"
	      	        ).data[0].scenePath
	      	      ];
	    	      
	    	      puertaIzq1.scenePaths = [
		    	        api.scene.get(
		    	          {
		    	            name: "PuertaIzquierda",
		    	            format: "glb"
		    	          },
		    	          "CommPlugin_1"
		    	        ).data[0].scenePath
		    	      ];
		    	      
		    	      rightTrans1.scenePaths = [
		      	        api.scene.get(
		      	          {
		      	            name: "PuertaDerecha",
		      	            format: "glb"
		      	          },
		      	          "CommPlugin_1"
		      	        ).data[0].scenePath
		      	      ];
		    	      
		    	      puertaIzq2.scenePaths = [
			    	        api.scene.get(
			    	          {
			    	            name: "PuertaIzquierda",
			    	            format: "glb"
			    	          },
			    	          "CommPlugin_1"
			    	        ).data[0].scenePath
			    	      ];
			    	      
			    	      rightTrans2.scenePaths = [
			      	        api.scene.get(
			      	          {
			      	            name: "PuertaDerecha",
			      	            format: "glb"
			      	          },
			      	          "CommPlugin_1"
			      	        ).data[0].scenePath
			      	      ];
			    	      if(window.armario == 7){
			    	    	  puerta1.scenePaths = [
			    	      	        api.scene.get(
			    	      	          {
			    	      	            name: "1Puerta",
			    	      	            format: "glb"
			    	      	          },
			    	      	          "CommPlugin_1"
			    	      	        ).data[0].scenePath
			    	      	      ];
			    	      }
	    	      
	    	      puertaIzq.transformations[0].pivot = leftPivot;
	    	      rightTrans.transformations[0].pivot = derPivot;
	    	      puertaIzq1.transformations[0].pivot = leftPivot1;
	    	      rightTrans1.transformations[0].pivot = derPivot1;
	    	      puertaIzq2.transformations[0].pivot = leftPivot2;
	    	      rightTrans2.transformations[0].pivot = derPivot2;
	    	      if(window.armario == 7){
	    	    	  puerta1.transformations[0].pivot = derPivot4;
	    	      }
	    	      api.scene.updateInteractionGroups(selectableGroup);
	    	      
	    	      var assets = api.scene.get(null, "CommPlugin_1");
	    	      var updateObjects = [];
	    	      for (let assetnum in assets.data) {
	    	        var asset = assets.data[assetnum];
	    	        if (
	    	          (asset.name == "PuertaIzquierda" ||
	    	          asset.name == "PuertaDerecha") && asset.format == "glb" 
	    	        ) {
	    	          let updateObject = {
	    	            id: asset.id,
	    	            duration: 0,
	    	            interactionGroup: selectableGroup.id,
	    	            interactionMode: 'SUB'
	    	          };
	    	          updateObjects.push(updateObject);
	    	        }
	    	        if(window.armario == 7){
	    	        	if (asset.name == "1Puerta" && asset.format == "glb"){
	    	        		let updateObject = {
	    	        	            id: asset.id,
	    	        	            duration: 0,
	    	        	            interactionGroup: selectableGroup.id,
	    	        	            interactionMode: 'SUB'
	    	        	          };
	    	        	          updateObjects.push(updateObject);
	    	        	}
	    	        }
	    	      }
			}
		
		if(window.armario == 8){
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
					        y: 0,
					        z: 1
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
					        y: 0,
					        z: 1
					      },
					      rotationDegree: 90,
					      pivot: {}
					    }
					  ],
					  reset: false
			};
			var puertaIzq2 = {
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
			var puertaIzq3 = {
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
			var rightTrans = {
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
					      rotationDegree: -90,
					      pivot: {}
					    }
					  ],
					  reset: false
					};
			var rightTrans1 = {
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
					      rotationDegree: -90,
					      pivot: {}
					    }
					  ],
					  reset: false
					};
			
			var rightTrans2 = {
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
					      rotationDegree: -90,
					      pivot: {}
					    }
					  ],
					  reset: false
					};
			
			var rightTrans3 = {
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
				
				let arrPivot = api.scene.getData({
	    	        name: "puntoIzqPuertasIzquierda"
	    	      }).data[0].data;
	    	      var leftPivot = {
	    	        x: arrPivot[0][0],
	    	        y: arrPivot[0][1],
	    	        z: arrPivot[0][2]
	    	      };
	    	      var leftPivot1 = {
	  	    	        x: arrPivot[1][0],
	  	    	        y: arrPivot[1][1],
	  	    	        z: arrPivot[1][2]
	  	    	      };
	    	      var leftPivot2 = {
		  	    	        x: arrPivot[2][0],
		  	    	        y: arrPivot[2][1],
		  	    	        z: arrPivot[2][2]
		  	    	      };
	    	      var leftPivot3 = {
		  	    	        x: arrPivot[3][0],
		  	    	        y: arrPivot[3][1],
		  	    	        z: arrPivot[3][2]
		  	    	      };
	    	      let arrPivot1 = api.scene.getData({
	      	        name: "puntoDerPuertasDerecha"
	      	      }).data[0].data;
	      	      var derPivot = {
	      	        x: arrPivot1[0][0],
	      	        y: arrPivot1[0][1],
	      	        z: arrPivot1[0][2]
	      	      };
	      	    var derPivot1 = {
		      	        x: arrPivot1[1][0],
		      	        y: arrPivot1[1][1],
		      	        z: arrPivot1[1][2]
		      	      };
	      	  var derPivot2 = {
		      	        x: arrPivot1[2][0],
		      	        y: arrPivot1[2][1],
		      	        z: arrPivot1[2][2]
		      	      };
	      	var derPivot3 = {
	      	        x: arrPivot1[3][0],
	      	        y: arrPivot1[3][1],
	      	        z: arrPivot1[3][2]
	      	      };

	    	      puertaIzq.scenePaths = [
	    	        api.scene.get(
	    	          {
	    	            name: "PuertaIzquierda",
	    	            format: "glb"
	    	          },
	    	          "CommPlugin_1"
	    	        ).data[0].scenePath
	    	      ];
	    	      
	    	      rightTrans.scenePaths = [
	      	        api.scene.get(
	      	          {
	      	            name: "PuertaDerecha",
	      	            format: "glb"
	      	          },
	      	          "CommPlugin_1"
	      	        ).data[0].scenePath
	      	      ];
	    	      
	    	      puertaIzq1.scenePaths = [
		    	        api.scene.get(
		    	          {
		    	            name: "PuertaIzquierda",
		    	            format: "glb"
		    	          },
		    	          "CommPlugin_1"
		    	        ).data[0].scenePath
		    	      ];
		    	      
		    	      rightTrans1.scenePaths = [
		      	        api.scene.get(
		      	          {
		      	            name: "PuertaDerecha",
		      	            format: "glb"
		      	          },
		      	          "CommPlugin_1"
		      	        ).data[0].scenePath
		      	      ];
		    	      
		    	      puertaIzq2.scenePaths = [
			    	        api.scene.get(
			    	          {
			    	            name: "PuertaIzquierda",
			    	            format: "glb"
			    	          },
			    	          "CommPlugin_1"
			    	        ).data[0].scenePath
			    	      ];
			    	      
			    	      rightTrans2.scenePaths = [
			      	        api.scene.get(
			      	          {
			      	            name: "PuertaDerecha",
			      	            format: "glb"
			      	          },
			      	          "CommPlugin_1"
			      	        ).data[0].scenePath
			      	      ];
			    	      puertaIzq3.scenePaths = [
				    	        api.scene.get(
				    	          {
				    	            name: "PuertaIzquierda",
				    	            format: "glb"
				    	          },
				    	          "CommPlugin_1"
				    	        ).data[0].scenePath
				    	      ];
				    	      
				    	      rightTrans3.scenePaths = [
				      	        api.scene.get(
				      	          {
				      	            name: "PuertaDerecha",
				      	            format: "glb"
				      	          },
				      	          "CommPlugin_1"
				      	        ).data[0].scenePath
				      	      ];
	    	      
	    	      puertaIzq.transformations[0].pivot = leftPivot;
	    	      rightTrans.transformations[0].pivot = derPivot;
	    	      puertaIzq1.transformations[0].pivot = leftPivot1;
	    	      rightTrans1.transformations[0].pivot = derPivot1;
	    	      puertaIzq2.transformations[0].pivot = leftPivot2;
	    	      rightTrans2.transformations[0].pivot = derPivot2;
	    	      puertaIzq3.transformations[0].pivot = leftPivot3;
	    	      rightTrans3.transformations[0].pivot = derPivot3;
	    	      api.scene.updateInteractionGroups(selectableGroup);
	    	      
	    	      var assets = api.scene.get(null, "CommPlugin_1");
	    	      var updateObjects = [];
	    	      for (let assetnum in assets.data) {
	    	        var asset = assets.data[assetnum];
	    	        if (
	    	          (asset.name == "PuertaIzquierda" ||
	    	          asset.name == "PuertaDerecha") && asset.format == "glb" 
	    	        ) {
	    	          let updateObject = {
	    	            id: asset.id,
	    	            duration: 0,
	    	            interactionGroup: selectableGroup.id,
	    	            interactionMode: 'SUB'
	    	          };
	    	          updateObjects.push(updateObject);
	    	        }
	    	      }
			}
    	      api.scene.updatePersistentAsync(updateObjects, "CommPlugin_1");
    	      window.seadadoclic = 0;
    	      window.numeroPath = 0;
    	      
    	      api.scene.addEventListener(api.scene.EVENTTYPE.SELECT_ON, function(event){
    	        console.log("SELECT_ON");
    	        console.log(event);
    	        let objID = event.scenePath.split(".")[1];
    	        let selectedAsset = api.scene.get(
    	          {
    	            id: objID
    	          },
    	          "CommPlugin_1"
    	        );
    	        
    	        	if(window.armario == 2 || window.armario == 3){
    	        		if(numeroPath == 0){
    	        			var pathArpuerta1 = puertaIzq.scenePaths[0];
        	        		pathArpuerta1 = pathArpuerta1 + ".content_0";
        	        		puertaIzq.scenePaths[0] = pathArpuerta1; 
        	        	
        	        		var pathArpuerta2 = rightTrans.scenePaths[0];
    	    	            pathArpuerta2 = pathArpuerta2 + ".content_0";
        	        		rightTrans.scenePaths[0] = pathArpuerta2; 
        	        		 if(window.armario == 3){
        	        			 var pathArpuerta3 = puerta1.scenePaths[0];
        	        			 pathArpuerta3 = pathArpuerta3 + ".content_0";
             	        		puerta1.scenePaths[0] = pathArpuerta3; 
        	        		 }
        	        		window.numeroPath = 1;
    	        		}
	    	        	let rot = puertaIzq.transformations[0].rotationDegree;
		    	        puertaIzq.transformations[0].rotationDegree = -rot;
	    	            api.scene.setLiveTransformation([puertaIzq]);
	    	        
	    	        	let rot1 = rightTrans.transformations[0].rotationDegree;
	    	        	rightTrans.transformations[0].rotationDegree = -rot1;
	    	            api.scene.setLiveTransformation([rightTrans]);
	    	            
	    	            if(window.armario == 3){
	    	            	let rot2 = puerta1.transformations[0].rotationDegree;
	    	            	puerta1.transformations[0].rotationDegree = -rot2;
		    	            api.scene.setLiveTransformation([puerta1]);
	    	            }
    	        	}
    	        	if(window.armario == 4 || window.armario == 5){
    	        		if(numeroPath == 0){
    	        			var pathArpuerta1 = puertaIzq.scenePaths[0];
        	        		pathArpuerta1 = pathArpuerta1 + ".content_0";
        	        		puertaIzq.scenePaths[0] = pathArpuerta1; 
        	        	
        	        		var pathArpuerta2 = rightTrans.scenePaths[0];
    	    	            pathArpuerta2 = pathArpuerta2 + ".content_0";
        	        		rightTrans.scenePaths[0] = pathArpuerta2; 
        	        		
        	        		var pathArpuerta3 = puertaIzq1.scenePaths[0];
    	    	            pathArpuerta3 = pathArpuerta3 + ".content_1";
    	    	            puertaIzq1.scenePaths[0] = pathArpuerta3;
    	    	            
    	    	            var pathArpuerta4 = rightTrans1.scenePaths[0];
    	    	            pathArpuerta4 = pathArpuerta4 + ".content_1";
        	        		rightTrans1.scenePaths[0] = pathArpuerta4;
        	        		
        	        		if(window.armario == 5){
	       	        			 var pathArpuerta5 = puerta1.scenePaths[0];
	       	        			pathArpuerta5 = pathArpuerta5 + ".content_0";
	            	        		puerta1.scenePaths[0] = pathArpuerta5; 
	       	        		 }
        	        		window.numeroPath = 1;
    	        		}
    	        		
	    	        	let rot = puertaIzq.transformations[0].rotationDegree;
		    	        puertaIzq.transformations[0].rotationDegree = -rot;
	    	            api.scene.setLiveTransformation([puertaIzq]);
	    	            
	    	            
	    	        	let rot1 = rightTrans.transformations[0].rotationDegree;
	    	        	rightTrans.transformations[0].rotationDegree = -rot1;
	    	            api.scene.setLiveTransformation([rightTrans]);
	    	            
	    	            
	    	        	let rot2 = puertaIzq1.transformations[0].rotationDegree;
	    	        	puertaIzq1.transformations[0].rotationDegree = -rot2;
	    	            api.scene.setLiveTransformation([puertaIzq1]);
	    	            
	    	             
	    	        	let rot3 = rightTrans1.transformations[0].rotationDegree;
	    	        	rightTrans1.transformations[0].rotationDegree = -rot3;
	    	            api.scene.setLiveTransformation([rightTrans1]);
	    	            
	    	            if(window.armario == 5){
	    	            	let rot4 = puerta1.transformations[0].rotationDegree;
	    	            	puerta1.transformations[0].rotationDegree = -rot4;
		    	            api.scene.setLiveTransformation([puerta1]);
	    	            }
    	        	}
    	        	
    	        	if(window.armario == 6 || window.armario == 7){
    	        		if(numeroPath == 0){
    	        			var pathArpuerta1 = puertaIzq.scenePaths[0];
        	        		pathArpuerta1 = pathArpuerta1 + ".content_0";
        	        		puertaIzq.scenePaths[0] = pathArpuerta1; 
        	        	
        	        		var pathArpuerta2 = rightTrans.scenePaths[0];
    	    	            pathArpuerta2 = pathArpuerta2 + ".content_0";
        	        		rightTrans.scenePaths[0] = pathArpuerta2; 
        	        		
        	        		var pathArpuerta3 = puertaIzq1.scenePaths[0];
    	    	            pathArpuerta3 = pathArpuerta3 + ".content_1";
    	    	            puertaIzq1.scenePaths[0] = pathArpuerta3;
    	    	            
    	    	            var pathArpuerta4 = rightTrans1.scenePaths[0];
    	    	            pathArpuerta4 = pathArpuerta4 + ".content_1";
        	        		rightTrans1.scenePaths[0] = pathArpuerta4;
        	        		
        	        		var pathArpuerta5 = puertaIzq2.scenePaths[0];
        	        		pathArpuerta5 = pathArpuerta5 + ".content_2";
    	    	            puertaIzq2.scenePaths[0] = pathArpuerta5;
    	    	            
    	    	            var pathArpuerta6 = rightTrans2.scenePaths[0];
    	    	            pathArpuerta6 = pathArpuerta6 + ".content_2";
        	        		rightTrans2.scenePaths[0] = pathArpuerta6;
        	        		
        	        		if(window.armario == 7){
	       	        			 var pathArpuerta7 = puerta1.scenePaths[0];
	       	        			pathArpuerta7 = pathArpuerta7 + ".content_0";
	            	        		puerta1.scenePaths[0] = pathArpuerta7; 
	       	        		 }
        	        		window.numeroPath = 1;
    	        		}
    	        		
	    	        	let rot = puertaIzq.transformations[0].rotationDegree;
		    	        puertaIzq.transformations[0].rotationDegree = -rot;
	    	            api.scene.setLiveTransformation([puertaIzq]);
	    	            
	    	        	let rot1 = rightTrans.transformations[0].rotationDegree;
	    	        	rightTrans.transformations[0].rotationDegree = -rot1;
	    	            api.scene.setLiveTransformation([rightTrans]);
	    	            
	    	        	let rot2 = puertaIzq1.transformations[0].rotationDegree;
	    	        	puertaIzq1.transformations[0].rotationDegree = -rot2;
	    	            api.scene.setLiveTransformation([puertaIzq1]);
	    	            
	    	        	let rot3 = rightTrans1.transformations[0].rotationDegree;
	    	        	rightTrans1.transformations[0].rotationDegree = -rot3;
	    	            api.scene.setLiveTransformation([rightTrans1]);
	    	            
	    	            let rot4 = puertaIzq2.transformations[0].rotationDegree;
	    	        	puertaIzq2.transformations[0].rotationDegree = -rot4;
	    	            api.scene.setLiveTransformation([puertaIzq2]);
	    	            
	    	        	let rot5 = rightTrans2.transformations[0].rotationDegree;
	    	        	rightTrans2.transformations[0].rotationDegree = -rot5;
	    	            api.scene.setLiveTransformation([rightTrans2]);
	    	            
	    	            if(window.armario == 7){
	    	            	let rot6 = puerta1.transformations[0].rotationDegree;
	    	            	puerta1.transformations[0].rotationDegree = -rot6;
		    	            api.scene.setLiveTransformation([puerta1]);
	    	            }
    	        	}
    	        	
    	        	if(window.armario == 8){
    	        		if(numeroPath == 0){
    	        			var pathArpuerta1 = puertaIzq.scenePaths[0];
        	        		pathArpuerta1 = pathArpuerta1 + ".content_0";
        	        		puertaIzq.scenePaths[0] = pathArpuerta1; 
        	        	
        	        		var pathArpuerta2 = rightTrans.scenePaths[0];
    	    	            pathArpuerta2 = pathArpuerta2 + ".content_0";
        	        		rightTrans.scenePaths[0] = pathArpuerta2; 
        	        		
        	        		var pathArpuerta3 = puertaIzq1.scenePaths[0];
    	    	            pathArpuerta3 = pathArpuerta3 + ".content_1";
    	    	            puertaIzq1.scenePaths[0] = pathArpuerta3;
    	    	            
    	    	            var pathArpuerta4 = rightTrans1.scenePaths[0];
    	    	            pathArpuerta4 = pathArpuerta4 + ".content_1";
        	        		rightTrans1.scenePaths[0] = pathArpuerta4;
        	        		
        	        		var pathArpuerta5 = puertaIzq2.scenePaths[0];
        	        		pathArpuerta5 = pathArpuerta5 + ".content_2";
    	    	            puertaIzq2.scenePaths[0] = pathArpuerta5;
    	    	            
    	    	            var pathArpuerta6 = rightTrans2.scenePaths[0];
    	    	            pathArpuerta6 = pathArpuerta6 + ".content_2";
        	        		rightTrans2.scenePaths[0] = pathArpuerta6;
        	        		
        	        		var pathArpuerta7 = puertaIzq3.scenePaths[0];
        	        		pathArpuerta7 = pathArpuerta7 + ".content_3";
    	    	            puertaIzq3.scenePaths[0] = pathArpuerta7;
        	        		
        	        		var pathArpuerta8 = rightTrans3.scenePaths[0];
        	        		pathArpuerta8 = pathArpuerta8 + ".content_3";
        	        		rightTrans3.scenePaths[0] = pathArpuerta8;
        	        		
        	        		window.numeroPath = 1;
    	        		}
    	        		
	    	        	let rot = puertaIzq.transformations[0].rotationDegree;
		    	        puertaIzq.transformations[0].rotationDegree = -rot;
	    	            api.scene.setLiveTransformation([puertaIzq]);
	    	            
	    	        	let rot1 = rightTrans.transformations[0].rotationDegree;
	    	        	rightTrans.transformations[0].rotationDegree = -rot1;
	    	            api.scene.setLiveTransformation([rightTrans]);
	    	            
	    	        	let rot2 = puertaIzq1.transformations[0].rotationDegree;
	    	        	puertaIzq1.transformations[0].rotationDegree = -rot2;
	    	            api.scene.setLiveTransformation([puertaIzq1]);
	    	            
	    	        	let rot3 = rightTrans1.transformations[0].rotationDegree;
	    	        	rightTrans1.transformations[0].rotationDegree = -rot3;
	    	            api.scene.setLiveTransformation([rightTrans1]);
	    	            
	    	            let rot4 = puertaIzq2.transformations[0].rotationDegree;
	    	        	puertaIzq2.transformations[0].rotationDegree = -rot4;
	    	            api.scene.setLiveTransformation([puertaIzq2]);
	    	            
	    	        	let rot5 = rightTrans2.transformations[0].rotationDegree;
	    	        	rightTrans2.transformations[0].rotationDegree = -rot5;
	    	            api.scene.setLiveTransformation([rightTrans2]);
	    	            
	    	            let rot6 = puertaIzq3.transformations[0].rotationDegree;
	    	            puertaIzq3.transformations[0].rotationDegree = -rot6;
	    	            api.scene.setLiveTransformation([puertaIzq3]);
	    	            
	    	        	let rot7 = rightTrans3.transformations[0].rotationDegree;
	    	        	rightTrans3.transformations[0].rotationDegree = -rot7;
	    	            api.scene.setLiveTransformation([rightTrans3]);
    	        	}
    	        api.scene.updateSelected(null, api.scene.getSelected());
	    	        
    	      });
    	      
  }, 2500);**/
}



function pintarinterioresArmarioShape(array1,array2,array3,array4,cajones1,cajones2,cajones3,cajones4,tubo1,tubo2,tubo3,tubo4,cajonSuelo1,cajonSuelo2,cajonSuelo3,cajonSuelo4,camisero1,camisero2,camisero3,camisero4,arrayInterior){
	var arrayHueco1 = [];
	var arrayHueco2 = [];
	var arrayHueco3 = [];
	var arrayHueco4 = [];

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
	  if(arrayCajones[0]["posicion"] != undefined){
		    var rangeSliderAdicional1 = document.getElementById("rs-range-lineAdicional10");
			$("#rs-range-lineAdicional10").attr("onmouseup","cambiarArmarioEstantes(1,0,1,0)");
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
			$("#rs-range-lineAdicional10").attr("onmouseup","cambiarArmarioEstantes(1,0,1,0)");
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
	var armario = window.todounarmario;
	var estantes = armario["estantes"];
	if(id == 1){
		if(estantes[0].length >= 1){
			var array = estantes[0];
		}else{
			var array = estantes[0][0].split(",");
		}
		
		array[id1] = parseFloat(rangeSlider.value) * 10;
		estantes[0] = array;
		this.arrayhuecoEstantes1 = estantes;
		armario["estantes"] = estantes;
	}
	if(id == 2){
		if(estantes[1].length >= 1){
			var array = estantes[1];
		}else{
			var array = estantes[1][0].split(",");
		}
		
		array[id1] = parseFloat(rangeSlider.value) * 10;
		estantes[1] = array;
		this.arrayhuecoEstantes2 = estantes;
		armario["estantes"] = estantes;
	}
	if(id == 3){
		if(estantes[2].length >= 1){
			var array = estantes[2];
		}else{
			var array = estantes[2][0].split(",");
		}
		
		array[id1] = parseFloat(rangeSlider.value) * 10;
		estantes[2] = array;
		this.arrayhuecoEstantes2 = estantes;
		armario["estantes"] = estantes;
	}
	if(id == 4){
		if(estantes[3].length >= 1){
			var array = estantes[3];
		}else{
			var array = estantes[3][0].split(",");
		}
		
		array[id1] = parseFloat(rangeSlider.value) * 10;
		estantes[3] = array;
		this.arrayhuecoEstantes2 = estantes;
		armario["estantes"] = estantes;
	}
	window.todounarmario = armario;
	console.log(JSON.stringify(armario));

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
function divcontenidometerfuncion(u,id){
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
	      for(let l = 0;l<25;l++){
	    	  shelvesScenePaths = [shelvesSides.scenePath + ".content_"+l+".transformation_0.node_0.mesh_0.primitive_0",shelves.scenePath + ".content_"+l+".transformation_0.node_0.mesh_0.primitive_0"];
	    	  api.scene.updateSelected([],shelvesScenePaths);
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
	
	if(id == 0){
		  shelvesScenePaths = [shelvesSides.scenePath + ".content_"+(u-1)+".transformation_0.node_0.mesh_0.primitive_0",shelves.scenePath + ".content_"+(u-1)+".transformation_0.node_0.mesh_0.primitive_0"];
		  api.scene.updateSelected(shelvesScenePaths);
	}
	if(id == 1){
		var num = estantes0.length - 1;
		if(num == -1){
			var sum = 2 + (u-1);
		}else{
			var sum = 1 + (u-1);
		}
		  
		shelvesScenePaths = [shelvesSides.scenePath + ".content_"+(sum+num)+".transformation_0.node_0.mesh_0.primitive_0",shelves.scenePath + ".content_"+(sum+num)+".transformation_0.node_0.mesh_0.primitive_0"];
		api.scene.updateSelected(shelvesScenePaths);
	}
	if(id == 2){
		var num = estantes0.length - 1;
		var num1 = estantes1.length - 1;
		var sum = 0;
		if(num == -1){
			if(num1 == -1){
				sum = 4 + (u-1);
			}else{
				sum = 3 + (u-1);
			}
		}else{
			if(num1 == -1){
				sum = 3 + (u-1);
			}else{
				sum = 2 + (u-1);
			}
		}
		shelvesScenePaths = [shelvesSides.scenePath + ".content_"+(num+num1+sum)+".transformation_0.node_0.mesh_0.primitive_0",shelves.scenePath + ".content_"+(num+num1+sum)+".transformation_0.node_0.mesh_0.primitive_0"];
		api.scene.updateSelected(shelvesScenePaths);
	}
	if(id == 3){
		var num = estantes0.length - 1;
		var num1 = estantes1.length - 1;
		var num2 = estantes2.length - 1;
		var sum = 0;
		if(num == -1){
			if(num1 == -1 && num2 != -1){
				sum = 5+ (u-1);
			}
			if(num2 == -1 && num1 != -1){
				sum = 5+ (u-1);
			}
			if(num2 != -1 && num1 != -1){
				sum = 4+ (u-1);
			}
			if(num2 == -1 && num1 == -1){
				sum = 4+ (u-1);
			}
		}else{
			if(num1 == -1 && num2 != -1){
				sum = 4+ (u-1);
			}
			if(num2 != -1 && num1 == -1){
				sum = 4+ (u-1);
			}
			if(num2 != -1 && num1 != -1){
				sum = 3+ (u-1);
			}
			if(num2 == -1 && num1 == -1){
				sum = 5+ (u-1);
			}
		}
		shelvesScenePaths = [shelvesSides.scenePath + ".content_"+(num+num1+num2+sum)+".transformation_0.node_0.mesh_0.primitive_0",shelves.scenePath + ".content_"+(num+num1+num2+sum)+".transformation_0.node_0.mesh_0.primitive_0"];
		api.scene.updateSelected(shelvesScenePaths);
	}
	
	
}
function estaMarcadoDivArm(div){
	//if(div == 'divElegirOpcionSlider'){
	
		$(div).removeAttr("onclick");
		$(div+" #divOscuroOpOpcionesSlider").remove();
		$(""+window.ultimoDivPuesto).append('<div id="divOscuroOpOpcionesSlider" style="width:100%;height:100%;position:absolute;opacity: 0.6;background-color: white;z-index: 20;"></div>');
		if('#botonesAcabadosCuerpo' == window.ultimoDivPuesto){
			$(""+window.ultimoDivPuesto+" #divOscuroOpOpcionesSlider").css({"margin-top":"-16px"});
		}
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
	var armario = window.todounarmario;
	 var armNum = window.armario;
	 var tipo = window.tipo;
	if(armario["puertas"][idPuerta]["tipo"] == "simple"){
		if(idTipo == "381"){
			armario["puertas"][idPuerta]["material"] = "cristal";
			armario["puertas"][idPuerta]["tirador"] = "none";
		}
		if(idTipo == "382"){
			armario["puertas"][idPuerta]["material"] = "cristal";
			armario["puertas"][idPuerta]["tirador"] = "none";
		}
		if(idTipo == "383"){
			armario["puertas"][idPuerta]["material"] = acabado.toLowerCase();
			armario["puertas"][idPuerta]["tirador"] = "none";
		}
		if(idTipo == "384"){
			armario["puertas"][idPuerta]["material"] = acabado.toLowerCase();
			armario["puertas"][idPuerta]["tirador"] = "tim";
		}
		if(idTipo == "385"){
			armario["puertas"][idPuerta]["material"] = acabado.toLowerCase();
			armario["puertas"][idPuerta]["tirador"] = "nye";
		}
		if(idTipo == "386"){
			armario["puertas"][idPuerta]["material"] = acabado.toLowerCase();
			armario["puertas"][idPuerta]["tirador"] = "draw";
		}
		if(idTipo == "391"){
			armario["puertas"][idPuerta]["material"] = "";
			armario["puertas"][idPuerta]["tirador"] = "none";
		}
	}
	if(armario["puertas"][idPuerta]["tipo"] == "doble"){
		
				if(idTipo == "381"){
					armario["puertas"][idPuerta]["material"] = "cristal";
					armario["puertas"][idPuerta]["tirador"][num] = "none";
				}
				if(idTipo == "382"){
					armario["puertas"][idPuerta]["material"] = "cristal";
					armario["puertas"][idPuerta]["tirador"][num] = "none";
				}
				if(idTipo == "383"){
					armario["puertas"][idPuerta]["material"] = acabado.toLowerCase();
					armario["puertas"][idPuerta]["tirador"][num] = "none";
				}
				if(idTipo == "384"){
					armario["puertas"][idPuerta]["material"] = acabado.toLowerCase();
					armario["puertas"][idPuerta]["tirador"][num] = "tim";
				}
				if(idTipo == "385"){
					armario["puertas"][idPuerta]["material"] = acabado.toLowerCase();
					armario["puertas"][idPuerta]["tirador"][num] = "nye";
				}
				if(idTipo == "386"){
					armario["puertas"][idPuerta]["material"] = acabado.toLowerCase();
					armario["puertas"][idPuerta]["tirador"][num] = "draw";
				}
				if(idTipo == "387"){
					armario["puertas"][idPuerta]["material"] = acabado.toLowerCase();
					armario["puertas"][idPuerta]["tirador"][num] = "none";
				}
				if(idTipo == "388"){
					armario["puertas"][idPuerta]["material"] = acabado.toLowerCase();
					armario["puertas"][idPuerta]["tirador"][num] = "none";
				}
				if(idTipo == "389"){
					armario["puertas"][idPuerta]["material"] = acabado.toLowerCase();
					armario["puertas"][idPuerta]["tirador"][num] = "none";
				}
				if(idTipo == "390"){
					armario["puertas"][idPuerta]["material"] = acabado.toLowerCase();
					armario["puertas"][idPuerta]["tirador"][num] = "none";
				}
				if(idTipo == "391"){
					armario["puertas"][idPuerta]["material"] = "";
					armario["puertas"][idPuerta]["tirador"][num] = "none";
				}
		}
		
	
	window.todounarmario = armario;
	var parame = api.parameters.get({name :"armarioJSON"}).data[0];
	  api.parameters.updateAsync({
	      id: parame.id,
	      value: JSON.stringify(armario)
	    });
}