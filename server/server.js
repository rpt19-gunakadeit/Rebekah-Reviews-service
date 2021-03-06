const express = require('express');
const cors = require('cors');
const db = require('../database/database.js')
const Reviews = require('../database/controllers/reviews.js');
const port = 2000;
const app = express();

app.use(cors());
app.use(express.static('./public/dist'));

// send all reviews by id # & filter (date, most helpful, stars high to low, or start low to high)
app.get('/reviews/:id/:filter', (req, res) => {
  Reviews.getReviews(req.params.id, req.params.filter)
    .then((reviews) => res.status(200).send(reviews))
    .catch((error) => res.status(500).send('Error in getting reviews from DB', error))
})

// update a review with a upvote or downvote
app.post('/updateVote/:reviewId/:numVotes/:vote', (req, res) => {
  Reviews.updateVote(req.params.reviewId, req.params.numVotes, req.params.vote)
    .then(() => res.status(200).send('OK'))
    .catch((error) => res.status(500).send(`Error in updating ${req.params.vote}-vote`))
})

// flag a review for inappropriate content
app.post('/flagReview/:reviewId/:flag', (req, res) => {
  Reviews.updateFlag(req.params.reviewId, req.params.flag)
    .then(() => res.status(200).send('OK'))
    .catch((error) => res.status(500).send('Error in updating flag'))
})


app.listen(port, () => console.log(`Reviews service is listening on port ${port}`));


/*
// API

// GET example data:

localhost:5000/reviews/19 produces:

{ reviews:
   [ { id: 589,
       product_id: 20,
       title: 'amet qui',
       body:
        'Excepteur duis enim in deserunt. Ex ad duis officia esse non aliqua mollit adipisicing. Exercitation excepteur adipisicing labore anim non consequat esse culpa. Et officia nostrud nisi eu consectetur ullamco irure consequat aute magna.\nEa commodo nisi eiusmod aliqua qui sint exercitation ut. Commodo sint deserunt proident exercitation Lorem cupidatat. Sint non esse ex eu Lorem pariatur. Ipsum aliqua non sit sit id. Adipisicing dolore irure occaecat ea ut qui nulla.',
       stars: 4,
       date: 2020-03-08T21:55:48.000Z,
       size_rating: 3,
       comfort_rating: 3,
       durability_rating: 3,
       location: 'Jeanetteburgh, Oregon',
       userId: 910,
       user: 'Kiley18268' },
     { id: 587,
       product_id: 20,
       title: 'officia',
       body: null,
       stars: 1,
       date: 2020-03-07T00:45:27.000Z,
       size_rating: 1,
       comfort_rating: 2,
       durability_rating: 3,
       location: 'Lake Claudine, Oklahoma',
       userId: 82,
       user: 'Cathrine42923' },
     { id: 596,
       product_id: 20,
       title: 'laborum nisi exercitation',
       body:
        'Sit aute do irure et ullamco id Lorem do culpa qui nisi. Quis elit officia et amet laborum eu.\nAliqua id dolore voluptate cillum duis ut nostrud minim amet quis adipisicing. Laboris sunt duis excepteur labore. Excepteur dolore ipsum enim ea sit dolor commodo laboris et. Fugiat exercitation nisi cillum anim veniam anim.',
       stars: 5,
       date: 2020-03-04T14:01:42.000Z,
       size_rating: 0,
       comfort_rating: 0,
       durability_rating: null,
       location: 'North Ebba, Oregon',
       userId: 812,
       user: 'Aleen23392' },
     { id: 584,
       product_id: 20,
       title: 'ad ea',
       body:
        'Consectetur nostrud et commodo aliquip ipsum mollit nulla ullamco. Dolore amet magna in magna laborum commodo proident. Enim nulla mollit veniam aliquip ullamco tempor nisi et proident eiusmod. Velit eu cupidatat cupidatat ad est consectetur veniam sit aliquip. Ullamco id Lorem sit magna reprehenderit esse.',
       stars: 2,
       date: 2020-03-03T02:14:21.000Z,
       size_rating: 1,
       comfort_rating: 2,
       durability_rating: null,
       location: 'Lake Tyshawn, South Carolina',
       userId: 740,
       user: 'Madonna61157' },
     { id: 590,
       product_id: 20,
       title: 'adipisicing tempor in consequat',
       body:
        'Nostrud ad adipisicing enim fugiat eu. Lorem consectetur non laborum velit mollit nulla. Labore adipisicing Lorem cupidatat ex aliqua duis. Lorem sit laboris aliqua id excepteur do Lorem quis culpa exercitation culpa. Do fugiat cupidatat qui tempor in qui.\nExcepteur consectetur eu deserunt excepteur non irure est deserunt qui ad quis. Fugiat deserunt mollit anim nulla aliquip.',
       stars: 1,
       date: 2020-02-27T04:25:09.000Z,
       size_rating: 0,
       comfort_rating: 0,
       durability_rating: null,
       location: 'South Maddison, Wyoming',
       userId: 1000,
       user: 'Rubye67395' },
     { id: 598,
       product_id: 20,
       title: 'pariatur culpa aute quis incididunt',
       body:
        'Eu ut occaecat non fugiat. Labore non fugiat laboris amet pariatur voluptate. Ex voluptate velit cupidatat veniam occaecat. Sint enim incididunt eu aute adipisicing est ipsum minim.\nIpsum elit est in deserunt tempor Lorem veniam commodo.',
       stars: 5,
       date: 2020-02-06T01:20:00.000Z,
       size_rating: 1,
       comfort_rating: 1,
       durability_rating: null,
       location: 'Lake Jonathanmouth, Nebraska',
       userId: 915,
       user: 'Raoul54498' },
     { id: 591,
       product_id: 20,
       title: 'minim elit',
       body:
        'Laborum aute nisi excepteur deserunt eiusmod magna sit in eu esse. Cillum reprehenderit adipisicing ut id esse elit elit ea laboris qui. Non non consequat ea quis. Anim proident voluptate deserunt eu duis esse. Sunt in dolor sint nisi cupidatat enim voluptate duis qui ullamco ullamco.\nVelit reprehenderit consectetur in aliquip proident. Amet voluptate fugiat tempor elit qui eiusmod.',
       stars: 2,
       date: 2020-01-26T17:06:22.000Z,
       size_rating: null,
       comfort_rating: null,
       durability_rating: null,
       location: 'Luzside, Indiana',
       userId: 855,
       user: 'Lew44597' },
     { id: 601,
       product_id: 20,
       title: 'aute',
       body:
        'Nisi labore enim mollit quis veniam ullamco ullamco enim cillum elit ex. Voluptate adipisicing ad velit consectetur. Anim proident eu pariatur ipsum veniam officia nulla est. Minim aliqua non ipsum voluptate. Eiusmod voluptate labore in elit ullamco esse amet dolore.',
       stars: 4,
       date: 2019-12-20T03:25:03.000Z,
       size_rating: 2,
       comfort_rating: 3,
       durability_rating: 1,
       location: 'West Bethany, Rhode Island',
       userId: 470,
       user: 'Enrique22298' },
     { id: 602,
       product_id: 20,
       title: 'eiusmod Lorem aute consectetur',
       body: null,
       stars: 3,
       date: 2019-12-20T03:17:03.000Z,
       size_rating: 1,
       comfort_rating: 2,
       durability_rating: null,
       location: 'East Alfonzoville, Alabama',
       userId: 887,
       user: 'Fatima6975' },
     { id: 595,
       product_id: 20,
       title: 'cupidatat incididunt',
       body:
        'Dolor irure et consequat ad cupidatat elit. Est commodo elit velit proident quis est anim qui exercitation.\nAliqua voluptate laboris sit aliquip anim tempor mollit commodo deserunt. Anim reprehenderit nisi nulla cillum commodo non enim deserunt enim. Officia reprehenderit ipsum proident laborum incididunt eiusmod qui exercitation amet. Excepteur dolor excepteur consequat culpa. Officia incididunt Lorem deserunt labore amet do anim.',
       stars: 1,
       date: 2019-11-18T08:01:39.000Z,
       size_rating: 3,
       comfort_rating: 1,
       durability_rating: 1,
       location: 'New Dorothy, Mississippi',
       userId: 505,
       user: 'Marshall2781' },
     { id: 586,
       product_id: 20,
       title: 'elit excepteur Lorem sit',
       body:
        'Irure nostrud anim proident laborum pariatur laborum. Eiusmod ex eiusmod ullamco est reprehenderit quis id labore. Aliquip Lorem ex aliqua elit cupidatat veniam occaecat qui officia aliqua.',
       stars: 3,
       date: 2019-10-19T14:07:49.000Z,
       size_rating: 0,
       comfort_rating: 0,
       durability_rating: null,
       location: 'Port Andreannestad, Kentucky',
       userId: 591,
       user: 'Isac87694' },
     { id: 593,
       product_id: 20,
       title: 'excepteur culpa aliqua ullamco',
       body:
        'Do reprehenderit esse nostrud aliqua nisi officia. Ullamco duis laborum sint labore tempor voluptate non fugiat consequat non do.',
       stars: 3,
       date: 2019-09-12T08:22:01.000Z,
       size_rating: 1,
       comfort_rating: 1,
       durability_rating: 1,
       location: 'Elisabethtown, Missouri',
       userId: 496,
       user: 'Gerda66596' },
     { id: 588,
       product_id: 20,
       title: 'magna irure',
       body:
        'Aliquip nulla fugiat eiusmod esse adipisicing do adipisicing excepteur Lorem eu laborum.',
       stars: 3,
       date: 2019-09-11T14:16:03.000Z,
       size_rating: null,
       comfort_rating: null,
       durability_rating: null,
       location: 'Lake Liana, Wyoming',
       userId: 757,
       user: 'Mervin40674' },
     { id: 594,
       product_id: 20,
       title: 'consequat officia qui',
       body:
        'Et labore incididunt sunt officia occaecat. Adipisicing culpa sint cillum velit aute aliquip laboris nostrud ullamco occaecat.\nProident irure eiusmod nulla deserunt culpa. Nulla aliqua laboris magna et enim anim consequat elit sunt sunt. Ad duis in fugiat incididunt. Aliqua in officia minim dolore magna incididunt in do velit. Reprehenderit tempor tempor voluptate incididunt do.',
       stars: 1,
       date: 2019-08-16T14:51:03.000Z,
       size_rating: null,
       comfort_rating: null,
       durability_rating: null,
       location: 'New Adalbertostad, Montana',
       userId: 841,
       user: 'Ezequiel87849' },
     { id: 585,
       product_id: 20,
       title: 'dolore nostrud',
       body:
        'Excepteur culpa in tempor est occaecat aute non ex anim ad laboris. Aliqua exercitation aute officia non laborum ipsum amet mollit.',
       stars: 4,
       date: 2019-08-13T05:43:29.000Z,
       size_rating: null,
       comfort_rating: null,
       durability_rating: null,
       location: 'Angelohaven, Tennessee',
       userId: 293,
       user: 'Kaitlin94965' },
     { id: 600,
       product_id: 20,
       title: 'exercitation nostrud minim voluptate dolore',
       body:
        'Enim ipsum ullamco fugiat Lorem Lorem sunt aute. Consectetur cupidatat aute veniam sint laboris consectetur ipsum reprehenderit excepteur. Aute quis ipsum esse eu incididunt non voluptate enim magna minim sint. Minim ad pariatur mollit duis dolor id deserunt mollit consectetur. Velit veniam aliqua tempor ullamco do ea dolor dolore.',
       stars: 2,
       date: 2019-08-04T00:20:22.000Z,
       size_rating: null,
       comfort_rating: null,
       durability_rating: null,
       location: 'Paolomouth, North Carolina',
       userId: 608,
       user: 'Cyril4117' },
     { id: 603,
       product_id: 20,
       title: 'minim laboris do qui',
       body:
        'Laborum aliquip enim incididunt pariatur laboris. Est laborum sit nulla quis ipsum nulla minim laboris cupidatat commodo. Culpa eiusmod cupidatat amet exercitation. Reprehenderit dolor veniam adipisicing id dolor voluptate quis cillum amet culpa. Velit eiusmod quis ullamco eu est.',
       stars: 1,
       date: 2019-07-12T11:45:33.000Z,
       size_rating: null,
       comfort_rating: null,
       durability_rating: null,
       location: 'Roobstad, New Jersey',
       userId: 522,
       user: 'Webster63407' },
     { id: 592,
       product_id: 20,
       title: 'consectetur veniam officia ex',
       body: null,
       stars: 4,
       date: 2019-07-06T00:42:00.000Z,
       size_rating: 0,
       comfort_rating: 0,
       durability_rating: null,
       location: 'East Noeliashire, Indiana',
       userId: 421,
       user: 'Eusebio1938' },
     { id: 599,
       product_id: 20,
       title: 'aliqua id',
       body:
        'Incididunt sunt occaecat quis ad veniam voluptate id velit sint commodo. Deserunt duis ex excepteur voluptate ut amet consequat qui laboris. Aute ullamco reprehenderit ipsum occaecat voluptate magna nulla. Et tempor in deserunt voluptate. Officia reprehenderit cillum sint non aute ipsum in dolor.\nAliqua nisi eiusmod veniam consequat do excepteur nulla tempor cillum. Tempor fugiat sint mollit pariatur exercitation sunt magna est Lorem commodo. Anim est ullamco sunt tempor nostrud commodo eu sit consequat.',
       stars: 1,
       date: 2019-07-02T19:43:43.000Z,
       size_rating: 3,
       comfort_rating: 3,
       durability_rating: 2,
       location: 'South Sandrine, Texas',
       userId: 551,
       user: 'Golden95455' },
     { id: 583,
       product_id: 20,
       title: 'cillum amet fugiat',
       body:
        'Elit veniam mollit in occaecat Lorem cupidatat veniam.\nAliqua sit id ullamco ipsum qui consectetur quis sint deserunt. Nulla culpa reprehenderit eu esse nisi excepteur in non commodo non.',
       stars: 2,
       date: 2019-06-05T13:00:09.000Z,
       size_rating: 2,
       comfort_rating: 2,
       durability_rating: 2,
       location: 'Marquardttown, Maryland',
       userId: 40,
       user: 'Tanner6722' },
     { id: 597,
       product_id: 20,
       title: 'nostrud nostrud amet magna',
       body: null,
       stars: 5,
       date: 2019-05-23T17:11:28.000Z,
       size_rating: null,
       comfort_rating: null,
       durability_rating: null,
       location: 'West Norberto, Kentucky',
       userId: 900,
       user: 'Hobart31887' } ],
  avgStars: 2.7142857142857144 }

*/

