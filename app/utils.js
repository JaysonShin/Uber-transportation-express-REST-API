//
function reportMissingParam(missingParam, res) {
    res.status(400).json({
        errorCode: 1001,
        errorMsg: missingParam + ' required',
        statusCode: 400,
        statusTxt: 'Bad Request'
    });
    return;
}

function reportTypeError(correctType, res) {
    res.status(400).json({
        errorCode: 1002,
        errorMsg: 'TypeError: correct type is ' + correctType,
        statusCode: 400,
        statusTxt: 'Bad Request'
    });
    return;
}

function reportEmptyBody(emptyBody, res){
    res.status(400).json({
        errorCode: 1003,
        errorMsg: emptyBody + ' body is empty',
        statusCode: 400,
        statusTxt: 'Bad Request'
    });
    return;
}

function reportInvalidFormat(invalidFormat, res){
    res.status(400).json({
        errorCode: 1004,
        errorMsg: 'wrong format is ' + invalidFormat,
        statusCode: 400,
        statusTxt: 'Bad Request'
    });
    return;
}

function reportDuplicateAttribute(duplicateAttribute, res){
    res.status(400).json({
        errorCode: 1005,
        errorMsg: duplicateAttribute + ' is duplicate',
        statusCode: 400,
        statusTxt: 'Bad Request'
    });
    return;
}

function reportInvalidAttributeValue(invalidAttributeValue, res){
    res.status(400).json({
        errorCode: 1006,
        errorMsg: invalidAttributeValue + ' is invalid attribute value',
        statusCode: 400,
        statusTxt: 'Bad Request'
    });
    return;
}

function reportIdShouldNotBeProvided(idShouldNotBeProvided, res){
    res.status(400).json({
        errorCode: 1006,
        errorMsg: idShouldNotBeProvided + ' ',
        statusCode: 400,
        statusTxt: 'Bad Request'
    });
    return;
}


module.exports = {
    missingParam: reportMissingParam,
    typeError: reportTypeError,
    emptyBody: reportEmptyBody,
    invalidFormat: reportInvalidFormat,
    invalidAttibuteValue: reportInvalidAttributeValue,
    idShouldNotBeProvided: reportIdShouldNotBeProvided
}