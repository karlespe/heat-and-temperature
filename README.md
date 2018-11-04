# Temperature Conversion Calculator

A VueJS JavaScript application user interface for a temperature conversion calculator.


## Install

Clone this repository from Github and then run the following.

```sh
npm install
```

### Run the application

```sh
npm run dev
```
The application will be served at http://localhost:8080.

### Run the automated test suite

```sh
npm run test
```

## Continuous Integration / Continuous Deploy Pipeline

Github, AWS CodeBuild, AWS CodePipeline, and AWS S3 are used for a CI/CD pipeline.

Code reviews are conducted using branches against this repository's master. Once code is reviewed, it can be merged into master. AWS  CodePipeline watches
for the commit to master and initiates build, test, and deploy stages (using AWS CodeBuild) automatically.
If tests pass and the build succeeds, artifacts are copied to the S3 static website and deployed automatically to the live environment.

The AWS S3 static website is located at: [http://karlespe-flexion-web.s3-website-us-east-1.amazonaws.com](http://karlespe-flexion-web.s3-website-us-east-1.amazonaws.com "Calculator").

