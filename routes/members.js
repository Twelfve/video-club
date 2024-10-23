const express = require('express');
const controller = require('../controllers/members.controller');
const router = express.Router();

/* GET users listing. */
router.post('/', 
  controller.create
);
router.patch('/copy', 
  controller.addCopy
);
router.get('/', 
  controller.list
);
router.get('/:id', 
  controller.index
);
router.put('/:id', 
  controller.replace
);
router.patch('/:id', 
  controller.update
);
router.delete('/:id', 
  controller.destroy
);

module.exports = router;