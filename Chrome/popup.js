
document.addEventListener("DOMContentLoaded", function(event) {
	activation = document.querySelector("#activation");
	deactivation = document.querySelector("#deactivation");
	h1 = document.querySelector("h1");

	activation.addEventListener("click", function(){
		chrome.runtime.sendMessage({status:"on"},function(response){
			if (response == "on")
			{
				localStorage.setItem("AD_TORRENT9PlusPlus", true);
				h1.innerHTML = "Activé";
			}
		});
	})
	deactivation.addEventListener("click", function(){
		chrome.runtime.sendMessage({status:"off"},function(response){
			if (response == "off")
			{
				localStorage.setItem("AD_TORRENT9PlusPlus", false);
				h1.innerHTML = "Désactivé";
			}
		});
	})

	if (localStorage.getItem("AD_TORRENT9PlusPlus") == "false")
		h1.innerHTML = "Désactivé";
});