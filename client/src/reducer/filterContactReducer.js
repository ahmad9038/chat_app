const filterContactReducer = (state, action) => {

    switch (action.type) {

        case 'UPDATE_FILTER_VALUE':
            let { name, value } = action.payload;
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value
                }
            }


        case 'CLEAR_SEARCH':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    searched: ''
                }
            }

        case 'LOAD_FILTER_CONTACTS':
            return {
                ...state,
                filterContacts: [...action.payload],
                allContacts: [...action.payload],
            }


        case 'FILTER_PRODUCTS':
            let { allContacts } = state;
            let tempFilterProducts = [...allContacts];

            const { searched } = state.filters;

            if (searched) {
                tempFilterProducts = tempFilterProducts.filter((cur) => {
                    return cur.name.toLowerCase().startsWith(searched);
                })
            }

            return {
                ...state,
                filterContacts: tempFilterProducts,
            };



        case 'GET_SORT_VALUE':
            let selectValue = action.payload;
            return {
                ...state,
                sortingValue: selectValue,
            }

        case 'SORTING_PRODUCTS':
            let newSortData;
            let tempSortProduct = [...state.filterContacts];

            if (state.sortingValue === 'a-z') {
                newSortData = tempSortProduct.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
            }

            if (state.sortingValue === 'z-a') {
                newSortData = tempSortProduct.sort((a, b) => {
                    return b.name.localeCompare(a.name);
                });
            }

            if (state.sortingValue === 'none') {
                return {
                    ...state,
                    filterContacts: tempSortProduct
                };
            }

            return {
                ...state,
                filterContacts: newSortData
            };



    }

}

export default filterContactReducer