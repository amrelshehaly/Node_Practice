const path = require('path');
const express= require('express');
const hbs = require('hbs');
const weather = require('../src/utils/geocode')

const app = express();
const port = process.env.PORT || 3000;

console.log(__dirname);
console.log(path.join(__dirname,'../public'));


// app.com
const public_dir = path.join(__dirname,'../public')
const viewsPAth = path.join(__dirname ,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPAth);
hbs.registerPartials(partialPath)

app.use(express.static(public_dir))

app.get('', (req,res)=>{
    res.render('index',{
        title : 'Weather',
        name: 'Amr Mostafa'
    })
});

app.get('/about', (req,res)=>{
    res.render('About',{
        titile: 'About me',
        name : 'Amr Mostafa'
    })
});

app.get('/help',(req,res)=>{
    res.render('Help',{
        message:'help is here',
        title: 'HElp',
        name : 'Amr Mostafa'
    })
});


app.get('/weather', (req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'you must provide the address'
        })
    }

    let a ;
     weather.geocode(req.query.address,(error,data = {})=>{
       if(error){
           return res.send({error});
       }
        console.log(data);
        weather.forecast(data.latitude,data.longitude,(msg,data)=>{
            if (msg) {
                res.send({msg})
            }
            console.log(data)
            res.send({
                data: data
            })
        })
     })

    // res.send({
    //     forecast:"its hot",
    //     loaction: 'cairo',
    //     address: req.query.address

    // })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    } 

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Help article not found.'
    })
});

app.get('*',(req,res)=>{
    res.render('404',{
        title: 'Page not Found'
    })
});


app.listen(port, ()=>{
    console.log('server is up on port '+ port);
});