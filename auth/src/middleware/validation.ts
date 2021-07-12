import Joi from "joi";
import {Request, Response} from 'express'
import {validationError} from '../error/validationError'

let schema:any;

function authValidation( req: Request, res: Response, next:any ) {

	if( req.route.path === "/api/users/signin" ||req.route.path === "/api/users/signup" ) {

		schema = Joi.object( {

			email: 
                Joi.string()
                .required()
				.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'meh'] } }),
	
			password:
             Joi.string()
                .required()
                .trim()
				.min( 4 )
				.max( 50 ),
	
		} );
 
	} 
    
        // schema options
	const options = {
		abortEarly: false, // include all errors
		allowUnknown: true, // ignore unknown props
		stripUnknown: true // remove unknown props
	};

	// validate request body against schema
  
	const { error, value } = schema.validate( req.body, options );
    
	if ( error ) {
		let errorToSent =  new validationError(error)
		return next( errorToSent );
	} else {
		req.body = value;
		next();
	} 	
}

export {authValidation};