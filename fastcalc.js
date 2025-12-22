// lýsa yfir föstum (constants)
const fastskattibud = 0.0028 
const fastskattatvi = 0.0161

const lodleigaibud = 0.005
const lodleigaatv = 0.028

const vatnibudfast = 12586 //fast gjald í krónum án fermetra
const vatnatvfast = 25173 //fast gjald í krónum án fermetra
const vatnibudferm = 188.7 //gjald á hvern fermetra
const vatnatvferm = 188.7 //gjald á hvern fermetra

const fraveita = 17333 //fast gjald í krónum án fermetra
const fraveitafermgjald = 409.53 //gjald á hvern fermetra

const sorpgjald = 23000 //fast árlegt gjald fyrir utan fjölda og gerð íláta

const discountmax = 142350 //hámarksafsláttur ársins


// lýsa yfir global breytum 
var house = 0 //fasteignamat
var property //verður fasteignamat+lóðarmat
var lawn = 0 //lóðarmat
var square = 0 //fermetrar
var result_div //til útprentunar á skjá - heildarniðurstöður
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
    house = document.getElementById("house").value
    lawn = document.getElementById("lawn").value
    square = document.getElementById("square").value
    discount = document.getElementById("discount").value
    
	house = house.split('.').join("");
    lawn = lawn.split('.').join("");
    square = square.split(',').join(".");
    discount = discount.split('.').join("");

    
   
    house = Number(house)
    lawn = Number(lawn)
    square = Number(square)
    squareIsNaN = Number.isNaN(square); 
    discount = Number(discount)
    property = house+lawn
    fraferm = square * fraveitafermgjald

    result = 0
    sorp = Number(sorpgjald)


    if(house === 0 || lawn === 0 || square === 0 || type === ""){
			// Passar að það sé fyllt í allt
        result_div.innerHTML = "<h3><strong>Vinsamlegast fylltu út alla reiti.</strong></h3>"
    }else if(squareIsNaN === true){
        //tékkar að fermetrar séu örugglega tala en ekki strengur
        result_div.innerHTML = "<h3><strong>Vinsamlegast settu bara tölustafi og kommur í fermetrareitinn.</strong></h3>"
    }else{
        fraveit = fraferm + fraveita
        
        if(type === "ibud"){
			// Reiknað fyrir íbúðarhúsnæði og hesthús
            fastskatt = house * fastskattibud
            lodleig = lawn * lodleigaibud
            vatnferm = vatnibudferm * square
            vatn = vatnferm + vatnibudfast
            if (discount > discountmax){
                discount = discountmax
            }
        }else if(type === "atvi"){
			// Reiknað fyrir atvinnu húsnæði
            fastskatt = house * fastskattatvi
            lodleig = lawn * lodleigaatv
            vatnferm = vatnatvferm * square
            vatn = vatnferm + vatnatvfast    
        }
    
    
		// námunda allar niðurstöður
        fastskatt = Math.round(fastskatt)
		lodleig = Math.round(lodleig)
		fraveit = Math.round(fraveit)
		vatn = Math.round(vatn)
		sorp = Math.round(sorp)
        result = Math.round(result)

        if(type==="atvi"){
			// Birtir niðurstöður fyrir atvinnuhúsnæði
            result = fastskatt+lodleig+vatn+fraveit
           // result2 = result + sorp
			manud = Math.ceil(result/8)
            //manud2 = Math.ceil(result2/8)
			fastskatt = numberWithCommas(fastskatt)
			lodleig = numberWithCommas(lodleig)
			fraveit = numberWithCommas(fraveit)
			vatn = numberWithCommas(vatn)
            sorp = numberWithCommas(sorp)
			result = numberWithCommas(result)
			manud = numberWithCommas(manud)
            //manud2 = numberWithCommas(manud2)
			result_div.innerHTML = "<h3><strong>Sundurliðun</strong></h3><p>Miðað við þær forsendur sem þú settir inn má áætla að fasteignagjöld ársins séu eftirfarandi:</p><p><strong>Fasteignaskattur:</strong> "+fastskatt+" kr.</p><p><strong>Lóðarleiga:</strong> "+lodleig+" kr.</p><p><strong>Fráveitugjald:</strong> "+fraveit+" kr.</p><p><strong>Vatnsgjald:</strong> "+vatn+" kr.</p><h3><strong>Samtals: "+result+" kr.</strong></h3><h4><strong>Mánaðarleg greiðsla febrúar-september: "+manud+" kr.</strong></p><p>ATH: Ef um <strong>íbúð í atvinnurekstri</strong> er að ræða bætist við <strong>fastagjald sorphirðu: "+sorp+" kr.</strong> og ílátagjöld skv. sorpílátasamsetningu eignarinnar sbr. gjaldskrá sorhirðu hér fyrir neðan</h4><p><em>Fasteignagjöld ársins eru innheimt í 8 greiðslum frá febrúar til september hvert ár.</em></p>"    
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
                discount = numberWithCommas(discount)
                manud = numberWithCommas(manud)
            } else if (discount !== 0 && discount > fastskatt){
                var fastskattmilli = fastskatt - discount
                if(fastskattmilli < 0){
                fastskattmilli = fastskatt
                }
                fastskatt = 0.0    
                result = lodleig+vatn+fraveit+sorp
                manud = Math.ceil(result/8)
                fastskatt = numberWithCommas(fastskatt)
                lodleig = numberWithCommas(lodleig)
                fraveit = numberWithCommas(fraveit)
                vatn = numberWithCommas(vatn)
                sorp = numberWithCommas(sorp)
                result = numberWithCommas(result)
                discount = numberWithCommas(fastskattmilli)
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
            result_div.innerHTML = "<h3><strong>Sundurliðun</strong></h3><p>Miðað við þær forsendur sem þú settir inn má áætla að fasteignagjöld með fastagjaldi sorphirðu fyrir árið séu eftirfarandi:</p><p><strong>Fasteignaskattur:</strong> "+fastskatt+" kr.</p><p><strong>Lóðarleiga:</strong> "+lodleig+" kr.</p><p><strong>Fráveitugjald:</strong> "+fraveit+" kr.</p><p><strong>Vatnsgjald:</strong> "+vatn+" kr.</p><p><strong>Fastagjald sorphirðu:</strong> "+sorp+" kr.</p><h3><strong>Samtals: "+result+" kr.</strong> Frádreginn afsláttur vegna elli/örorku: "+discount+" kr.</h3><h4><strong>Mánaðarleg greiðsla febrúar-september: "+manud+" kr.</strong></h4><p><em>Fasteignagjöld ársins eru innheimt í 8 greiðslum frá febrúar til september hvert ár.</em></p><p>Við þetta bætast gjöld skv. sorpílátasamsetningu eignarinnar sbr. gjaldskrá sorphirðu hér fyrir neðan</p>"
         }
     }
}