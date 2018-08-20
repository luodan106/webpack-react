const exec=require('child_process').exec;
const fs=require('fs');

exports.fileUpload=(req,res)=>{

}

exports.fileMini=(req,res)=>{
    const writedata=req.body.content;

    fs.writeFile('public/data/compress.txt',writedata,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("success");
        }
    })

    const cmdStr='gulp csscompress';
    exec(cmdStr,(err,data)=>{
        if(err){
            console.log("err:"+err);
        }else{
            console.log(data);
            const readData = fs.readFileSync('./public/data/compress.min.txt',"utf-8");
            res.send({data:readData});
        }
    })
}