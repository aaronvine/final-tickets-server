var express = require('express');
var router = express.Router();
var validator = require('validator');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Node.js Mini Project' });
});
/* GET tickets */
router.get('/tickets', function (req, res, next) {
    var ticketsList = req.ticketsModule.getTicketsList();
    res.json(ticketsList);
});
/* GET ticket by id */
router.get('/tickets/:id', function (req, res, next) {
    var ticket = req.ticketsModule.getTicketById(req.params.id);
    res.json(ticket);
});
/* DELETE ticket by id */
router.delete('/tickets/:id', function (req, res, next) {
    req.ticketsModule.removeTicket(req.params.id);
    res.redirect('tickets');
});
/* POST new ticket */
router.post('/tickets', function (req, res, next) {
    var newTicket = {};
    if (validator.isNull(req.body.title) || validator.isNull(req.body.content) || validator.isNull(req.body.userEmail)) {
        console.log('\x1b[33m%s\x1b[0m', 'ticket was not added: missing details');
        return res.status(500).json('ERROR: missing details');
    } else if (!validator.isEmail(req.body.userEmail)) {
        console.log('\x1b[33m%s\x1b[0m', 'ticket was not added: incorrect email address');
        return res.status(500).json('ERROR: incorrect email address');
    } else {
        newTicket.id =  req.ticketsModule.uuid();
        newTicket.title = req.body.title;
        newTicket.content = req.body.content;
        newTicket.userEmail = req.body.userEmail;
        req.ticketsModule.addNewTicket(newTicket);
        res.redirect('tickets');
    }
});
/* GET ticket replies by ticket id */
router.get('/tickets/:id/replies', function (req, res, next) {
    var ticketReplies = req.ticketsModule.getRepliesByTicketId(req.params.id);
    res.json(ticketReplies);
});

module.exports = router;
