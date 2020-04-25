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


describe('Enter @ DIY', function() {
	it('can enter DIY', function() {
		cy.wrap(['dubblabubbla@gmail.com','dubbla.bubbla@gmail.com','ollitech@gmail.com','edward.a.webb@gmail.com','edwardawebb@gmail.com']).each( ($li, index, $lis) => {
			cy.visit('https://www.diynetwork.com/hgtv-smart-home?ocid=direct')

			cy.get('#ngxFrame171589')
			  .iframeLoaded()
			  .its('document').as('formcontent')

			cy.get('@formcontent')
			  .getInDocument('#xReturningUserEmail')
			  .type($lis[index])
			cy.get('@formcontent')
			  .getInDocument('#xCheckUser')
			  .click()

			cy.wait(5000)


			cy.get('#ngxFrame171589')
			  .iframeLoaded()
			  .its('document').as('formcontent2')
			 cy.get('@formcontent2')
			  .getInDocument('#xSecondaryForm .xSubmit')
			  .click()
		})
	

	})
	it('can enter HGTV', function() {		
		cy.wrap(['dubblabubbla@gmail.com','dubbla.bubbla@gmail.com','ollitech@gmail.com','edward.a.webb@gmail.com','edwardawebb@gmail.com']).each( ($li, index, $lis) => {
			cy.visit('https://hgtv.com/sweepstakes/hgtv-smart-home/sweepstakes?ocid=direct')

			cy.get('#ngxFrame171583')
			  .iframeLoaded()
			  .its('document').as('formcontent')

			cy.get('@formcontent')
			  .getInDocument('#xReturningUserEmail')
			  .type($lis[index])
			cy.get('@formcontent')
			  .getInDocument('#xCheckUser')
			  .click()

			cy.wait(5000)


			cy.get('#ngxFrame171583')
			  .iframeLoaded()
			  .its('document').as('formcontent2')
			 cy.get('@formcontent2')
			  .getInDocument('#xSecondaryForm .xSubmit')
			  .click()
		})
		
	})

})



