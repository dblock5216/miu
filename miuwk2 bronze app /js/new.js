//-- Dorian Lane -->
//-- VFW 0812 -->
//-- August 8, 2012 -->

window.addEventListener("DOMContentLoaded", function() {

	function $(x) {
		var theElement = document.getElementById(x);
		return theElement;
		
	}
	
	function makeCats() {
		var formTag = document.getElementsByTagName("form"),
			selectLi = $("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "PositionPlayed");
	for(var i = 0, j = posplayed.length; i < j; i++) {
		var makeOption = document.createElement("option");
		var optText = posplayed[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
	    }
	selectLi.appendChild(makeSelect);
	}
	
	function getSelectedRadio() {
		var radios = document.forms[0].start;
		for(var i = 0; i < radios.length; i++) {	
			if(radios[i].checked) {
				startvalue = radios[i].value;
			}
		}	
	}
	
	function toggleControls(n) {
		switch(n) {
			case "on":
				$("myContent").style.display = "none";
				$("clear").style.display = "inline";
				$("displaylink").style.display = "none";
				$("addnew").style.display = "inline";
				break;
			case "off":
				$("myContent").style.display = "block";
				$("clear").style.display = "inline";
				$("displaylink").style.display = "inline";
				$("addnew").style.display = "none";
				$("items").style.display ="none";			
				break;
			default:
				return false;
		}
	}
	
	function storeData(key) {
		if(!key) {
			var id           = Math.floor(Math.random()*41345678);
		}else{
			id = key;		
		}		
		getSelectedRadio();
		var item		 = {};
			item.positionplayed = ["Position Played:", $("PositionPlayed").value];
			item.date	 = ["Date:", $("Date").value];
			item.pointsscored  = ["Points Scored", $("PointsScored").value];
			item.start    = ["Did You Start?", startvalue];
			item.notes  = ["Notes:", $("Notes").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Game saved!");
	}
	
		//Variable Defaults
	var posplayed = ["None", "PG", "SG", "SF", "PF", "C"],
		memoryvalue,
		errMsg = $("errors");
	;
	makeCats();
		
	function getData() {
		toggleControls("on")
		if(localStorage.length === 0) {
			alert("There are no games saved. Default games added.");
			autoFillData();
		}
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for(var i = 0; i<localStorage.length; i++) {
			var makeli = document.createElement("li");
			var linksLi = document.createElement("li");
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeli.appendChild(makeSubList);
			getImage(obj.positionplayed[1], makeSubList);
			for(var n in obj) {
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n] [0] + " " + obj[n] [1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);		
		}
	}
	
	function getImage(catName, makeSubList) {
		var imageLi = document.createElement("li");
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement("img");
		var setSrc = newImg.setAttribute("src", "images/"+ catName +".png");
		//imageLi.appendChild("newImg");
	}
	
	function autoFillData() {
		for(var n in json) {
			var id = Math.floor(Math.random()*41345678);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	function makeItemLinks(key, linksLi) {
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Game";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Game";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);		
	}
	
	function editItem() {
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		toggleControls("off");
		var radios = document.forms[0].start;
		for(var i = 0; i < radios.length; i++) {
			if(radios[i].value == "Yes" && obj.start[1] == "Yes") {
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "No" && obj.start[1] == "No") {
				radios[i].setAttribute("checked", "checked");
			}
		}
		$("PositionPlayed").value = item.positionplayed[1];
		$("Date").value = item.date[1];
		$("Notes").value = item.notes[1];
		$("PointsScored").value = item.pointsscored[1];
		save.removeEventListener("click", storeData);
		$("Submit").value = "Edit Note";
		var editSubmit = $("Submit");
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;	
	}
	
	function deleteItem() {
		var ask = confirm("Are you sure you want to delete this game?");
		if(ask) {
			localStorage.removeItem(this.key);
			alert("Game was removed");
			window.location.reload();
		}else{
			alert("Game was not removed");
		}
	}
	
	function clearLocal() {
		if(localStorage.length === 0) {
			alert("No Games Stored");	
		}else{
			localStorage.clear();
			alert("All Games Are Deleted.");
			window.location.reload();
			return;false
		}
	}
	
	function validate() {
		var getPositionPlayed = $("PositionPlayed");
		var getDate = $("Date");
		errMsg.innerHTML = "";
			getTimeofDay.style.border = "3px dashed purple";
			getDate.style.border = "3px solid red";
			getDate.style.border = "3px solid red";
			
		var messageAry = [];
		if(getPositionPlayed.value === "None") {
			var positionPlayedError = "Please enter your position for this game.";
			getPositionPlayed.style.border = "3px dashed purple";
			messageAry.push(positionPlayedError);
		}
		
		if (getDate.value === "") {
			var dateError = "Please enter the current date.";
			getDate.style.border = "3px solid red";
			messageArry.push(dateError);	
		}
		
		if(messageAry.length >= 1) {
			for(var i = 0; i < messageAry.length; i++) {
				var txt = document.createElement("li");
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			storeData(this.key);
		}
	}

	var displayLink = $("displaylink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var save = $("Submit");
	save.addEventListener("click", storeData, validate);
});