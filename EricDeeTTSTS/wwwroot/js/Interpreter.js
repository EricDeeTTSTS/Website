/* 1-3-2021
Author: Eric Dee
http://EricDeeTTSTS.com/ */

var Begin = false;
var InputInstruction = [];
var Index = 0;
var Input = false;

function BuildFromIndex() {

    if (Input === true) {
        InputInstruction.push(document.getElementById("KeyboardInput").value);
        LanguageMap();
        UserInputSwitch = 0;
    }
}

function Build() {

    Input = true;
    if (Begin === false) { Continue = true; Begin = true; }
    if (Continue === false) {
        Index++;
        Continue = true;
    }
    BuildFromIndex();
}

var CharIndex = 0;
var StringBuilder = [];
var StringIndex = 0;
var CharCountFromInstructionString = 0;
var SubtractiveCountWhichBeganFromInstruction = 0;
var CharCountFromBuiltString = 0;
var Continue = false;
var ASCIICurrent = 0;
var ASCIILookahead = 0;
var EmergencyExit = 0;

function LanguageMap() {

    EmergencyExit = 0;
    CharIndex = 0;
    CharCountFromInstructionString = InputInstruction[Index].length;
    SubtractiveCountWhichBeganFromInstruction = CharCountFromInstructionString;

    do {
        if (Continue === false) { return; }

        StringBuilder[StringIndex] = InputInstruction[Index].charAt(CharIndex); /* Allocates. Don't delete. Also saves current position (Instruction pointer) */
        CharIndex++;

        do {
            ASCIICurrent = InputInstruction[Index].charCodeAt(CharIndex - 1);
            ASCIILookahead = InputInstruction[Index].charCodeAt(CharIndex); /* Allows computer to tell what's coming like a human does */

            if (EmergencyExit === 900) { break; }
            if (ASCIICurrent < 65) { CharIndex--; SubtractiveCountWhichBeganFromInstruction++; break; } /* If non alphabetical char during inner loop (looking for a valid instruction), move on, but set index not to skip. */
            if (ASCIILookahead === 46) { break; } /* If period, move on */

            StringBuilder[StringIndex] += InputInstruction[Index].charAt(CharIndex);
            CharIndex++;
            EmergencyExit++;

        } while (InputInstruction[Index].charCodeAt(CharIndex) != 32);

        EmergencyExit++;
        CharCountFromBuiltString = StringBuilder[StringIndex].length;
        Lexer();
        Parser();
        SubtractiveCountWhichBeganFromInstruction = SubtractiveCountWhichBeganFromInstruction - CharCountFromBuiltString;

        /* The computer reads letter by letter (like a human does), and subtracts it from what it saw at the beginning */

        ASCIIValidation();

        if (SubtractiveCountWhichBeganFromInstruction > 0) { CharIndex++; }
        if (SubtractiveCountWhichBeganFromInstruction === 0) { Continue = false; }

        if (EmergencyExit === 900) { break; } /* The subtraction only results properly when instructions are found */
        // Essentially what it does is run an infinite loop and just wait until something it recognizes appears
        // It'd get stuck like this if someone just wrote jibberish, so it exits if the wait time has been unreasonable
        // This method also means that only valid instructions work. To actually do two instructions in a row, they must be complete.
        // Example:
        /* Hey! Make red, then end. Then make green. <-- Will turn it red, then green and ignore the rest
         * Hey! Make red, then end. Then green. <-- Will turn it red, then terminate and become available for the next input. */

    } while (Continue === true);
}

function ASCIIValidation() {
    InstructionValidationASCIILookahead = InputInstruction[Index].charCodeAt(CharIndex);
    if (InstructionValidationASCIILookahead < 65) { SubtractiveCountWhichBeganFromInstruction--; }

    /* The interpreter reads like a person. If it sees a space in advance, it knows to skip it during the substantial loop. */
}

/*
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

var Switch = 0;
var Case = 0;
var Hold = false;
var LexerIndex = 0;

function Lexer() {

    LexerIndex = 0;

    if (CharCountFromBuiltString === 2) {

        do {
            if (Switch === 1) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "g" || StringBuilder[StringIndex].charAt(LexerIndex) === "G") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "o" || StringBuilder[StringIndex].charAt(LexerIndex) === "O") { LexerIndex++; Switch = 1; } else { LexerIndex = 0; break; }
        } while (Switch === 0);

        do {
            if (Switch === 2) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "t" || StringBuilder[StringIndex].charAt(LexerIndex) === "T") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "o" || StringBuilder[StringIndex].charAt(LexerIndex) === "O") { LexerIndex++; Switch = 2; } else { LexerIndex = 0; break; }
        } while (Switch === 0);
    }

    if (CharCountFromBuiltString === 3) {

        do {
            if (Case === 1) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "r" || StringBuilder[StringIndex].charAt(LexerIndex) === "R") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "e" || StringBuilder[StringIndex].charAt(LexerIndex) === "E") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "d" || StringBuilder[StringIndex].charAt(LexerIndex) === "D") { LexerIndex++; Case = 1; } else { LexerIndex = 0; break; }
        } while (Case === 0);
    }

    if (CharCountFromBuiltString === 4) {

        do {
            if (Case === 2) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "b" || StringBuilder[StringIndex].charAt(LexerIndex) === "B") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "l" || StringBuilder[StringIndex].charAt(LexerIndex) === "L") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "u" || StringBuilder[StringIndex].charAt(LexerIndex) === "U") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "e" || StringBuilder[StringIndex].charAt(LexerIndex) === "E") { LexerIndex++; Case = 2; } else { LexerIndex = 0; break; }
        } while (Case === 0);

        do {
            if (Case === 3) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "g" || StringBuilder[StringIndex].charAt(LexerIndex) === "G") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "r" || StringBuilder[StringIndex].charAt(LexerIndex) === "R") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "a" || StringBuilder[StringIndex].charAt(LexerIndex) === "A" || String[StringIndex].charAt(LexerIndex) === "e" || String[StringIndex].charAt(LexerIndex) === "E") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "y" || StringBuilder[StringIndex].charAt(LexerIndex) === "Y") { LexerIndex++; Case = 3; } else { LexerIndex = 0; break; }
        } while (Case === 0);

        do {
            if (Case === 16) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "i" || StringBuilder[StringIndex].charAt(LexerIndex) === "I") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "n" || StringBuilder[StringIndex].charAt(LexerIndex) === "N") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "f" || StringBuilder[StringIndex].charAt(LexerIndex) === "F" || String[StringIndex].charAt(LexerIndex) === "e" || String[StringIndex].charAt(LexerIndex) === "E") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "o" || StringBuilder[StringIndex].charAt(LexerIndex) === "O") { LexerIndex++; Case = 16; } else { LexerIndex = 0; break; }
        } while (Case === 0);

        do {
            if (Case === 4) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "p" || StringBuilder[StringIndex].charAt(LexerIndex) === "P") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "i" || StringBuilder[StringIndex].charAt(LexerIndex) === "I") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "n" || StringBuilder[StringIndex].charAt(LexerIndex) === "N") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "k" || StringBuilder[StringIndex].charAt(LexerIndex) === "K") { LexerIndex++; Case = 4; } else { LexerIndex = 0; break; }
        } while (Case === 0);

        do {
            if (Switch === 1) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "v" || StringBuilder[StringIndex].charAt(LexerIndex) === "V") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "i" || StringBuilder[StringIndex].charAt(LexerIndex) === "I") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "e" || StringBuilder[StringIndex].charAt(LexerIndex) === "E") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "w" || StringBuilder[StringIndex].charAt(LexerIndex) === "W") { LexerIndex++; Switch = 1; } else { LexerIndex = 0; break; }
        } while (Switch === 0);

    }

    if (CharCountFromBuiltString === 5) {

        do {
            if (Case === 5) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "b" || StringBuilder[StringIndex].charAt(LexerIndex) === "B") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "l" || StringBuilder[StringIndex].charAt(LexerIndex) === "L") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "a" || StringBuilder[StringIndex].charAt(LexerIndex) === "A") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "c" || StringBuilder[StringIndex].charAt(LexerIndex) === "C") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "k" || StringBuilder[StringIndex].charAt(LexerIndex) === "K") { LexerIndex++; Case = 5; } else { LexerIndex = 0; break; }
        } while (Case === 0);

        do {
            if (Case === 6) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "b" || StringBuilder[StringIndex].charAt(LexerIndex) === "B") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "r" || StringBuilder[StringIndex].charAt(LexerIndex) === "R") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "o" || StringBuilder[StringIndex].charAt(LexerIndex) === "O") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "w" || StringBuilder[StringIndex].charAt(LexerIndex) === "W") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "n" || StringBuilder[StringIndex].charAt(LexerIndex) === "N") { LexerIndex++; Case = 6; } else { LexerIndex = 0; break; }
        } while (Case === 0);

        do {
            if (Case === 7) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "g" || StringBuilder[StringIndex].charAt(LexerIndex) === "G") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "r" || StringBuilder[StringIndex].charAt(LexerIndex) === "R") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "e" || StringBuilder[StringIndex].charAt(LexerIndex) === "E") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "e" || StringBuilder[StringIndex].charAt(LexerIndex) === "E") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "n" || StringBuilder[StringIndex].charAt(LexerIndex) === "N") { LexerIndex++; Case = 7; } else { LexerIndex = 0; break; }
        } while (Case === 0);

        do {
            if (Case === 8) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "i" || StringBuilder[StringIndex].charAt(LexerIndex) === "I") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "n" || StringBuilder[StringIndex].charAt(LexerIndex) === "N") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "d" || StringBuilder[StringIndex].charAt(LexerIndex) === "D") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "e" || StringBuilder[StringIndex].charAt(LexerIndex) === "E") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "x" || StringBuilder[StringIndex].charAt(LexerIndex) === "X") { LexerIndex++; Case = 8; } else { LexerIndex = 0; break; }
        } while (Case === 0);

        do {
            if (Case === 9) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "w" || StringBuilder[StringIndex].charAt(LexerIndex) === "W") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "h" || StringBuilder[StringIndex].charAt(LexerIndex) === "H") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "i" || StringBuilder[StringIndex].charAt(LexerIndex) === "I") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "t" || StringBuilder[StringIndex].charAt(LexerIndex) === "T") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "e" || StringBuilder[StringIndex].charAt(LexerIndex) === "E") { LexerIndex++; Case = 9; } else { LexerIndex = 0; break; }
        } while (Case === 0);

        do {
            if (Case === 18) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "r" || StringBuilder[StringIndex].charAt(LexerIndex) === "R") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "e" || StringBuilder[StringIndex].charAt(LexerIndex) === "E") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "s" || StringBuilder[StringIndex].charAt(LexerIndex) === "S") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "e" || StringBuilder[StringIndex].charAt(LexerIndex) === "E") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "t" || StringBuilder[StringIndex].charAt(LexerIndex) === "T") { LexerIndex++; Case = 18; } else { LexerIndex = 0; break; }
        } while (Case === 0);
    }

    if (CharCountFromBuiltString === 6) {

        do {
            if (Case === 10) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "o" || StringBuilder[StringIndex].charAt(LexerIndex) === "O") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "r" || StringBuilder[StringIndex].charAt(LexerIndex) === "R") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "a" || StringBuilder[StringIndex].charAt(LexerIndex) === "A") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "n" || StringBuilder[StringIndex].charAt(LexerIndex) === "N") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "g" || StringBuilder[StringIndex].charAt(LexerIndex) === "G") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "e" || StringBuilder[StringIndex].charAt(LexerIndex) === "E") { LexerIndex++; Case = 10; } else { LexerIndex = 0; break; }
        } while (Case === 0);

        do {
            if (Case === 11) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "p" || StringBuilder[StringIndex].charAt(LexerIndex) === "P") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "u" || StringBuilder[StringIndex].charAt(LexerIndex) === "U") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "r" || StringBuilder[StringIndex].charAt(LexerIndex) === "R") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "p" || StringBuilder[StringIndex].charAt(LexerIndex) === "P") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "l" || StringBuilder[StringIndex].charAt(LexerIndex) === "L") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "e" || StringBuilder[StringIndex].charAt(LexerIndex) === "E") { LexerIndex++; Case = 11; } else { LexerIndex = 0; break; }
        } while (Case === 0);

        do {
            if (Case === 13) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "y" || StringBuilder[StringIndex].charAt(LexerIndex) === "Y") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "e" || StringBuilder[StringIndex].charAt(LexerIndex) === "E") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "l" || StringBuilder[StringIndex].charAt(LexerIndex) === "L") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "l" || StringBuilder[StringIndex].charAt(LexerIndex) === "L") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "o" || StringBuilder[StringIndex].charAt(LexerIndex) === "O") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "w" || StringBuilder[StringIndex].charAt(LexerIndex) === "W") { LexerIndex++; Case = 13; } else { LexerIndex = 0; break; }
        } while (Case === 0);
    }

    if (CharCountFromBuiltString === 7) {

        do {
            if (Case === 17) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "h" || StringBuilder[StringIndex].charAt(LexerIndex) === "H") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "i" || StringBuilder[StringIndex].charAt(LexerIndex) === "I") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "s" || StringBuilder[StringIndex].charAt(LexerIndex) === "S") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "t" || StringBuilder[StringIndex].charAt(LexerIndex) === "T") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "o" || StringBuilder[StringIndex].charAt(LexerIndex) === "O") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "r" || StringBuilder[StringIndex].charAt(LexerIndex) === "R") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "y" || StringBuilder[StringIndex].charAt(LexerIndex) === "Y") {
                if (Switch === 0) { Switch = 1; }
                Case = 17;
                LexerIndex++;
            } else { LexerIndex = 0; break; }
        } while (Case === 0);

        do {
            if (Case === 20) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "r" || StringBuilder[StringIndex].charAt(LexerIndex) === "R") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "o" || StringBuilder[StringIndex].charAt(LexerIndex) === "O") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "a" || StringBuilder[StringIndex].charAt(LexerIndex) === "A") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "d" || StringBuilder[StringIndex].charAt(LexerIndex) === "D") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "m" || StringBuilder[StringIndex].charAt(LexerIndex) === "M") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "a" || StringBuilder[StringIndex].charAt(LexerIndex) === "A") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "p" || StringBuilder[StringIndex].charAt(LexerIndex) === "P") {
                if (Switch === 0) { Switch = 1; }
                Case = 20;
                LexerIndex++;
            } else { LexerIndex = 0; break; }
        } while (Case === 0);
    }

    if (CharCountFromBuiltString === 8) {
        do {
            if (Case === 15) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "p" || StringBuilder[StringIndex].charAt(LexerIndex) === "P") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "r" || StringBuilder[StringIndex].charAt(LexerIndex) === "R") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "o" || StringBuilder[StringIndex].charAt(LexerIndex) === "O") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "j" || StringBuilder[StringIndex].charAt(LexerIndex) === "J") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "e" || StringBuilder[StringIndex].charAt(LexerIndex) === "E") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "c" || StringBuilder[StringIndex].charAt(LexerIndex) === "C") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "t" || StringBuilder[StringIndex].charAt(LexerIndex) === "T") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "s" || StringBuilder[StringIndex].charAt(LexerIndex) === "S") { LexerIndex++; Case = 15; } else { LexerIndex = 0; break; }
        } while (Case === 0);
    }

    if (CharCountFromBuiltString === 10) {
        do {
            if (Case === 21) { break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "s" || StringBuilder[StringIndex].charAt(LexerIndex) === "S") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "o" || StringBuilder[StringIndex].charAt(LexerIndex) === "O") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "u" || StringBuilder[StringIndex].charAt(LexerIndex) === "U") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "r" || StringBuilder[StringIndex].charAt(LexerIndex) === "R") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "c" || StringBuilder[StringIndex].charAt(LexerIndex) === "C") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "e" || StringBuilder[StringIndex].charAt(LexerIndex) === "E") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "c" || StringBuilder[StringIndex].charAt(LexerIndex) === "C") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "o" || StringBuilder[StringIndex].charAt(LexerIndex) === "O") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "d" || StringBuilder[StringIndex].charAt(LexerIndex) === "D") { LexerIndex++; } else { LexerIndex = 0; break; }
            if (StringBuilder[StringIndex].charAt(LexerIndex) === "e" || StringBuilder[StringIndex].charAt(LexerIndex) === "E") { LexerIndex++; Case = 21; } else { LexerIndex = 0; break; }
        } while (Case === 0);
    }
}

/*
 *
 *
 *
 *
 *
 *
 *
 *
 */

var UserLocation = 0;

function Parser() {

    do {

        if (Case === 18) {
            window.location.reload(true); /* Reset */
        }

        if (Switch === 1) {

            if (Case === 8) {
                var PostToIndex = "/?JSInput="; /* Index */
                PostToIndex += "0";
                PostToIndex += "&JSString=";
                PostToIndex += InputInstruction;
                UserLocation = 0;
                Switch = 0;
                window.location.href = PostToIndex;
            }

            if (Case === 15) {
                var PostToIndex = "/?JSInput="; /* Projects */
                PostToIndex += "2";
                PostToIndex += "&JSString=";
                PostToIndex += InputInstruction;
                UserLocation = 2;
                Switch = 0;
                window.location.href = PostToIndex;
            }

            if (Case === 17) {
                var PostToIndex = "/?JSInput="; /* History */
                PostToIndex += "3";
                UserLocation = 3
                PostToIndex += "&JSString=";
                PostToIndex += InputInstruction;
                Switch = 0;
                window.location.href = PostToIndex;
            }

            if (Case === 20) {
                var PostToIndex = "/?JSInput="; /* Roadmap */
                PostToIndex += "4";
                UserLocation = 4
                PostToIndex += "&JSString=";
                PostToIndex += InputInstruction;
                Switch = 0;
                window.location.href = "https://ericdeettsts.com/HTML/Roadmap/RoadmapLander.html";
            }

            if (Case === 21) {
                var PostToIndex = "/?JSInput="; /* Sourcecode */
                PostToIndex += "5";
                UserLocation = 5
                PostToIndex += "&JSString=";
                PostToIndex += InputInstruction;
                Switch = 0;
                window.location.href = "https://github.com/EricDeeTTSTS";
            }
        }

        if (Switch === 2) {

            if (Case === 1) { DrawTreeRightTop(TreeCanvasRightTop.width / 2, (TreeCanvasRightTop.height - 9), 90, 0, 27, 'red', 'green'); Case = 0; Switch = 0; break; }

            if (Case === 2) { DrawTreeRightTop(TreeCanvasRightTop.width / 2, (TreeCanvasRightTop.height - 9), 90, 0, 27, 'blue', 'green'); Case = 0; Switch = 0; break; }

            if (Case === 3) { DrawTreeRightTop(TreeCanvasRightTop.width / 2, (TreeCanvasRightTop.height - 9), 90, 0, 27, 'gray', 'green'); Case = 0; Switch = 0; break; }

            if (Case === 4) { DrawTreeRightTop(TreeCanvasRightTop.width / 2, (TreeCanvasRightTop.height - 9), 90, 0, 27, 'pink', 'green'); Case = 0; Switch = 0; break; }

            if (Case === 5) { DrawTreeRightTop(TreeCanvasRightTop.width / 2, (TreeCanvasRightTop.height - 9), 90, 0, 27, 'black', 'green'); Case = 0; Switch = 0; break; }

            if (Case === 6) { DrawTreeRightTop(TreeCanvasRightTop.width / 2, (TreeCanvasRightTop.height - 9), 90, 0, 27, 'brown', 'green'); Case = 0; Switch = 0; break; }

            if (Case === 7) { DrawTreeRightTop(TreeCanvasRightTop.width / 2, (TreeCanvasRightTop.height - 9), 90, 0, 27, 'green', 'green'); Case = 0; Switch = 0; break; }

            if (Case === 9) { DrawTreeRightTop(TreeCanvasRightTop.width / 2, (TreeCanvasRightTop.height - 9), 90, 0, 27, 'white', 'green'); Case = 0; Switch = 0; break; }

            if (Case === 10) { DrawTreeRightTop(TreeCanvasRightTop.width / 2, (TreeCanvasRightTop.height - 9), 90, 0, 27, 'orange', 'green'); Case = 0; Switch = 0; break; }

            if (Case === 11) { DrawTreeRightTop(TreeCanvasRightTop.width / 2, (TreeCanvasRightTop.height - 9), 90, 0, 27, 'purple', 'green'); Case = 0; Switch = 0; break; }

            if (Case === 13) { DrawTreeRightTop(TreeCanvasRightTop.width / 2, (TreeCanvasRightTop.height - 9), 90, 0, 27, 'yellow', 'green'); Case = 0; Switch = 0; break; }
        }

        /* document.body.style.backgroundColor = "Cyan"; */ /* This is here for error reporting purposes. */
        Case = 0;
        LexerIndex = 0;
        break;

    } while (Case === 0);
}