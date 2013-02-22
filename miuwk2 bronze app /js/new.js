//Dorian Lane
//Activity 2
//Visual Frameworks (VFW)
//July 10, 2012
	//Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){
	
	//getelementById Function	
		function snatchelement(x) {
			var theElement = document.getElementById(x);
			return theElement;
		}


	//Create select field element and populate it
 		function makeCats(){
			var formtag = document.getElementsByTagName("form");
			selectLi = snatchelement("select");
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "posplayed");
		for(var i=0; j=posplayed.length; i<j, i++){
			var maketime = document.createElement("option");
			var optText = posplayed[i];
			maketime.setAttribute("value", optText);
			maketime.innerHTML = optText;
			makeSelect.appendChild(maketime);
		}
		selectLi.appendChild(makeSelect);
	}
		function getSelectedRadio(){
			var radio = document.forms[0].start;
		for (var i=0; i<radio.length; i++){
			if(radio[i].checked){
				startvalue = radio[i].value;
			}
		}
	}
		function toggleControls(n){
			switch(n){
				case "on":
					snatchelement("ShotForm").style.display = "none";
					snatchelement("clear").style.display = "inline";
					snatchelement("displaylink").style.display = "none";
					snatchelement("addnew").style.display = "inline";
						break;
				case "off":
					snatchelement("ShotForm").style.display = "block";
					snatchelement("clear").style.display = "inline";
					snatchelement("displaylink").style.display = "inline";
					snatchelement("addnew").style.display = "inline";
					snatchelement("items").style.display = "none";  
						break;
				default:
					return false;		
					  }
	}

		function storeData(key){
			if(!key){
				var id 			= Math.floor(Math.random()*1000045);
				}else{
					id = key;
				}
				getSelectedRadio();
				var item		= {};
					item.positionplayed = ["Position Played:", snatchelement("positionplayed").value];
					item.home    		= ["Your Team:", snatchelement("home").value];
					item.against    	= ["Opposing Team:", snatchelement("against").value];
					item.date	 		= ["Date:", datevalue];
					item.pointsscored  	= ["Points Scored:", snatchelement("pointsscored").value];
					item.start    		= ["Did You Start?", startvalue];
					item.notes  		= ["Notes:", snatchelement("notes").value];
				localStorage.setItem(id, JSON.stringify(item));
				alert("Begin Smoking");
		
	}
		
		function getData(){
				toggleControls("on");
				var makeDiv = document.createElement("div");
				makeDiv.setAttribute("id", "items");
				var makeList = document.createElement("ul");
				makeDiv.appendChild(makeList);
				document.body.appendChild(makeDiv);
				snatchelement("items").style.display = "display"; 
					for(var i=0, len=localStorage.length; i<len; i++){
						var makeli= document.createElement("li");
						var linksLi = document.createElement("li");
						makeList.appendChild(makeli);
						var key = localStorage.key(i);
						var value = localStorage.getItem(key);
					//Convert String from local storage back to object
					var obj = JSON.parse(value);
					var makeSubList = document.createElement("ul");
						makeli.appendChild(makeSubList);
					for(var n in obj){
						var makeSubli = document.createElement("li");
						makeSubList.appendChild(makeSubli);
						var optSubText = obj[n] [0]+" "+obj[n] [1];
						makeSubli.innerHTML = optSubText;
						makeSubList.appendChild(linksLi);			
					}
				
					makeItemLinks(localstorage.key(i, linksLi));
				
				}	
		}
			
		function autoFillData() {
			for(var n in json) {
				var id = Math.floor(Math.random()*41345678);
					localStorage.setItem(id, JSON.stringify(json[n]));
				}
		}	
			
			//Create edit and delete links for items
		function makeItemLinks(key, linksLi){
					//add edit single item link
			var editLink = document.createElement("a");
				editLink.href = "#";
				editLink.key = key;
			var editText = "Edit Game";
				editLink.addEventListener("click", editItem); 
				editLink.innerHTML = editText; 
				linksLi.appendChild(editLink);
				
					//add line break
			var breakTag = document.createElement("br");
				linksLi.appendChld(breakTag);
				
				
					//add delete single item link
			var deleteLink = document.createElement("a");
			deleteLink.href = "#";
			deleteLink.key = key;
			var deleteText = "Delete Game";
			deleteLink.addEventListener("click", deleteItem);
			deleteLink.innerHTML = deleteText;
			linksLi.appendChild(deleteLink);	
		}
		
		function editItem(){
				//grab data from local storage
			var value = localStorage.getItem(this.key);
			var obj = JSON.parse(value);
			
				//Show the form 
			toggleControls("off");
			
				//populate form fields with current local storage values
			snatchelement("positionplayed").value = item.positionplayed[1];
			snatchelement("home").value = item.home[1];
			snatchelement("against").value = item.against[1];
			snatchelement("date").value = item.date[1];
			snatchelement("pointsscored").value = item.pointsscored[1];
			var radios = document.forms[0].start;
				for(var i = 0; i<radios.length; i++){
					if(radios[i].value === "Yes" && obj.start[1] === "Yes"){
						radios[i].setAttribute("checked", "checked");
					}else{ if(radios[i].value === "No" && obj.start[1] === "No"){
						radios[i].setAttribute("checked", "checked");
					}
				}	
			}
			snatchelement("notes").value = obj.notes[1];
		}
		
			//Remove listener from save contact
			save.removeEventListener("click", storeData);
			//Change submit button to say edit button
			snatchelement("Submit").value = "Edit Game";
			var editSubmit = snatchelement("Submit");
			//Save key value established as property of edit submit event
			//so we can save that value with the info we edit
			editSubmit.addEventListener("click", validate);
			editSubmit.key = this.key;
			
		function deleteItem(){
			var ask = confirm("Are you sure you want to delete this game?");
			if(ask){
				localStorage.removeItem(this.key);
				window.location.reload();
			}else{
				alert("Game Deleted");
			}
		}
		
		function clearData(){
			if(localStorage.length === 0){
				alert("There are no games to clear.");
			}else{
				localStorage.clear();
				alert("All games are deleted!");
				window.location.reload();
			return false;
			}
		}
		
		function validate(e){
			var gethome = snatchelement("home");
			var getagainst = snatchelement("against");
			var getpoints = snatchelement("pointsscored");
		
		//reset error messages
		errormessage.innerHTML = "";
		gethome.style.border = "2px solid red";
		getagainst.style.border = "2px solid purple";
		getpoints.style.border = "2px solid orange";
		
		//Get error messages
		var messageArry = [];
		
		//Group validation
			if(gethome.value === " ") {
				var homeError = "Please enter the name of your team";
				gethome.style.border = "3px dashed purple";
				messageAry.push(homeError);
			}else{
		//Sends key value from editData function
				storeData(this.key);
				}
					}
		
			if (getagainst.value === " ") {
				var getagainst = "Please enter the team you are playing";
				getagainst.style.border = "3px solid red";
				messageArry.push(getagainst);	
			}else{
		//Sends key value from editData function
				storeData(this.key);
				}
					}
	
			if (getpoints.value === " ") {
				var pointsError = "Please enter the amount of points you scored";
				getagainst.style.border = "3px solid red";
				messageArry.push(pointsError);	
			}else{
		//Sends key value from editData function
				storeData(this.key);
				}
			
			
		//error message display
			if(messageArry.length >= 1){
				for(var i = 0; i < messageArry.length; i++){
					var txt = document.createElement("li");
					txt.innerHTML = messageArry[i];
					snatchelement("errors").appendChild(text);
				}
				e.preventDefault();
				return false;
			}else{
		//Sends key value from editData function
				storeData(this.key);
			}
		}
	
	//Variable defaults
			var posplayed = ["None", "PG", "SG", "SF", "PF", "C"];
			var pickhome = $("home");
			var pickagainst = $("against");
			var setdate = $("date");
			var youstart = $("start");
			var	getpointsscored = $("pointsscored");
			var getnotes = $("notes");
			var errormessage = snatchelement("errors");
				startvalue;	
				makeCats();
	
				alert("Tobacco Smoke Increases The Risk Of Lung Cancer And Heart Disease, Even In Nonsmokers.");
		
	//Set Link & Submit Listeners	
			var displaylink = snatchelement("displaylink");
			displaylink.addEventListener("click", getData);
			var clearlink = snatchelement("clear");
			clearlink.addEventListener("click", clearData);
			var save = snatchelement("Submit");
			save.addEventListener("click", storeData);
	
	};