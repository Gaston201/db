Prerequisites 

You need to have Node.js NPM 

 

How to setup 

Download the source code from the link above. 

Open up a CLI (Git Bash recommended) in the same folder as the "app.js" file 

Then do this command (This may or may not be necessary) 

npm install sqlite3 

Done. 

 

How to use 

Open up a CLI (Git Bash recommended) in the same folder as the "app.js" file then do the commands there. 

(ALWAYS START WITH) ->    node app.js  

 

Borrow a book (Query 1) 

borrow <Borrower.id> <Book.id> 

 

Return a book (Query 2) 

return <Book.id> 

 

See if a book is available (Query 3) 

availability <Book.title> 

 

See overdue books (Query 4) 

status <Borrower.id> 

 

See list of books to return (Query 5) 

returnDates <Borrower.id>  

 

Examples 

Borrow a book (Query 1) 

node app.js borrow 2 1 

 

Return a book (Query 2) 

node app.js return 1 

 

See if a book is available (Query 3) 

node app.js availability 'Comedy Night' 

 

See overdue books (Query 4) 

node app.js status 5 

 

See list of books to return (Query 5) 

node app.js returnDates 2 