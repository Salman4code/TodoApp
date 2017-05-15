/**
 * @description Checks the system errors & returns true if system/programming errors
 * @param {any} err type object/string
 * @returns Boolean true/false
 */

var errorDefined = {
  "validationSchema": {
    "login": {
      "email": { in: "body",
        notEmpty: {
          errorMessage: 'Email_id field is require & cannot be blank.'
        },
        isEmail: {
          errorMessage: 'Invalid Email'
        }
      },
      "password": { in: "body",
        notEmpty: {
          errorMessage: 'password field is require & cannot be blank.'
        },
        matches: {
          options: [/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/],
          errorMessage: 'password must contain atleast one capital letter,one small letter and one special character'
        }
      }
    },
    "SignupValidation": {
      "username": { in: "body",
        notEmpty: {
          errorMessage: 'name field is require & cannot be blank.'
        },
        isLength: {
          options: [{
            min: 2,
            max: 10
          }],
          errorMessage: 'Must be between 2 and 10 chars long' // Error message for the validator, takes precedent over parameter message
        },
        isAlpha:{
          errorMessage:'name must be a alphabet.'
        }
      },
      "email": { in: "body",
        notEmpty: {
          errorMessage: 'Email_id is require & cannot be blank.'
        },
        isEmail: {
          errorMessage: 'Invalid Email'
        }
      },
      "mobile": { in: "body",
        notEmpty: {
          errorMessage: 'mobile number is require & cannot be blank.'
        }
        // isMobile:{
        //   // options:[/^[789]\d{9}$/],
        //   errorMessage: 'Invalid mobile number.'
        // }
      },
      "password": { in: "body",
        notEmpty: {
          errorMessage: 'password is require & cannot be blank.'
        },
        matches: {
          options: [/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/],
          errorMessage: 'password must contain atleast one capital letter,one small letter and one special character'
        }
      }
    }
  },
  checkSystemErrors: function(err) {
    return err instanceof TypeError ||
      err instanceof SyntaxError ||
      err instanceof EvalError ||
      err instanceof RangeError ||
      err instanceof ReferenceError;
  }

}
module.exports = errorDefined;
