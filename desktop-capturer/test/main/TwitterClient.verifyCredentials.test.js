import createTwitterOAuth from "../../src/main/createTwitterOAuth";
import createTwitterClient from "../../src/main/createTwitterClient";

const client = createTwitterClient(
  createTwitterOAuth(),
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
);

client.verifyCredentials().then(data => {
  console.log(data);
}).catch(error => {
  console.log(error);
});