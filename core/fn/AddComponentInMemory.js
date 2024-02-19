export const AddComponentInMemory = (memoryComponents, component, childrens) => {
    childrens.map((element) => {
        memoryComponents.push(element)
        component.append(element)
    })
}