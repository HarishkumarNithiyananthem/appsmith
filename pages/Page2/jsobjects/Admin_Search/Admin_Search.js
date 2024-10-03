export default {
  
	trigger_is_archived:false,
	organisation_search:async(filter=null)=>{
		try
			{
				let unset = {
						"created_by": 1,
						"created_on": 1,
						"id": 1,
						"is_archived": 1,
						"is_deleted": 1,
						"last_updated": 1,
						"name": 1,
						"updated_by": 1,
						"org_owner_email": 1,
					"version_control_enabled": 1
					}
				return await Server.get('organisations_search',filter==null?{"is_archived":false, "is_deleted":false}:filter,unset)
     	}
		catch(error)
			{
				await GlobalVariables.delay_function('200');
				await CatchError.catcherror(error, GenericSearch.data, GenericSearch.responseMeta.statusCode)
      }
	},
	plateform_resource_search:async(filter=null)=>{
		try
			{
				let unset = {
						"available_permissions": 1,
						"id": 1,
						"name": 1,
						"updated_by": 1
					}
				return await Server.get('platform_resources_search',filter==null?{}:filter,unset)
     	}
		catch(error)
			{
				await GlobalVariables.delay_function('200');
				await CatchError.catcherror(error, GenericSearch.data, GenericSearch.responseMeta.statusCode)
      }
	},
	users_search:async(filter = null )=> {
		try
			{
				let unset = {
						"organisation_id": 1,
						"default_project": 1,
						"is_deleted": 1,
						"email": 1,
						"favourite_project": 1,
						"first_name": 1,
						"id": 1,
						"is_active": 1,
						"last_name": 1,
						"last_updated": 1,
						"password": 1,
						"role_id": 1
					}
				return await Server.get('users_search',filter==null?{"is_deleted":false}:filter,unset)
     	}
		catch(error)
			{
				await GlobalVariables.delay_function('200');
				await CatchError.catcherror(error, GenericSearch.data, GenericSearch.responseMeta.statusCode)
      }
	},
	step_type_search:async(filter = null)=>{
		try
			{
				let unset = {
						"class_name": 1,
						"id": 1,
						"name": 1,
						"step_schema": 1
					}
				return await Server.get('step_type_search',filter==null?{}:filter,unset)
     	}
		catch(error)
			{
				await GlobalVariables.delay_function('200');
				await CatchError.catcherror(error, GenericSearch.data, GenericSearch.responseMeta.statusCode)
      }
	},
	questions_search:async(filter = null)=>{
		try
			{
				let unset = {
						"group_name": 1,
						"id": 1,
						"question": 1,
						"help_text": 1,
						"permissions": 1
					}
				const res = await Server.get('questions_search',filter==null?{}:filter,unset)
				if(res.length == 0){
					return res
				}else{
					return res.sort((a, b) => {
  return a.group_name.localeCompare(b.group_name);
});
				}
     	}
		catch(error)
			{
				CatchError.catcherror(error, GenericSearch.data, GenericSearch.responseMeta.statusCode)
      }
	},
	default_roles_search:async()=>{
		try{
			let response = ""
			await GenericPost.run({'api_url':Server.Cloud_Url + ApiStore.get_url('owner_users_search'),'api_body':{"role_name":"owner","is_deleted":"false"}}).then((res)=>response=res).catch((err)=>{
				showAlert('Users Search Failed to Execute!'+err.message,'error')
			})
			return response
		}catch(err){
			
		}
	},
	platform_resource_options:async()=>{
		if(Admin_Search.plateform_resource_search.data?.length==null){
			await Admin_Search.plateform_resource_search()
			await GlobalVariables.delay_function('200')
		}
		let return_data = []

		let child_data = []
		
		let data = Admin_Search.plateform_resource_search.data
		let i;
		let j;
		for(i=0; i<data.length; i++){
			let temp_dict = {}
			temp_dict.label = data[i].name
			temp_dict.value = data[i]._id
			for(j=0; j<data[i].available_permissions.length; j++){
				let child_temp_dict = {}
				child_temp_dict.label = data[i].available_permissions[j]+'('+data[i].name+')'
				child_temp_dict.value = data[i]._id+ '-' +data[i].available_permissions[j]
				child_data.push(child_temp_dict)
			}
			temp_dict.children = child_data
			return_data.push(temp_dict)
			child_data = []
		}
		return return_data
	},
	questions_create:async(name, question, help_text, permissions)=>{
		let i;
		let data = []
		let prefix_list = []
		let prefix;
		// let permissions = Roles_Permissions_MultiTreeSel.selectedOptionValues
		for(i=0; i<permissions.length; i++){
			// if(permissions[i].includes('-')){
				prefix = permissions[i].split('-')[0]
			// }else{
				// prefix = permissions[i]
			// }
			if(prefix_list.includes(prefix)){
				continue;
			}
			prefix_list.push(prefix)
			
			let filtered_data = permissions.filter(row => row.startsWith(prefix+'-'))
			const output = filtered_data.reduce((acc, curr) => {
				const [platformResourceId, permission] = curr.split('-');
				const existingEntry = acc.find(item => item.platform_resource_id === platformResourceId);

				if (existingEntry) {
					existingEntry.given_permissions.push(permission);
				} else {
					acc.push({ platform_resource_id: platformResourceId, given_permissions: [permission] });
				}

				return acc;
			}, []);
			data.push(output[0])
		}
		await GenericCrud.GenericCreate('questions_post','Roles Questions','Roles Questions Created!','Roles Question Already exists!',['Question_Input','Roles_Permissions_MultiTreeSel','Section_Name_Input','Help_Text_Input'],{"question": question,"group_name":name,"help_text": help_text,"permissions":data})
	},
	render_data:async(search_key)=>{
		switch(search_key)
			{
				case 'Organisation':
					{
						await Admin_Search.organisation_search();
						await GlobalVariables.resetform(['Archived_Filter','Organization_Table','Org_Owner_Email_Input',
																						 'Organization_Name','Archive_Org_RadioGroup']);
						break;
					}
				case 'Platform Resources':
					{
						await Admin_Search.plateform_resource_search();
						await GlobalVariables.resetform(['Platform_Permission_Select','Platform_Res_Name','Platform_Res_Table']);
						break;
					}
				case 'Users':
					{
						await Admin_Search.default_roles_search();
						await GlobalVariables.resetform(['First_Name_Input','Last_Name_Input','Password_Input','Users_Table']);
						break;
					}
				case 'Step Type':
					{
						await Admin_Search.step_type_search();
						await GlobalVariables.resetform(['Step_Name_Input','Class_Name_Input','Schema_Input','Step_Type_Table']);
						break;
					}
				case 'Roles Questions':
					{
						await Admin_Search.questions_search();
						Admin_Search.platform_resource_options();
						await GlobalVariables.resetform(['Section_Name_Input','Roles_Permissions_MultiTreeSel','Help_Text_Input',
																						 'Question_Input','Roles_Question_Table']);
						break;
					}
			}
		
	},
}