/**
 * Created by jilion.chen on 3/10/2017.
 */
import React from 'react';

class Search {
    constructor() {
    }

    //onSearch(dataSource, searchText, searchColumn) {
    onSearch(dataSource, searchText, searchColumn) {
        const reg = new RegExp(searchText, 'gi');
        let data = dataSource.map((record) => {
			let recordValue = record[searchColumn].value || record[searchColumn] || ''
            const match = recordValue.match(reg);
            if (!match) {
                return null;
            }
            return {
                ...record,
                name: (
                    <span>
                        {
                            recordValue.split(reg).map((text, i) => (
                                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                            ))
                        }
                    </span>
                ),
            };
        }).filter(record => !!record);

        return data;
    }
}

export default Search;
