"use strict";function getMoveDirection(e,t,n,a){if(isPhone){var i=n-e,r=a-t;if(Math.abs(i)<2&&Math.abs(r)<2)return DIRECTIONS.UNDIRECTED;var s,o,u=(s=i,o=r,180*Math.atan2(o,s)/Math.PI);return-135<=u&&u<=-45?DIRECTIONS.UP:45<u&&u<135?DIRECTIONS.DOWN:135<=u&&u<=180||-180<=u&&u<-135?DIRECTIONS.LEFT:-45<=u&&u<=45?DIRECTIONS.RIGHT:DIRECTIONS.UNDIRECTED}}window.hiddenProperty="hidden"in document?"hidden":"webkitHidden"in document?"webkitHidden":"mozHidden"in document?"mozHidden":null,window.DIRECTIONS={UP:"UP",DOWN:"DOWN",LEFT:"LEFT",RIGHT:"RIGHT",UNDIRECTED:"UNDIRECTED"},window.isPhone=/Mobile|Android|iOS|iPhone|iPad|iPod|Windows Phone|KFAPWI/i.test(navigator.userAgent)&&window.innerWidth<760;var signatureEl=$("#signature"),maxAlpha=.7;function getDayLight(){var e=new Date,t=e.getHours()-12,n=t?Math.abs(t)/t:1,a=((t+=(60*e.getMinutes()+e.getSeconds())/3600)/4-n)*n;return Math.min(maxAlpha,Math.max(a,0))}function setLightColor(){$("#page").style.backgroundColor="rgba(85,85,85,".concat(getDayLight(),")")}function typeSignature(){typeSignature.count=typeSignature.count||0,typeSignature.count<=signature.length?(signatureEl.innerHTML="".concat(signature.slice(0,typeSignature.count++),"|"),setTimeout(typeSignature,100)):signatureEl.innerHTML=signature}function messenger(r){var s=this,o=0,u=0,e=0;s.init=function(){s.codeletters="&#*+%?￡@§$",s.message=0,s.currentLength=0,s.fadeBuffer=!1,s.messages=["..."],setTimeout(s.animateIn,100)},s.generateRandomString=function(e){for(var t="";t.length<e;)t+=s.codeletters.charAt(Math.floor(Math.random()*s.codeletters.length));return t},s.animateIn=function(){if(s.currentLength<s.messages[s.message].length)s.currentLength=s.currentLength+2,s.currentLength>s.messages[s.message].length&&(s.currentLength=s.messages[s.message].length),r.innerHTML=s.generateRandomString(s.currentLength),setTimeout(s.animateIn,20);else{if(2<++e)return;setTimeout(s.animateFadeBuffer,20)}},s.animateFadeBuffer=function(){if(!1===s.fadeBuffer){s.fadeBuffer=[];for(var e=0;e<s.messages[s.message].length;e++)s.fadeBuffer.push({c:Math.floor(12*Math.random())+1,l:s.messages[s.message].charAt(e)})}for(var t=!1,n="",a=0;a<s.fadeBuffer.length;a++){var i=s.fadeBuffer[a];0<i.c?(t=!0,i.c--,n+=s.codeletters.charAt(Math.floor(Math.random()*s.codeletters.length))):n+=i.l}if(r.innerHTML=n,!0===t){if(15==++u)return typeSignature(),void(o=3);if(!(u<15))return;setTimeout(s.animateFadeBuffer,50)}else{if(2<o)return;2==++o?typeSignature():s.cycleText()}},s.cycleText=function(){s.message=s.message+1,s.message>=s.messages.length&&(s.message=0),s.currentLength=0,s.fadeBuffer=!1,r.innerHTML="",setTimeout(s.animateIn,200)},s.init()}function loadMain(){loadMain.loaded||(setLightColor(),setTimeout(function(){new messenger(signatureEl)},400),loadMain.loaded=!0)}loadMain(),$("#qq").setAttribute("href",window.isPhone?"mqqwpa://im/chat?chat_type=wpa&uin=1095276799&version=1&src_type=web&web_src=oicqzone.com":"tencent://message/?uin=1095276799");