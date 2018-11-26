
//Cypress.Cookies.defaults({
//  whitelist: ['session-id', 'session-token']
//})
describe('Win All The Things', function() {

	it('can find giveaways page', function() {
		cy.visit('https://smile.amazon.com/ga/giveaways')
	})
	it('can enter giveaways', function() {
		cy.visit('https://www.amazon.com/ap/signin?openid.return_to=https%3A%2F%2Fsmile.amazon.com%2Fga%2Fgiveaways%3Fref_%3Dnav_ya_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&&openid.pape.max_auth_age=0')
		cy.get('#ap_email').type('ollitech@gmail.com')
		//cy.get('#ap_password').type('')
		//cy.get('#signInSubmit').click()
		cy.wait(15000)


		//cy.setCookie()
		var genArr = Array.from({length:250},(v,k)=>k+1)
		cy.wrap(genArr).each((index) => {
			cy.visit('https://smile.amazon.com/ga/giveaways?pageId=' + index)
			cy.wait(2000)
			cy.get('#giveaway-grid>.giveawayItemContainer>.giveAwayItemDetails').each(($el, index, $list) => {
				cy.contains($el[0].text).as('thisGive')
				cy.get('@thisGive').click()


				cy.get('.participation-action-item').then(($body) =>{
					 var asString = $body[0].outerHTML
					 if (asString.includes('id="box_click_target"')) {
					    //magic box was cfond click it
						cy.get('#box_click_target').click()
						cy.wait(5000)
						//cy.screenshot()
					  }else if (asString.includes('<video')) {
					    //video box, play it
						cy.get('.airy-play-toggle-hint-container').click()
						cy.wait(16000)
						cy.get('#enter-video-button-announce').click()
						cy.wait(3000)
						//cy.screenshot()
					  }else{
					  	//no idea, screenshot
					  	//cy.wait(10000)
					  	cy.screenshot('misses',{"capture":"viewport"})
					  }
				})

				

				cy.wait(200)
				cy.go('back')
			})
		})
	})
})
