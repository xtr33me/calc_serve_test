var grpc = require('grpc')
var PROTO_PATH = __dirname + '/protos/mnisttest_service.proto';

module.exports = (connection) => {
    var tensorflow_serving = grpc.load(PROTO_PATH).tensorflow.serving;
    console.log(tensorflow_serving);

    var client = new tensorflow_serving.PredictionService(
        connection, grpc.credentials.createInsecure()
    );

    return { 
        
        predict: (buffer, fn) => {
            // building PredictRequest proto message
            const msg = {
                model_spec: {name: "calctest"},
                inputs: {"xval":5.0, "yval":6.0}
            };

            console.log(client);

            client.predict(msg, (err, response) => {
                if(err){
                    console.log("Error: ",JSON.stringify(err));
                    console.log("Resp: ", response);
                    //return fn(err);
                    return;
                }

                console.log('Got message ', response);
            });

        } //End of predict
    } //End of return
};



function main() {
    var cli = module.exports('localhost:9000');
    cli.predict();
}

if( require.main === module){
    main();
}

//exports.runTest = runTest;