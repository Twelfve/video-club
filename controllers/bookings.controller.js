const express = require('express');
const Booking = require('../models/booking.model');
const Member = require('../models/member.model');
const Copy = require('../models/copy.model');

async function create(req, res, next) {
    const date = req.body.date;
    const memberId = req.body.memberId;
    const copyId = req.body.copyId;

    let member = await Member.findOne({"_id":memberId});
    let copy = await Copy.findOne({"_id":copyId});
    let booking = new Booking({
        date: date,
        member:member,
        copy:copy
    });
    booking.save().then(obj => res.status(200).json({
        msg: res.__('booking.ok'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msj: res.__('booking.fail'),
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };
    Booking.paginate({},options).then(objs => res.status(200).json({
        msj: res.__('booking.list'),
        objs: objs
    })).catch(ex => res.status(500).json({
        msg: res.__('booking.fail_list'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Booking.findOne({"_id":id}).then(obj => res.status(200).json({
        msj: `booking con el id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('booking.fail_index'),
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let date = req.body.date ? req.body.date : ""; 
    let memberId = req.body.memberId ? req.body.memberId : "";
    let copyId = req.body.copyId ? req.body.copyId : "";

    let booking = new Object({
        _date: date,
        _memberId: memberId,
        _copyId: copyId
    });
    
    Booking.findOneAndUpdate({"_id":id}, booking).then(obj => res.status(200).json({
        msj: res.__('booking.replace'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('booking.fail_replace'),
        obj: ex
    }));
}

function update(req, res, next) {
    const id = req.params.id;
    const date = req.body.date;
    const memberId = req.body.memberId;
    const copyId = req.body.copyId;

    let booking = new Object();
    if(date) booking._date = date;
    if(memberId) booking._memberId = memberId;
    if(copyId) booking._copyId = copyId;

    Booking.findOneAndUpdate({"_id":id}, booking).then(obj => res.status(200).json({
        msj: res.__('booking.update'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('booking.fail_update'),
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Booking.findOneAndDelete({"_id":id}).then(obj => res.status(200).json({
        msj: res.__('booking.destroy'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('booking.fail_destroy'),
        obj: ex
    }));
}

module.exports = {create, list, index, replace, update, destroy};