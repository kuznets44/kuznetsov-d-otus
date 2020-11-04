const arraySum = function(ar1,ar2) {
    const arResult = ar1.slice();
    ar2.forEach(element => {
        if(!arResult.includes(element)) {
            arResult.push(element);
        }
    });
    return arResult.sort();
}

const arraysIntersect = function(ar1,ar2) {
    let result = false;

    let arBase = ar1;
    let arAdditional = ar2;
    if(ar2.length > ar1.length) {
        arBase = ar2;
        arAdditional = ar1;
    }
    
    for (let element of arBase) {
        if(arAdditional.includes(element)) {
            result = true;
            break;
        }
    }

    return result;
}


function maxItemAssociation(arPurchases) {

    let arAssoc = [];

    arPurchases.forEach( (arElement,index) => {
        arAssoc[index] = arElement.slice();

        let arOtherGroups = arPurchases.slice();
        arOtherGroups.splice(index,1);
        
        arOtherGroups.forEach(arGroup => {
            if(arraysIntersect(arAssoc[index],arGroup)) {
                arAssoc[index] = arraySum(arAssoc[index],arGroup);
            }
        });
    });

    let arLongestAssoc = [];
    arAssoc.forEach(element => {
        if(element.length > arLongestAssoc.length) {
            arLongestAssoc = element
        } else if(element.length == arLongestAssoc.length) {

            const elementStr = element.join("");
            const longestAssocStr = arLongestAssoc.join("");
            if(elementStr < longestAssocStr) {
                arLongestAssoc = element;
            }
        }
    });

    return arLongestAssoc;
}

const arPurchases = [
    ["a", "b"], ["a", "c"], ["d", "e"]
];

console.log(maxItemAssociation(arPurchases));