module.exports = function PostsServiceModule(pb){
  var PluginService = pb.PluginService;
  var FB = require('fb');
  
  function PostsService(){}
  
  PostsService.init = function(cb){
    pb.log.debug("PostsService: Initialized");
    cb(null, true);
  };
  
  PostsService.getName = function(){
    return "postsService";
  };
  
  PostsService.prototype.getPagePosts = function(accessToken, cb){
    var self = this;
    var pluginService = new PluginService();
    pluginService.getSettingsKV('pencilblue_facebook', function(err, settings){
      self.callApi(accessToken, '/v2.3/' + settings.facebook_page_id + '/posts', cb);
    });
  };
  
  PostsService.prototype.callApi = function(accessToken, route, cb){
    FB.api(route, {"access_token":accessToken},function(response){
      cb({
        status:200,
        content:JSON.stringify(response)
      });
    });
  };
  
  return PostsService;
};