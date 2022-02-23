/* eslint-disable camelcase */
const db = require('../models');
const Owner = db.owners;

exports.create = (req, res) => {
  const owner = {
    nama: req.body.nama,
    nik: req.body.nik,
    jumlah_uttp: 0,
  };

  Owner.create(owner)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Error has been occured when creating the Owner',
        });
      });
};

exports.findAll = (req, res) => {
  Owner.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving owners list.',
        });
      });
};

exports.findOne = (req, res) => {
  const nik = req.params.nik;
  Owner.findOne({
    where: {
      nik: nik,
    },
  })
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find owner with nik = ${nik}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving owner with nik=' + nik,
        });
      });
};

exports.update = (req, res) => {
  const oldNik = req.params.nik;
  const {nama, nik, jumlah_uttp} = req.body;

  Owner.update({nama, nik, jumlah_uttp}, {
    where: {nik: oldNik},
  }).then((num) => {
    if (num == 1) {
      res.send({
        message: 'Updated Succesfully!',
      });
    } else {
      res.send({
        message: 'Something is wrong, cannot update!',
      });
    }
  }).catch((err) => {
    res.status(500).send({
      message: `Duplicate Entry of NIK = ${nik}.`,
    });
  });
};

exports.delete = (req, res) => {
  const nik = req.params.nik;
  Owner.destroy({
    where: {nik: nik},
  }).then((num) => {
    if (num == 1) {
      res.send({
        message: 'Deleted Succesfully!',
      });
    } else {
      res.send({
        message: 'Something is wrong, cannot delete!',
      });
    }
  }).catch((err) => {
    res.status(500).send({
      message: 'Error deleting owner with nik=' + nik,
    });
  });
};
