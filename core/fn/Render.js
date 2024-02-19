export const Render = (memoryComponents, elements) => {
    elements.map((element) => {
        memoryComponents.push(element)
        document.body.append(element)
    })
}
