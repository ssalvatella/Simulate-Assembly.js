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
    var ast = parse(TokenStream(InputStream(getCode())));
    interpreter(ast);
    $("#play").removeClass("not_clickable");
});

$( document ).ready(function() {
    refreshRegisters();
});
