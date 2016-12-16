
$(".code").keydown(function(e)
{
    e = e || window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == 9)
    {
        e.preventDefault();
        document.execCommand('styleWithCSS',true,null);
        document.execCommand('indent',true,null);
        var ast = parse(TokenStream(InputStream(getCode())));
        interpreter(ast);
    }

});

function getCode() {
    var code = $(".code").html();
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