const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!'

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);

    })
});

let hashedPassword = '$2a$10$NU.FcEu.afJ8woQfoKaE5.uvnIb.Ud/CofcbePKfqp6SzamwQagc2';
bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});

// let data = {
//     id: 10
// };

// let token = jwt.sign(data, '123abc');
// console.log(token);
// let decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);

// let message = 'I am user number 1';
// let hash = SHA256(message).toString();

// // console.log(`Check message: ${message} And Check hash: ${hash}`);

// let data = {
//     id: 4
// };

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + "secret").toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data) + "secret").toString();

// if(resultHash === token.hash){
//     console.log(`Data was not change`)
//     console.log(resultHash)
//     console.log(token.hash)
// } else {
//     console.log("Data was changed. Do not trust")
//     console.log(resultHash)
//     console.log(token.hash)
// }