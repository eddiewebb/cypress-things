Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

Cypress.Commands.add(
  'iframeLoaded',
  { prevSubject: 'element' },
  ($iframe) => {
    const contentWindow = $iframe.prop('contentWindow')
    return new Promise(resolve => {
      if (
        contentWindow &&
        contentWindow.document.readyState === 'complete'
      ) {
        resolve(contentWindow)
      } else {
        $iframe.on('load', () => {
          resolve(contentWindow)
        })
      }
    })
  })

Cypress.Commands.add(
  'getInDocument',
  { prevSubject: 'document' },
  (document, selector) => Cypress.$(selector, document)
);


describe('Enter Dream Home Sweepstakes', function() {
	['dubblabubbla@gmail.com','ollitech@gmail.com','edwardawebb@gmail.com','doorknob@adirondack.green','bicycle@adirondack.green']
		.forEach( (email)=>{
			it(`${email} can enter HGTV`, function() {		
		
				cy.visit('https://www.hgtv.com/sweepstakes/hgtv-dream-home/sweepstakes')
	
				cy.get('#ngxFrame207341')
				  .iframeLoaded()
				  .its('document').as('formcontent')
	
				cy.get('@formcontent')
				  .getInDocument('#xReturningUserEmail')
				  .type(email)
				cy.get('@formcontent')
				  .getInDocument('#xCheckUser')
				  .click()
	
				cy.wait(500)
	
				cy.get('#ngxFrame207341')
				  .iframeLoaded()
				  .its('document').as('formcontent2')
				 cy.get('@formcontent2')
				  .getInDocument('#xSecondaryForm .xSubmit')
				  .click()
				  cy.wait(500)
				
				//verify entry
				  cy.url().should('include', 'thanks')
		
			
			})
	
	

	it(` ${email} can enter FoodNetwork`, function() {		
		cy.visit('https://www.foodnetwork.com/sponsored/sweepstakes/hgtv-dream-home-sweepstakes?ocid=direct&xp=sistersite')

			cy.get('#ngxFrame207345')
			  .iframeLoaded()
			  .its('document').as('formcontent')

			cy.get('@formcontent')
			  .getInDocument('#xReturningUserEmail')
			  .type(email)
			cy.get('@formcontent')
			  .getInDocument('#xCheckUser')
			  .click()

			cy.wait(500)


			cy.get('#ngxFrame207345')
			  .iframeLoaded()
			  .its('document').as('formcontent2')
			 cy.get('@formcontent2')
			  .getInDocument('#xSecondaryForm .xSubmit')
			  .click()
			
			cy.wait(500)
			
			//verify entry
			  cy.url().should('include', 'thanks')
		})
	})
})




