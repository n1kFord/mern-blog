export const filterItems = (searchText, list) => {
    if (!searchText) {
        return list;
    }
    return list.filter(({title}) => {
        return title.toLowerCase().includes(searchText.toLowerCase());
    })
}