Cypress.Commands.add('enterSweeps', (sweepUrl, email) => {

	cy.visit(sweepUrl)

	cy.get('input#xReturningUserEmail').type(email)

	cy.get('#xCheckUser').click()

	cy.get('#xSecondaryForm > .xActionContainer > #xSubmitContainer > .xButton > span').click()

	cy.get('.xCopy').contains('Your entry is being processed')

});

describe('Enter Sweepstakes', function() {

	it('can enter DIY', function() {
		cy.server()
	
		cy.enterSweeps('https://xd.wayin.com/display/container/dc/838c088b-3688-46d3-8f51-8a28af00f552/entry?source=diy','dubblabubbla@gmail.com')
	})
	it('can enter HGTV', function() {
		cy.server()
	
		cy.enterSweeps('https://xd.wayin.com/display/container/dc/630bdfee-d6ef-4d8c-bd66-05ab61b0b43c/entry?source=hgtv','dubblabubbla@gmail.com')
	})
	it('can enter DIY Olli', function() {
		cy.server()
	
		cy.enterSweeps('https://xd.wayin.com/display/container/dc/838c088b-3688-46d3-8f51-8a28af00f552/entry?source=diy','ollitech@gmail.com')
	})
	it('can enter HGTV Olli', function() {
		cy.server()
	
		cy.enterSweeps('https://xd.wayin.com/display/container/dc/630bdfee-d6ef-4d8c-bd66-05ab61b0b43c/entry?source=hgtv','ollitech@gmail.com')
	})
})



