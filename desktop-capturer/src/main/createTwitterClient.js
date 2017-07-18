class TwitterClient {
  constructor(oauth, oauthAccessToken, oauthAccessSecret) {
    this.oauth = oauth;
    this.oauthAccessToken = oauthAccessToken;
    this.oauthAccessSecret = oauthAccessSecret;
  }

  verifyCredentials() {
    return new Promise((resolve, reject) => {
      this.oauth.get(
        "https://api.twitter.com/1.1/account/verify_credentials.json",
        this.oauthAccessToken,
        this.oauthAccessSecret,
        (error, data) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(JSON.parse(data));
          }
        }
      );
    });
  }

  uploadMedia(params) {
    return new Promise((resolve, reject) => {
      this.oauth.post(
        "https://upload.twitter.com/1.1/media/upload.json",
        this.oauthAccessToken,
        this.oauthAccessSecret,
        params,
        "application/x-www-form-urlencoded",
        (error, data) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(JSON.parse(data));
          }
        }
      );
    });
  }

  updateStatuses(params) {
    return new Promise((resolve, reject) => {
      this.oauth.post(
        "https://api.twitter.com/1.1/statuses/update.json",
        this.oauthAccessToken,
        this.oauthAccessSecret,
        params,
        "application/x-www-form-urlencoded",
        (error, data) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(JSON.parse(data));
          }
        }
      );
    });
  }
}

function createTwitterClient(oauth, oauthAccessToken, oauthAccessSecret) {
  return new TwitterClient(oauth, oauthAccessToken, oauthAccessSecret);
}

export default createTwitterClient;