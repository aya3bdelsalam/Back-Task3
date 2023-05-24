let form = document.getElementById('form1')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    weatherFunction()
    form.reset()
})
const errorF = document.getElementById('error')
const locationF = document.getElementById('location')
const forecastF = document.getElementById('forecast')
const longandlatF =document.getElementById('longandlat')
let weatherFunction = async() =>{
    try{
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address='+address)
        const data = await res.json()
        console.log(data)
        if(data.error){
            errorF.innerText = data.error
            locationF.innerText =""
            forecastF.innerText =""
            longandlatF.innerText=""
        }
        else {
            locationF.innerText = "Location is : " +data.location
            setTimeout(function(){
                forecastF.innerText = "Temperature is : " +data.forecast +" Celsius"
            },500)
            setTimeout(function(){
                longandlatF.innerText= "Latitude is : " +data.latitude + " And  Longitude is : " +data.longitude
            },1000)
            errorF.innerText =""
        }
    }
    catch(e){
        console.log(e)
    }
}