/*global Prism*/
var highlightCorrection = -1;

function highlightLines(jPre, lineNumber, secondLineNumber, connected) {
    var line, secondLine, lineHeight = parseFloat(jPre.css("line-height"));

    lineNumber = lineNumber + highlightCorrection;
    if (secondLineNumber !== undefined) {
        secondLineNumber = secondLineNumber + highlightCorrection;
    }

    line = jPre.find(".line-highlight").eq(0);
    secondLine = jPre.find(".line-highlight").eq(1);
    line.show();


    line.css("top", lineNumber * Math.floor(lineHeight) + 'px');

    if (connected === true) {
        //create a bunch of new lines, which will cause this to highlight multiple lines
        line.text(new Array(secondLineNumber - lineNumber + 2).join(' \r\n'));
        secondLine.hide();
    } else if (secondLineNumber !== undefined) {
        line.text("\r\n");
        secondLine.css("top", secondLineNumber * Math.floor(lineHeight) + 'px');
        secondLine.show();
    } else {
        line.text("\r\n");
        secondLine.hide();
    }
}


function getMouseOverLine(jPre, yOffset) {
    var lineHeight = parseInt(jPre.css("line-height"));
    return Math.floor((yOffset + 1) / lineHeight);		//+1 to make mouseover have a more natural feel
}

function checkEndPointsForNum(first, second, test) {
    if (test === parseInt(first, 10) || test === parseInt(second, 10)) {
        return true;
    }
    return false;
}

function checkRangeForNum(first, second, test) {
    if (test >= parseInt(first, 10) && test <= parseInt(second, 10)) {
        return true;
    }
    return false;
}

//returns true if this comment is relevent to the selected line
function handleHighlightsAndComment(jComment, selectedLine, enclosingObject) {
    var dataString, splits;

    if (jComment !== undefined) {
        dataString = jComment.data("show");
    }

    if (typeof (dataString) == "string") {
        if (dataString.indexOf("-") != -1) {
            splits = dataString.split("-");
            if (checkRangeForNum(splits[0], splits[1], selectedLine)) {
                jComment.show();
                highlightLines(enclosingObject, parseInt(splits[0], 10), parseInt(splits[1], 10), true);
                return true;
            }
        } else if (dataString.indexOf("+") != -1) {
            splits = dataString.split("+");
            if (checkEndPointsForNum(splits[0], splits[1], selectedLine)) {
                jComment.show();
                highlightLines(enclosingObject, parseInt(splits[0], 10), parseInt(splits[1], 10));
                return true;
            }
        }
        else {
            console.log("not supported data string " + dataString);
        }
    }
    else {
        if (selectedLine == dataString) {
            jComment.show();
            highlightLines(enclosingObject, selectedLine);
            return true;
        }
    }
    highlightLines(enclosingObject, selectedLine);
    return false;
}

var isAnimating = false;

function adjustCodeCommentBoxForMousePosition(codeComment, y) {
    var height = parseInt(codeComment.css("height"), 10), currTop = parseInt(codeComment.css("top"), 10), newTop,
	rect, parent, preHeight, parentHeight;

	//rect is the code comment's rectangle relative to the viewport
	rect = codeComment.get(0).getBoundingClientRect()
    parent = codeComment.closest(".codeContainer");
	parentHeight = parseInt(parent.css("height"), 10);


    if (!isAnimating && currTop + 0.2 * height > y) {
        //scroll up
		isAnimating = true;
        newTop = Math.max(y - (0.3 * height), 15, currTop - (rect.top - 60),	//-60 because the nav bar's height is 50 and I want some space
			currTop - (codeComment.position().top - 10)		//jquery position
		);
        codeComment.animate({ top: newTop }, 150, "swing", function () { isAnimating = false; });
    }

    else if (!isAnimating && currTop + 0.8 * height < y) {
        //scroll down
		isAnimating = true;
        preHeight = parseInt(parent.find("pre").css("height"), 10);
        //the top should never be less than 10, but we don't want it to scroll down off the edge (10px margin)
        newTop = Math.max(10, Math.min((y - (0.7 * height)), preHeight - (height + 10), currTop + (window.innerHeight - rect.bottom) - 10,
			currTop + (parentHeight - (codeComment.position().top + height) ) - 10)
		);
        codeComment.animate({ top: newTop }, 150, "swing", function () { isAnimating = false; });
    }
}

Prism.hooks.add('after-highlight', function (env) {
    var numbersToHighlight, lineNumbers, container, mouseComments;
    if (env.code == "Loading…") {
        return;
    }
    numbersToHighlight = [];
    //console.log("call ");
    //console.log(env);

    container = $(env.element).closest(".codeContainer");

    mouseComments = container.find(".mouseComment");
    mouseComments.each(function (j, mc) {
        var i, show, range = false, lines;
        show = mc.getAttribute("data-show");
        lines = show.split(/[\+\-]/);
        if (show.indexOf("+") === -1) {
            range = true;
        }
        if (range && lines.length > 1) {
            for (i = parseInt(lines[0], 10) ; i <= parseInt(lines[1], 10) ; i++) {
                numbersToHighlight.push(i - 1);
            }
        } else {
            for (i = 0; i < lines.length; i++) {
                numbersToHighlight.push(parseInt(lines[i], 10) - 1);		//subtract 1 because these lines are 1 indexed, not 0-indexed
            }
        }
    });

    //console.log(numbersToHighlight);

    if (numbersToHighlight.length > 0) {
        lineNumbers = container.find(".line-numbers-rows span");
        lineNumbers.each(function (j, n) {
            if (-1 !== numbersToHighlight.indexOf(j)) {
                n.setAttribute("data-comment", "*");
                n.className = "starredBolded";
            }
        });
    }
});

$(document).ready(function () {
    //console.log("codeCommentary.js");
    $(".codeContainer").on("mousemove", "pre", function (e) {
        var selectedLine, y, comments, enclosingObject = $(this);

        y = e.offsetY === undefined ? e.layerY : e.offsetY;

        selectedLine = getMouseOverLine(enclosingObject, y);

        comments = enclosingObject.closest(".codeContainer").find(".mouseComment");
        comments.hide();

        if (comments.size() > 0) {
            comments.each(function (i, element) {
                if (handleHighlightsAndComment($(element), selectedLine, enclosingObject)) {
                    //break
                    return false;
                }
            });
        } else {
            handleHighlightsAndComment(undefined, selectedLine, enclosingObject);
        }
        adjustCodeCommentBoxForMousePosition(enclosingObject.closest(".codeContainer").find(".codeComment"), y);
    });



});