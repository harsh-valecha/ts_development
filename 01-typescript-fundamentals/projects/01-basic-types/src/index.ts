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
// console.log(calculateTax(200));
// console.log(calculateTax(500, 0.001));

// object and arrays
// 1. typed object literals
let user: { id: number; name: string; isAdmin: boolean } = {
  id: 123,
  name: "bhalla",
  isAdmin: true,
};

// type or interface is preferred
type Product = {
  id: string;
  title: string;
  price: number;
};

const item: Product = {
  id: "P123",
  title: "tathubrush",
  price: 456,
};

// typed arrays
// array type notation
const scores: number[] = [12, 45, 56];

// generic array notation
const tags: Array<string> = ["javascript", "typescript", "web"];

//array of type objects
const items: Product[] = [
  item,
  { id: "P345", title: "dant manjan", price: 23.45 },
];

// tuples : fixed length array with specific type in each position
let httpResponse: [number, string] = [200, "OK"];

// Read only objects
// readonly property prevents reassignment after creation
type Config = {
  readonly apiKey: string;
  endpoint: string;
};

const appConfig: Config = {
  apiKey: "234e2345",
  endpoint: "webluto.com",
};

// console.log(appConfig);
// appConfig.apiKey = "456a231"; -- not allowed
appConfig.endpoint = "totaldhamal.com";
// console.log(appConfig);

// readonly arrays
const immutableScores: readonly number[] = [100, 99, 45];

// ReadonlyArray generic alternative
const fixedTags: ReadonlyArray<string> = ["Pass", "Fail"];

// as const assertion for converting the object / array as const
const appSettings = {
  theme: "Dark",
  maxUploadmb: 25,
  allowedFormats: ["jpg", "png"],
} as const;

// appSettings.theme = "Light";  shows typescript error but does updates it

// string literal union types
type Status = "pending" | "active" | "done";
// let currentStatus: Status = "archive"; -- not allowed error comes

// switching between literal unions
function getStatusBadgeColor(status: Status): string {
  switch (status) {
    case "pending":
      return "yellow";
    case "active":
      return "green";
    case "done":
      return "blue";
  }
}

// console.log(getStatusBadgeColor("active"));

// type narrowing - example narrowing the primitive type at runtime
function formatInput(val: string | number): string {
  if (typeof val === "string") {
    return val.trim().toUpperCase();
  }
  return val.toFixed(2);
}

// console.log(formatInput("2345"));
// console.log(formatInput("hey bruh"));

// checking if a specific property exists in a object using in
type Admin = { name: string; permissions: string[] };
type User = { name: string; email: string };

function printDetails(person: Admin | User) {
  if ("permissions" in person) {
    console.log(`Admin with ${person.permissions.length} permissions`);
  } else {
    console.log(`user's email ${person.email}`);
  }
}

printDetails({ name: "Jaktap", permissions: ["hullad", "gullad"] });
printDetails({ name: "Kamlesh", email: "Kamleshchattu@gmail.com" });

// discriminated union - shared property in two types union
type SuccessState = { kind: "success"; data: string };
type ErrorState = { kind: "Error"; data: string };
type State = ErrorState | SuccessState;

function handleResponse(state: State) {
  switch (state.kind) {
    case "success":
      return `Loaded: ${state.data}`;
    case "Error":
      return `Loaded: ${state.data}`;
  }
}

let passState: State = { kind: "success", data: "Total Pass" };
let failState: State = { kind: "Error", data: "Error 404" };

// console.log(handleResponse(passState));
// console.log(handleResponse(failState));

type user = {
  name: string;
  age?: number; // age is optional
};

const user1: user = { name: "Kamlesh" };
const user2: user = { name: "layla", age: 23 };

//optional parameter
function greet(name: string, title?: string) {
  return `hello ${title ? title + " " : ""}${name}`;
}

console.log(greet(user1.name));
console.log(greet(user2.name, "Jing"));

// nullable and undefined types
type Profile = {
  bio: string | null;
  avatar: string;
  middleName: string | undefined;
};

const trailer: Profile = {
  bio: null,
  avatar: "bhoola",
  middleName: undefined,
};
