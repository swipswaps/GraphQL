# GraphQL

[![RibbonBlockchain](https://c.gitcoin.co/grants/266ae3c2f17c8abc6125b66669d82ad5/RibBlockchainLogo-Final.jpg)](https://ribbonblockchain.com)

Ribbon Blockchain is a Public Health Incentives platform that adds a tokenization layer to any national public health system used to channel donated, pledged or sponsored funding for health and wellness related behavioral incentives. Funding is sent directly to patients, community health workers and healthcare practitioners where incentives are used to improve prevention, adherence, quality care delivery and overall population health outcomes.

## Getting Started

Ensure you have git installed - https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
Next,proceed to clone this repository

```
$ git clone https://github.com/RibbonBlockchain/GraphQL.git

```

Assuming you have Node and npm installed, proceed to install the project's dependencies
Ensure you are in the `GraphQL` directory before proceeding the run the command below

```
npm install
```

This should install all javascript related dependencies required for the project.

Install `AWS SAM CLI` tool first if you don't have it installed already.
https://github.com/awslabs/aws-sam-cli/blob/develop/docs/installation.rst

Install `AWS CLI` on your local system by running this command `pip install awscli --upgrade --user`
After AWS CLI installation, run `aws configure` to configure your aws key and secret.

You should now proceed to set this key and secret pair as environmnet variables by creating a `.env` file in the root directory of this repo.

You can read more on how to set environment variables in a .env file
[Setting environment variables in Javascript](https://medium.freecodecamp.org/heres-how-you-can-actually-use-node-environment-variables-8fdf98f53a0a)

If you go through the dependencies in the `package.json` file, you would notice a package `dotenv`. This package helps us load environment
variables from the `.env` file we created earlier

Any file which requires your keys , simply add this line ontop to initialize `dotenv`

```
require('dotenv').load();
```

Now,the environment variables can be accessed in the file as shown :

```
accessKeyId: process.env.AWS_ACCESS_KEY_ID,
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

```

Better still follow this link [Configuring AWS](https://docs.aws.amazon.com/cli/latest/userguide/installing.html) to understand better on how to configure AWS on your local machine.

## Testing Lambda Functions Locally

The lambda function are stored in the `index.js` file. We can invoke the lambda function locally,by using an npm package called lambda-local.
You can install this package globally on your system as it's not exactly a project dependency

https://www.npmjs.com/package/lambda-local

The link shows more on how to use the package to invoke the lambda functions locally. Not that you must have configured your AWS Access key and secret
key for this package to have access to the requested resources on AWS

## Questions?

Get in touch with the dev team.
