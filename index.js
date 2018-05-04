const opn = require("opn");
const express = require("express");
const fileUpload = require("express-fileupload");
const serveIndex = require('serve-index');
const app = express();

app.use(fileUpload());
const port =9797;

//app.get("/",(req,res) => res.send("¡Hola Mundo!"));
app.get("/about",(req,res)=>res.send("about"));
app.get("/download",(req,res)=>{
	res.download('./Reporte_Video.docx', 'Reporte_Video.docx', function(err){
	  if (err) 
	  {
	    // Handle error, but keep in mind the response may be partially-sent
	    // so check res.headersSent
	    console.log("error "+err);
	  } else {
	    // decrement a download credit, etc.
	    console.log("Descarga buena");
	  }
});
});
app.post("/upload",(req,res)=>{
	console.log(req.files);
	if(!req.files)
		return res.status(400).send("No se pudo subir.");
	let file=req.files.file;
	file.mv("./public/reportes/"+file.name,(err)=>{
		if(err)
			return res.status(500).send(err);
		res.send("Archivo recibido");
	});
});
app.listen(port,()=>opn("http://localhost:"+port));
app.use(express.static("public/"));
app.use('/reportes', serveIndex("public/" + 'reportes'));