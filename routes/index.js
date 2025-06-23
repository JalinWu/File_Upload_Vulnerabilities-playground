const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const uploadPath = path.join(__dirname, "../assets/uploads");


function getAvatar() {
    const avatar = "/img/faces/marc.jpg";

    try {
        const files = fs.readdirSync(uploadPath);
        if (files.length > 0) {
            const x = files[0]; // first file
            return `/uploads/${x}`;
        } else {
            return avatar;
        }
    } catch (err) {
        console.error('Error reading folder:', err);
        return avatar;
    }
}

// homepage
router.get('/', (req, res) => {
    res.redirect('/gameRule')
});

router.get('/gameRule', (req, res) => {
    var avatarSrc = getAvatar();
    console.log(avatarSrc);
    res.render('gameRule', {
        gameRuleActive: "active",
        gameStartActive: "",
        avatarSrc
    })
});

router.get('/gameStart', (req, res) => {
    var avatarSrc = getAvatar();
    res.render('gameStart', {
        gameRuleActive: "",
        gameStartActive: "active",
        avatarSrc
    })
});

module.exports = router;