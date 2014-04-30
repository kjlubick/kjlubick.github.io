function highlightLines(pre, lines, classes) {
	var ranges = lines.replace(/\s+/g, '').split(','),
	    offset = +pre.getAttribute('data-line-offset') || 0;
	
	var lineHeight = parseFloat(getComputedStyle(pre).lineHeight);

	for (var i=0, range; range = ranges[i++];) {
		range = range.split('-');
					
		var start = +range[0],
		    end = +range[1] || start;
		
		var line = $(pre).find(".line-highlight");
		line.show();

/*    //if the line-numbers plugin is enabled, then there is no reason for this plugin to display the line numbers
    if(!$(pre).hasClass("line-numbers")) {
      line.data("start",start);

      if(end > start) {
        line.data("end", end);
      }*/
    }

		line.css("top", (start - offset - 1) * lineHeight + 'px');
}



$(document).ready(function() {
	console.log("codeCommentary.js");
	$(".codeContainer").on("mouseenter","pre", function(e) {
		highlightLines(e.currentTarget, "2");
	});
});