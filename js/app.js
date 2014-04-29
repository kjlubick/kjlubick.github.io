
var entryTemplateSource;
var entryTemplate; 

Handlebars.registerHelper('each', function(context) {
  var ret = "", postBody;

  for(var i=0, j=context.length; i<j; i++) {
	context[i].body = context[i].bodyArr.join("");
    ret = ret + entryTemplate(context[i]);
  }

  return new Handlebars.SafeString(ret);
});

Handlebars.registerHelper('format-relative-date', function(date) {
  return moment(date).fromNow();
});

Handlebars.registerHelper('format-full-date', function(date) {
  return moment(date).format("MMM Do YYYY H:mm:ss");
});


$(document).ready(new function() {
	
	entryTemplateSource = $("#entry-template").html();
	entryTemplate = Handlebars.compile(entryTemplateSource);
	
	var source = $("#posts-template").html();
	var template = Handlebars.compile(source);
	
	contextPosts.posts.sort(function(a,b) {
		return parseInt(b.id) - parseInt(a.id);		//higher id numbers are at the top
	});
	
	var html = template(contextPosts);

	console.log(html);
	
	$("#main").html(html);
});