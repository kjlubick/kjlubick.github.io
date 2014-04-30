function highlightLines(pre, yOffset) {
    var i, start, line, range, lineHeight = parseFloat(pre.css("line-height"));

	start = Math.floor(yOffset / lineHeight);
   
    line = pre.find(".line-highlight");
    line.show();


    line.css("top", start * Math.floor(lineHeight) + 'px');
}



$(document).ready(function () {
    console.log("codeCommentary.js");
    $(".codeContainer").on("mousemove", "pre", function (e) {
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
		//console.log(y);
        highlightLines($(e.currentTarget), y);
    });
});