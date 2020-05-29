/**
 * @fileoverview Find and remove tslint:ignore comments
 * @author Drew Wyatt
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-tslint-disable"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-tslint-ignore", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "// tslint:disable: no-console",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
