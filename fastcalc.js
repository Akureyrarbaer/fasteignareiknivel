// lýsa yfir föstum (constants)
const fastskattibud = 0.0031 
const fastskattatvi = 0.0163

const lodleigaibud = 0.005
const lodleigaatv = 0.028

const vatnibudfast = 11964 //fast gjald í krónum án fermetra
const vatnatvfast = 23929 //fast gjald í krónum án fermetra
const vatnibudferm = 179.4 //gjald á hvern fermetra
const vatnatvferm = 179.4 //gjald á hvern fermetra

const fraveita = 13613 //fast gjald í krónum án fermetra
const fraveitafermgjald = 321.65 //gjald á hvern fermetra

const sorpgjald = 50628


// lýsa yfir global breytum 
var house = 0 //fasteignamat
var property //verður fasteignamat+lóðarmat
var lawn = 0 //lóðarmat
var square = 0 //fermetrar
var result_div //til útprentunar á skjá - heildarniðurstöður
var result_div2 //til útprentunar á skjá - sér lína fyrir íbúðir í atvinnurekstri
var result
var result2 //til útprentunar fyrir íbúðir í atvinnurekstri
var discount = 0 //afsláttur ef við á
var type //tegund húsnæðis

var fastskatt
var fastskattmilli //notað í millireikning - fasteignaskattur - afsláttur ef við á
var lodleig
var vatn //endanlegt vatnsgjald
var vatnferm //notað í millireikning - vatnsveitugjald sinnum fermetrar
var fraveit //endanleg fráveitugjöld
var fraferm //notað í millireikning - fráveitugjald sinnum fermetrar
var sorp

function numberWithCommas(x) {
	// Setur punkta í tölur svo auðvelt sé að aðgreina þúsund
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function calculate(){
    // Reiknar fasteignagjald miðað við innsettar upplýsingar
	// Nær í innsettar upplýsingar
    
    result_div = document.getElementById("result_div")
    result_div2 = document.getElementById("result_div2")
    type = document.getElementById("type").value
    console.log(type)
    house = document.getElementById("house").value
    lawn = document.getElementById("lawn").value
    square = document.getElementById("square").value
    discount = document.getElementById("discount").value
	house = house.split('.').join("");
    lawn = lawn.split('.').join("");
    square = square.split('.').join("");
    discount = discount.split('.').join("");

    
   
    house = Number(house)
    lawn = Number(lawn)
    square = Number(square)
    discount = Number(discount)
	house = house-lawn
    property = house+lawn
    fraferm = square * fraveitafermgjald

    result = 0
    sorp = 0

    if(house === 0 || lawn === 0 || square === 0 || type === ""){
			// Passar að það sé fyllt í allt
        result_div.innerHTML = "<h3><strong>Vinsamlegast fylltu út alla reiti.</strong></h3>"
    }else{
        fraveit = fraferm + fraveita
        if(type === "ibud"){
			// Reiknað fyrir íbúðarhúsnæði og hesthús
            fastskatt = property * fastskattibud
            lodleig = lawn * lodleigaibud
            vatnferm = vatnibudferm * square
            vatn = vatnferm + vatnibudfast
        }else if(type === "atvi"){
			// Reiknað fyrir atvinnu húsnæði
            fastskatt = property * fastskattatvi
            lodleig = lawn * lodleigaatv
            vatnferm = vatnatvferm * square
            vatn = vatnferm + vatnatvfast    
        }
    
    
		// námunda allar niðurstöður
        fastskatt = Math.round(fastskatt)
		lodleig = Math.round(lodleig)
		fraveit = Math.round(fraveit)
		vatn = Math.round(vatn)
		sorp = Math.round(sorpgjald)
        result = Math.round(result)

        if(type==="atvi"){
			// Birtir niðurstöður fyrir atvinnuhúsnæði
            result = fastskatt+lodleig+vatn+fraveit
            result2 = result + sorp
			manud = Math.ceil(result/8)
            manud2 = Math.ceil(result2/8)
			fastskatt = numberWithCommas(fastskatt)
			lodleig = numberWithCommas(lodleig)
			fraveit = numberWithCommas(fraveit)
			vatn = numberWithCommas(vatn)
			result = numberWithCommas(result)
			manud = numberWithCommas(manud)
            manud2 = numberWithCommas(manud2)
			result_div.innerHTML = "<h3>Heildarkostnaður: "+result+" kr.</h3><br/><h4>Mánaðarleg greiðsla febrúar-september: "+manud+" kr.</h4></br><p><strong>Sundurliðun</strong></p><p>Miðað við þínar forsendur má reikna með að fasteignagjöldin séu eftirfarandi:</p><p>Fasteignaskattur: "+fastskatt+" kr.</p><p>Lóðarleiga: "+lodleig+" kr.</p><p>Fráveitugjald: "+fraveit+" kr.</p><p>Vatnsgjald: "+vatn+" kr.</p><p><strong>Samtals: "+result+" kr.</strong></p>"
            result_div2.innerHTML = "<h4>ATH: Ef um íbúð í atvinnurekstri er að ræða bætist við sorphirðugjald: "+sorp+" kr.</h4><br/><h5>Mánaðarleg greiðsla febrúar-september verður þá samtals: "+manud2+" kr.</h5>"       
        }else{
			// Birtir niðurstöður fyrir íbúðarhúsnæði
            if (discount !== 0 && fastskatt > discount) {
                var fastskattmilli = fastskatt - discount
                result = fastskattmilli+lodleig+vatn+fraveit+sorp
                manud = Math.ceil(result/8)
                fastskatt = fastskattmilli
                fastskatt = numberWithCommas(fastskatt)
                lodleig = numberWithCommas(lodleig)
                fraveit = numberWithCommas(fraveit)
                vatn = numberWithCommas(vatn)
                sorp = numberWithCommas(sorp)
                result = numberWithCommas(result)
                manud = numberWithCommas(manud)
            } else if ((discount !== 0 && discount > fastskatt)){
                console.log("halló!")
                fastskatt = 0.0     
                result = lodleig+vatn+fraveit+sorp
                manud = Math.ceil(result/8)
                fastskatt = numberWithCommas(fastskatt)
                lodleig = numberWithCommas(lodleig)
                fraveit = numberWithCommas(fraveit)
                vatn = numberWithCommas(vatn)
                sorp = numberWithCommas(sorp)
                result = numberWithCommas(result)
                manud = numberWithCommas(manud)
            } else{
            result = fastskatt+lodleig+vatn+fraveit+sorp
			manud = Math.ceil(result/8)
			fastskatt = numberWithCommas(fastskatt)
			lodleig = numberWithCommas(lodleig)
			fraveit = numberWithCommas(fraveit)
			vatn = numberWithCommas(vatn)
			sorp = numberWithCommas(sorp)
			result = numberWithCommas(result)
			manud = numberWithCommas(manud)
        } 
            result_div.innerHTML = "<h3>Heildarkostnaður: "+result+" kr.</h3><br/><h4>Mánaðarleg greiðsla febrúar-september: "+manud+" kr.</h4></br><p><strong>Sundurliðun</strong></p><p>Miðað við þínar forsendur má reikna með að fasteignagjöldin séu eftirfarandi:</p><p>Fasteignaskattur: "+fastskatt+" kr.</p><p>Lóðarleiga: "+lodleig+" kr.</p><p>Fráveitugjald: "+fraveit+" kr.</p><p>Vatnsgjald: "+vatn+" kr.</p><p>Sorphirðugjald: "+sorp+" kr.</p><p><strong>Samtals: "+result+" kr.</strong></p>"
            result_div2.innerHTML = "<h3 hidden>_</h3>"
            
        }
                
    }
}