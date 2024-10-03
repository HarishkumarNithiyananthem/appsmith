export default {
	textcolour:"#008695",
	boxshadow:"0px 0px 4px 3px rgba(0, 0, 0, 0.25)",
	admin_default:"Organisation",
	
	resetform:(widgetlist)=>{
		widgetlist.map((row)=>resetWidget(row))
	},
	delay_function:async(delaytime)=>{
		return new Promise((resolve) => setTimeout(resolve,delaytime))
	},
	validateform:(widgetname)=>{
		let validity = true
		for(let widget of widgetname){
			if(widget.hasOwnProperty('validation')){
				validity = validity && widget.validation && widget.isValid
			}else{
				if(widget.hasOwnProperty('selectedOptionValues')){
					validity = validity && widget.selectedOptionValues.length!=0
				}else{
					validity = validity && widget.selectedOptionValue.length!=0
				}
				
			}
				
				if(validity==false){
					break
				}
			}
			return !validity
	},
	genericDisable:(widgetname, tablename, disabletype)=>{
		switch(disabletype){
			case 'Create':
				{
					if(GenericCrud.disable_widget){
						return GenericCrud.disable_widget
					}else{
						if(tablename.selectedRowIndex != -1){
							return true
						}else{
							return GlobalVariables.validateform(widgetname)
						}
					}

					break;
				}
			case 'Update':
				{
					if(GenericCrud.disable_widget){
						return GenericCrud.disable_widget
					}else{
						if(tablename.selectedRowIndex == -1){
							return true
						}else{
							return GlobalVariables.validateform(widgetname)
						}
					}

					break;
				}
			case 'Delete':
				{
					if(GenericCrud.disable_widget){
						return GenericCrud.disable_widget
					}else{
						if(tablename.selectedRowIndex==-1){
							return true
						}else{
							return false
						}
					}
					break;
				}
		}
	
	},
	

}