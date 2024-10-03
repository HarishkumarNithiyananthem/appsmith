export default {
	Cloud_Url: "http://10.147.17.226:8000",  //http://143.110.181.210:9000 => cloud server url
	API_KEY_NAME:"X-VSC-API-KEY",
	API_KEY_VALUE:"7ffb53ee3cf3b255ae4e5d1728f5a253382209feefcd9ff32c7c3a88d86e5b24",

	current_log_level: "debug",
	log_levels: {
		"debug": 0,
		"info": 1,
		"error": 2,
		"critical": 3
	},
	logme: (message, log_level) => {
		// If you have a log level of error in current_log_level variable and send a log message at level debug, the message will not be printed. 
		// This is a minimalistic logging mechanism. 
		if (Server.log_levels[log_level] >= Server.log_levels[Server.current_log_level]) {
			console.log(message)
		}		
	},
	get: async (api_key, match_section, unset_section, parent_id_section=null) => {
		let request_body = {
			"filter_by": match_section,
			"unset": unset_section
		}
		
		if (parent_id_section !== null) {
			request_body.parent_id = parent_id_section
		}
		
		const api_url = Server.Cloud_Url + ApiStore.get_url(api_key)
		
		const response = await GenericSearch.run({"api_url": api_url, "api_body": request_body})
		
		return response;
	}, 
	post: async (api_key, api_body) => {
		
		const api_url =  Server.Cloud_Url + ApiStore.get_url(api_key)
		
		return await GenericPost.run({"api_url": api_url, "api_body": api_body})
		
	},
	put: async (api_key, api_body) => {
		
		const api_url = Server.Cloud_Url + ApiStore.get_url(api_key)

		return await await GenericPut.run({"api_url": api_url, "api_body": api_body})
	},
	delete: async (api_key, request_body) => {
		
		const api_url = Server.Cloud_Url + ApiStore.get_url(api_key)

		return await GenericDelete.run({"api_url": api_url, "api_body": request_body})
	},
}