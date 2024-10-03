export default {
	store: {
		"organisations_search": {
			"url":"/organisations/search"
		},
		"organisations_post": {
			"url":"/organisations/"
		},
		"organisations_put": {
			"url":"/organisations/"
		},
		"organisations_delete": {
			"url":"/organisations/"
		},
		"platform_resources_search": {
			"url":"/platform_resources/search"
		},
		"platform_resources_post": {
			"url":"/platform_resources/"
		},
		"platform_resources_put": {
			"url":"/platform_resources/"
		},
		"platform_resources_delete": {
			"url":"/platform_resources/"
		},
		"users_search": {
			"url": "/users/search"
		},
		"users_delete": {
			"url": "/users/"
		},
		"step_type_search": {
			"url": "/step_types/search"
		},
		"step_type_post": {
			"url": "/step_types/"
		},
		"step_type_put": {
			"url": "/step_types/"
		},
		"step_type_delete": {
			"url": "/step_types/"
		},
		"create_default_roles": {
			"url": "/roles/create_default_roles"
		},
		"questions_search": {
			"url": "/questions/search"
		},
		"questions_post": {
			"url": "/questions/"
		},
		"questions_delete": {
			"url": "/questions/"
		},
		"owner_users_search":{
			"url": "/roles/search_default_users"
		}
	},
	get_url: (api_key) => {
		return ApiStore.store[api_key].url
  },
	
}