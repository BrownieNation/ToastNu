// unitTest
require('should');
const assert = require('assert');
const {genererProductTabel} = require("../testApp");

describe('unitTest', () => {
    it('genererProductTabel uden products', () => {
        genererProductTabel([/* tom */]).should.be.equal('<table></table>');
    });

    it('genererProducktTabel med én user', () => {
        let Produkter = [
            {
                "id": 1,
                "_productID": "1",
                "productName ": "Chicken Sandwich (No Becon)",
                "productDescription": "Sandwich med kylling uden becon",
                "productPrice": "30"
            }
        ];
        let ProdukterTabel =
            `<table><tr><td>1</td><td>Leanne Graham</td><td>Romaguera-Crona</td></tr>\n</table>`;
        genererUserTabel(Produkter).should.be.equal(ProdukterTabel);
    });
});




