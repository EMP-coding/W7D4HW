// Exercise 1
/*
Banking System

Create an Account class with the properties accountNumber, currentBalance, and owner. The Account should have methods to deposit and withdraw. The 
deposit method should add that amount to the currentBalance. The withdraw method should first check if there is enough to withdraw before withdrawing

Implement child classes CheckingAccount and SavingsAccount, each inheriting from the Account class. 

The CheckingAccount will also have an overdraftLimit property. Override the withdraw method to 
first check if there is enough (+ overdraftLimit) before withdrawing.

The SavingsAccount will also have an interestRate. Add a method addInterest that will increase the currentBalance by that interest rate

*/


// const checkingAccount = new CheckingAccount('123456', 1000, 'John Doe', 500);
// const savingsAccount = new SavingsAccount('654321', 5000, 'Jane Smith', 2);

// checkingAccount.deposit(500);
// checkingAccount.withdraw(1400);
// checkingAccount.withdraw(200);  

// savingsAccount.deposit(1000);
// savingsAccount.withdraw(7000);
// savingsAccount.addInterest();


class Account {
    constructor(accountNumber, currentBalance, owner){
        this.accountNumber = accountNumber;
        this.currentBalance = currentBalance;
        this.owner = owner;
    }
    deposit(amount){
        this.currentBalance += amount;
        console.log(`Deposited: $${amount} => New Balance: $${this.currentBalance}`);
    } 
    withdraw(amount) {
        if (this.currentBalance >= amount) {
            this.currentBalance -= amount;
            console.log(`Withdrawal Amount: $${amount} => New Balance: $${this.currentBalance}`)
        } else {console.log(`With a current account balance of $${this.currentBalance} you are not able to withdraw $${amount}`)}

    }
}

class CheckingAccount extends Account {
    constructor(accountNumber, currentBalance, owner, overdrafLimit){
        super(accountNumber, currentBalance, owner);
        this.overdrafLimit = overdrafLimit
    }
    withdraw(amount) {
        if (this.currentBalance + this.overdrafLimit >= amount) {
            this.currentBalance -= amount;
            console.log(`Withdrawal Amount: $${amount} => New Balance: $${this.currentBalance}`)
        } else {console.log(`With a current account balance of $${this.currentBalance} and a overdraft limit of $${this.overdrafLimit} you are not able to withdraw $${amount}`)}
    }
}

class SavingsAccount extends Account {
    constructor(accountNumber, currentBalance, owner, interestRate){
        super(accountNumber, currentBalance, owner);
        this.interestRate = interestRate;
    }
    addInterest() {
        let interest = this.currentBalance * (this.interestRate / 100);
        this.currentBalance += interest
        console.log(`Interest Deposit: $${interest} => New Balance: $${this.currentBalance}`);
    }
}

const jdCheckingAccount = new CheckingAccount('123456', 1000, 'John Doe', 500);
const jsSavingsAccount = new SavingsAccount('654321', 5000, 'Jane Smith', 2);

jdCheckingAccount.deposit(100)         //  Returns a balance of $1100
jdCheckingAccount.withdraw(1400)      // Returns a balance of $-300 so checking account is properly initializing the overdraftLimit
jsSavingsAccount.deposit(500)        // Returns a balance of $5500
jsSavingsAccount.withdraw(5600)     // Returns a message "With a current account balance of $5500 you are not able to withdraw $5600"
jsSavingsAccount.addInterest()     // Returns Interest Deposit: $110 => New Balance: $5610
jdCheckingAccount.deposit(1000)   // Returns Deposited: $1000 => New Balance: $700
jdCheckingAccount.withdraw(1300) // Returns With a current account balance of $700 and a overdraft limit of $500 you are not able to withdraw $1300


// Exercise 2 - Promises 
// Using the below getMovieInfo function, which is a Promised-base function, write an asynchronous function (.then().catch() or async/await)
// called printMovieInfo that will take in a movie title and then either displays the movie information or logs an error with a console.warn().


function getMovieInfo(movieName){
    return new Promise((resolve, reject) => {
        if (movieName.length > 5){
            let movie = {
                id: 123,
                title: 'Indiana Jones and the Dark Knight',
                director: 'Christopher Spielberg',
                runtime: 157,
                description: 'Good vs Evil'
            }
            resolve(movie)
        } else {
            reject(`${movieName} cannot be accessed because it is too short.`)
        }
    })
}
// Using .then and .catch 

function printMovieInfo(movieName){
    getMovieInfo(movieName).then(movie =>{
        console.log(`${movie.title} directed by ${movie.director}. A story of ${movie.description} that runs for ${movie.runtime} minutes.`)
    })
    .catch(rejected  => {
        console.warn(`*Warning* ${rejected}`);
    });
};

// Using async and await 

async function printMovieInfo2(movieName){
    try {
    let movie = await getMovieInfo(movieName);
    console.log(`${movie.title} directed by ${movie.director}. A story of ${movie.description} that runs for ${movie.runtime} minutes.`)
    } catch (rejected){ 
        console.warn(`*Warning* ${rejected}`);
    }
}


printMovieInfo('Indiana Jones and the Dark Knight')        // Returns "Indiana Jones and the Dark Knight directed by Christopher Spielberg. A story of Good vs Evil that runs for 157 minutes."
printMovieInfo('ET')                                      // Returns *Warning* ET cannot be accessed because it is too short.

printMovieInfo2('Indiana Jones and the Dark Knight')    // Returns "Indiana Jones and the Dark Knight directed by Christopher Spielberg. A story of Good vs Evil that runs for 157 minutes."
printMovieInfo2('ET')                                  // Returns *Warning* ET cannot be accessed because it is too short.

// Exercise 3
// Add a Button somewhere on your index.html page with an id "backgroundChanger"
// Add a click event listener to your button that will change the background color of the body
// The background should toggle between at least 2 colors


let isColorOne = true; 

const button = document.getElementById('backgroundChanger');
function changeBackgroundColor() {
    if (isColorOne) {
        document.body.style.backgroundColor = 'skyblue'; 
    } else {
        document.body.style.backgroundColor = 'salmon'; 
    }
    isColorOne = !isColorOne; 
}
button.addEventListener('click', changeBackgroundColor);




/* From todays example
let colorButtons = document.getElementsByClassName('light-dark-button');
console.log(colorButtons);
for (let btn of colorButtons){
    btn.addEventListener('click', changeBackgroundColor);
}

function changeBackgroundColor(e){
    console.log('Color button clicked');
    console.log(e.target.value);
    if (e.target.value === 'Dark'){
        document.body.style.backgroundColor = '#C96E12'
    } else {
        document.body.style.backgroundColor = '#C96E12'
    }
} */
