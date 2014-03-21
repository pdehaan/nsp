var celeri = require('celeri');

celeri.option({
    command: 'hello hello :person',
    description: 'Prints hello [person]',
    optional: {
        '--age': 'The person\'s age',
        '--gender': 'The person\'s gender'
    }
}, action);


function action(data) {
    console.log('Hello %s!', data.person);

    if (data.age) {
        console.log('%s is %d years old.', data.person, data.age);
    }
    if (data.gender) {
        console.log('%s is a %s.', data.person, data.gender);
    }
}
