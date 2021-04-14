const express = require('express')
const router = express.Router()

const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview

} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/products').get(getProducts)

router.route('/product/:id').get(getSingleProduct)

// Log in first to create new product
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct)

// Log in first and as admin to update product or log out
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews')
    .get(isAuthenticatedUser, getProductReviews)
    .delete(isAuthenticatedUser, deleteReview)


module.exports = router;
