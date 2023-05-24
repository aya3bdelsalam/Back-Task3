const express = require('express')
 const app = express()
const port=3000
const path = require ("path")
const publicDirectory =  path.join(__dirname , '../public')
app.use (express.static (publicDirectory))
app.set('view engine', 'hbs')
 const viewsDirectory = path.join (__dirname , '../temp1/views')
 app.set('views', viewsDirectory);

app.get('/', (req,res)=>{
    res.render('index',{
        title:"home",
        desc:"this is home"
    })
})


const geocode = require('./tools/geocode')
const forecast = require('./tools/forecast')

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude,data.longitude,(error,dataForecast)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:dataForecast.temp,
                location:req.query.address,
                latitude:data.latitude,
                longitude:data.longitude
            })
        })
    })
})


app.get('*' , (req , res)=> {
  res.send('404 Page Not Founded')
})

app.listen(port,()=>{
    console.log("okay")
})