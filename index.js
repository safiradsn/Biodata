const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

//parse aplication/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'biodata'
});

//connect to database
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql connected...');
});

//tampilkan semua data product
app.get('/api/my_self',(req, res) => {
    let sql = "SELECT * FROM my_self";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

//tampilkan data product berdasarkan id
app.get('/api/my_self/:id',(req, res) => {
    let sql = "SELECT * FROM product WHERE nama_lengkap, tanggal_lahir, hobi, agama, no_telepon, instagram="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

//Tambahkan data product baru
app.post('/api/my_self',(req, res) => {
    let data = {nama_lengkap: req.body.nama_lengkap, tanggal_lahir: req.body.tanggal_lahir, hobi: req.body.hobi, agama: req.body.agama, no_telepon: req.body.no_telepon, instagram: req.body.instagram};
    let sql = "INSERT INTO my_self SET ?";
    let query = conn.query(sql, data,(err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

//Edit data product berdasarkan id
app.put('/api/my_self/:id',(req, res) => {
    let sql = "UPDATE my_self SET nama_lengkap='"+req.body.nama_lengkap+"', tanggal_lahir='"+req.body.tanggal_lahir+"', hobi='"+req.body.hobi+"', agama='"+req.body.agama+"', no_telepon='"+req.body.no_telepon+"', instagram='"+req.body.instagram+"' WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

//Delete data product berdasarkan id
app.delete('/api/my_self/:id',(req, res) => {
    let sql = "DELETE FROM my_self WHERE id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

//Server listening
app.listen(3000,() =>{
    console.log('Server started on port 3000...');
});