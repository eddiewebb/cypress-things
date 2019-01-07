


function writeResult(index, item,result){
	cy.writeFile('history.txt','page-' +  index + ' ' + result + ': ' + item +'\n', { flag: 'a+' })
}

describe('Win All The Things', function() {

	it('can generate new links', function() {
		cy.server()
		cy.route('POST','/ga/p/**').as('postEntry')
		var hitLinks=0
		var allLinks = []
		var start = parseInt(Cypress.env('start_page'))
		var batch = parseInt(Cypress.env('page_count'))
		var yesWords = Cypress.env('yes_words').split(',')
		var genArr = Array.from({length:batch},(v,k)=>k+start)
		cy.wrap(genArr).each((index) => {
			//collect all links from curent page
			allLinks[index] = []
			cy.visit('/ga/giveaways?pageId=' + index)
			cy.get('#giveaway-grid>.giveawayItemContainer>.giveAwayItemDetails').each(($el, mindex, $list) => {
				cy.wrap($el).within(($summary) =>{
						cy.get('.a-size-base').then(($link) =>{
							var description = $link[0].outerHTML
							//cy.log($link)
							cy.log(description)
							var pattern = new RegExp('\b' + yesWords.join("|") + '\b','i')
							var matches;
							if ((matches = pattern.exec(description)) != null) {
							   allLinks[index].push( $el[0].href )
								cy.log("matched: " + matches[0])
							}
						})
				})
				
			})

			cy.writeFile('links'+index.toString().padStart(3, '0')+'.json',allLinks[index])

			//hit all page givewyas
			cy.readFile('links'+index.toString().padStart(3, '0')+'.json').each((item)=>{
				//log in
				if(hitLinks%100 == 0){
					cy.visit('/gp/flex/sign-out.html/ref=nav_youraccount_signout?ie=UTF8&action=sign-out&path=%2Fgp%2Fyourstore%2Fhome&signIn=1&useRedirectOnSuccess=1')
					cy.clearCookies()
					cy.wait(1500)
					cy.visit('/ap/signin?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fyourstore%2Fhome%3Fie%3DUTF8%26action%3Dsign-out%26path%3D%252Fgp%252Fyourstore%252Fhome%26ref_%3Dnav_youraccount_signout%26signIn%3D1%26useRedirectOnSuccess%3D1')
					cy.get('#ap_email').type('ollitech@gmail.com')
					cy.get('#ap_password').type(Cypress.env('password'))
					cy.get('label > input').check()
					cy.get('#signInSubmit').click()
				}
				hitLinks++
				

				//visit page
				cy.visit(item)  // +urlObject.search
				cy.wait(900)
				var result="unknown"
				//giveaway page loaded, decide what action to take
				cy.get('#a-page').within(($body) =>{
					 var asString = $body[0].outerHTML

					 if (asString.includes("you didn't win") || asString.includes("entry received")){
						cy.log("Already Entered: " + item)
						writeResult(index, item, "already-entered")
					 }else if (asString.includes('Giveaway ended')){
						cy.log("Expired " + item)
						writeResult(index, item, "expired")
					 }else{
					 	if (asString.includes('<input name="subscribe"')){
							cy.wait(600)
							cy.log("Subscribe: " + item)
							cy.get('input[name="subscribe"]').click()
							cy.get('input.a-button-input')
							result="subscribe-skipped"
						 }else if(asString.includes('id="box_click_target"')) {
							cy.log("Box: " + item)
						    //magic box was cfond click it
							cy.wait(5100)
							cy.get('#giveaway-social-container').click()
							cy.get('#box_click_target').click()
							cy.wait(5100)
							cy.get('input.a-button-input')
							//cy.screenshot()
							result="box"
						  }else if (asString.includes('id="youtube-iframe"')) {
							cy.log("Youtube: " + item)
						    //video box, play it
							cy.get('#youtube-iframe').click()
							cy.get('input[name="continue"]').click()
							cy.wait('@postEntry')	
							cy.wait('@postEntry')	
							cy.get('input.a-button-input')	
							result="youtube"	  
						  }else if (asString.includes('<video')) {
							cy.log("VIdeo: " + item)

							cy.get('#giveaway-social-container').click()
							cy.wait(3000)
							cy.get('input[name="continue"]').click()
							cy.get('input.a-button-input')
							result="video"
						  }else{
							cy.log("Guess: " + item)
							cy.get('input.a-button-input').click()
							cy.get('input.a-button-input')
							result="guess"
											  	
						  }
						  cy.get('#title').then(($message) =>{
								var updatedContents = $message[0].outerHTML
								if(! updatedContents.includes("you didn't win")  && ! updatedContents.includes("your entry has been received") ){
									cy.log("winner - " + item)
									cy.writeFile('winner-'+item.replace(/[^a-z0-9]/gi, '_')+'.json',item)
									cy.screenshot('Winner'+ item.replace(/[^a-z0-9]/gi, '_'),{"capture":"fullPage"})
									cy.pause()
								}	
							})

							writeResult(index, item, result)
					 } 
				})		

				
			})
			// wait 5 seconfs between full page scrapes.
			cy.wait(1000)
		})
	})
})


