// get module
const sqlite3 = require('sqlite3').verbose();

// start the database
let db = new sqlite3.Database('library.db', sqlite3.OPEN_READWRITE, (e) => {
    if (e) {
        console.error(e.message);
    }

    // get arguments from cli
    const args = process.argv;

    // find the wanted command
    if (args.length < 2){

        console.log('You need to enter a command');
    } else if (args[2] === 'borrow') {

        let date = new Date();
        let borrower_id = args[3];
        let book_id = args[4];
        let return_date;

        let newYear = date.getFullYear();
        let newMonth = date.getMonth() + 1;
        let newDay = date.getDate();

        // get return date by adding 10 days from current date
        if (date.getDate() > 20) {

            newDay -= 20;
            newMonth += 1;

            if (newMonth === 13) {
                newYear += 1;
                newMonth = 1;
            }
            return_date = '' + newYear + '-' + ('0' + newMonth) + '-' + newDay;
        } else {

            return_date = '' + newYear + '-' + ('0' + newMonth) + '-' + (newDay + 10);
        }

        // set SQL statement and data
        let sql = 'INSERT INTO Loan (return_date, completed, borrower_id, book_id) VALUES (?,?,?,?);';
        let data = [return_date, 0, borrower_id, book_id];

        // run the statement
        db.run(sql, data, function(e) {
            if (e) {
                return console.error(e.message);
            }

            console.log('Book borrowed');
        });

    } else if (args[2] === 'return') {

        let book_id = args[3];

        // set SQL statement and data
        let sql = 'UPDATE Loan SET completed=? WHERE book_id=?;';
        let data = [1, book_id];

        // run the statement
        db.run(sql, data, function(e) {
            if (e) {
                return console.error(e.message);
            }

            console.log('Book returned');
        });

    } else if (args[2] === 'availability') {

        let book_title = args[3];

        // set SQL statement and data
        let sql = 'SELECT * FROM Book WHERE title=\'' + book_title
            + '\' AND id NOT IN(SELECT Book.id FROM Loan JOIN Book ON Loan.book_id=Book.id WHERE Book.title=\'' + book_title
            +'\' AND Loan.completed=0);';

        // run the statement
        db.all(sql, [], (e, rows) => {
            if (e) {
                throw e;
            }
            console.log('There are ' + rows.length + ' copies of the book ' + book_title + ' available');
        });

    } else if (args[2] === 'status') {

        let borrower_id = args[3];

        // set SQL statement
        let sql = 'SELECT Book.title, Loan.return_date FROM Loan JOIN Book ON Loan.book_id=Book.id ' +
            'WHERE borrower_id=' + borrower_id + ' AND completed=0 AND return_date < date(\'now\');';

        // run the statement
        db.all(sql, [], (e, rows) => {
            if (e) {
                throw e;
            }
            rows.forEach((row) => {
                console.log('Book title: ' + row.title + ', Deadline: ' + row.return_date);
            });
        });

    } else if (args[2] === 'returnDates') {

        let borrower_id = args[3];

        // set SQL statement
        let sql = 'SELECT Book.title, Loan.return_date FROM Loan JOIN Book ON Loan.book_id=Book.id ' +
            'WHERE borrower_id=' + borrower_id + ' AND completed=0 ORDER BY return_date;';

        // run the statement
        db.all(sql, [], (e, rows) => {
            if (e) {
                throw e;
            }
            rows.forEach((row) => {
                console.log('Return date: ' + row.return_date + ', Book title: ' + row.title);
            });
        });

    } else {

        console.log("Something went wrong, are you sure you used a correct command?");
    }
});

// close the database
db.close((e) => {
    if (e) {
        return console.error(e.message);
    }
});