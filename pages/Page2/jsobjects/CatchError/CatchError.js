export default {
	catcherror:  (err, data, response, msg=null) => {
		try
			{
				GenericCrud.disable_widget = false
				if(err.message=="Cannot read properties of undefined (reading 'data')")
					{
						showAlert("Network got disconnected!, Please check your connection and retry",'warning')
					}
				else
					{
						switch(response)
							{
								case 'PE-RST-5000':
									
									showAlert('can not load data, python exe is not running or the station ip address is incorrect!','warning')
									break;
									
								case '422 UNPROCESSABLE_ENTITY':
							
									if(data.detail[0].msg=="Request results in creating a duplicate document, this is disallowed"){
										showAlert(msg,'warning')
									}else{
										showAlert('Something Went Wrong!'+data.detail[0].msg,'error')
									}
									
									break;
									
								case 'PE-QRY-5000':

									showAlert('can not load data, Python exe is not running or the station ip address is incorrect!','warning')
									break;
								default:
									
									showAlert('something went wrong!, '+err.message,'error')
									
							}
					}
			}
		catch(error)
			{
				if(error.message=="Cannot read properties of undefined (reading 'data')")
					{
						showAlert("Network got disconnected!, Please check your connection and retry",'warning')
					}
			}
	}
}