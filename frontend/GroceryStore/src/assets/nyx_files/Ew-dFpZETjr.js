if (self.CavalryLogger) { CavalryLogger.start_js(["M\/Einph"]); }

__d("GamingCometArenaHomeContentQuery_facebookRelayOperation",[],(function(a,b,c,d,e,f){e.exports="4871193429577052"}),null);
__d("GamingCometArenaHomeContentQuery$Parameters",["GamingCometArenaHomeContentQuery_facebookRelayOperation"],(function(a,b,c,d,e,f){"use strict";a={kind:"PreloadableConcreteRequest",params:{id:b("GamingCometArenaHomeContentQuery_facebookRelayOperation"),metadata:{},name:"GamingCometArenaHomeContentQuery",operationKind:"query",text:null}};e.exports=a}),null);
__d("CometGamingNewGamingProfileContentQuery_facebookRelayOperation",[],(function(a,b,c,d,e,f){e.exports="4631019676990760"}),null);
__d("CometGamingNewGamingProfileContentQuery$Parameters",["CometGamingNewGamingProfileContentQuery_facebookRelayOperation"],(function(a,b,c,d,e,f){"use strict";a={kind:"PreloadableConcreteRequest",params:{id:b("CometGamingNewGamingProfileContentQuery_facebookRelayOperation"),metadata:{},name:"CometGamingNewGamingProfileContentQuery",operationKind:"query",text:null}};e.exports=a}),null);
__d("GamingProfileEditButtonQuery_facebookRelayOperation",[],(function(a,b,c,d,e,f){e.exports="4209340712428492"}),null);
__d("GamingProfileEditButtonQuery$Parameters",["GamingProfileEditButtonQuery_facebookRelayOperation"],(function(a,b,c,d,e,f){"use strict";a={kind:"PreloadableConcreteRequest",params:{id:b("GamingProfileEditButtonQuery_facebookRelayOperation"),metadata:{},name:"GamingProfileEditButtonQuery",operationKind:"query",text:null}};e.exports=a}),null);
__d("CometGamingVideoRootContentQuery$Parameters",["CometGamingVideoRootContentQuery_facebookRelayOperation"],(function(a,b,c,d,e,f){"use strict";a={kind:"PreloadableConcreteRequest",params:{id:b("CometGamingVideoRootContentQuery_facebookRelayOperation"),metadata:{},name:"CometGamingVideoRootContentQuery",operationKind:"query",text:null}};e.exports=a}),null);
__d("CometGamingVideoRootHeroBannerQuery$Parameters",["CometGamingVideoRootHeroBannerQuery_facebookRelayOperation"],(function(a,b,c,d,e,f){"use strict";a={kind:"PreloadableConcreteRequest",params:{id:b("CometGamingVideoRootHeroBannerQuery_facebookRelayOperation"),metadata:{},name:"CometGamingVideoRootHeroBannerQuery",operationKind:"query",text:null}};e.exports=a}),null);
__d("GamingCometArenaHomeRoot.entrypoint",["GamingCometArenaHomeContentQuery$Parameters","JSResourceForInteraction","WebPixelRatio","buildCometGamingRoute.entrypoint"],(function(a,b,c,d,e,f,g){"use strict";a=c("buildCometGamingRoute.entrypoint")("GAMING_ARENA")(c("JSResourceForInteraction")("GamingCometArenaHomeRoot.react").__setRef("GamingCometArenaHomeRoot.entrypoint"),function(a){return{queries:{homeQueryReference:{parameters:b("GamingCometArenaHomeContentQuery$Parameters"),variables:{scale:d("WebPixelRatio").get()}}}}});g["default"]=a}),98);
__d("CometGamingGamingProfileRoot.entrypoint",["CometGamingNewGamingProfileContentQuery$Parameters","GamingProfileEditButtonQuery$Parameters","JSResourceForInteraction","WebPixelRatio","buildCometGamingRoute.entrypoint","qex"],(function(a,b,c,d,e,f,g){"use strict";var h=8174,i=d("WebPixelRatio").get(),j=(a=c("qex")._("1105"))!=null?a:!1;e=c("buildCometGamingRoute.entrypoint")("GAMING_PROFILE")(c("JSResourceForInteraction")("CometGamingGamingProfileRoot.react").__setRef("CometGamingGamingProfileRoot.entrypoint"),function(a){return{extraProps:{feature:a.routeProps.feature,id:a.routeProps.id},queries:{contentQueryReference:{parameters:b("CometGamingNewGamingProfileContentQuery$Parameters"),variables:{can_see_achievements:j,scale:i}},gamingProfileEditButtonQueryReference:{parameters:b("GamingProfileEditButtonQuery$Parameters"),variables:{nuxID:h}}}}});g["default"]=e}),98);
__d("CometGamingVideoRoot.entrypoint",["CometGamingVideoRootContentQuery$Parameters","CometGamingVideoRootHeroBannerQuery$Parameters","JSResourceForInteraction","WebPixelRatio","buildCometGamingRoute.entrypoint"],(function(a,b,c,d,e,f,g){"use strict";a=c("buildCometGamingRoute.entrypoint")("GAMING_VIDEO")(c("JSResourceForInteraction")("CometGamingVideoRoot.react").__setRef("CometGamingVideoRoot.entrypoint"),function(a){a=a.routeParams;var c=d("WebPixelRatio").get();return{queries:{contentQueryReference:{parameters:b("CometGamingVideoRootContentQuery$Parameters"),variables:{scale:c}},heroBannerQueryReference:{parameters:b("CometGamingVideoRootHeroBannerQuery$Parameters"),variables:{videoID:a.video_id}}}}});g["default"]=a}),98);