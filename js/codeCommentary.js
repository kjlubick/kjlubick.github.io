function highlightLines(pre, lineNumber, secondLineNumber, connected) {
    var lineNumber, line, secondLine, lineHeight = parseFloat(pre.css("line-height"));

    line = pre.find(".line-highlight").eq(0);
	secondLine = pre.find(".line-highlight").eq(1);
    line.show();


    line.css("top", lineNumber * Math.floor(lineHeight) + 'px');
	
	if (connected === true) {
	//create a bunch of new lines, which will cause this to highlight multiple lines
		line.text(Array(secondLineNumber - lineNumber + 2).join(' \r\n'));
		secondLine.hide();
	} else if (secondLineNumber !== undefined) {
		secondLine.css("top", secondLineNumber * Math.floor(lineHeight) + 'px');
		secondLine.show();
	} else {
		line.text("\r\n");
		secondLine.hide();
	}
	
	return lineNumber
}


function getMouseOverLine(pre, yOffset) {
	var lineHeight = parseFloat(pre.css("line-height"));
	return Math.floor((yOffset-5) / lineHeight);
}


$(document).ready(function () {
    console.log("codeCommentary.js");
    $(".codeContainer").on("mousemove", "pre", function (e) {
		var selectedLine, y, comments;

		y = e.offsetY==undefined?e.layerY:e.offsetY;
		
		selectedLine = getMouseOverLine($(this), y);
		
		comments = $(this).closest(".codeContainer").find(".mouseComment");
		
		comments.each(function(i, element) {
		
		});
		
        selectedLine = highlightLines($(this), selectedLine);
		
		
    });
});