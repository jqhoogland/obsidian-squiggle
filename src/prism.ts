/**
 * Prism declarations for .squiggle based on the squiggle language 
 * [textmate grammar](https://github.com/quantified-uncertainty/squiggle/blob/develop/packages/vscode-ext/syntaxes/squiggle.tmLanguage.yaml).
 * (Couldn't find any codegen solutions.)
 */

import * as Prism from "prismjs";



/**
 * Left to implement (maybe):
 * * let
 * * defun
 * * array-parmeters
 * * function-call
 * * block
 **/
export const squigglePrism = (prism: typeof Prism) => ({
    comment: [
        {
            pattern: /\/\/.*/,
            greedy: true
        },
        {
            pattern: /#.*/,
            greedy: true
        },
        {
            pattern: /\/\*[\s\S]*\*\//,
        }
    ],
    keyword: [
        {
            pattern: /\bif|then|else|to\b/,
            lookbehind: true
        },
    ],
    number: [
        {
            // Not perfect: doesn't match the `.` in `(.2`
            pattern: /\b(\d+\.\d*|\.?\d+)([eE]-?\d+)?([_a-zA-Z]+[_a-zA-Z0-9]*)?/,
        },
        {
            pattern: /\b\d+(?:[_a-zA-Z]+[_a-zA-Z0-9]*)?/
        }
    ],
    // let: {
    //     pattern: /\b\s*(\w+)\s*=/,
    // },
    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    function: /^\s*(\w+)\s*(\().+(\))\s*=/,
    // operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]|.*|.>|\|>/,
    // punctuation: /[{}[\],]/,
});

