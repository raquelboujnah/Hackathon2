

// Project works, very good idea. You have practised node.js server, databases and basically built your first full stack project which is amazing! 
// Thank you for adding table creation to the config file. I added some edits there so you don't have to create table every time. First you check if the table exists and if not - create it.

// Also, if you're serving public files, you don't really need to add it to a specific route. You can do it in app.js like this

// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname, ""./public/main.html""))
// })

// I mean, in your case it would be better because you want your main page to be accessible through localhost:3000/ and not like localhost:3000/fitness/main. The same goes for register and login. You might want to take a look at your register/login, it is not fully stable yet. For me the exercises and recipes were empty, of course because of the local db, so I suggested you use Neon db or something like that for your final project as no one can really test it otherwise. Or at least store the static data in json so everyone can access it.  

// Overall very strong project! I wish you will continue to improve it. Maybe there is some external API with recipes and exercises you can use? Very good job!
