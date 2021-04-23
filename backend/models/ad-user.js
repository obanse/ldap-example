const { DataTypes, Deferrable } = require('sequelize');
const sequelize = require('../db');

const AdUser = sequelize.define('AdUser', {
  // define attributes
  cn: {
    type: DataTypes.STRING,
  },
  sAMAccountName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sn: {
    type: DataTypes.STRING,
  },
  givenName: {
    type: DataTypes.STRING,
  },
  l: {
    type: DataTypes.STRING,
  },
  streetAddress: {
    type: DataTypes.STRING,
  },
  postOfficeBox: {
    type: DataTypes.STRING,
  },
  postalCode: {
    type: DataTypes.STRING,
  },
  telephoneNumber: {
    type: DataTypes.STRING,
  },
  physicalDeliveryOfficeName: {
    type: DataTypes.STRING,
  },
  company: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  department: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  mail: {
    type: DataTypes.STRING,
  },
  // manager: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: AdUser,
  //     key: 'id',
  //     deferrable: Deferrable.INITIALLY_IMMEDIATE,
  //   },
  // }
}, {
  freezeTableName: true,
});

module.exports = AdUser;
