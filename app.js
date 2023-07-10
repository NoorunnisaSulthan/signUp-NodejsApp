//IN THIS PROJECT WE ARE USING MAILCHIMP  SERVER TO ADD OUR SUBSCRIBERS 

const express=require("express");
const app=express();

//to get the info from weatherbit api(native node module)
const https=require ('https');

//to get data from input field
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}))

//Add static file like css
app.use(express.static("public"))

//app works both on heroku and locally in port 3000
app.listen(process.env.PORT ||3000,(req,res)=>{
    console.log("server started at port 3000");
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"\\signUp.html")
 })

 app.post("/",(req,res)=>{
    const firstname=req.body.firstName;
    const lastname=req.body.lastName;
    const email=req.body.email;
   var data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields: {
                FNAME:firstname,
                LNAME:lastname
            }
        }
    ]
   }
   
   var jsonData=JSON.stringify(data)

   var url="https://us10.api.mailchimp.com/3.0/lists/0a89295e5c"

   const options={
    method:"POST",
    auth:"noor1:2c62739036e6380c5ab4b428cd8003b17-us10"
   }

   //sending the data from our server to mailchimp 
   const request=https.request(url,options,function(response){
   if(response.statusCode==200){
    res.sendFile(__dirname+"\\success.html");
   } else{
    res.sendFile(__dirname+"\\failure.html");
   }
    response.on("data",function(data){
        const readable=JSON.parse(data)
        // console.log(readable);
   })
  
   })
   request.write(jsonData);
   request.end();

 })
 app.post("/failure",(req,res)=>{
    res.redirect("/")
 })


 //listid
 //0a89295e5c