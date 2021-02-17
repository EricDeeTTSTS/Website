/* 1-14-2021
Author: Eric Dee
http://EricDeeTTSTS.com/ */

var WelcomeString = "Operation successful. Enter a command.";
var OsString = "Operation successful.";
var ErrorString = "There was an error.";
var TyperCounter = 0;
var Speed = 270;

function PrintCommandConsoles(index) {
    Precursor();
    switch (index) {
        case 0:
            GetConsoleElementsI();
            break;
        case 1:
            GetConsoleElementsO();
            break;
        case 2:
            GetConsoleElementsO();
            break;
        case 3:
            GetConsoleElementsO();
            break;
        case 4:
            GetConsoleElementsO();
            break;
        case 5:
            GetConsoleElementsO();
            break;
        case 6:
            GetConsoleElementsE();
            break;
        default:
            return;
    }
}

function GetConsoleElementsI() {

    if (TyperCounter < WelcomeString.length) {
        document.getElementById("MainConsolePrivacy").innerHTML += WelcomeString.charAt(TyperCounter);
        GetArticleConsoleElements();
        TyperCounter++;
        setTimeout(GetConsoleElementsI, Speed);
    }
    else if (TyperCounter === WelcomeString.length) {
        document.getElementById("MainConsolePrivacy").innerHTML = WelcomeString;
        TyperCounter++;
    }
}

function GetConsoleElementsO() {
    if (TyperCounter < OsString.length) {
        document.getElementById("MainConsolePrivacy").innerHTML += OsString.charAt(TyperCounter);
        GetArticleConsoleElements();
        TyperCounter++;
        setTimeout(GetConsoleElementsO, Speed);
    }
    else if (TyperCounter === OsString.length) {
        document.getElementById("MainConsolePrivacy").innerHTML = OsString;
        TyperCounter++;
    }
}

function GetConsoleElementsE() {
    if (TyperCounter < ErrorString.length) {
        document.getElementById("MainConsolePrivacy").innerHTML += ErrorString.charAt(TyperCounter);
        GetArticleConsoleElements();
        TyperCounter++;
        setTimeout(GetConsoleElementsE, Speed);
    }
    else if (TyperCounter === ErrorString.length) {
        document.getElementById("MainConsolePrivacy").innerHTML = ErrorString;
        TyperCounter++;
    }
}

function GetArticleConsoleElements() {
    if (TyperCounter < Kernel1Array.length) {
        document.getElementById("ChildConsole1").innerHTML += Kernel1Array[TyperCounter];
    }
    if (TyperCounter < Kernel2Array.length) {
        document.getElementById("ChildConsole2").innerHTML += Kernel2Array[TyperCounter];
    }
}

var Kernel1Array = [""];

var Kernel2Array = ["</br>go index"];
Kernel2Array.push("</br>go projects");
Kernel2Array.push("</br>go resume");
Kernel2Array.push("</br>view history");
Kernel2Array.push("</br>view roadmap");
Kernel2Array.push("</br>view sourcecode");
Kernel2Array.push("</br>reset");

/* Cursor utilities */

function Precursor() {
    var Precursor = "... "
    document.getElementById("MainConsolePrivacy").innerHTML = Precursor;
}