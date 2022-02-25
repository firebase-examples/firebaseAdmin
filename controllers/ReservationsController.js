const { admin } = require('../db/firebase');
const reservations = admin.database().ref('reservations');

const save = async (req, res) => {
    let datatest = [];
    let allowReserve = false;
    let dateToReserve = new Date(req.body.date);
    let dateToCalculate = new Date(req.body.date);
    let dateStart = new Date(dateToCalculate.setHours(dateToCalculate.getHours() - 1));
    let dateEnd = new Date(dateToCalculate.setHours(dateToCalculate.getHours() + 2));

    console.log(`fecha solicitada: ${dateToReserve}\n`, `fecha inicio: ${dateStart}\n`, `fecha fin: ${dateEnd}\n`)

    await reservations.orderByChild('date').startAt(dateStart.getTime()).endAt(dateEnd.getTime()).once('value', (snapshot) => {
        //console.log(snapshot)
        console.log(snapshot.numChildren())
        snapshot.forEach((data) => {
            console.log(data.val());
            data.val().state == 'canceled' ?
                allowReserve = true : allowReserve = false
            /*datatest.push({
                ...data.val(),
                date: new Date(data.val().date)
            });*/
        })
    });

    if (allowReserve) {
        await reservations.push(req.body)
        res.status(200).send({"msg":"Su cita ha sido reservada"})
    }else{
        res.status(200).send({ "msg": "Ya existe una cita reservada en la franja horaria" });
    }
}

module.exports = {
    save
}