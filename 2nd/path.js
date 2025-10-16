// path.js
const path = require("path");

console.log(__filename);
console.log(path.basename(__filename));
console.log(path.basename(__filename, ".js"));

console.log(path.delimiter);

console.log(path.dirname(__filename));

console.log(path.extname("path.js"));

console.log(path.sep);

const myURL = new URL(
  "https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash"
);
console.log(myURL);
console.log(myURL.hash);

myURL.hash = "baz";
console.log(myURL.href);

console.log(myURL.searchParams.get("query"));
console.log(myURL.searchParams.keys());
console.log(myURL.searchParams.values());
console.log(myURL.searchParams.getAll("query"));
myURL.searchParams.append("user", "admin");
myURL.searchParams.set("user", "admin");
myURL.searchParams.delete("user", "admin");
console.log(myURL.searchParams);
console.log(myURL.searchParams, toString());

const url = require("url");
console.log(myURL);
console.log(
  url.parse("https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash")
);
