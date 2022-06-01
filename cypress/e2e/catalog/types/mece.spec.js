import { meceFacetTypes } from '../../../support/constants'

const paths = [
  '/catalog',
  '/catalog/source:rug01',
  '/catalog/source:pug01',
  '/catalog/source:rug02-rug03-rug04', // The card catalogue
  '/catalog/source:ejn01',
  '/catalog/source:ebk01',
]

paths.forEach(function (path) {
  describe(`Catalog tests for path: ${path}`, function () {
    before(function () {
      cy.visit(path)
    })

    Object.values(meceFacetTypes).forEach(function (facet) {
      describe(`The MECE ${facet} facet`, function () {
        it('the sum of facet value counts should match total hits exactly', function () {
          cy.getCount().then(function (totalResults) {
            cy.contains('.filters .form-group', facet)
              .find('.checkbox label .mute .facet-count')
              .map(function (facetCount) {
                return parseInt(facetCount.innerText.replace(/,/g, ''))
              })
              .sum()
              .should(subject => {
                expect(subject).to.eq(
                  totalResults,
                  `Detected ${(totalResults - subject).toFixed(0)} items without ${facet.toLowerCase()}`
                )
              })
          })
        })
      })
    })
  })
})
