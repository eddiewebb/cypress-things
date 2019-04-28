

describe('Enter @ DIY', function() {

	it('can enter DIY', function() {
		cy.server()
	
		cy.visit('https://xd.wayin.com/display/container/dc/838c088b-3688-46d3-8f51-8a28af00f552/entry?source=diy')
		//cy.get('#spout-header-close').click()
		cy.get('input#xReturningUserEmail').type('dubblabubbla@gmail.com')


		cy.get('#xCheckUser').click()


		cy.get('#xSecondaryForm > .xActionContainer > #xSubmitContainer > .xButton > span').click()

		cy.get('.xCopy').contains('Your entry is being processed')

		//class=xButton xCTA xSubmit
		
	})
	it('can enter HGTV', function() {
		cy.server()
	
		cy.visit('https://xd.wayin.com/display/container/dc/630bdfee-d6ef-4d8c-bd66-05ab61b0b43c/entry?source=hgtv')
		//cy.get('#spout-header-close').click()

		cy.get('input#xReturningUserEmail').type('dubblabubbla@gmail.com')

		cy.get('#xCheckUser').click()

		cy.get('#xSecondaryForm > .xActionContainer > #xSubmitContainer > .xButton > span').click()
		
		cy.get('.xCopy').contains('Your entry is being processed')
		//Your entry is being processed
	})
})



