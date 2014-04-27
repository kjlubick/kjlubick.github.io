
var entryTemplateSource;
var entryTemplate; 

Handlebars.registerHelper('each', function(context, options) {
  var ret = "", postBody;

  for(var i=0, j=context.length; i<j; i++) {
	context[i].body = context[i].bodyArr.join("");
    ret = ret + entryTemplate(context[i]);
  }

  return new Handlebars.SafeString(ret);
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