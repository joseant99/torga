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
		      api.scene.camera.updateAsync({position:{x:2231.0624115662486,y:-669.0987454644667,z:708.2095380715232}, target:{x:725,y:220,z:137.5} });
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
		        	  paramInput.setAttribute("oninput", "funcionAumentarTamañoAncho(this.value);");
		          }
		          if(i == 1){
		        	  window.currScaleY = param.value / 10;
		        	  paramInput.setAttribute("oninput", "funcionAumentarTamañoFondo(this.value);");
		          }
		          if(i == 2){
		        	  window.currScaleZ = param.value / 10;
		        	  paramInput.setAttribute("oninput", "funcionAumentarTamañoAlto(this.value);");
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
		            api.parameters.updateAsync({
		              id: param.id,
		              value: this.value * 10
		            });
		            if(param["name"] == "ANCHO"){
		            	$("#ancho1").text(this.value);
		            }
		            if(param["name"] == "ALTO"){
		            	$("#altoDatosDimen").text(this.value);
		            }
		            if(param["name"] == "FONDO"){
		            	$("#fondoDatosDimen").text(this.value);
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
		            api.parameters.updateAsync({
		              id: param.id,
		              value: this.checked
		            });
		            api.scene.camera.updateAsync({position:{x:1752.1604577050061,y:-1064.35000980438,z:311.8331380020649}, target:{x:699.6633891813408,y:254.5559136794404,z:59.28410887811541} });
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
	

var funcionAumentarTamañoAncho = function(val) {
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
var funcionAumentarTamañoFondo = function(val) {
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
var funcionAumentarTamañoAlto= function(val) {
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
	var parame = api.parameters.get({name :"SDTextJSON"}).data[0];
	  api.parameters.updateAsync({
	      id: parame.id,
	      value: JSON.stringify(todounarmario)
	    });
}
function cambiarVistaArmarioFondo(){
	var rangeSlider = document.getElementById("rs-range-line2");
	var valorAncho =  (rangeSlider.value*10);
	todounarmario["fondo"] = valorAncho;
	var parame = api.parameters.get({name :"SDTextJSON"}).data[0];
	  api.parameters.updateAsync({
	      id: parame.id,
	      value: JSON.stringify(todounarmario)
	    });
}
function cambiarVistaArmario(tipo){
	var rangeSlider = document.getElementById("rs-range-line");
	var rangeSlider1 = document.getElementById("rs-range-line1");
	var rangeSlider2 = document.getElementById("rs-range-line2");
	var rangeBullet = document.getElementById("rs-bullet");
	$("#sdv-container-canvas").removeAttr("onmouseup");
	
  rangeBullet.innerHTML = rangeSlider.value;
  var bulletPosition = (rangeSlider.value /rangeSlider.max);
  rangeBullet.style.left = (bulletPosition * (578*0.72)) + "px";
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
  $("#opcionSliderDiv1").css({"background-color":"white"});
  $("#opcionSliderDiv2").css({"background-color":"white"});
  $("#opcionSliderDiv3").css({"background-color":"white"});
  $("#opcionSliderDiv"+tipo).css({"background-color":"#A7A7A7"});
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
			  arrayPuertas[0] = 0;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"none"});
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
			  arrayPuertas[0] = 0;
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"none"});
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
			  arrayPuertas[0] = 0;
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
			  $("#opcionSliderDiv1").css({"display":"block"});
			  $("#opcionSliderDiv2").css({"display":"block"});
			  $("#opcionSliderDiv3").css({"display":"none"});
			  costado = 0.75;
	          costado1 = 0;
	          arrayPuertas[0] = 1;
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
	          arrayPuertas[0] = 0;
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
	          arrayPuertas[0] = 1;
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
	          arrayPuertas[0] = 0;
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
	          arrayPuertas[0] = 1;
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
			  arrayPuertas[0] = 0;
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
			  arrayPuertas[0] = 1;
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
			  arrayPuertas[0] = 0;
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
			  arrayPuertas[0] = 1;
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
			  arrayPuertas[0] = 0;
			  arrayPuertas[1] = 2;
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
			  arrayPuertas[0] = 0;
			  arrayPuertas[1] = 2;
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
			  arrayPuertas[0] = 0;
			  arrayPuertas[1] = 2;
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
			  arrayPuertas[0] = 0;
			  arrayPuertas[1] = 2;
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
			  arrayPuertas[0] = 1;
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
				  arrayPuertas[0] = 0;
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
				  arrayPuertas[0] = 2;
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
			  arrayPuertas[0] = 1;
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
				  arrayPuertas[0] = 0;
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
				  arrayPuertas[0] = 2;
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
			  arrayPuertas[0] = 1;
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
				  arrayPuertas[0] = 0;
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
				  arrayPuertas[0] = 2;
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
			  arrayPuertas[0] = 1;
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
				  arrayPuertas[0] = 0;
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
				  arrayPuertas[0] = 2;
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
			  arrayPuertas[0] = 1;
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
				  arrayPuertas[0] = 0;
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
				  arrayPuertas[0] = 2;
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
			  arrayPuertas[0] = 0;
			  arrayPuertas[1] = 3;
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
			  arrayPuertas[0] = 0;
			  arrayPuertas[1] = 3;
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
			  arrayPuertas[0] = 0;
			  arrayPuertas[1] = 3;
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
			  arrayPuertas[0] = 0;
			  arrayPuertas[1] = 3;
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
			  arrayPuertas[0] = 0;
			  arrayPuertas[1] = 3;
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
			  arrayPuertas[0] = 1;
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
				  arrayPuertas[0] = 0;
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
				  arrayPuertas[0] = 3;
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
			  arrayPuertas[0] = 1;
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
				  arrayPuertas[0] = 0;
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
				  arrayPuertas[0] = 3;
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
			  arrayPuertas[0] = 1;
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
				  arrayPuertas[0] = 0;
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
				  arrayPuertas[0] = 3;
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
			  arrayPuertas[0] = 1;
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
				  arrayPuertas[0] = 0;
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
				  arrayPuertas[0] = 3;
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
			  arrayPuertas[0] = 1;
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
				  arrayPuertas[0] = 0;
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
				  arrayPuertas[0] = 3;
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
  object["costados"] = array;
  object["altura"] = alto * 10;
  object["fondo"] = fondo * 10;
  object["1puerta"] = arrayPuertas;
  window.todounarmario = object;
  var parame = api.parameters.get({name :"SDTextJSON"}).data[0];
  api.parameters.updateAsync({
      id: parame.id,
      value: JSON.stringify(object)
    });
  $("#codigodepsArm"+ codigo)[0].click();
  console.log(JSON.stringify(object));
}
function showSliderValue() {
		var rangeSlider = document.getElementById("rs-range-line");
		var rangeBullet = document.getElementById("rs-bullet");

	  rangeBullet.innerHTML = rangeSlider.value;
	  var bulletPosition = (rangeSlider.value /rangeSlider.max);
	  rangeBullet.style.left = (bulletPosition * (578*0.72)) + "px";
}
function showSliderValue1() {
	var rangeSlider = document.getElementById("rs-range-line1");
	var rangeBullet = document.getElementById("rs-bullet1");
	var rangeSlider1 = document.getElementById("rs-range-line");
  rangeBullet.innerHTML = rangeSlider.value;
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
  
  rangeBullet.style.left = (bulletPosition) + "px";
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