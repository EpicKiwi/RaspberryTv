const request = require("request");
const moment = require("moment");
const currentImageUrl = "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=fr-FR";
const baseBackgroundUrl = "http://www.bing.com"

function getCurrentImage(callback){
	request(currentImageUrl,(error, response, body)=>{
		if(error){
			callback(error)
			return;
		} else if(response.statusCode != 200){
			callback(new Error("Bad error code "+response.statusCode))
			return;
		}
		body = JSON.parse(body)
		expiration = moment().endOf("day").add(2,"h");
		var background = {
			url: baseBackgroundUrl+body.images[0].url,
			copyright: body.images[0].copyright,
			copyrightLink: body.images[0].copyrightlink,
			expires: expiration
		}
		callback(undefined, background)
	})
}

exports.getCurrentImage = getCurrentImage