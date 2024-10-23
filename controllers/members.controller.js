const express = require('express');
const { Member, Copy } = require('../classes/db');

function create(req, res, next) {
    const { name, lastName } = req.body;

    Member.create({
        name,
        lastName,
        address,
        phone,
        status
    })
        .then(member => {
            res.json(member);
        })
        .catch(err => {
            res.status(400).json(err);
        });

}
function list(req, res, next) {
    Member.findAll({include: ['copies']})
        .then(members => {
            res.json(members);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

function addCopy(req, res, next) {
    const { memberId, copyId } = req.body;
    Member.findByPk(memberId).then(member => {
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        Copy.findByPk(copyId).then(copy => {
            if (!copy) {
                return res.status(404).json({ message: 'Copy not found' });
            }
            member.addCopy(copy)
                .then(() => {
                    res.json({ message: 'Copy added to member' });
                })
                .catch(err => {
                    res.status(400).json(err);
                });
        });
    });
}

function index(req, res, next) {
    const { id } = req.params;
    Member.findByPk(id)
        .then(member => {
            if (!member) {
                return res.status(404).json({ message: 'Member not found' });
            }
            res.json(member);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}
function replace(req, res, next) {
    const { id } = req.params;
    Member.findByPk(id).then(member => {
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        const { name, lastName, address, phone, status } = req.body;
        member.name = name;
        member.lastName = lastName;
        member.address = address;
        member.phone = phone;
        member.status = status;
        member.save()
            .then(member => {
                res.json(member);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });    
}
function update(req, res, next) {
    const { id } = req.params;
    Member.findByPk(id).then(member => {
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        const { name, lastName, address, phone, status } = req.body;
        member.name = name || member.name;
        member.lastName = lastName || member.lastName;
        member.address = address || member.address;
        member.phone = phone || member.phone;
        member.status = status || member.status;
        member.save()
            .then(member => {
                res.json(member);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });
}
function destroy(req, res, next) {
    const { id } = req.params;
    Member.destroy({
        where: {
            id
        }
    })
        .then(() => {
            res.json({ message: 'Member deleted' });
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

module.exports = {
    create,
    list,
    index,
    replace,
    update,
    destroy,
    addCopy
};
