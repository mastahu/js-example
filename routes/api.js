var express = require('express');
var router = module.exports = express.Router();

// Mock API using fixture so we're not dependent on network connectivity
var allProducts = require('../fixtures/products.json').data;

router.get('/products/', function (req, res, next) {
    var total = allProducts.length;
    var offset = parseInt(req.query.offset) || 0;
    var limit = parseInt(req.query.limit) || 60;
    if (offset > total) {
        return res.type('json').sendStatus(400);
    }

    res.json({
        offset: offset,
        limit: limit,
        total: total,
        data: allProducts.slice(offset, offset+limit).map(function(product) {
            // Simplify payload - more data available in fixture
            return {
                id: product.id,
                name: product.name.en,
                price: product.price.gross / product.price.divisor,
                currency: '£',
                designer: product.brand.name.en,
                image: {
                    outfit: '//cache.net-a-porter.com/images/products/'+product.id+'/'+product.id+'_ou_sl.jpg',
                    small: '//cache.net-a-porter.com/images/products/'+product.id+'/'+product.id+'_in_sl.jpg',
                    large: '//cache.net-a-porter.com/images/products/'+product.id+'/'+product.id+'_in_pp.jpg'
                }
            }
        })
    });
});

Array.prototype.unique = function()
{
    var n = {},r=[];
    for(var i = 0; i < this.length; i++) 
    {
        if (!n[this[i]]) 
        {
            n[this[i]] = true; 
            r.push(this[i]); 
        }
    }
    return r;
}

var designers = allProducts.map(function(product) {
           return product.brand.name.en;
        })

designers = designers.unique();

designers.sort();

router.get('/designers/', function (req, res, next) {

    res.json(designers.map(function(designer) {

            return {
                name: designer
            }
        })
    );
});