// Lockers model:
// 
// locker: {
//   number: "",
//   situacao: "",
//   dono: "",
//   date: "",
//   color: "",
//   payment: "".
// }

// User model:
//
// user: {
//   course: "",
//   email: "",
//   grr: "",
//   nome: "",
//   phone: "",
//   type: "",
// }

// Upload the contract to the database

const db = firebase.firestore();

function uploadContracts() {

    console.log("Uploading contracts...");


    const armarios = [{
            "number": 147,
            "payment": "Dinheiro",
            "color": "green",
            "date": "06/01/2020",
            "dono": "147",
            "situacao": "Regular"
        },
        {
            "number": 212,
            "payment": "Dinheiro",
            "color": "green",
            "date": "10/02/2020",
            "dono": "212",
            "situacao": "Regular"
        },
        {
            "number": 20,
            "payment": "Dinheiro",
            "color": "green",
            "date": "17/02/2020",
            "dono": "20",
            "situacao": "Regular"
        },
        {
            "number": 52,
            "payment": "Dinheiro",
            "color": "green",
            "date": "28/02/2020",
            "dono": "52",
            "situacao": "Regular"
        },
        {
            "number": 108,
            "payment": "Dinheiro",
            "color": "green",
            "date": "28/02/2020",
            "dono": "108",
            "situacao": "Regular"
        },
        {
            "number": 13,
            "payment": "Dinheiro",
            "color": "green",
            "date": "02/03/2020",
            "dono": "13",
            "situacao": "Regular"
        },
        {
            "number": 21,
            "payment": "Dinheiro",
            "color": "green",
            "date": "02/03/2020",
            "dono": "21",
            "situacao": "Regular"
        },
        {
            "number": 73,
            "payment": "Dinheiro",
            "color": "green",
            "date": "02/03/2020",
            "dono": "73",
            "situacao": "Regular"
        },
        {
            "number": 87,
            "payment": "Dinheiro",
            "color": "green",
            "date": "02/03/2020",
            "dono": "87",
            "situacao": "Regular"
        },
        {
            "number": 104,
            "payment": "Dinheiro",
            "color": "green",
            "date": "02/03/2020",
            "dono": "104",
            "situacao": "Regular"
        },
        {
            "number": 127,
            "payment": "Dinheiro",
            "color": "green",
            "date": "02/03/2020",
            "dono": "127",
            "situacao": "Regular"
        },
        {
            "number": 249,
            "payment": "Dinheiro",
            "color": "green",
            "date": "02/03/2020",
            "dono": "249",
            "situacao": "Regular"
        },
        {
            "number": 297,
            "payment": "Dinheiro",
            "color": "green",
            "date": "02/03/2020",
            "dono": "297",
            "situacao": "Regular"
        },
        {
            "number": 321,
            "payment": "Dinheiro",
            "color": "green",
            "date": "02/03/2020",
            "dono": "321",
            "situacao": "Regular"
        },
        {
            "number": 369,
            "payment": "Dinheiro",
            "color": "green",
            "date": "02/03/2020",
            "dono": "369",
            "situacao": "Regular"
        },
        {
            "number": 62,
            "payment": "Dinheiro",
            "color": "green",
            "date": "03/03/2020",
            "dono": "62",
            "situacao": "Regular"
        },
        {
            "number": 102,
            "payment": "Dinheiro",
            "color": "green",
            "date": "03/03/2020",
            "dono": "102",
            "situacao": "Regular"
        },
        {
            "number": 165,
            "payment": "Dinheiro",
            "color": "green",
            "date": "03/03/2020",
            "dono": "165",
            "situacao": "Regular"
        },
        {
            "number": 267,
            "payment": "Dinheiro",
            "color": "green",
            "date": "03/03/2020",
            "dono": "267",
            "situacao": "Regular"
        },
        {
            "number": 119,
            "payment": "Dinheiro",
            "color": "green",
            "date": "04/03/2020",
            "dono": "119",
            "situacao": "Regular"
        },
        {
            "number": 139,
            "payment": "Dinheiro",
            "color": "green",
            "date": "04/03/2020",
            "dono": "139",
            "situacao": "Regular"
        },
        {
            "number": 39,
            "payment": "Dinheiro",
            "color": "green",
            "date": "05/03/2020",
            "dono": "39",
            "situacao": "Regular"
        },
        {
            "number": 323,
            "payment": "Dinheiro",
            "color": "green",
            "date": "05/03/2020",
            "dono": "323",
            "situacao": "Regular"
        },
        {
            "number": 51,
            "payment": "Dinheiro",
            "color": "green",
            "date": "06/03/2020",
            "dono": "51",
            "situacao": "Regular"
        },
        {
            "number": 58,
            "payment": "Dinheiro",
            "color": "green",
            "date": "06/03/2020",
            "dono": "58",
            "situacao": "Regular"
        },
        {
            "number": 96,
            "payment": "Dinheiro",
            "color": "green",
            "date": "06/03/2020",
            "dono": "96",
            "situacao": "Regular"
        },
        {
            "number": 100,
            "payment": "Dinheiro",
            "color": "green",
            "date": "06/03/2020",
            "dono": "100",
            "situacao": "Regular"
        },
        {
            "number": 103,
            "payment": "Dinheiro",
            "color": "green",
            "date": "06/03/2020",
            "dono": "103",
            "situacao": "Regular"
        },
        {
            "number": 112,
            "payment": "Dinheiro",
            "color": "green",
            "date": "06/03/2020",
            "dono": "112",
            "situacao": "Regular"
        },
        {
            "number": 114,
            "payment": "Dinheiro",
            "color": "green",
            "date": "06/03/2020",
            "dono": "114",
            "situacao": "Regular"
        },
        {
            "number": 116,
            "payment": "Dinheiro",
            "color": "green",
            "date": "06/03/2020",
            "dono": "116",
            "situacao": "Regular"
        },
        {
            "number": 223,
            "payment": "Dinheiro",
            "color": "green",
            "date": "06/03/2020",
            "dono": "223",
            "situacao": "Regular"
        },
        {
            "number": 19,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "19",
            "situacao": "Regular"
        },
        {
            "number": 43,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "43",
            "situacao": "Regular"
        },
        {
            "number": 53,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "53",
            "situacao": "Regular"
        },
        {
            "number": 72,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "72",
            "situacao": "Regular"
        },
        {
            "number": 82,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "82",
            "situacao": "Regular"
        },
        {
            "number": 93,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "93",
            "situacao": "Regular"
        },
        {
            "number": 95,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "95",
            "situacao": "Regular"
        },
        {
            "number": 109,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "109",
            "situacao": "Regular"
        },
        {
            "number": 137,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "137",
            "situacao": "Regular"
        },
        {
            "number": 143,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "143",
            "situacao": "Regular"
        },
        {
            "number": 152,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "152",
            "situacao": "Regular"
        },
        {
            "number": 155,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "155",
            "situacao": "Regular"
        },
        {
            "number": 171,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "171",
            "situacao": "Regular"
        },
        {
            "number": 187,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "187",
            "situacao": "Regular"
        },
        {
            "number": 201,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "201",
            "situacao": "Regular"
        },
        {
            "number": 265,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "265",
            "situacao": "Regular"
        },
        {
            "number": 269,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "269",
            "situacao": "Regular"
        },
        {
            "number": 289,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "289",
            "situacao": "Regular"
        },
        {
            "number": 293,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "293",
            "situacao": "Regular"
        },
        {
            "number": 356,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "356",
            "situacao": "Regular"
        },
        {
            "number": 363,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "363",
            "situacao": "Regular"
        },
        {
            "number": 365,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "365",
            "situacao": "Regular"
        },
        {
            "number": 368,
            "payment": "Dinheiro",
            "color": "green",
            "date": "09/03/2020",
            "dono": "368",
            "situacao": "Regular"
        },
        {
            "number": 94,
            "payment": "Dinheiro",
            "color": "green",
            "date": "10/03/2020",
            "dono": "94",
            "situacao": "Regular"
        },
        {
            "number": 237,
            "payment": "Dinheiro",
            "color": "green",
            "date": "10/03/2020",
            "dono": "237",
            "situacao": "Regular"
        },
        {
            "number": 252,
            "payment": "Dinheiro",
            "color": "green",
            "date": "10/03/2020",
            "dono": "252",
            "situacao": "Regular"
        },
        {
            "number": 254,
            "payment": "Dinheiro",
            "color": "green",
            "date": "10/03/2020",
            "dono": "254",
            "situacao": "Regular"
        },
        {
            "number": 78,
            "payment": "Dinheiro",
            "color": "green",
            "date": "11/03/2020",
            "dono": "78",
            "situacao": "Regular"
        },
        {
            "number": 261,
            "payment": "Dinheiro",
            "color": "green",
            "date": "11/03/2020",
            "dono": "261",
            "situacao": "Regular"
        },
        {
            "number": 275,
            "payment": "Dinheiro",
            "color": "green",
            "date": "11/03/2020",
            "dono": "275",
            "situacao": "Regular"
        },
        {
            "number": 277,
            "payment": "Dinheiro",
            "color": "green",
            "date": "11/03/2020",
            "dono": "277",
            "situacao": "Regular"
        },
        {
            "number": 373,
            "payment": "Dinheiro",
            "color": "green",
            "date": "11/03/2020",
            "dono": "373",
            "situacao": "Regular"
        },
        {
            "number": 24,
            "payment": "Dinheiro",
            "color": "green",
            "date": "12/03/2020",
            "dono": "24",
            "situacao": "Regular"
        },
        {
            "number": 74,
            "payment": "Dinheiro",
            "color": "green",
            "date": "12/03/2020",
            "dono": "74",
            "situacao": "Regular"
        },
        {
            "number": 111,
            "payment": "Dinheiro",
            "color": "green",
            "date": "12/03/2020",
            "dono": "111",
            "situacao": "Regular"
        },
        {
            "number": 120,
            "payment": "Dinheiro",
            "color": "green",
            "date": "12/03/2020",
            "dono": "120",
            "situacao": "Regular"
        },
        {
            "number": 122,
            "payment": "Dinheiro",
            "color": "green",
            "date": "12/03/2020",
            "dono": "122",
            "situacao": "Regular"
        },
        {
            "number": 144,
            "payment": "Dinheiro",
            "color": "green",
            "date": "12/03/2020",
            "dono": "144",
            "situacao": "Regular"
        },
        {
            "number": 164,
            "payment": "Dinheiro",
            "color": "green",
            "date": "12/03/2020",
            "dono": "164",
            "situacao": "Regular"
        },
        {
            "number": 256,
            "payment": "Dinheiro",
            "color": "green",
            "date": "12/03/2020",
            "dono": "256",
            "situacao": "Regular"
        },
        {
            "number": 273,
            "payment": "Dinheiro",
            "color": "green",
            "date": "12/03/2020",
            "dono": "273",
            "situacao": "Regular"
        },
        {
            "number": 287,
            "payment": "Dinheiro",
            "color": "green",
            "date": "12/03/2020",
            "dono": "287",
            "situacao": "Regular"
        },
        {
            "number": 243,
            "payment": "Dinheiro",
            "color": "green",
            "date": "13/03/2020",
            "dono": "243",
            "situacao": "Regular"
        },
        {
            "number": 305,
            "payment": "Dinheiro",
            "color": "green",
            "date": "13/03/2020",
            "dono": "305",
            "situacao": "Regular"
        },
        {
            "number": 325,
            "payment": "Dinheiro",
            "color": "green",
            "date": "13/03/2020",
            "dono": "325",
            "situacao": "Regular"
        },
        {
            "number": 211,
            "payment": "Dinheiro",
            "color": "green",
            "date": "17/03/2020",
            "dono": "211",
            "situacao": "Regular"
        },
        {
            "number": 359,
            "payment": "Dinheiro",
            "color": "green",
            "date": "03/09/2020",
            "dono": "359",
            "situacao": "Regular"
        },
        {
            "number": 251,
            "payment": "Dinheiro",
            "color": "green",
            "date": "02/02/2022",
            "dono": "251",
            "situacao": "Regular"
        },
        {
            "number": 11,
            "payment": "Dinheiro",
            "color": "green",
            "date": "14/02/2022",
            "dono": "11",
            "situacao": "Regular"
        },
        {
            "number": 12,
            "payment": "Dinheiro",
            "color": "green",
            "date": "14/02/2022",
            "dono": "12",
            "situacao": "Regular"
        },
        {
            "number": 25,
            "payment": "Dinheiro",
            "color": "green",
            "date": "14/02/2022",
            "dono": "25",
            "situacao": "Regular"
        },
        {
            "number": 38,
            "payment": "Dinheiro",
            "color": "green",
            "date": "14/02/2022",
            "dono": "38",
            "situacao": "Regular"
        },
        {
            "number": 49,
            "payment": "Dinheiro",
            "color": "green",
            "date": "14/02/2022",
            "dono": "49",
            "situacao": "Regular"
        },
        {
            "number": 77,
            "payment": "Dinheiro",
            "color": "green",
            "date": "14/02/2022",
            "dono": "77",
            "situacao": "Regular"
        },
        {
            "number": 81,
            "payment": "Dinheiro",
            "color": "green",
            "date": "14/02/2022",
            "dono": "81",
            "situacao": "Regular"
        },
        {
            "number": 85,
            "payment": "Dinheiro",
            "color": "green",
            "date": "14/02/2022",
            "dono": "85",
            "situacao": "Regular"
        },
        {
            "number": 213,
            "payment": "Dinheiro",
            "color": "green",
            "date": "14/02/2022",
            "dono": "213",
            "situacao": "Regular"
        },
        {
            "number": 279,
            "payment": "Dinheiro",
            "color": "green",
            "date": "14/02/2022",
            "dono": "279",
            "situacao": "Regular"
        },
        {
            "number": 376,
            "payment": "Dinheiro",
            "color": "green",
            "date": "14/02/2022",
            "dono": "376",
            "situacao": "Regular"
        },
        {
            "number": 35,
            "payment": "Dinheiro",
            "color": "green",
            "date": "15/02/2022",
            "dono": "35",
            "situacao": "Regular"
        },
        {
            "number": 153,
            "payment": "Dinheiro",
            "color": "green",
            "date": "15/02/2022",
            "dono": "153",
            "situacao": "Regular"
        },
        {
            "number": 162,
            "payment": "Dinheiro",
            "color": "green",
            "date": "15/02/2022",
            "dono": "162",
            "situacao": "Regular"
        },
        {
            "number": 197,
            "payment": "Dinheiro",
            "color": "green",
            "date": "15/02/2022",
            "dono": "197",
            "situacao": "Regular"
        },
        {
            "number": 285,
            "payment": "Dinheiro",
            "color": "green",
            "date": "15/02/2022",
            "dono": "285",
            "situacao": "Regular"
        },
        {
            "number": 329,
            "payment": "Dinheiro",
            "color": "green",
            "date": "15/02/2022",
            "dono": "329",
            "situacao": "Regular"
        },
        {
            "number": 364,
            "payment": "Dinheiro",
            "color": "green",
            "date": "15/02/2022",
            "dono": "364",
            "situacao": "Regular"
        },
        {
            "number": 80,
            "payment": "Dinheiro",
            "color": "green",
            "date": "16/02/2022",
            "dono": "80",
            "situacao": "Regular"
        },
        {
            "number": 135,
            "payment": "Dinheiro",
            "color": "green",
            "date": "16/02/2022",
            "dono": "135",
            "situacao": "Regular"
        },
        {
            "number": 193,
            "payment": "Dinheiro",
            "color": "green",
            "date": "16/02/2022",
            "dono": "193",
            "situacao": "Regular"
        },
        {
            "number": 229,
            "payment": "Dinheiro",
            "color": "green",
            "date": "16/02/2022",
            "dono": "229",
            "situacao": "Regular"
        },
        {
            "number": 281,
            "payment": "Dinheiro",
            "color": "green",
            "date": "16/02/2022",
            "dono": "281",
            "situacao": "Regular"
        },
        {
            "number": 372,
            "payment": "Dinheiro",
            "color": "green",
            "date": "16/02/2022",
            "dono": "372",
            "situacao": "Regular"
        },
        {
            "number": 88,
            "payment": "Dinheiro",
            "color": "green",
            "date": "17/02/2022",
            "dono": "88",
            "situacao": "Regular"
        },
        {
            "number": 130,
            "payment": "Dinheiro",
            "color": "green",
            "date": "17/02/2022",
            "dono": "130",
            "situacao": "Regular"
        },
        {
            "number": 134,
            "payment": "Dinheiro",
            "color": "green",
            "date": "17/02/2022",
            "dono": "134",
            "situacao": "Regular"
        },
        {
            "number": 27,
            "payment": "Dinheiro",
            "color": "green",
            "date": "18/02/2022",
            "dono": "27",
            "situacao": "Regular"
        },
        {
            "number": 76,
            "payment": "Dinheiro",
            "color": "green",
            "date": "18/02/2022",
            "dono": "76",
            "situacao": "Regular"
        },
        {
            "number": 105,
            "payment": "Dinheiro",
            "color": "green",
            "date": "18/02/2022",
            "dono": "105",
            "situacao": "Regular"
        },
        {
            "number": 239,
            "payment": "Dinheiro",
            "color": "green",
            "date": "18/02/2022",
            "dono": "239",
            "situacao": "Regular"
        },
        {
            "number": 245,
            "payment": "Dinheiro",
            "color": "green",
            "date": "18/02/2022",
            "dono": "245",
            "situacao": "Regular"
        },
        {
            "number": 259,
            "payment": "Dinheiro",
            "color": "green",
            "date": "18/02/2022",
            "dono": "259",
            "situacao": "Regular"
        },
        {
            "number": 40,
            "payment": "Dinheiro",
            "color": "green",
            "date": "21/02/2022",
            "dono": "40",
            "situacao": "Regular"
        },
        {
            "number": 219,
            "payment": "Dinheiro",
            "color": "green",
            "date": "21/02/2022",
            "dono": "219",
            "situacao": "Regular"
        },
        {
            "number": 345,
            "payment": "Dinheiro",
            "color": "green",
            "date": "21/02/2022",
            "dono": "345",
            "situacao": "Regular"
        },
        {
            "number": 71,
            "payment": "Dinheiro",
            "color": "green",
            "date": "23/02/2022",
            "dono": "71",
            "situacao": "Regular"
        },
        {
            "number": 89,
            "payment": "Dinheiro",
            "color": "green",
            "date": "23/02/2022",
            "dono": "89",
            "situacao": "Regular"
        },
        {
            "number": 129,
            "payment": "Dinheiro",
            "color": "green",
            "date": "23/02/2022",
            "dono": "129",
            "situacao": "Regular"
        },
        {
            "number": 349,
            "payment": "Dinheiro",
            "color": "green",
            "date": "23/02/2022",
            "dono": "349",
            "situacao": "Regular"
        },
        {
            "number": 17,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "17",
            "situacao": "Irregular"
        },
        {
            "number": 23,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "23",
            "situacao": "Irregular"
        },
        {
            "number": 29,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "29",
            "situacao": "Irregular"
        },
        {
            "number": 30,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "30",
            "situacao": "Irregular"
        },
        {
            "number": 31,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "31",
            "situacao": "Irregular"
        },
        {
            "number": 34,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "34",
            "situacao": "Irregular"
        },
        {
            "number": 36,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "36",
            "situacao": "Irregular"
        },
        {
            "number": 37,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "37",
            "situacao": "Irregular"
        },
        {
            "number": 41,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "41",
            "situacao": "Irregular"
        },
        {
            "number": 42,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "42",
            "situacao": "Irregular"
        },
        {
            "number": 44,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "44",
            "situacao": "Irregular"
        },
        {
            "number": 45,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "45",
            "situacao": "Irregular"
        },
        {
            "number": 46,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "46",
            "situacao": "Irregular"
        },
        {
            "number": 48,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "48",
            "situacao": "Irregular"
        },
        {
            "number": 54,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "54",
            "situacao": "Irregular"
        },
        {
            "number": 55,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "55",
            "situacao": "Irregular"
        },
        {
            "number": 57,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "57",
            "situacao": "Irregular"
        },
        {
            "number": 60,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "60",
            "situacao": "Irregular"
        },
        {
            "number": 63,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "63",
            "situacao": "Irregular"
        },
        {
            "number": 65,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "65",
            "situacao": "Irregular"
        },
        {
            "number": 66,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "66",
            "situacao": "Irregular"
        },
        {
            "number": 67,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "67",
            "situacao": "Irregular"
        },
        {
            "number": 68,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "68",
            "situacao": "Irregular"
        },
        {
            "number": 69,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "69",
            "situacao": "Irregular"
        },
        {
            "number": 70,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "70",
            "situacao": "Irregular"
        },
        {
            "number": 75,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "75",
            "situacao": "Irregular"
        },
        {
            "number": 79,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "79",
            "situacao": "Irregular"
        },
        {
            "number": 83,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "83",
            "situacao": "Irregular"
        },
        {
            "number": 84,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "84",
            "situacao": "Irregular"
        },
        {
            "number": 86,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "86",
            "situacao": "Irregular"
        },
        {
            "number": 90,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "90",
            "situacao": "Irregular"
        },
        {
            "number": 91,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "91",
            "situacao": "Irregular"
        },
        {
            "number": 92,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "92",
            "situacao": "Irregular"
        },
        {
            "number": 97,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "97",
            "situacao": "Irregular"
        },
        {
            "number": 98,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "98",
            "situacao": "Irregular"
        },
        {
            "number": 99,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "99",
            "situacao": "Irregular"
        },
        {
            "number": 101,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "101",
            "situacao": "Irregular"
        },
        {
            "number": 107,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "107",
            "situacao": "Irregular"
        },
        {
            "number": 110,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "110",
            "situacao": "Irregular"
        },
        {
            "number": 113,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "113",
            "situacao": "Irregular"
        },
        {
            "number": 115,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "115",
            "situacao": "Irregular"
        },
        {
            "number": 117,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "117",
            "situacao": "Irregular"
        },
        {
            "number": 121,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "121",
            "situacao": "Irregular"
        },
        {
            "number": 123,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "123",
            "situacao": "Irregular"
        },
        {
            "number": 124,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "124",
            "situacao": "Irregular"
        },
        {
            "number": 125,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "125",
            "situacao": "Irregular"
        },
        {
            "number": 126,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "126",
            "situacao": "Irregular"
        },
        {
            "number": 140,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "140",
            "situacao": "Irregular"
        },
        {
            "number": 141,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "141",
            "situacao": "Irregular"
        },
        {
            "number": 142,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "142",
            "situacao": "Irregular"
        },
        {
            "number": 145,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "145",
            "situacao": "Irregular"
        },
        {
            "number": 146,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "146",
            "situacao": "Irregular"
        },
        {
            "number": 148,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "148",
            "situacao": "Irregular"
        },
        {
            "number": 149,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "149",
            "situacao": "Irregular"
        },
        {
            "number": 150,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "150",
            "situacao": "Irregular"
        },
        {
            "number": 151,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "151",
            "situacao": "Irregular"
        },
        {
            "number": 154,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "154",
            "situacao": "Irregular"
        },
        {
            "number": 156,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "156",
            "situacao": "Irregular"
        },
        {
            "number": 157,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "157",
            "situacao": "Irregular"
        },
        {
            "number": 159,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "159",
            "situacao": "Irregular"
        },
        {
            "number": 160,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "160",
            "situacao": "Irregular"
        },
        {
            "number": 161,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "161",
            "situacao": "Irregular"
        },
        {
            "number": 163,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "163",
            "situacao": "Irregular"
        },
        {
            "number": 166,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "166",
            "situacao": "Irregular"
        },
        {
            "number": 167,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "167",
            "situacao": "Irregular"
        },
        {
            "number": 169,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "169",
            "situacao": "Irregular"
        },
        {
            "number": 173,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "173",
            "situacao": "Irregular"
        },
        {
            "number": 175,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "175",
            "situacao": "Irregular"
        },
        {
            "number": 176,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "176",
            "situacao": "Irregular"
        },
        {
            "number": 177,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "177",
            "situacao": "Irregular"
        },
        {
            "number": 179,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "179",
            "situacao": "Irregular"
        },
        {
            "number": 183,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "183",
            "situacao": "Irregular"
        },
        {
            "number": 185,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "185",
            "situacao": "Irregular"
        },
        {
            "number": 191,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "191",
            "situacao": "Irregular"
        },
        {
            "number": 195,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "195",
            "situacao": "Irregular"
        },
        {
            "number": 199,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "199",
            "situacao": "Irregular"
        },
        {
            "number": 205,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "205",
            "situacao": "Irregular"
        },
        {
            "number": 209,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "209",
            "situacao": "Irregular"
        },
        {
            "number": 217,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "217",
            "situacao": "Irregular"
        },
        {
            "number": 220,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "220",
            "situacao": "Irregular"
        },
        {
            "number": 221,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "221",
            "situacao": "Irregular"
        },
        {
            "number": 225,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "225",
            "situacao": "Irregular"
        },
        {
            "number": 227,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "227",
            "situacao": "Irregular"
        },
        {
            "number": 231,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "231",
            "situacao": "Irregular"
        },
        {
            "number": 232,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "232",
            "situacao": "Irregular"
        },
        {
            "number": 235,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "235",
            "situacao": "Irregular"
        },
        {
            "number": 241,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "241",
            "situacao": "Irregular"
        },
        {
            "number": 247,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "247",
            "situacao": "Irregular"
        },
        {
            "number": 255,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "255",
            "situacao": "Irregular"
        },
        {
            "number": 257,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "257",
            "situacao": "Irregular"
        },
        {
            "number": 299,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "299",
            "situacao": "Irregular"
        },
        {
            "number": 301,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "301",
            "situacao": "Irregular"
        },
        {
            "number": 303,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "303",
            "situacao": "Irregular"
        },
        {
            "number": 307,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "307",
            "situacao": "Irregular"
        },
        {
            "number": 308,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "308",
            "situacao": "Irregular"
        },
        {
            "number": 309,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "309",
            "situacao": "Irregular"
        },
        {
            "number": 311,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "311",
            "situacao": "Irregular"
        },
        {
            "number": 312,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "312",
            "situacao": "Irregular"
        },
        {
            "number": 315,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "315",
            "situacao": "Irregular"
        },
        {
            "number": 317,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "317",
            "situacao": "Irregular"
        },
        {
            "number": 318,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "318",
            "situacao": "Irregular"
        },
        {
            "number": 320,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "320",
            "situacao": "Irregular"
        },
        {
            "number": 327,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "327",
            "situacao": "Irregular"
        },
        {
            "number": 330,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "330",
            "situacao": "Irregular"
        },
        {
            "number": 333,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "333",
            "situacao": "Irregular"
        },
        {
            "number": 339,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "339",
            "situacao": "Irregular"
        },
        {
            "number": 341,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "341",
            "situacao": "Irregular"
        },
        {
            "number": 343,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "343",
            "situacao": "Irregular"
        },
        {
            "number": 344,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "344",
            "situacao": "Irregular"
        },
        {
            "number": 355,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "355",
            "situacao": "Irregular"
        },
        {
            "number": 357,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "357",
            "situacao": "Irregular"
        },
        {
            "number": 361,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "361",
            "situacao": "Irregular"
        },
        {
            "number": 362,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "362",
            "situacao": "Irregular"
        },
        {
            "number": 366,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "366",
            "situacao": "Irregular"
        },
        {
            "number": 367,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "367",
            "situacao": "Irregular"
        },
        {
            "number": 370,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "370",
            "situacao": "Irregular"
        },
        {
            "number": 371,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "371",
            "situacao": "Irregular"
        },
        {
            "number": 375,
            "payment": "Dinheiro",
            "color": "red",
            "date": "",
            "dono": "375",
            "situacao": "Irregular"
        }
    ];

    const users = [{
            "id": 223,
            "nome": "ALLAN RODRIGUES DIAS",
            "course": "Química",
            "type": "Química",
            "grr": 20204142,
            "email": "ALLANRDIAS2010@GMAIL.COM",
            "phone": "41 9966572684"
        },
        {
            "id": 369,
            "nome": "Ana Julia Molinas Leite da Silva",
            "course": "Química",
            "type": "Química",
            "grr": 20192576,
            "email": "anamolinos52@gmail.com",
            "phone": "41 995001966"
        },
        {
            "id": 197,
            "nome": "CAIO LIVERO",
            "course": "Química",
            "type": "Química",
            "grr": "",
            "email": "caioblivero@gmail.com",
            "phone": "41 988898540"
        },
        {
            "id": 165,
            "nome": "CARLA ALANA DA CRUZ FERREIRA",
            "course": "Química",
            "type": "Química",
            "grr": 20190725,
            "email": "CARLAALANA05@GMAIL.COM",
            "phone": "41 998904313"
        },
        {
            "id": 109,
            "nome": "DAIANE TENCIANO PEDRETTI",
            "course": "Química",
            "type": "Química",
            "grr": 20183803,
            "email": "DAY.T.PEDRETTI@GMAIL.COM",
            "phone": "41 998625383"
        },
        {
            "id": 213,
            "nome": "Eduardo Bello Dunker",
            "course": "Química",
            "type": "Química",
            "grr": 20190748,
            "email": "ebellodun@gmail.com",
            "phone": 41996843924
        },
        {
            "id": 201,
            "nome": "FERNANDA YOHANA BATISTI",
            "course": "ENGENHARIA AMBIENTAL",
            "type": "ENGENHARIA AMBIENTAL",
            "grr": 20191306,
            "email": "FERY.BATISTI@GMAIL.COM",
            "phone": "41 997368128"
        },
        {
            "id": 269,
            "nome": "HANNAH IZABEL SAUER",
            "course": "Química",
            "type": "Química",
            "grr": 20195525,
            "email": "HANNAH.SAUER2211@GMAIL.COM",
            "phone": "41 999221734"
        },
        {
            "id": 193,
            "nome": "IRENE DUCK",
            "course": "Química",
            "type": "Química",
            "grr": 20182908,
            "email": "IDUCK212@GMAIL.COM",
            "phone": "41 998560968"
        },
        {
            "id": 281,
            "nome": "IRENE DUCK",
            "course": "Química",
            "type": "Química",
            "grr": 20182908,
            "email": "IDUCK212@GMAIL.COM",
            "phone": "41 998560968"
        },
        {
            "id": 297,
            "nome": "ISABELA CRISTINE CAMILO",
            "course": "Química",
            "type": "Química",
            "grr": 20190249,
            "email": "ISABELACRISTINECAMILO@GMAIL.COM",
            "phone": "41 991217545"
        },
        {
            "id": 237,
            "nome": "ISABELA CURY MARQUES",
            "course": "ENGENHARIA AMBIENTAL",
            "type": "ENGENHARIA AMBIENTAL",
            "grr": 20201956,
            "email": "ISABELACURYM@GMAIL.COM",
            "phone": "41 999693509"
        },
        {
            "id": 249,
            "nome": "ISIS FERNANDES RIBEIRA",
            "course": "Química",
            "type": "Química",
            "grr": 20190697,
            "email": "ISISTERRIBEIRO@GMAIL.COM",
            "phone": "47 992237299"
        },
        {
            "id": 261,
            "nome": "JOÃO RICARDO DE ALMEIDA FERREIRA",
            "course": "ENGENHARIA AMBIENTAL",
            "type": "ENGENHARIA AMBIENTAL",
            "grr": 20205312,
            "email": "FERREIRA.JOÃORICARDO@YAHOO.COM",
            "phone": "41 987218376"
        },
        {
            "id": 251,
            "nome": "JUANA SHI TING WU",
            "course": "Química",
            "type": "Química",
            "grr": 20186099,
            "email": "JUANA.STW@GMAIL.COM",
            "phone": "41 999265672"
        },
        {
            "id": 119,
            "nome": "JULIA VATGAS NOVACK",
            "course": "ENGENHARIA AMBIENTAL",
            "type": "ENGENHARIA AMBIENTAL",
            "grr": 20202037,
            "email": "VARGAS.NOVACK@GMAIL.COM",
            "phone": "41 997157664"
        },
        {
            "id": 373,
            "nome": "Laura Marina Nunes",
            "course": "Química",
            "type": "Química",
            "grr": 20204128,
            "email": "lauragarabeli@gmail.com",
            "phone": "41 998542141"
        },
        {
            "id": 137,
            "nome": "LEONARDO PERGORARO",
            "course": "Química",
            "type": "Química",
            "grr": 20164636,
            "email": "LEONARDO.PERGORARO.BR@GMAIL.COM",
            "phone": "41 998996275"
        },
        {
            "id": 277,
            "nome": "LUANA BUENO DA SILVA",
            "course": "FARMÁCIA",
            "type": "FARMÁCIA",
            "grr": 20195352,
            "email": "LUANABUENODASILVA@GMAIL.COM",
            "phone": "41 995559652"
        },
        {
            "id": 365,
            "nome": "Lucas Alexandre Werbe Vanzella",
            "course": "Química",
            "type": "Química",
            "grr": 20204152,
            "email": "lucasavanzella@hotmail.com",
            "phone": "41 999822222"
        },
        {
            "id": 265,
            "nome": "LUCAS HENRIQUE PEDREIRA RIBEIRO",
            "course": "Química",
            "type": "Química",
            "grr": 20190719,
            "email": "LUCASPEDREIRA.UFPR@GMAIL.COM",
            "phone": "41 997634830"
        },
        {
            "id": 363,
            "nome": "Luciane Moraes Tenório",
            "course": "Química",
            "type": "Química",
            "grr": 20164672,
            "email": "luciane.tenorio@ufpr.br",
            "phone": "11 999421617"
        },
        {
            "id": 323,
            "nome": "Luiza Knupp de Brito",
            "course": "Química",
            "type": "Química",
            "grr": 20204112,
            "email": "luizakanupp8@hotmail.com",
            "phone": "41 997593549"
        },
        {
            "id": 267,
            "nome": "MARIA EDUARDA SANTANNA DE ABREU",
            "course": "Química",
            "type": "Química",
            "grr": 20190707,
            "email": "MARIAEDUARDAABREU1200@GMAIL.COM",
            "phone": "41 996520178"
        },
        {
            "id": 147,
            "nome": "MATHEUS EMANUEL BORGHATTI QUEIROZ",
            "course": "FARMÁCIA",
            "type": "FARMÁCIA",
            "grr": 20201276,
            "email": "MATH.MONIO@GMAIL.COM",
            "phone": "41 997076659"
        },
        {
            "id": 293,
            "nome": "MATHEUS HENRIQUE MORAIS MENDES",
            "course": "Química",
            "type": "Química",
            "grr": 20175530,
            "email": "MATTHEUS.CURITIBA@GMAIL.COM",
            "phone": "41 987640837"
        },
        {
            "id": 187,
            "nome": "PATRICK ALAN RANGEL",
            "course": "Química",
            "type": "Química",
            "grr": 20206457,
            "email": "CRISPATRICK.PA@GMAIL.COM",
            "phone": "41 995560494"
        },
        {
            "id": 171,
            "nome": "RAFAEL ZAMBONI",
            "course": "Química",
            "type": "Química",
            "grr": 20196370,
            "email": "ZAMBONI.LUIZ.RAFAEL@GMAIL.COM",
            "phone": "41 996475200"
        },
        {
            "id": 359,
            "nome": "Silvio Augusto Burakowski Nekel",
            "course": "Química",
            "type": "Química",
            "grr": 20204140,
            "email": "silvioaugustoburakowski@gmail.com",
            "phone": "41 995324306"
        },
        {
            "id": 321,
            "nome": "VICENTE KALINASKI PARMIGIANI",
            "course": "Química",
            "type": "Química",
            "grr": 20196908,
            "email": "VICENTEPARMIGIANI@GMAIL.COM",
            "phone": "41 992311378"
        },
        {
            "id": 93,
            "nome": "Adriana Duarte Dalla Costa",
            "course": "Química",
            "type": "Química",
            "grr": 20206027,
            "email": "adrianaduartes2elliana@gmail.com",
            "phone": 41996023258
        },
        {
            "id": 53,
            "nome": "Adriano Paiva dos Santos",
            "course": "Química",
            "type": "Química",
            "grr": 20176918,
            "email": "nanopaiva@hotmail.com",
            "phone": 41996751031
        },
        {
            "id": 81,
            "nome": "Alifer Peterson",
            "course": "Química",
            "type": "Química",
            "grr": 20180072,
            "email": "-",
            "phone": 41997278720
        },
        {
            "id": 19,
            "nome": "Amanda Gomes de França Villain",
            "course": "Química",
            "type": "Química",
            "grr": 20193097,
            "email": "amandafrancav@gmail.com",
            "phone": 41991338981
        },
        {
            "id": 129,
            "nome": "Ana Laura da Silva Galvan",
            "course": "Química",
            "type": "Química",
            "grr": 20214125,
            "email": "anagalvan@ufpr.br",
            "phone": 41998854086
        },
        {
            "id": 212,
            "nome": "Ana Luisa Deconto",
            "course": "Química",
            "type": "Química",
            "grr": "",
            "email": "",
            "phone": ""
        },
        {
            "id": 38,
            "nome": "Ana Paula de Oliveira",
            "course": "Química",
            "type": "Química",
            "grr": 20192900,
            "email": "anapauladeoliveira19@gmail.com",
            "phone": 41999284341
        },
        {
            "id": 285,
            "nome": "Ana Paula Horacio",
            "course": "Química",
            "type": "Química",
            "grr": 20190723,
            "email": "anaphoracio@gmail.com",
            "phone": 41999601289
        },
        {
            "id": 143,
            "nome": "ANDRESSA BORBURENA GUEDES",
            "course": "Química",
            "type": "Química",
            "grr": 20150524,
            "email": "ANDRESSABORBURENAGUEDES@GMAIL.COM",
            "phone": "41 987824324"
        },
        {
            "id": 345,
            "nome": "Andressa Fernandes Lemes",
            "course": "Química",
            "type": "Química",
            "grr": 20214112,
            "email": "andressafernandeslemes333@gmail.com",
            "phone": 41995041935
        },
        {
            "id": 11,
            "nome": "Anna Carolina Marques",
            "course": "Química",
            "type": "Química",
            "grr": 20182879,
            "email": "annacarolina395@gmail.com",
            "phone": 41998173906
        },
        {
            "id": 77,
            "nome": "Antônio Chaves Pollin",
            "course": "Engenharia Química",
            "type": "Engenharia Química",
            "grr": 20182330,
            "email": "antonio.chaves@ufpr.br",
            "phone": 43998102122
        },
        {
            "id": 162,
            "nome": "Aram Rosa Palomar",
            "course": "Química",
            "type": "Química",
            "grr": 20182892,
            "email": "aram.palomar@gmail.com",
            "phone": 41987526980
        },
        {
            "id": 243,
            "nome": "Ariane Pasqualin Godoy",
            "course": "Farmácia",
            "type": "Farmácia",
            "grr": 20196205,
            "email": "arianepg2001@gmail.com",
            "phone": 41999810424
        },
        {
            "id": "NI",
            "nome": "ARMÁRIO DA BATATA",
            "course": "---",
            "type": "---",
            "grr": "---",
            "email": "---",
            "phone": "---"
        },
        {
            "id": 72,
            "nome": "Beatriz Reis de Souza Campos",
            "course": "Química",
            "type": "Química",
            "grr": 20204144,
            "email": "beatriz.reis@ufpr.br",
            "phone": 41999272616
        },
        {
            "id": 108,
            "nome": "Beatriz Ribeiro Pirrim",
            "course": "Química",
            "type": "Química",
            "grr": 20190303,
            "email": "beatriz.pirrinm99@gmail.com",
            "phone": 41996209249
        },
        {
            "id": 80,
            "nome": "Beatriz Sachur da Silva",
            "course": "Química",
            "type": "Química",
            "grr": 20214121,
            "email": "beatrizsachur@gmail.com",
            "phone": 41998362397
        },
        {
            "id": 82,
            "nome": "Belle Franco Arruda",
            "course": "Química",
            "type": "Química",
            "grr": 20180230,
            "email": "bellefranco@hotmail.com",
            "phone": 41997916858
        },
        {
            "id": 376,
            "nome": "Bianca Akeni Verri Nikita",
            "course": "Química",
            "type": "Química",
            "grr": "-",
            "email": "bianca.nikita@gmail.com",
            "phone": 44998820761
        },
        {
            "id": 305,
            "nome": "Bruna Criluk de Oliveira",
            "course": "Química",
            "type": "Química",
            "grr": 20190742,
            "email": "criluk.oliveira@hotmail.com",
            "phone": 41998145670
        },
        {
            "id": 114,
            "nome": "BRUNA MARIZA ZAMPIER BILEK",
            "course": "FARMÁCIA",
            "type": "FARMÁCIA",
            "grr": 20201277,
            "email": "BRUNAMZBR@HOTMAIL.COM",
            "phone": "41 999109277"
        },
        {
            "id": 103,
            "nome": "Bruno Ezequiel",
            "course": "Química",
            "type": "Química",
            "grr": 20191366,
            "email": "gremskibruno@gmail.com",
            "phone": 41997817454
        },
        {
            "id": 78,
            "nome": "Bryan Pinto da Silva",
            "course": "Química",
            "type": "Química",
            "grr": 20205068,
            "email": "bryan.p.silva@gmail.com",
            "phone": 41996852074
        },
        {
            "id": 52,
            "nome": "Camila Aparecida Ludwig",
            "course": "Química",
            "type": "Química",
            "grr": 20190721,
            "email": "camisludwig@gmail.com",
            "phone": 41996046794
        },
        {
            "id": 111,
            "nome": "Camilla Krupa Boaron",
            "course": "Química",
            "type": "Química",
            "grr": 20190749,
            "email": "camillaboaron08@gmail.com",
            "phone": 41999907984
        },
        {
            "id": 35,
            "nome": "Camilla Rocha Lima",
            "course": "Química",
            "type": "Química",
            "grr": 20175312,
            "email": "camillarochalima07@gmail.com",
            "phone": 41998260144
        },
        {
            "id": 134,
            "nome": "Carolyna de Mendonça Albano",
            "course": "Engenharia Química",
            "type": "Engenharia Química",
            "grr": 20215684,
            "email": "carolalbino@gmail.com",
            "phone": 41987888880
        },
        {
            "id": 13,
            "nome": "Celeste Miyuki Nagase Ikeda",
            "course": "Farmácia",
            "type": "Farmácia",
            "grr": 20195361,
            "email": "celesteikeda195@gmail.com",
            "phone": 92999945468
        },
        {
            "id": 203,
            "nome": "COVID",
            "course": "",
            "type": "",
            "grr": "",
            "email": "",
            "phone": ""
        },
        {
            "id": 211,
            "nome": "Daniel Kramer Chaves",
            "course": "Química",
            "type": "Química",
            "grr": 20175265,
            "email": "danielkchaves@gmail.com",
            "phone": 41997860095
        },
        {
            "id": 51,
            "nome": "Eduarda Rubin",
            "course": "Química",
            "type": "Química",
            "grr": 20206462,
            "email": "dudarubi2011@gmail.com",
            "phone": 49988085410
        },
        {
            "id": 229,
            "nome": "Eduardo Cordeiro",
            "course": "Química",
            "type": "Química",
            "grr": 20195561,
            "email": "eduardocordeirozero@gmail.com",
            "phone": 41999202047
        },
        {
            "id": 153,
            "nome": "Emanuelly Orbeli de Oliveira",
            "course": "Química",
            "type": "Química",
            "grr": 20214139,
            "email": "orbeli@ufpr.br",
            "phone": 41998382464
        },
        {
            "id": 87,
            "nome": "Fernando Fernandes Figueiredo",
            "course": "Química",
            "type": "Química",
            "grr": 20204106,
            "email": "fernandoff@gmail.com",
            "phone": 45999972539
        },
        {
            "id": 120,
            "nome": "Gabriela Koialainski Barbosa",
            "course": "Química",
            "type": "Química",
            "grr": 20204120,
            "email": "gabikb18@hotmail.com",
            "phone": 41992479147
        },
        {
            "id": 25,
            "nome": "Gabriella Aparecida Borim",
            "course": "Química",
            "type": "Química",
            "grr": 20214122,
            "email": "gabriella.borim@ufpr.br",
            "phone": 41998442523
        },
        {
            "id": 256,
            "nome": "Giovana Sampar do Espírito Santo",
            "course": "Química",
            "type": "Química",
            "grr": 20206463,
            "email": "gsampar@gmail.com",
            "phone": 41998588523
        },
        {
            "id": 104,
            "nome": "Giovanna Bahr Wolff",
            "course": "Química",
            "type": "Química",
            "grr": 20190734,
            "email": "giovannabwolff@gmail.com",
            "phone": 42991392378
        },
        {
            "id": 74,
            "nome": "Giovanna Nunes Carneiro",
            "course": "Química",
            "type": "Química",
            "grr": 20206451,
            "email": "giovannanunes1704@hotmail.com",
            "phone": 41991646510
        },
        {
            "id": 27,
            "nome": "Giovanni Vieira dos Santos",
            "course": "Química",
            "type": "Química",
            "grr": 20206467,
            "email": "giovanni.vieira.91@gmail.com",
            "phone": 41998842383
        },
        {
            "id": 259,
            "nome": "Guilherme Adrião Lomba",
            "course": "Engenharia Química",
            "type": "Engenharia Química",
            "grr": 20202449,
            "email": "guiadriao@hotmail.com",
            "phone": 13997611946
        },
        {
            "id": 58,
            "nome": "Guilherme Augusto Schenberger Manso",
            "course": "Química",
            "type": "Química",
            "grr": 20182868,
            "email": "manfioguilherme@gmail.com",
            "phone": 41999555859
        },
        {
            "id": 62,
            "nome": "Heloísa Negoseki Fagundes de Moura",
            "course": "Engenharía Química",
            "type": "Engenharía Química",
            "grr": 20196676,
            "email": "helomouraCPM@gmail.com",
            "phone": 41997518344
        },
        {
            "id": 139,
            "nome": "HELOIZA BEATRIZ PAULO",
            "course": "FARMÁCIA",
            "type": "FARMÁCIA",
            "grr": 20203320,
            "email": "HELOISA.ANADETO@HOTMAIL.COM",
            "phone": "41 995838742"
        },
        {
            "id": 130,
            "nome": "Henrique Massahiro Youshimoto",
            "course": "Farmácia",
            "type": "Farmácia",
            "grr": 20204837,
            "email": "hmassariro3730@gmail.com",
            "phone": 44997717766
        },
        {
            "id": 95,
            "nome": "Hevelin Mayumy Garcia Oda Kondo",
            "course": "Química",
            "type": "Química",
            "grr": 20190761,
            "email": "hevelynkondo99@gmail.com",
            "phone": 43996374144
        },
        {
            "id": 152,
            "nome": "IASMIN MORO",
            "course": "Química",
            "type": "Química",
            "grr": 20190718,
            "email": "IASMINGMORO@GMAIL.COM",
            "phone": "41 992555626"
        },
        {
            "id": 287,
            "nome": "Ingrid Kaori Shirashe Kaletka",
            "course": "Engenharia Ambiental",
            "type": "Engenharia Ambiental",
            "grr": 20162932,
            "email": "ingridkaletka@gmail.com",
            "phone": 41988887410
        },
        {
            "id": 164,
            "nome": "Isabela Caretti",
            "course": "Farmácia",
            "type": "Farmácia",
            "grr": 20206297,
            "email": "isabelacarretti@gmail.com",
            "phone": 13997058897
        },
        {
            "id": 24,
            "nome": "Isis L Vicente",
            "course": "Química",
            "type": "Química",
            "grr": 20206460,
            "email": "vicenteisis19@outlook.com",
            "phone": 419843899812
        },
        {
            "id": 329,
            "nome": "Izabel Cristina de Souza",
            "course": "Química",
            "type": "Química",
            "grr": 20164607,
            "email": "izabelsouza1998@gmail.com",
            "phone": 41996224314
        },
        {
            "id": 252,
            "nome": "JAMILI DELLA LIBERA BRUM",
            "course": "Química",
            "type": "Química",
            "grr": 20204159,
            "email": "JAMILI-2709@HOTMAIL.COM.BR",
            "phone": "41 997535710"
        },
        {
            "id": 368,
            "nome": "João Victor Gonçalves",
            "course": "Química",
            "type": "Química",
            "grr": 20204146,
            "email": "joao.victorzg06@gmail.com",
            "phone": "41 988653846"
        },
        {
            "id": 76,
            "nome": "Johenn Hatzemberger",
            "course": "Engenharia Química",
            "type": "Engenharia Química",
            "grr": 20206292,
            "email": "hotzemberger@hotmail.com",
            "phone": 41991411941
        },
        {
            "id": 71,
            "nome": "Juan Alexander Koch Schimerski",
            "course": "Química",
            "type": "Química",
            "grr": 20187193,
            "email": "juan_koch2011@hotmail.com",
            "phone": 41992435996
        },
        {
            "id": 254,
            "nome": "JÚLIA DO CARMO SANTOS DE FREITAS",
            "course": "Química",
            "type": "Química",
            "grr": 20204110,
            "email": "JULIAFREITAS@UFPR.BR",
            "phone": "71 991623414"
        },
        {
            "id": 372,
            "nome": "Khawanny Nathaly Chargas de Souza",
            "course": "Química",
            "type": "Química",
            "grr": 20196372,
            "email": "khawannynathaly@outlook.com",
            "phone": 41987566159
        },
        {
            "id": 273,
            "nome": "Larissa Bulek S. de Oliveira",
            "course": "Química",
            "type": "Química",
            "grr": 20175257,
            "email": "larissa.bulek@gmail.com",
            "phone": 41987024808
        },
        {
            "id": 122,
            "nome": "Laura Helena S. Borges",
            "course": "Farmácia",
            "type": "Farmácia",
            "grr": 20204851,
            "email": "laurahsb22@gmail.com",
            "phone": 41987033801
        },
        {
            "id": 89,
            "nome": "Luan Zesgotko Cristovão da Silva",
            "course": "Química",
            "type": "Química",
            "grr": 20182949,
            "email": "luanzeszgotko@gmail.com",
            "phone": 41995052945
        },
        {
            "id": 12,
            "nome": "Luana de Oliveira Souza",
            "course": "Química",
            "type": "Química",
            "grr": 20206024,
            "email": "luanasouza06@gmail.com",
            "phone": 41995503567
        },
        {
            "id": 85,
            "nome": "Lucas de Quadros Mora",
            "course": "Química",
            "type": "Química",
            "grr": 20183530,
            "email": "lcs.moraa@gmail.com",
            "phone": 41997801043
        },
        {
            "id": 43,
            "nome": "Marcos Vinícius Martins",
            "course": "Química",
            "type": "Química",
            "grr": 20190717,
            "email": "marcosmartinsofc@gmail.com",
            "phone": 43984361780
        },
        {
            "id": 105,
            "nome": "Maria Aparecida Nascimento Sobreira",
            "course": "Farmácia",
            "type": "Farmácia",
            "grr": 20213052,
            "email": "mameliasobreira@gmail.com",
            "phone": 41992555975
        },
        {
            "id": 289,
            "nome": "MARIA EDAURDA C. VIEIRA",
            "course": "Química",
            "type": "Química",
            "grr": 20190767,
            "email": "CAVALIVIEIRA@GMAIL.COM",
            "phone": "41 998398639"
        },
        {
            "id": 349,
            "nome": "Maria Eduarda Bebato Pilllanda",
            "course": "Farmácia",
            "type": "Farmácia",
            "grr": 20201286,
            "email": "mariaeduardabebato@gmail.com",
            "phone": 41987110472
        },
        {
            "id": 325,
            "nome": "Mariana Helena Nazareno",
            "course": "Química",
            "type": "Química",
            "grr": 20190743,
            "email": "nmarianahelena@gmail.com",
            "phone": "4188735685‬"
        },
        {
            "id": 40,
            "nome": "Maurício de Lima",
            "course": "Química",
            "type": "Química",
            "grr": 20204134,
            "email": "maurilima2002@gmail.com",
            "phone": 41992814169
        },
        {
            "id": 94,
            "nome": "Mayara de O. Santos",
            "course": "Química",
            "type": "Química",
            "grr": 20206458,
            "email": "maya.santos@hotmail.com",
            "phone": 41996052727
        },
        {
            "id": 127,
            "nome": "MAYCON V. MANINI",
            "course": "Química",
            "type": "Química",
            "grr": 20192922,
            "email": "MAYCON.MANINI@YAHOO.COM",
            "phone": "41 9 97972341"
        },
        {
            "id": 239,
            "nome": "Milena Leithold",
            "course": "Farmácia",
            "type": "Farmácia",
            "grr": 20204850,
            "email": "milenaleithold@ufpr.br",
            "phone": 47992352215
        },
        {
            "id": 112,
            "nome": "MILENA LUIZA DA SILVA",
            "course": "FARMÁCIA",
            "type": "FARMÁCIA",
            "grr": 20201293,
            "email": "MILEZALUIZA2002@GMAIL.COM",
            "phone": "41 987207777"
        },
        {
            "id": 39,
            "nome": "Milena Mayer Wisniewski",
            "course": "Química",
            "type": "Química",
            "grr": 20190727,
            "email": "milenamayer25@gmail.com",
            "phone": 41988461928
        },
        {
            "id": 144,
            "nome": "Milton Matias Júnior",
            "course": "Química",
            "type": "Química",
            "grr": 20205135,
            "email": "miltonmatiasj@gmail.com",
            "phone": 41996101204
        },
        {
            "id": 96,
            "nome": "Natally R. Duarte",
            "course": "Química",
            "type": "Química",
            "grr": 20196916,
            "email": "nanarossi03@gmail.com",
            "phone": 41987719667
        },
        {
            "id": 100,
            "nome": "Nathália de Sales Ovçar",
            "course": "Farmácia",
            "type": "Farmácia",
            "grr": 20201295,
            "email": "nathiovcar@gmail.com",
            "phone": 41996020388
        },
        {
            "id": 135,
            "nome": "Nícolas dos Santos Lamorte",
            "course": "Química",
            "type": "Química",
            "grr": 20214144,
            "email": "nicolas.lamorte@ufpr.br",
            "phone": 41998425101
        },
        {
            "id": 49,
            "nome": "Otávio Augusto Woioekowski Cozanos",
            "course": "Engenharia Elétrica",
            "type": "Engenharia Elétrica",
            "grr": 20202591,
            "email": "otaviowoiciekoski@ufpr.br",
            "phone": 41999048314
        },
        {
            "id": 88,
            "nome": "Paula Criswall Mendonça Gomes",
            "course": "Biomedicina",
            "type": "Biomedicina",
            "grr": 20210594,
            "email": "paulacriswall@gmail.com",
            "phone": 51987519403
        },
        {
            "id": 21,
            "nome": "Pedro Henrique Guedes",
            "course": "Química",
            "type": "Química",
            "grr": 20195588,
            "email": "pedro.henrique2309@gmail.com",
            "phone": 41984709729
        },
        {
            "id": 364,
            "nome": "Pedro Henrique Mahado",
            "course": "Química",
            "type": "Química",
            "grr": 20211404,
            "email": "pedromachado1@ufpr.br",
            "phone": 41997784295
        },
        {
            "id": 219,
            "nome": "Rafael Monteiro",
            "course": "Pós Graduação em Química",
            "type": "Pós Graduação em Química",
            "grr": "Pós",
            "email": "rfiarssonmonteiro@gmail.com",
            "phone": 41996688463
        },
        {
            "id": 155,
            "nome": "RAFAEL VIEIRA",
            "course": "FARMÁCIA",
            "type": "FARMÁCIA",
            "grr": 20193250,
            "email": "RVIEIRA2012.RV@GMAIL.COM",
            "phone": "41 996525392"
        },
        {
            "id": 20,
            "nome": "Renata Gregorio Fucci",
            "course": "Química",
            "type": "Química",
            "grr": 20190736,
            "email": "renata_fucci@hotmail.com",
            "phone": 43998276806
        },
        {
            "id": 275,
            "nome": "ROXELIANN DESREY GONZALEZ ZAMORA",
            "course": "FARMÁCIA",
            "type": "FARMÁCIA",
            "grr": 20195427,
            "email": "RROOXXYYGG@GMAIL.COM",
            "phone": "12 992276959"
        },
        {
            "id": 356,
            "nome": "Rubens Beckert Filho",
            "course": "Química",
            "type": "Química",
            "grr": 20196379,
            "email": "lanterna@moderna@hotmail.com",
            "phone": "41 996015585"
        },
        {
            "id": 279,
            "nome": "Thais Piecharski",
            "course": "Farmácia",
            "type": "Farmácia",
            "grr": 20201373,
            "email": "tpieckarski@gmail.com",
            "phone": 41992091969
        },
        {
            "id": 116,
            "nome": "THAIS TREVISAN WIPPEL",
            "course": "FARMÁCIA",
            "type": "FARMÁCIA",
            "grr": 20196684,
            "email": "THAISTREVISANWIPPEL@GMAIL.COM",
            "phone": "41 9984819932"
        },
        {
            "id": 73,
            "nome": "Thiago Henrique Dias Costa",
            "course": "Farmácia",
            "type": "Farmácia",
            "grr": 20193203,
            "email": "thi.costa01@gmail.com",
            "phone": 41995072836
        },
        {
            "id": 102,
            "nome": "Veronica Wosmiaki Ferreira",
            "course": "Química",
            "type": "Química",
            "grr": 20197434,
            "email": "veronicawosmiaki@gmail.com",
            "phone": 41997793243
        },
        {
            "id": 245,
            "nome": "Vitória Augusto Moreira Andrion Juh",
            "course": "Farmácia",
            "type": "Farmácia",
            "grr": 20201911,
            "email": "vitoriaa.juk@gmail.com",
            "phone": 41997771086
        }
    ];

    for (var i = 0; i < users.length; i++) {
        var usuario = users[i];

        db.collection("users")
            .doc(usuario.id.toString())
            .set(usuario, {
                merge: true
            }).then(function () {
                console.log("Document successfully written!");
            }).catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }

    for (var i = 0; i < armarios.length; i++) {
        var armario = armarios[i];

        if (armario.date == "") {
            armario.date = "01/01/2000";
        }

        let date = armario.date;
        date = date.split("/");
        armario.date = new Date(date[2], date[1] - 1, date[0]);

        armario.dono = db.collection('users').doc(armario.dono);

        db.collection("armarios")
            .doc(armario.number.toString())
            .set(armario, {
                merge: true
            }).then(function () {
                console.log("Document successfully written!");
            }).catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }
}