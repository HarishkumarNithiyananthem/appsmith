export default {
	disable_widget:false,
	
	GenericCreate:async(api_key, document_name, successmsg, errormsg, resetwidgetlist, api_body, doc_id=null, modal=null)=>{
		try
			{
				this.disable_widget = true
				let response_body =api_body
				if(doc_id !==null){
					response_body.doc_id = doc_id
				}
				const response = await Server.post(api_key, response_body);
				await Admin_Search.render_data(document_name);
				Promise.all([GlobalVariables.resetform(resetwidgetlist),showAlert(successmsg,'success'),
										 this.disable_widget=false,modal===null?"":closeModal(modal)])
				
			}
		catch(error)
			{
				await GlobalVariables.delay_function('200');
				await CatchError.catcherror(error, GenericPost.data,GenericPost.responseMeta.statusCode,errormsg);
			}
	},
	
	GenericUpdate:async(api_key, document_name, successmsg, errormsg, resetwidgetlist, api_body, doc_id=null, child_id=null, modal=null)=>{
		try
			{
				this.disable_widget = true
				let response_body =api_body
				response_body.doc_id = doc_id
				if(child_id !==null){
					response_body = Object.assign({},response_body,child_id)
				}
				const response = await Server.put(api_key, response_body);
				await Admin_Search.render_data(document_name);
				Promise.all([GlobalVariables.resetform(resetwidgetlist),showAlert(successmsg,'success'),
										 this.disable_widget=false,modal===null?"":closeModal(modal)])
				
			}
		catch(error)
			{
				await GlobalVariables.delay_function('200');
				await CatchError.catcherror(error, GenericPut.data, GenericPut.responseMeta.statusCode,errormsg);
			}
	},
	GenericDelete:async(api_key, document_name, successmsg, errormsg, resetwidgetlist, doc_id, child_id=null)=>{
		try
			{
				this.disable_widget = true
				let response_body = {}
				response_body.doc_id = doc_id
				if(child_id !==null){
					response_body = Object.assign({},response_body,child_id)
				}
				const response = await Server.delete(api_key, response_body);
				await Admin_Search.render_data(document_name);
				Promise.all([GlobalVariables.resetform(resetwidgetlist),showAlert(successmsg,'success'),
										 this.disable_widget=false])
				
			}
		catch(error)
			{
				await GlobalVariables.delay_function('200');
				await CatchError.catcherror(error, GenericDelete.data,GenericDelete.responseMeta.statusCode,errormsg);
			}
	}
}