var editor = ace.edit("editor");
editor.setTheme("ace/theme/terminal");
editor.getSession().setMode("ace/mode/assembly_x86");
editor.setShowPrintMargin(false);
editor.resize();
editor.setOptions({
    fontFamily: "IBM-VGA8",
    fontSize: "12pt",
    maxLines: Infinity
});

$(".code").keydown(function(e)
{
    e = e || window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == 9)
    {
        e.preventDefault();
        document.execCommand('styleWithCSS',true,null);
        document.execCommand('indent',true,null);
    }

});

function getCode() {
    var editor = ace.edit("editor");
    var code = editor.getValue();
    var regex = /<br\s*[\/]?>/gi;
    code = code.replace(regex, "\n");
    code.replace(/<(?:.|\n)*?>/gm, '');
    code = code.replace(/&nbsp;+/gm, " ");
    code = code.toLowerCase();
    return code;
}

$("#play").click(function () {
    $("#play").addClass("not_clickable");
    enablePauseButton();
    enableStopButton();
    var ast = parse(TokenStream(InputStream(getCode())));
    interpreter(ast);
    $("#play").removeClass("not_clickable");
});

$("#step").click(function () {
    $("#step").addClass("not_clickable");
    enablePauseButton();
    enableStopButton();
    var ast = parse(TokenStream(InputStream(getCode())));
    interpreterStepToStep(ast);
    $("#step").removeClass("not_clickable");
});

$("#pause").click(function () {
    if (isRunning) {
        if (!isPaused) {
            isPaused = true;
            $("#pause").addClass("fa-step-forward");
        } else {
            isPaused = false;
            $("#pause").removeClass("fa-step-forward");
            $("#pause").addClass("fa-pause");
        }
    }
});

$("#stop").click(function () {
    stopAndRestart();
    disableStopButton();
    disablePauseButton();
    editor.gotoLine(0);
});

$( document ).ready(function() {
    refreshRegisters();
});

function enableStopButton() {
    $("#stop").addClass("clickable stop");
}

function disableStopButton() {
    $("#stop").removeClass("clickable stop");
}

function enablePauseButton() {
    $("#pause").addClass("clickable pause");
}

function disablePauseButton() {
    isPaused = false;
    $("#pause").removeClass("fa-step-forward clickable pause");
}
