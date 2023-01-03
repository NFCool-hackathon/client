# NfcoolClient

Client repository for the Chainlink hackathon submission NFCool: https://devpost.com/software/nfc-for-real-goods 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.12. It provides a client interface to:
- Display all the account items
- Claim ownership
- Transfer Token
- Update token status

## Install the project

1. Clone or fork the project
2. Run `npm install`
3. In the root folder, create a file named `keys.env.ts`
4. In this file, add the following information:
```
export const websocketProvider = YOUR_INFURA_WEBSOCKET_PROVIDER;
```
5. Go in the following file `node_modules/@angular-devkit/build-angular/src/webpack/configs/browser.js` and add the following code under the `resolve` variable:
```
fallback:{
  http: require.resolve("stream-http"),
  https: require.resolve("https-browserify"),
  crypto: require.resolve("crypto-browserify"),
  stream:require.resolve("stream-browserify"),
  os:require.resolve("os-browserify/browser"),
  assert:require.resolve("assert/"),
}
```
6. Go into `src/environments` and create a file name `firebase.config.ts` and write inside:
```
export const firebaseConfig = {
  // Add Firebase Config here
};
```
7. Into the environment files, change de the contract addresses

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
