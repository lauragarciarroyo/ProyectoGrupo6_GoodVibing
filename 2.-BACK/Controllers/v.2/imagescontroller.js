//const upload = multer ({dest:'/photos'})

app. post('/api/users/:id/stories/images', upload.single('/photos'),(req, res )=> {
    const {photo,body}= req;
    //Tema 11, cab autentificación//
})

app.delete ('/api/users/:id/stories/images/:id', (req, res,) => {
   
    //Tema 11, cab autentificación//
    
});

app. post('/api/users/:id', upload.single('/avatar'),(req, res )=> {
    const {photo,body}= req;
    //Tema 11, cab autentificación//
})

app.delete ('/api/users/:id', (req, res,) => {
   
    //Tema 11, cab autentificación//
    
});