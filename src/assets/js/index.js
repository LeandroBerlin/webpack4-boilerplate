import "bootstrap";
import "jquery";
import "@scss/styles.scss";
import logoImg from "@img/logo.png";


let filename = logoImg.substring(logoImg.lastIndexOf('/') + 1);
logo.src = `assets/img/${filename}`;

let message = "Hello Webpack";
console.log(` Message is: ${message}`);
