/*global Handlebars, moment, contextPosts */
var entryTemplateSource;
var entryTemplate;

Handlebars.registerHelper('each', function (context) {
    var ret = "", postBody, i, j;

    for (i = 0, j = context.length; i < j; i++) {
        context[i].body = context[i].bodyArr.join("");
        ret = ret + entryTemplate(context[i]);
    }

    return new Handlebars.SafeString(ret);
});

Handlebars.registerHelper('format-relative-date', function (date) {
    return moment(date).fromNow();
});

Handlebars.registerHelper('format-full-date', function (date) {
    return moment(date).format("MMM Do YYYY H:mm:ss");
});


$(document).ready(function () {
    var source, template, html;
    entryTemplateSource = $("#entry-template").html();
    entryTemplate = Handlebars.compile(entryTemplateSource);

    source = $("#posts-template").html();
    template = Handlebars.compile(source);

    contextPosts.posts.sort(function (a, b) {
        return parseInt(b.id, 10) - parseInt(a.id, 10);		//higher id numbers are at the top
    });

    html = template(contextPosts);

    console.log(html);

    $("#main").html(html);
});