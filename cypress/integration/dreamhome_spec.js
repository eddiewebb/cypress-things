

describe('Enter @ DIY', function() {

	it('can enter DIY', function() {
		cy.server()
	
		cy.visit('https://xd.wayin.com/display/container/dc/6513f2e6-b5fc-4293-b2ec-fca605b92be8/entry?source=diy')
		//cy.get('#spout-header-close').click()

		cy.get('input#xReturningUserEmail').type('dubblabubbla@gmail.com')

		cy.get('#xCheckUser').click()

		cy.get('#xSecondaryForm > .xActionContainer > #xSubmitContainer > .xButton > span').click()
		
	})
	it('can enter HGTV', function() {
		cy.server()
	
		cy.visit('https://xd.wayin.com/display/container/dc/a0069c93-2af3-477e-a255-9c058a82d9f5?source=hgtv')
		//cy.get('#spout-header-close').click()

		cy.get('input#xReturningUserEmail').type('dubblabubbla@gmail.com')

		cy.get('#xCheckUser').click()

		cy.get('#xSecondaryForm > .xActionContainer > #xSubmitContainer > .xButton > span').click()
		
	})
})



