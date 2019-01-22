var alphabet;
var hiragana;
var katakana;
var les2 = [];
function getAlphabet() {
	var xhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"); 
    xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
            alphabet = JSON.parse(this.responseText);
            
            for (var i in alphabet) {
            	if (i === "hiragana") {
            		hiragana = Object.keys(alphabet[i]);
					les2 = les2.concat(hiragana);
            	}
            	if (i === "katakana") {
            		katakana = Object.keys(alphabet[i]);
					les2 = les2.concat(katakana);
            	}
            }
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
	} else if (max === les2.length) {
		alpha = les2;
	} else if (max === tableauCaractere.length) {
		alpha = tableauCaractere;
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
}

function reponse0() {
	reponseJoueur = 0;
	solution();
	
}

function reponse1() {
	reponseJoueur = 1;
	solution();
}
function reponse2() {
	reponseJoueur = 2;
	solution();
}

function jeu() {
	getAlphabet();
	var x = setTimeout(afficheLettre,1);
}

var cl = 0;
function rejouer() {
	if (cl === 0) {
		cl++
		return;
	}
	if (cl === 1) {
		cl = 0;
		tiragePrecedent = tirage;
		lettrePrecedente = reponseLettre;
		afficheLettre();
	}
}


function solution() {
	if(radJeu === "syllabes") {
		var tmp = "";
		var choix = document.getElementById("choix"); 
		for (var i = 0, c = tirage.length; i < c; i++) {
			if (i === reponseLettre) {
				tmp += "<div id=\"reponse"+i+"\">&#"+alphabet[radGlyphe][tirage[i]]+"</div>";
				continue;
			}
			tmp += "<div id=\"reponse"+i+"\">&#"+alphabet[radGlyphe][tirage[i]]+"<br><span class=\"solution\">"+[tirage[i]]+"</div>";
		}
		choix.innerHTML = tmp;
	} else if (radJeu === "caracteres") {
		var tmp = "";
		var choix = document.getElementById("choix"); 
		for (var i = 0, c = tirage.length; i < c; i++) {
			if (i === reponseLettre) {
				tmp += "<div>"+[tirage[i]]+"</div>";
				continue;
			}
			tmp += "<div>"+[tirage[i]]+"<br><span class=\"solution\">&#"+alphabet[radGlyphe][tirage[i]]+"</div>";
		}
		choix.innerHTML = tmp;
	}
	if (reponseJoueur === reponseLettre) {
		var elmt = document.getElementById("choix");
		elmt.style.color = "darkgreen";
		nombreDePartieSurSessions++;
		nombreDePartieGagneSurSessions++;
		restoredSession[0]++;
		restoredSession[1]++;
	} else {
		var elmt = document.getElementById("choix");
		elmt.style.color = "red";
		nombreDePartieSurSessions++;
		restoredSession[1]++;
	}
	
	var p = document.getElementsByTagName("body");
	p.onclick = rejouer;
}

var nombreDePartieSurSessions = 0;
var nombreDePartieGagneSurSessions = 0;
var tirage = [];
var tiragePrecedent = [];
var reponseLettre = "";
var lettrePrecedente = "";
var radJeu = "";
var radGlyphe = "";
var reponseJoueur = "";
var tableauCaractere = [];

function reset() {
	restoredSession[0] = 0;
	restoredSession[1] = 0;
	nombreDePartieGagneSurSessions = 0;
	nombreDePartieSurSessions = 0;
	return;
}

var restoredSession = JSON.parse(localStorage.getItem('global'));
if (restoredSession === null) {
	restoredSession = [];
	restoredSession[0] = 0;
	restoredSession[1] = 0;
}
if (restoredSession[0] !== 0 && restoredSession[1] !== 0) {
	var tmpSession = restoredSession;
}

//A TERMINER
function prefixeSuffixe() {
	var resRegExp = [];
	var incrResRegExp = 0;
	var inpt = document.getElementsByTagName("input");
	for (var i = 0, c = inpt.length; i < c; i++) {
		if (inpt[i].name === "radJeu" || inpt[i].name === "radGlyphe" || inpt[i].id === "cbOptions" || inpt[i].value === "[aiueon]") {
			continue;
		}
		if (inpt[i].checked) {
			resRegExp[incrResRegExp] = inpt[i].value;
			incrResRegExp++;
		}
	}
	
	if (resRegExp.length === 0) {
		tableauCaractere = [];
		return;
	}
	
	var inc = 0;
	
	if (radGlyphe === "hiragana") {
		for (var j = 0, z = resRegExp.length; j < z; j++) {
			for (var i = 0, c = hiragana.length; i < c; i++) {
				//console.log(j);
				var res = hiragana[i].match(resRegExp[j]);
				if (res !== null) {
					//console.log(res+" : "+i);
					//send3data.push(alpha[tirage3]);
					tableauCaractere[inc] = res;
					inc++;
				}
			}
		}
	
	}
	//console.log(tableauCaractere);
}



function afficheLettre() {
	
	var bouton = document.getElementsByTagName("input");
	for(var i = 0, c = bouton.length; i < c; i++){
		if (bouton[i].name === "radJeu" && bouton[i].checked) {
			radJeu = bouton[i].value;
		}
		if (bouton[i].name === "radGlyphe" && bouton[i].checked) {
			radGlyphe = bouton[i].value;
		}
	}
	var alplhabetLength = 0;
	if (radGlyphe === "katakana") {
		alplhabetLength = katakana.length;
	} else if (radGlyphe === "hiragana") {
		alplhabetLength = hiragana.length;
	} else if (radGlyphe === "les2") {
		alplhabetLength = hiragana.length + katakana.length;
	} else {
		console.log("error");
	}
	
	prefixeSuffixe();
	
	if (tableauCaractere.length !== 0) {
		alplhabetLength = tableauCaractere.length;
	}
	
	if (radJeu === "syllabes") {
		var lettre = tirageAleatoire(alplhabetLength);
		tirage = lettre;
		var tailleLettre = lettre.length;
		var lettreATrouver = "";
		do{
			lettreATrouver = getRandomInt(tailleLettre);
		}while(lettre[lettreATrouver] === tiragePrecedent[0] || lettre[lettreATrouver] === tiragePrecedent[1] || lettre[lettreATrouver] === tiragePrecedent[2]);
		reponseLettre = lettreATrouver;
		var affiche = document.getElementById("affichage");
		affiche.innerHTML = lettre[lettreATrouver];
		var choix = document.getElementById("choix");
		var tmp = "";
		for (var i = 0; i < tailleLettre; i++) {
			tmp += "<div onclick=\"reponse"+i+"()\">&#"+alphabet[radGlyphe][lettre[i]]+"</div>";
		}
		choix.innerHTML = tmp;
		var elmt = document.getElementById("choix");
		elmt.style.color = "#000000";
	} else if (radJeu === "caracteres") {
		var lettre = tirageAleatoire(alplhabetLength);
		tirage = lettre;
		var tailleLettre = lettre.length;
		var lettreATrouver = getRandomInt(tailleLettre);
		reponseLettre = lettreATrouver;
		var affiche = document.getElementById("affichage");
		affiche.innerHTML = "&#"+alphabet[radGlyphe][lettre[lettreATrouver]];
		var choix = document.getElementById("choix");
		var tmp = "";
		for (var i = 0; i < tailleLettre; i++) {
			tmp += "<div onclick=\"reponse"+i+"()\">"+[lettre[i]]+"</div>";
		}
		choix.innerHTML = tmp;
		var elmt = document.getElementById("choix");
		elmt.style.color = "#000000";
	} else {
		console.log("Error");
	}
	
	var restoredTable = JSON.parse(localStorage.getItem('infoSession'));
	var score = document.getElementById("scores");
	var ratioSession = Math.floor(nombreDePartieGagneSurSessions / nombreDePartieSurSessions * 100);
	if (!ratioSession) {
		ratioSession = 0;
	}
	var ratioGlobal = Math.floor(restoredSession[0] / restoredSession[1] * 100);
	if (!ratioGlobal) {
		ratioGlobal = 0;
	}
	score.innerHTML = "Session : "+nombreDePartieGagneSurSessions+"/"+nombreDePartieSurSessions+" ("+ratioSession+"%) -- Global : "+restoredSession[0]+"/"+restoredSession[1]+" ("+ratioGlobal+"%)";
	
	localStorage.setItem('global', JSON.stringify(restoredSession));
}







































