const express = require('express');
const router = express.Router();

// homepage
router.get('/', (req, res) => {
    res.redirect('/gameRule')
});

router.get('/gameRule', (req, res) => {
    res.render('gameRule', {
        gameRuleActive: "active",
        gameStartActive: ""
    })
});

router.get('/gameStart', (req, res) => {
    res.render('gameStart', {
        gameRuleActive: "",
        gameStartActive: "active"
    })
});

module.exports = router;