Cypress.Cookies.defaults({
  whitelist: /session|remember/
})




describe('Win All The Things', function() {

	it('can find giveaways page', function() {
		cy.visit('https://smile.amazon.com/ga/giveaways')
	})
	it('can generate new links', function() {
				//
		// Collect links from all pages
		//
		cy.visit('https://www.amazon.com/ap/signin?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fyourstore%2Fhome%3Fie%3DUTF8%26action%3Dsign-out%26path%3D%252Fgp%252Fyourstore%252Fhome%26ref_%3Dnav_youraccount_signout%26signIn%3D1%26useRedirectOnSuccess%3D1')
		cy.get('#ap_email').type('ollitech@gmail.com')
		cy.get('#ap_password').type('')
		cy.get('label > input').check()
		//cy.get('#signInSubmit').click()
		cy.pause()


		var allLinks = []
		cy.visit('https://smile.amazon.com/ga/giveaways')
		var start = 7
		var batch = 10
		var genArr = Array.from({length:batch},(v,k)=>k+start)
		cy.wrap(genArr).each((index) => {
			allLinks[index] = []
			cy.visit('https://smile.amazon.com/ga/giveaways?pageId=' + index)
			cy.get('#giveaway-grid>.giveawayItemContainer>.giveAwayItemDetails').each(($el, mindex, $list) => {
				allLinks[index].push( $el[0].href )
			})
			cy.log(allLinks[index])
			cy.writeFile('links'+index+'.json',allLinks[index])
			cy.wait(1000)
			cy.readFile('links'+index+'.json').each((item)=>{
				cy.visit(item)
				cy.wait(500)
				cy.get('#giveaway-page-content').then(($body) =>{
					 var asString = $body[0].outerHTML

					 if (asString.includes('id="giveaway-default-return-link-button"')){
						//cy.screenshot('entered'+ item.replace(/[^a-z0-9]/gi, '_'),{"capture":"viewpoint"})
						cy.log("Already Entered: " + item)
					 }else if (asString.includes('Giveaway ended')){
						//cy.screenshot('entered'+ item.replace(/[^a-z0-9]/gi, '_'),{"capture":"viewpoint"})
						cy.log("Expired " + item)
					 }else if (asString.includes('<input name="subscribe"')){
						//cy.screenshot('entered'+ item.replace(/[^a-z0-9]/gi, '_'),{"capture":"viewpoint"})
						cy.get('input[name="subscribe"]').click()
						cy.log("Subscribe: " + item)
						cy.get('input.a-button-input',{"timeout":30000})
						cy.screenshot('page-' + index + '/subscribe'+ item.replace(/[^a-z0-9]/gi, '_'),{"capture":"fullPage"})	
					 }else if(asString.includes('id="box_click_target"')) {
					    //magic box was cfond click it
						cy.get('#box_click_target').click()
						cy.get('input.a-button-input',{"timeout":30000})
						cy.screenshot('page-' + index + '/boxed'+ item.replace(/[^a-z0-9]/gi, '_'),{"capture":"fullPage"})	
						//cy.screenshot()
					  }else if (asString.includes('id="youtube-iframe"')) {
					    //video box, play it
						cy.get('#youtube-iframe').click()
						cy.get('input[name="continue"]',{"timeout":30000}).click({"timeout":30000})
						cy.wait(2000)
						cy.get('input.a-button-input',{"timeout":30000})
						cy.screenshot('page-' + index + '/yt'+ item.replace(/[^a-z0-9]/gi, '_'),{"capture":"fullPage"})				  
					  }else if (asString.includes('<video')) {
					    //video box, play it
						cy.get('#giveaway-social-container').click()
						cy.get('input[name="continue"]',{"timeout":30000}).click({"timeout": 30000})
						cy.wait(2000)
						cy.get('input.a-button-input',{"timeout":30000})
						cy.screenshot('page-' + index + '/airy'+ item.replace(/[^a-z0-9]/gi, '_'),{"capture":"fullPage"})	
					  }else{
					  	//no idea, screenshot
					  	//cy.wait(10000)
						cy.get('input.a-button-input',{"timeout":30000}).click({"timeout":30000})
						cy.wait(2000)
						cy.get('input.a-button-input',{"timeout":30000})
					  	cy.screenshot('page-' + index + '/guess'+ item.replace(/[^a-z0-9]/gi, '_'),{"capture":"fullPage"})
					  }
					  var updatedContents = $body[0].outerHTML
					  if(updatedContents.includes("won") || updatedContents.includes("winner")|| updatedContents.includes("congratulations")){
					  	cy.log("winner - " + item)
					  	cy.screenshot('Winner'+ item.replace(/[^a-z0-9]/gi, '_'),{"capture":"fullPage"})
					  	cy.pause()

					  }
				})			
			})
			cy.wait(200)
		})
	})



	//it('can enter giveaways', function() {
	//	//cy.visit('https://www.amazon.com/ap/signin?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fyourstore%2Fhome%3Fie%3DUTF8%26action%3Dsign-out%26path%3D%252Fgp%252Fyourstore%252Fhome%26ref_%3Dnav_youraccount_signout%26signIn%3D1%26useRedirectOnSuccess%3D1')
	//	//cy.get('#ap_email').type('ollitech@gmail.com')
	//	//cy.get('#ap_password').type('')
	//	//cy.get('label > input').check()
	//	//cy.get('#signInSubmit').click()
	//	cy.wait(2000)
	//	
	//	//
	//	// Visit each, discern type and enter  
	//	// a-button-input
	//	//
	//	cy.readFile('links.json').each((item)=>{
	//		cy.log(item)
	//		cy.visit(item)
	//		cy.get('.participation-action-item').then(($body) =>{
	//			 var asString = $body[0].outerHTML
//
	//			 if (asString.includes('id="giveaway-default-return-link-button"')){
	//				//cy.screenshot('entered'+ item.replace(/[^a-z0-9]/gi, '_'),{"capture":"viewpoint"})
	//				cy.log("Already Entered: " + item)
	//			 }else if (asString.includes('<input name="subscribe"')){
	//				//cy.screenshot('entered'+ item.replace(/[^a-z0-9]/gi, '_'),{"capture":"viewpoint"})
	//				cy.get('input[name="subscribe"]').click()
	//				cy.log("Subscribe: " + item)
	//				cy.screenshot('subscribe'+ item.replace(/[^a-z0-9]/gi, '_'),{"capture":"viewport"})	
	//			 }else if(asString.includes('id="box_click_target"')) {
	//			    //magic box was cfond click it
	//				cy.get('#box_click_target').click()
	//				cy.wait(5000)
	//				cy.get('input.a-button-input')
	//				cy.screenshot('boxed'+ item.replace(/[^a-z0-9]/gi, '_'),{"capture":"viewport"})	
	//				//cy.screenshot()
	//			  }else if (asString.includes('id="youtube-iframe"')) {
	//			    //video box, play it
	//				cy.get('#youtube-iframe').click()
	//				cy.get('input[name="continue"]').click({"timeout":30000})
	//				cy.wait(5000)
	//				cy.get('input.a-button-input')
	//				cy.screenshot('yt'+ item.replace(/[^a-z0-9]/gi, '_'),{"capture":"viewport"})				  
	//			  }else if (asString.includes('<video')) {
	//			    //video box, play it
	//				cy.get('#giveaway-social-container').click()
	//				cy.get('input[name="continue"]').click({"timeout":30000})
	//				cy.wait(5000)
	//				cy.get('input.a-button-input')
	//				cy.screenshot('airy'+ item.replace(/[^a-z0-9]/gi, '_'),{"capture":"viewport"})	
	//			  }else{
	//			  	//no idea, screenshot
	//			  	//cy.wait(10000)
	//			  	cy.screenshot('misses'+ item.replace(/[^a-z0-9]/gi, '_'),{"capture":"viewport"})
	//			  }
	//		})			
//
	//		cy.wait(200)
	//	})
	//})
})


