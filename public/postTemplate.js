(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['post'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"comment"),depth0,{"name":"comment","data":data,"indent":"               ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <article class=\"post\">\r\n        <div class=\"post-icon\">\r\n          <!-- Probably going to be changed in the future.-->\r\n          <i class=\"fas fa-camera\"></i>\r\n        </div>\r\n        <p class=\"post-author\">\r\n            "
    + alias4(((helper = (helper = lookupProperty(helpers,"author") || (depth0 != null ? lookupProperty(depth0,"author") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data,"loc":{"start":{"line":7,"column":12},"end":{"line":7,"column":22}}}) : helper)))
    + "\r\n        </p>\r\n        <div class=\"delete\">\r\n          <button type=\"button\" id=\"delete-button\"><i class=\"fa fa-trash\"></i></button>\r\n        </div>\r\n        <div class=\"post-content\">\r\n          <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":13,"column":20},"end":{"line":13,"column":27}}}) : helper)))
    + "\" class=\"post-image\">\r\n          <p class=\"post-caption\">\r\n            "
    + alias4(((helper = (helper = lookupProperty(helpers,"caption") || (depth0 != null ? lookupProperty(depth0,"caption") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"caption","hash":{},"data":data,"loc":{"start":{"line":15,"column":12},"end":{"line":15,"column":23}}}) : helper)))
    + "\r\n          </p>\r\n        </div>\r\n        <div class=\"like-button-container\">\r\n          <button type=\"button\" id=\"likeButton\"><i class=\"far fa-heart\"></i></button>\r\n        </div>\r\n        <button type=\"button\" id=\"comment-expand-button\"><i class=\"fa fa-comments\"></i></button>\r\n        <button type=\"button\" id=\"comment-respond-button\"><i class=\"fa fa-comment\"></i></button>\r\n        <div class=\"comments-section\">\r\n          <div class=\"post-container\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"data") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":9},"end":{"line":27,"column":19}}})) != null ? stack1 : "")
    + "          </div>\r\n         \r\n        </div>\r\n      </article>\r\n";
},"usePartial":true,"useData":true});
})();