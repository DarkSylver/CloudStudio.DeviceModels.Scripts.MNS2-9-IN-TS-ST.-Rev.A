function parseUplink(device, payload)
{
    // Obtener payload como JSON
    const jsonPayload = payload.asJsonObject();
    Object.keys(jsonPayload).forEach(function(key){
        env.log(key,jsonPayload[key])
    })

    // No se puede deserializar el payload como json, salir.
    if (!jsonPayload) { return; }

    // Verificar que la dirección del dispositivo sea la correcta
    //if (jsonPayload.deviceAddress.toString() !== device.address.toString()) {
      //  env.log('Invalid device address');}
       // return;
    

    // Actualizar estado de las baterías
    if (jsonPayload.battery){
    env.log("Variable battery encontrada: ",jsonPayload.battery);
    let cortar = jsonPayload.battery.split(' ');
    var data = cortar[0];
    env.log("Battery---> ",data);
    device.updateDeviceBattery({voltage : data});
    }
    // Actualizar RSSI
    if (jsonPayload.rssi) {
        const rssi = jsonPayload.rssi;
        env.log("Variable rssi  encontrada: ",jsonPayload.rssi);
        let cortar = jsonPayload.rssi.split(' ');
        var data2 = cortar[0];
        env.log("rssi---> ",data2);
        device.updateDeviceRssi({strength:data2});
    }
    // Parsear y almacenar la temperatura
    if (jsonPayload.temperature) {
        var temperatureSensor = device.endpoints.byAddress(1);
        let temp = jsonPayload.temperature;
        env.log("Temperatura--->",temp);
        temperatureSensor.updateTemperatureSensorStatus(temp)
        
    }

    


}