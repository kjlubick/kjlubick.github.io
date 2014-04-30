function highlightLines(pre, lines, classes) {
    var ranges = lines.replace(/\s+/g, '').split(','),
        offset = +pre.getAttribute('data-line-offset') || 0,
        lineHeight = parseFloat(getComputedStyle(pre).lineHeight), i, start, line, range;

    for (i = 0; range = ranges[i++];) {
        range = range.split('-');

        start = +range[0];

        line = $(pre).find(".line-highlight");
        line.show();
    }

    line.css("top", (start - offset - 1) * lineHeight + 'px');
}



$(document).ready(function () {
    console.log("codeCommentary.js");
    $(".codeContainer").on("mouseenter", "pre", function (e) {
        highlightLines(e.currentTarget, "2");
    });
});