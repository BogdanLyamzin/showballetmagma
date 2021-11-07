export const addToRefs = (el, arrRefs) => {
    if (el && !arrRefs.includes(el)) {
        arrRefs.push(el)
    }
}
