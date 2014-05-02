
function highlightLines(jPre, lineNumber, secondLineNumber, connected) {
    var line, secondLine, lineHeight = parseFloat(jPre.css("line-height"));

    line = jPre.find(".line-highlight").eq(0);
    secondLine = jPre.find(".line-highlight").eq(1);
    line.show();


    line.css("top", lineNumber * Math.floor(lineHeight) + 'px');

    if (connected === true) {
        //create a bunch of new lines, which will cause this to highlight multiple lines
        line.text(new Array(secondLineNumber - lineNumber + 2).join(' \r\n'));
        secondLine.hide();
    } else if (secondLineNumber !== undefined) {
        secondLine.css("top", secondLineNumber * Math.floor(lineHeight) + 'px');
        secondLine.show();
    } else {
        line.text("\r\n");
        secondLine.hide();
    }
}


function getMouseOverLine(jPre, yOffset) {
    var lineHeight = parseFloat(jPre.css("line-height"));
    return Math.floor((yOffset - 5) / lineHeight);
}

function handleHighlightsAndComment(jComment, selectedLine, enclosingObject) {
    var dataString = jComment.data("show");
    if (typeof (dataString) == "string") {
        if (dataString.indexOf("-") != -1) {

        } else if (dataString.indexOf("+") != -1) {

        }
        else {
            console.log("not supported data string " + dataString);
        }
    }
    else {
        if (selectedLine == (dataString - 1)) {
            jComment.show();
            highlightLines(enclosingObject, selectedLine);
            return true;
        }
    }
	highlightLines(enclosingObject, selectedLine);
    return false;
}

$(document).ready(function () {
    console.log("codeCommentary.js");
    $(".codeContainer").on("mousemove", "pre", function (e) {
        var selectedLine, y, comments, enclosingObject = $(this);

        y = e.offsetY === undefined ? e.layerY : e.offsetY;

        selectedLine = getMouseOverLine(enclosingObject, y);

        comments = enclosingObject.closest(".codeContainer").find(".mouseComment");
        comments.hide();

        comments.each(function (i, element) {
            if (handleHighlightsAndComment($(element), selectedLine, enclosingObject)) {
                //break
                return false;
            }
        });




    });
});