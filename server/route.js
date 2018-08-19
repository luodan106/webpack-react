const express=require('express');
const router=express.Router();
const formidable=require('formidable');
const path=require('path');

const fileController=require('./controller/file');

router.post('/file/minify',fileController.fileMini);
router.post('/file/upload',fileController.fileUpload);

module.exports=router;