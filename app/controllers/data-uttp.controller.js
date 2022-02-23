/* eslint-disable camelcase */
const db = require('../models');
const DataUTTP = db.dataUTTPs;
const Owner = db.owners;

exports.create = (req, res) => {
  const nik = req.params.nik;

  const kode_uttp = Math.round(Math.random() * 100000);
  const {lokasi, jenis, tanggal_tera, retribusi, keterangan} = req.body;
  const dataUTTP = {
    kode_uttp,
    nik_pemilik: nik,
    lokasi,
    jenis,
    tanggal_tera,
    retribusi,
    keterangan,
  };

  DataUTTP.create(dataUTTP)
      .then((data) => {
        res.send(data);

        DataUTTP.count({
          where: {
            nik_pemilik: data.nik_pemilik,
          },
        })
            .then((result) => {
              Owner.update({
                jumlah_uttp: result,
              }, {
                where: {
                  nik: data.nik_pemilik,
                },
              });
            });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Error has been occured when creating the Data UTTP',
        });
      });
};

exports.findAll = (req, res) => {
  DataUTTP.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
        err.message || 'Some error occurred while retrieving data UTTP list.',
        });
      });
};

exports.findOne = (req, res) => {
  Owner.findOne({
    where: {
      nik: req.params.nik,
    },
    include: ['data_uttps'],
  }).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message:
    err.message || 'Some error occurred while retrieving data UTTP list.',
    });
  });
};

exports.update = (req, res) => {
  const kode_uttp = req.params.kode_uttp;
  const {lokasi, jenis, tanggal_tera, retribusi, keterangan} = req.body;

  DataUTTP.update({
    lokasi,
    jenis,
    tanggal_tera,
    retribusi,
    keterangan,
  }, {
    where: {
      kode_uttp: kode_uttp,
    },
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
      message: 'Error updating data UTTP with kode_uttp=' + kode_uttp,
    });
  });
};

exports.delete = (req, res) => {
  const kode_uttp = req.params.kode_uttp;

  DataUTTP.destroy({
    where: {
      kode_uttp: kode_uttp,
    },
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
      message: 'Error deleting data uttp with kode_uttp=' + kode_uttp,
    });
  });
};
