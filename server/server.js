const express=require('express');
const path=require('path');

const logger=require('morgan');  //http请求日志
const cookieParser=require('cookie-parser');  //设置、获取cookie
const session=require('express-session');   //在服务端保存数据的中间件
const bodyParser=require('body-parser');
const http=require('http');
const ejs=require('ejs');
const fs=require('fs');
const debug = require('debug')('test:server');

const app=express();

const route=require('./route');

app.use(logger('dev'));
//app.use(bodyParser.json());
//传输数据较大
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../public')));


// app.get('*',function(req,res){
//     const html=fs.readFileSync(path.resolve(__dirname,'../dist/index.html'),'utf-8');
//     res.send(html);
// })

app.use(route);

app.use(session({
	secret:'123',
	resave:false,
	saveUninitialized:true
}));

//启动webpack-dev-server
if (process.env.NODE_ENV == undefined || process.env.NODE_ENV === 'development'){
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('../webpack.config');
  const webpack = require('webpack');

  var complier = webpack(webpackConfig);

  app.use(webpackDevMiddleware(complier,{}));

}


app.get('/',function(req,res){
  res.render('index',{
    title:'personal'
  });
});

// view engine setup
app.set('views', path.join(__dirname, '../'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

const port = '3000';
app.set('port', port);
const server=http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
  