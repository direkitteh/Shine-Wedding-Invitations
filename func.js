$(function(){
	var imgUrlBase = "https://via.placeholder.com/100?text=image";
	var imagesClicked = new Array();

	function storeImageOrder() {
		if (imagesClicked.length > 0) {
			localStorage.setItem("imageOrder", imagesClicked);
		}
	}

	function getImageOrder() {
		var imageOrder = localStorage.getItem("imageOrder");
		console.log("Stored order: " + imageOrder);
		if (!imageOrder) {
			imageOrder = "";
		}
		imageOrder = imageOrder.replace(/,/g, "");
		imageOrder = Array.from(imageOrder);
		if (imageOrder.length < 8) {
			var clickCounts = new Map();
			for (var i = 0; i < 8; i++) {
				if (!imageOrder.includes(""+i)) {
					clickCounts.set(""+i, localStorage.getItem("image"+i));
				}
			}
			var sorted = Array.from(clickCounts).sort(function(a,b) {
				return b[1]-a[1];
			});
			sorted.forEach(function(e) {
				imageOrder.push(e[0]);
			});
		}
		
		imageOrder.forEach(function(item) {
			console.log(item + ": " + zeroOrInt(localStorage.getItem("image"+item)));
		});
		return imageOrder;
	}
	
	function zeroOrInt(str) {
		if (str) {
			return parseInt(str);
		}
		return 0;
	}

	function loadImages() {
		var mainDiv = $("#main");
		var imageOrder = getImageOrder();
		for (var i = 0; i < 8; i++) {
			var img = document.createElement("img");
			const index = imageOrder[i];
			img.setAttribute("src", imgUrlBase + index);
			img.setAttribute("title", zeroOrInt(localStorage.getItem("image"+index)));
			img.onclick = function(e) {
				if (!imagesClicked.includes(index)) {
					imagesClicked.push(index);
					storeImageOrder();
				}
				var count = zeroOrInt(localStorage.getItem("image"+index));
				count++;
				localStorage.setItem("image"+index, count);
				this.setAttribute("title", count);
			}
			mainDiv.append(img);
			if (i%2 == 1) {
				mainDiv.append(document.createElement("br"));
			}
		}
	}

	loadImages();
});