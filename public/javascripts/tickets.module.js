var ticketsList  = [
{
    title: 'the title',
    content: 'my domain is broken!!!!',
    userEmail: 'bob@bobcorp.com',
    replies:
    [
      {
          content: 'mine toooo!!!!',
          userEmail: 'foo@goo.com'
      },
      {
          content: 'whooop',
          userEmail: 'foo@goo.com'
      }
    ]
},
{
    title: 'second title',
    content: 'hello\ni have a lot of problems\ngoodbye',
    userEmail: 'foo@goo.com',
    replies:
    [
      {
          content: 'wooooo',
          userEmail: 'bob@bobcorp.com'
      }
    ]
},
{
    title: 'help me',
    content: 'lost my site\nrecover it',
    userEmail: 'alice@alicecorp.com',
    replies:
    [
      {
          content: 'me too!',
          userEmail: 'foo@goo.com'
      }
    ]
},
{
    title: 'alice again',
    content: 'lost my site again\npleaseee recover it\nblah blah blash',
    userEmail: 'alice@alicecorp.com',
    replies:
    [
      {
          content: 'there you go...',
          userEmail: 'foo@goo.com'
      }
    ]
},
{
    title: 'seo problem',
    content: 'unbale to find site on google\nwhy???\nblah blah blash',
    userEmail: 'david@dd.com',
    replies:
    [
      {
          content: 'submit it to google',
          userEmail: 'foo@goo.com'
      }
    ]
},
{
    title: 'footer is all over the place',
    content: 'how to fix it?',
    userEmail: 'david@dd.com',
    replies:
    [
      {
          content: 'click on it and drag it',
          userEmail: 'foo@goo.com'
      }
    ]
},
{
    title: 'bob update',
    content: 'my domain is broken once again!!!!\narrghhh',
    userEmail: 'bob@bobcorp.com',
    replies: []
}];

function uuid() {
    return Math.floor(Math.random() * 999).toString(36);
}

ticketsList.map(function (ticket) {
    ticket.id = uuid();
});

exports.uuid = uuid;

exports.getTicketsList = function () {
    return ticketsList;
};

exports.getTicketById = function (ticketId) {
    return ticketsList.filter(function (ticket) {
        return ticket.id === ticketId;
    })[0];
};

exports.getRepliesByTicketId = function (ticketId) {
    return ticketsList.filter(function (ticket) {
        return ticket.id === ticketId;
    })[0].replies;
};

exports.addNewTicket = function (newTicket) {
    ticketsList.push(newTicket);
};

exports.addNewReply = function (ticketId, newReply) {
    ticketsList.filter(function (ticket) {
        return ticket.id === ticketId;
    })[0].replies.push(newReply);
};

exports.removeTicket = function (ticketId) {
    ticketsList = ticketsList.filter(function (ticket) {
        return ticket.id !== ticketId;
    });
};
