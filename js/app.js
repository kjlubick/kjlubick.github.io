var contextPosts = {posts:[{
  id: '1',
  title: "Post the First",
  author: { name: "Kevin Lubick" },
  date: new Date('12-27-2012'),
  excerpt: "There are lots of à la carte software environments in this world. Places where in order to eat, you must first carefully look over the menu of options to order exactly what you want.",
  bodyArr: ["<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam condimentum faucibus mi a tincidunt. Integer luctus purus vel felis pharetra, mollis interdum justo porttitor. Integer suscipit ligula vitae fermentum vulputate. Nam a nisi malesuada, cursus urna at, dapibus lacus. Sed vitae libero ornare, auctor nisi non, eleifend lacus. Morbi facilisis quis nibh sit amet sagittis. Aliquam a sapien sed felis scelerisque venenatis. Donec orci odio, laoreet eget congue quis, viverra quis nisl. Duis feugiat, sapien sed blandit cursus, enim diam dignissim ante, quis fermentum nibh lorem non massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>",
"<p>In eu ultricies magna. Morbi quis erat laoreet, auctor turpis ut, pellentesque felis. Donec tristique purus id leo condimentum, in laoreet sapien sodales. Sed ut lacus quis ipsum dapibus lobortis faucibus tincidunt erat. Nam eget arcu volutpat, congue turpis at, tincidunt massa. Vivamus massa mauris, congue quis cursus sit amet, elementum a ante. Curabitur et molestie elit. Aliquam urna eros, rutrum non lacus et, pretium mollis dui. Sed vulputate dapibus tincidunt. Quisque massa tellus, volutpat id tempor a, eleifend quis ligula. Nullam ut commodo augue. Morbi ornare sagittis urna varius auctor.</p>",
"<p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque condimentum, velit sed egestas rutrum, dolor diam posuere dolor, non lacinia risus justo vel nisi. Sed eu leo faucibus, imperdiet quam sit amet, pretium lorem. Nullam turpis lacus, gravida eget tempor sed, gravida sit amet velit. Morbi fringilla pulvinar placerat. Nulla arcu libero, vulputate eu mollis eget, commodo vel erat. Praesent nec ultricies nisl. Fusce consequat convallis ultrices. Vivamus dictum at nisi id sagittis. Nam aliquam erat suscipit mi viverra rhoncus. Nam pellentesque tincidunt justo quis commodo.</p>"]
}, {
  id: '2',
  title: "Post the Second",
  author: { name: "Kevin Lubick"  },
  date: new Date('12-24-2012'),
  excerpt: "My [appearance on the Ruby Rogues podcast](http://rubyrogues.com/056-rr-david-heinemeier-hansson/) recently came up for discussion again on the private Parley mailing list.",
  bodyArr: ["<p>In eu ultricies magna. Morbi quis erat laoreet, auctor turpis ut, pellentesque felis. Donec tristique purus id leo condimentum, in laoreet sapien sodales. Sed ut lacus quis ipsum dapibus lobortis faucibus tincidunt erat. Nam eget arcu volutpat, congue turpis at, tincidunt massa. Vivamus massa mauris, congue quis cursus sit amet, elementum a ante. Curabitur et molestie elit. Aliquam urna eros, rutrum non lacus et, pretium mollis dui. Sed vulputate dapibus tincidunt. Quisque massa tellus, volutpat id tempor a, eleifend quis ligula. Nullam ut commodo augue. Morbi ornare sagittis urna varius auctor.</p>",
"<p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque condimentum, velit sed egestas rutrum, dolor diam posuere dolor, non lacinia risus justo vel nisi. Sed eu leo faucibus, imperdiet quam sit amet, pretium lorem. Nullam turpis lacus, gravida eget tempor sed, gravida sit amet velit. Morbi fringilla pulvinar placerat. Nulla arcu libero, vulputate eu mollis eget, commodo vel erat. Praesent nec ultricies nisl. Fusce consequat convallis ultrices. Vivamus dictum at nisi id sagittis. Nam aliquam erat suscipit mi viverra rhoncus. Nam pellentesque tincidunt justo quis commodo.</p>"]
}]};


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
	var html = template(contextPosts);

	console.log(html);
	
	$("#main").html(html);
});