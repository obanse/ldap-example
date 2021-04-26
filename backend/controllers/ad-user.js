const adUser = require('ldapjs');
const {UniqueConstraintError} = require("sequelize");

// define models
const AdUser = require('../models/ad-user');

const client = adUser.createClient({
  url: [
    'ldap://'+ process.env.DC1 +':389',
    'ldap://'+ process.env.DC2 +':389'
  ]
});

const searchBase = 'OU=Altmarkkreis,DC=amksaw,DC=int';

exports.getAllUsers = (req, res) => {

  client.bind(process.env.LDAP_USER, process.env.LDAP_PASS, (err) => {

    if (err) {
      console.log("BIND ERROR: " + err);
    } else {
      console.log("BIND: SUCCESS");

      const opts = {
        filter: '(&(objectClass=user)(!(objectClass=computer)))',
        scope: 'sub',
        attributes: [
          'objectSid',
          'cn',
          'sAMAccountName',
          'sn',
          'givenName',
          'l',
          'streetAddress',
          'postOfficeBox',
          'postalCode',
          'telephoneNumber',
          'physicalDeliveryOfficeName',
          'company',
          'title',
          'department',
          'description',
          'mail',
          'manager'
        ]
      };

      let mappedObjectArray = [];
      client.search(searchBase, opts, (err, result) => {

        if (err) {
          console.log("ERROR ON SEARCH: " + err);
        } else {
          console.log("SEARCH: SUCCESS");

          result.on('searchEntry', (entry) => {

            let mappedObject = {
              'firstname':    entry.object.givenName,
              'lastname':     entry.object.sn,
              'fullname':     entry.object.cn,
              'description':  entry.object.description,
              'office':       entry.object.physicalDeliveryOfficeName,
              'phone':        entry.object.telephoneNumber,
              'street':       entry.object.streetAddress,
              'floor':        entry.object.postOfficeBox,
              'postalCode':   entry.object.postalCode,
              'city':         entry.object.l,
              'company':      entry.object.company,
              'department':   entry.object.department,
              'position':     entry.object.title,
              'manager':      entry.object.manager
            };
            mappedObjectArray.push(mappedObject);

          });
          result.on('searchReference', (referral) => {
            console.log('referral: ' + referral.uris.join());
          });
          result.on('error', (err) => {
            console.error('error: ' + err.message);
          });
          result.on('end', (result) => {
            console.log('status: ' + result.status);
            res.status(200).json({
              users: mappedObjectArray
            });
          });
        }
      });
    }
  });

  // TODO: remove - only for testing
  createUser();

};

function createUser() {

  // TODO: synchronize AD to save users to db
  AdUser.create({
    objectSid: 'S-1-55-sdfjdslfhsdkljhf',
    sAMAccountName: 'user_sAMAccountName'
  }).then(user => {
    console.log("something happened?");
    console.log("ID:: " + user.id);
  }).catch(err => {
    if (err instanceof UniqueConstraintError) {
      console.error("ERR:: USER not created! " + err.errors[0].message);
    } else {
      console.log(err);
    }
  });
}
