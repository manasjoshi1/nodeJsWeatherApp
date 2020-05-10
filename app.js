const express=require("express");
const https=require("https");
const bodyParser=require("body-parser")
const app=express();
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");


})
app.post("/",function(req,res){
  const city=  req.body.nameCity;
  const appid="24651d2417b920efb5f51e7a51557292";
  const unit="metric"
  const url="https://api.openweathermap.org/data/2.5/weather?&q="+city+"&appid="+appid+"&units="+unit;
  console.log(url);
    https.get(url,function(response){
      console.log(response.statusCode);
      response.on("data",function(data){
        var wather=JSON.parse(data)
        var temp=wather.main.temp;
        res.write("<h1>Temperature in "+ city+" is "+temp+" degree Farhenhite</h1>")
        res.send();

      })

    })


})










app.listen(3000,function(){
  console.log("Server is running")
})
