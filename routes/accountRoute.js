/* ****************************************
*  Deliver login view
* *************************************** */
router.post('/register', utilities.handleErrors(accountController.registerAccount));
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
    });
  };
  
  module.exports = { buildLogin };

  // Process the login attempt
router.post(
  "/login",
  (req, res) => {
    res.status(200).send('login process');
  }
);