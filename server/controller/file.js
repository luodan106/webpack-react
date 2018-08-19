const exec=require('child_process').exec;

exports.fileUpload=(req,res)=>{

}

exports.fileMini=(req,res)=>{
    const cmdStr='gulp jscompress';
    exec(cmdStr,(err,data)=>{
        if(err){
            console.log("err:"+err);
        }else{
            console.log(data);
        }
    })
}