// let arr = ['a','b','c','d','e']

// //SLICE method does not mutate the original array
// console.log(arr.slice(2))
// console.log(arr.slice(2,4))
// console.log(arr.slice(-1));
// console.log(arr.slice(1,-2));

// //SPLICE method does mutate the orignal array
// // console.log(arr.splice(2));
// arr.splice(-1);
// arr.splice(1,2)
// console.log(arr);

// //REVERSE method mutates the original array
// arr = ['a','b','c','d','e']
// const arr2 = ['j','i','h','g','f']
// console.log(arr2.reverse());

// //CONCAT doesn't mutate the original array
// const letters = arr.concat(arr2);
// console.log(letters);
// //similar to
// console.log([...arr,...arr2]);

// //JOIN
// console.log(letters.join(' - '));

// /////// New Array method /////////
// const arr3 = [23,11,64];
// //old
// console.log(arr3[0]);
// //new
// console.log(arr3.at(0));

// //getting last array element
// console.log(arr3[arr3.length - 1]);
// console.log(arr3.slice(-1)[0]);

// console.log(arr3.at(-1));

/////////////// Looping over array /////////////
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// //using For Of loop
// // for(const movement of movements){
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i+1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i+1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// ///////using For Each loop///////
// console.log("----------For Each--------");

// //Order of parameters matter
// //In for each loop we cannot use break & continue statements.

// movements.forEach(function (movement,index,array) {
//   if (movement > 0) {
//     console.log(`Movement ${index+1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${index+1}: You withdrew ${Math.abs(movement)}`);
//   }
// });

///////////// For Each with Maps and Sets ///////////

//MAP
// const currencies = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound sterling'],
//   ]);

//   currencies.forEach(function(value,key,map){
//     console.log(`${key}: ${value}`);
//   })

//   const currenciesUnique = new Set(['USD','GBP','USD','EUR','EUR']);
//   console.log(currenciesUnique);
  
//   currenciesUnique.forEach(function(value,_,map){
//     console.log(`${value}: ${value}`);
//   })

////////////////// codding challange ///////////////////////

// const checkDogs = function(dogsJulia,dogsKate){
//     const dogsJuliaCorrected = dogsJulia.slice();
//     dogsJuliaCorrected.splice(0,1);
//     dogsJuliaCorrected.splice(-2);
  
//     const dogs = dogsJuliaCorrected.concat(dogsKate);
  
//     // console.log(dogs);
  
//     dogs.forEach(function(dog,i){
//       if(dog >= 3){
//         console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
//       } else{
//         console.log(`Dog number ${i+1} is still a puppy and ${dog} years old`);
//       }
//     })
//   }
//   checkDogs([9, 16, 6, 8, 3],[10, 5, 6, 1, 4])

//////// Data Transformation with MAP,FILTER and REDUCE////

////MAP: returns a new array containing the results of applying an operation on all array elements.

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const euroToUsd = 1.1;
// const movementUSD = movements.map((mov) => {
//   return (mov * euroToUsd).toFixed(2);
// });
// console.log(movementUSD);

// const movementDescription = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movementDescription);

// //for of loop in comparision of MAPS
// const movementUSDfor = [];
// for (const mov of movements) movementUSDfor.push((mov * euroToUsd).toFixed(2));
// console.log(movementUSDfor);

////FILTER: filter returns a new array containing the array that passed a specified test condition.

// //by using filter method 
// const deposits = movements.filter(function(mov){
//     return mov > 0;
//   })
//   console.log(deposits);
  
//   //in comparision with For Of loop
//   const depositFor = [];
//   for(const mov of movements){
//     if(mov > 0)
//     {
//       depositFor.push(mov);
//     }
    
//   }
//   console.log(depositFor);

//REDUCE: reduce boils('reduce') all array elements down to one single value(eg,adding all elements together)
//reduce method
//accumulator is like snowball.
// const balance = movements.reduce(function(accum,cur,i,arr){
//     console.log(`iteration ${i}: ${accum}`);
//     return accum + cur
//   },0)
//   //0 here is initial value of accumulator.
//   console.log(balance);
  
//   //in comparision with for loop
//   let balance2 = 0;
//   for(const mov of movements){
//     balance2 += mov;
//   }
//   console.log(balance2);

// Maximum value
// const max = movements.reduce((accum,mov) => {
//     if(accum > mov)
//     return accum;
//     else
//     return mov;
//   },movements[0])
//   console.log(max);

////////////// codding challange ////////////

// const calcAverageHumanAge = function (ages) {
//     const humanAges = ages.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
//     const adultDogs = humanAges.filter((age) => age >= 18);
//     console.log(humanAges);
//     console.log(adultDogs);
  
//     const average = adultDogs.reduce(
//       (accum, age) => accum + age, 0)/ adultDogs.length;
  
//     return average;
//   };
//   const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
//   console.log(avg1);

//Array Method Chaining
// const euroToUsd = 1.1;

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// //Array method chaining
// const totalDepositsToUsd = movements.filter(mov => mov > 0).map(mov => mov * euroToUsd).reduce((acc ,mov) => acc + mov,0)
// console.log('$',totalDepositsToUsd);

///codding challange /////
// const calcAverageHumanAge = (ages) => {
//     const humanages = ages
//       .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
//       .filter((age) => age >= 18)
//       .reduce((accum, age, i, arr) => accum + age / arr.length, 0);
//       return humanages
//   };
//   const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
//   console.log(avg1);

//Find Method
//Find method returns element which satisfies the condition not whole array.
// const firstWithdrawal = movements.find(mov => mov < 0)
// console.log(firstWithdrawal);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

//////// SOME METHOD ////////
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);
// //EQUALITY
// console.log(movements.includes(-130));

// //CONDITION
// console.log(movements.some(mov => mov === -130));
// const deposits = movements.some(mov => mov > 5550)
// console.log(deposits);

//Every method
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// //Separate callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// //FLAT METHOD: use to take out nested array into single array(works only for one level of nesting)
// const arr = [[1,2,3],[4,5,6],7,8];
// console.log(arr.flat());
// //second level nesting
// const arrDeep = [[[1,2],3],[4,[5,6]],7,8]
// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat()
// console.log(allMovements);

// const overallBalance = allMovements.reduce((acum,acc) => acum+acc,0);
// console.log(overallBalance);

//flatMap METHOD
// const overallBalanceFLatMap = accounts.flatMap(acc => acc.movements).reduce((accum,mov) => accum + mov)
// console.log(overallBalanceFLatMap);

//Sorting array with string
// const owners = ['Jonas','Zach','Adam','Martha'];
// console.log(owners.sort());
//Sorting array with numbers

//return < 0, A, B (keep order)
//return > 0, B, A (switch order)

// //Ascending
// // movements.sort((a,b) => {
// //   if(a > b) return 1;
// //   if(a < b) return -1;
// // })

// //alternative way of writing
// movements.sort((a,b)=> a-b)
// console.log(movements);

// //Descendin
// movements.sort((a,b)=> {
//   if(a > b) return -1;
//   if(a < b) return 1;
// })

// //alternative way of writing
// movements.sort((a,b)=> b-a)
// console.log(movements);

//Empty Arrays + fill method
//fill the empty array with 1 from pos 3 to 5
// x.fill(1,3,5)
// console.log(x);

// ///Array.from METHOD
// const y = Array.from({length: 7},()=>1)
// console.log(y);

// const z = Array.from({length:7},(_,i) => i+1)
// console.log(z);




// labelBalance.addEventListener('click',function(){
//   const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('eurosign','')));
//   console.log(movementsUI);
// })

//////////////// Numbers and Dates /////////////////
//////////////// Numbers and Dates /////////////////

// console.log((0.1 + 0.2));

// //conversion
// console.log(Number('23'));
// console.log(+'23');

// //parsing
// console.log(Number.parseInt('30px'));
// console.log(Number.parseFloat('2.5rem'));

// //isNaN
// console.log(Number.isNaN(20));
// console.log(Number.isNaN(+'20'));

// //checking if value is number
// console.log(Number.isFinite(20));
// console.log(Number.isFinite(23/0));

/////// Math and Rounding /////////
// console.log(Math.sqrt(25));

// console.log(Math.max(5,18,23,11,2));
// console.log(Math.min(5,18,23,11,2));

// console.log(Math.PI * Number.parseFloat('10px') ** 2);
// console.log(Math.trunc(Math.random() * 6) + 1);

// //How to return value in range between max and min.
// const randomInt = (min,max) =>Math.floor(Math.random() * ( max - min ) +1) + min;
// // 0....1 -> 0+min...(max-min+min) --> min...max
// console.log(randomInt(10,20));

// //Rounding integeres
// console.log(Math.trunc(23.9));
// console.log(Math.round(23.9));

// console.log(Math.ceil(23.3));
// console.log(Math.ceil(23.9));

// console.log(Math.floor(23.3));
// console.log(Math.floor(23.9));

// console.log(Math.trunc(-23.3));
// console.log(Math.floor(-23.3));

// //Rounding decimals
// //tofixed returns string
// console.log((2.755644).toFixed(2));
// console.log(+(2.755644).toFixed(2));

///Remainder operator
// console.log(6 % 3);

// const isEven = n => n % 2 === 0;
// console.log(isEven(5));

// labelBalance.addEventListener('click',function(){
  
//   [...document.querySelectorAll('.movements__row')].forEach(function(row,i){
//     //0,2,4,6
//     if(i % 2 === 0) row.style.backgroundColor = 'lightgrey';
//     //0,3,6,9
//     if(i % 3 === 0) row.style.backgroundColor = 'grey'
//   })
// })

//////// Numeric seprators ///////////
//for code good code readability
// const diameter = 289_24_2323_0000;
// console.log(diameter);

// const priceCents = 345_99;
// console.log(priceCents);

/////// BigInt ///////
// console.log(2 ** 53-1);
// console.log(Number.MAX_SAFE_INTEGER);

// console.log(2827383937383893739393739927383n);
// console.log(BigInt(2827383937383));

// console.log(10000n + 10000n);

// const huge = 2093039303933930344044049n;
// const num = 23;
// console.log(huge * BigInt(num));

// console.log(20n > 15);
// console.log(20n === 20);
// console.log(20n == 20);

// console.log(11/3);
// console.log(11n/3n);

///////// Dates and Times /////////

//Create a date
// const now = new Date();
// console.log(now);

// console.log(new Date('December 24, 2015'));

// //month here is zero based
// console.log(new Date(2037,10,19,15,23,5));

// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// const future = new Date(2037,10,19,15,23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.toISOString());
// console.log(future.getTime());

// console.log(Date.now());

// future.setFullYear(2040);
// console.log(future);


///// operation with dates /////

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(+future);

// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));

// console.log(days1);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/// Formating numbers///

// const num = 3883838.23

// const options = {
//   style:"currency",
//   unit:'mile-per-hour',
//   currency:'INR'

// }
// console.log(new Intl.NumberFormat('en-US',options).format(num));
// console.log(new Intl.NumberFormat('de-DE',options).format(num));
// console.log(new Intl.NumberFormat('hi-IN',options).format(num));

////// TIMERS //////

//setTimeout
// const ingredients = ['olives','spinach']
// const timer = setTimeout((ing1,ing2)=>console.log(`here is your pizza with ${ing1} and ${ing2}`),3000,...ingredients)
// console.log('Waiting');

// //clearTimeout
// if(ingredients.includes('spinach')) clearTimeout(timer);

//setInterval
// setInterval(function(){
//   const now = new Date();
//   const hours = now.getHours();
//   const min = now.getMinutes();
//   const sec = now.getSeconds()
//   // console.log(`${hours}:${min}:${sec}`);
// },1000)