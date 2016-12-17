
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

/* FLAGS */
var N;
var Z;
var C;
var V;
/* ----- */

var currentToken;
var currentLine = 0;

var labels = [];

function interpreter(prog) {
    initialize();
    var instructions = prog.prog;
    for (currentToken = 0; currentToken < instructions.length; currentToken++) {
        if (instructions[currentToken].type == "lab") {
            labels.push({name: instructions[currentToken].value, line: currentLine, tocken: currentToken});
        } else {
            window[instructions[currentToken].value](instructions);
        }
        pc = currentLine * 4
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

    N = 0;
    Z = 0;
    C = 0;
    V = 0;
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

    $('#N').text(N);
    $('#Z').text(Z);
    $('#C').text(C);
    $('#V').text(V);
}

function mov(instructions) {
    currentToken++;
    var register = instructions[currentToken].value;
    currentToken++; // the ','
    currentToken++;
    var secondParameter = instructions[currentToken];
    if (secondParameter.type === "num") {
        window[register] = secondParameter.value;
    } else if(secondParameter.type === "var") {
        window[register] = window[secondParameter.value];
    } else {
        throw new Error("Error executing instruction MOV, invalid sintax in line " + currentLine);
    }
}

function add(instructions) {
    currentToken++;
    var register = instructions[currentToken].value;
    currentToken++; // the ','
    currentToken++;
    var secondParameter = instructions[currentToken];
    if (secondParameter.type === "var") {
        window[register] = window[secondParameter.value];
        currentToken++; // the ','
        currentToken++;
        var thirdParameter = instructions[currentToken];
        if (thirdParameter.type === "var") {
            window[register] += window[thirdParameter.value];
        } else  if (thirdParameter.type === "num") {
            window[register] += thirdParameter.value;
         } else {
            throw new Error("Error executing instruction ADD, invalid sintax in line " + currentLine);
        }
    } else {
        throw new Error("Error executing instruction ADD, invalid sintax in line " + currentLine);
    }
}

function b(instructions) {
    currentToken++;
    var label = instructions[currentToken];
    if (label.type === "lab_call") {
        var lab = returnLabel(label.value);
        if (lab) {
            currentToken = lab.tocken;
            currentLine = lab.line;
        } else {
            throw new Error("Error executing instruction B, label not defined in line " + currentLine);
        }
    } else {
        throw new Error("Error executing instruction B, invalid sintax in line " + currentLine);
    }
}

function bne(instructions) {
    currentToken++;
    var label = instructions[currentToken];
    if (label.type === "lab_call") {
        var lab = returnLabel(label.value);
        if (lab) {
            if (Z != 1) {
                currentToken = lab.tocken;
                currentLine = lab.line;
            }
        } else {
            throw new Error("Error executing instruction B, label not defined in line " + currentLine);
        }
    } else {
        throw new Error("Error executing instruction B, invalid sintax in line " + currentLine);
    }
}

function cmp(instructions) {
    currentToken++;
    var register = instructions[currentToken].value;
    currentToken++; // the ','
    currentToken++;
    var secondParameter = instructions[currentToken];
    if (secondParameter.type === "var") {
        var comparison = window[register] - window[secondParameter.value];
    } else if (secondParameter.type === "num") {
        var comparison = window[register] - secondParameter.value;
    } else {
        throw new Error("Error executing instruction CMP, invalid sintax in line " + currentLine);
    }
    if (comparison == 0) {
        N = 0;
        Z = 1;
    } else if(comparison > 0) {
        N = 0;
        Z = 0;
    } else {
        N = 1;
        Z = 0;
    }
}

function returnLabel(labelName) {
    for(var i = 0; i < labels.length; i++) {
        var label = labels[i];
        if (labelName === label.name.slice(0, -1)) {
            return label;
        }
    }
}