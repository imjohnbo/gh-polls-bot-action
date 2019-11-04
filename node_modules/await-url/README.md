# await-url [![Build status for await-url on Circle CI.](https://img.shields.io/circleci/project/sholladay/await-url/master.svg "Circle Build Status")](https://circleci.com/gh/sholladay/await-url "Await URL Builds")

> Wait for a given URL to continue.

## Why?

 - Alias a deployment when it is ready.
 - Run a health check on your service.
 - Know when it is safe to share.

## Install

```sh
npm install await-url --global
```

## Usage

```sh
$ await-url --help

  Usage
    $ await-url <url>

  Option
    --tries     Maximum number of polling attempts
    --interval  Milliseconds to wait between tries

  Example
    $ await-url example.com/status
    $ await-url example.com --tries=3 --interval=1000
```

Waiting until a URL returns 200 OK is especially useful to avoid sending traffic to it before it is ready.

Please consider whether a more efficient, event-based model is available to you before using this.

## Option

### tries

Type: `number`<br>
Default: `1200`

Maximum number of polling attempts to make before timing out.

### interval

Type: `number`<br>
Default: `1200`

Number of milliseconds to wait between polling attempts.

## Contributing

See our [contributing guidelines](https://github.com/sholladay/await-url/blob/master/CONTRIBUTING.md "The guidelines for participating in this project.") for more details.

1. [Fork it](https://github.com/sholladay/await-url/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/await-url/compare "Submit code to this project for review.").

## License

[MPL-2.0](https://github.com/sholladay/await-url/blob/master/LICENSE "The license for await-url.") © [Seth Holladay](http://seth-holladay.com "Author of await-url.")

Go make something, dang it.
