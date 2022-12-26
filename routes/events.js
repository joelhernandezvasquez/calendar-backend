
/*
Event Routes
/api/events
*/

const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const {validateJWT} = require('../middlewares/validate-jwt');
const {getEvents,createEvents,updateEvents,deleteEvents} = require('../controllers/events');
const {isDate} = require('../helpers/isDate');
// all request must have the token validated
router.use(validateJWT);

router.get('/', getEvents)

router.post('/',
[
 check('title', 'title is required.').not().isEmpty(),
 check('start', 'Start Date is required.').custom(isDate),
 check('end', 'End Date is required.').custom(isDate),
 fieldValidator
],

createEvents
);

router.put('/:id',updateEvents);
router.delete('/:id',deleteEvents);

module.exports = router;