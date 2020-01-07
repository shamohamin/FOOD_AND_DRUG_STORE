import validator from 'validator';
import { isValidPhoneNumber } from "react-phone-number-input";

export const FormValidator = (rules , data) => {

    let errors = {} ;

    Object.keys(rules).forEach(key => {
        let fieldData = data[key] ;
        let fieldError = [] ;

        if(validator.isEmpty(fieldData)){
            fieldError.push("Value Is Required");
        }

        if(!validator.isEmpty(fieldData)){
            if(rules[key].isAlpha && !validator.isAlpha(fieldData)){
                fieldError.push("It must be Character");
            }
            if(rules[key].minLenght && 
                    !validator.isLength(fieldData,rules[key].minLenght)){
                fieldError.push(`It must at least have ${rules[key].minLenght}`);
            }
            if(rules[key].isEmail && !validator.isEmail(fieldData)){
                fieldError.push("Insert valid Email");
            }
            if(rules[key].phone && !isValidPhoneNumber(fieldData)){
                fieldError.push("Please Insert Valid phone number ")
            }
        }
        errors[key] = fieldError ;
    })

    return errors ;
}

