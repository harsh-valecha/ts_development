// primitives and inference
// let ts infer - when initialzing primitives directly type defining is redundant
// typescript infers types : string , integer and boolean automatically
let name = "Kamlesh Chaturvedi";
let marks = 200;
let isLoggedIn = false;

// const narrows primitive types to literal types
const role = "admin"; // inferred type : "admin" (literal: string)
const maxAttempt = 3;

// explicit type definitions where required
// Case A: uninitialised variables ( without annotation ts refers any)
let totalAmount: number;
totalAmount = 230.45;

// console.log(totalAmount, typeof totalAmount);
// case B : union type variable can hold multiple type of values
let userId: string | number;
userId = "user_991";
userId = 991;

// case C : widening the const literal back to primitive
const defaultString: string = "pending";

// case D: function signatures parameters always require signature
function calculateTax(amount: number, taxRate: number = 0.07) {
  return amount * taxRate;
}
console.log(calculateTax(200));
console.log(calculateTax(500, 0.001));
