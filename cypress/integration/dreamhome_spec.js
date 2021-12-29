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
	
	it('can enter HGTV', function() {		
		cy.wrap(['dubblabubbla@gmail.com','ollitech@gmail.com','edwardawebb@gmail.com','doorknob@adirondack.green']).each( ($li, index, $lis) => {
			cy.visit('https://www.hgtv.com/sweepstakes/hgtv-dream-home/sweepstakes')

			cy.get('#ngxFrame207341')
			  .iframeLoaded()
			  .its('document').as('formcontent')

			cy.get('@formcontent')
			  .getInDocument('#xReturningUserEmail')
			  .type($lis[index])
			cy.get('@formcontent')
			  .getInDocument('#xCheckUser')
			  .click()

			cy.wait(5000)
			cy.screenshot('hgtv-' + $lis[index])

			cy.get('#ngxFrame207341')
			  .iframeLoaded()
			  .its('document').as('formcontent2')
			 cy.get('@formcontent2')
			  .getInDocument('#xSecondaryForm .xSubmit')
			  .click()
			  cy.wait(3000)
			
			//verify entry
			  cy.url().should('include', 'thankyou')
			  cy.screenshot('hgtv-' + $lis[index])
		})
		
	})

	it('can enter FoodNetwork', function() {		
		cy.wrap(['dubblabubbla@gmail.com','ollitech@gmail.com','edwardawebb@gmail.com','doorknob@adirondack.green']).each( ($li, index, $lis) => {
			cy.visit('https://www.foodnetwork.com/sponsored/sweepstakes/hgtv-dream-home-sweepstakes?ocid=direct&xp=sistersite')

			cy.get('#ngxFrame207345')
			  .iframeLoaded()
			  .its('document').as('formcontent')

			cy.get('@formcontent')
			  .getInDocument('#xReturningUserEmail')
			  .type($lis[index])
			cy.get('@formcontent')
			  .getInDocument('#xCheckUser')
			  .click()

			cy.wait(5000)
			cy.screenshot('food-' + $lis[index])


			cy.get('#ngxFrame207345')
			  .iframeLoaded()
			  .its('document').as('formcontent2')
			 cy.get('@formcontent2')
			  .getInDocument('#xSecondaryForm .xSubmit')
			  .click()
			
			cy.wait(3000)
			cy.screenshot('food-' + $lis[index])
			
			//verify entry
			  cy.url().should('include', 'thankyou')
		})
		
	})
})




