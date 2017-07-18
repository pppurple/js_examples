import { OAuth } from "oauth";

function createTwitterOAuth() {
  return new OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    "g2WNgMQkS3A6S28cYHF9yXnmI",
    "YotVvOprRjeWo1UHPDeQ1oBAT9Gmd8cBWryIEM7IXmsBlekz45",
    "1.0A",
    null,
    "HMAC-SHA1"
  );
}

export default createTwitterOAuth;