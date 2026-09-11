const express=require('express');
const router=express.Router();

//Root Redirection
router.get('/',(req,res)=>{
  res.redirect('/dashboard')
})

// Dashboard page
router.get('/dashboard', (req, res) => {
  res.render('pages/Dashboard');
});

// Sync & Sessions page
router.get('/sync-sessions', (req, res) => {
  res.render('pages/Sync&Sessions');
});

module.exports = router;