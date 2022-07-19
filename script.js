"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//   owner: "Jonas Schmedtmann",
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: "Jessica Davis",
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: "Steven Thomas Williams",
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: "Sarah Smith",
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

const account1 = {
  owner: "Paras Arya",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2021-11-18T21:31:17.178Z",
    "2021-12-23T07:42:02.383Z",
    "2021-01-28T09:15:04.904Z",
    "2021-04-01T10:17:24.185Z",
    "2021-05-08T14:11:59.604Z",
    "2022-02-23T17:01:17.194Z",
    "2022-02-28T23:36:17.929Z",
    "2022-03-01T10:51:36.790Z",
  ],
  currency: "INR",
  locale: "hi-IN", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//Dates
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);
  

  if (daysPassed === 0) {
    return "Today";
  }
  if (daysPassed === 1) {
    return "yesterday";
  }
  if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  } else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}-${month}-${year}`;

    return new Intl.DateTimeFormat(locale).format(date);
  }
};

//FORMATING CURRENCY FUNCTON
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

//DISPLAY MOVEMENTS: inserting movements.
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  //IMPLEMENTING SORTING
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    //FORMATING CURRENCY
    const formattedMOV = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMOV}</div>
    </div>`;
    //used 'afterbegin' so new element in array can be on the top of the container
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//DISPLAY TOTAL BALANCE
const calcDisplayBalance = function (acc) {
  //setting balance property
  acc.balance = acc.movements.reduce((accum, acc) => accum + acc, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  //RULE OF INTEREST: we take ITERESTRATE on every deposit,and only those interest which is above 1 is made to final calculation.
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

//CREATE USERNAME: creating new 'usernames' property using 'owner' property of accounts object.
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUserNames(accounts);
// console.log(accounts);

//Update UI function
const updateUI = function (acc) {
  //Display movements
  displayMovements(acc);

  //Display balance
  calcDisplayBalance(acc);

  //Display Summary
  calcDisplaySummary(acc);
};

//TIMER
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //in each call,print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;
    //when 0 seconds, stop timer and logout
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    time--;
    //Decrese 1s
  };
  //set time to 5 minutes
  let time = 300;

  tick();
  //call the timer every second
  const timer = setInterval(tick, 1000);
  return timer;
};

//LOGIN
let currentAccount, timer;
/////////

btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("login");

  //find username given by user in input,returns object with matching username
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  //with the returned object,check pim and Display content accordingly.
  if (currentAccount?.pin === +inputLoginPin.value) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`; //display firstName

    containerApp.style.opacity = 100;
    console.log("Logged");

    //Creating current date and time
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // const sec = now.getSeconds();

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      // weekday: "short",
    };
    // const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // labelDate.textContent = `${day}-${month}-${year}, ${hour}:${min}`;

    //Clear Input Fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //reset timer
    if (timer) clearInterval(timer);
    //start timer
    timer = startLogOutTimer();

    //update UI
    updateUI(currentAccount);
  }
});

// //Fake Login
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//TRANSFER AMOUNT
btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();

  const amount = +inputTransferAmount.value;

  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  // console.log(amount,receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = "";

  //Validation to transfer money
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    console.log("Transfer valid");
    //Pushing amount to receiver and subtracting amount in current account

    // console.log(receiverAcc);

    //MONEY CONVERSION
    let newAmount;
    if(currentAccount.currency === 'USD'){
      newAmount = amount*76;
    }
    if(currentAccount.currency === 'INR'){
      newAmount = amount/76;
    }

    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(newAmount);

    //Add transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    //update UI
    updateUI(currentAccount);

    //reset timer
    clearInterval(timer);
    //restart timer
    timer = startLogOutTimer();
  }
});

//LOAN
btnLoan.addEventListener("click", function (event) {
  event.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  console.log(amount);

  //Validation,loan can be requested only if one of the deposit has 10% value of asked amount.
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      //Add amount
      currentAccount.movements.push(amount);

      //create date
      currentAccount.movementsDates.push(new Date().toISOString());

      //update UI
      updateUI(currentAccount);

      //reset timer
      clearInterval(timer);
      //restart timer
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = "";
});

//CLOSING ACCOUNT
btnClose.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("acc closed");

  //validation for closing acc
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    //find index of currentAccount in accounts array
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);

    //delete account from accounts array
    accounts.splice(index, 1);

    //hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (event) {
  event.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// /////////////////////////////////////////////////

