
const _ = require("underscore")

let betObjectData = 
[
    {
      "number": [
        1
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 1,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        2
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 2,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1,
        2,
        3
      ],
      "type": "3_number",
      "bet": 100,
      "betIndex": 133,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        6
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 6,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        9
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 9,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        5
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 5,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        8
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 8,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        14
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 14,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        13
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 13,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        16
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 16,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        20
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 20,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        21
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 21,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        24
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 24,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        27
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 27,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        26
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 26,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        25
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 25,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        33
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 33,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        36
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 36,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        35
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 35,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        28,
        31
      ],
      "type": "2_number",
      "bet": 100,
      "betIndex": 83,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 1,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        2
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 2,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1,
        2,
        3
      ],
      "type": "3_number",
      "bet": 100,
      "betIndex": 133,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        6
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 6,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        9
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 9,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        5
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 5,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        8
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 8,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        14
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 14,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        13
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 13,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        16
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 16,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        20
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 20,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        21
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 21,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        24
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 24,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        27
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 27,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        26
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 26,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        25
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 25,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        33
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 33,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        36
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 36,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        35
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 35,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        28,
        31
      ],
      "type": "2_number",
      "bet": 100,
      "betIndex": 83,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 1,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        2
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 2,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1,
        2,
        3
      ],
      "type": "3_number",
      "bet": 100,
      "betIndex": 133,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        6
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 6,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        9
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 9,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        5
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 5,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        8
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 8,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        14
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 14,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        13
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 13,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        16
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 16,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        20
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 20,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        21
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 21,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        24
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 24,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        27
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 27,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        26
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 26,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        25
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 25,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        33
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 33,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        36
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 36,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        35
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 35,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        28,
        31
      ],
      "type": "2_number",
      "bet": 100,
      "betIndex": 83,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36
      ],
      "type": "19to36",
      "bet": 3000,
      "betIndex": 44,
      "coin": "",
      "isOutSideBet": true
    },
    {
      "number": [
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36
      ],
      "type": "19to36",
      "bet": 3000,
      "betIndex": 44,
      "coin": "",
      "isOutSideBet": true
    },
    {
      "number": [
        1
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 1,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        2
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 2,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1,
        2,
        3
      ],
      "type": "3_number",
      "bet": 100,
      "betIndex": 133,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        6
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 6,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        9
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 9,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        5
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 5,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        8
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 8,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        14
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 14,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        13
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 13,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        16
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 16,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        20
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 20,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        21
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 21,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        24
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 24,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        27
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 27,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        26
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 26,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        25
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 25,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        33
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 33,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        36
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 36,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        35
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 35,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        28,
        31
      ],
      "type": "2_number",
      "bet": 100,
      "betIndex": 83,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 1,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        2
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 2,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1,
        2,
        3
      ],
      "type": "3_number",
      "bet": 100,
      "betIndex": 133,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        6
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 6,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        9
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 9,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        5
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 5,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        8
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 8,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        14
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 14,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        13
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 13,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        16
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 16,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        20
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 20,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        21
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 21,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        24
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 24,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        27
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 27,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        26
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 26,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        25
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 25,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        33
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 33,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        36
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 36,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        35
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 35,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        28,
        31
      ],
      "type": "2_number",
      "bet": 100,
      "betIndex": 83,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 1,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        2
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 2,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1,
        2,
        3
      ],
      "type": "3_number",
      "bet": 100,
      "betIndex": 133,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        6
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 6,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        9
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 9,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        5
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 5,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        8
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 8,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        14
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 14,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        13
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 13,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        16
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 16,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        20
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 20,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        21
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 21,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        24
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 24,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        27
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 27,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        26
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 26,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        25
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 25,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        33
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 33,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        36
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 36,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        35
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 35,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        28,
        31
      ],
      "type": "2_number",
      "bet": 100,
      "betIndex": 83,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36
      ],
      "type": "19to36",
      "bet": 3000,
      "betIndex": 44,
      "coin": "",
      "isOutSideBet": true
    },
    {
      "number": [
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36
      ],
      "type": "19to36",
      "bet": 3000,
      "betIndex": 44,
      "coin": "",
      "isOutSideBet": true
    },
    {
      "number": [
        12
      ],
      "type": "number",
      "bet": 500,
      "betIndex": 12,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 1,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        2
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 2,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1,
        2,
        3
      ],
      "type": "3_number",
      "bet": 100,
      "betIndex": 133,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        6
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 6,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        9
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 9,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        5
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 5,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        8
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 8,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        14
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 14,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        13
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 13,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        16
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 16,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        20
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 20,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        21
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 21,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        24
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 24,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        27
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 27,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        26
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 26,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        25
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 25,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        33
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 33,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        36
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 36,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        35
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 35,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        28,
        31
      ],
      "type": "2_number",
      "bet": 100,
      "betIndex": 83,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 1,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        2
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 2,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1,
        2,
        3
      ],
      "type": "3_number",
      "bet": 100,
      "betIndex": 133,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        6
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 6,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        9
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 9,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        5
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 5,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        8
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 8,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        14
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 14,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        13
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 13,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        16
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 16,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        20
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 20,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        21
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 21,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        24
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 24,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        27
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 27,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        26
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 26,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        25
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 25,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        33
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 33,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        36
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 36,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        35
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 35,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        28,
        31
      ],
      "type": "2_number",
      "bet": 100,
      "betIndex": 83,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 1,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        2
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 2,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1,
        2,
        3
      ],
      "type": "3_number",
      "bet": 100,
      "betIndex": 133,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        6
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 6,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        9
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 9,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        5
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 5,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        8
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 8,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        14
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 14,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        13
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 13,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        16
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 16,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        20
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 20,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        21
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 21,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        24
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 24,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        27
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 27,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        26
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 26,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        25
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 25,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        33
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 33,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        36
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 36,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        35
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 35,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        28,
        31
      ],
      "type": "2_number",
      "bet": 100,
      "betIndex": 83,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36
      ],
      "type": "19to36",
      "bet": 3000,
      "betIndex": 44,
      "coin": "",
      "isOutSideBet": true
    },
    {
      "number": [
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36
      ],
      "type": "19to36",
      "bet": 3000,
      "betIndex": 44,
      "coin": "",
      "isOutSideBet": true
    },
    {
      "number": [
        1
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 1,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        2
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 2,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1,
        2,
        3
      ],
      "type": "3_number",
      "bet": 100,
      "betIndex": 133,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        6
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 6,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        9
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 9,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        5
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 5,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        8
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 8,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        14
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 14,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        13
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 13,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        16
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 16,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        20
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 20,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        21
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 21,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        24
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 24,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        27
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 27,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        26
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 26,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        25
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 25,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        33
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 33,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        36
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 36,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        35
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 35,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        28,
        31
      ],
      "type": "2_number",
      "bet": 100,
      "betIndex": 83,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 1,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        2
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 2,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1,
        2,
        3
      ],
      "type": "3_number",
      "bet": 100,
      "betIndex": 133,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        6
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 6,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        9
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 9,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        5
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 5,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        8
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 8,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        14
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 14,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        13
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 13,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        16
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 16,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        20
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 20,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        21
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 21,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        24
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 24,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        27
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 27,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        26
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 26,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        25
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 25,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        33
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 33,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        36
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 36,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        35
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 35,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        28,
        31
      ],
      "type": "2_number",
      "bet": 100,
      "betIndex": 83,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 1,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        2
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 2,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        1,
        2,
        3
      ],
      "type": "3_number",
      "bet": 100,
      "betIndex": 133,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        6
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 6,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        9
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 9,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        5
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 5,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        8
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 8,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        14
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 14,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        13
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 13,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        16
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 16,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        20
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 20,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        21
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 21,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        24
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 24,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        27
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 27,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        26
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 26,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        25
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 25,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        33
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 33,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        36
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 36,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        35
      ],
      "type": "number",
      "bet": 100,
      "betIndex": 35,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        28,
        31
      ],
      "type": "2_number",
      "bet": 100,
      "betIndex": 83,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36
      ],
      "type": "19to36",
      "bet": 3000,
      "betIndex": 44,
      "coin": "",
      "isOutSideBet": true
    },
    {
      "number": [
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36
      ],
      "type": "19to36",
      "bet": 3000,
      "betIndex": 44,
      "coin": "",
      "isOutSideBet": true
    },
    {
      "number": [
        12
      ],
      "type": "number",
      "bet": 500,
      "betIndex": 12,
      "coin": "",
      "isOutSideBet": false
    },
    {
      "number": [
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36
      ],
      "type": "19to36",
      "bet": 1000,
      "betIndex": 44,
      "coin": "[1000]",
      "isOutSideBet": true
    }
  ],

itemIndex = 20
winnerData = [];
TotalWinAmount = 0
for (let i = 0; i < betObjectData.length; i++) {
    if (betObjectData[i].bet != undefined) {

        console.log("betObjectData[i] ", betObjectData[i])

        if (betObjectData[i].type == "number" && betObjectData[i].number.indexOf(itemIndex) != -1) {
            winnerData.push({
                uid: "tbInfo.playerInfo[x]._id",
                seatIndex: 0,
                winAmount: betObjectData[i].bet * 35,
            })

            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 35;
        }

        if (betObjectData[i].type == "1to34" && betObjectData[i].number.indexOf(itemIndex) != -1) {
            winnerData.push({
                uid: "tbInfo.playerInfo[x]._id",
                seatIndex: 0,
                winAmount: betObjectData[i].bet * 3,
            })

            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 3;
        }

        if (betObjectData[i].type == "2to35" && betObjectData[i].number.indexOf(itemIndex) != -1) {
            winnerData.push({
                uid: "tbInfo.playerInfo[x]._id",
                seatIndex: 0,
                winAmount: betObjectData[i].bet * 3,
            })

            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 3;
        }


        if (betObjectData[i].type == "3to36" && betObjectData[i].number.indexOf(itemIndex) != -1) {
            winnerData.push({
                uid: "tbInfo.playerInfo[x]._id",
                seatIndex: 0,
                winAmount: betObjectData[i].bet * 3,
            })

            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 3;
        }

        if (betObjectData[i].type == "1st12" && betObjectData[i].number.indexOf(itemIndex) != -1) {
            winnerData.push({
                uid: "tbInfo.playerInfo[x]._id",
                seatIndex: 0,
                winAmount: betObjectData[i].bet * 3,
            })

            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 3;
        }

        if (betObjectData[i].type == "2nd12" && betObjectData[i].number.indexOf(itemIndex) != -1) {
            winnerData.push({
                uid: "tbInfo.playerInfo[x]._id",
                seatIndex: 0,
                winAmount: betObjectData[i].bet * 3,
            })

            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 3;
        }

        if (betObjectData[i].type == "3rd12" && betObjectData[i].number.indexOf(itemIndex) != -1) {
            winnerData.push({
                uid: "tbInfo.playerInfo[x]._id",
                seatIndex: 0,
                winAmount: betObjectData[i].bet * 3,
            })

            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 3;
        }

        if (betObjectData[i].type == "1to18" && betObjectData[i].number.indexOf(itemIndex) != -1) {
            winnerData.push({
                uid: "tbInfo.playerInfo[x]._id",
                seatIndex: 0,
                winAmount: betObjectData[i].bet * 2,
            })

            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 2;
        }


        if (betObjectData[i].type == "19to36" && betObjectData[i].number.indexOf(itemIndex) != -1) {
            winnerData.push({
                uid: "tbInfo.playerInfo[x]._id",
                seatIndex: 0,
                winAmount: betObjectData[i].bet * 2,
            })

            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 2;
        }

        if (betObjectData[i].type == "odd" && betObjectData[i].number.indexOf(itemIndex) != -1) {
            winnerData.push({
                uid: "tbInfo.playerInfo[x]._id",
                seatIndex: 0,
                winAmount: betObjectData[i].bet * 2,
            })

            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 2;
        }

        if (betObjectData[i].type == "even" && betObjectData[i].number.indexOf(itemIndex) != -1) {
            winnerData.push({
                uid: "tbInfo.playerInfo[x]._id",
                seatIndex: 0,
                winAmount: betObjectData[i].bet * 2,
            })

            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 2;
        }


        if (betObjectData[i].type == "red" && betObjectData[i].number.indexOf(itemIndex) != -1) {
            winnerData.push({
                uid: "tbInfo.playerInfo[x]._id",
                seatIndex: 0,
                winAmount: betObjectData[i].bet * 2,
            })

            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 2;
        }

        if (betObjectData[i].type == "black" && betObjectData[i].number.indexOf(itemIndex) != -1) {
            winnerData.push({
                uid: "tbInfo.playerInfo[x]._id",
                seatIndex: 0,
                winAmount: betObjectData[i].bet * 2,
            })

            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 2;
        }


        if (betObjectData[i].type == "2_number" && betObjectData[i].number.indexOf(itemIndex) != -1) {
            winnerData.push({
                uid: "tbInfo.playerInfo[x]._id",
                seatIndex: 0,
                winAmount: betObjectData[i].bet * 17.5,
            })

            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 17.5;
        }


        if (betObjectData[i].type == "3_number" && betObjectData[i].number.indexOf(itemIndex) != -1) {
            winnerData.push({
                uid: "tbInfo.playerInfo[x]._id",
                seatIndex: 0,
                winAmount: betObjectData[i].bet * 11.66,
            })

            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 11.66;
        }

        if (betObjectData[i].type == "4_number" && betObjectData[i].number.indexOf(itemIndex) != -1) {
            winnerData.push({
                uid: "tbInfo.playerInfo[x]._id",
                seatIndex: 0,
                winAmount: betObjectData[i].bet * 8.75,
            })

            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 8.75;
        }


        if (betObjectData[i].type == "6_number" && betObjectData[i].number.indexOf(itemIndex) != -1) {
            winnerData.push({
                uid: "tbInfo.playerInfo[x]._id",
                seatIndex: 0,
                winAmount: betObjectData[i].bet * 5.83,
            })

            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 5.83;
        }


    }


}
console.log("TotalWinAmount ", TotalWinAmount)

console.log("winnerData ",winnerData)

return false 


requestData ={
    betData:
    [
    { number: '[24]', type: 'number', bet: 2, betIndex: 24, coin: '[2]' },
    { number: '[23]', type: 'number', bet: 2, betIndex: 23, coin: '[2]' },
    { number: '[26]', type: 'number', bet: 2, betIndex: 26, coin: '[2]' }
  ]
}

  let currentBet =  requestData.betData.reduce((accumulator, currentValue) => {
    console.log("accumulator.bet ",accumulator)
    console.log("currentValue.bet ",currentValue)

    return accumulator + currentValue.bet
}, 0);

console.log("currentBet ",currentBet)

return false
function RobotAction(table,card){
    const playerInfo = table.playerInfo[table.turnSeatIndex]

    let totalPlayer =  getPlayingUserInRound(table.playerInfo)  

    let robotCardValue = valueOfCard([ 'C-3-0', 'D-4-0', 'C-11-0' ])

    function GetRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //robotCardValue 
    // 5 4 3 2 1
    if(potlimit/2 <= potValue && GetRandomInt(0,1) && playStatus == "blind"){
        // Card Seen 
    }


    if(playerInfo.playerStatus == "chal"){
        //chal Valu Funcation call
        
        //1. check potlimit over ho gaya tha ke nahi
        if(table.chalLimit > table.chalValue*2){
            if(robotCardValue == 5 || robotCardValue == 4 || robotCardValue == 3 ){
                // double chalValue value and Chal
                //Chal chalValue 
            }else if(robotCardValue == 2 || robotCardValue == 1){
                //Chal chalValue Normal
                if(totalPlayer == 2){
                    //Check Pot Limit or turn Number 
                    // Show karna he ya chal 

                }else{
                    // Chal Ya Pack 
                    //check Pot Limit or turn Number 
                }

            }else {
                //Normal Card 
                // Pack Or Chal or Show 
                if(totalPlayer == 2){
                    //Check Pot Limit or turn Number 
                    // Show karna he ya chal 

                }else{
                    // Chal Ya Pack 
                    //check Pot Limit or turn Number 
                }
            }
        }else {
            if(robotCardValue == 5 || robotCardValue == 4 || robotCardValue == 3 || robotCardValue == 2 || robotCardValue == 1 ){
                // Cahal 
            }else{
                // Normal Card 
                // Pack Or Chal or Show 
                if(totalPlayer == 2){
                    //Check Pot Limit or turn Number 
                    // Show karna he ya chal 

                }else{
                    // Chal Ya Pack 
                    //check Pot Limit or turn Number 
                }
            }
        }

    }else if(playerInfo.playerStatus == "blind"){
        //Blind Valu Funcation call
        //1. check potlimit over ho gaya tha ke nahi
        if(table.chalLimit > table.chalValue*2){
            if(robotCardValue == 5 || robotCardValue == 4 || robotCardValue == 3 ){
                // double chalValue  value and Chal
                //Blind chalValue 
            }else if(robotCardValue == 2 || robotCardValue == 1){
                //Blind chalValue Normal
                if(totalPlayer == 2){
                    //Check Pot Limit or turn Number 
                    // Show karna he ya chal 

                }else{
                    // Chal Ya Pack 
                    //check Pot Limit or turn Number 
                }
            }
        }else {
            if(robotCardValue == 5 || robotCardValue == 4 || robotCardValue == 3 || robotCardValue == 2 || robotCardValue == 1 ){
                // Cahal 
            }else{
                //Nomral Card 
                // Pack Or Chal or Show 
            }
        }

    }
    
}
console.log("valueOfCard ",valueOfCard([ 'C-3-0', 'D-4-0', 'C-11-0' ]))

function valueOfCard(card){

    let cardsDiff =  DiffColor(card)
    console.log("cardsDiff ",cardsDiff)
    if(PureRonForCheck(cardsDiff)){
        return 5
    }else if(TeenForCheck(cardsDiff) ){
        return 4
    }else if(RonForCheck(cardsDiff)){
        return 3
    }else if(ColorCardCheck(cardsDiff)){
        return 2
    }else if(PairForCheck(cardsDiff)){
        return 1
    }
    return 0;
}


function DiffColor  (card) {
    let obj = {
        cards: [],
        color: []
    };
    for (let i in card) {
        if (card[i] != null) {
            let d = card[i].split('-');
            obj.cards.push(parseInt(d[1]));
            obj.color.push(d[0]);
        }
    }
    return obj;
}

function TeenForCheck  (a) {
    let flag = true;

    let point = _.filter(a.cards, function (num) { return num != 0; });
    let count = 0;

    for (let x in a.color) {

        if (a.color[x] == a.color[0]) {
            count++;
        }
    }

    if (count >= 2) {
        return false
    }

    if (point.length == 1) {
        return flag;
    }

    for (let x in point) {
        if (point[x] != point[0]) {
            flag = false;
            break;
        }
    }

    return flag;
}


function PureRonForCheck (a) {

    let flag = true;

    a.cards.sort(function (e, f) {
        return e - f
    });


    if (a.cards[0] == 1) {
        if ((a.cards.indexOf(12) || a.cards.indexOf(13)) && !a.cards.indexOf(2)) {
            removedCard = a.cards.splice(0, 1);
            a.cards.push(removedCard[0]);
        }
    }


    if (flag == true) {
        for (let x in a.color) {
            if (a.color[x] != a.color[0]) {
                flag = false;
                break;
            }
        }
    }

    if (flag == true) {
        for (let i = 1; i < a.cards.length; i++) {

            if (a.cards[i] - a.cards[i - 1] == 1 || a.cards[i] - a.cards[i - 1] == -12) {


                flag = true;
            } else {
                flag = false;
                break;
            }
        }
    }
    return flag;

}


function RonForCheck (a) {

    let flag = true;

    a.cards.sort(function (e, f) {
        return e - f
    });


    if (a.cards[0] == 1) {
        if ((a.cards.indexOf(12) || a.cards.indexOf(13)) && !a.cards.indexOf(2)) {
            removedCard = a.cards.splice(0, 1);
            a.cards.push(removedCard[0]);
        }
    }


    // if (flag == true) {
    //     for (let x in a.color) {
    //         if (a.color[x] != a.color[0]) {
    //             flag = false;
    //             break;
    //         }
    //     }
    // }

    if (flag == true) {
        for (let i = 1; i < a.cards.length; i++) {

            if (a.cards[i] - a.cards[i - 1] == 1 || a.cards[i] - a.cards[i - 1] == -12) {


                flag = true;
            } else {
                flag = false;
                break;
            }
        }
    }
    return flag;

}


function ColorCardCheck  (a) {
    let flag = true;
    //let point = _.filter(a.cards, function (num) { return num != 0; });
    let count = 0;

    for (let x in a.color) {

        if (a.color[x] == a.color[0]) {
            count++;
        }
    }

    if (count <= 2) {
        return false
    }
  
    return flag;
}

function PairForCheck  (a) {
    let flag = true;

    let point = _.filter(a.cards, function (num) { return num != 0; });

    console.log("Point ",point)
    let count = 0

    for (let x in point) {

        if (point[x] == point[0]) {
            count++
        }
    }
    console.log("count ",count)
    if(count < 2){
        return false
    }
    return flag;
}


