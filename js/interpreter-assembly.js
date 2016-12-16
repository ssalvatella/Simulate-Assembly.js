
/* REGISTERS */

var r0 = 0;
var r1 = 0;
var r2 = 0;
var r3 = 0;
var r4 = 0;
var r5 = 0;
var r6 = 0;
var r7 = 0;
var r8 = 0;
var r9 = 0;
var r10 = 0;
var r11 = 0;
var r12 = 0;
var r13 = 0;
var sp = 0;
var lr = 0;
var pc = 0;



/* --------- */

var currentToken;
var currentLine;

function interpreter(prog) {
    initialize();
    var instructions = prog.prog;
    for (currentToken = 0; currentToken < instructions.length; currentToken++) {
        window[instructions[currentToken].value](instructions);
        pc += 4
        currentLine++;
        refreshRegisters();
    }
}

function initialize() {
    r0 = 0;
    r1 = 0;
    r2 = 0;
    r3 = 0;
    r4 = 0;
    r5 = 0;
    r6 = 0;
    r7 = 0;
    r8 = 0;
    r9 = 0;
    r10 = 0;
    r11 = 0;
    r12 = 0;
    r13 = 0;
    sp = 0;
    lr = 0;
    pc = 0;
}

function refreshRegisters() {
    $('#r0').text(r0);
    $('#r1').text(r1);
    $('#r2').text(r2);
    $('#r3').text(r3);
    $('#r4').text(r4);
    $('#r5').text(r5);
    $('#r6').text(r6);
    $('#r7').text(r7);
    $('#r8').text(r8);
    $('#r9').text(r9);
    $('#r10').text(r10);
    $('#r11').text(r11);
    $('#r12').text(r12);
    $('#sp').text(sp);
    $('#lr').text(lr);
    $('#pc').text('0x' + pc.toString(16));
}

function mov(instructions) {
    currentToken++;
    var register = instructions[currentToken].value
    currentToken++; // the ','
    currentToken++;
    var secondParameter = instructions[currentToken];
    if (secondParameter.type == "num") {
        window[register] = secondParameter.value;
    } else if(secondParameter.type == "var") {
        window[register] = window[secondParameter.value];
    } else {
        throw new Error("Error executing instruction MOV, invalid sintax in line " + currentLine);
    }
}

function add(instructions) {
    currentToken++;
    var register = instructions[currentToken].value
    currentToken++; // the ','
    currentToken++;
    var secondParameter = instructions[currentToken];
    if (secondParameter.type == "var") {
        window[register] = window[secondParameter.value];
        currentToken++; // the ','
        currentToken++;
        var thirdParameter = instructions[currentToken];
        if (thirdParameter.type == "var") {
            window[register] += window[thirdParameter.value];
        } else  if (thirdParameter.type == "num") {
            window[register] += thirdParameter.value;
         } else {
            throw new Error("Error executing instruction ADD, invalid sintax in line " + currentLine);
        }
    } else {
        throw new Error("Error executing instruction ADD, invalid sintax in line " + currentLine);
    }
}