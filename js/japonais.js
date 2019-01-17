var alphabet;
var hiragana;
var katakana;
function getAlphabet() {
    var xhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"); 
    xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
            alphabet = JSON.parse(this.responseText);
            
            for (var i in alphabet) {
            	if (i === "hiragana") {
            		hiragana = Object.keys(alphabet[i]);
            	}
            	if (i === "katakana") {
            		katakana = Object.keys(alphabet[i]);
            	}
               //console.log("taille : "+Object.keys(alphabet[i]));
            }
            //console.log("h "+hiragana.length);
            //console.log("k "+katakana.length);
        }
    }
    xhttp.open("get", "./js/alphabet.json", true);
    xhttp.send();
    var body = document.getElementsByTagName("body");
    body[0].removeAttribute("onload");
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function tirageAleatoire(max) {
	var alpha;
	if(max === hiragana.length) {
		alpha = hiragana;
	} else if(max === katakana.length) {
		alpha = katakana;
	} else {
		return;
	}
	var send3data = [];
	var tirage1, tirage2, tirage3;
	tirage1 = getRandomInt(max);
	send3data.push(alpha[tirage1]);
	do{
		tirage2 = getRandomInt(max);
	}while(tirage1 === tirage2);
	send3data.push(alpha[tirage2]);
	do{
		tirage3 = getRandomInt(max);
	}while(tirage1 === tirage3 || tirage2 === tirage3);
	send3data.push(alpha[tirage3]);
	return(send3data);
	//console.log(send3data);
}

function afficheLettre() {
	
	var bouton = document.getElementsByTagName("input");
	var radJeu = "";
	var radGlyphe = "";
	for(var i = 0, c = bouton.length; i < c; i++){
		//console.log(bouton[i]);
		//console.log(bouton[i].name);
		if (bouton[i].name === "radJeu" && bouton[i].checked) {
			//console.log(bouton[i].value+" : "+bouton[i].checked);
			radJeu = bouton[i].value;
		}
		if (bouton[i].name === "radGlyphe" && bouton[i].checked) {
			//console.log(bouton[i].value+" : "+bouton[i].checked);
			radGlyphe = bouton[i].value;
		}
	}
	
	console.log("radJeu : "+radJeu+" | radGlyphe : "+radGlyphe);
	
	
	//<label><input type="radio" name="radJeu" value="syllabes" checked> les syllabes</label>
	
	var alplhabetLength = 74;
	
	var lettre = tirageAleatoire(alplhabetLength);
	var tailleLettre = lettre.length;
	var lettreATrouver = getRandomInt(tailleLettre);
	var affiche = document.getElementById("affichage");
	affiche.innerHTML = lettre[lettreATrouver];
	var choix = document.getElementById("choix");
	var tmp = "";
	for (var i = 0; i < tailleLettre; i++) {
		//<div>i<br><span class="solution">&#12356;</span></div>
		tmp += "<div>&#"+alphabet["katakana"][lettre[i]]+"</div>";
	}
	//console.log(tmp);
	choix.innerHTML = tmp;
}











































